export const site = {
  name: "UNRESOLVED",
  tagline: "The interesting problems are rarely the ones with obvious answers.",
  description:
    "Writing about infrastructure, security, and the engineering assumptions underneath the systems we build.",
  positioning: "Infrastructure · Security · Engineering",
  url: "https://unresolved.dev",
  author: {
    name: "Hope Akpabio",
    shortBio: "DevOps & cloud engineer",
    email: "futurehopesaviour@gmail.com",
    linkedin: "https://www.linkedin.com/in/hope-akpabio",
    github: "https://github.com/future-stacks",
    x: "https://x.com/hopeSavior",
  },
  nav: [
    { label: "Articles", href: "/articles" },
    { label: "Series", href: "/series" },
    { label: "The Lab", href: "/lab" },
    { label: "Ideas", href: "/ideas" },
    { label: "About", href: "/about" },
  ],
  footerLinks: [
    { label: "Articles", href: "/articles" },
    { label: "Series", href: "/series" },
    { label: "The Lab", href: "/lab" },
    { label: "Ideas", href: "/ideas" },
    { label: "About", href: "/about" },
    { label: "RSS", href: "/rss.xml" },
  ],
  currentlyExploring: [
    "Kubernetes Security",
    "Observability",
    "Cloud Infrastructure",
    "Platform Engineering",
  ],
} as const;
