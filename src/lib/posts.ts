import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'src/data/posts');

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  contentHtml?: string;
}

function ensureDir() {
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
}

export function getAllPosts(): Post[] {
  ensureDir();
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        publishedAt: data.date ?? '',
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureDir();
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    publishedAt: data.date ?? '',
    tags: data.tags ?? [],
    contentHtml: processed.toString(),
  };
}
