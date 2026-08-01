import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Taskforce | Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Book-cover palette: white ground, black copy, royal blue + red accents,
// yellow bar. Synchronous, no external fetches (satori has no blur support).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "68px 76px 60px",
        }}
      >
        {/* Brand line */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "#104D9E",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "#104D9E",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.16em",
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
              display: "flex",
              flexWrap: "wrap",
              color: "#1C1C1C",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontFamily: "sans-serif",
              maxWidth: 960,
            }}
          >
            <span>Four months from now, your team runs this&nbsp;</span>
            <span style={{ color: "#104D9E" }}>without us.</span>
          </div>
        </div>

        {/* Yellow rule */}
        <div
          style={{
            display: "flex",
            width: 132,
            height: 8,
            borderRadius: 4,
            background: "#FFBB00",
            marginBottom: 26,
          }}
        />

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
              color: "#5A5A5A",
              fontSize: 21,
              fontFamily: "sans-serif",
              lineHeight: 1.5,
              maxWidth: 720,
            }}
          >
            The Taskforce. 16 weeks, 6 to 8 of your people, one half day a week.
            When we leave, the capability stays.
          </span>
          <span
            style={{
              color: "#DF302A",
              fontSize: 19,
              fontWeight: 600,
              fontFamily: "sans-serif",
              letterSpacing: "0.03em",
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
