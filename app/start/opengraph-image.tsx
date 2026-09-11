import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Find your fit | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Not sure where to start? ",
    accent: "Find your fit.",
    sub: "Answer three quick questions and we point you to the right way in, then a real human replies to your specific question.",
  });
}
