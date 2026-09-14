import type { GlossaryTerm } from "@/lib/types";

export const glossary: GlossaryTerm[] = [
  {
    term: "RBAC",
    slug: "rbac",
    definition:
      "Role-Based Access Control. A model where permissions are attached to roles rather than individuals, and identities are granted roles. In Kubernetes, RBAC governs which subjects can perform which verbs on which resources.",
  },
  {
    term: "Network Policy",
    slug: "network-policy",
    definition:
      "A Kubernetes resource that restricts which pods can talk to which other pods, and on which ports. Without one, Kubernetes networking is flat by default — every pod can reach every other pod.",
  },
  {
    term: "Admission Controller",
    slug: "admission-controller",
    definition:
      "A piece of Kubernetes control-plane logic that intercepts API requests after authentication and authorization, but before the object is persisted. It can mutate the request or reject it outright — which is where most policy enforcement (Gatekeeper, Kyverno, custom webhooks) lives.",
  },
  {
    term: "Observability",
    slug: "observability",
    definition:
      "The property of a system that lets you infer its internal state from its external outputs — logs, metrics, and traces — including for questions you didn't anticipate when you instrumented it. Distinct from monitoring, which checks for known failure modes.",
  },
  {
    term: "Zero Trust",
    slug: "zero-trust",
    definition:
      "A security model that assumes no request should be implicitly trusted based on network location alone. Every request is authenticated and authorized on its own merits, whether it originates inside the perimeter or outside it.",
  },
  {
    term: "Infrastructure as Code",
    slug: "infrastructure-as-code",
    definition:
      "Defining and provisioning infrastructure through machine-readable configuration (Terraform, Pulumi, CloudFormation) rather than manual, one-off changes — so infrastructure state is versioned, reviewable, and reproducible.",
  },
  {
    term: "Platform Engineering",
    slug: "platform-engineering",
    definition:
      "The discipline of building internal platforms and golden paths that let product engineers ship without needing deep infrastructure expertise — treating the platform itself as a product with its own users.",
  },
  {
    term: "Admission Webhook",
    slug: "admission-webhook",
    definition:
      "An admission controller implemented as an external HTTP service the API server calls out to. Validating webhooks can accept or reject a request; mutating webhooks can also change it.",
  },
  {
    term: "Blast Radius",
    slug: "blast-radius",
    definition:
      "The scope of impact if a given component, credential, or failure is compromised or fails. Reducing blast radius means limiting what a single point of failure can affect.",
  },
  {
    term: "RAM (Resource Access Management)",
    slug: "ram",
    definition:
      "Alibaba Cloud's identity and access control service. RAM lets an account create sub-identities and attach policies to them, similar in spirit to RBAC but scoped to cloud resources and API actions rather than a Kubernetes cluster.",
  },
  {
    term: "Security Group",
    slug: "security-group",
    definition:
      "A virtual firewall attached to Alibaba Cloud ECS instances that controls inbound and outbound traffic by IP, port, and protocol. Functions at the instance level, not the network level — closer to a host firewall than a network-wide policy.",
  },
  {
    term: "ActionTrail",
    slug: "actiontrail",
    definition:
      "Alibaba Cloud's audit logging service, recording API calls made against an account's resources. What it captures depends on the event type and configured trail scope — not every call is logged with the same level of detail by default.",
  },
  {
    term: "OSS (Object Storage Service)",
    slug: "oss",
    definition:
      "Alibaba Cloud's object storage product. Buckets and individual objects each carry their own access control list and policy, which is a common source of unintended public exposure when the two layers disagree.",
  },
  {
    term: "PAI (Platform for AI)",
    slug: "pai",
    definition:
      "Alibaba Cloud's managed platform for training, deploying, and serving machine learning models, covering everything from data labeling to model inference endpoints.",
  },
  {
    term: "ACK (Container Service for Kubernetes)",
    slug: "ack",
    definition:
      "Alibaba Cloud's managed Kubernetes offering. It removes control-plane operations from the user, but the cluster's security posture — RBAC, network policy, admission control — remains the operator's responsibility.",
  },
];

export function getGlossaryTerm(slug: string) {
  return glossary.find((g) => g.slug === slug);
}
