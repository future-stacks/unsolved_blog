import { getAllArticles } from "./articles";
import { seriesList } from "@/data/series";
import { experiments } from "@/data/experiments";
import { ideas } from "@/data/ideas";
import { glossary } from "@/data/glossary";

export interface SearchItem {
  type: "Article" | "Series" | "Experiment" | "Idea" | "Glossary";
  title: string;
  description: string;
  category: string;
  date?: string;
  readingTime?: string;
  href: string;
}

export function buildSearchIndex(): SearchItem[] {
  const articles: SearchItem[] = getAllArticles().map((a) => ({
    type: "Article",
    title: a.title,
    description: a.excerpt,
    category: a.category,
    date: a.date,
    readingTime: a.readingTime,
    href: `/articles/${a.slug}`,
  }));

  const series: SearchItem[] = seriesList.map((s) => ({
    type: "Series",
    title: s.title,
    description: s.description,
    category: "Series",
    href: `/series/${s.slug}`,
  }));

  const lab: SearchItem[] = experiments.map((e) => ({
    type: "Experiment",
    title: e.title,
    description: e.question,
    category: "The Lab",
    date: e.date,
    href: `/lab/${e.slug}`,
  }));

  const ideaItems: SearchItem[] = ideas.map((i) => ({
    type: "Idea",
    title: i.title,
    description: i.body.slice(0, 140),
    category: "Ideas",
    date: i.date,
    href: `/ideas#${i.slug}`,
  }));

  const glossaryItems: SearchItem[] = glossary.map((g) => ({
    type: "Glossary",
    title: g.term,
    description: g.definition,
    category: "Glossary",
    href: `/glossary#${g.slug}`,
  }));

  return [...articles, ...series, ...lab, ...ideaItems, ...glossaryItems];
}
