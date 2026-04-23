"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, Users, Euro, Check, ArrowRight } from "lucide-react";
import StepProgressIndicator from "@/components/work-with-us/StepProgressIndicator";

/* ── Types ──────────────────────────────────────────── */

interface ContentBlock {
  type: "paragraph" | "bullets" | "agenda" | "link-paragraph";
  text?: string;
  items?: string[];
  linkText?: string;
  linkTo?: string;
}

interface ProseSection {
  heading: string;
  content: ContentBlock[];
}

interface ComparisonRow {
  them: string;
  us: string;
}

interface RelatedEngagement {
  label: string;
  description: string;
  to: string;
}

interface Testimonial {
  quote: string;
  who: string;
}

export interface FullServicePageData {
  seoTitle: string;
  seoDescription: string;
  seoOgImage?: string;
  path: string;
  breadcrumbs: { label: string; to?: string }[];
  label: string;
  h1: string;
  subheading: string;
  specs: { icon: "clock" | "users" | "euro"; text: string }[];
  ctaLabel: string;
  ctaTo: string;

  whySection: ProseSection;
  processSection: ProseSection;
  outputsHeading: string;
  outputs: string[];
  whoHeading: string;
  whoItems: string[];

  comparisonTable?: { heading: string; rows: ComparisonRow[] };

  testimonials: Testimonial[];

  investmentHeading: string;
  investmentBody: string[];

  faqs: { q: string; a: string }[];

  relatedHeading?: string;
  relatedEngagements: RelatedEngagement[];

  finalCtaHeading: string;
  finalCtaSubline?: string;
  finalCtaLabel: string;
  finalCtaTo: string;

  serviceSchema?: Record<string, unknown>;
}

/* ── Helpers ─────────────────────────────────────────── */

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function AccentHeading({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split("*");
  if (parts.length === 1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? <span key={i} className="text-accent">{part}</span> : <span key={i}>{part}</span>
      )}
    </h2>
  );
}

const specIcon = (icon: "clock" | "users" | "euro") => {
  const cls = "w-4 h-4 text-accent";
  if (icon === "clock") return <Clock className={cls} />;
  if (icon === "users") return <Users className={cls} />;
  return <Euro className={cls} />;
};

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />;
}

function RenderContent({ blocks, dark = false }: { blocks: ContentBlock[]; dark?: boolean }) {
  const textClass = dark ? "text-white/80" : "text-muted-foreground";
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "paragraph") return (
          <p key={i} className={`text-body-lg ${textClass} leading-relaxed mb-4`}>{b.text}</p>
        );
        if (b.type === "link-paragraph") return (
          <p key={i} className={`text-body-lg ${textClass} leading-relaxed mb-4`}>
            {b.text}{" "}
            {b.linkTo && b.linkText && (
              <Link href={b.linkTo} className="text-accent hover:underline font-medium">{b.linkText}</Link>
            )}
          </p>
        );
        if (b.type === "bullets") return (
          <div key={i} className="space-y-3 mb-6">
            {b.items?.map((item, j) => (
              <div
                key={j}
                className={`flex gap-4 items-start rounded-2xl p-5 transition-all duration-500 ${
                  dark
                    ? "bg-white/5 border border-white/10"
                    : "bg-cream shadow-sm"
                }`}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-heading font-bold">
                  {j + 1}
                </span>
                <span className={dark ? "text-white/80" : "text-foreground"}>{item}</span>
              </div>
            ))}
          </div>
        );
        if (b.type === "agenda") return (
          <div key={i} className="bg-navy-card rounded-2xl p-6 md:p-8 shadow-lg border border-accent/10 mb-6 space-y-3">
            {b.items?.map((item, j) => {
              const [time, ...rest] = item.split(". ");
              return (
                <div key={j} className="flex gap-4 items-baseline">
                  <span className="text-accent font-heading font-semibold whitespace-nowrap text-sm">{time}</span>
                  <span className="text-white/80 text-sm">{rest.join(". ")}</span>
                </div>
              );
            })}
          </div>
        );
        return null;
      })}
    </>
  );
}

/* ── Template ────────────────────────────────────────── */

