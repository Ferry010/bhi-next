import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Training Programs & Pricing | Brand Humanizing Institute",
  description:
    "Premium Brand Humanizing training programs for organizations. From a one-hour inspiration session to full transformation programs. Invest in the skill of the future.",
  openGraph: { images: [{ url: "/og/pricing.jpg" }] },
};

const tiers = [
  {
    name: "Inspiration Session",
    duration: "1 hour",
    price: "€1.500",
    subtitle: "The perfect first step",
    features: [
      "Interactive keynote by a Brand Humanizing founder",
      "Brand Humanizing basics & methodology",
      "Actionable insights for immediate implementation",
      "Up to 50 participants",
      "Copy of Brand Humanizing (the book) for every participant",
    ],
    cta: "Book a Session",
    popular: false,
  },
  {
    name: "Deep Dive Workshop",
    duration: "Half day (3–4 hours)",
    price: "€3.500",
    subtitle: "Go beyond inspiration",
    features: [
      "Everything in Inspiration Session, plus:",
      "Hands-on exercises with your own organizational cases",
      "Brand Humanizing Pyramid deep dive",
      "The four essential skills: AI, Creativity, Human Sciences, EQ & Ethics",
      "Up to 25 participants",
      "Exclusive LinkedIn community access",
    ],
    cta: "Book a Workshop",
    popular: true,
  },
  {
    name: "Full Immersion Training",
    duration: "Full day",
    price: "€5.500",
    subtitle: "For teams ready to transform",
    features: [
      "Everything in Deep Dive Workshop, plus:",
      "Complete Brand Humanizing methodology implementation",
      "Custom action plan for your organization",
      "Follow-up strategy call (30 min) two weeks post-training",
      "Up to 20 participants",
      "Priority access to Brand Humanizing research updates",
    ],
    cta: "Book a Training",
    popular: false,
  },
];

const faqs = [
  {
    q: "What is Brand Humanizing?",
    a: "Brand Humanizing is a methodology founded in 2017 that helps organizations use technology to become more human. It focuses on creating competitive advantage through the unique synergy of people and technology.",
  },
  {
    q: "Who is this training for?",
    a: "Innovation leaders, C-suite executives, team leads, HR professionals, and any forward-thinking professional who wants to future-proof their organization.",
  },
  {
    q: "Where does the training take place?",
    a: "All programs are available in-company at your location or at our Rotterdam office. We come to you.",
  },
  {
    q: "Can we customize the program?",
    a: "Yes. All programs can be tailored to your industry, your challenges, and your ambitions. Contact us to discuss possibilities.",
  },
  {
    q: "Is there an online option?",
    a: "Contact us to discuss hybrid formats. We believe in-person delivers the deepest impact, but we can adapt.",
  },
  {
    q: "What about AI literacy training?",
    a: "For EU AI Act compliance and structured AI literacy programs, visit our sister organization AIGA (AI Geletterdheid Academy) at aigeletterdheid.academy.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0F1117]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
            style={{ background: "#5AA6B2", top: "10%", left: "15%" }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px]"
            style={{ background: "#C9A96E", bottom: "5%", right: "10%" }}
          />
        </div>
        <div className="container text-center relative z-10 py-32 md:py-40 pt-44 md:pt-52">
          <p className="uppercase tracking-[0.16em] text-[#5AA6B2] text-xs md:text-sm font-medium mb-6">
            Training Programs
          </p>
          <h1 className="font-heading text-hero md:text-hero-lg text-white max-w-3xl mx-auto">
            Invest in the Skill of the Future
          </h1>
          <p className="text-body-lg text-[#E8E2D6]/70 mt-6 max-w-2xl mx-auto leading-relaxed">
            Brand Humanizing training programs for organizations that want to lead, not follow. From a one-hour inspiration to a full transformation program.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col h-full rounded-xl p-8 lg:p-10 border transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(90,166,178,0.12)] ${
                  tier.popular
                    ? "border-[#C9A96E]/40 bg-[#1A1B23]"
                    : "border-[rgba(90,166,178,0.15)] bg-[#1A1B23]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-8 bg-[#C9A96E] text-[#0F1117] text-xs font-semibold tracking-wide uppercase px-4 py-1 rounded-md">
                    Most Popular
                  </span>
                )}
                <p className="text-[#5AA6B2] text-xs uppercase tracking-[0.14em] font-medium">
                  {tier.duration}
                </p>
                <h3 className="font-heading text-xl md:text-2xl text-white mt-3">{tier.name}</h3>
                <p className="text-[#E8E2D6]/50 text-sm mt-1">{tier.subtitle}</p>
                <p className="text-white text-4xl md:text-[2.75rem] font-heading font-bold mt-6 tabular-nums tracking-tight">
                  {tier.price}
                </p>
                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#E8E2D6]/75 leading-relaxed">
                      <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#5AA6B2] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 block text-center bg-[#C9A96E] text-[#0F1117] font-semibold text-sm py-3 px-6 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(90,166,178,0.25)]"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise banner */}
      <section className="bg-[#0F1117] pb-24 md:pb-32">
        <div className="container max-w-5xl">
          <div className="rounded-xl bg-[#1E1F28] border border-[rgba(90,166,178,0.15)] p-10 md:p-16 text-center">
            <h2 className="font-heading text-display md:text-display-lg text-white">
              Looking for a Full Transformation?
            </h2>
            <p className="text-body-lg text-[#E8E2D6]/65 mt-5 max-w-2xl mx-auto leading-relaxed">
              For organizations ready to embed Brand Humanizing into their DNA, we offer multi-session transformation programs. Custom-designed, C-suite aligned, and built for lasting competitive advantage.
            </p>
            <p className="text-[#C9A96E] font-heading font-bold text-2xl md:text-3xl mt-8 tabular-nums">
              Pricing starts at €12.500
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-[#C9A96E] text-[#0F1117] font-semibold text-sm py-3 px-8 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(90,166,178,0.25)]"
            >
              Let&apos;s Talk
            </Link>
            <p className="text-[#E8E2D6]/35 text-xs mt-6">
              All prices exclude VAT and travel costs outside Rotterdam.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-[#0F1117] py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#C9A96E] font-heading font-bold text-5xl tabular-nums">9.2</span>
              <span className="text-[#E8E2D6]/50 text-sm">average participant rating</span>
            </div>
            <div className="hidden md:block w-px h-16 bg-[rgba(90,166,178,0.2)]" />
            <p className="text-[#E8E2D6]/60 text-sm md:text-base max-w-md leading-relaxed">
              Acknowledged by Steven Kotler, Neil Sahota (UN AI Expert), and former Dutch State Secretary Mona Keijzer.
            </p>
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
            The future satisfies those who prepare for it.
          </h2>
          <p className="text-body-lg text-[#E8E2D6]/60 mt-5 max-w-xl mx-auto">
            Organizations that invest in Brand Humanizing today build the competitive advantage of tomorrow.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-10 bg-[#C9A96E] text-[#0F1117] font-semibold py-3 px-8 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(90,166,178,0.25)]"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
