import type { Metadata } from "next";
import HumanTouchClient from "./HumanTouchClient";

export const metadata: Metadata = {
  alternates: { canonical: "/humantouch" },
  title: "Human Touch | Brand Humanizing Institute",
  description: "Add a human touch to your email. Show it was really you.",
  openGraph: { images: [{ url: "/og/human-touch.jpg" }] },
};

export default function HumanTouchPage() {
  return <HumanTouchClient />;
}
