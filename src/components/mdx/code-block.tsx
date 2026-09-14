"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, button stays interactive.
    }
  }

  return (
    <div className="group/code relative my-6">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg px-2 py-1 text-[11px] font-medium text-fg-secondary opacity-0 transition-opacity hover:text-fg focus-visible:opacity-100 group-hover/code:opacity-100"
      >
        {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
