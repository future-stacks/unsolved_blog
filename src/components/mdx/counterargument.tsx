import type { ReactNode } from "react";
import { MessageSquareWarning } from "lucide-react";

export function Counterargument({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-xl border border-border bg-bg-subtle p-6">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-secondary">
        <MessageSquareWarning size={14} className="text-accent" />
        You might disagree
      </p>
      <div className="prose prose-sm mt-3 max-w-none text-[15px] leading-relaxed text-fg-secondary [&_p]:my-3">
        {children}
      </div>
    </div>
  );
}
