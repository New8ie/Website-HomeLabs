import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMermaid from 'remark-mermaidjs'; // <-- Tambahkan ini

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      remarkPlugins: [remarkMermaid], // <-- Integrasi plugin di MDX/MD
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
});