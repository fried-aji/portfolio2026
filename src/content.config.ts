import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/data/works' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    client: z.object({
      ja: z.string(),
      en: z.string(),
    }),
    title: z.object({
      ja: z.string(),
      en: z.string(),
    }),
    description: z.string().optional(),
    gallery: z.number(),
    siteUrl: z.string().optional(),
  }),
});

export const collections = { works };
