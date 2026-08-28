import { createOpenAI } from '@ai-sdk/openai'
import { createTextStreamResponse, streamText, stepCountIs, UIMessage, isTextUIPart } from 'ai'
import { agentTools } from '@/lib/agent-tools'

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

const SYSTEM_PROMPT = `You are a blog writing assistant for a personal developer portfolio. Your job is to help the user think through and craft a great blog post — but you never start writing until they are ready.

## Your process

1. **Understand first.** When the user describes a topic, ask 2–4 focused questions to understand what they want to say. Good questions cover: the core idea or story, the target audience, the tone (tutorial, opinion, story, etc.), any specific points or sections they have in mind, and roughly how long it should be.

2. **Dig deeper if needed.** If their answers are vague, ask one follow-up at a time. Don't overwhelm them with questions — keep it conversational.

3. **Summarise and ask permission.** Once you have enough to write a solid post, summarise your understanding in a few bullet points and ask: "Ready for me to write a draft based on this?" Do not start writing until the user confirms.

4. **Write the full draft.** Only after the user says yes (or words to that effect), produce the complete markdown draft inside a code fence like this:

\`\`\`md
---
title: ""
date: "YYYY-MM-DD"
description: ""
tags: []
slug: ""
---

Post content here...
\`\`\`

5. **Refine on request.** If the user asks for changes, apply them and always output the full updated draft inside the same \`\`\`md fence so the preview stays current.

## Tools

You have three tools: \`searchWeb\` (Tavily), \`searchGithubCode\`, and \`readGithubFile\` (both default to the user's own portfolio repo). Use them to ground the post in real sources — pull a real example from the user's repo, or check a current fact/reference online — instead of guessing. Rules:
- Only call a tool when it would materially improve the post. Don't search or read files on every turn just because you can.
- Prefer the repo tools when the user references "my repo", "my project", or "how I built X" — search for the relevant code first, then read the specific file.
- After using a tool, briefly tell the user what you looked at and why (e.g. "I checked your \`route.ts\` — here's what it does") so tool use stays visible in the conversation, since it doesn't render in the UI on its own.
- If a tool returns an error (e.g. search isn't configured yet), say so plainly and keep going without it — never block the conversation on a missing tool.

## Rules
- Never write a draft without explicit user approval.
- Never ask more than 4 questions at once.
- Keep your messages concise — you are a collaborator, not a lecturer.`

// Short, human-readable status line shown in the chat while a tool call is in flight —
// this is the only signal the user gets that the agent is "doing something" beyond
// waiting on the model, since tool calls otherwise don't render as their own UI.
function describeToolCall(toolName: string, input: unknown): string {
  const args = (input ?? {}) as Record<string, unknown>
  switch (toolName) {
    case 'searchWeb':
      return `searching the web for "${args.query ?? ''}"`
    case 'searchGithubCode':
      return `searching ${args.owner ?? 'mattekudacy'}/${args.repo ?? 'kudacy'} for "${args.query ?? ''}"`
    case 'readGithubFile':
      return `reading ${args.owner ?? 'mattekudacy'}/${args.repo ?? 'kudacy'}/${args.path ?? ''}`
    default:
      return `calling ${toolName}`
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
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
    return createTextStreamResponse({
      textStream: new ReadableStream({
        start(controller) {
          controller.enqueue(
            "⚠️ Agent error: OLLAMA_API_KEY is not set. It's required for https://ollama.com/v1 (Ollama's hosted cloud). Add it in Vercel → Project Settings → Environment Variables and redeploy.",
          )
          controller.close()
        },
      }),
    })
  }

  const modelMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.parts.filter(isTextUIPart).map(p => p.text).join(''),
    }))

  const result = streamText({
    model: ollama,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    tools: agentTools,
    // Agentic loop: the model can call a tool, see the result, and decide to call
    // another (e.g. search -> read a file the search turned up) before answering.
    // Capped so a bad turn can't chain calls forever.
    stopWhen: stepCountIs(6),
    onError({ error }) {
      // Doesn't reach the client (the client-visible message is injected into the
      // text stream below) — this is so failures are still visible in Vercel logs.
      console.error('[blog-agent] streamText error:', error)
    },
  })

  // Build the plain-text response from the full event stream (not just
  // result.toTextStreamResponse()) so we can interleave a short status line for
  // each tool call and turn any failure — a tool erroring, the model provider
  // rejecting the request, a mid-stream disconnect — into a message the user
  // actually sees in the chat, instead of the reply just going quiet.
  const textStream = new ReadableStream<string>({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          switch (part.type) {
            case 'text-delta':
              controller.enqueue(part.text)
              break
            case 'tool-call':
              controller.enqueue(`\n\n_→ ${describeToolCall(part.toolName, part.input)}…_\n\n`)
              break
            case 'tool-result': {
              // Our tools return { error } instead of throwing on a handled failure
              // (e.g. missing TAVILY_API_KEY) — surface that inline too.
              const output = part.output as { error?: string } | undefined
              if (output && typeof output === 'object' && output.error) {
                controller.enqueue(`\n\n⚠️ ${part.toolName} error: ${output.error}\n\n`)
              }
              break
            }
            case 'tool-error':
              controller.enqueue(`\n\n⚠️ ${part.toolName} failed: ${errorMessage(part.error)}\n\n`)
              break
            case 'error':
              controller.enqueue(`\n\n⚠️ Agent error: ${errorMessage(part.error)}\n\n`)
              break
            case 'abort':
              controller.enqueue(`\n\n⚠️ Generation was aborted${part.reason ? `: ${part.reason}` : '.'}\n\n`)
              break
            default:
              break
          }
        }
      } catch (err) {
        console.error('[blog-agent] stream failed:', err)
        controller.enqueue(`\n\n⚠️ Agent error: ${errorMessage(err)}\n\n`)
      } finally {
        controller.close()
      }
    },
  })

  return createTextStreamResponse({ textStream })
}
