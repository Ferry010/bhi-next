import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/ogImage";
import { bookCoverDataUri } from "./book-cover-data";

// Share image for the book page: the actual cover on a warm book-palette ground,
// with the headline and authors beside it. Cover inlined as a data URI so it
// resolves under the edge runtime.
export const runtime = "edge";
export const alt = "Brand Humanizing, the book by Ferry Hoes and Jonathan Flores";
export const size = OG_SIZE;
export const contentType = "image/png";

const CREAM = "#FBF6EA";
const INK = "#1C1C1C";
const BLUE = "#104D9E";
const RED = "#DF302A";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: CREAM,
          fontFamily: "sans-serif",
          padding: "0 76px",
        }}
      >
        {/* The cover */}
        <div style={{ display: "flex", width: 430, justifyContent: "center", flexShrink: 0 }}>
          <img
            src={bookCoverDataUri}
            width={330}
            height={503}
            style={{
              borderRadius: 8,
              boxShadow: "0 26px 60px rgba(28,28,28,0.30)",
              transform: "rotate(-3deg)",
            }}
          />
        </div>

        {/* The words */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingLeft: 40 }}>
          <span
            style={{
              color: RED,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            The book
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            <span>We wrote the book on it.&nbsp;</span>
            <span style={{ color: BLUE }}>Literally.</span>
          </div>
          <span style={{ marginTop: 26, fontSize: 25, lineHeight: 1.4, color: "#5A564B", maxWidth: 560 }}>
            The superpower that makes your brand more human and your business grow faster.
          </span>
          <span style={{ marginTop: 22, fontSize: 23, fontWeight: 700, color: INK }}>
            Ferry Hoes &amp; Jonathan Flores
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
