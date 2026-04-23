import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, TrendingUp, Globe, GraduationCap, Search, FileText, Beaker } from "lucide-react";

export const metadata: Metadata = {
  title: "Research | Brand Humanizing Institute",
  description:
    "Independent, primary research on technology, organizational behavior, and human-technology strategy. Freely available, no registration required.",
  openGraph: { images: [{ url: "/og/research.jpg" }] },
};

const reports = [
  {
    featured: true,
    year: "2026",
    icon: TrendingUp,
    title: "The State of Brand Humanizing 2026",
    desc: "Eight years after the original idea. Here is where we are, what changed, and what it means for your organization in 2026.",
    to: "/research/state-of-brand-humanizing-2026",
  },
  {
    year: "2020",
    icon: Globe,
    title: "The State of Human 2020",
    desc: "104 decision-makers across five continents. The central question: is there still a place for humans in an increasingly automated world?",
    to: "/research/state-of-human-2020",
  },
  {
    year: "2022",
    icon: GraduationCap,
    title: "Brand Humanizing: Towards a Human-Technology Fit",
    desc: "The academic foundation of the Human-Technology Fit concept. Peer-reviewed and freely available.",
    badge: "Peer-reviewed",
    to: null,
  },
];

const principles = [
  { icon: Search, title: "Primary research", desc: "Original studies with real organizations. Not opinion pieces. Not trend summaries." },
  { icon: FileText, title: "Peer-quality methodology", desc: "Rigorous enough to stand alongside academic work. Our 2022 study follows peer-reviewed standards and is freely citable." },
  { icon: Beaker, title: "Freely available", desc: "No paywall, no registration, no email required. Knowledge that helps organizations make better decisions should be accessible." },
];

const faqs = [
  { q: "Is all research really free?", a: "Yes. No paywall, no registration, no email required." },
  { q: "Can I cite Brand Humanizing research?", a: "Yes. Please cite the Brand Humanizing Institute and the relevant authors (Ferry Hoes and/or Jonathan Flores) with a link to the original source." },
  { q: "How often do you publish new research?", a: "Major reports publish every 2–3 years. We also publish shorter pieces when we have something worth saying. Subscribe to the newsletter to stay current." },
  { q: "Can I collaborate on research?", a: "Possibly. Reach out with your proposal. We're open to academic partnerships and co-research arrangements." },
];

export default function ResearchPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary min-h-[60vh] flex items-center pt-28 md:pt-36 pb-16">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Research" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Research</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              The evidence behind the thinking.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Independent research on technology, organizational behavior, and what it means to be genuinely human at work. Freely available, because knowledge that sits behind a paywall isn&apos;t doing anyone any good.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {principles.map((p) => (
                <ScrollRevealSection key={p.title}>
                  <div className="bg-cream rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <p.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>

            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-8">Published research</h2>
            </ScrollRevealSection>
            <div className="space-y-6">
              {reports.map((r) => (
                <ScrollRevealSection key={r.title}>
                  <div className={`rounded-2xl p-6 md:p-8 ${r.featured ? "bg-navy text-white border border-accent/20" : "bg-cream"}`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-caption font-heading font-semibold uppercase tracking-wider ${r.featured ? "text-accent" : "text-accent"}`}>
                            {r.year}
                          </span>
                          {r.badge && (
                            <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-2 py-0.5">
                              {r.badge}
                            </span>
                          )}
                        </div>
                        <h3 className={`font-heading font-bold text-xl mb-3 ${r.featured ? "text-white" : "text-foreground"}`}>{r.title}</h3>
                        <p className={`text-sm leading-relaxed ${r.featured ? "text-white/70" : "text-muted-foreground"}`}>{r.desc}</p>
                      </div>
                      {r.to && (
                        <Link href={r.to}>
                          <Button className={`rounded-full font-heading font-semibold px-5 h-10 text-sm gap-2 shrink-0 ${r.featured ? "bg-accent text-accent-foreground hover:bg-soft-coral" : "bg-foreground text-background hover:bg-foreground/80"}`}>
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />
      </main>
      <Footer />
    </>
  );
}
