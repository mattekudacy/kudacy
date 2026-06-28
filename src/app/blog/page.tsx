import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

const SITE_URL = 'https://mattekudacy.is-a.dev';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Talks, experiences, and insights from Cyrus Mante on AI, Machine Learning, and Data Science',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog | Cyrus Mante',
    description: 'Talks, experiences, and insights from Cyrus Mante on AI, Machine Learning, and Data Science',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient initialPosts={posts} />;
}
