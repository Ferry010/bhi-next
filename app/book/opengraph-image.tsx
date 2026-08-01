import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Brand Humanizing, the book";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "We wrote the book on Brand Humanizing. ",
    accent: "Literally.",
    sub: "The superpower that makes your brand more human and your business grow faster. By Ferry Hoes and Jonathan Flores.",
  });
}
