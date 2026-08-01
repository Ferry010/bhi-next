import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Everyone can copy your technology. No one can copy your ",
    accent: "people.",
    sub: "Training that makes your team the reason customers keep choosing you.",
  });
}
