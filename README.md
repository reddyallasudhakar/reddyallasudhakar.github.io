# reddyallasudhakar.github.io

My personal site: writing on building AI products, what I'm building, and what I'm reading.
Built with [Astro](https://astro.build) and plain CSS. No tracking.

```
src/site.ts                 name, email and social links
src/reading.ts              the Reading list on the home page
src/content/writing/*.md    essays (add `draft: true` to hide one)
src/content/projects/*.md   the Building list (`featured: true` shows it on the home page)
src/pages/                  home, about, writing, RSS, 404
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Deploy

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Share a post (Medium, Substack, LinkedIn, X)

```bash
npm run syndicate                    # newest post
npm run syndicate -- agents-front-door
```

Writes `distribution/<post>/` (not committed): `README.txt` with the steps, `substack.html` with a
Copy button, `linkedin.txt` and `x-thread.txt`. Medium uses its Import tool with the post URL, which
keeps this site as the original for search.
