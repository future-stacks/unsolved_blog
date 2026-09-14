import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { seriesList } from "@/data/series";
import { getArticlesBySeries } from "@/lib/articles";
import { PageHeader } from "@/components/page-header";
import { SeriesProgress } from "@/components/series-progress";

export const metadata: Metadata = {
  title: "Series",
  description: "Multi-part investigations that build on each other, one essay at a time.",
};

export default function SeriesIndexPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Continuing"
        title="Series"
        description="Multi-part investigations that build on each other, one essay at a time."
      />

      <div className="mt-8 flex flex-col gap-6">
        {seriesList.map((series) => {
          const articles = getArticlesBySeries(series.slug);
          return (
            <Link
              key={series.slug}
              href={`/series/${series.slug}`}
              className="group rounded-2xl border border-border p-6 transition-colors hover:border-accent sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {series.status === "ongoing" ? "Ongoing" : "Complete"}
                </p>
                <SeriesProgress current={articles.length} total={series.totalPlanned} />
              </div>
              <h2 className="mt-3 font-serif text-2xl font-medium text-fg sm:text-3xl">
                <span className="underline-link">{series.title}</span>
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
                {series.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                Read the series
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
