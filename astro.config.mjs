import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkMermaid from "remark-mermaidjs";
import sitemap from "@astrojs/sitemap";
import path from "path";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://thismydomains.com",
  output: "server",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    mdx({
      remarkPlugins: [
        remarkMermaid,
        [remarkShikiTwoslash, { theme: "github-dark-dimmed" }],
      ],
    }),
    sitemap(),
  ],

  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      port: 8080, // hanya berlaku di dev
    },
  },

  // 👇 tambahkan ini agar hasil build listen ke semua interface
  server: {
    host: "0.0.0.0",
    port: 4321, // bebas, asal konsisten
  },

  adapter: node({
    mode: "standalone",
  }),
});
