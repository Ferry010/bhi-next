import type { Metadata } from "next";
import TermsPage from "@/components/legal/TermsPage";
import { termsNl } from "@/components/legal/termsContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/algemene-voorwaarden",
    languages: { nl: "/algemene-voorwaarden", en: "/terms" },
  },
  title: termsNl.meta.title,
  description: termsNl.meta.description,
  robots: { index: true, follow: true },
};

export default function AlgemeneVoorwaardenPage() {
  return <TermsPage content={termsNl} />;
}
