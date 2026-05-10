'use client'

import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
  password: string
}

function extractMarkdown(raw: string): string {
  // Try to find ```md ... ``` fences first
  const mdFence = raw.match(/```md\s*([\s\S]*?)```/)
  if (mdFence) return mdFence[1].trim()

  // Fall back to any fenced block
  const anyFence = raw.match(/```(?:\w+)?\s*([\s\S]*?)```/)
  if (anyFence) return anyFence[1].trim()

  return raw
}

function extractSlug(markdown: string): string {
  const slugMatch = markdown.match(/^slug:\s*["']?(.+?)["']?\s*$/m)
  if (slugMatch) return slugMatch[1].trim()

  const titleMatch = markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  if (titleMatch) {
    return titleMatch[1]
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return `post-${Date.now()}`
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export default function PreviewPanel({ content, password }: Props) {
  const [publishState, setPublishState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [publishResult, setPublishResult] = useState('')
  const [copied, setCopied] = useState(false)

  const markdown = useMemo(() => extractMarkdown(content), [content])
  const slug = useMemo(() => extractSlug(markdown), [markdown])
  const words = useMemo(() => wordCount(markdown), [markdown])
  const chars = useMemo(() => markdown.length, [markdown])

  async function handlePublish() {
    setPublishState('loading')
    setPublishResult('')

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-secret': password },
        body: JSON.stringify({ content: markdown, slug }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setPublishState('success')
        setPublishResult(`Published: src/content/blog/${slug}.md`)
      } else {
        setPublishState('error')
        setPublishResult(data.error ?? 'Publish failed')
      }
    } catch {
      setPublishState('error')
      setPublishResult('Network error')
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0 gap-2 flex-wrap">
        <span className="text-primary text-xs font-bold">// preview</span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 text-xs">{words}w / {chars}c</span>
          <button
            onClick={handleCopy}
            className="text-zinc-400 text-xs border border-zinc-700 px-2 py-1 hover:border-zinc-500 hover:text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy MD'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishState === 'loading' || !markdown.trim()}
            className="bg-primary text-zinc-950 font-bold px-3 py-1 text-xs hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            {publishState === 'loading' ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Publish feedback */}
      {publishResult && (
        <div
          className={`px-4 py-2 text-xs border-b shrink-0 ${
            publishState === 'success'
              ? 'text-primary border-zinc-800 bg-primary/5'
              : 'text-red-400 border-zinc-800 bg-red-900/10'
          }`}
        >
          {publishResult}
          {publishState === 'success' && (
            <span className="text-zinc-500 ml-2">— slug: {slug}</span>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {!markdown.trim() ? (
          <p className="text-zinc-600 text-xs text-center mt-8">
            The draft will appear here once the assistant produces markdown.
          </p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-headings:font-mono prose-headings:text-white prose-p:text-zinc-300 prose-code:text-primary prose-code:bg-zinc-900 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-primary prose-strong:text-white prose-li:text-zinc-300">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
