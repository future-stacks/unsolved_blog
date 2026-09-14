"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import type { Article, Audience } from "@/lib/types";

const audiences: { id: Audience; label: string; description: string }[] = [
  {
    id: "engineer",
    label: "For engineers",
    description: "The most technical deep dives — architecture, experiments, and the reasoning behind them.",
  },
  {
    id: "recruiter",
    label: "For recruiters",
    description: "Selected work, experiments, and projects demonstrating technical thinking, in under ten minutes.",
  },
  {
    id: "student",
    label: "For students",
    description: "Clear explanations of difficult infrastructure and security concepts, built from first principles.",
  },
  {
    id: "researcher",
    label: "For researchers",
    description: "Research-driven investigations that test assumptions rather than repeat them.",
  },
];

export function AudienceTabs({ articlesByAudience }: { articlesByAudience: Record<Audience, Article[]> }) {
  const [active, setActive] = useState<Audience>("engineer");
  const current = audiences.find((a) => a.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by audience">
        {audiences.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={active === a.id}
            onClick={() => setActive(a.id)}
            className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
              active === a.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border-strong text-fg-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
        {current.description}
      </p>

      <div className="mt-2 divide-y divide-border">
        {articlesByAudience[active].map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articlesByAudience[active].length === 0 && (
          <p className="py-8 text-[14px] text-fg-tertiary">
            Nothing tagged for this audience yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
