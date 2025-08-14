import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMermaid from 'remark-mermaidjs';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/blog': '/blog/1',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      remarkPlugins: [remarkMermaid],
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
});
