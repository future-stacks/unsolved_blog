# UNRESOLVED

A personal technical publication by **Hope Akpabio** — infrastructure, security, and the
engineering assumptions underneath the systems we build.

> Don't just accept how a system is supposed to work. Investigate how it actually behaves.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with a small, restrained design-token system (light/dark via `next-themes`)
- **MDX** content (`next-mdx-remote/rsc`) for articles, with custom components for key-idea
  callouts, counterarguments, copyable code blocks, an interactive Kubernetes trust diagram,
  and glossary links
- **Fuse.js** for site-wide fuzzy search, running client-side against a build-time
  `/search-index.json`
- Native **next/og** for per-article Open Graph images, `sitemap.ts`, `robots.ts`, and an
  `rss.xml` route

## Content model

Everything lives in version control, no external CMS:

- `content/articles/*.mdx` — full articles, one file per slug, frontmatter matches
  `ArticleFrontmatter` in `src/lib/types.ts`
- `src/data/series.ts` — series metadata
- `src/data/experiments.ts` — The Lab: question / hypothesis / setup / experiment / result / lesson
- `src/data/ideas.ts` — short-form thoughts
- `src/data/glossary.ts` — linkable glossary terms
- `src/data/reading-list.ts`, `src/data/changelog.ts`

## Deploying to Cloudflare Pages

This is a fully static export (`output: "export"` in `next.config.mjs`) — no server,
no edge functions, just static HTML/CSS/JS/JSON in `out/`. It must be deployed as a
**Pages** project (static assets), not a **Workers** project. `wrangler.toml` pins
`pages_build_output_dir = "out"` specifically so Cloudflare's build system treats this
repo as Pages rather than auto-routing Next.js through the Workers/OpenNext SSR adapter
(that adapter needs Next.js ≥15.5.24 and this app deliberately doesn't need SSR at all).

**Dashboard — use this if a Git-connected project was created for this repo but the
build log shows `npx wrangler deploy` / `opennextjs-cloudflare` / "Output Directory: .next":**
that means it was set up as a Workers project, not Pages. Fix it in
Settings → Build:

- Build command: `npm run build`
- Build output directory: `out`
- Deploy command: clear it entirely (no `wrangler deploy` override)

If those fields aren't editable for that project (some accounts only offer the
Workers/OpenNext flow for a Git-connected Next.js repo), delete it and create a fresh
one under **Workers & Pages → Pages → Create → Connect to Git**, with framework preset
`Next.js (Static HTML Export)`. Only a genuine Pages project gets a `*.pages.dev` domain.

**CLI:**

```bash
npm run build
npx wrangler pages deploy out --project-name=unresolved
```

Search (`/search-index.json`) and the newsletter form are both client-side only —
there's no API route left in the app (static export can't ship one). To collect real
subscribers, wire the form in `src/components/newsletter.tsx` to a Cloudflare Pages
Function, a Worker, or a third-party form endpoint (Buttondown, ConvertKit, etc.).

## Running locally

```bash
npm install
npm run dev
```

```bash
npm run build   # production build (also runs type-checking)
npm run start   # serve the production build
```

## Adding an article

1. Add a new `content/articles/<slug>.mdx` file with frontmatter matching
   `ArticleFrontmatter`.
2. Use `<KeyIdea>`, `<Counterargument>`, and `<GlossaryTerm slug="...">` where useful.
3. If it belongs to a series, set `series` + `seriesOrder` and it's picked up automatically
   on the series page and in the "next in series" prompt at the end of the article.
