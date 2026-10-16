import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { TALK_TO_EXPERT } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Talk to an expert",
  description: "Pick a time for a short call with Ferry. No pitch deck, just your situation and what would actually help.",
  alternates: { canonical: "/talk-to-an-expert" },
};

// Brand colours passed to Calendly (hex without #) so the scheduler matches the site.
const embedUrl = `${TALK_TO_EXPERT.calendly}?primary_color=df302a&text_color=1c1c1c&background_color=ffffff`;

export default function TalkToAnExpertPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container max-w-4xl">
            <div className="max-w-2xl">
              <h1 className="text-hero md:text-hero-lg text-foreground">
                Let&apos;s <span className="text-accent">talk</span>.
              </h1>
              <p className="text-body-lg text-muted-foreground mt-5">
                Pick a time for a short call with Ferry. No pitch deck, just your situation and what would actually help.
              </p>
            </div>

            <div className="mt-8 -mx-4 md:mx-0">
              <CalendlyEmbed url={embedUrl} fallbackLabel="Open the calendar on Calendly" />
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Rather write it down?{" "}
              <Link href="/contact" className="text-primary font-semibold hover:text-accent transition-colors">
                Send us a message
              </Link>
              . A real human reads it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
