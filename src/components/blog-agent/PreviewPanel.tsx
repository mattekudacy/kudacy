'use client'

import { useState, useMemo, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

interface PostMeta {
  slug: string
  title: string
}

interface Props {
  content: string
  password: string
  onPostLoaded?: (raw: string) => void
}

// The agent is asked (see the system prompt) to wrap the whole draft in a 4-backtick
// fence (````md ... ````) specifically because the draft itself can contain 3-backtick
// code examples — a 4-backtick outer delimiter can never be confused with a 3-backtick
// inner one, so this is unambiguous. Any run of 4+ backticks (matching or exceeding the
// opener's length) closes it. Returns null while still streaming (no closing line yet).
function extractLongMdFence(raw: string): string | null {
  const lines = raw.split('\n')
  const startIdx = lines.findIndex(l => /^`{4,}md\s*$/.test(l.trim()))
  if (startIdx === -1) return null

  const fenceLen = lines[startIdx].trim().match(/^`+/)![0].length
  const closeRe = new RegExp(`^\`{${fenceLen},}\\s*$`)
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (closeRe.test(lines[i].trim())) {
      return lines.slice(startIdx + 1, i).join('\n').trim()
    }
  }
  return null
}

// Fallback for a plain 3-backtick ```md fence (e.g. a message sent before the agent
// picked up the 4-backtick convention, or if it forgets). This is inherently a little
// ambiguous — an *untagged* inner fence (a bare ``` code block, like raw CLI output)
// looks identical to the real closing delimiter — so we take the LAST bare ``` in the
// text as the close: a post is far more likely to end right after its true closing
// fence than to end with a trailing untagged code block. Tagged inner fences
// (```python etc.) are unambiguous and never match here, so they're ignored.
function extractFence(raw: string, tag?: string): string | null {
  const lines = raw.split('\n')
  const isOpen = tag ? (l: string) => l.trim() === '```' + tag : (l: string) => /^```\S*$/.test(l.trim())
  const startIdx = lines.findIndex(isOpen)
  if (startIdx === -1) return null

  let lastCloseIdx = -1
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].trim() === '```') lastCloseIdx = i
  }
  if (lastCloseIdx === -1) return null
  return lines.slice(startIdx + 1, lastCloseIdx).join('\n').trim()
}

