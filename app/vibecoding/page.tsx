import type { Metadata } from "next";
import VibecodingLanding from "@/components/vibecoding/VibecodingLanding";
import { en } from "@/components/vibecoding/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/vibecoding",
    languages: { en: "/vibecoding", nl: "/teamuitje" },
  },
  title: en.meta.title,
  description: en.meta.description,
  openGraph: { type: "website" },
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

export default function VibecodingPage() {
  return <VibecodingLanding content={en} />;
}
