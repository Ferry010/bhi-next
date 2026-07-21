import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import { TALK_TO_EXPERT } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/work-with-us" },
  title: "Work With Us | Start With a Brainstorm",
  description:
    "You don't need a six-month programme to work with us. You need half a day. Start with a brainstorm, then go as deep as it makes sense. The Brand Humanizing way of working.",
  openGraph: { images: [{ url: "/og/work-with-us.jpg" }] },
};

const brainstormOutcomes = [
  "A clear read on where technology is serving your people, and where it's quietly turning you into a commodity",
  "The two or three human opportunities with the biggest upside, specific to your organisation",
  "A shared language your leadership can use the very next morning",
  "An honest answer to \"is there something bigger here?\" — with no obligation to say yes",
];

const deeperEngagements = [
  {
    title: "The Audit",
    body: "When the brainstorm surfaces something big, we go and get the data. We interview your people and map where human talent is wasted and where automation is missing the judgement it needs.",
    to: "/work-with-us/audit-and-brainstorm",
  },
  {
    title: "The Roadmap",
    body: "We turn the findings into decisions, not a document. A working session with your leadership that produces a 12–36 month plan your team actually owns.",
    to: "/work-with-us/brand-humanizing-roadmap",
  },
  {
    title: "Implementation",
    body: "Embedded work alongside your teams, redesigning the workflows and building the skills. We're in the room, not behind a glass wall of slides.",
    to: "/work-with-us/organisation-wide-implementation",
  },
  {
    title: "The Handover",
    body: "We develop your internal Brand Humanizers so the method lives inside your organisation permanently. The goal was never to make you dependent on us.",
    to: "/work-with-us/handover",
  },
];

const faqs = [
  { q: "Do we have to commit to the whole thing?", a: "No. That's the point of starting with a brainstorm. Half a day, low commitment. If there's something bigger worth doing, we'll both see it. If there isn't, you still leave with real clarity." },
  { q: "What actually happens in the brainstorm?", a: "A working session, usually half a day. Your team brings the reality of your organisation, we bring the framework and the patterns we've seen across 50+ organisations. Together we find where your human edge is hiding." },
  { q: "How is this different from a consultancy?", a: "Consultancies analyse, present, hand over a deck, and leave. We work alongside your team and build the capability inside your organisation, so it keeps running after we're gone." },
  { q: "What size organisations do you work with?", a: "We've worked with teams of 8 and companies of 10,000+. The brainstorm is the same either way. What comes after is scoped to you." },
  { q: "How do we start?", a: "Talk to an expert. One 30-minute call to see if a brainstorm makes sense for your team, and to book it if it does." },
];

export default function WorkWithUsPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-4xl pt-28 md:pt-40 pb-16 md:pb-24 relative z-10">
            <Breadcrumb items={[{ label: "Work With Us" }]} variant="light" />
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              It starts with a <span className="text-accent">brainstorm.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              You don&apos;t need to commit to a six-month programme to work with us. You need half a day. Your team, our team, your real challenges on the table. You leave knowing exactly where technology should serve your people, and where it&apos;s quietly costing you. Everything after that is optional, and follows from there.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#deeper">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base gap-2">
                  See how we go deeper <ArrowDown className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* The Brainstorm */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Half a day that changes the conversation.</h2>
              <p className="text-body-lg text-white/70 leading-relaxed mb-4">
                No slides handed over from the outside. No generic advice. We sit down with your team, put the framework next to your reality, and work through where your people should be winning and where the technology is getting in the way.
              </p>
              <p className="text-body-lg text-white/70 leading-relaxed mb-10">
                It&apos;s the lowest-risk way to find out whether there&apos;s something bigger worth doing, before anyone signs up for anything.
              </p>
              <p className="text-white font-heading font-semibold mb-5">You walk out with:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {brainstormOutcomes.map((o, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-3 items-start">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-white/85 text-sm leading-relaxed">{o}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Where it can go from here */}
        <section id="deeper" className="section-padding bg-cream">
          <div className="container max-w-4xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground text-center mb-3">Where it can go from here.</h2>
              <p className="text-body-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Only if the brainstorm says so. These aren&apos;t steps you have to climb. They&apos;re how we go deeper when there&apos;s something worth building.
              </p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-4">
              {deeperEngagements.map((item) => (
                <ScrollRevealSection key={item.title}>
                  <Link href={item.to} className="group block bg-white rounded-2xl p-6 md:p-7 shadow-[0_4px_24px_rgba(18,21,46,0.08)] hover:shadow-lg hover:border-accent/30 border border-border/50 transition-all duration-300 h-full">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.body}</p>
                    <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />

        {/* Final CTA */}
        <section className="section-padding bg-navy relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-3xl text-center relative z-10">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Start with a brainstorm.</h2>
              <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">One 30-minute call to see if it&apos;s a fit, and to book it if it is.</p>
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
