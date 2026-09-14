import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block py-7">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          {article.category}
        </span>
        {article.series && (
          <span className="hidden text-[11px] uppercase tracking-wide text-fg-tertiary sm:inline">
            Series · {article.series === "security-reconsidered" ? "Security, Reconsidered" : article.series}
          </span>
        )}
      </div>

      <h3 className="mt-2 flex items-start gap-2 font-serif text-[1.35rem] font-medium leading-snug text-fg sm:text-2xl">
        <span className="underline-link">{article.title}</span>
        <ArrowUpRight
          size={20}
          className="mt-1.5 shrink-0 -translate-x-1 translate-y-1 text-fg-tertiary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100"
        />
      </h3>

      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
        {article.excerpt}
      </p>

      <p className="mt-3 text-[13px] text-fg-tertiary">
        {format(new Date(article.date), "d MMM yyyy")} · {article.readingTime}
      </p>
    </Link>
  );
}
