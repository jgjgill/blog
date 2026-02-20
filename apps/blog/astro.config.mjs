// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkReadingTime from 'remark-reading-time';

export default defineConfig({
  site: 'https://jgjgill.com',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'ko',
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: {
          ko: 'ko',
          en: 'en',
        },
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
