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

  // Reflect the most recent post date instead of "now" so the listing
  // page's lastmod only changes when its actual content (the post list) does.
  const latestPostDate = postEntries.reduce<Date>((latest, entry) => {
    const modified = entry.lastModified as Date;
    return modified > latest ? modified : latest;
  }, new Date(0));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate > new Date(0) ? latestPostDate : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ];
}
