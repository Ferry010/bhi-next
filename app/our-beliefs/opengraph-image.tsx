import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Our beliefs | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "A few things we believe ",
    accent: "to be true.",
    sub: "The convictions behind Brand Humanizing, said plainly.",
  });
}
