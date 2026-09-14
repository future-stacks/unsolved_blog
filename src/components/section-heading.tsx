import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-serif text-[1.75rem] font-medium text-fg sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-fg-secondary hover:text-accent sm:flex"
        >
          {linkLabel ?? "View all"}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
