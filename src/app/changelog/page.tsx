import type { Metadata } from "next";
import { changelog } from "@/data/changelog";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Changelog",
  description: "UNRESOLVED is an evolving engineering project. This is what's changed.",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Meta"
        title="Changelog"
        description="This publication is itself an ongoing engineering project. This is what's changed on it, and when."
      />

      <div className="mt-8 flex flex-col gap-10">
        {changelog.map((entry) => (
          <div key={entry.version} className="border-l-2 border-border pl-6">
            <p className="font-serif text-lg font-medium text-fg">
              {entry.version} <span className="text-fg-tertiary">· {entry.date}</span>
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {entry.changes.map((c) => (
                <li key={c} className="text-[14.5px] leading-relaxed text-fg-secondary">
                  — {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
