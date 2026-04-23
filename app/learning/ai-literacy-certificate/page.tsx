import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Check, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Literacy Certificate | EU AI Act Compliant | Via AIGA",
  description:
    "EU AI Act Article 4 compliant AI literacy training. Delivered via AIGA, the sister institute of Brand Humanizing. Available now.",
};

const faqs = [
  { q: "Does this meet EU AI Act requirements?", a: "Yes. The programme is designed to meet Article 4 requirements for AI literacy. You receive documentation your organization can use for compliance purposes." },
  { q: "What is AIGA?", a: "AIGA (AI Geletterdheid Academy) is our sister organisation focused specifically on EU AI Act compliance training. It is a collaboration between the Brand Humanizing Institute and Speakers Academy." },
  { q: "Why is this only available in Dutch right now?", a: "The EU AI Act compliance requirements are being enforced first in the Netherlands. The Dutch training was developed in partnership with Speakers Academy. We are building an English version based on demand." },
  { q: "Can we buy this for our entire organisation?", a: "Yes. The training is available per seat, with bulk pricing for larger teams. Visit aigeletterdheid.academy for current pricing." },
  { q: "When is the compliance deadline?", a: "Full enforcement of the EU AI Act begins on 2 August 2026. Organisations without certified staff risk fines of up to EUR 35 million." },
  { q: "Is this just about compliance?", a: "No. Compliance is the starting point. The programme builds genuine AI literacy: the ability to think critically about AI, not just check a regulatory box." },
];

const outcomes = [
  "EU AI Act Article 4 compliance documentation",
  "Genuine understanding of AI systems and their limitations",
  "The four-skill Brand Humanizing framework applied to AI",
  "Ability to identify where AI belongs — and where it doesn't — in your role",
  "Certificate of completion from AIGA / Brand Humanizing Institute",
];

export default function AILiteracyCertificatePage() {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-4xl relative z-10">
            <Breadcrumb items={[{ label: "Learning", to: "/learning" }, { label: "AI Literacy Certificate" }]} variant="light" />
            <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest mb-4">Via AIGA</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
              AI Literacy Certificate
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              EU AI Act Article 4 compliant training. Built on the Brand Humanizing foundation. Available now in Dutch, English coming soon.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <ShieldCheck className="w-4 h-4 text-accent" /> EU AI Act Article 4 compliant
              </span>
              <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                3–4 hours · Individual or team
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Visit AIGA <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/contact?product=ai-literacy-certificate">
                <Button variant="outline" className="rounded-lg font-heading font-semibold px-8 h-12 text-base">
                  Ask us a question
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-navy section-padding">
          <div className="container max-w-3xl">
            <p className="text-lg text-white/80 leading-relaxed">
              The EU AI Act requires every organisation using AI to ensure their people have adequate AI literacy. Article 4 sets the standard. The enforcement deadline is 2 August 2026. Fines for non-compliance can reach EUR 35 million.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mt-4">
              We built this programme so your team genuinely understands AI — not just for compliance, but to think clearly about where it helps and where it doesn't. It&apos;s grounded in the Brand Humanizing four-skill framework and delivered via our sister institute AIGA.
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground text-center">What your team walks away with</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((item, i) => (
                <div key={i} className="bg-navy rounded-2xl p-6 flex gap-4 items-start shadow-lg border border-accent/10">
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <div className="bg-navy-card rounded-3xl p-8 md:p-12 shadow-xl border border-accent/10 text-center">
              <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6 text-white">Investment</h2>
              <p className="text-xl md:text-2xl text-accent font-heading font-semibold mb-2">Per seat pricing — see aigeletterdheid.academy</p>
              <p className="text-white/60 text-sm mt-4">Bulk pricing available for teams. Dutch version available now. English coming soon.</p>
              <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Visit AIGA <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />

        <Footer />
      </main>
    </div>
  );
}
