'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post } from '@/lib/posts';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).toLowerCase()
      : '';

  if (loading) {
    return (
      <section className="max-w-4xl">
        <h2 className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest border-l-2 border-primary/40 pl-3">
          //blog
        </h2>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse py-5 first:pt-0">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-1/4 mb-2" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <motion.h2
        variants={staggerItem}
        className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium uppercase tracking-widest border-l-2 border-primary/40 pl-3"
      >
        //blog
      </motion.h2>
      <motion.p variants={staggerItem} className="text-zinc-500 dark:text-zinc-600 text-sm mb-8 font-light">
        sharing insights from talks, projects, and learnings in AI/ML.
      </motion.p>

      {posts.length > 0 ? (
        <>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {posts.map((post) => (
              <motion.div key={post.slug} variants={staggerItem}>
                <Link href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-4 py-5 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-zinc-500 dark:text-zinc-600 text-xs">
                      {formatDate(post.publishedAt)}
                    </span>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors mt-1 text-sm">
                      {post.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 font-light">{post.excerpt}</p>
                  </div>
                  <FaArrowRight className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 text-xs" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={staggerItem} className="pt-4">
            <Link href="/blog" className="text-zinc-500 hover:text-primary transition-colors text-sm">
              view all posts →
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.p variants={staggerItem} className="text-zinc-500 dark:text-zinc-600 text-sm">
          no posts yet. check back soon.
        </motion.p>
      )}
    </motion.section>
  );
};

export default BlogSection;
