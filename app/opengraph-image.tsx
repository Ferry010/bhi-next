import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/ogImage";
import { ferryDataUri, jonathanDataUri } from "./og-hero-photos";

// Site-wide share image: a snapshot of the actual homepage hero in brand colours,
// including the real polaroids of Ferry & Jonathan (inlined as data URIs).
export const runtime = "edge";
export const alt = "Brand Humanizing Institute — no one can copy your people.";
export const size = OG_SIZE;
export const contentType = "image/png";

const BLUE = "#1154AC";
const RED = "#DF302A";
const INK = "#1C1C1C";

function Polaroid({ src, caption, rotate, style }: { src: string; caption: string; rotate: number; style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#FFFFFF",
        padding: "13px 13px 30px",
        borderRadius: 10,
        boxShadow: "0 22px 48px rgba(18,21,46,0.30)",
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <img src={src} width={196} height={230} style={{ objectFit: "cover", borderRadius: 2 }} />
      <span style={{ marginTop: 10, fontSize: 24, fontStyle: "italic", color: "#6B6656" }}>{caption}</span>
    </div>
  );
}

export default function Image() {
  const ferry = ferryDataUri;
  const jonathan = jonathanDataUri;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", fontFamily: "sans-serif" }}>
        {/* Left: the headline */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 646, padding: "60px 0 60px 76px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 30 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: BLUE }} />
            <span style={{ color: BLUE, fontSize: 17, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Brand Humanizing Institute
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 58, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, maxWidth: 560 }}>
            <span>Everyone can copy your technology. No one can copy your </span>
            <span style={{ color: BLUE }}>people.</span>
          </div>

          <div style={{ display: "flex", marginTop: 28, maxWidth: 520 }}>
            <span style={{ fontSize: 23, color: "#5A5A5A", lineHeight: 1.45 }}>
              As AI does more, the winners get measurably better at what only humans can do.
            </span>
          </div>

          <div style={{ display: "flex", marginTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", background: RED, color: "#FFFFFF", fontSize: 20, fontWeight: 700, padding: "14px 30px", borderRadius: 999 }}>
              <span>See the training formats  →</span>
            </div>
          </div>
        </div>

        {/* Right: the polaroids */}
        <div style={{ position: "relative", display: "flex", flex: 1 }}>
          <div style={{ position: "absolute", top: 66, right: 54, width: 330, height: 330, borderRadius: 999, background: "rgba(223,48,42,0.10)", display: "flex" }} />
          <Polaroid src={ferry} caption="Ferry" rotate={-4} style={{ left: 34, top: 158 }} />
          <Polaroid src={jonathan} caption="Jonathan" rotate={3} style={{ right: 40, top: 92 }} />
          <div style={{ position: "absolute", bottom: 64, right: 56, transform: "rotate(2deg)", display: "flex", alignItems: "center", gap: 7, background: "#FFFFFF", boxShadow: "0 12px 28px rgba(18,21,46,0.22)", borderRadius: 14, padding: "11px 18px" }}>
            <span style={{ fontSize: 20, fontStyle: "italic", color: INK }}>Ferry &amp; Jonathan</span>
            <span style={{ fontSize: 20, fontStyle: "italic", color: RED }}>(actual humans)</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
