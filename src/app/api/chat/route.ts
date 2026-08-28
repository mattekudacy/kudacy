import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, streamText, stepCountIs, UIMessage } from 'ai'
import { agentTools, RESEARCH_TOOL_NAMES } from '@/lib/agent-tools'

// Ollama exposes an OpenAI-compatible endpoint, so we can reuse @ai-sdk/openai
// as the client and just point it at Ollama instead of OpenAI.
//
// - Self-hosted Ollama: OLLAMA_BASE_URL=http://<your-host>:11434/v1 (OLLAMA_API_KEY optional,
//   only needed if you've put the server behind auth)
// - Ollama's hosted cloud models: OLLAMA_BASE_URL=https://ollama.com/v1, OLLAMA_API_KEY=<your key>
//
// Set OLLAMA_BASE_URL / OLLAMA_API_KEY / OLLAMA_MODEL as env vars in Vercel (Project Settings ->
// Environment Variables) — nothing else in this file needs to change per-environment.
const ollamaProvider = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL ?? 'https://ollama.com/v1',
  apiKey: process.env.OLLAMA_API_KEY,
})

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'gpt-oss:120b'

// Calling ollamaProvider(...) directly targets OpenAI's newer Responses API (item-based
// conversation state — "item_reference" etc.), which Ollama's OpenAI-compatible endpoint
// does not implement; it only speaks the classic Chat Completions API. .chat(...) forces
// that. Using the wrong one works fine on the first turn (nothing to reference yet) and
// breaks as soon as there's prior tool-call history to carry forward — surfacing as
// "unknown input item type: item_reference" starting on the 2nd message.
const ollama = ollamaProvider.chat(OLLAMA_MODEL)

// See the prepareStep comment below for how these two work together.
const MAX_TOOL_STEPS = 3
const MAX_STEPS = 8

const SYSTEM_PROMPT = `You are a blog writing assistant for a personal developer portfolio. Your job is to help the user think through and craft a great blog post — but you never start writing until they are ready.

## Your process

1. **Understand first.** When the user describes a topic, ask 2–4 focused questions to understand what they want to say. Good questions cover: the core idea or story, the target audience, the tone (tutorial, opinion, story, etc.), any specific points or sections they have in mind, and roughly how long it should be.

2. **Dig deeper if needed.** If their answers are vague, ask one follow-up at a time. Don't overwhelm them with questions — keep it conversational.

3. **Summarise and ask permission.** Once you have enough to write a solid post, summarise your understanding in a few bullet points and ask: "Ready for me to write a draft based on this?" Do not start writing until the user confirms.

4. **Save the full draft.** Only after the user says yes (or words to that effect), call the \`saveDraft\` tool with the complete markdown — YAML frontmatter (title, date, description, tags, slug) followed by the post body. Do not paste the draft into your chat reply; \`saveDraft\` is how the draft reaches the preview panel. After calling it, send a short chat reply telling the user it's ready (e.g. "Draft saved — take a look in the preview panel").

5. **Refine on request.** If the user asks for changes, apply them and call \`saveDraft\` again with the complete updated markdown (not a diff) so the preview stays current.

## Tools

You have four tools: \`searchWeb\` (Tavily), \`searchGithubCode\`, \`readGithubFile\` (all three default to the user's own portfolio repo), and \`saveDraft\`. Rules:
- Use the research tools to ground the post in real sources — pull a real example from the user's repo, or check a current fact/reference online — instead of guessing. Only call one when it would materially improve the post; don't search or read files on every turn just because you can.
- Prefer the repo tools when the user references "my repo", "my project", or "how I built X" — search for the relevant code first, then read the specific file.
- Finish all research *before* calling saveDraft, not partway through writing it — do any searching/reading first, then write and save the whole draft in one go. You only get a few research tool calls per turn; once they're used up you can't call one again until the next message (saveDraft itself has no such limit).
- After using a research tool, briefly tell the user what you looked at and why (e.g. "I checked your \`route.ts\` — here's what it does") so tool use stays visible in the conversation, since it doesn't render in the UI on its own.
- If a research tool returns an error (e.g. search isn't configured yet), say so plainly and keep going without it — never block the conversation on a missing tool.

## Rules
- Never call saveDraft without explicit user approval first.
- Never ask more than 4 questions at once.
- Keep your messages concise — you are a collaborator, not a lecturer.`

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

// A one-off assistant text reply with no model call — used for the misconfiguration
// fast-fail below, built from the same primitives the real response streams with so
// it renders identically in the chat.
function textOnlyResponse(text: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: 'start' })
        writer.write({ type: 'text-start', id: 'cfg' })
        writer.write({ type: 'text-delta', id: 'cfg', delta: text })
        writer.write({ type: 'text-end', id: 'cfg' })
        writer.write({ type: 'finish' })
      },
    }),
  })
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-secret')
  if (!secret || secret !== process.env.AGENT_PASSWORD) {
    return new Response('Unauthorized', { status: 401 })
  }

  let messages: UIMessage[]
  try {
    ;({ messages } = await req.json())
  } catch {
    return new Response('Bad request: body was not valid JSON.', { status: 400 })
  }

  // Fail fast with a message the user can actually see, instead of the model
  // provider returning a cryptic 401 several seconds into "thinking...".
  const baseURL = process.env.OLLAMA_BASE_URL ?? 'https://ollama.com/v1'
  if (baseURL.includes('ollama.com') && !process.env.OLLAMA_API_KEY) {
    return textOnlyResponse(
      "⚠️ Agent error: OLLAMA_API_KEY is not set. It's required for https://ollama.com/v1 (Ollama's hosted cloud). Add it in Vercel → Project Settings → Environment Variables and redeploy.",
    )
  }

  // convertToModelMessages (rather than hand-picking text parts) is what keeps a
  // previous saveDraft tool call — and therefore the current draft's full content —
  // visible to the model on later turns. Dropping tool parts here would mean "change
  // the title" on turn 2 has no idea what the draft from turn 1 even said.
  const modelMessages = await convertToModelMessages(messages, {
    tools: agentTools,
    ignoreIncompleteToolCalls: true,
  })

  const result = streamText({
    model: ollama,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    tools: agentTools,
    // Agentic loop: the model can call a tool, see the result, and decide to call
    // another (e.g. search -> read a file the search turned up) before answering.
    // Capped so a bad turn can't chain calls forever.
    stopWhen: stepCountIs(MAX_STEPS),
    // stopWhen counts every step against one shared budget. Left alone, a turn that
    // does a few research calls could leave too few steps for saveDraft to ever get
    // called. Cap the *research* portion separately: once MAX_TOOL_STEPS steps have
    // used a research tool, take those tools out of play for the rest of the turn —
    // saveDraft stays available throughout, since it's never counted here.
    prepareStep: ({ steps }) => {
      const researchStepsUsed = steps.filter(s =>
        s.toolCalls.some(tc => (RESEARCH_TOOL_NAMES as readonly string[]).includes(tc.toolName)),
      ).length
      return researchStepsUsed >= MAX_TOOL_STEPS ? { activeTools: ['saveDraft'] } : {}
    },
    // Generous explicit cap so a full blog draft can't be silently truncated by
    // a provider's smaller default output-token limit.
    maxOutputTokens: 8192,
    onError({ error }) {
      // Server-side log only — the client-visible error is handled by
      // toUIMessageStreamResponse's onError below.
      console.error('[blog-agent] streamText error:', error)
    },
  })

  return result.toUIMessageStreamResponse({
    onError(error) {
      console.error('[blog-agent] stream error:', error)
      return `Agent error: ${errorMessage(error)}`
    },
  })
}
