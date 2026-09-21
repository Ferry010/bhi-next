import type { Metadata } from "next";
import TermsPage from "@/components/legal/TermsPage";
import { termsEn } from "@/components/legal/termsContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/terms",
    languages: { nl: "/algemene-voorwaarden", en: "/terms" },
  },
  title: termsEn.meta.title,
  description: termsEn.meta.description,
  robots: { index: true, follow: true },
};

export default function TermsEnPage() {
  return <TermsPage content={termsEn} />;
}
