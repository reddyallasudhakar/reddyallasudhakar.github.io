import { getCollection } from 'astro:content';

// GitHub Pages serves pages at '/path/', so page links end in a slash; files (rss.xml, favicon.svg) don't.
export const url = (path = '') => {
  const clean = path.replace(/^\//, '');
  const [p, hash] = clean.split('#');
  const withSlash = p === '' || p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${withSlash}${hash ? `#${hash}` : ''}`;
};

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export async function getWriting() {
  const posts = await getCollection('writing', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const items = await getCollection('projects');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export const kindLabel = { essay: 'Essay', 'case-study': 'Case study', guide: 'Guide' } as const;
