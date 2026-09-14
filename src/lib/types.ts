export type Audience = "engineer" | "recruiter" | "student" | "researcher";

export interface Source {
  label: string;
  url: string;
  kind: "documentation" | "paper" | "standard" | "repository" | "research" | "article";
}

export interface RepoLink {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  category: string;
  series?: string;
  seriesOrder?: number;
  date: string;
  excerpt: string;
  tags: string[];
  keyIdea?: string;
  sources?: Source[];
  relatedSlugs?: string[];
  linkedinDiscussionUrl?: string;
  repo?: RepoLink;
  featured?: boolean;
  audiences?: Audience[];
}

export interface Article extends ArticleFrontmatter {
  readingTime: string;
  content: string;
}

export interface SeriesMeta {
  slug: string;
  title: string;
  description: string;
  status: "ongoing" | "complete";
  totalPlanned: number;
}

export interface Experiment {
  slug: string;
  title: string;
  question: string;
  hypothesis: string;
  setup: string;
  experiment: string;
  result: string;
  lesson: string;
  repo?: RepoLink;
  tags: string[];
  status: "completed" | "in-progress";
  date: string;
  relatedArticleSlugs?: string[];
}

export interface Idea {
  slug: string;
  title: string;
  body: string;
  date: string;
  tags: string[];
  relatedArticleSlug?: string;
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
}

export interface ReadingListItem {
  title: string;
  author: string;
  category: "Books" | "Papers" | "Documentation" | "Articles" | "Research";
  url?: string;
  why: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}
