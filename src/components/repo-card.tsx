import { Github, Star } from "lucide-react";
import type { RepoLink } from "@/lib/types";

export function RepoCard({ repo }: { repo: RepoLink }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="not-prose group flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-accent"
    >
      <Github size={20} className="mt-0.5 shrink-0 text-fg-secondary group-hover:text-accent" />
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-fg-tertiary">
          Repository
        </p>
        <p className="mt-1 font-medium text-fg underline-link">{repo.name}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-fg-secondary">
          {repo.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
