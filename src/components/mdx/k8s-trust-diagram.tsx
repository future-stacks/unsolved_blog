"use client";

import { useState } from "react";

interface Layer {
  id: string;
  label: string;
  does: string;
  wrong: string;
  implication: string;
}

const layers: Layer[] = [
  {
    id: "perimeter",
    label: "Ingress / Perimeter",
    does: "Terminates external traffic, routes it to the right service, and is usually the only layer with a WAF or rate limiting in front of it.",
    wrong: "Misconfigured routing rules can expose an internal-only service externally without anyone noticing, since the perimeter itself still looks 'up' and healthy.",
    implication: "This is the castle wall — the layer most teams invest in first, and the only layer most non-security engineers think about when they hear 'security control.'",
  },
  {
    id: "rbac",
    label: "RBAC",
    does: "Decides which authenticated identities can perform which verbs on which Kubernetes API resources.",
    wrong: "Overly broad ClusterRoleBindings (a common shortcut during initial setup) silently grant far more access than intended, and RBAC's own audit trail rarely flags 'this binding is broader than it needs to be' — only 'this request was allowed.'",
    implication: "A held perimeter says nothing about RBAC. An attacker who compromises one pod's service account inherits whatever that account's RBAC grants — which is often way more than the pod itself uses.",
  },
  {
    id: "network-policy",
    label: "Network Policy",
    does: "Restricts which pods can initiate connections to which other pods, turning Kubernetes' flat default networking into something closer to segmented.",
    wrong: "A selector typo can cause a policy to match zero pods — applying cleanly, showing as 'active,' and enforcing nothing. See the experiment linked below.",
    implication: "This is the layer that decides lateral movement once something is already inside the perimeter — and it's the layer whose failures are hardest to notice, because a broken policy looks identical to a working one from the outside.",
  },
  {
    id: "admission",
    label: "Admission Controller",
    does: "Intercepts API requests before they're persisted, and can reject or mutate anything that violates policy — the layer that enforces 'no privileged containers' or 'no hostNetwork.'",
    wrong: "Can fail open under load or on webhook timeout, depending on the failurePolicy setting — a detail that's easy to leave at a permissive default during initial rollout and never revisit.",
    implication: "A great admission controller can still leave you with almost no evidence of what it blocked, if audit verbosity wasn't raised deliberately — see the first experiment in The Lab.",
  },
  {
    id: "runtime",
    label: "Runtime",
    does: "What's actually executing inside a container once it's running — its process tree, syscalls, and any runtime security agent (like Falco) watching for anomalous behavior.",
    wrong: "Everything upstream can be configured correctly and a container can still be compromised through an application-layer vulnerability that none of the earlier layers were designed to catch.",
    implication: "This is the layer that exists precisely because every layer before it can hold and still not be enough. Runtime detection is the closest thing Kubernetes has to admitting the wall might not be the whole story.",
  },
];

export function KubernetesTrustDiagram() {
  const [activeId, setActiveId] = useState(layers[0].id);
  const active = layers.find((l) => l.id === activeId)!;

  return (
    <div className="not-prose my-10 overflow-hidden rounded-2xl border border-border bg-bg-subtle">
      <div className="border-b border-border px-5 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-tertiary">
          Interactive — click a layer
        </p>
      </div>

      <div className="grid gap-0 sm:grid-cols-[minmax(0,15rem)_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto border-b border-border p-4 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
          {layers.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setActiveId(layer.id)}
              aria-pressed={activeId === layer.id}
              className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors sm:w-full ${
                activeId === layer.id
                  ? "bg-accent text-accent-fg"
                  : "text-fg-secondary hover:bg-bg-raised hover:text-fg"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-tabular ${
                  activeId === layer.id
                    ? "bg-accent-fg/20"
                    : "border border-border-strong"
                }`}
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap sm:whitespace-normal">{layer.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-7" key={active.id}>
          <h4 className="font-serif text-xl font-medium text-fg">{active.label}</h4>

          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
                What it does
              </dt>
              <dd className="mt-1 text-[14.5px] leading-relaxed text-fg-secondary">
                {active.does}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
                What can go wrong
              </dt>
              <dd className="mt-1 text-[14.5px] leading-relaxed text-fg-secondary">
                {active.wrong}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                Security implication
              </dt>
              <dd className="mt-1 text-[14.5px] leading-relaxed text-fg">
                {active.implication}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
