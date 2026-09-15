import type { Metadata } from "next";
import VibecodingDemo from "@/components/vibecoding/VibecodingDemo";
import { demoNl } from "@/components/vibecoding/demoContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/teamuitje/demo",
    languages: { en: "/vibecoding/demo", nl: "/teamuitje/demo" },
  },
  title: demoNl.meta.title,
  description: demoNl.meta.description,
  openGraph: { type: "website" },
};

export default function TeamuitjeDemoPage() {
  return <VibecodingDemo content={demoNl} />;
}
