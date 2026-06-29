import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

const SITE_URL = 'https://mattekudacy.is-a.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const date = post.publishedAt ? new Date(post.publishedAt) : null;
    const lastModified = date && !isNaN(date.getTime()) ? date : new Date();
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ];
}
