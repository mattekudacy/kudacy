import { createOpenAI } from '@ai-sdk/openai'
import { streamText, UIMessage, isTextUIPart } from 'ai'

// Ollama exposes an OpenAI-compatible endpoint, so we can reuse @ai-sdk/openai
// as the client and just point it at Ollama instead of OpenAI.
//
// - Self-hosted Ollama: OLLAMA_BASE_URL=http://<your-host>:11434/v1 (OLLAMA_API_KEY optional,
//   only needed if you've put the server behind auth)
// - Ollama's hosted cloud models: OLLAMA_BASE_URL=https://ollama.com/v1, OLLAMA_API_KEY=<your key>
//
// Set OLLAMA_BASE_URL / OLLAMA_API_KEY / OLLAMA_MODEL as env vars in Vercel (Project Settings ->
// Environment Variables) — nothing else in this file needs to change per-environment.
const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL ?? 'https://ollama.com/v1',
  apiKey: process.env.OLLAMA_API_KEY,
})

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'gpt-oss:120b'

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

## Rules
- Never write a draft without explicit user approval.
- Never ask more than 4 questions at once.
- Keep your messages concise — you are a collaborator, not a lecturer.`

export async function POST(req: Request) {
  const secret = req.headers.get('x-secret')
  if (!secret || secret !== process.env.AGENT_PASSWORD) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  const modelMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.parts.filter(isTextUIPart).map(p => p.text).join(''),
    }))

  const result = streamText({
    model: ollama(OLLAMA_MODEL),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
  })

  return result.toTextStreamResponse()
}
