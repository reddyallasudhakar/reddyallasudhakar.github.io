import type { APIContext } from 'astro';
import { getWriting } from '../lib';
import { site } from '../site';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export async function GET(context: APIContext) {
  const base = new URL(import.meta.env.BASE_URL, context.site);
  const posts = await getWriting();
  const items = posts.map((p) => {
    const link = new URL(`writing/${p.id}`, base).href;
    return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${base.href}</link><description>${esc(site.description)}</description>${items.join('')}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
