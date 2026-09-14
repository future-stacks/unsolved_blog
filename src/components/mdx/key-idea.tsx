import type { ReactNode } from "react";

export function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 border-l-2 border-accent bg-accent-soft/40 py-4 pl-6 pr-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        The key idea
      </p>
      <div className="mt-2 font-serif text-[1.2rem] leading-snug text-fg [&_em]:italic">
        {children}
      </div>
    </div>
  );
}
