import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    slug: z.string().optional(),
    author: z.object({
      name: z.string(),
      title: z.string(),
    }).optional(),
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
