import { tool } from 'ai'
import { z } from 'zod'
import { Octokit } from '@octokit/rest'

// Tools available to the blog agent's tool-calling loop (see src/app/api/chat/route.ts).
// Each tool is defensive about missing config/failures — it returns a structured
// `{ error }` payload instead of throwing, so a bad search or a rate-limited API call
// degrades to "tell the user this isn't available" rather than crashing the whole run.

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

// Defaults to the user's own portfolio repo so "look at my repo" works out of the box;
// tools accept an explicit owner/repo to reach elsewhere.
const DEFAULT_OWNER = 'mattekudacy'
const DEFAULT_REPO = 'kudacy'

const MAX_FILE_CHARS = 20_000 // guard against a huge file blowing up the context window

export const searchWeb = tool({
  description:
    'Search the public web for up-to-date information, articles, or examples to ground a blog post in real sources. Only call this when outside context would actually help the post — not on every message. TAVILY_API_KEY must be set; if it errors, tell the user web search is not configured yet.',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
    maxResults: z
      .number()
      .int()
      .min(1)
      .max(10)
      .optional()
      .describe('Number of results to return (default 5)'),
  }),
  execute: async ({ query, maxResults }) => {
    const apiKey = process.env.TAVILY_API_KEY
    if (!apiKey) {
      return { error: 'Web search is not configured yet (missing TAVILY_API_KEY).' }
    }

    try {
      const res = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query,
          max_results: maxResults ?? 5,
          search_depth: 'basic',
        }),
      })

      if (!res.ok) {
        return { error: `Tavily search failed with status ${res.status}` }
      }

      const data = await res.json()
      const results: Array<{ title: string; url: string; content: string }> = data.results ?? []
      return {
        results: results.map(r => ({ title: r.title, url: r.url, content: r.content })),
      }
    } catch (err) {
      return { error: `Web search failed: ${err instanceof Error ? err.message : 'unknown error'}` }
    }
  },
})

export const searchGithubCode = tool({
  description:
    "Search code across a GitHub repo by keyword — use this to locate where something is implemented before reading the full file with readGithubFile. Defaults to the user's own portfolio repo (mattekudacy/kudacy); pass a different owner/repo to search elsewhere.",
  inputSchema: z.object({
    query: z.string().describe('Search keywords, e.g. "streamText" or "blog agent"'),
    owner: z.string().optional(),
    repo: z.string().optional(),
  }),
  execute: async ({ query, owner, repo }) => {
    try {
      const { data } = await octokit.search.code({
        q: `${query} repo:${owner ?? DEFAULT_OWNER}/${repo ?? DEFAULT_REPO}`,
      })
      return {
        results: data.items.slice(0, 10).map(item => ({ path: item.path, url: item.html_url })),
      }
    } catch (err) {
      return { error: `GitHub code search failed: ${err instanceof Error ? err.message : 'unknown error'}` }
    }
  },
})

export const readGithubFile = tool({
  description:
    "Read a file's contents from a GitHub repo — defaults to the user's own portfolio repo (mattekudacy/kudacy) so you can ground a blog post in real code or docs from their project. Pass a different owner/repo to read from elsewhere.",
  inputSchema: z.object({
    path: z.string().describe('File path within the repo, e.g. src/app/page.tsx'),
    owner: z.string().optional(),
    repo: z.string().optional(),
    ref: z.string().optional().describe('Branch, tag, or commit SHA (default: repo default branch)'),
  }),
  execute: async ({ path, owner, repo, ref }) => {
    try {
      const { data } = await octokit.repos.getContent({
        owner: owner ?? DEFAULT_OWNER,
        repo: repo ?? DEFAULT_REPO,
        path,
        ...(ref ? { ref } : {}),
      })

      if (Array.isArray(data) || data.type !== 'file' || !('content' in data)) {
        return { error: `${path} is a directory, not a file` }
      }

      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return {
        path,
        content: content.slice(0, MAX_FILE_CHARS),
        truncated: content.length > MAX_FILE_CHARS,
      }
    } catch (err) {
      return { error: `Could not read ${path}: ${err instanceof Error ? err.message : 'unknown error'}` }
    }
  },
})

export const agentTools = { searchWeb, searchGithubCode, readGithubFile }
