import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Sparkles, Layers, GraduationCap, Users2, ArrowRight, ExternalLink } from "lucide-react";
import { TALK_TO_EXPERT, SPEAKERS_ACADEMY } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/learning" },
  title: "Live Training | Brand Humanizing Institute",
  description:
    "Four ways to train your team in the Brand Humanizing way, from a one-hour spark to a two-day leadership programme. Pick how deep you want to go.",
  openGraph: { images: [{ url: "/og/learning.jpg" }] },
};

const formats = [
  {
    icon: Sparkles,
    name: "The Spark Session",
    duration: "1 hour",
    who: "Whole team or event audience",
    theme: "Brand Humanizing in 60 Minutes",
    outcome: "A wake-up and a shared language. A shift you feel in the room the next morning.",
    to: "/learning/inspiration-session",
  },
  {
    icon: Layers,
    name: "The Half-Day Deep Dive",
    duration: "3–4 hours",
    who: "One team, one theme",
    theme: "AI Ethics & The Human Edge",
    outcome: "Your team takes one theme hands-on and leaves able to apply it, not just discuss it.",
    to: "/learning/half-day-deep-dive",
  },
  {
    icon: GraduationCap,
    name: "The Full-Day Course",
    duration: "6–7 hours",
    who: "A team, the full method",
    theme: "The complete method, applied to your work",
    outcome: "The team leaves working differently, with a 90-day plan they can run on Monday.",
    to: "/learning/full-day-course",
  },
  {
    icon: Users2,
    name: "The Multi-Day Leadership Programme",
    duration: "2 days",
    who: "Leadership",
    theme: "Staying Human in a Digital World",
    outcome: "Deep, leadership-level transformation that outlives the room.",
    to: "/learning/multi-day-programme",
  },
];

const faqs = [
  { q: "Can sessions be delivered online or hybrid?", a: "Yes. Both formats work well. We discuss what's best for your situation during intake." },
  { q: "How much advance notice do you need?", a: "For a Spark Session or Deep Dive: 3–6 weeks. For the Multi-Day Programme: 4–8 weeks." },
  { q: "Can sessions be delivered in English?", a: "Yes. Both Ferry and Jonathan deliver in Dutch and English with equal fluency." },
  { q: "Do participants get the book?", a: "Yes. Every participant in our in-person sessions receives a copy of Brand Humanizing, the book." },
  { q: "What is the intake process?", a: "A short conversation to understand your organisation. No questionnaires. A real conversation that shapes the session." },
  { q: "Can you come to us?", a: "Yes. We deliver in-house anywhere in Europe, and can host in Rotterdam. Remote delivery is also available." },
];

export default function LearningPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Learning" }]} variant="light" />
            <h1 className="text-hero md:text-hero-lg text-foreground">
              Your competitors are already rethinking their people strategy.{" "}
              <span className="text-accent">Are you?</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Four ways to train your team in the Brand Humanizing way. Pick how deep you want to go. They walk out changed, with a shared language and something to do on Monday.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
              <a href="#formats">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  See the training formats →
                </Button>
              </a>
              <Link href="/assessment">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  Not sure? Take the assessment →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="formats" className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3 text-center">Pick how deep you want to go.</h2>
              <p className="text-body-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Same method, four depths. Each format carries a theme, and every one includes the book.</p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-6">
              {formats.map((f) => (
                <ScrollRevealSection key={f.name}>
                  <Link href={f.to} className="group block bg-white rounded-2xl p-7 md:p-8 h-full shadow-[0_4px_24px_rgba(18,21,46,0.08)] border border-border/50 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">{f.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs font-heading font-semibold text-muted-foreground bg-cream rounded-full px-3 py-1">{f.duration}</span>
                      <span className="text-xs font-heading font-semibold text-muted-foreground bg-cream rounded-full px-3 py-1">{f.who}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1"><span className="font-heading font-semibold text-foreground">Theme:</span> {f.theme}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5"><span className="font-heading font-semibold text-foreground">You get:</span> {f.outcome}</p>
                    <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      See the format <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </ScrollRevealSection>
              ))}
            </div>

            <ScrollRevealSection>
              <p className="text-center text-sm text-muted-foreground mt-10">
                Booking Ferry for a keynote specifically?{" "}
                <a href={SPEAKERS_ACADEMY.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-primary hover:text-accent transition-colors inline-flex items-center gap-1">
                  That goes through Speakers Academy <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </p>
            </ScrollRevealSection>

            <ScrollRevealSection>
              <div className="mt-10 rounded-2xl border border-border/60 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">Need EU AI Act literacy training?</h3>
                  <p className="text-sm text-muted-foreground">That runs through AIGA, our sister academy for AI literacy and Article 4 compliance.</p>
                </div>
                <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2">
                    Visit AIGA <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Not sure where to start?</h2>
              <p className="text-body-lg text-white/70 mb-8">
                Most teams start with the Spark Session. It&apos;s the fastest way to get everyone on the same page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning/inspiration-session">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Start with the Spark Session <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base">
                    {TALK_TO_EXPERT.label}
                  </Button>
                </a>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />
      </main>
      <Footer />
    </>
  );
}
