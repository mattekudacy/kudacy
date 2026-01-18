'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      <section id="blog" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-gray-800">
        <div className="w-full">
          <p className="text-gray-400 text-sm mb-6 md:mb-8">//blog</p>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
                <div className="h-5 bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-gray-800">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm mb-2">//blog</p>
          <p className="text-gray-400 text-xs sm:text-sm mb-6 md:mb-8">
            <span className="text-gray-500">// </span>
            sharing insights from talks, projects, and learnings in AI/ML.
          </p>

          {posts.length > 0 ? (
            <div className="space-y-5 md:space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="group block"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-gray-500 text-xs sm:text-sm">{formatDate(post.publishedAt)}</span>
                        <h3 className="text-white group-hover:underline mt-1 text-sm sm:text-base break-words">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                          <span className="text-gray-500">// </span>
                          {post.excerpt}
                        </p>
                      </div>
                      <FaArrowRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 text-xs sm:text-sm" />
                    </div>
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4">
                <Link 
                  href="/blog"
                  className="text-gray-500 hover:text-white hover:underline text-sm"
                >
                  view all posts →
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              <span className="text-gray-500">// </span>
              no posts found. check back soon!
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
