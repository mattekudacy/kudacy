'use client'

import { useState, FormEvent } from 'react'

interface Props {
  onAuthenticated: (password: string) => void
}

export default function PasswordGate({ onAuthenticated }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Send a minimal valid UIMessage array to verify the password server-side
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-secret': password },
        body: JSON.stringify({
          messages: [
            {
              id: 'probe',
              role: 'user',
              parts: [{ type: 'text', text: 'hi' }],
            },
          ],
        }),
      })

      if (res.status === 401) {
        setError('Wrong password. Try again.')
      } else {
        sessionStorage.setItem('agentPassword', password)
        onAuthenticated(password)
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 font-mono">
      <div className="border border-zinc-700 p-8 w-full max-w-sm">
        <div className="text-primary text-xs mb-1">// blog-agent</div>
        <h1 className="text-white text-lg font-bold mb-6">Authentication required</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-primary placeholder:text-zinc-600"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="bg-primary text-zinc-950 font-bold py-2 text-sm hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
