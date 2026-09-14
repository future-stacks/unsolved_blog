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
- **Fuse.js** for site-wide fuzzy search (`/api/search`)
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
