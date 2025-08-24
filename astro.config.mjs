// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkMermaid from "remark-mermaidjs";
import sitemap from "@astrojs/sitemap";
import path from "path"; // ✅ Tambahkan ini

export default defineConfig({
  site: "https://thismydomains.com",
  redirects: {
    "/blog": "/blog/1",
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      remarkPlugins: [remarkMermaid],
    }),
    sitemap(),
  ],
  server: {
    host: true,
    port: 4321,
  },
  // ✅ Tambahkan blok Vite ini
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});