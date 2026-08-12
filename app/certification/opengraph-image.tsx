import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

// Generated share card, same book-palette system as the homepage, so it never
// goes stale the way the old static /og/pricing.jpg did.
export const runtime = "edge";
export const alt = "Certification | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "A course changes your team. A certification changes ",
    accent: "who you are in the room.",
    sub: "Certify your team's AI literacy today, or become the person organisations call.",
  });
}
