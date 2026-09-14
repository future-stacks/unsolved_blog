import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;
    const stats = readingTime(content);

    return {
      ...frontmatter,
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
      content,
    } satisfies Article;
  });

  cache = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return cache;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function getLatestArticles(excludeSlug?: string, limit = 6): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

export function getArticlesBySeries(seriesSlug: string): Article[] {
  return getAllArticles()
    .filter((a) => a.series === seriesSlug)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getNextInSeries(article: Article): Article | undefined {
  if (!article.series || article.seriesOrder == null) return undefined;
  const seriesArticles = getArticlesBySeries(article.series);
  return seriesArticles.find((a) => (a.seriesOrder ?? 0) === article.seriesOrder! + 1);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);

  const explicit = (article.relatedSlugs ?? [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const sameCategory = all.filter(
    (a) => a.category === article.category && !explicit.includes(a)
  );

  return [...explicit, ...sameCategory].slice(0, limit);
}

export function getPopularArticles(limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.featured)
    .concat(getAllArticles())
    .filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i)
    .slice(0, limit);
}

export function getArticlesByAudience(audience: string): Article[] {
  return getAllArticles().filter((a) => a.audiences?.includes(audience as never));
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}
