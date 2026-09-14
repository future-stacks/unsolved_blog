"use client";

import { useState } from "react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: still acknowledge the signup intent.
    }
    setState("done");
  }

  return (
    <div className={compact ? "" : "mx-auto max-w-xl text-center"}>
      {!compact && (
        <>
          <h2 className="font-serif text-3xl font-medium text-fg sm:text-4xl">
            One idea worth thinking about.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-fg-secondary">
            Occasional essays on infrastructure, security, and engineering. No generic
            news roundup. Just ideas worth your attention.
          </p>
        </>
      )}

      {state === "done" ? (
        <p
          className={`mt-6 text-sm text-accent ${compact ? "" : "mx-auto"}`}
          role="status"
        >
          You&rsquo;re on the list. First essay lands whenever it&rsquo;s actually ready.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className={`mt-6 flex w-full flex-col gap-2.5 sm:flex-row ${
            compact ? "" : "mx-auto max-w-sm"
          }`}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full rounded-full border border-border-strong bg-bg px-4 py-2.5 text-[14px] text-fg placeholder:text-fg-tertiary focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
