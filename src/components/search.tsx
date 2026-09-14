"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";
import type { SearchItem } from "@/lib/search-index";

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results ?? []);
          setActiveIndex(0);
        })
        .catch(() => {});
    }, 150);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      router.push(results[activeIndex].href);
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search UNRESOLVED"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-bg-subtle hover:text-fg"
      >
        <SearchIcon size={17} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-fg/20 px-4 pt-[12vh] backdrop-blur-sm dark:bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          onClick={close}
        >
          <div
            className="w-full max-w-xl animate-fade-in overflow-hidden rounded-xl border border-border bg-bg-raised shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <SearchIcon size={18} className="shrink-0 text-fg-tertiary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search articles, series, experiments, ideas, glossary…"
                aria-label="Search"
                className="w-full bg-transparent text-[15px] text-fg placeholder:text-fg-tertiary focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="shrink-0 rounded-full p-1 text-fg-tertiary hover:bg-bg-subtle hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {query.trim() && results.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-fg-tertiary">
                  Nothing found for &ldquo;{query}&rdquo;.
                </p>
              )}
              {results.map((r, i) => (
                <button
                  key={r.href}
                  onClick={() => {
                    router.push(r.href);
                    close();
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full flex-col gap-0.5 px-4 py-2.5 text-left ${
                    i === activeIndex ? "bg-bg-subtle" : ""
                  }`}
                >
                  <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-accent">
                    {r.category}
                    {r.readingTime && (
                      <span className="text-fg-tertiary">· {r.readingTime}</span>
                    )}
                  </span>
                  <span className="text-[15px] font-medium text-fg">{r.title}</span>
                  <span className="line-clamp-1 text-[13px] text-fg-secondary">
                    {r.description}
                  </span>
                </button>
              ))}
              {!query.trim() && (
                <p className="px-4 py-6 text-center text-sm text-fg-tertiary">
                  Try &ldquo;admission controller&rdquo;, &ldquo;zero trust&rdquo;, or &ldquo;observability&rdquo;.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
