import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "The Taskforce | Brand Humanizing Institute";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Four months from now, your team runs this ",
    accent: "without us.",
    sub: "The Taskforce. 16 weeks, 6 to 8 of your people, one half day a week. When we leave, the capability stays.",
  });
}
