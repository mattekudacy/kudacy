'use client'

import { useState, useEffect, useRef, KeyboardEvent, useMemo, FormEvent, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage, isTextUIPart } from 'ai'

interface Props {
  password: string
  onDraftSaved: (markdown: string) => void
  onReset: () => void
  postContext?: string
}

type MessagePart = UIMessage['parts'][number]

// Loosely typed since useChat() isn't parameterized with our server's tool types here —
// matches the light `as`-casting style already used server-side for tool I/O.
type AnyToolPart = MessagePart & {
  toolName?: string
  state?: string
  input?: unknown
  output?: unknown
  errorText?: string
}

function isToolPart(part: MessagePart): part is AnyToolPart {
  return part.type === 'dynamic-tool' || part.type.startsWith('tool-')
}

function toolNameOf(part: AnyToolPart): string {
  return part.type === 'dynamic-tool' ? part.toolName ?? 'tool' : part.type.replace(/^tool-/, '')
}

// Short, human-readable status line rendered inline while/after a tool call — the only
// signal the user gets that the agent is doing something beyond waiting on the model,
// since tool calls don't render as anything on their own.
function describeTool(part: AnyToolPart): string {
  const name = toolNameOf(part)
  const args = (part.input ?? {}) as Record<string, unknown>
  switch (name) {
    case 'searchWeb':
      return `searching the web for "${args.query ?? ''}"`
    case 'searchGithubCode':
      return `searching ${args.owner ?? 'mattekudacy'}/${args.repo ?? 'kudacy'} for "${args.query ?? ''}"`
    case 'readGithubFile':
      return `reading ${args.owner ?? 'mattekudacy'}/${args.repo ?? 'kudacy'}/${args.path ?? ''}`
    case 'saveDraft':
      return 'saving draft'
    default:
      return `calling ${name}`
  }
}

// Finds the most recent complete saveDraft tool call across all messages and returns
// its markdown input directly — this is the draft, already parsed and schema-validated
// by the SDK, no text-scanning involved. 'input-streaming' is excluded since the tool's
// JSON args may still be partial/invalid at that point.
function findLatestDraft(messages: UIMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const parts = messages[i].parts
    for (let j = parts.length - 1; j >= 0; j--) {
      const part = parts[j]
      if (!isToolPart(part) || toolNameOf(part) !== 'saveDraft') continue
      if (part.state !== 'input-available' && part.state !== 'output-available') continue
      const markdown = (part.input as { markdown?: unknown } | undefined)?.markdown
      if (typeof markdown === 'string') return markdown
    }
  }
  return null
}

export default function ChatPanel({ password, onDraftSaved, onReset, postContext }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        headers: { 'x-secret': password },
      }),
    [password],
  )

  const { messages, status, sendMessage, setMessages } = useChat({
    transport,
    onFinish() {
      setErrorMessage(null)
    },
    onError(error) {
      // Most failures (a 401 from a stale password, a network drop, the request
      // never reaching the server) surface here rather than as stream content —
      // without this the chat just sits at "thinking..." forever with no feedback.
      console.error('[blog-agent] chat error:', error)
      setErrorMessage(error.message || 'Something went wrong talking to the agent.')
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Seed post as hidden context in message history (filtered from UI rendering)
  useEffect(() => {
    if (!postContext) return
    setMessages([
      {
        id: 'ctx-user',
        role: 'user',
        parts: [{ type: 'text', text: `Here is the blog post I want to work on:\n\n${postContext}\n\nWait for my instructions before doing anything.` }],
      },
      {
        id: 'ctx-assistant',
        role: 'assistant',
        parts: [{ type: 'text', text: `Understood. Ready when you are.` }],
      },
    ])
  }, [postContext, setMessages])

  useEffect(() => {
    const draft = findLatestDraft(messages)
    if (draft) onDraftSaved(draft)
  }, [messages, onDraftSaved])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const submit = useCallback(() => {
    if (!isLoading && inputValue.trim()) {
      setErrorMessage(null)
      sendMessage({ text: inputValue })
      setInputValue('')
    }
  }, [isLoading, inputValue, sendMessage])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  function handleReset() {
    setMessages([])
    setErrorMessage(null)
    onReset()
  }

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-primary text-xs font-bold">// chat</span>
          {postContext && (
            <span className="text-zinc-500 text-xs border border-zinc-700 px-2 py-0.5">post loaded</span>
          )}
        </div>
        <button
          onClick={handleReset}
          className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors"
        >
          reset chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.filter(m => !m.id.startsWith('ctx-')).length === 0 && (
          <p className="text-zinc-600 text-xs text-center mt-8">
            {postContext ? 'Post loaded. Tell me what you want to change or improve.' : 'Start by describing the blog post you want to write.'}
          </p>
        )}
        {messages.filter(m => !m.id.startsWith('ctx-')).map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed break-words ${
                m.role === 'user'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
              }`}
            >
              {m.role === 'assistant' && (
                <span className="text-primary text-xs block mb-1">assistant</span>
              )}
              {m.parts.map((part, i) => {
                if (isTextUIPart(part)) {
                  return part.text ? (
                    <span key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </span>
                  ) : null
                }
                if (!isToolPart(part)) return null

                const output = part.output as { error?: string } | undefined
                if (part.state === 'output-error' || output?.error) {
                  return (
                    <div key={i} className="text-red-400 text-xs italic my-1">
                      ⚠ {toolNameOf(part)} error: {part.errorText ?? output?.error}
                    </div>
                  )
                }
                return (
                  <div key={i} className="text-zinc-500 text-xs italic my-1">
                    → {describeTool(part)}…
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 px-3 py-2">
              <span className="text-primary text-xs block mb-1">assistant</span>
              <span className="text-zinc-500 text-sm animate-pulse">thinking...</span>
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-red-950/40 border border-red-900 px-3 py-2 text-sm text-red-300 whitespace-pre-wrap break-words">
              <span className="text-red-400 text-xs font-bold block mb-1">⚠ error</span>
              {errorMessage}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-zinc-800 shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a blog post about... (Enter to send, Shift+Enter for newline)"
            rows={3}
            className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-sm px-3 py-2 resize-none focus:outline-none focus:border-primary placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary text-zinc-950 font-bold px-4 py-2 text-xs hover:bg-primary/90 transition-colors disabled:opacity-40 self-end"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
