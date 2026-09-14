import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-raised": "var(--bg-raised)",
        fg: "var(--fg)",
        "fg-secondary": "var(--fg-secondary)",
        "fg-tertiary": "var(--fg-tertiary)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
        content: "48rem",
        wide: "72rem",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--fg)",
            "--tw-prose-headings": "var(--fg)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--fg)",
            "--tw-prose-quotes": "var(--fg-secondary)",
            "--tw-prose-quote-borders": "var(--accent)",
            "--tw-prose-code": "var(--fg)",
            "--tw-prose-hr": "var(--border)",
            maxWidth: "none",
          },
        },
      }),
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
