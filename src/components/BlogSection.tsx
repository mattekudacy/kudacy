'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { BlogPost } from '@/lib/sanity';

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toLowerCase();
  };

  if (loading) {
    return (
      <section className="max-w-4xl">
        <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest">//blog</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-1/4 mb-2" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl">
      <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium uppercase tracking-widest">//blog</h2>
      <p className="text-zinc-500 dark:text-zinc-600 text-sm mb-8">
        sharing insights from talks, projects, and learnings in AI/ML.
      </p>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <span className="text-zinc-500 dark:text-zinc-600 text-xs">{formatDate(post.publishedAt)}</span>
                  <h3 className="text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors mt-1 text-sm">
                    {post.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-500 text-sm mt-1">
                    {post.excerpt}
                  </p>
                </div>
                <FaArrowRight className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 text-xs" />
              </div>
            </Link>
          ))}

          <div className="pt-4">
            <Link
              href="/blog"
              className="text-zinc-500 hover:text-primary transition-colors text-sm"
            >
              view all posts →
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-zinc-500 dark:text-zinc-600 text-sm">
          no posts found. check back soon!
        </p>
      )}
    </section>
  );
};

export default BlogSection;
