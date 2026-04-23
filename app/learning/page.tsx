import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Sparkles, GraduationCap, Settings, Monitor, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning & Training",
  description:
    "From a 90-minute inspiration session to a multi-day leadership programme. Find the right format for your team.",
  openGraph: { images: [{ url: "/og/learning.jpg" }] },
};

const products = [
  {
    icon: Sparkles,
    title: "The Inspiration Session",
    tagline: "The question that started everything. One session. One conversation. A room that leaves thinking differently.",
    specs: "60–90 min · 15–500+ people · From €2,500",
    to: "/learning/inspiration-session",
    comingSoon: false,
  },
  {
    icon: GraduationCap,
    title: "The Full-Day Course",
    tagline: "The inspiration session opens the conversation. The full-day course builds the skill. A 90-day implementation plan included.",
    specs: "6–7 hours · 12–30 people · From €6,500",
    to: "/learning/full-day-course",
    comingSoon: false,
  },
  {
    icon: Settings,
    title: "The Multi-Day Programme",
    tagline: "For leadership teams ready to make Brand Humanizing part of how they lead. Two to three days that change how your team thinks.",
    specs: "2–3 days · 8–20 people · From €12,500",
    to: "/learning/multi-day-programme",
    comingSoon: false,
  },
  {
    icon: Monitor,
    title: "The Online Course",
    tagline: "Learn the Brand Humanizing framework at your own pace. Coming soon.",
    specs: "Self-paced · 4–6 modules · Individual",
    to: "/learning/online-course",
    comingSoon: true,
  },
  {
    icon: ShieldCheck,
    title: "AI Literacy Certificate",
    tagline: "EU AI Act Article 4 compliant training. Built on the Brand Humanizing foundation, delivered via AIGA.",
    specs: "3–4 hours · Individual or team · EU AI Act compliant",
    to: "/learning/ai-literacy-certificate",
    comingSoon: false,
    badge: "Via AIGA",
  },
];

const faqs = [
  { q: "Can sessions be delivered online or hybrid?", a: "Yes. Both formats work well. We discuss what's best for your situation during intake." },
  { q: "How much advance notice do you need?", a: "For sessions: 3–6 weeks. For multi-day programmes: 4–8 weeks." },
  { q: "Can sessions be delivered in English?", a: "Yes. Both Ferry and Jonathan deliver in Dutch and English with equal fluency." },
  { q: "Do participants get the book?", a: "Yes. Every participant in our in-person sessions receives a copy of Brand Humanizing, the book." },
  { q: "What is the intake process?", a: "A 30-minute conversation to understand your organization. No questionnaires. A real conversation that shapes the session." },
  { q: "Can you come to us?", a: "Yes. We deliver in-house sessions anywhere in Europe, and can host in Rotterdam. Remote delivery also available." },
];

export default function LearningPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Learning" }]} variant="light" />
            <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest mb-4">Learning &amp; Training</span>
            <h1 className="text-hero md:text-hero-lg text-foreground">
              Your competitors are already rethinking their people strategy.{" "}
              <span className="text-accent">Are you?</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">
              From a one-hour inspiration to a full transformation programme. Find the format that fits your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
              <a href="#products">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  See all formats →
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

        <section id="products" className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3 text-center">Choose your format</h2>
              <p className="text-body-lg text-muted-foreground text-center mb-12">Pick the format that fits your team and your moment.</p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-6">
              {products.slice(0, 4).map((p) => (
                <ScrollRevealSection key={p.title}>
                  <div className={`rounded-2xl p-7 h-full flex flex-col transition-all duration-300 ${
                    p.comingSoon
                      ? "opacity-50 bg-white/60 border border-border/30"
                      : "bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)] border border-border/50 hover:shadow-lg hover:border-accent/30"
                  }`}>
                    <div className="w-12 h-12 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center mb-4">
                      <p.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-2">{p.title}</h3>
                    {p.comingSoon && (
                      <span className="text-xs font-heading font-semibold text-accent uppercase tracking-wider mb-2">Coming Soon</span>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{p.tagline}</p>
                    <p className="text-caption text-muted-foreground/60 font-heading font-semibold mb-4">{p.specs}</p>
                    {!p.comingSoon ? (
                      <Link href={p.to}>
                        <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm gap-2">
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={p.to}>
                        <Button variant="outline" className="rounded-full border-foreground/20 font-heading font-semibold px-5 h-10 text-sm gap-2">
                          Join waitlist <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
            <div className="mt-6">
              <ScrollRevealSection>
                <div className="rounded-2xl p-7 bg-navy-card border border-accent/20 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                      <h3 className="font-heading font-bold text-lg text-white">AI Literacy Certificate</h3>
                      <span className="text-xs font-heading font-semibold text-accent bg-accent/10 rounded-full px-2 py-0.5">Via AIGA</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed mb-2">{products[4].tagline}</p>
                    <p className="text-caption text-accent/70 font-heading font-semibold">{products[4].specs}</p>
                  </div>
                  <Link href="/learning/ai-literacy-certificate">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm gap-2 shrink-0">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Not sure where to start?</h2>
              <p className="text-body-lg text-white/70 mb-8">
                Most teams start with the Inspiration Session. It&apos;s the fastest way to get everyone on the same page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning/inspiration-session">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Start with the Inspiration Session <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base">
                    Talk to a human
                  </Button>
                </Link>
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
