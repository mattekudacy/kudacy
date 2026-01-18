import { getAllPosts } from '@/lib/sanity';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Cyrus Mante',
  description: 'Talks, experiences, and insights from Cyrus Mante on AI, Machine Learning, and Data Science',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogPageClient initialPosts={posts} />;
}
