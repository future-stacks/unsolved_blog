import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seriesList, getSeriesBySlug } from "@/data/series";
import { getArticlesBySeries } from "@/lib/articles";
import { PageHeader } from "@/components/page-header";
import { SeriesProgress } from "@/components/series-progress";
import { format } from "date-fns";

export function generateStaticParams() {
  return seriesList.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const series = getSeriesBySlug(params.slug);
  if (!series) return {};
  return { title: series.title, description: series.description };
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug);
  if (!series) notFound();
  const articles = getArticlesBySeries(series.slug);

  return (
    <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader eyebrow="Series" title={series.title} description={series.description}>
        <div className="mt-5">
          <SeriesProgress current={articles.length} total={series.totalPlanned} />
        </div>
      </PageHeader>

      <ol className="mt-4 divide-y divide-border">
        {articles.map((a) => (
          <li key={a.slug} className="py-7">
            <Link href={`/articles/${a.slug}`} className="group flex items-start gap-5">
              <span className="mt-1 font-tabular text-[13px] text-fg-tertiary">
                {String(a.seriesOrder).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-serif text-xl font-medium leading-snug text-fg sm:text-2xl">
                  <span className="underline-link">{a.title}</span>
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
                  {a.excerpt}
                </p>
                <p className="mt-2 text-[13px] text-fg-tertiary">
                  {format(new Date(a.date), "d MMM yyyy")} · {a.readingTime}
                </p>
              </div>
            </Link>
          </li>
        ))}

        {Array.from({ length: series.totalPlanned - articles.length }).map((_, i) => (
          <li key={`upcoming-${i}`} className="flex items-center gap-5 py-7 opacity-50">
            <span className="mt-0.5 font-tabular text-[13px] text-fg-tertiary">
              {String(articles.length + i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] italic text-fg-tertiary">Coming soon</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
