'use client'

import { useState, useEffect, useRef, KeyboardEvent, useMemo, FormEvent, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport, UIMessage, isTextUIPart } from 'ai'

interface Props {
  password: string
  onNewAssistantMessage: (content: string) => void
  onReset: () => void
  postContext?: string
}

function getTextContent(msg: UIMessage): string {
  return msg.parts
    .filter(isTextUIPart)
    .map(p => p.text)
    .join('')
}

export default function ChatPanel({ password, onNewAssistantMessage, onReset, postContext }: Props) {
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: '/api/chat',
        headers: { 'x-secret': password },
      }),
    [password],
  )

  const { messages, status, sendMessage, setMessages } = useChat({
    transport,
    onFinish({ message }) {
      onNewAssistantMessage(getTextContent(message))
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
    const last = [...messages].reverse().find(m => m.role === 'assistant')
    if (last) onNewAssistantMessage(getTextContent(last))
  }, [messages, onNewAssistantMessage])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const submit = useCallback(() => {
    if (!isLoading && inputValue.trim()) {
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
        {messages.filter(m => !m.id.startsWith('ctx-')).map(m => {
          const text = getTextContent(m)
          return (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  m.role === 'user'
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                }`}
              >
                {m.role === 'assistant' && (
                  <span className="text-primary text-xs block mb-1">assistant</span>
                )}
                {text}
              </div>
            </div>
          )
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 px-3 py-2">
              <span className="text-primary text-xs block mb-1">assistant</span>
              <span className="text-zinc-500 text-sm animate-pulse">thinking...</span>
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
