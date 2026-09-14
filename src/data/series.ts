import type { SeriesMeta } from "@/lib/types";

export const seriesList: SeriesMeta[] = [
  {
    slug: "security-reconsidered",
    title: "Security, Reconsidered",
    description:
      "Things I thought I understood about infrastructure security until I started testing them.",
    status: "ongoing",
    totalPlanned: 8,
  },
  {
    slug: "inside-alibaba-cloud",
    title: "Inside Alibaba Cloud",
    description:
      "Ten months testing what Alibaba Cloud's security, AI, and infrastructure services actually do under pressure — not what the documentation says they do.",
    status: "complete",
    totalPlanned: 10,
  },
];

export function getSeriesBySlug(slug: string) {
  return seriesList.find((s) => s.slug === slug);
}
