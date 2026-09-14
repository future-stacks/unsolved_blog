import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "UNRESOLVED";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {article && (
            <span
              style={{
                fontSize: 20,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#e2884f",
                fontWeight: 600,
              }}
            >
              {article.category}
            </span>
          )}
          <span
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {article?.title ?? "UNRESOLVED"}
          </span>
        </div>

        <span style={{ fontSize: 22, color: "#a6a19a" }}>Hope Akpabio</span>
      </div>
    ),
    { ...size }
  );
}
