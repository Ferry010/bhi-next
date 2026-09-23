import type { Metadata } from "next";
import VibecodingThanks from "@/components/vibecoding/VibecodingThanks";
import { en } from "@/components/vibecoding/content";

export const metadata: Metadata = {
  title: "Thanks for reaching out",
  description: "We've received your request for the team day.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/vibecoding/thanks",
    languages: { en: "/vibecoding/thanks", nl: "/teamuitje/bedankt" },
  },
};

export default function VibecodingThanksPage() {
  return <VibecodingThanks content={en} />;
}
