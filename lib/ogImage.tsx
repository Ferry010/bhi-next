import { ImageResponse } from "next/og";

// Shared renderer for every generated share image, so they stay one system.
// Book-cover palette: white ground, black copy, royal blue accent, yellow rule,
// red wordmark. Synchronous and font-free (satori has no blur; system fonts only).

export const OG_SIZE = { width: 1200, height: 630 };

const BLUE = "#104D9E";
const RED = "#DF302A";
const YELLOW = "#FFBB00";
const INK = "#1C1C1C";

export function renderOgImage({
  headline,
  accent,
  sub,
}: {
  /** Leading part of the headline, rendered in black. */
  headline: string;
  /** Trailing part, rendered in blue. Optional. */
  accent?: string;
  /** Supporting line in the bottom row. */
  sub: string;
}) {
  // Scale the headline down as it gets longer, so long lines stay at two or
  // three lines and never crowd the rule beneath them.
  const len = headline.length + (accent?.length ?? 0);
  const fontSize =
    len > 88 ? 50 : len > 68 ? 56 : len > 52 ? 62 : len > 38 ? 70 : 78;

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
              background: BLUE,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: BLUE,
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
              color: INK,
              fontSize,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontFamily: "sans-serif",
              maxWidth: 980,
            }}
          >
            <span>{headline}</span>
            {accent ? <span style={{ color: BLUE }}>{accent}</span> : null}
          </div>
        </div>

        {/* Yellow rule */}
        <div
          style={{
            display: "flex",
            width: 132,
            height: 8,
            borderRadius: 4,
            background: YELLOW,
            marginTop: 12,
            marginBottom: 26,
            flexShrink: 0,
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
            {sub}
          </span>
          <span
            style={{
              color: RED,
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
    { ...OG_SIZE },
  );
}
