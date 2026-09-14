import Link from "next/link";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import { format } from "date-fns";
import {
  getAllArticles,
  getFeaturedArticle,
  getLatestArticles,
  getArticlesBySeries,
} from "@/lib/articles";
import { seriesList } from "@/data/series";
import { experiments } from "@/data/experiments";
import { ideas } from "@/data/ideas";
import { site } from "@/lib/site";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { SeriesProgress } from "@/components/series-progress";
import { Newsletter } from "@/components/newsletter";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(featured.slug, 5);
  const series = seriesList[0];
  const seriesArticles = getArticlesBySeries(series.slug);
  const experiment = experiments[0];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-wide px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl animate-fade-in">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-tertiary">
            {site.positioning}
          </p>
          <h1 className="mt-4 font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight text-fg sm:text-[3.4rem]">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-fg-secondary sm:text-[18px]">
            {site.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/articles/${featured.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Read the latest
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-[14px] font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Explore The Lab
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-fg-tertiary">
            <span className="font-medium text-fg-secondary">Currently exploring</span>
            <span aria-hidden>—</span>
            {site.currentlyExploring.map((item, i) => (
              <span key={item}>
                {item}
                {i < site.currentlyExploring.length - 1 && <span className="mx-2">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Featured
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Link href={`/articles/${featured.slug}`} className="group">
                <h2 className="font-serif text-[2rem] font-medium leading-tight text-fg sm:text-[2.5rem]">
                  <span className="underline-link">{featured.title}</span>
                </h2>
              </Link>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-fg-secondary sm:text-[17px]">
                {featured.subtitle}
              </p>
              <p className="mt-5 text-[13.5px] text-fg-tertiary">
                {featured.author} · {featured.readingTime} · {featured.category}
              </p>
              <Link
                href={`/articles/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent"
              >
                Read article
                <ArrowRight size={15} />
              </Link>
            </div>
            <FeaturedMark />
          </div>
        </div>
      </section>

      {/* Latest thinking */}
      <section className="mx-auto max-w-wide px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading eyebrow="Read" title="Latest thinking" href="/articles" />
        <div className="mt-2 divide-y divide-border">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Series */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-wide px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Series
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-[1.9rem] font-medium text-fg sm:text-3xl">
                {series.title}
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-fg-secondary">
                {series.description}
              </p>
            </div>
            <SeriesProgress current={seriesArticles.length} total={series.totalPlanned} />
          </div>

          <ol className="mt-9 divide-y divide-border border-y border-border">
            {seriesArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-tabular text-[13px] text-fg-tertiary">
                    {String(a.seriesOrder).padStart(2, "0")}
                  </span>
                  <span className="underline-link flex-1 text-[15.5px] font-medium text-fg">
                    {a.title}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="hidden shrink-0 -translate-x-1 text-fg-tertiary opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 sm:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
          <Link
            href="/series"
            className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-fg-secondary hover:text-accent"
          >
            View all series
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* The Lab */}
      <section className="mx-auto max-w-wide px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading eyebrow="Build" title="The Lab" href="/lab" />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-secondary">
          Experiments, tests, and practical investigations behind the ideas.
        </p>

        <Link
          href={`/lab/${experiment.slug}`}
          className="group mt-8 block rounded-2xl border border-border p-6 transition-colors hover:border-accent sm:p-8"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
            <FlaskConical size={13} className="text-accent" />
            {experiment.status === "completed" ? "Completed" : "In progress"}
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium leading-snug text-fg sm:text-2xl">
            <span className="underline-link">{experiment.question}</span>
          </h3>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {experiment.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-secondary"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
            Explore experiment
            <ArrowRight size={15} />
          </span>
        </Link>
      </section>

      {/* Ideas */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-wide px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading eyebrow="Short form" title="Ideas" href="/ideas" />
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Short thoughts I&rsquo;m still working through.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {ideas.slice(0, 4).map((idea) => (
              <li
                key={idea.slug}
                className="rounded-xl border border-border bg-bg p-5 text-[15px] leading-relaxed text-fg"
              >
                <Link href={`/ideas#${idea.slug}`} className="underline-link font-medium">
                  {idea.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-wide px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            About Hope
          </p>
          <div>
            <p className="max-w-2xl font-serif text-2xl font-medium leading-snug text-fg sm:text-3xl">
              How do we know our systems are actually doing what we think they&rsquo;re doing?
            </p>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-fg-secondary">
              I&rsquo;m Hope, a DevOps and cloud engineer working across infrastructure,
              security, and reliability. UNRESOLVED is where I write up what I test.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent"
            >
              More about Hope
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-bg-subtle px-5 py-20 sm:px-8">
        <Newsletter />
      </section>
    </>
  );
}

function FeaturedMark() {
  return (
    <div
      aria-hidden
      className="hidden aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-bg p-8 lg:flex"
    >
      <svg viewBox="0 0 200 160" className="h-full w-full" fill="none">
        <rect x="1" y="1" width="198" height="158" rx="10" stroke="var(--border)" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={20 + i * 32}
            y={20 + i * 6}
            width="20"
            height={120 - i * 6}
            rx="3"
            fill={i === 1 ? "var(--accent)" : "none"}
            stroke={i === 1 ? "var(--accent)" : "var(--border-strong)"}
            strokeWidth="1"
            opacity={i === 1 ? 0.9 : 0.5}
          />
        ))}
        <line x1="20" y1="140" x2="180" y2="140" stroke="var(--border-strong)" strokeWidth="1" />
      </svg>
    </div>
  );
}
