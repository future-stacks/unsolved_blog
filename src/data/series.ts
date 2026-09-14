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
];

export function getSeriesBySlug(slug: string) {
  return seriesList.find((s) => s.slug === slug);
}
