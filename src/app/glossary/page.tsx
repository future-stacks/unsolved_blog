import type { Metadata } from "next";
import { glossary } from "@/data/glossary";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Short, plain-language definitions for terms used across UNRESOLVED.",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Reference"
        title="Glossary"
        description="Short, plain-language definitions for terms used across the articles here. Linked wherever they appear."
      />

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {glossary.map((g) => (
          <div key={g.slug} id={g.slug} className="scroll-mt-28 py-6">
            <dt className="font-serif text-lg font-medium text-fg">{g.term}</dt>
            <dd className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
              {g.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
