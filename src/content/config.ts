// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    image: z.string().optional(), // ✅ tambahkan ini supaya TypeScript tahu ada field image
    author: z
      .object({
        title: z.string(),
        name: z.string(),
        image: z.string().optional(),
      })
      .optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    repo: z.string().url().optional()
  }),
});

export const collections = {
  blog,
  projects,
};
