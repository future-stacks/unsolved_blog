import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : null;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
