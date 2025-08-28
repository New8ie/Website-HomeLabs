import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkMermaid from "remark-mermaidjs";
import sitemap from "@astrojs/sitemap";
import path from "path";
import node from "@astrojs/node";
import remarkShikiTwoslash from "remark-shiki-twoslash";

export default defineConfig({
  site: "https://thismydomains.com",
  output: "server",
  redirects: {
    "/blog": "/blog/1",
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      // Gabungkan semua plugin di sini
      remarkPlugins: [
        remarkMermaid,
        [remarkShikiTwoslash, { theme: "github-dark-dimmed" }],
      ],
    }),
    sitemap(),
  ],

  server: {
    host: true,
    port: 80,
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});
