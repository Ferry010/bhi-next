import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Vibecoding | Het teamuitje waar je écht iets bouwt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Sla de escape room over. ",
    accent: "Bouw iets.",
    sub: "Een teamuitje vol plezier: samen echte dingen bouwen met AI. Bij jullie of op ons kantoor in Rotterdam.",
  });
}
