import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Synchronous: no external fetches that can time out on Vercel edge.
// Gradient background replaces glow blobs (filter:blur is not satori-supported).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(90,166,178,0.13) 0%, #0F1117 38%, rgba(201,169,110,0.09) 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px 64px",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#5AA6B2",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "#5AA6B2",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Brand Humanizing Institute
          </span>
        </div>

        {/* Headline */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div
            style={{
              color: "#F5EFE2",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              fontFamily: "serif",
              maxWidth: 860,
            }}
          >
            The skill of the future is human.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "rgba(245, 239, 226, 0.42)",
              fontSize: 20,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
              maxWidth: 660,
            }}
          >
            Strategy, research and training for organizations that want human
            advantage.
          </span>
          <span
            style={{
              color: "rgba(245, 239, 226, 0.26)",
              fontSize: 18,
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
              flexShrink: 0,
              marginLeft: 32,
            }}
          >
            brandhumanizing.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