export default function FullServicePageTemplate({ data }: { data: FullServicePageData }) {
  const stepMatch = data.label.match(/STEP\s+(\d+)/i);
  const stepNum = stepMatch ? parseInt(stepMatch[1]) : null;

  return (
    <div className="min-h-screen bg-secondary text-foreground">
      {data.serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.serviceSchema) }}
        />
      )}
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container max-w-4xl relative z-10">
          <Breadcrumb items={data.breadcrumbs} variant="light" />
          <div className="flex items-center gap-3 mb-4">
            {stepNum && (
              <span className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                {stepNum}
              </span>
            )}
            <p className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-accent">{data.label}</p>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.1] mb-6">{data.h1}</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">{data.subheading}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {data.specs.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                {specIcon(s.icon)} {s.text}
              </span>
            ))}
          </div>
          <Link href={data.ctaTo}>
            <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
              {data.ctaLabel} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {stepNum && (
        <div className="bg-secondary border-t border-border/30">
          <div className="container max-w-4xl">
            <StepProgressIndicator currentStep={stepNum} />
          </div>
        </div>
      )}

      <SectionDivider />

      {/* Why: dark */}
      <section className="bg-navy section-padding">
        <div className="container max-w-3xl">
          <Section>
            <AccentHeading text={data.whySection.heading} className="font-heading text-2xl md:text-4xl font-bold mb-8 text-white" />
            <RenderContent blocks={data.whySection.content} dark />
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* Process: white */}
      <section className="bg-white section-padding">
        <div className="container max-w-3xl">
          <Section>
            <AccentHeading text={data.processSection.heading} className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground" />
            <RenderContent blocks={data.processSection.content} />
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* Outputs: cream */}
      <section className="bg-cream section-padding">
        <div className="container max-w-3xl">
          <Section>
            <AccentHeading text={data.outputsHeading} className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground" />
            <div className="grid md:grid-cols-2 gap-4">
              {data.outputs.map((o, i) => (
                <div
                  key={i}
                  className="bg-navy rounded-2xl p-6 h-full flex gap-4 items-start shadow-lg border border-accent/10"
                >
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{o}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* Who: white */}
      <section className="bg-white section-padding">
        <div className="container max-w-3xl">
          <Section>
            <AccentHeading text={data.whoHeading} className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground" />
            <div className="space-y-4">
              {data.whoItems.map((item, i) => (
                <div
                  key={i}
                  className="border-l-4 border-accent bg-cream rounded-r-2xl p-5 text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Comparison table (optional) */}
      {data.comparisonTable && (
        <>
          <SectionDivider />
          <section className="bg-cream section-padding">
            <div className="container max-w-3xl">
              <Section>
                <AccentHeading text={data.comparisonTable.heading} className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground" />
                <div className="overflow-hidden rounded-2xl border border-border/50 shadow-md">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="px-6 py-4 font-heading font-semibold text-sm">What other consultants do</th>
                        <th className="px-6 py-4 font-heading font-semibold text-sm">What we do</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.comparisonTable.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                          <td className="px-6 py-4 text-muted-foreground text-sm border-r border-border/30">{row.them}</td>
                          <td className="px-6 py-4 text-foreground font-medium text-sm border-l-4 border-accent/30">{row.us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>
          </section>
        </>
      )}

      <SectionDivider />

      {/* Testimonials: dark */}
      {data.testimonials.length > 0 && (
        <section className="bg-navy section-padding">
          <div className="container max-w-3xl">
            {data.testimonials.map((t, i) => (
              <Section key={i} className={i > 0 ? "mt-10" : ""}>
                <div className="relative">
                  <span className="absolute -top-6 -left-2 text-accent/20 text-8xl font-heading leading-none select-none">&ldquo;</span>
                  <blockquote className="text-white text-xl md:text-2xl font-heading italic leading-relaxed mb-4 relative z-10 pl-4">
                    {t.quote}
                  </blockquote>
                  <p className="text-accent font-heading text-sm pl-4"> - {t.who}</p>
                </div>
              </Section>
            ))}
          </div>
        </section>
      )}

      <SectionDivider />

      {/* Investment: cream */}
      <section className="bg-cream section-padding">
        <div className="container max-w-3xl">
          <Section>
            <div className="bg-navy-card rounded-3xl p-8 md:p-12 shadow-xl border border-accent/10">
              <AccentHeading text={data.investmentHeading} className="font-heading text-2xl md:text-4xl font-bold mb-6 text-white" />
              {data.investmentBody.map((p, i) => (
                <p key={i} className="text-white/80 text-lg leading-relaxed mb-3">{p}</p>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <FAQSection faqs={data.faqs} variant="light" />

      <SectionDivider />

      {/* Related engagements: white */}
      <section className="bg-white section-padding">
        <div className="container max-w-4xl">
          <Section>
            <AccentHeading text={data.relatedHeading || "Related engagements"} className="font-heading text-2xl md:text-3xl font-bold mb-8 text-foreground" />
            <div className="grid md:grid-cols-3 gap-6">
              {data.relatedEngagements.map((r, i) => (
                <Link key={i} href={r.to} className="group block bg-navy-card rounded-2xl p-6 border border-transparent hover:border-accent/30 transition-all duration-300 h-full">
                  <h3 className="font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">{r.label}</h3>
                  <p className="text-sm text-white/70 mb-4">{r.description}</p>
                  <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA: dark */}
      <section className="bg-navy section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container max-w-3xl text-center relative z-10">
          <Section>
            <AccentHeading text={data.finalCtaHeading} className="font-heading text-2xl md:text-4xl font-bold mb-4 text-white" />
            {data.finalCtaSubline && <p className="text-white/70 text-lg mb-8">{data.finalCtaSubline}</p>}
            <Link href={data.finalCtaTo}>
              <Button className="rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                {data.finalCtaLabel} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
