import type { ChangelogEntry } from "@/lib/types";

export const changelog: ChangelogEntry[] = [
  {
    version: "v0.4",
    date: "September 2026",
    changes: [
      "Added the Security, Reconsidered series",
      "Added two Kubernetes experiments to The Lab",
      "Improved article search",
      "Added RSS",
      "Added dark mode",
    ],
  },
  {
    version: "v0.3",
    date: "July 2026",
    changes: [
      "Added Ideas — short-form thoughts between full articles",
      "Added the Glossary",
      "Rebuilt the article template with key-idea and counterargument callouts",
    ],
  },
  {
    version: "v0.2",
    date: "May 2026",
    changes: [
      "Added The Lab and the first published experiment",
      "Added Start Here for first-time visitors",
      "Switched typography to Fraunces + Inter",
    ],
  },
  {
    version: "v0.1",
    date: "March 2026",
    changes: ["First version of UNRESOLVED, with three articles and a newsletter signup"],
  },
];
