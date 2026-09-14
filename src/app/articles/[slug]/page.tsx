import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getAllArticles,
  getArticleBySlug,
  getNextInSeries,
  getRelatedArticles,
} from "@/lib/articles";
import { getSeriesBySlug } from "@/data/series";
import { site } from "@/lib/site";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx-components";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { SocialShare } from "@/components/social-share";
import { Sources } from "@/components/sources";
import { RepoCard } from "@/components/repo-card";
import { ArticleCard } from "@/components/article-card";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `${site.url}/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [`/articles/${article.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`/articles/${article.slug}/opengraph-image`],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const toc = extractToc(article.content);
  const nextInSeries = getNextInSeries(article);
  const related = getRelatedArticles(article);
  const series = article.series ? getSeriesBySlug(article.series) : undefined;
  const url = `${site.url}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author, url: site.url },
    publisher: { "@type": "Person", name: site.author.name },
    mainEntityOfPage: url,
    keywords: article.tags.join(", "),
  };

  return (
    <article>
      <ReadingProgress targetId="article-body" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-border">
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {article.category}
            </p>
            {series && (
              <Link
                href={`/series/${series.slug}`}
                className="text-[12px] font-medium text-fg-tertiary hover:text-accent"
              >
                {series.title} · Part {article.seriesOrder}
              </Link>
            )}
          </div>

          <h1 className="mt-3 font-serif text-[2.1rem] font-medium leading-[1.1] text-fg sm:text-[2.9rem]">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-secondary sm:text-[19px]">
            {article.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <div className="text-[13.5px] text-fg-secondary">
              <span className="font-medium text-fg">{article.author}</span>
              <span className="mx-2 text-fg-tertiary">·</span>
              {format(new Date(article.date), "d MMMM yyyy")}
              <span className="mx-2 text-fg-tertiary">·</span>
              {article.readingTime}
            </div>
            <SocialShare title={article.title} url={url} />
          </div>

          <p className="mt-3 text-[13px] text-fg-tertiary">
            {article.tags.join(" · ")}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-wide px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_14rem]">
          <div id="article-body" className="max-w-content">
            <div className="prose prose-lg max-w-none leading-relaxed prose-p:text-fg prose-p:leading-[1.75] prose-li:text-fg">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    ],
                  },
                }}
              />
            </div>

            {article.repo && (
              <div className="mt-12">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
                  Article → Experiment → Repository
                </p>
                <RepoCard repo={article.repo} />
              </div>
            )}

            {article.sources && (
              <div className="mt-12">
                <Sources sources={article.sources} />
              </div>
            )}

            {nextInSeries && (
              <div className="mt-14 rounded-2xl border border-border bg-bg-subtle p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
                  Continue reading — Next in {series?.title}
                </p>
                <Link
                  href={`/articles/${nextInSeries.slug}`}
                  className="mt-2 flex items-center justify-between gap-4"
                >
                  <span className="underline-link font-serif text-xl font-medium text-fg">
                    {nextInSeries.title}
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-accent" />
                </Link>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-border p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
                Join the conversation
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-secondary">
                Have a different perspective? Continue the discussion.
              </p>
              <a
                href={article.linkedinDiscussionUrl ?? site.author.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent"
              >
                Discuss on LinkedIn
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <aside className="order-first lg:order-none">
            <div className="lg:sticky lg:top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
              Related
            </p>
            <div className="mt-2 divide-y divide-border">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
