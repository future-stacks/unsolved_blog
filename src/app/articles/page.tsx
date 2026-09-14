import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Articles",
  description: "Every essay published on UNRESOLVED, newest first.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Read"
        title="Articles"
        description="Every essay published here, newest first."
      />
      <div className="mt-4 divide-y divide-border">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
