import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

// Generated share card, same book-palette system as the homepage.
export const runtime = "edge";
export const alt = "Saylience: the method, applied to our own work | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "We stopped transcribing. We started ",
    accent: "interviewing better.",
    sub: "Brand Humanizing, tested on our own work. It became a product used in two countries.",
  });
}
