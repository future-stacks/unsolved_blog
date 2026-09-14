import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently learning, building, testing, and thinking about.",
};

const sections = [
  {
    title: "Currently writing",
    items: [
      "Working through essay 05 of Security, Reconsidered — on what happens when logs are technically present but practically unusable during an incident.",
      "Drafting a standalone piece on platform engineering's 'golden path' problem: what happens when the path is golden for 80% of teams and actively wrong for the other 20%.",
    ],
  },
  {
    title: "Currently testing",
    items: [
      "Extending the admission-audit lab to compare Kyverno, OPA Gatekeeper, and a hand-rolled validating webhook on evidence quality, not just enforcement accuracy.",
      "Running a small runtime-detection experiment with Falco to see how much of the 'what happened after admission' gap it actually closes.",
    ],
  },
  {
    title: "Currently learning",
    items: [
      "eBPF fundamentals, mostly to understand what Falco and Cilium are actually doing under the observability claims.",
      "Reading NIST SP 800-207 closely enough to stop using 'zero trust' as a synonym for 'more auth checks.'",
    ],
  },
  {
    title: "Currently building",
    items: [
      "This site — UNRESOLVED itself is an ongoing infrastructure project, not just a place I publish to.",
      "A small internal tool at work for diffing intended vs. actual NetworkPolicy coverage across namespaces, the practical version of the experiment in The Lab.",
    ],
  },
];

export default function NowPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Right now"
        title="Now"
        description="What I'm currently learning, building, testing, and thinking about."
      />

      <p className="mt-6 text-[13px] font-medium uppercase tracking-wide text-fg-tertiary">
        Last updated: September 2026
      </p>

      <div className="mt-8 flex flex-col gap-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-serif text-xl font-medium text-fg">{section.title}</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-fg-secondary"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
