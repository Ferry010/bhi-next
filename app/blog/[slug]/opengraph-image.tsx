import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
export const alt = "Blog post from Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFrauncesFont(): Promise<ArrayBuffer | null> {
  try {
    // Safari 5 UA gets woff (not woff2), which satori supports
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      },
    ).then((r) => r.text());
    const match = css.match(/url\((.+?)\)/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  let title = "Brand Humanizing Blog";

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase
      .from("blog_posts")
      .select("title")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();
    if (data?.title) title = data.title;
  } catch {
    // fall back to generic title
  }

  const fontData = await loadFrauncesFont();
  const fontSize = title.length > 80 ? 48 : title.length > 50 ? 58 : 68;

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
            opacity: 0.09,
            filter: "blur(100px)",
          }}
        />
        {/* Amber glow – bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#C9A96E",
            opacity: 0.07,
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

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingRight: 80,
          }}
        >
          <div
            style={{
              color: "#F5EFE2",
              fontSize,
              fontWeight: 700,
              lineHeight: 1.18,
              fontFamily: fontData ? "Fraunces" : "serif",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 18px",
              border: "1.5px solid rgba(201, 169, 110, 0.35)",
              borderRadius: 100,
              color: "#C9A96E",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Blog
          </div>
          <span
            style={{
              color: "rgba(245, 239, 226, 0.28)",
              fontSize: 18,
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
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
