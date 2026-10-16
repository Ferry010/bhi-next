import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { TALK_TO_EXPERT } from "@/lib/pricing";
import { Check } from "lucide-react";

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
              <CalendlyEmbed
                url={embedUrl}
                fallbackLabel="Open the calendar on Calendly"
                bookedContent={
                  <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] px-7 py-10 md:px-12 md:py-14 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-display text-foreground">
                      Booked. Looking forward to <span className="text-accent">meeting you</span>.
                    </h2>
                    <p className="text-body-lg text-muted-foreground mt-5 max-w-xl mx-auto">
                      A confirmation from Calendly is on its way to your inbox, with the details and a link
                      to move it if something comes up. No need to prepare anything. Bring your situation,
                      we&apos;ll take it from there.
                    </p>
                    <p className="font-handwritten text-3xl text-primary mt-6">Ferry</p>
                    <p className="text-sm text-muted-foreground mt-8">
                      Want a head start before we talk?{" "}
                      <Link href="/book" className="text-primary font-semibold hover:text-accent transition-colors">
                        The book has the whole method
                      </Link>
                      .
                    </p>
                  </div>
                }
              />
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              The calendar is Calendly. It uses its own cookies to make the booking work, and only on this
              page. <Link href="/privacy" className="underline hover:text-foreground">Privacy policy</Link>
            </p>
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
