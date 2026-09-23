import type { Metadata } from "next";
import VibecodingThanks from "@/components/vibecoding/VibecodingThanks";
import { nl } from "@/components/vibecoding/content";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  description: "We hebben je aanvraag voor de teamdag ontvangen.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/teamuitje/bedankt",
    languages: { en: "/vibecoding/thanks", nl: "/teamuitje/bedankt" },
  },
};

export default function TeamuitjeBedanktPage() {
  return <VibecodingThanks content={nl} />;
}
