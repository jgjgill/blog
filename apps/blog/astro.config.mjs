// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import expressiveCode from "astro-expressive-code";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  site: "https://jgjgill.com",

  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: "ko",
    },
  },

  integrations: [
    expressiveCode({
      themes: ["one-dark-pro"],
    }),
    react(),
    mdx(),
    pagefind(),
    sitemap({
      i18n: {
        defaultLocale: "ko",
        locales: {
          ko: "ko",
          en: "en",
        },
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "jgjgill",
        short_name: "jgjgill",
        description: "프론트엔드 개발자 이종길입니다.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{html,css,js}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "font-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
