import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['essay', 'case-study', 'guide']).default('essay'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 3–4 bullets shown in a "Key points" box at the top of the post.
    summary: z.array(z.string()).default([]),
    // Shown as filter chips on the Writing page. Keep the set small and broad.
    topic: z.string().default('Building AI products'),
    // Cover art drawn in code (see components/Cover.astro); unknown or missing = generated pattern.
    cover: z.string().optional(),
    // Pin as the big card at the top of the Writing page (newest pinned wins; none = newest post).
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    short: z.string().optional(),
    tagline: z.string(),
    role: z.string(),
    period: z.coerce.string(),
    status: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
});

export const collections = { writing, projects };
