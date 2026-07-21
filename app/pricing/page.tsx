import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { Check, BookOpen, ArrowRight } from "lucide-react";
import { PRODUCTS, FACILITATOR, STATS, MARQUEE_LOGOS, EXAMPLES } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Train Your Team | Brand Humanizing Institute",
  description:
    "Three ways to give your team the human edge in the AI era: a keynote, a full-day course, or a multi-day leadership programme. Every one includes the book. Trusted by teams at Unilever, VodafoneZiggo, GSK and more.",
  openGraph: { images: [{ url: "/og/pricing.jpg" }] },
};

const tiers = [
  {
    product: PRODUCTS.inspiration,
    subtitle: "The spark that gets everyone moving",
    includes: [
      "A keynote shaped around your organisation",
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
      "A 12 to 36 month strategic roadmap",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "What does it cost?",
    a: "It depends on the format, your group size, and where you are. Rather than sell you a generic package, we scope every engagement in a 30-minute intake and come back with an exact proposal. Most teams start with an Inspiration Session and grow from there.",
  },
  {
    q: "What's included in every format?",
    a: "A copy of Brand Humanizing, the book, for every participant. A session shaped around your organisation in intake, not off a shelf. And a founder delivering it in person, never a junior trainer.",
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
      <section className="relative flex items-center justify-center overflow-hidden bg-[#0F1117]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[680px] h-[680px] rounded-full opacity-[0.16] blur-[130px]" style={{ background: "#5AA6B2", top: "-8%", left: "6%" }} />
          <div className="absolute w-[560px] h-[560px] rounded-full opacity-[0.11] blur-[110px]" style={{ background: "#C9A96E", bottom: "-4%", right: "4%" }} />
          <div className="absolute w-[420px] h-[420px] rounded-full opacity-[0.08] blur-[120px]" style={{ background: "#5AA6B2", top: "30%", right: "30%" }} />
        </div>
        <div className="container text-center relative z-10 py-28 md:py-40 pt-40 md:pt-52">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5AA6B2]/30 bg-[#5AA6B2]/5 px-4 py-1.5 text-sm text-[#5AA6B2] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5AA6B2]" /> For teams that can&apos;t afford to fall behind
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-[1.05]">
            Everyone&apos;s team is learning AI. Yours should learn{" "}
            <span className="bg-gradient-to-r from-[#5AA6B2] to-[#C9A96E] bg-clip-text text-transparent">what AI can&apos;t do.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#E8E2D6]/70 mt-8 max-w-2xl mx-auto leading-relaxed">
            Three ways to give your people the human edge that keeps customers choosing you. A keynote, a day, or a programme. None of them come off a shelf.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link href="/contact" className="rounded-lg bg-[#C9A96E] text-[#0F1117] font-semibold text-base py-3.5 px-8 transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,169,110,0.35)]">
              Get a proposal
            </Link>
            <a href="#formats" className="rounded-lg border border-white/20 text-white font-semibold text-base py-3.5 px-8 transition-colors duration-300 hover:bg-white/5">
              See the three formats
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-[#E8E2D6]/50">
            <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#5AA6B2]" /> A founder in the room</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#5AA6B2]" /> The book for everyone</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#5AA6B2]" /> Shaped around your team</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-14">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-3xl text-[#C9A96E] tabular-nums">{s.value}</span>
                <span className="text-[#E8E2D6]/50 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Necessity framing */}
      <section className="bg-[#12141C] py-24 md:py-32">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
            Your team already feels the ground shifting.
          </h2>
          <div className="mt-8 space-y-5 text-lg md:text-xl text-[#E8E2D6]/70 leading-relaxed">
            <p>The AI news doesn&apos;t stop. Every week there&apos;s a new tool, a new threat, a competitor doing more with fewer people.</p>
            <p>Your best people are either quietly anxious they&apos;re falling behind, or quietly convinced none of it applies to them. Both are expensive, and both are spreading.</p>
            <p className="text-white font-heading font-semibold">You don&apos;t need another webinar. You need the room to leave aligned, energised, and certain about what to do on Monday.</p>
          </div>
        </div>
      </section>

      {/* The three formats */}
      <section id="formats" className="bg-[#0F1117] py-24 md:py-32">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">Three ways in.</h2>
            <p className="text-[#E8E2D6]/60 text-lg mt-4 max-w-2xl mx-auto">Start where your team is. Most begin with a keynote and grow from there.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map(({ product, subtitle, includes, popular }) => (
              <div
                key={product.slug}
                className={`relative flex flex-col h-full rounded-2xl p-8 lg:p-10 border transition-all duration-500 hover:shadow-[0_0_44px_rgba(90,166,178,0.14)] ${
                  popular ? "border-[#C9A96E]/50 bg-[#1A1B23] md:-mt-4 md:mb-4" : "border-[rgba(90,166,178,0.15)] bg-[#1A1B23]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-8 bg-[#C9A96E] text-[#0F1117] text-xs font-semibold tracking-wide uppercase px-4 py-1 rounded-md">
                    Most chosen
                  </span>
                )}
                <h3 className="font-heading text-2xl text-white">{product.name}</h3>
                <p className="text-[#E8E2D6]/50 text-sm mt-1">{subtitle}</p>
                <p className="text-[#5AA6B2] text-sm mt-5">{product.duration} · {product.audience}</p>
                <p className="text-[#E8E2D6]/80 text-sm mt-4 leading-relaxed">{product.bestFor}.</p>
                <ul className="mt-6 space-y-3 flex-1">
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
                  className="mt-6 block text-center bg-[#C9A96E] text-[#0F1117] font-semibold text-sm py-3 px-6 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(201,169,110,0.3)]"
                >
                  Get a proposal
                </Link>
                <Link href={product.href} className="mt-3 block text-center text-[#5AA6B2] text-sm hover:text-[#C9A96E] transition-colors">
                  See what it looks like →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[#E8E2D6]/40 text-sm mt-10 max-w-2xl mx-auto">
            No two engagements are the same, so we don&apos;t sell packages off a shelf. Tell us your team and your moment, and we come back with the right format and an exact proposal.
          </p>
        </div>
      </section>

      {/* Examples */}
      <section className="bg-[#12141C] py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">You already admire companies who did this.</h2>
            <p className="text-[#E8E2D6]/60 text-lg mt-4 max-w-2xl mx-auto">Brand Humanizing isn&apos;t theory. It&apos;s what the best organisations already do, on purpose. Here&apos;s what that looks like.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {EXAMPLES.map((ex) => (
              <div key={ex.title} className="rounded-2xl bg-[#1A1B23] border border-[rgba(90,166,178,0.15)] p-7 md:p-8">
                <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-3">{ex.tag}</span>
                <h3 className="font-heading font-bold text-lg text-white mb-3">{ex.title}</h3>
                <p className="text-sm text-[#E8E2D6]/70 leading-relaxed">{ex.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilitator authority band */}
      <section className="bg-[#0F1117] py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="rounded-2xl bg-[#1A1B23] border border-[rgba(90,166,178,0.15)] p-8 md:p-12">
            <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-10 items-center">
              <div className="mx-auto md:mx-0 w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src={FACILITATOR.photo} alt={FACILITATOR.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">You&apos;re not booking a trainer. You&apos;re booking the person who wrote the book.</h2>
                <p className="text-[#E8E2D6]/75 leading-relaxed mb-3">{FACILITATOR.stagesLine}</p>
                <p className="text-[#E8E2D6]/55 text-sm leading-relaxed mb-3">{FACILITATOR.acknowledgementLine}</p>
                <p className="text-[#C9A96E] font-heading font-semibold">{FACILITATOR.closingLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos — already heard this and acted on it */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <p className="text-center text-white text-lg md:text-xl font-heading mb-12 max-w-2xl mx-auto">
            The teams inside these organisations already heard this, and acted on it.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-10 items-center">
            {MARQUEE_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <img src={logo.src} alt={logo.alt} loading="lazy" className="h-8 md:h-9 w-auto brightness-0 invert opacity-40 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond training band */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <div className="rounded-2xl bg-[#1E1F28] border border-[rgba(90,166,178,0.15)] p-10 md:p-16 text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">Ready to embed it organisation-wide?</h2>
            <p className="text-lg text-[#E8E2D6]/65 mt-5 max-w-2xl mx-auto leading-relaxed">
              Training wakes people up and builds the skill. When you want Brand Humanizing built into how your whole organisation works, that&apos;s a project. We scope it with you from audit to handover, until it runs without us.
            </p>
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 mt-8 border border-[#C9A96E] text-[#C9A96E] font-semibold text-sm py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-[#C9A96E] hover:text-[#0F1117]"
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
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-[1.08]">
            Every quarter you wait, you look a little more like everyone else.
          </h2>
          <p className="text-lg text-[#E8E2D6]/60 mt-6 max-w-xl mx-auto">
            Tell us your team and your moment. We&apos;ll come back with the right format and an exact proposal. One message and you&apos;re on our radar.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-10 bg-[#C9A96E] text-[#0F1117] font-semibold py-3.5 px-9 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,169,110,0.35)]"
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
