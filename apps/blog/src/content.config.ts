import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      thumbnail: image().optional(),
      thumbnail_alt: z.string().optional(),
      category: z.enum(['development', 'study', 'reading', 'essay']),
    }),
});

const roads = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/roads' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = { posts, roads };
