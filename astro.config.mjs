import { defineConfig } from 'astro/config';

// Hosted on GitHub Pages at the domain root. The deploy workflow sets SITE_URL.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://reddyallasudhakar.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
