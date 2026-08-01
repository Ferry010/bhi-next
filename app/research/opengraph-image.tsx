import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Research | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "The evidence behind ",
    accent: "the thinking.",
    sub: "Independent research on technology and what it means to be human at work. Free to read, free to cite, no registration.",
  });
}
