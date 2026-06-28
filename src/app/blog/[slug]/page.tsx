import { getPostBySlug, getAllPosts } from '@/lib/posts';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const SITE_URL = "https://mattekudacy.is-a.dev";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: ["Cyrus Mante"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: "Cyrus Mante", url: SITE_URL },
    datePublished: post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
