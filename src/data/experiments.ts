import type { Experiment } from "@/lib/types";

export const experiments: Experiment[] = [
  {
    slug: "can-admission-control-prevent-without-evidence",
    title:
      "Can a Kubernetes security control prevent an action without generating useful evidence?",
    question:
      "When a validating admission webhook blocks a request, does the cluster retain enough evidence to reconstruct what was attempted, by whom, and how many times?",
    hypothesis:
      "A denied admission request generates a Kubernetes API audit event, so I expected the default audit configuration to give us everything we'd need for a post-incident timeline without any extra instrumentation.",
    setup: `A kind cluster running a validating admission webhook (built on Kyverno) that blocks any Pod spec requesting \`hostNetwork: true\`. Kubernetes audit logging enabled at the default "Metadata" level, the level most managed clusters ship with out of the box.

\`\`\`yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-host-network
spec:
  validationFailureAction: Enforce
  rules:
    - name: no-host-network
      match:
        resources:
          kinds: [Pod]
      validate:
        message: "hostNetwork is not permitted"
        pattern:
          spec:
            =(hostNetwork): "false"
\`\`\``,
    experiment: `I attempted to deploy 12 pods requesting \`hostNetwork: true\` from three different service accounts over a 20-minute window, simulating a mix of a misconfigured deploy pipeline and a deliberate privilege-escalation attempt. Then I tried to answer four questions using only what the cluster had recorded: who tried this, how many times, from where, and whether the attempts were increasing in frequency.`,
    result: `The Kyverno policy worked exactly as designed — all 12 pods were rejected at admission. But at the default "Metadata" audit level, the retained audit event recorded the verb, the resource type, the user, and the response code (denied) — and nothing about the request body. There was no record of \`hostNetwork: true\` specifically, no way to distinguish this denial from any other validation failure, and no record of which container image or namespace was involved beyond what "Metadata" level exposes. Reconstructing intent from the audit trail alone was not possible. Raising audit logging to "RequestResponse" level made every field available — including the full pod spec — but increased audit log volume by roughly 40x in this test, which is the reason most clusters don't run at that level by default.`,
    lesson: `A prevention control and a detection control are not the same investment, and enabling one doesn't give you the other for free. The admission webhook did its job completely — nothing was allowed to run. But if this had been a real privilege-escalation attempt instead of a test, security response would have known an attack was stopped and almost nothing else about it: not the technique, not whether it was automated, not whether it was still being retried. Getting real evidence required deliberately raising audit verbosity for the resources that matter, which is a cost/signal trade-off worth making on purpose rather than discovering during an incident.`,
    repo: {
      name: "k8s-admission-audit-lab",
      description:
        "kind cluster manifests, Kyverno policy, and a load script to reproduce the audit-visibility gap described in this experiment.",
      url: "https://github.com/future-stacks/k8s-admission-audit-lab",
      technologies: ["Kubernetes", "Kyverno", "kind", "Audit Logging"],
    },
    tags: ["Kubernetes", "Security", "Observability"],
    status: "completed",
    date: "2026-08-20",
    relatedArticleSlugs: ["the-castle-was-never-the-problem", "the-security-control-that-worked-too-well"],
  },
  {
    slug: "network-policy-misconfiguration-blast-radius",
    title: "What happens when network policies are intentionally misconfigured?",
    question:
      "If a NetworkPolicy's podSelector is subtly wrong — matching more or fewer pods than intended — how much east-west traffic actually gets exposed, and would anything alert on it?",
    hypothesis:
      "I expected an empty or overly broad selector to be functionally equivalent to having no policy at all, and I expected some signal — a metric, a warning, anything — when a policy matched zero pods.",
    setup: `A three-namespace cluster (\`payments\`, \`public-api\`, \`internal-tools\`) with Calico as the CNI. A NetworkPolicy in \`payments\` intended to allow ingress only from \`public-api\`, deployed with a label selector typo (\`app: paymnets-gateway\` instead of \`app: payments-gateway\`) — the kind of mistake that ships in a rushed PR and passes review because the YAML looks correct.`,
    experiment: `I deployed the misconfigured policy, then attempted lateral connections from \`internal-tools\` (which should have been blocked) to a pod in \`payments\`, and checked three things: whether the connection succeeded, whether \`kubectl describe networkpolicy\` surfaced anything suspicious, and whether Calico's own metrics distinguished this from a correctly functioning policy.`,
    result: `The typo meant the policy's selector matched zero pods, which — per Kubernetes networking semantics — is different from "deny all" only if you already know to check. A policy that selects no pods enforces nothing on the pods it was meant to protect; ingress remained fully open. \`kubectl describe\` showed the policy as present and "healthy" with no warning that it was selecting nothing. Calico's metrics reported policy evaluation counts, but nothing flagged a policy with zero matched pods as an anomaly — from the metrics alone, a misconfigured policy and a correctly scoped, low-traffic policy look identical.`,
    lesson: `The dangerous version of a network policy misconfiguration isn't the one that's obviously broken — it's the one that's syntactically valid, applies cleanly, and silently protects nothing. The fix wasn't a better policy; it was an admission-time check that rejects any NetworkPolicy whose selector matches zero pods, plus a periodic job that diffs intended coverage against actual coverage. Trusting that "the policy exists" means "the policy works" turned out to be exactly the kind of assumption this publication exists to test.`,
    tags: ["Kubernetes", "Networking", "Security"],
    status: "completed",
    date: "2026-06-05",
    relatedArticleSlugs: ["the-castle-was-never-the-problem"],
  },
];

export function getExperimentBySlug(slug: string) {
  return experiments.find((e) => e.slug === slug);
}
