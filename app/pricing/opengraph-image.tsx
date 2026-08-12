import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

// Generated share card, same book-palette system as the homepage, so it never
// goes stale the way the old static /og/pricing.jpg did.
export const runtime = "edge";
export const alt = "Train your team | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Everyone's team is learning AI. Yours should learn ",
    accent: "what AI can't do.",
    sub: "Three ways to give your people the human edge: a keynote, a day, or a programme.",
  });
}
