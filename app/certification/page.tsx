import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import CertificationWaitlist from "@/components/certification/CertificationWaitlist";
import { Check, ExternalLink, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { FACILITATOR, STATS, TALK_TO_EXPERT } from "@/lib/pricing";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  alternates: { canonical: "/certification" },
  title: "Certification | Brand Humanizing Institute",
  description:
    "Two ways to prove it. Certify your team's AI literacy today via AIGA, or join the waitlist to become a certified Brand Humanizer, the person organisations call to stay human through the AI shift.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const aiLiteracyOutcomes = [
  "EU AI Act Article 4 compliance documentation",
  "Genuine understanding of AI systems and their limits",
  "The four-skill Brand Humanizing framework applied to AI",
  "A clear read on where AI belongs in your role, and where it doesn't",
  "A certificate from AIGA, backed by the Brand Humanizing Institute",
];

const brandHumanizerOutcomes = [
  "A licensed, proven system for leading the human side of the AI shift",
  "The standing to be the person your organisation calls when the stakes are human",
  "A practitioner community and ongoing updates to the method",
  "The right to run Brand Humanizing inside your organisation, or as your own practice",
];

const faqs = [
  { q: "What is AIGA?", a: "AIGA (AI Geletterdheid Academy) is our sister organisation focused on EU AI Act compliance training. It is a collaboration between the Brand Humanizing Institute and Speakers Academy. The AI Literacy Certificate, its exam and its platform live with AIGA." },
  { q: "Does the AI Literacy Certificate meet EU AI Act requirements?", a: "Yes. It is designed to meet Article 4 requirements for AI literacy, and you receive documentation your organisation can use for compliance. Full enforcement of the EU AI Act begins on 2 August 2026, with fines for non-compliance reaching EUR 35 million." },
  { q: "Is the AI Literacy Certificate only about compliance?", a: "No. Compliance is the starting point. The programme builds genuine AI literacy: the ability to think critically about AI, not just tick a regulatory box." },
  { q: "What is the Brand Humanizer Certification?", a: "It is the practitioner certification for the Brand Humanizing method itself. Where a course teaches your team, this certifies a person to lead the work. It opens in [PLACEHOLDER: year]. Join the waitlist to be first in." },
  { q: "Is there a train-the-trainer or licensing option?", a: "That is the next tier, for organisations and practitioners who want to scale Brand Humanizing themselves. It is coming after the Brand Humanizer Certification. Talk to an expert if you want to be part of that conversation early." },
];

export default function CertificationPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Certification" }]} variant="light" />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-4 py-1.5 text-sm font-heading font-semibold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> The deep end of the ladder
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-6">
              A course changes your team. A certification changes{" "}
              <span className="text-accent">who you are in the room.</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Two ways to prove it. Certify your team&apos;s AI literacy today, or become the person organisations call to stay human through the AI shift.
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-12">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-3xl text-primary tabular-nums"><CountUp value={s.value} /></span>
                  <span className="text-muted-foreground text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Literacy Certificate — live (blue / cool: available now) */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-8 md:p-14">
              <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Available now
                    </span>
                    <span className="text-muted-foreground/70 text-xs uppercase tracking-wider">Via AIGA</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">The AI Literacy Certificate</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The EU AI Act requires every organisation using AI to make sure its people are AI-literate. Article 4 sets the bar. Enforcement begins 2 August 2026, and fines reach EUR 35 million.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This gets your team past the deadline and past the fear. It is built on the Brand Humanizing framework and delivered through our sister institute, AIGA. The certificate, exam and platform live there.
                  </p>
                  <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-11 px-7 gap-2">
                      Get AI Literacy certified <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-muted-foreground/70 text-xs mt-4">Opens aigeletterdheid.academy in a new tab. Per-seat and team pricing live there.</p>
                </div>
                <div>
                  <p className="text-foreground font-heading font-semibold mb-4">Your team walks away with:</p>
                  <div className="space-y-3">
                    {aiLiteracyOutcomes.map((o, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Humanizer Certification — waitlist (red / warm: the premium tier) */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-cream border-2 border-accent/30 p-8 md:p-14">
              <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5" /> Opening [PLACEHOLDER: year]
                    </span>
                    <span className="text-muted-foreground/70 text-xs uppercase tracking-wider">Waitlist open</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">The Brand Humanizer Certification</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every organisation is about to need someone who can lead the human side of the AI shift. This certifies you as that person. Not a team that attended, a practitioner who can carry the method into any room.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A licensed, proven system. The credential, and the community behind it, that says you do this for real.
                  </p>
                  <CertificationWaitlist />
                </div>
                <div>
                  <p className="text-foreground font-heading font-semibold mb-4">What certification gives you:</p>
                  <div className="space-y-3">
                    {brandHumanizerOutcomes.map((o, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{o}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground/70 text-xs mt-6 leading-relaxed">
                    A train-the-trainer and licensing tier, for scaling Brand Humanizing yourself, comes after this. Ask us if you want in early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilitator band — white so it does not run into the cream FAQ below */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="rounded-2xl bg-cream border border-border/50 p-8 md:p-12">
              <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-10 items-center">
                <div className="mx-auto md:mx-0 w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img src={FACILITATOR.photo} alt={FACILITATOR.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Certified by the people who built the method.</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">{FACILITATOR.stagesLine}</p>
                  <p className="text-primary font-heading font-semibold">{FACILITATOR.closingLine}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection title="Frequently asked questions" faqs={faqs} variant="light" />

        {/* Final CTA — navy moment */}
        <section className="section-padding bg-navy">
          <div className="container text-center">
            <h2 className="text-display md:text-display-lg text-white max-w-3xl mx-auto leading-[1.08]">
              Certify your team now. Certify yourself next.
            </h2>
            <p className="text-body-lg text-white/70 mt-6 max-w-xl mx-auto">
              Not sure which path fits? Talk it through with us. One 30-minute call, a real human, no script.
            </p>
            <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-10">
              <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-9 h-12 text-base gap-2">
                {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
