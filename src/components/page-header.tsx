import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl border-b border-border pb-8">
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-serif text-[2.3rem] font-medium leading-tight text-fg sm:text-[2.75rem]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-[16px] leading-relaxed text-fg-secondary">{description}</p>
      )}
      {children}
    </div>
  );
}
