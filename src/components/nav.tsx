"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "./search";
import { WordmarkLogo } from "./logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-bg"
      }`}
    >
      <div
        className={`mx-auto flex max-w-wide items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <Link href="/" aria-label="UNRESOLVED — home" className="text-fg">
          <WordmarkLogo
            className={`w-auto transition-all duration-300 ${scrolled ? "h-5" : "h-6"}`}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13.5px] font-medium tracking-wide transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-accent"
                  : "text-fg-secondary hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Search />
          <ThemeToggle />
          <Link
            href="/subscribe"
            className="ml-2 hidden rounded-full border border-border-strong px-4 py-1.5 text-[13px] font-medium text-fg transition-colors hover:border-accent hover:text-accent sm:inline-block"
          >
            Subscribe
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-secondary hover:bg-bg-subtle hover:text-fg md:hidden"
          >
            <Menu size={19} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-fg/20 backdrop-blur-sm dark:bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col gap-1 bg-bg-raised px-6 py-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <WordmarkLogo className="h-5 w-auto text-fg" />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-1.5 text-fg-secondary hover:bg-bg-subtle"
              >
                <X size={20} />
              </button>
            </div>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 text-[17px] font-medium text-fg hover:bg-bg-subtle"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className="mt-4 rounded-full bg-accent px-4 py-2.5 text-center text-[14px] font-medium text-accent-fg"
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
