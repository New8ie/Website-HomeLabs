import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkMermaid from "remark-mermaidjs";
import sitemap from "@astrojs/sitemap";
import path from "path";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import cloudflare from "@astrojs/cloudflare";

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
  },

  adapter: cloudflare(), // <— ganti ini
});
