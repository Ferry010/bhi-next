import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";
import VibecodingForm from "./VibecodingForm";
import { VIBECODING_PRICE, priceIsSet, type VibeContent } from "./content";

export default function VibecodingLanding({ content }: { content: VibeContent }) {
  const c = content;
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
          <div className="container max-w-4xl">
            <div className="flex justify-end mb-6">
              <Link href={c.langSwitch.href} className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors">
                <Languages className="w-4 h-4" /> {c.langSwitch.label}
              </Link>
            </div>
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">{c.hero.eyebrow}</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              {c.hero.title}
              <span className="text-accent">{c.hero.titleAccent}</span>
            </h1>
            <p className="text-sm md:text-body-lg text-muted-foreground mt-6 max-w-2xl">{c.hero.sub}</p>
            <div className="mt-8">
              <a href="#book">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {c.hero.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground/70 mt-4">{c.hero.note}</p>
          </div>
        </section>

        {/* Not another escape room */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground text-center">{c.not.heading}</h2>
              <p className="text-body-lg text-muted-foreground mt-4 text-center max-w-2xl mx-auto">{c.not.sub}</p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
              {c.not.items.map((it) => (
                <ScrollRevealSection key={it.label}>
                  <div className="h-full rounded-2xl bg-cream border border-border/50 p-6 md:p-7">
                    <h3 className="font-heading font-bold text-lg text-foreground">{it.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{it.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
            <ScrollRevealSection>
              <p className="text-center text-xl md:text-2xl font-heading font-bold text-foreground max-w-3xl mx-auto mt-12 leading-snug">
                {c.not.punch}
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* What is vibecoding */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <ScrollRevealSection>
                <div>
                  <h2 className="text-display md:text-display-lg text-foreground leading-tight">{c.what.heading}</h2>
                  <div className="mt-6 space-y-4 text-body-lg text-muted-foreground leading-relaxed">
                    {c.what.body.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </ScrollRevealSection>
              <div className="space-y-4">
                {c.what.points.map((p) => (
                  <ScrollRevealSection key={p.title}>
                    <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-5 md:p-6">
                      <h3 className="font-heading font-bold text-lg text-foreground">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.text}</p>
                    </div>
                  </ScrollRevealSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <h2 className="text-display md:text-display-lg text-foreground">{c.how.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">{c.how.sub}</p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {c.how.steps.map((s, i) => (
                <ScrollRevealSection key={s.title}>
                  <div className="h-full rounded-2xl bg-cream border border-border/50 p-6 md:p-7">
                    <span className="font-heading font-extrabold text-2xl text-accent/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-heading font-bold text-lg text-foreground mt-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{s.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* About the host */}
        <section className="section-padding bg-secondary">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollRevealSection>
              <div className="order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(18,21,46,0.35)] max-w-md">
                  <img
                    src="/assets/origin/ferry-in-company.jpg"
                    alt="Ferry Hoes hosting a session with a team."
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="font-handwritten text-foreground/70 text-xl md:text-2xl mt-3">{c.about.caption}</p>
              </div>
            </ScrollRevealSection>
            <ScrollRevealSection>
              <div className="order-1 md:order-2">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">{c.about.eyebrow}</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">{c.about.heading}</h2>
                <div className="mt-6 space-y-4 text-body-lg text-muted-foreground leading-relaxed">
                  {c.about.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Where */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <h2 className="text-display md:text-display-lg text-foreground">{c.where.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-4">{c.where.sub}</p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              <ScrollRevealSection>
                <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-8">
                  <h3 className="font-heading font-bold text-xl text-foreground">{c.where.yours.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mt-2">{c.where.yours.text}</p>
                </div>
              </ScrollRevealSection>
              <ScrollRevealSection>
                <div className="h-full rounded-2xl bg-white border-2 border-accent/30 shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-7 md:p-8">
                  <h3 className="font-heading font-bold text-xl text-foreground">{c.where.ours.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mt-2">{c.where.ours.text}</p>
                  <div className="mt-5 rounded-xl bg-sunny/15 border border-sunny/40 p-4">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent">{c.where.ours.bonusLabel}</span>
                    <p className="text-sm text-foreground/80 leading-relaxed mt-1">{c.where.ours.bonus}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">{c.pricing.eyebrow}</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-3">{c.pricing.heading}</h2>
              <div className="mt-8 inline-flex flex-col items-center rounded-2xl bg-cream border border-border/50 px-10 py-8">
                {priceIsSet ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-extrabold text-5xl md:text-6xl text-foreground">{VIBECODING_PRICE.from}</span>
                      <span className="text-muted-foreground text-lg">{c.pricing.unit}</span>
                    </div>
                    <span className="text-sm text-muted-foreground mt-2">{c.pricing.minLabel}</span>
                  </>
                ) : (
                  <>
                    <span className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">{c.pricing.quote}</span>
                    <span className="text-sm text-muted-foreground mt-2">{c.pricing.minLabel}</span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground mt-6 max-w-xl mx-auto">{c.pricing.note}</p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Book / form */}
        <section id="book" className="section-padding bg-navy scroll-mt-16">
          <div className="container max-w-2xl">
            <ScrollRevealSection>
              <div className="text-center mb-8">
                <h2 className="text-display md:text-display-lg text-white">{c.form.heading}</h2>
                <p className="text-white/70 text-body-lg mt-4">{c.form.sub}</p>
              </div>
              <VibecodingForm labels={c.form} lang={c.lang} />
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
