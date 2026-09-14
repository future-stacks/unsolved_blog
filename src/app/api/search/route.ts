import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { buildSearchIndex } from "@/lib/search-index";

let fuseInstance: Fuse<ReturnType<typeof buildSearchIndex>[number]> | null = null;

function getFuse() {
  if (!fuseInstance) {
    fuseInstance = new Fuse(buildSearchIndex(), {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.25 },
        { name: "category", weight: 0.15 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }
  return fuseInstance;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = getFuse()
    .search(q)
    .slice(0, 12)
    .map((r) => r.item);

  return NextResponse.json({ results });
}
