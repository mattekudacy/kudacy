'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Post } from '@/lib/posts';
import Footer from '@/components/Footer';

export default function BlogPageClient({ initialPosts }: { initialPosts: Post[] }) {
  const formatDate = (dateString: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).toLowerCase()
      : '';

  return (
    <div className="max-w-6xl mx-auto border-x terminal-border min-h-screen">
      <main className="p-6 md:p-12">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-sm mb-8"
          >
            <FaArrowLeft className="text-xs" /> back to home
          </Link>
          <h1 className="text-2xl font-light text-zinc-900 dark:text-white mb-1">//blog</h1>
          <p className="text-zinc-500 dark:text-zinc-600 text-sm">
            talks, projects, and learnings in AI/ML.
          </p>
        </div>

        {initialPosts.length > 0 ? (
          <div className="space-y-8 max-w-2xl">
            {initialPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="text-zinc-500 dark:text-zinc-600 text-xs">
                      {formatDate(post.publishedAt)}
                    </span>
                    <h2 className="text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors mt-1 text-sm font-medium">
                      {post.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-500 text-sm mt-1">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
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
                  </div>
                  <FaArrowRight className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 text-xs" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-600 text-sm">no posts yet. check back soon!</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
