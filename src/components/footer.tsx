import Link from "next/link";
import { site } from "@/lib/site";
import { FullLogo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-wide px-5 py-14 sm:px-8">
        <div className="text-fg">
          <FullLogo className="h-auto w-full max-w-md sm:max-w-lg" />
        </div>

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:justify-end">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:flex sm:gap-12">
            <div className="flex flex-col gap-2">
              {site.footerLinks.slice(0, 3).map((l) => (
                <Link key={l.href} href={l.href} className="text-fg-secondary hover:text-fg">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {site.footerLinks.slice(3).map((l) => (
                <Link key={l.href} href={l.href} className="text-fg-secondary hover:text-fg">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={site.author.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-fg-secondary hover:text-fg"
              >
                LinkedIn
              </a>
              <a
                href={site.author.github}
                target="_blank"
                rel="noreferrer"
                className="text-fg-secondary hover:text-fg"
              >
                GitHub
              </a>
              <a
                href={`mailto:${site.author.email}`}
                className="text-fg-secondary hover:text-fg"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.author.name}</p>
          <p>Built, tested, and occasionally broken by Hope.</p>
        </div>
      </div>
    </footer>
  );
}
