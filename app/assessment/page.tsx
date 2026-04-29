import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
  alternates: { canonical: "/assessment" },
  title: "Brand Humanizer Self-Assessment | Free Score",
  description: "Discover your Brand Humanizer Score across four critical skills: AI literacy, creativity, human sciences, and emotional intelligence. Free, takes 5 minutes.",
  openGraph: { images: [{ url: "/og/assessment.jpg" }] },
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Brand Humanizer Self-Assessment",
  description: "A 17-question assessment that scores individuals across the four Brand Humanizing skills.",
  provider: {
    "@type": "Organization",
    name: "Brand Humanizing Institute",
    url: "https://brandhumanizing.com",
  },
};

export default function AssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <AssessmentClient />
    </>
  );
}