function extractMarkdown(raw: string): string {
  return extractLongMdFence(raw) ?? extractFence(raw, 'md') ?? extractFence(raw) ?? ''
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

type Mode = 'edit' | 'preview'

export default function PreviewPanel({ content, password, onPostLoaded }: Props) {
  const [draft, setDraft] = useState('')
  const [mode, setMode] = useState<Mode>('preview')
  const [publishState, setPublishState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [publishResult, setPublishResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loadingPost, setLoadingPost] = useState(false)
  const [activeSlug, setActiveSlug] = useState('')
  const [deleteState, setDeleteState] = useState<'idle' | 'loading'>('idle')
  const [uploading, setUploading] = useState(false)

  // Load post list on mount
  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then((data: PostMeta[]) => setPosts(data))
      .catch(() => {})
  }, [])

  async function handleSelectPost(slug: string) {
    if (!slug) {
      setActiveSlug('')
      setDraft('')
      return
    }
    setLoadingPost(true)
    try {
      const res = await fetch(`/api/blog?slug=${slug}`)
      const data = await res.json()
      if (data.raw) {
        setDraft(data.raw)
        setActiveSlug(slug)
        setMode('edit')
        onPostLoaded?.(data.raw)
      }
    } catch {}
    setLoadingPost(false)
  }

  async function handleDelete() {
    if (!activeSlug) return
    if (!confirm(`Delete "${activeSlug}"? This cannot be undone.`)) return
    setDeleteState('loading')
    try {
      const res = await fetch('/api/publish', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-secret': password },
        body: JSON.stringify({ slug: activeSlug }),
      })
      if (res.ok) {
        setDraft('')
        setActiveSlug('')
        setPosts(posts.filter(p => p.slug !== activeSlug))
        setPublishState('success')
        setPublishResult(`Deleted: ${activeSlug}`)
      } else {
        setPublishState('error')
        setPublishResult('Delete failed')
      }
    } catch {
      setPublishState('error')
      setPublishResult('Network error')
    }
    setDeleteState('idle')
  }

  // Only sync draft from AI once its fenced block has actually closed — extractMarkdown
  // returns '' while streaming (fence still open) or when there's no fence at all, so
  // this naturally skips clarifying-question messages and mid-stream partial drafts.
  useEffect(() => {
    if (!content) return
    const extracted = extractMarkdown(content)
    if (extracted) setDraft(extracted)
  }, [content])

  const slug = useMemo(() => extractSlug(draft), [draft])
  const words = useMemo(() => draft.trim().split(/\s+/).filter(Boolean).length, [draft])
  const chars = useMemo(() => draft.length, [draft])

  async function handlePublish() {
    setPublishState('loading')
    setPublishResult('')
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-secret': password },
        body: JSON.stringify({ content: draft, slug }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPublishState('success')
        setPublishResult(`Published: src/data/posts/${slug}.md`)
      } else {
        setPublishState('error')
        setPublishResult(data.error ?? 'Publish failed')
      }
    } catch {
      setPublishState('error')
      setPublishResult('Network error')
    }
  }

  async function uploadImage(file: File, cursorPos: number) {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-secret': password },
        body: form,
      })
      const data = await res.json()
      if (res.ok && data.url) {
        const tag = `<img src="${data.url}" width="600" alt="${file.name.replace(/\.[^.]+$/, '')}" style="display:block; margin:0 auto;" />`
        setDraft(prev => prev.slice(0, cursorPos) + tag + prev.slice(cursorPos))
      }
    } catch {}
    setUploading(false)
  }

  function handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const pos = (e.target as HTMLTextAreaElement).selectionStart ?? draft.length
    uploadImage(file, pos)
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'))
    if (!file) return
    e.preventDefault()
    const pos = (e.target as HTMLTextAreaElement).selectionStart ?? draft.length
    uploadImage(file, pos)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0 gap-2 flex-wrap">
        {/* Post picker + mode tabs */}
        <div className="flex items-center gap-2">
          <select
            onChange={e => handleSelectPost(e.target.value)}
            defaultValue=""
            disabled={loadingPost}
            className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs px-2 py-1 focus:outline-none focus:border-primary disabled:opacity-40 max-w-[160px]"
          >
            <option value="">load existing…</option>
            {posts.map(p => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* Mode tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('edit')}
            className={`px-3 py-1 text-xs border transition-colors ${
              mode === 'edit'
                ? 'border-primary text-primary bg-primary/10'
                : 'border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`px-3 py-1 text-xs border transition-colors ${
              mode === 'preview'
                ? 'border-primary text-primary bg-primary/10'
                : 'border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 text-xs">{words}w / {chars}c</span>
          <button
            onClick={handleCopy}
            disabled={!draft.trim()}
            className="text-zinc-400 text-xs border border-zinc-700 px-2 py-1 hover:border-zinc-500 hover:text-white transition-colors disabled:opacity-30"
          >
            {copied ? 'Copied!' : 'Copy MD'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishState === 'loading' || !draft.trim()}
            className="bg-primary text-zinc-950 font-bold px-3 py-1 text-xs hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            {publishState === 'loading' ? 'Publishing...' : 'Publish'}
          </button>
          {activeSlug && (
            <button
              onClick={handleDelete}
              disabled={deleteState === 'loading'}
              className="text-red-400 text-xs border border-red-900 px-2 py-1 hover:border-red-500 hover:text-red-300 transition-colors disabled:opacity-40"
            >
              {deleteState === 'loading' ? 'Deleting...' : 'Delete'}
            </button>
          )}
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

      {/* Edit pane */}
      {mode === 'edit' && (
        <div className="relative flex-1 flex flex-col">
          {uploading && (
            <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center z-10 text-xs text-primary">
              uploading image...
            </div>
          )}
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onPaste={handlePaste}
            spellCheck={false}
            placeholder="The markdown draft will appear here once the assistant writes one. You can also type directly. Drop or paste images to upload."
            className="flex-1 bg-zinc-950 text-zinc-200 text-sm px-6 py-4 resize-none focus:outline-none font-mono leading-relaxed placeholder:text-zinc-700"
          />
        </div>
      )}

      {/* Preview pane */}
      {mode === 'preview' && (
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!draft.trim() ? (
            <p className="text-zinc-600 text-xs text-center mt-8">
              The rendered draft will appear here once the assistant writes one.
            </p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:font-mono prose-headings:text-white prose-p:text-zinc-300 prose-code:text-primary prose-code:bg-zinc-900 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-primary prose-strong:text-white prose-li:text-zinc-300">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{draft}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
