import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0d0f",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#e2884f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
