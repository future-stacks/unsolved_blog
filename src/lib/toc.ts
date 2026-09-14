export interface TocItem {
  text: string;
  slug: string;
  depth: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractToc(mdx: string): TocItem[] {
  const lines = mdx.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      items.push({ text, slug: slugify(text), depth });
    }
  }

  return items;
}
