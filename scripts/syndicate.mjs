// Turn a published post into paste-ready versions for Medium, Substack, LinkedIn and X.
//
//   npm run syndicate                 -> the newest post
//   npm run syndicate -- <post-id>    -> a specific post, e.g. agents-front-door
//
// Reads the built site (runs `astro build` first), so the output matches what is live.
// Writes to distribution/<post-id>/ (gitignored). Nothing is posted anywhere: you paste it.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = (process.env.SITE_URL ?? 'https://reddyallasudhakar.github.io').replace(/\/$/, '');
const root = fileURLToPath(new URL('..', import.meta.url));
const postsDir = join(root, 'src/content/writing');

// ---- pick the post -------------------------------------------------------
const frontmatter = (file) => {
  const src = readFileSync(join(postsDir, file), 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const get = (k) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^"(.*)"$/, '$1');
  const summary = [...(fm.match(/^summary:\n((?:\s+- .+\n?)+)/m)?.[1] ?? '').matchAll(/- "?(.+?)"?$/gm)].map((m) => m[1]);
  return { id: file.replace(/\.md$/, ''), title: get('title'), description: get('description'), date: get('date'), draft: get('draft') === 'true', summary };
};
const posts = readdirSync(postsDir).filter((f) => f.endsWith('.md')).map(frontmatter).filter((p) => !p.draft)
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
const wanted = process.argv[2];
const post = wanted ? posts.find((p) => p.id === wanted) : posts[0];
if (!post) {
  console.error(`No published post "${wanted}". Available:\n  ${posts.map((p) => p.id).join('\n  ')}`);
  process.exit(1);
}
const url = `${SITE}/writing/${post.id}/`;

// ---- build and extract the article body ---------------------------------
execSync('npx astro build', { cwd: root, stdio: 'ignore' });
const html = readFileSync(join(root, 'dist/writing', post.id, 'index.html'), 'utf8');
let body = html.slice(html.indexOf('</header>', html.indexOf('<article')) + 9, html.indexOf('<footer class="post-end"'));

// Remove an element and everything inside it, respecting nesting.
const stripBalanced = (src, opener, tag, replacement = '') => {
  let i;
  while ((i = src.indexOf(opener)) !== -1) {
    let depth = 0, j = i;
    const re = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
    re.lastIndex = i;
    let m;
    while ((m = re.exec(src))) {
      depth += m[0].startsWith('</') ? -1 : 1;
      if (depth === 0) { j = m.index + m[0].length; break; }
    }
    src = src.slice(0, i) + replacement + src.slice(j);
  }
  return src;
};
const figureNote = `<p><em>[Interactive figure: <a href="${url}">see it in the original post</a>.]</em></p>`;
body = stripBalanced(body, '<details class="toc-mobile"', 'details');
body = stripBalanced(body, '<section class="key-points"', 'section');
body = stripBalanced(body, '<div class="mockups', 'div', `<p><em>[Concept screens: <a href="${url}">see them in the original post</a>.]</em></p>`);
body = stripBalanced(body, '<figure', 'figure', figureNote);
body = body
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/ (class|id|aria-[a-z-]+|data-[a-z-]+)="[^"]*"/g, '')
  .replace(/href="\/(?!\/)/g, `href="${SITE}/`)
  .replace(/href="#/g, `href="${url}#`)
  .replace(/(<p><em>\[(?:Interactive figure|Concept screens)[^\n]*?<\/p>)(\s*\1)+/g, '$1');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const keyPoints = post.summary.length ? `<h3>Key points</h3><ul>${post.summary.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : '';
const original = `<p><em>Originally published at <a href="${url}">${SITE.replace(/^https?:\/\//, '')}</a>, where the diagrams and concept screens are interactive.</em></p>`;

// ---- write the channel versions -----------------------------------------
const out = join(root, 'distribution', post.id);
mkdirSync(out, { recursive: true });

writeFileSync(join(out, 'substack.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(post.title)} (for Substack)</title>
<style>body{max-width:42rem;margin:2rem auto;padding:0 1rem;font:18px/1.6 Georgia,serif;color:#222}h1{line-height:1.2}.howto button{font:inherit;padding:.3rem .8rem;border-radius:999px;border:1px solid #c9a55a;background:#fff;cursor:pointer}.howto{font:14px/1.5 system-ui,sans-serif;background:#fff6e5;border:1px solid #f0d9a8;padding:.75rem 1rem;border-radius:8px}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:.3rem .5rem}</style></head><body>
<p class="howto"><strong>For Substack:</strong> click <button onclick="copyArticle()">Copy article</button>, then paste into a new Substack post. Images and figures are replaced by links back to the live post.</p><hr>
<article><h1>${esc(post.title)}</h1><p><em>${esc(post.description ?? '')}</em></p>${original}${keyPoints}${body}${original}</article>
<script>function copyArticle(){const r=document.createRange();r.selectNodeContents(document.querySelector('article'));const s=getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();event.target.textContent='Copied ✓';}</script></body></html>`);

const linkedin = [
  post.title,
  '',
  post.description,
  '',
  ...(post.summary.length ? ['The short version:', ...post.summary.map((s) => `→ ${s}`), ''] : []),
  `Full essay, with diagrams and concept screens: ${url}`,
  '',
  'Curious what others think, especially if you build or buy with AI agents.',
].join('\n');
writeFileSync(join(out, 'linkedin.txt'), linkedin);

const tweets = [post.title, ...post.summary, `Full essay: ${url}`].map((t, i, a) => `${t}${a.length > 1 ? ` (${i + 1}/${a.length})` : ''}`);
writeFileSync(join(out, 'x-thread.txt'), tweets.map((t) => `${t}\n[${t.length} chars${t.length > 280 ? ' — TOO LONG, trim it' : ''}]`).join('\n\n---\n\n'));

writeFileSync(join(out, 'README.txt'), `Distribution kit for: ${post.title}
${url}

1. Medium (2 min): open https://medium.com/p/import, paste the URL above, press Import, review, publish.
   Medium sets your site as the original (canonical), so search credit stays with your site.
2. Substack (3 min): open substack.html in a browser, click Copy article, paste into a new post.
   It already says "Originally published at" with a link, and figures link back to the live post.
3. LinkedIn: paste linkedin.txt as a post. Put the link in the post (or first comment if you prefer).
4. X: post x-thread.txt as a thread.

Tip: publish on your site first, then Medium and Substack a day or two later.
`);

console.log(`\nDistribution kit ready for "${post.title}"\n  ${out}\n`);
console.log(readFileSync(join(out, 'README.txt'), 'utf8'));
statSync(out);
