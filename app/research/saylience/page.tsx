import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Quote } from "lucide-react";

const SAYLIENCE_URL = "https://www.saylience.app";

export const metadata: Metadata = {
  alternates: { canonical: "/research/saylience" },
  title: "Saylience: the method, applied to our own work | Brand Humanizing Institute",
  description:
    "Brand Humanizing is a claim: let technology take the predictable work, and people are freed into the work only people can do. Saylience is that claim tested on our own interview practice, now a product used in two countries.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

// What technology took, and what stayed human. The two columns are the whole
// argument of the page: Human-Technology Fit made concrete.
const machineWork = [
  "Transcribing the recording, with speaker labels",
  "Timestamping every line back to the audio",
  "Pulling the quotes that carry signal",
  "Building the pivot tables and the filtered exports",
];

const humanWork = [
  "Asking the follow-up that was not on the list",
  "Reading the pause, and knowing to wait",
  "Judging which answer actually matters",
  "Sitting in the room long enough to earn the real answer",
];

export default function SaylienceInPracticePage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Research", to: "/research" }, { label: "Saylience" }]} variant="light" />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-4 py-1.5 text-sm font-heading font-semibold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> The method, in practice
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-6">
              We stopped transcribing. We started{" "}
              <span className="text-accent">interviewing better.</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Brand Humanizing is a claim: let technology take the work that is predictable, and
              people are freed into the work only people can do. It is easy to say from a stage.
              Harder to prove. So we tested it on our own practice, and it turned into a product now
              used in two countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
              <a href={SAYLIENCE_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto gap-2">
                  See Saylience <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <a href="#story">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  How it happened →
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* The story */}
        <section id="story" className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground">How it happened</h2>
              <div className="mt-8 space-y-5 text-body-lg text-muted-foreground leading-relaxed">
                <p>
                  One of us interviews for a living. Research interviews, category reviews, expert
                  conversations. The kind of work where the value is in the room, in the follow-up
                  question nobody scripted, in the answer that only comes because you waited for it.
                </p>
                <p>
                  And then, every time, the same tax. Hours lost to scrubbing the recording, typing
                  it out, hunting for the quote, pasting it into a document with the timestamp. Work
                  that was entirely predictable, and entirely joyless, standing between the
                  conversation and the report.
                </p>
                <p>
                  So we built a tool to take that part. Upload the audio, and it transcribes,
                  timestamps, and pulls the sourced quotes, each one pointing back to the exact words
                  spoken. The predictable work went to the machine.
                </p>
                <p className="text-foreground font-heading font-semibold">
                  The time it gave back did not go into doing more interviews faster. It went into
                  doing them better. Longer conversations. Better follow-ups. The human half of the
                  work, done with room to breathe.
                </p>
                <p>
                  Other researchers saw it and wanted it. It has a name now, Saylience, and it is a
                  product used by teams in two countries. It started as one person refusing to keep
                  paying a tax on their own attention.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Where the human/machine line falls — the two columns */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-14">
                <h2 className="text-display md:text-display-lg text-foreground">Where technology stops and people begin</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  The base of the Brand Humanizing pyramid is Human-Technology Fit: a clear, honest
                  line between the work technology does better and the work that should stay human.
                  Saylience is that line, drawn.
                </p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollRevealSection>
                <div className="bg-white rounded-2xl p-7 md:p-8 h-full border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                  <p className="text-xs font-heading font-semibold uppercase tracking-wider text-primary mb-4">
                    What the machine took
                  </p>
                  <ul className="space-y-3">
                    {machineWork.map((w) => (
                      <li key={w} className="text-sm text-muted-foreground leading-relaxed">{w}</li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealSection>
              <ScrollRevealSection>
                <div className="bg-white rounded-2xl p-7 md:p-8 h-full border-2 border-accent/30">
                  <p className="text-xs font-heading font-semibold uppercase tracking-wider text-accent mb-4">
                    What stayed human
                  </p>
                  <ul className="space-y-3">
                    {humanWork.map((w) => (
                      <li key={w} className="text-sm text-foreground leading-relaxed">{w}</li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        {/* Impact Gap tie-in */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <div className="rounded-2xl bg-navy p-8 md:p-12">
                <Quote className="w-8 h-8 text-white/40" />
                <p className="mt-4 font-heading text-xl md:text-2xl leading-snug text-white">
                  We built a free test that asks leaders to name one thing their team can do now that
                  it could not do eighteen months ago. Most cannot answer it.
                </p>
                <p className="mt-4 text-body-lg text-white/70">
                  Saylience is our own answer. We would rather show the method working than describe
                  it, including on ourselves.
                </p>
                <Link href="/impact-gap" className="inline-block mt-6">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-7 h-11 gap-2">
                    Take the Impact Gap test <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Route out to the product */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground">
                Saylience has its own home.
              </h2>
              <p className="text-body-lg text-muted-foreground mt-5 max-w-2xl mx-auto">
                If you interview for a living, it will save you the hours you lose to transcribing
                and hand them back to the work that matters. It runs on European servers, never
                trains anyone else&apos;s model on your data, and sources every quote back to the
                exact words spoken. See it run on one of your own interviews.
              </p>
              <a href={SAYLIENCE_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-9 h-12 text-base gap-2">
                  Visit saylience.app <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <p className="text-muted-foreground/70 text-sm mt-6">
                A Brand Humanizing Institute product. Built to show the method, not just teach it.
              </p>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
