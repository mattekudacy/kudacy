import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Cyrus Mante',
  description: 'Talks, experiences, and insights from Cyrus Mante on AI, Machine Learning, and Data Science',
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient initialPosts={posts} />;
}
