import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0e0d0f",
          color: "#f3f0ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#e2884f" }} />
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 1 }}>UNRESOLVED</span>
        </div>
        <span style={{ fontSize: 52, lineHeight: 1.2, fontWeight: 600, maxWidth: 980 }}>
          {site.tagline}
        </span>
        <span style={{ fontSize: 22, color: "#a6a19a" }}>{site.positioning}</span>
      </div>
    ),
    { ...size }
  );
}
