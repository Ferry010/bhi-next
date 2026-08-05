import { renderOgImage, OG_SIZE } from "@/lib/ogImage";
import { YearsActiveWord } from "@/lib/facts";

export const runtime = "edge";
export const alt = "The Brand Humanizing Method";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "The framework that makes your brand ",
    accent: "impossible to copy.",
    sub: `The pyramid and the four skills technology cannot replace. ${YearsActiveWord()} years and 50+ organisations went into this.`,
  });
}
