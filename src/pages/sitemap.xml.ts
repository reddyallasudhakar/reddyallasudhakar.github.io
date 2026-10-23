import type { APIContext } from 'astro';
import { getWriting } from '../lib';

// Every public page, for search engines. Drafts are excluded by getWriting().
export async function GET(context: APIContext) {
  const base = new URL(import.meta.env.BASE_URL, context.site);
  const posts = await getWriting();
  const pages = [
    { path: '', lastmod: posts[0]?.data.date },
    { path: 'writing/', lastmod: posts[0]?.data.date },
    { path: 'about/' },
    ...posts.map((p) => ({ path: `writing/${p.id}/`, lastmod: p.data.date })),
  ];
  const urls = pages
    .map((p) => `<url><loc>${new URL(p.path, base).href}</loc>${p.lastmod ? `<lastmod>${p.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
