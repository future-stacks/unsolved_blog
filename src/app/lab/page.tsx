import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { experiments } from "@/data/experiments";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "The Lab",
  description: "Experiments, tests, and practical investigations behind the ideas.",
};

export default function LabPage() {
  return (
    <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Build"
        title="The Lab"
        description="Experiments, tests, and practical investigations behind the ideas. Writing about how a system should behave is one thing. Testing how it actually behaves is another."
      />

      <div className="mt-8 flex flex-col gap-6">
        {experiments.map((e) => (
          <Link
            key={e.slug}
            href={`/lab/${e.slug}`}
            className="group rounded-2xl border border-border p-6 transition-colors hover:border-accent sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
                <FlaskConical size={13} className="text-accent" />
                {e.status === "completed" ? "Completed" : "In progress"}
              </div>
              <span className="text-[12px] text-fg-tertiary">
                {new Date(e.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-xl font-medium leading-snug text-fg sm:text-2xl">
              <span className="underline-link">{e.question}</span>
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
              {e.hypothesis}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
              Explore experiment
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
