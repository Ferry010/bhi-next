import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "The State of Human 2020 | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "The State of Human ",
    accent: "2020.",
    sub: "104 decision-makers, one question: is there still a place for humans in an automating world? 87.5% said yes.",
  });
}
