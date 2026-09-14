import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { ideas } from "@/data/ideas";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Short thoughts I'm still working through.",
};

export default function IdeasPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Short form"
        title="Ideas"
        description="Short thoughts I'm still working through. Some of these will eventually grow into full articles."
      />

      <div className="mt-4 divide-y divide-border">
        {ideas.map((idea) => (
          <div key={idea.slug} id={idea.slug} className="scroll-mt-28 py-9">
            <p className="text-[13px] text-fg-tertiary">
              {format(new Date(idea.date), "d MMMM yyyy")}
            </p>
            <h2 className="mt-2 font-serif text-[1.4rem] font-medium leading-snug text-fg sm:text-2xl">
              {idea.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-fg-secondary">
              {idea.body}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {idea.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {idea.relatedArticleSlug && (
                <Link
                  href={`/articles/${idea.relatedArticleSlug}`}
                  className="text-[13px] font-medium text-accent"
                >
                  Related article →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
