import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { Check, BookOpen, ArrowRight } from "lucide-react";
import { PRODUCTS, FACILITATOR, STATS, MARQUEE_LOGOS } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Training Programs & Pricing | Brand Humanizing Institute",
  description:
    "Three ways to give your team the human edge in the AI era: a keynote, a full-day course, or a multi-day leadership programme. From €3,500. Every one includes the book.",
  openGraph: { images: [{ url: "/og/pricing.jpg" }] },
};

const tiers = [
  {
    product: PRODUCTS.inspiration,
    subtitle: "The spark that gets everyone moving",
    includes: [
      "A keynote shaped around your organisation",
      "15 to 500+ people in the room",
      "An honest first read of where you stand",
      "Concrete first moves for Monday morning",
    ],
    popular: false,
  },
  {
    product: PRODUCTS.fullDay,
    subtitle: "Curious team in, capable team out",
    includes: [
      "The complete four-skill framework, applied to you",
      "A mapped read of your Human-Technology Fit",
      "The human opportunities your competitors miss",
      "A 90-day implementation plan you can run Monday",
    ],
    popular: true,
  },
  {
    product: PRODUCTS.multiDay,
    subtitle: "For the people who set direction",
    includes: [
      "Both founders, across 2 to 3 days",
      "Full leadership alignment on the framework",
      "Internal champions equipped to carry it on",
      "A 12 to 36 month strategic roadmap",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "Why is the pricing 'from' a number instead of fixed?",
    a: "Every engagement is scoped to your group size, format, location and objectives. We give you an exact proposal after a 30-minute intake, so you pay for what you actually need, never a generic package.",
  },
  {
    q: "What's included in every format?",
    a: "A copy of Brand Humanizing, the book, for every participant. A session shaped around your organisation in intake, not off a shelf. And a founder delivering it in person, not a junior trainer.",
  },
  {
    q: "Who is this for?",
    a: "Innovation leaders, C-suite, team leads, and HR who want their organisation ahead of the AI curve instead of chasing it. We've delivered to teams of 8 and audiences of 500+.",
  },
  {
    q: "Where does the training take place?",
    a: "In-company at your location anywhere in Europe, at our Rotterdam office, or at an off-site venue. Remote and hybrid formats are available too.",
  },
  {
    q: "Can we customise the programme?",
    a: "Every programme is tailored to your industry, your challenges and your ambitions. That's the point of the intake conversation.",
  },
  {
    q: "What about AI literacy and EU AI Act compliance?",
    a: "For structured AI literacy and EU AI Act Article 4 compliance, that runs through our sister organisation AIGA at aigeletterdheid.academy.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0F1117]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]" style={{ background: "#5AA6B2", top: "10%", left: "15%" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px]" style={{ background: "#C9A96E", bottom: "5%", right: "10%" }} />
        </div>
        <div className="container text-center relative z-10 py-32 md:py-40 pt-44 md:pt-52">
          <h1 className="font-heading text-hero md:text-hero-lg text-white max-w-3xl mx-auto">
            Buy your team the edge everyone else is racing toward.
          </h1>
          <p className="text-body-lg text-[#E8E2D6]/70 mt-6 max-w-2xl mx-auto leading-relaxed">
            Three ways in. A keynote that wakes the room up, a full day that builds the skill, or a multi-day programme that changes how your leadership decides. Every one ends with a real human, not a checkout.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-12">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-3xl text-[#C9A96E] tabular-nums">{s.value}</span>
                <span className="text-[#E8E2D6]/50 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map(({ product, subtitle, includes, popular }) => (
              <div
                key={product.slug}
                className={`relative flex flex-col h-full rounded-xl p-8 lg:p-10 border transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(90,166,178,0.12)] ${
                  popular ? "border-[#C9A96E]/50 bg-[#1A1B23] md:-mt-4 md:mb-4" : "border-[rgba(90,166,178,0.15)] bg-[#1A1B23]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-8 bg-[#C9A96E] text-[#0F1117] text-xs font-semibold tracking-wide uppercase px-4 py-1 rounded-md">
                    Most chosen
                  </span>
                )}
                <h3 className="font-heading text-xl md:text-2xl text-white">{product.name}</h3>
                <p className="text-[#E8E2D6]/50 text-sm mt-1">{subtitle}</p>
                <p className="text-[#5AA6B2] text-xs uppercase tracking-[0.14em] font-medium mt-5">{product.duration} · {product.audience}</p>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-[#E8E2D6]/50 text-sm">from</span>
                  <span className="text-white text-4xl md:text-[2.75rem] font-heading font-bold tabular-nums tracking-tight">{product.priceFrom}</span>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {includes.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#E8E2D6]/75 leading-relaxed">
                      <Check className="w-4 h-4 text-[#5AA6B2] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10 text-[#E8E2D6]/60 text-sm">
                  <BookOpen className="w-4 h-4 text-[#C9A96E]" />
                  The book, for every participant
                </div>
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="mt-6 block text-center bg-[#C9A96E] text-[#0F1117] font-semibold text-sm py-3 px-6 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(90,166,178,0.25)]"
                >
                  Book {product.name.replace("The ", "")}
                </Link>
                <Link href={product.href} className="mt-3 block text-center text-[#5AA6B2] text-sm hover:text-[#C9A96E] transition-colors">
                  See what a day looks like →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[#E8E2D6]/35 text-xs mt-10">
            All prices exclude VAT and travel outside Rotterdam. Final proposal after a 30-minute intake.
          </p>
        </div>
      </section>

      {/* Facilitator authority band */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <div className="rounded-xl bg-[#1A1B23] border border-[rgba(90,166,178,0.15)] p-8 md:p-12">
            <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-10 items-center">
              <div className="mx-auto md:mx-0 w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src={FACILITATOR.photo} alt={FACILITATOR.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">You're not booking a trainer. You're booking the person who wrote the book.</h2>
                <p className="text-[#E8E2D6]/75 leading-relaxed mb-3">{FACILITATOR.stagesLine}</p>
                <p className="text-[#E8E2D6]/55 text-sm leading-relaxed mb-3">{FACILITATOR.acknowledgementLine}</p>
                <p className="text-[#C9A96E] font-heading font-semibold">{FACILITATOR.closingLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <p className="text-center text-[#E8E2D6]/40 text-xs uppercase tracking-[0.2em] mb-10">Trusted by the teams inside</p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-10 items-center">
            {MARQUEE_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <img src={logo.src} alt={logo.alt} loading="lazy" className="h-8 md:h-10 w-auto brightness-0 invert opacity-40 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond training band */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <div className="rounded-xl bg-[#1E1F28] border border-[rgba(90,166,178,0.15)] p-10 md:p-16 text-center">
            <h2 className="font-heading text-display md:text-display-lg text-white">Ready to embed it organisation-wide?</h2>
            <p className="text-body-lg text-[#E8E2D6]/65 mt-5 max-w-2xl mx-auto leading-relaxed">
              Training wakes people up and builds the skill. When you want Brand Humanizing built into how your whole organisation actually works, that's a project. We scope it with you from audit to handover, until it runs without us.
            </p>
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 mt-8 bg-transparent border border-[#C9A96E] text-[#C9A96E] font-semibold text-sm py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-[#C9A96E] hover:text-[#0F1117]"
            >
              See how we work together <ArrowRight className="w-4 h-4" />
            </Link>
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
          <h2 className="font-heading text-display md:text-display-lg lg:text-hero text-white max-w-3xl mx-auto">
            Every quarter you wait, you look a little more like everyone else.
          </h2>
          <p className="text-body-lg text-[#E8E2D6]/60 mt-5 max-w-xl mx-auto">
            Tell us your team and your moment. We'll come back with the right format and an exact proposal. One message and you're on our radar.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-10 bg-[#C9A96E] text-[#0F1117] font-semibold py-3 px-8 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(90,166,178,0.25)]"
          >
            Start the conversation
          </Link>
          <p className="text-[#E8E2D6]/35 text-xs mt-6">A real human replies, usually within 24 hours.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
