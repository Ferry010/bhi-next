import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Vibecoding | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Skip the escape room. ",
    accent: "Build something.",
    sub: "A team day of pure fun building real things with AI, in groups. At your place or our Rotterdam office.",
  });
}
