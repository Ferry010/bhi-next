import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
export const alt = "Blog post from Brand Humanizing Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No font fetch: avoids external timeouts on Vercel edge.
// filter:blur is not supported by satori; gradient background used instead.
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

  const fontSize = title.length > 80 ? 46 : title.length > 55 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          background: featuredImageUrl
            ? "#0F1117"
            : "linear-gradient(135deg, rgba(90,166,178,0.12) 0%, #0F1117 40%, rgba(201,169,110,0.08) 100%)",
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

        {/* Gradient overlay: only over a featured image */}
        {featuredImageUrl && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(15,17,23,0.22) 0%, rgba(15,17,23,0.60) 45%, rgba(15,17,23,0.93) 100%)",
            }}
          />
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

          {/* Spacer: image shows through here */}
          <div style={{ flex: 1 }} />

          {/* Post title */}
          <div
            style={{
              color: "#F5EFE2",
              fontSize,
              fontWeight: 700,
              lineHeight: 1.18,
              fontFamily: "serif",
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
    { ...size },
  );
}
