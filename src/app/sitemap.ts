import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { seriesList } from "@/data/series";
import { experiments } from "@/data/experiments";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/articles",
    "/series",
    "/lab",
    "/ideas",
    "/about",
    "/start-here",
    "/now",
    "/reading-list",
    "/glossary",
    "/subscribe",
    "/changelog",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${site.url}/articles/${a.slug}`,
    lastModified: a.date,
  }));

  const seriesRoutes = seriesList.map((s) => ({
    url: `${site.url}/series/${s.slug}`,
    lastModified: new Date(),
  }));

  const labRoutes = experiments.map((e) => ({
    url: `${site.url}/lab/${e.slug}`,
    lastModified: e.date,
  }));

  return [...staticRoutes, ...articleRoutes, ...seriesRoutes, ...labRoutes];
}
