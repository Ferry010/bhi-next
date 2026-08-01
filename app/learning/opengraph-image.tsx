import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Live Training | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Your competitors are already rethinking their people strategy. ",
    accent: "Are you?",
    sub: "Four formats, from a one hour spark to a two day leadership programme. Every one includes the book.",
  });
}
