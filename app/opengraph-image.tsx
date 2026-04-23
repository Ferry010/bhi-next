import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFrauncesFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    ).then((r) => r.text());
    // Last @font-face block in Google Fonts CSS is the basic Latin subset
    const allMatches = Array.from(css.matchAll(/src:\s*url\((.+?)\)/g));
    const fontUrl = allMatches[allMatches.length - 1]?.[1];
    if (!fontUrl) return null;
    return fetch(fontUrl).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const fontData = await loadFrauncesFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F1117",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px 64px",
          position: "relative",
        }}
      >
        {/* Teal glow – top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#5AA6B2",
            opacity: 0.1,
            filter: "blur(100px)",
          }}
        />
        {/* Amber glow – bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "#C9A96E",
            opacity: 0.08,
            filter: "blur(80px)",
          }}
        />

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
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#F5EFE2",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              fontFamily: fontData ? "Fraunces" : "serif",
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
            Strategy, research and training for organizations that want human advantage.
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
    {
      ...size,
      fonts: fontData
        ? [{ name: "Fraunces", data: fontData, style: "normal", weight: 700 }]
        : [],
    },
  );
}
