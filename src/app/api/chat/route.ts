import OpenAI from 'openai'
import { createTextStreamResponse, UIMessage, isTextUIPart } from 'ai'

const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
})

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

  const postContextEncoded = req.headers.get('x-post-context')
  const postContext = postContextEncoded ? decodeURIComponent(postContextEncoded) : null

  const { messages }: { messages: UIMessage[] } = await req.json()

  const openaiMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.parts.filter(isTextUIPart).map(p => p.text).join(''),
    }))

  const systemMessages: { role: 'system'; content: string }[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(postContext ? [{
      role: 'system' as const,
      content: `The user has loaded the following blog post. Use it as context when helping them improve, rewrite, or build on it. When producing an updated version, always output the full markdown inside a \`\`\`md fence.\n\n${postContext}`,
    }] : []),
  ]

  const stream = await client.chat.completions.create({
    model: 'openai/gpt-4o',
    stream: true,
    messages: [...systemMessages, ...openaiMessages],
  })

  const textStream = new ReadableStream<string>({
    async start(controller) {
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content
        if (delta) controller.enqueue(delta)
      }
      controller.close()
    },
  })

  return createTextStreamResponse({ textStream })
}
