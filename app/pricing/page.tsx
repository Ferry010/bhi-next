import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, ArrowRight } from "lucide-react";
import { PRODUCTS, BOOK, FACILITATOR, STATS, MARQUEE_LOGOS, EXAMPLES, TALK_TO_EXPERT } from "@/lib/pricing";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Train Your Team | Brand Humanizing Institute",
  description:
    "Three ways to give your team the human edge in the AI era: the book, an in-house keynote, or a full-day course. Every session includes the book. Trusted by teams at Unilever, VodafoneZiggo, GSK and more.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

// The public ladder, three equal cards: Book (entry, real price + purchase),
// Spark and Full-Day (scoped in a conversation, no public price). Full-Day is
// the flagship. The book's purchase URL is a placeholder until the mechanism is
// decided; until then the CTA falls back to the About page (/book).
const bookPurchaseConfigured = !BOOK.purchase.url.startsWith("[");
const tiers = [
  {
    key: "book",
    name: BOOK.name,
    subtitle: "Read it, then we'll talk",
    specLine: `${BOOK.price} · ${BOOK.edition}`,
    bestFor: BOOK.bestFor,
    includes: [
      "The full Brand Humanizing methodology and research",
      "The real-world cases behind the framework",
      "The cheapest way to see if this fits your organisation",
    ],
    booksLine: "The whole method, in your hands",
    cta: {
      label: BOOK.purchase.label,
      href: bookPurchaseConfigured ? BOOK.purchase.url : BOOK.href,
      external: bookPurchaseConfigured && BOOK.purchase.external,
    },
    detail: { label: "About the book →", href: BOOK.href },
    popular: false,
  },
  {
    key: "spark",
    name: PRODUCTS.inspiration.name,
    subtitle: "The spark that gets everyone moving",
    specLine: `${PRODUCTS.inspiration.duration} · ${PRODUCTS.inspiration.audience}`,
    bestFor: PRODUCTS.inspiration.bestFor,
    includes: [
      "A keynote shaped around your organisation",
      "An honest first read of where you stand",
      "Concrete first moves for Monday morning",
    ],
    booksLine: "The book, for every participant",
    cta: { label: TALK_TO_EXPERT.label, href: TALK_TO_EXPERT.url, external: true },
    detail: { label: "See what it looks like →", href: PRODUCTS.inspiration.href },
    popular: false,
  },
  {
    key: "fullday",
    name: PRODUCTS.fullDay.name,
    subtitle: "Curious team in, capable team out",
    specLine: `${PRODUCTS.fullDay.duration} · ${PRODUCTS.fullDay.audience}`,
    bestFor: PRODUCTS.fullDay.bestFor,
    includes: [
      "The complete four-skill framework, applied to you",
      "The human opportunities your competitors miss",
      "A 90-day implementation plan you can run Monday",
    ],
    booksLine: "The book, for every participant",
    cta: { label: TALK_TO_EXPERT.label, href: TALK_TO_EXPERT.url, external: true },
    detail: { label: "See what it looks like →", href: PRODUCTS.fullDay.href },
    popular: true,
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
    a: "In-company at your location wherever you are, at our Rotterdam office, or at an off-site venue. Remote and hybrid formats are available too.",
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
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Train Your Team" }]} variant="light" />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-4 py-1.5 text-sm font-heading font-semibold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> For teams that can&apos;t afford to fall behind
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-6">
              Everyone&apos;s team is learning AI. Yours should learn{" "}
              <span className="text-accent">what AI can&apos;t do.</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Three ways to give your people the human edge that keeps customers choosing you. Start with the book, bring us in for a keynote, or train the team for a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  {TALK_TO_EXPERT.label}
                </Button>
              </a>
              <a href="#formats">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  See the three ways in →
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> A founder in the room</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> The book for everyone</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> Shaped around your team</span>
            </div>
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

        {/* Necessity framing */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground leading-tight">
                Your team already feels the ground shifting.
              </h2>
              <div className="mt-8 space-y-5 text-body-lg text-muted-foreground leading-relaxed">
                <p>The AI news doesn&apos;t stop. Every week there&apos;s a new tool, a new threat, a competitor doing more with fewer people.</p>
                <p>Your best people are either quietly anxious they&apos;re falling behind, or quietly convinced none of it applies to them. Both are expensive, and both are spreading.</p>
                <p className="text-foreground font-heading font-semibold">You don&apos;t need another webinar. You need the room to leave aligned, energised, and certain about what to do on Monday.</p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* The three formats */}
        <section id="formats" className="section-padding bg-cream">
          <div className="container max-w-6xl">
            <ScrollRevealSection>
              <div className="text-center mb-14">
                <h2 className="text-display md:text-display-lg text-foreground">Three ways in.</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Start where your team is. Read the book, or bring us in. Most teams grow from a keynote into a full day.</p>
              </div>
            </ScrollRevealSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {tiers.map(({ key, name, subtitle, specLine, bestFor, includes, booksLine, cta, detail, popular }) => (
                <div
                  key={key}
                  className={`relative flex flex-col h-full rounded-2xl p-8 lg:p-10 bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)] transition-all duration-300 hover:shadow-lg ${
                    popular ? "border-2 border-accent md:-mt-4 md:mb-4" : "border border-border/50"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-8 bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase px-4 py-1 rounded-md">
                      Most chosen
                    </span>
                  )}
                  {key === "book" && (
                    <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-xs font-semibold tracking-wide uppercase px-4 py-1 rounded-md">
                      Start here
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-2xl text-foreground">{name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
                  <p className="text-primary font-heading font-semibold text-sm mt-5">{specLine}</p>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{bestFor}.</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {includes.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border text-muted-foreground text-sm">
                    <BookOpen className="w-4 h-4 text-accent" />
                    {booksLine}
                  </div>
                  {cta.external ? (
                    <a href={cta.href} target="_blank" rel="noopener noreferrer" className="mt-6 block">
                      <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-11">
                        {cta.label}
                      </Button>
                    </a>
                  ) : (
                    <Link href={cta.href} className="mt-6 block">
                      <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-11">
                        {cta.label}
                      </Button>
                    </Link>
                  )}
                  <Link href={detail.href} className="mt-3 block text-center text-primary font-heading font-semibold text-sm hover:text-accent transition-colors">
                    {detail.label}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto">
              Start with the book, or bring us in. No two engagements are the same, so we don&apos;t sell training off a shelf. Tell us your team and your moment, and we come back with the right format and an exact proposal.
            </p>
          </div>
        </section>

        {/* Examples */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-14">
                <h2 className="text-display md:text-display-lg text-foreground">You already admire companies who did this.</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Brand Humanizing isn&apos;t theory. It&apos;s what the best organisations already do, on purpose. Here&apos;s what that looks like.</p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {EXAMPLES.map((ex) => (
                <div key={ex.title} className="rounded-2xl bg-cream border border-border/50 p-7 md:p-8">
                  <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">{ex.tag}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">{ex.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ex.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilitator authority band */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-8 md:p-12">
              <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-10 items-center">
                <div className="mx-auto md:mx-0 w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img src={FACILITATOR.photo} alt={FACILITATOR.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">You&apos;re not booking a trainer. You&apos;re booking the person who wrote the book.</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">{FACILITATOR.stagesLine}</p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed mb-3">{FACILITATOR.acknowledgementLine}</p>
                  <p className="text-primary font-heading font-semibold">{FACILITATOR.closingLine}</p>
                </div>
              </div>
            </div>

            {/* Client logos */}
            <p className="text-center text-foreground text-lg md:text-xl font-heading mt-16 mb-10 max-w-2xl mx-auto">
              The teams inside these organisations already heard this, and acted on it.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-10 items-center">
              {MARQUEE_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img src={logo.src} alt={logo.alt} loading="lazy" className="h-8 md:h-9 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beyond training band — the navy moment */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white">Ready to embed it organisation-wide?</h2>
              <p className="text-body-lg text-white/70 mt-5 max-w-2xl mx-auto leading-relaxed">
                Training wakes people up and builds the skill. When you want Brand Humanizing built into how your whole organisation works, that&apos;s a project. We scope it with you from audit to handover, until it runs without us.
              </p>
              <Link href="/work-with-us" className="inline-block mt-8">
                <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  See how we work together <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </ScrollRevealSection>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection title="Frequently asked questions" faqs={faqs} variant="light" />

        {/* Final CTA — white so it does not run into the cream FAQ above */}
        <section className="section-padding bg-white">
          <div className="container text-center">
            <h2 className="text-display md:text-display-lg text-foreground max-w-3xl mx-auto leading-[1.08]">
              Every quarter you wait, you look a little more like everyone else.
            </h2>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-xl mx-auto">
              Tell us your team and your moment. We&apos;ll come back with the right format and an exact proposal. One message and you&apos;re on our radar.
            </p>
            <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-10">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-9 h-12 text-base">
                {TALK_TO_EXPERT.label}
              </Button>
            </a>
            <p className="text-muted-foreground/70 text-xs mt-6">Book a 30-minute call. A real human, not a bot.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
