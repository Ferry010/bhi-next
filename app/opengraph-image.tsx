import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "hsl(235 40% 13%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent blob */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "hsl(21 100% 58%)",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            color: "hsl(21 100% 58%)",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Brand Humanizing Institute
        </div>
        {/* Title */}
        <div
          style={{
            color: "hsl(30 25% 95%)",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 32,
          }}
        >
          The skill of the future is human.
        </div>
        {/* Sub */}
        <div
          style={{
            color: "rgba(232, 226, 214, 0.6)",
            fontSize: 28,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Strategy, research, and training for organizations that want to use technology to amplify people, not replace them.
        </div>
        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            color: "rgba(232, 226, 214, 0.35)",
            fontSize: 20,
            letterSpacing: "0.05em",
          }}
        >
          brandhumanizing.com
        </div>
      </div>
    ),
    { ...size },
  );
}
