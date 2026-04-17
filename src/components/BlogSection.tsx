'use client';

import React, { useEffect, useState } from 'react';
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
    });
  };

  return (
    <table id="blog" width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #660066', background: '#fff0ff', marginBottom: '8px' }}>
      <tbody>
        <tr>
          <td>
            <div style={{ background: 'linear-gradient(90deg, #660066, #cc00cc)', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
              📝 MY SUPER COOL BLOG POSTS!!! 📝
            </div>

            {loading ? (
              <div style={{ fontSize: '12px', fontFamily: '"Comic Sans MS", cursive', color: '#660066', textAlign: 'center', padding: '12px' }}>
                ⏳ Loading posts... please wait!!!
              </div>
            ) : posts.length > 0 ? (
              <table width="100%" cellPadding={0} cellSpacing={4}>
                <tbody>
                  {posts.map((post, idx) => (
                    <tr key={post._id}>
                      <td style={{ border: '2px inset #cc88cc', background: idx % 2 === 0 ? '#ffffff' : '#fff5ff', padding: '6px' }}>
                        <div style={{ fontSize: '10px', fontFamily: '"Arial", sans-serif', color: '#888888' }}>
                          📅 {formatDate(post.publishedAt)}
                        </div>
                        <Link
                          href={`/blog/${post.slug.current}`}
                          style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: '"Arial", sans-serif', color: '#660066', display: 'block', marginTop: '2px' }}
                        >
                          {post.title}
                        </Link>
                        <div style={{ fontSize: '11px', fontFamily: '"Comic Sans MS", cursive', color: '#333333', marginTop: '3px', lineHeight: '1.5' }}>
                          {post.excerpt}
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <Link
                            href={`/blog/${post.slug.current}`}
                            style={{
                              display: 'inline-block',
                              background: 'linear-gradient(180deg, #ff88ff, #cc00cc)',
                              color: '#ffffff',
                              fontSize: '9px',
                              padding: '2px 8px',
                              textDecoration: 'none',
                              fontWeight: 'bold',
                              fontFamily: '"Arial", sans-serif',
                              border: '1px outset #ffffff',
                            }}
                          >
                            READ MORE »»»
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ textAlign: 'right', paddingTop: '6px' }}>
                      <Link
                        href="/blog"
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(180deg, #ffffff, #cccccc)',
                          border: '2px outset #ffffff',
                          padding: '3px 10px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: '#660066',
                          textDecoration: 'none',
                          fontFamily: '"Arial", sans-serif',
                        }}
                      >
                        📖 VIEW ALL POSTS!!!
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div style={{ fontSize: '12px', fontFamily: '"Comic Sans MS", cursive', color: '#660066', textAlign: 'center', padding: '12px' }}>
                😢 No posts found yet... check back soon!!!
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BlogSection;
