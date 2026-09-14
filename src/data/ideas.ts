import type { Idea } from "@/lib/types";

export const ideas: Idea[] = [
  {
    slug: "security-controls-should-fail-loudly",
    title: "Security controls should fail loudly.",
    date: "2026-08-02",
    tags: ["Security", "Reliability"],
    relatedArticleSlug: "the-castle-was-never-the-problem",
    body: `A control that fails silently is worse than no control at all, because it gives you the confidence of protection without the substance of it. If an admission webhook times out and defaults to allow, that's a decision someone made — usually to avoid blocking deploys during an outage. It's a reasonable decision. But it should show up somewhere other than a debug log nobody reads until after the incident. If a control can fail, the failure needs a first-class signal: a metric, an alert, a page. Not a footnote.`,
  },
  {
    slug: "observability-isnt-logging",
    title: "Observability isn't the same thing as logging.",
    date: "2026-07-18",
    tags: ["Observability"],
    relatedArticleSlug: "observability-isnt-the-same-thing-as-logging",
    body: `Logging tells you what a system said about itself. Observability is being able to ask a question you didn't anticipate and get an answer from data you already collected. Most "observability" platforms are just log aggregation with a search bar, and most incidents I've worked involved someone realizing, mid-fire, that the question they needed to ask had no corresponding field. You don't find that gap by writing more logs. You find it by trying to answer questions you haven't asked yet, before you need to.`,
  },
  {
    slug: "cloud-abstracted-not-removed",
    title: "The cloud didn't remove infrastructure. It abstracted it.",
    date: "2026-06-30",
    tags: ["Cloud", "Infrastructure"],
    body: `"Serverless" and "managed" are marketing words for "someone else owns the failure modes you used to own, and you no longer get to see them." That's a fine trade a lot of the time. But teams that stop thinking about infrastructure because the cloud provider is "handling it" are usually the same teams surprised by a cold start, a throttling limit, or a regional outage they had no runbook for. Abstraction moves the complexity. It doesn't delete it.`,
  },
  {
    slug: "problem-with-best-practice",
    title: "The problem with calling everything \"best practice\".",
    date: "2026-05-22",
    tags: ["Engineering culture"],
    body: `"Best practice" is a phrase that ends conversations instead of starting them. It's shorthand for "someone smart, somewhere, in a context I haven't checked, did this and it worked." That's not nothing — but it's not a substitute for asking whether the same trade-offs apply here. Most of the infrastructure decisions I've regretted weren't wrong on their merits. They were right for a company at a different scale, with a different threat model, doing a different thing.`,
  },
  {
    slug: "prevention-vs-detection",
    title: "Prevention and detection answer different questions.",
    date: "2026-04-11",
    tags: ["Security", "Observability"],
    relatedArticleSlug: "the-castle-was-never-the-problem",
    body: `Prevention answers: did this happen? Detection answers: is this happening, and what does it look like when it does? Teams that only invest in prevention can tell you an attack was stopped, but not what the attack tried to do, how many times, or from where. That's a strange kind of blindness to be comfortable with — it treats the absence of a bad outcome as the absence of useful information, when it's often the opposite.`,
  },
];

export function getIdeaBySlug(slug: string) {
  return ideas.find((i) => i.slug === slug);
}
