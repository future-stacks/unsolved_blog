"use client";

import { useState } from "react";
import { Link2, Linkedin, Mail, Check } from "lucide-react";

export function SocialShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable in this context — no-op.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-bg-subtle hover:text-fg"
      >
        {copied ? <Check size={15} className="text-accent" /> : <Link2 size={15} />}
      </button>
      {links.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${label}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-bg-subtle hover:text-fg"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
