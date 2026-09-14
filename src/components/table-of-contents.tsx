"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSlug(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-tertiary lg:pointer-events-none"
      >
        On this page
        <ChevronDown
          size={14}
          className={`transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`mt-2 flex-col gap-1 border-l border-border pl-4 lg:flex ${open ? "flex" : "hidden"}`}>
        {items.map((item) => (
          <li key={item.slug} className={item.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.slug}`}
              onClick={() => setOpen(false)}
              className={`block py-1 leading-snug transition-colors ${
                activeSlug === item.slug
                  ? "font-medium text-accent"
                  : "text-fg-secondary hover:text-fg"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
