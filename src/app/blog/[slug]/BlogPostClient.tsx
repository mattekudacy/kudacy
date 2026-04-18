'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { Post } from '@/lib/posts';
import Footer from '@/components/Footer';

function formatDate(dateString: string) {
  return dateString
    ? new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).toLowerCase()
    : '';
}

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <div className="max-w-6xl mx-auto border-x terminal-border min-h-screen">
      <main className="p-6 md:p-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-sm mb-10"
        >
          <FaArrowLeft className="text-xs" /> back to blog
        </Link>

        <article className="max-w-2xl">
          <header className="mb-10">
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-zinc-500 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-white mb-3">
              {post.title}
            </h1>
            <time className="text-zinc-500 dark:text-zinc-600 text-xs">
              {formatDate(post.publishedAt)}
            </time>
          </header>

          <div
            className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-light prose-headings:text-zinc-900 dark:prose-headings:text-white
              prose-p:text-zinc-700 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-primary prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded
              prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800
              prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700
              prose-li:text-zinc-700 dark:prose-li:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: post.contentHtml ?? '' }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
