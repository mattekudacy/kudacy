import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const OWNER = 'mattekudacy'
const REPO = 'kudacy'
const BRANCH = 'main'

export async function POST(req: Request) {
  const secret = req.headers.get('x-secret')
  if (!secret || secret !== process.env.AGENT_PASSWORD) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { content, slug } = await req.json()
  if (!content || !slug) {
    return Response.json({ error: 'content and slug are required' }, { status: 400 })
  }

  const path = `src/content/blog/${slug}.md`

  let sha: string | undefined
  try {
    const { data } = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH })
    if (!Array.isArray(data) && data.type === 'file') {
      sha = data.sha
    }
  } catch {
    // file doesn't exist yet — sha stays undefined
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `blog: add ${slug}`,
    content: Buffer.from(content).toString('base64'),
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  })

  const url = `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${path}`
  return Response.json({ success: true, url })
}
