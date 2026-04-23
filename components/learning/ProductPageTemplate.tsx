"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, Users, Euro, ArrowRight, Check, BookOpen } from "lucide-react";

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />;
}

export interface AgendaItem {
  time: string;
  activity: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface CrossSell {
  label: string;
  description: string;
  to: string;
}

export interface Testimonial {
  quote: string;
  who: string;
}

export interface ProductPageData {
  seoTitle: string;
  seoDescription: string;
  seoOgImage?: string;
  path: string;
  breadcrumbs: { label: string; to?: string }[];
  badge?: string;
  title: string;
  subtitle: string;
  duration: string;
  audience: string;
  deliveredBy: string;
  description: string;
  agenda: AgendaItem[];
  agendaLabel?: string;
  leaveWith: string[];
  pricingSignal: string;
  includesBook?: boolean;
  ctaLabel: string;
  ctaProduct: string;
  testimonials: Testimonial[];
  faqs: FAQ[];
  crossSells: CrossSell[];
  comingSoon?: boolean;
  fixedPrice?: boolean;
  enrollLabel?: string;
  courseSchema?: Record<string, unknown>;
}

export default function ProductPageTemplate({ data }: { data: ProductPageData }) {
  const priceMatch = data.pricingSignal.match(/(€[\d,.]+)/);
  const shortPrice = priceMatch ? priceMatch[1] : data.pricingSignal.split(".")[0];

  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar variant="light" />

      <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container max-w-4xl relative z-10">
          <Breadcrumb items={data.breadcrumbs} variant="light" />
          {data.badge && (
            <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest mb-4">
              {data.badge}
            </span>
          )}
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">{data.subtitle}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <Clock className="w-4 h-4 text-accent" /> {data.duration}
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <Users className="w-4 h-4 text-accent" /> {data.audience}
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <Euro className="w-4 h-4 text-accent" /> {shortPrice}
            </span>
          </div>

          <Link href={`/contact?product=${data.ctaProduct}`}>
            <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
              {data.comingSoon ? "Join the waitlist" : data.ctaLabel} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-navy section-padding">
        <div className="container max-w-3xl">
          <Section>
            <p className="text-lg text-white/80 leading-relaxed">{data.description}</p>
            <p className="text-sm text-white/60 mt-4">Delivered by: {data.deliveredBy}</p>
          </Section>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding bg-white">
        <div className="container max-w-3xl">
          <Section>
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground text-center">
              {data.agendaLabel || "Example agenda"}
            </h2>
            <div className="bg-navy-card rounded-2xl p-6 md:p-8 shadow-lg border border-accent/10 space-y-3">
              {data.agenda.map((item, i) => (
                <div key={i} className="flex gap-4 items-baseline">
                  <span className="text-accent font-heading font-semibold whitespace-nowrap text-sm min-w-[80px]">{item.time}</span>
                  <span className="text-white/80 text-sm">{item.activity}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding bg-cream">
        <div className="container max-w-3xl">
          <Section>
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground text-center">What your team leaves with</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.leaveWith.map((item, i) => (
                <div
                  key={i}
                  className="bg-navy rounded-2xl p-6 h-full flex gap-4 items-start shadow-lg border border-accent/10 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding bg-cream">
        <div className="container max-w-3xl">
          <Section>
            <div className="bg-navy-card rounded-3xl p-8 md:p-12 shadow-xl border border-accent/10 text-center">
              <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6 text-white">Investment</h2>
              <p className="text-xl md:text-2xl text-accent font-heading font-semibold mb-2">{data.pricingSignal}</p>
              {data.includesBook && (
                <div className="flex items-center justify-center gap-2 mt-4 text-white/70">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Every participant receives a copy of the book.</span>
                </div>
              )}
              <p className="text-white/60 text-sm mt-4">All prices exclude VAT and travel costs outside Rotterdam.</p>
              <Link href={`/contact?product=${data.ctaProduct}`} className="inline-block mt-8">
                <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {data.ctaLabel} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      {data.testimonials.length > 0 && (
        <>
          <section className="bg-navy section-padding">
            <div className="container max-w-3xl">
              {data.testimonials.map((t, i) => (
                <Section key={i} className={i > 0 ? "mt-10" : ""}>
                  <div className="relative">
                    <span className="absolute -top-6 -left-2 text-accent/20 text-8xl font-heading leading-none select-none">&ldquo;</span>
                    <blockquote className="text-white text-xl md:text-2xl font-heading italic leading-relaxed mb-4 relative z-10 pl-4">
                      {t.quote}
                    </blockquote>
                    <p className="text-accent font-heading text-sm pl-4">{t.who}</p>
                  </div>
                </Section>
              ))}
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {data.faqs.length > 0 && (
        <>
          <FAQSection faqs={data.faqs} variant="light" />
          <SectionDivider />
        </>
      )}

      {data.crossSells.length > 0 && (
        <>
          <section className="section-padding bg-white">
            <div className="container max-w-4xl">
              <Section>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">What comes next?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.crossSells.map((cs, i) => (
                    <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}>
                      <Link href={cs.to} className="group block bg-navy-card rounded-2xl p-6 border border-transparent hover:border-accent/30 transition-all duration-300 h-full">
                        <h3 className="font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">{cs.label}</h3>
                        <p className="text-sm text-white/70 mb-4">{cs.description}</p>
                        <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      <section className="section-padding bg-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container max-w-3xl text-center relative z-10">
          <Section>
            <p className="text-lg text-white/80">
              Most organisations who take this session go on to build something bigger. When you&apos;re ready:{" "}
              <Link href="/work-with-us" className="text-accent font-heading font-semibold hover:underline">
                Work With Us →
              </Link>
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
