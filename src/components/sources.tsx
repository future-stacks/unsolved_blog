import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/types";

const kindLabel: Record<Source["kind"], string> = {
  documentation: "Documentation",
  paper: "Paper",
  standard: "Standard",
  repository: "Repository",
  research: "Research",
  article: "Article",
};

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;

  return (
    <div className="not-prose">
      <h2 className="font-serif text-xl font-medium text-fg">Sources &amp; further reading</h2>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-3.5 text-[14.5px]"
            >
              <span className="flex items-baseline gap-3">
                <span className="text-[11px] font-medium uppercase tracking-wide text-fg-tertiary">
                  {kindLabel[s.kind]}
                </span>
                <span className="text-fg underline-link">{s.label}</span>
              </span>
              <ExternalLink
                size={14}
                className="shrink-0 text-fg-tertiary group-hover:text-accent"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
