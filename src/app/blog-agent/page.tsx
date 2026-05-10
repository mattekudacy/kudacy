'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import PasswordGate from '@/components/blog-agent/PasswordGate'

// Dynamically import heavy panels to avoid SSR issues with sessionStorage + useChat
const ChatPanel = dynamic(() => import('@/components/blog-agent/ChatPanel'), { ssr: false })
const PreviewPanel = dynamic(() => import('@/components/blog-agent/PreviewPanel'), { ssr: false })

export default function BlogAgentPage() {
  const [password, setPassword] = useState<string | null>(null)
  const [latestDraft, setLatestDraft] = useState('')
  const [loadedPost, setLoadedPost] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = sessionStorage.getItem('agentPassword')
    if (stored) setPassword(stored)
  }, [])

  const handleAuthenticated = useCallback((pw: string) => {
    setPassword(pw)
  }, [])

  const handleNewMessage = useCallback((content: string) => {
    setLatestDraft(content)
  }, [])

  const handleReset = useCallback(() => {
    setLatestDraft('')
    setLoadedPost('')
  }, [])

  const handlePostLoaded = useCallback((raw: string) => {
    setLoadedPost(raw)
  }, [])

  if (!mounted) return null

  if (!password) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 border-b border-zinc-800 px-4 py-2 flex items-center gap-3 font-mono">
        <span className="text-primary text-xs font-bold">blog-agent</span>
        <span className="text-zinc-700 text-xs">|</span>
        <span className="text-zinc-500 text-xs">ai-assisted markdown drafting & publishing</span>
      </header>

      {/* Main two-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat */}
        <div className="w-1/2 border-r border-zinc-800 overflow-hidden">
          <ChatPanel
            password={password}
            onNewAssistantMessage={handleNewMessage}
            onReset={handleReset}
            postContext={loadedPost}
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 overflow-hidden">
          <PreviewPanel content={latestDraft} password={password} onPostLoaded={handlePostLoaded} />
        </div>
      </div>
    </div>
  )
}
