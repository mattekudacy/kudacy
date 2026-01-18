import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Create client only if projectId is configured
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

// Helper to check if Sanity is configured
export const isSanityConfigured = (): boolean => !!projectId;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    return { url: () => '', width: () => ({ url: () => '', height: () => ({ url: () => '' }) }) };
  }
  return builder.image(source);
}

// Category interface
export interface Category {
  _id: string;
  title: string;
}

// Author interface
export interface Author {
  _id: string;
  name: string;
  image?: SanityImageSource;
}

// Blog post interface
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage?: SanityImageSource;
  body?: any[];
  categories?: Category[];
  author?: Author;
  readTime?: number;
}

// Alias for backward compatibility
export type BlogPost = Post;

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  if (!sanityClient) {
    console.warn('Sanity not configured');
    return [];
  }
  try {
    return await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "categories": categories[]->{_id, title},
        "author": author->{_id, name, image},
        "readTime": round(length(pt::text(body)) / 5 / 180)
      }
    `);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!sanityClient) {
    console.warn('Sanity not configured');
    return null;
  }
  try {
    return await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        body,
        "categories": categories[]->{_id, title},
        "author": author->{_id, name, image},
        "readTime": round(length(pt::text(body)) / 5 / 180)
      }
    `, { slug });
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
