import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { BOOK, TALK_TO_EXPERT } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/bedankt" },
  title: "Bedankt voor je aandacht | Brand Humanizing",
  description:
    "De recap van de keynote, de belangrijkste inzichten, en hoe je verdergaat: het boek of Brand Humanizing naar je eigen team brengen.",
  // Attendee funnel page reached by QR from the closing slide. Not for search,
  // not in the nav or sitemap.
  robots: { index: false, follow: false },
};

// The recap and takeaways are evergreen: the core Brand Humanizing message is
// the same at every talk. Kept as data so a per-event page (/bedankt/[event])
// could later override the note, date and takeaways while reusing this layout.
const takeaways = [
  {
    title: "Automatiseer je processen, niet je mensen.",
    body: "Techniek hoort het voorspelbare werk over te nemen, zodat je mensen tijd houden voor het werk dat alleen mensen kunnen.",
  },
  {
    title: "Je klanten zijn geen datapunten.",
    body: "Achter elke transactie zit een mens met een echt leven. De merken die dat onthouden, winnen loyaliteit. De rest optimaliseert zichzelf naar een commodity.",
  },
  {
    title: "Menselijkheid is je enige oneerlijke voordeel.",
    body: "Features, prijzen en algoritmes worden binnen een kwartaal gekopieerd. Echte aandacht niet. Die wordt sterker naarmate je hem langer volhoudt.",
  },
  {
    title: "De toekomst van business is menselijk.",
    body: "Elke technologiegolf roept dezelfde angst op. De organisaties die techniek gebruiken om menselijker te worden, zijn precies degene die mensen blijven kiezen.",
  },
];

export default function BedanktPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero — thank you + on-stage photo */}
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="container max-w-6xl grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
            <div>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De keynote</span>
              <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
                Bedankt voor <span className="text-accent">je aandacht.</span>
              </h1>
              <div className="mt-6 space-y-4 text-body-lg text-muted-foreground max-w-xl">
                <p>
                  Fijn dat je erbij was. Ik hoop dat je met een andere blik naar je eigen werk kijkt, en met minstens één ding dat je maandag anders doet.
                </p>
                <p>
                  Hieronder vind je de kern van de talk terug, de belangrijkste inzichten, en een paar manieren om verder te gaan.
                </p>
              </div>
              <p className="mt-6 font-heading font-semibold text-foreground">Ferry Hoes</p>
            </div>
            <div className="md:justify-self-end w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(18,21,46,0.35)]">
                <img
                  src="/assets/origin/speaking-2.jpg"
                  alt="Ferry Hoes op het podium tijdens een Brand Humanizing keynote."
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The recap */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De recap</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">Waar het over ging</h2>
              <div className="mt-6 space-y-5 text-body-lg text-muted-foreground leading-relaxed">
                <p>
                  AI en techniek maken elk team steeds meer op elkaar lijken. Iedereen automatiseert, iedereen gebruikt dezelfde tools, en zo zakt iedereen langzaam weg in hetzelfde grijze midden.
                </p>
                <p>
                  Brand Humanizing draait het om. Niet de techniek tegenhouden, maar hem inzetten om juist menselijker te worden. Laat de machine het voorspelbare werk doen, zodat jouw mensen de momenten kunnen pakken die bepalen of een klant blijft.
                </p>
                <p className="text-foreground font-heading font-semibold">
                  De techniek neemt het saaie werk. De mens wordt de reden dat klanten voor je kiezen, en blijven kiezen.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Key takeaways */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Key takeaways</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3">De belangrijkste inzichten</h2>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {takeaways.map((t, i) => (
                <ScrollRevealSection key={i}>
                  <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-8">
                    <div className="flex items-start gap-4">
                      <span className="font-heading font-extrabold text-2xl text-accent/30 tabular-nums leading-none pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-foreground leading-snug">{t.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{t.body}</p>
                      </div>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — the navy moment */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white leading-tight">Meer weten?</h2>
              <p className="text-white/70 text-body-lg mt-5 max-w-xl mx-auto">
                Het hele verhaal en het complete framework staan in het boek. Of laten we praten over hoe we dit naar jouw team brengen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-9">
                <a href={BOOK.purchase.url} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    <BookOpen className="w-4 h-4" /> Haal het boek
                  </Button>
                </a>
                <Link href="/learning">
                  <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    <Users className="w-4 h-4" /> Breng dit naar je team
                  </Button>
                </Link>
              </div>
              <p className="text-white/50 text-sm mt-6">
                Liever eerst even sparren?{" "}
                <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-white hover:text-sunny transition-colors inline-flex items-center gap-1">
                  Plan een gratis gesprek <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
