'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendar, FaClock, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost, urlFor } from '@/lib/sanity';

export default function BlogPageClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (post: BlogPost) => {
    if (post.mainImage) {
      return urlFor(post.mainImage).width(600).height(400).url();
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/#blog" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
            >
              <FaArrowLeft /> Back to Home
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Sharing my journey through tech talks, conference experiences, and learnings in AI/ML.
            </p>
          </motion.div>

          {/* Posts Grid */}
          {initialPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="h-full rounded-3xl overflow-hidden bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                        {getImageUrl(post) ? (
                          <img 
                            src={getImageUrl(post)!} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl">📝</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                        
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="absolute top-4 left-4 flex gap-2">
                            {post.categories.slice(0, 2).map((category) => (
                              <span 
                                key={typeof category === 'string' ? category : category._id}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                              >
                                {typeof category === 'string' ? category : category.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <FaCalendar className="text-xs" />
                            {formatDate(post.publishedAt)}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <FaClock className="text-xs" />
                              {post.readTime} min read
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                          Read More <FaArrowRight className="text-xs" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <p className="text-gray-400 text-lg mb-2">No blog posts yet</p>
              <p className="text-gray-500 text-sm">Check back soon for talks and experiences!</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
