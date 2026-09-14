import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";
import VibecodingForm from "./VibecodingForm";
import TierButton from "./TierButton";
import Polaroid from "@/components/origin/Polaroid";
import { VIBECODING_TIERS, pricingIsSet, type VibeContent } from "./content";

// A plain-language prompt turning into a working app. On-brand SVG (no stock
// photo, no watermark) that illustrates what "vibecoding" actually looks like.
function PromptVisual() {
  return (
    <svg viewBox="0 0 460 380" role="img" aria-label="A plain-language prompt turning into a working app." className="w-full h-auto max-w-md mx-auto">
      <rect x="18" y="22" width="424" height="340" rx="18" fill="#ffffff" stroke="#e8e2d8" strokeWidth="2" />
      <circle cx="44" cy="50" r="5" fill="#df302a" />
      <circle cx="64" cy="50" r="5" fill="#ffbb00" />
      <circle cx="84" cy="50" r="5" fill="#1154ac" />
      <line x1="18" y1="72" x2="442" y2="72" stroke="#efe9df" strokeWidth="2" />
      <rect x="42" y="92" width="376" height="46" rx="12" fill="#f7f2ea" stroke="#e8e2d8" strokeWidth="1.5" />
      <text x="60" y="120" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fill="#6b6656">build a quiz for our team lunch</text>
      <rect x="378" y="100" width="30" height="30" rx="8" fill="#df302a" />
      <path d="M393 122 L399 116 L393 110" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(-8,-1)" />
      <text x="42" y="164" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" letterSpacing="1" fill="#df302a">AI BUILT THIS</text>
      <rect x="42" y="176" width="376" height="164" rx="12" fill="#ffffff" stroke="#e8e2d8" strokeWidth="1.5" />
      <text x="62" y="210" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="17" fontWeight="800" fill="#1c1c1c">Team Lunch Picker</text>
      <rect x="62" y="226" width="336" height="30" rx="8" fill="#f7f2ea" />
      <text x="76" y="246" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fill="#6b6656">Sushi</text>
      <rect x="62" y="264" width="336" height="30" rx="8" fill="#1154ac" fillOpacity="0.12" stroke="#1154ac" strokeOpacity="0.4" />
      <text x="76" y="284" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" fill="#1154ac">Pizza — the winner</text>
      <rect x="62" y="302" width="336" height="30" rx="8" fill="#f7f2ea" />
      <text x="76" y="322" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fill="#6b6656">Poké bowl</text>
    </svg>
  );
}

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
                    <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight">
                      <span className="text-accent">{c.not.notLabel}</span>{" "}
                      <span className="text-foreground/40 line-through decoration-accent decoration-2 decoration-wavy">
                        {it.label}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{it.text}</p>
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
              <ScrollRevealSection>
                <div className="rounded-2xl bg-white border border-border/50 shadow-[0_8px_40px_rgba(18,21,46,0.08)] p-5 md:p-7">
                  <PromptVisual />
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    {c.lang === "nl" ? "Typen wat je wil. De AI bouwt het. Zo simpel." : "Type what you want. The AI builds it. That simple."}
                  </p>
                </div>
              </ScrollRevealSection>
            </div>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
              {c.what.points.map((p) => (
                <ScrollRevealSection key={p.title}>
                  <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-5 md:p-6">
                    <h3 className="font-heading font-bold text-lg text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
            <ScrollRevealSection>
              <div className="mt-10 rounded-2xl bg-white border border-border/50 p-6 md:p-8">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent">{c.what.examplesLabel}</span>
                <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {c.what.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2.5 text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealSection>
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
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <Polaroid
                  src="/assets/origin/ferry-in-company.jpg"
                  alt="Ferry Hoes hosting a session with a team."
                  caption={c.about.caption}
                  rotate={-2}
                  widthClass="w-full max-w-sm"
                />
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
                <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src="/assets/vibecoding/your-office.jpg"
                      alt={c.where.yours.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <h3 className="font-heading font-bold text-xl text-foreground">{c.where.yours.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-2">{c.where.yours.text}</p>
                  </div>
                </div>
              </ScrollRevealSection>
              <ScrollRevealSection>
                <div className="h-full rounded-2xl bg-white border-2 border-accent/30 shadow-[0_4px_24px_rgba(18,21,46,0.08)] overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src="/assets/vibecoding/rotterdam-office.jpg"
                      alt={c.where.ours.buildingAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <h3 className="font-heading font-bold text-xl text-foreground">{c.where.ours.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-2">{c.where.ours.text}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        {/* Why it's worth it */}
        <section className="section-padding bg-secondary">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-display md:text-display-lg text-foreground">{c.why.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-4">{c.why.sub}</p>
              </div>
            </ScrollRevealSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12">
              {c.why.items.map((it) => (
                <ScrollRevealSection key={it.title}>
                  <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-7">
                    <h3 className="font-heading font-bold text-lg text-foreground leading-snug">{it.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{it.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">{c.pricing.eyebrow}</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3">{c.pricing.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-4">{c.pricing.sub}</p>
              </div>
            </ScrollRevealSection>

            {pricingIsSet ? (
              <>
                <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-14 items-stretch">
                  {VIBECODING_TIERS.map((t, i) => {
                    const label = c.pricing.tiers[i];
                    const perHead = Math.round(t.price / t.maxPeople);
                    const popular = "popular" in t && t.popular;
                    const money = (n: number) => n.toLocaleString(c.lang === "nl" ? "nl-NL" : "en-US");
                    return (
                      <ScrollRevealSection key={label.name}>
                        <div
                          className={`relative h-full rounded-2xl p-7 md:p-8 flex flex-col ${
                            popular
                              ? "bg-navy text-white border-2 border-accent shadow-[0_20px_60px_-15px_rgba(18,21,46,0.4)] md:-mt-4 md:pt-11"
                              : "bg-cream border border-border/50"
                          }`}
                        >
                          {popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent text-white text-caption uppercase tracking-wider font-heading font-bold px-4 py-1">
                              {c.pricing.popularLabel}
                            </span>
                          )}
                          <h3 className={`font-heading font-bold text-lg ${popular ? "text-white" : "text-foreground"}`}>{label.name}</h3>
                          <p className={`text-sm mt-1 ${popular ? "text-white/70" : "text-muted-foreground"}`}>
                            {t.minPeople}–{t.maxPeople} {c.pricing.peopleWord}
                          </p>
                          <div className="mt-5 flex items-end gap-1.5">
                            <span className={`font-heading font-extrabold text-4xl md:text-5xl leading-none ${popular ? "text-white" : "text-foreground"}`}>
                              €{money(t.price)}
                            </span>
                          </div>
                          <p className={`text-sm mt-2 ${popular ? "text-white/70" : "text-muted-foreground"}`}>
                            {c.pricing.approx} €{money(perHead)} {c.pricing.perPerson} {c.pricing.atWord} {t.maxPeople}
                          </p>
                          <p className={`text-sm leading-relaxed mt-4 ${popular ? "text-white/80" : "text-muted-foreground"}`}>{label.tagline}</p>
                          <div className="mt-auto pt-7">
                            <TierButton groupSize={c.form.groupOptions[i]} popular={popular}>
                              {c.pricing.cta}
                            </TierButton>
                          </div>
                        </div>
                      </ScrollRevealSection>
                    );
                  })}
                </div>

                <ScrollRevealSection>
                  <div className="mt-10 rounded-2xl bg-cream border border-border/50 p-6 md:p-8">
                    <ul className="grid sm:grid-cols-3 gap-x-8 gap-y-3">
                      {c.pricing.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-foreground/80 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-6 border-t border-border/50 pt-6">
                      {c.pricing.overflow}{" "}
                      <TierButton groupSize={c.form.groupOptions[3]} variant="link">{c.pricing.cta}</TierButton>
                    </p>
                  </div>
                </ScrollRevealSection>
              </>
            ) : (
              <ScrollRevealSection>
                <div className="mt-12 mx-auto max-w-md text-center rounded-2xl bg-cream border border-border/50 px-10 py-8">
                  <span className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">{c.pricing.quote}</span>
                </div>
              </ScrollRevealSection>
            )}

            <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">{c.pricing.note}</p>
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
