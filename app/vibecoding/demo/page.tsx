import type { Metadata } from "next";
import VibecodingDemo from "@/components/vibecoding/VibecodingDemo";
import { demoEn } from "@/components/vibecoding/demoContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/vibecoding/demo",
    languages: { en: "/vibecoding/demo", nl: "/teamuitje/demo" },
  },
  title: demoEn.meta.title,
  description: demoEn.meta.description,
  openGraph: { type: "website" },
};

export default function VibecodingDemoPage() {
  return <VibecodingDemo content={demoEn} />;
}
