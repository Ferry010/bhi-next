import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "The State of Brand Humanizing 2026 | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "The State of Brand Humanizing ",
    accent: "2026.",
    sub: "Eight years ago, we called it. Here is what happened next, and what it means for your organization.",
  });
}
