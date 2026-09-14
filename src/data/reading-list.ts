import type { ReadingListItem } from "@/lib/types";

export const readingList: ReadingListItem[] = [
  {
    title: "The Site Reliability Workbook",
    author: "Google SRE Team",
    category: "Books",
    url: "https://sre.google/workbook/table-of-contents/",
    why: "The clearest published account of what SLOs actually change about how a team makes decisions, not just how it dashboards.",
  },
  {
    title: "How Complex Systems Fail",
    author: "Richard I. Cook",
    category: "Papers",
    url: "https://how.complexsystems.fail/",
    why: "Eighteen short, dense points that reframed how I think about incidents — as evidence of normal system behavior, not aberrations.",
  },
  {
    title: "Kubernetes Admission Controllers Reference",
    author: "Kubernetes SIG Auth",
    category: "Documentation",
    url: "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    why: "I keep coming back to this because the ordering and failure-mode details matter enormously and are easy to misremember.",
  },
  {
    title: "The Tail at Scale",
    author: "Jeffrey Dean, Luiz André Barroso",
    category: "Papers",
    url: "https://research.google/pubs/pub40801/",
    why: "Changed how I think about latency variance — the average request is not the one that determines whether users trust your system.",
  },
  {
    title: "NIST SP 800-207: Zero Trust Architecture",
    author: "National Institute of Standards and Technology",
    category: "Documentation",
    url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
    why: "The most precise definition of zero trust I've found, useful specifically because it resists turning the term into marketing.",
  },
  {
    title: "Cloud Native Infrastructure",
    author: "Justin Garrison, Kris Nova",
    category: "Books",
    why: "A good corrective to treating Kubernetes as an end state rather than one layer of a much larger infrastructure decision.",
  },
  {
    title: "Falco: Runtime Security Documentation",
    author: "CNCF Falco Project",
    category: "Documentation",
    url: "https://falco.org/docs/",
    why: "The best practical reference for what runtime detection can and can't see, which is the question underneath most of what I write.",
  },
];

export function getReadingListByCategory() {
  const categories = ["Books", "Papers", "Documentation", "Articles", "Research"] as const;
  return categories
    .map((category) => ({
      category,
      items: readingList.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
