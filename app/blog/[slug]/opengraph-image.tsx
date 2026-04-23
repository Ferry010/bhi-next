import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
export const alt = "Blog post from Brand Humanizing Institute";
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
    const allMatches = Array.from(css.matchAll(/src:\s*url\((.+?)\)/g));
    const fontUrl = allMatches[allMatches.length - 1]?.[1];
    if (!fontUrl) return null;
    return fetch(fontUrl).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  let title = "Brand Humanizing Blog";
  let featuredImageUrl: string | null = null;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase
      .from("blog_posts")
      .select("title, header_image_url")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();
    if (data) {
      title = data.title ?? title;
      featuredImageUrl = data.header_image_url ?? null;
    }
  } catch {
    // fall back to generic title + gradient
  }

  const fontData = await loadFrauncesFont();
  const fontSize = title.length > 80 ? 46 : title.length > 55 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F1117",
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Featured image background ── */}
        {featuredImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featuredImageUrl}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        {/* ── Gradient overlay (dark for text on image; solid fallback) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: featuredImageUrl
              ? "linear-gradient(to bottom, rgba(15,17,23,0.22) 0%, rgba(15,17,23,0.60) 45%, rgba(15,17,23,0.93) 100%)"
              : "transparent",
          }}
        />

        {/* ── Glow blobs – only in branded gradient fallback ── */}
        {!featuredImageUrl && (
          <>
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
          </>
        )}

        {/* ── Content layer ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "60px 72px 56px",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 3,
                height: 20,
                borderRadius: 2,
                background: "#5AA6B2",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#5AA6B2",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              Brand Humanizing Institute
            </span>
          </div>

          {/* Spacer – lets the image show through */}
          <div style={{ flex: 1 }} />

          {/* Post title */}
          <div
            style={{
              color: "#F5EFE2",
              fontSize,
              fontWeight: 700,
              lineHeight: 1.18,
              fontFamily: fontData ? "Fraunces" : "serif",
              maxWidth: 980,
              marginBottom: 28,
            }}
          >
            {title}
          </div>

          {/* Bottom row: amber pill + domain */}
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
                padding: "5px 16px",
                border: "1.5px solid rgba(201, 169, 110, 0.4)",
                borderRadius: 100,
                color: "#C9A96E",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              Blog
            </div>
            <span
              style={{
                color: "rgba(245, 239, 226, 0.3)",
                fontSize: 16,
                fontFamily: "sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              brandhumanizing.com
            </span>
          </div>
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
