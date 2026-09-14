import type { Metadata } from "next";
import { getArticlesByAudience } from "@/lib/articles";
import { PageHeader } from "@/components/page-header";
import { AudienceTabs } from "./audience-tabs";
import type { Article, Audience } from "@/lib/types";

export const metadata: Metadata = {
  title: "Start Here",
  description: "New here? Start with these — curated by who you are and why you're reading.",
};

export default function StartHerePage() {
  const audiences: Audience[] = ["engineer", "recruiter", "student", "researcher"];
  const articlesByAudience = Object.fromEntries(
    audiences.map((a) => [a, getArticlesByAudience(a)])
  ) as Record<Audience, Article[]>;

  return (
    <div className="mx-auto max-w-wide px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="New here?"
        title="Start here"
        description="UNRESOLVED reads differently depending on why you're here. Pick the one closest to you."
      />

      <div className="mt-8">
        <AudienceTabs articlesByAudience={articlesByAudience} />
      </div>
    </div>
  );
}
