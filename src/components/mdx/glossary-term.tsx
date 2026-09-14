import Link from "next/link";
import type { ReactNode } from "react";

export function GlossaryTerm({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link
      href={`/glossary#${slug}`}
      className="underline decoration-dotted decoration-fg-tertiary underline-offset-4 hover:decoration-accent hover:text-accent"
    >
      {children}
    </Link>
  );
}
