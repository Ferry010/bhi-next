import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import MessageUs from "@/components/MessageUs";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Sparkles, GraduationCap, ArrowRight, ExternalLink, BookOpen, Users } from "lucide-react";
import { PRODUCTS, BOOK, TALK_TO_EXPERT, SPEAKERS_ACADEMY, FACILITATOR, STATS, MARQUEE_LOGOS, EXAMPLES } from "@/lib/pricing";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  alternates: { canonical: "/learning" },
  title: "Live Training | Brand Humanizing Institute",
  description:
    "Start with the book, bring the story to your team in-house, or train the whole team for a day. Pick how deep you want to go.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const formats = [
  { icon: Sparkles, product: PRODUCTS.inspiration, who: "Whole team or event audience", theme: "Brand Humanizing in 60 Minutes" },
  { icon: GraduationCap, product: PRODUCTS.fullDay, who: "A team, the full method", theme: "The complete method, applied to your work" },
];

const faqs = [
  { q: "What does it cost?", a: "The book is €24,95. For the training, it depends on the format, your group size, and where you are. Rather than sell a package off a shelf, we scope every session in a short intake and come back with an exact proposal. Most teams start with a Spark Session and grow from there." },
  { q: "Can sessions be delivered online or hybrid?", a: "Yes. Both formats work well. We discuss what's best for your situation during intake." },
  { q: "How much advance notice do you need?", a: "For a Spark Session: 3–6 weeks. For a Full-Day Course: 4–8 weeks. The sooner we talk, the more we can shape it around your team." },
  { q: "Can sessions be delivered in English?", a: "Yes. Both Ferry and Jonathan deliver in Dutch and English with equal fluency." },
  { q: "Do participants get the book?", a: "Yes. Every participant in our in-person sessions receives a copy of Brand Humanizing, the book." },
  { q: "What is the intake process?", a: "A short conversation to understand your organisation. No questionnaires. A real conversation that shapes the session." },
  { q: "Can you come to us?", a: "Yes. We deliver in-house wherever you are, and can host in Rotterdam. Remote delivery is also available." },
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
              Start with the book. Bring the story to your team in-house. Or train the whole team for a day. Pick how deep you want to go. They walk out changed, with a shared language and something to do on Monday.
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> A founder in the room</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> The book for everyone</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> Shaped around your team</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-10">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-3xl text-primary tabular-nums"><CountUp value={s.value} /></span>
                  <span className="text-muted-foreground text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="formats" className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3 text-center">Pick how deep you want to go.</h2>
              <p className="text-body-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Start with the book, then bring it to your team. Every training format carries a theme, and every one includes the book.</p>
            </ScrollRevealSection>

            {/* Entry rung — the book. Lightest, cheapest way in. */}
            <ScrollRevealSection>
              <div className="mb-6 rounded-2xl border border-border/60 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-heading font-semibold text-muted-foreground">Start here · {BOOK.name}</span>
                      <span className="text-xs font-heading font-semibold text-primary bg-cream rounded-full px-3 py-1">{BOOK.price}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mt-1">Read the book, then we&apos;ll talk.</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">{BOOK.promise} {BOOK.edition}.</p>
                  </div>
                </div>
                <Link href={BOOK.href} className="shrink-0">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2">
                    About the book <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>

            <div className="grid md:grid-cols-2 gap-6">
              {formats.map((f) => (
                <ScrollRevealSection key={f.product.slug}>
                  <Link href={f.product.href} className="group block bg-white rounded-2xl p-7 md:p-8 h-full shadow-[0_4px_24px_rgba(18,21,46,0.08)] border border-border/50 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm font-heading font-semibold text-muted-foreground">{f.product.name.replace(/^The /, "")}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors mb-4">{f.product.outcome}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs font-heading font-semibold text-muted-foreground bg-cream rounded-full px-3 py-1">{f.product.formatLabel}</span>
                      <span className="text-xs font-heading font-semibold text-muted-foreground bg-cream rounded-full px-3 py-1">{f.who}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5"><span className="font-heading font-semibold text-foreground">Theme:</span> {f.theme}</p>
                    <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      See the format <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </ScrollRevealSection>
              ))}
            </div>

            {/* Go-deeper rung — the Taskforce. */}
            <ScrollRevealSection>
              <div className="mt-6 rounded-2xl border border-border/60 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-foreground">Want it to actually stick?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">Training wakes people up. The Taskforce turns one real challenge into a working pilot, run by your own people, over sixteen weeks. When we leave, the capability stays.</p>
                  </div>
                </div>
                <Link href="/taskforce" className="shrink-0">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2">
                    See the Taskforce <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>

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

        {/* Proof of the idea — the companies who already do this. */}
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

        {/* Who delivers it — authority band + client logos. */}
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

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Not sure where to start?</h2>
              <p className="text-body-lg text-white/70 mb-8">
                Most teams start with the Spark Session. It&apos;s the fastest way to get everyone on the same page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning/inspiration-session">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
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

        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <MessageUs
                context="learning"
                heading="Not sure which format fits?"
                subheading="Tell us about your team and the moment you're in. We'll come back with the format that actually fits, even if it's the smallest one."
              />
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
