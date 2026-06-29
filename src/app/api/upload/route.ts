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

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
  const filename = `${safeName}.${ext}`
  const path = `public/images/blog/${filename}`

  const arrayBuffer = await file.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  let sha: string | undefined
  try {
    const { data } = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH })
    if (!Array.isArray(data) && data.type === 'file') sha = data.sha
  } catch {
    // new file
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `blog: upload image ${filename}`,
    content: base64,
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  })

  return Response.json({ url: `/images/blog/${filename}` })
}
