import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Towards a Human-Technology Fit | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Towards a Human-Technology ",
    accent: "Fit.",
    sub: "A study with Erasmus University Rotterdam on how to socialise AI in a way that accounts for your people. Free to read and cite.",
  });
}
