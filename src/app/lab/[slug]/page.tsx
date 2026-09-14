import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { FlaskConical } from "lucide-react";
import { experiments, getExperimentBySlug } from "@/data/experiments";
import { getAllArticles } from "@/lib/articles";
import { mdxComponents } from "@/components/mdx-components";
import { RepoCard } from "@/components/repo-card";
import { ArticleCard } from "@/components/article-card";
import type { Experiment } from "@/lib/types";

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const experiment = getExperimentBySlug(params.slug);
  if (!experiment) return {};
  return { title: experiment.title, description: experiment.question };
}

const sections: { key: keyof Experiment; label: string }[] = [
  { key: "question", label: "Question" },
  { key: "hypothesis", label: "Hypothesis" },
  { key: "setup", label: "Setup" },
  { key: "experiment", label: "Experiment" },
  { key: "result", label: "Result" },
  { key: "lesson", label: "What I learned" },
];

export default function ExperimentPage({ params }: { params: { slug: string } }) {
  const experiment = getExperimentBySlug(params.slug);
  if (!experiment) notFound();

  const relatedArticles = getAllArticles().filter((a) =>
    experiment.relatedArticleSlugs?.includes(a.slug)
  );

  return (
    <article className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
        <FlaskConical size={13} className="text-accent" />
        {experiment.status === "completed" ? "Completed" : "In progress"}
        <span className="text-fg-tertiary">· {format(new Date(experiment.date), "d MMM yyyy")}</span>
      </div>

      <h1 className="mt-3 font-serif text-[2rem] font-medium leading-tight text-fg sm:text-[2.6rem]">
        {experiment.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {experiment.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-secondary"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {sections.map(({ key, label }) => (
          <section key={key}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {label}
            </h2>
            <div className="prose prose-lg mt-3 max-w-none leading-relaxed prose-p:text-fg prose-p:leading-[1.75]">
              <MDXRemote source={String(experiment[key])} components={mdxComponents} />
            </div>
          </section>
        ))}
      </div>

      {experiment.repo && (
        <div className="mt-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
            Repository
          </p>
          <RepoCard repo={experiment.repo} />
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="mt-14 border-t border-border pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
            Referenced in
          </p>
          <div className="mt-2 divide-y divide-border">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
