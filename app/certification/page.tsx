import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CertificationWaitlist from "@/components/certification/CertificationWaitlist";
import { Check, ExternalLink, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { FACILITATOR, STATS, TALK_TO_EXPERT } from "@/lib/pricing";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  alternates: { canonical: "/certification" },
  title: "Certification | Brand Humanizing Institute",
  description:
    "Two ways to prove it. Certify your team's AI literacy today via AIGA, or join the waitlist to become a certified Brand Humanizer, the person organisations call to stay human through the AI shift.",
  openGraph: { images: [{ url: "/og/pricing.jpg" }] },
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
      <Navbar />
      <main className="bg-[#0F1117]">
        {/* Hero */}
        <section className="relative flex items-center justify-center overflow-hidden bg-[#0F1117]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[680px] h-[680px] rounded-full opacity-[0.16] blur-[130px]" style={{ background: "#5AA6B2", top: "-8%", left: "6%" }} />
            <div className="absolute w-[560px] h-[560px] rounded-full opacity-[0.11] blur-[110px]" style={{ background: "#C9A96E", bottom: "-4%", right: "4%" }} />
          </div>
          <div className="container text-center relative z-10 py-28 md:py-40 pt-40 md:pt-52">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5AA6B2]/30 bg-[#5AA6B2]/5 px-4 py-1.5 text-sm text-[#5AA6B2] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5AA6B2]" /> The deep end of the ladder
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-[1.05]">
              A course changes your team. A certification changes{" "}
              <span className="bg-gradient-to-r from-[#5AA6B2] to-[#C9A96E] bg-clip-text text-transparent">who you are in the room.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#E8E2D6]/70 mt-8 max-w-2xl mx-auto leading-relaxed">
              Two ways to prove it. Certify your team&apos;s AI literacy today, or become the person organisations call to stay human through the AI shift.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-14">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-3xl text-[#C9A96E] tabular-nums"><CountUp value={s.value} /></span>
                  <span className="text-[#E8E2D6]/50 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Literacy Certificate — live */}
        <section className="bg-[#12141C] py-24 md:py-32">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-[#1A1B23] border border-[rgba(90,166,178,0.2)] p-8 md:p-14">
              <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#5AA6B2]/15 text-[#5AA6B2] px-3 py-1 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Available now
                    </span>
                    <span className="text-[#E8E2D6]/40 text-xs uppercase tracking-wider">Via AIGA</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">The AI Literacy Certificate</h2>
                  <p className="text-[#E8E2D6]/75 leading-relaxed mb-4">
                    The EU AI Act requires every organisation using AI to make sure its people are AI-literate. Article 4 sets the bar. Enforcement begins 2 August 2026, and fines reach EUR 35 million.
                  </p>
                  <p className="text-[#E8E2D6]/75 leading-relaxed mb-6">
                    This gets your team past the deadline and past the fear. It is built on the Brand Humanizing framework and delivered through our sister institute, AIGA. The certificate, exam and platform live there.
                  </p>
                  <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-[#C9A96E] text-[#0F1117] font-semibold text-sm py-3 px-7 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(201,169,110,0.3)]">
                      Get AI Literacy certified <ExternalLink className="w-4 h-4" />
                    </span>
                  </a>
                  <p className="text-[#E8E2D6]/40 text-xs mt-4">Opens aigeletterdheid.academy in a new tab. Per-seat and team pricing live there.</p>
                </div>
                <div>
                  <p className="text-white font-heading font-semibold mb-4">Your team walks away with:</p>
                  <div className="space-y-3">
                    {aiLiteracyOutcomes.map((o, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-[#5AA6B2] mt-0.5 shrink-0" />
                        <span className="text-[#E8E2D6]/80 text-sm leading-relaxed">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Humanizer Certification — waitlist */}
        <section className="bg-[#0F1117] pb-24 md:pb-32">
          <div className="container max-w-5xl">
            <div className="rounded-3xl bg-gradient-to-br from-[#1A1B23] to-[#171821] border border-[rgba(201,169,110,0.25)] p-8 md:p-14">
              <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] px-3 py-1 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5" /> Opening [PLACEHOLDER: year]
                    </span>
                    <span className="text-[#E8E2D6]/40 text-xs uppercase tracking-wider">Waitlist open</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">The Brand Humanizer Certification</h2>
                  <p className="text-[#E8E2D6]/75 leading-relaxed mb-4">
                    Every organisation is about to need someone who can lead the human side of the AI shift. This certifies you as that person. Not a team that attended, a practitioner who can carry the method into any room.
                  </p>
                  <p className="text-[#E8E2D6]/75 leading-relaxed mb-6">
                    A licensed, proven system. The credential, and the community behind it, that says you do this for real.
                  </p>
                  <CertificationWaitlist />
                </div>
                <div>
                  <p className="text-white font-heading font-semibold mb-4">What certification gives you:</p>
                  <div className="space-y-3">
                    {brandHumanizerOutcomes.map((o, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-[#C9A96E] mt-0.5 shrink-0" />
                        <span className="text-[#E8E2D6]/80 text-sm leading-relaxed">{o}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#E8E2D6]/40 text-xs mt-6 leading-relaxed">
                    A train-the-trainer and licensing tier, for scaling Brand Humanizing yourself, comes after this. Ask us if you want in early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilitator band */}
        <section className="bg-[#0F1117] pb-24 md:pb-32">
          <div className="container max-w-5xl">
            <div className="rounded-2xl bg-[#1A1B23] border border-[rgba(90,166,178,0.15)] p-8 md:p-12">
              <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-10 items-center">
                <div className="mx-auto md:mx-0 w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img src={FACILITATOR.photo} alt={FACILITATOR.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">Certified by the people who built the method.</h2>
                  <p className="text-[#E8E2D6]/75 leading-relaxed mb-3">{FACILITATOR.stagesLine}</p>
                  <p className="text-[#C9A96E] font-heading font-semibold">{FACILITATOR.closingLine}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="bg-[#0F1117]">
          <FAQSection title="Frequently asked questions" faqs={faqs} variant="dark" />
        </div>

        {/* Final CTA */}
        <section className="bg-[#0F1117] py-24 md:py-32">
          <div className="container text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-[1.08]">
              Certify your team now. Certify yourself next.
            </h2>
            <p className="text-lg text-[#E8E2D6]/60 mt-6 max-w-xl mx-auto">
              Not sure which path fits? Talk it through with us. One 30-minute call, a real human, no script.
            </p>
            <a
              href={TALK_TO_EXPERT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-[#C9A96E] text-[#0F1117] font-semibold py-3.5 px-9 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,169,110,0.35)]"
            >
              {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
