import type { Metadata } from "next";
import VibecodingLanding from "@/components/vibecoding/VibecodingLanding";
import { nl } from "@/components/vibecoding/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/teamuitje",
    languages: { en: "/vibecoding", nl: "/teamuitje" },
  },
  title: nl.meta.title,
  description: nl.meta.description,
  openGraph: { type: "website" },
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

export default function TeamuitjePage() {
  return <VibecodingLanding content={nl} />;
}
