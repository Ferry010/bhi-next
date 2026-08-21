import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Our story | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "It started with a line ",
    accent: "in a notebook.",
    sub: "From a Rotterdam McDonald's in 2017 to a framework, 40 keynotes a year and a book. The origin story of Brand Humanizing.",
  });
}
