import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages, PlayCircle, Paperclip } from "lucide-react";
import VibecodingForm from "./VibecodingForm";
import VibecodingBuilder from "./VibecodingBuilder";
import VibecodingChat from "./VibecodingChat";
import TierButton from "./TierButton";
import Polaroid from "@/components/origin/Polaroid";
import { VIBECODING_TIERS, pricingIsSet, type VibeContent } from "./content";

// A phone showing the actual "vibecoding" move: you chat a plain-language prompt
// (with an attachment) and the AI starts building. Placeholder for the hero.
function PhoneMockup({ phone, lang }: { phone: VibeContent["hero"]["phone"]; lang: "en" | "nl" }) {
  return (
    <div className="relative w-[240px] sm:w-[264px] rotate-2">
      <div className="rounded-[2.6rem] bg-foreground p-2.5 shadow-[0_30px_70px_-20px_rgba(18,21,46,0.5)]">
        <div className="relative rounded-[2.1rem] bg-cream overflow-hidden flex flex-col" style={{ aspectRatio: "9 / 19" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground rounded-b-2xl z-10" />
          {/* top bar */}
          <div className="pt-9 px-4 pb-2.5 bg-white border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent text-[10px] font-heading font-bold">AI</span>
              <span className="font-heading font-bold text-sm text-foreground">{phone.appName}</span>
            </div>
          </div>
          {/* conversation */}
          <div className="flex-1 overflow-hidden px-3 py-3 space-y-2.5">
            <div className="flex justify-end">
              <div className="max-w-[86%] rounded-2xl rounded-br-sm bg-primary text-white px-3 py-2">
                <p className="text-[11px] leading-snug">{phone.userMessage}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-0.5 text-[10px]">
                  <Paperclip className="w-2.5 h-2.5" /> {phone.attachment}
                </span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white border border-border/50 px-3 py-2">
                <p className="text-[11px] leading-snug text-foreground/80">{phone.aiReply}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-white border border-border/50 px-3 py-2 inline-flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">{phone.status}</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          </div>
          {/* input bar */}
          <div className="p-2.5 bg-white border-t border-border/50">
            <div className="rounded-full bg-cream border border-border/50 px-3 py-1.5 text-[10px] text-muted-foreground">
              {lang === "nl" ? "Typ een opdracht…" : "Type a prompt…"}
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <div className="container max-w-6xl">
            <div className="flex justify-end mb-6">
              <Link href={c.langSwitch.href} className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors">
                <Languages className="w-4 h-4" /> {c.langSwitch.label}
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div>
                <h1 className="text-hero md:text-hero-lg text-foreground leading-[1.05]">
                  {c.hero.title}
                  <span className="text-accent">{c.hero.titleAccent}</span>
                </h1>
                <p className="mt-5 text-lg md:text-xl font-heading font-semibold text-foreground">{c.hero.promise}</p>
                <p className="mt-4 text-sm md:text-body-lg text-muted-foreground">{c.hero.sub}</p>
                <p className="mt-3 text-sm text-muted-foreground max-w-md">{c.hero.forEveryone}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a href="#book">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                      {c.hero.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href="#wat-is-vibecoding"
                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-foreground/30 px-6 h-12 text-base font-heading font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" /> {c.hero.demoCta}
                  </a>
                </div>
                <p className="mt-4 text-sm font-heading font-semibold text-foreground/75">
                  {c.hero.priceLine.replace("{price}", `€${VIBECODING_TIERS[0].price.toLocaleString(c.lang === "nl" ? "nl-NL" : "en-US")}`)}
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <PhoneMockup phone={c.hero.phone} lang={c.lang} />
              </div>
            </div>
          </div>
        </section>

        {/* Proof: a real session */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="max-w-2xl">
                <h2 className="text-display md:text-display-lg text-foreground">{c.proof.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-3">{c.proof.sub}</p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-10 justify-items-center">
              {c.proof.photos.map((p, i) => (
                <ScrollRevealSection key={p.src}>
                  <Polaroid src={p.src} alt={p.alt} caption={p.caption} rotate={i % 2 === 0 ? -2 : 2} widthClass="w-full max-w-sm" />
                </ScrollRevealSection>
              ))}
            </div>
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
              <p className="text-center text-3xl md:text-5xl font-heading font-extrabold text-foreground max-w-4xl mx-auto mt-14 leading-tight">
                <span
                  className="box-decoration-clone px-1"
                  style={{ background: "linear-gradient(transparent 62%, rgba(255,187,0,0.45) 62%)" }}
                >
                  {c.not.punch}
                </span>
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* What is vibecoding */}
        <section id="wat-is-vibecoding" className="section-padding bg-cream scroll-mt-16">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="max-w-2xl">
                <h2 className="text-display md:text-display-lg text-foreground leading-tight">{c.what.heading}</h2>
                <div className="mt-6 space-y-4 text-body-lg text-muted-foreground leading-relaxed">
                  {c.what.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </ScrollRevealSection>
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

            {/* Try it yourself, inline */}
            <ScrollRevealSection>
              <div className="mt-14">
                <VibecodingBuilder lang={c.lang} />
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

        {/* Sample agenda */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <div className="text-center mb-10">
                <h2 className="text-display md:text-display-lg text-foreground">{c.agenda.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-4">{c.agenda.sub}</p>
              </div>
            </ScrollRevealSection>
            <ScrollRevealSection>
              <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-10">
                <ol className="relative border-l-2 border-border/60 space-y-6">
                  {c.agenda.items.map((it) => (
                    <li key={it.time} className="relative pl-6 md:pl-8">
                      <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-white" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                        <span className="font-heading font-bold text-foreground tabular-nums w-16 shrink-0">{it.time}</span>
                        <span className="text-muted-foreground leading-relaxed">{it.label}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Colleagues chatting the day after */}
        <section className="section-padding bg-white">
          <div className="container max-w-2xl">
            <ScrollRevealSection>
              <div className="text-center mb-8">
                <h2 className="text-display md:text-display-lg text-foreground">{c.chat.heading}</h2>
                <p className="text-body-lg text-muted-foreground mt-3">{c.chat.sub}</p>
              </div>
            </ScrollRevealSection>
            <VibecodingChat content={c.chat} />
          </div>
        </section>

        {/* About the host */}
        <section className="section-padding bg-secondary">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollRevealSection>
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <Polaroid
                  src="/assets/origin/speaking-1.jpg"
                  alt="Ferry Hoes on stage at the Dag van Digitalisering."
                  caption={c.about.caption}
                  rotate={-2}
                  widthClass="w-full max-w-md"
                />
              </div>
            </ScrollRevealSection>
            <ScrollRevealSection>
              <div className="order-1 md:order-2">
                <h2 className="text-display md:text-display-lg text-foreground leading-tight">{c.about.heading}</h2>
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
                <h2 className="text-display md:text-display-lg text-foreground">{c.pricing.heading}</h2>
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
                  <p className="text-center text-sm text-muted-foreground leading-relaxed mt-8 max-w-xl mx-auto">
                    {c.pricing.overflow}{" "}
                    <TierButton groupSize={c.form.groupOptions[3]} variant="link">{c.pricing.cta}</TierButton>
                  </p>
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
            <p className="text-center text-sm mt-4 max-w-xl mx-auto">
              <span className="font-heading font-bold text-accent">{c.lang === "nl" ? "Beperkt beschikbaar." : "Limited availability."}</span>{" "}
              <span className="text-muted-foreground">{c.pricing.scarcity}</span>
            </p>
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
