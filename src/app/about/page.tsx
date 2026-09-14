import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Hope Akpabio — DevOps and cloud engineer, and the person behind UNRESOLVED.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
      <PageHeader eyebrow="Who writes this" title="About Hope" />

      <div className="prose prose-lg mt-8 max-w-none leading-relaxed prose-p:text-fg prose-p:leading-[1.75]">
        <p>
          I&rsquo;m Hope, a DevOps and cloud engineer interested in what happens at the
          intersection of infrastructure, security, and reliability.
        </p>
        <p>
          I write about the systems I build, the assumptions I challenge, and the
          engineering problems that become more interesting the deeper you look. My work
          sits primarily around cloud infrastructure, Kubernetes, DevOps, security, and
          observability — the layer most teams touch daily but rarely stop to question.
        </p>
        <p>I&rsquo;m particularly interested in one question:</p>
        <blockquote>
          <p>How do we know our systems are actually doing what we think they&rsquo;re doing?</p>
        </blockquote>
        <p>
          That question is the whole reason UNRESOLVED exists. Most engineering writing
          explains how a system is supposed to work. I&rsquo;d rather find out how it
          actually behaves — which usually means building a small, deliberately
          adversarial version of it and seeing what breaks, what stays silent when it
          should be loud, and what I got wrong on the way in.
        </p>

        <h2>Background</h2>
        <p>
          I work as an Associate DevOps Engineer, spending most of my time in Kubernetes
          clusters, cloud infrastructure, and the CI/CD pipelines that connect them. Before
          that, my path into engineering ran through the same overthinking-to-execution
          gap I still find interesting today — which is part of why I care as much about
          how teams communicate risk as I do about the risk itself.
        </p>

        <h2>Areas of interest</h2>
        <ul>
          <li>Kubernetes security — admission control, RBAC, network policy, runtime detection</li>
          <li>Observability as distinct from logging and monitoring</li>
          <li>The gap between a control&rsquo;s intended behavior and its tested behavior</li>
          <li>Platform engineering and the trade-offs of abstraction</li>
          <li>Incident analysis as a source of engineering truth, not just postmortems</li>
        </ul>

        <h2>Selected projects</h2>
        <ul>
          <li>
            <strong>k8s-admission-audit-lab</strong> — a reproducible cluster and policy
            set for testing what Kubernetes admission control actually records versus
            what it prevents.
          </li>
          <li>
            <strong>MoodLens</strong> — a habit-support tool exploring how systems can turn
            ambiguous internal state into a specific, low-friction next action.
          </li>
        </ul>

        <p>
          If you&rsquo;re an engineer, a recruiter, a student, or a researcher and want a
          faster way into the site, <a href="/start-here">Start Here</a> is built for you
          specifically.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-border pt-8">
        <a
          href={site.author.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-fg-secondary hover:text-accent"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        <a
          href={site.author.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-fg-secondary hover:text-accent"
        >
          <Github size={16} />
          GitHub
        </a>
        <a
          href={`mailto:${site.author.email}`}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-fg-secondary hover:text-accent"
        >
          <Mail size={16} />
          Email
        </a>
      </div>
    </div>
  );
}
