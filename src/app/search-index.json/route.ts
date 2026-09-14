import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

export async function GET() {
  return NextResponse.json(buildSearchIndex());
}
