import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Cpu, Lightbulb, Heart } from "lucide-react";
import { BOOK, TALK_TO_EXPERT, MARQUEE_LOGOS } from "@/lib/pricing";
import ShareAndContact from "@/components/bedankt/ShareAndContact";
import Polaroid from "@/components/origin/Polaroid";

export const metadata: Metadata = {
  alternates: { canonical: "/bedankt" },
  title: "Bedankt voor je aandacht | Brand Humanizing",
  description:
    "De recap van de keynote: de kern, de vier skills, de belangrijkste inzichten en de vraag om maandag mee te beginnen. Plus het boek en Brand Humanizing naar je team brengen.",
  // Attendee funnel page reached by QR from the closing slide. Not for search,
  // not in the nav or sitemap.
  robots: { index: false, follow: false },
};

// Evergreen recap: the core Brand Humanizing message is the same at every talk.
// Kept as data so a per-event page (/bedankt/[event]) could later override the
// note and takeaways while reusing this layout.
const takeaways = [
  {
    title: "Brand Humanizing wordt de norm.",
    body: "Net zoals marketing dat ooit werd. Organisaties beginnen te snappen dat menselijke waarde en menselijke kracht het enige zijn dat ze nog onderscheidt van de rest.",
  },
  {
    title: "Consumenten zijn mensen, geen datapunten.",
    body: "Achter elke transactie zit iemand met een echt leven. De merken die dat onthouden, winnen loyaliteit. De rest optimaliseert zichzelf richting commodity.",
  },
  {
    title: "Dezelfde technologie maakt je nog niet anders.",
    body: "Iedereen kan dezelfde tools kopen. Zonder de juiste mensen, skills en intenties doe je alleen wat je al deed, maar duurder. En ondertussen raak je kwijt wat je ooit onderscheidde.",
  },
  {
    title: "Maak je mensen je oneerlijke voordeel.",
    body: "Zet de Brand Humanizing skills in om het beste in je mensen naar boven te halen, en geef ze de tools om daar het maximale uit te halen. Dat is precies waar technologie alleen niet bij komt.",
  },
];

const skills = [
  {
    icon: Cpu,
    title: "Programmeren, automatisering en AI",
    desc: "Weten wat technologie beter, sneller en goedkoper doet, en de helderheid hebben om het ook echt in te zetten.",
  },
  {
    icon: Lightbulb,
    title: "Creativiteit en organisatiebesef",
    desc: "De ruimte die automatisering vrijmaakt, vullen met iets beters. Creativiteit is een organisatievaardigheid.",
  },
  {
    icon: Users,
    title: "Human sciences en onderzoek",
    desc: "Echt onderzoek naar wat mensen beweegt, verder dan wat een dashboard laat zien. Dit houdt alle andere skills met de voeten in de klei.",
  },
  {
    icon: Heart,
    title: "Emotionele intelligentie en ethiek",
    desc: "De skill die Brand Humanizing behoedt voor een kille efficiency-truc. Ethiek is geen rem, het is het fundament.",
  },
];

// Optical size tiers for the client logos, indexed by MARQUEE_LOGOS[i].sizeTier
// (default 1). Compact/padded marks use a higher tier so every logo reads as
// roughly equal. Kept here (a scanned file) so Tailwind emits the classes.
const LOGO_SIZE = ["h-7 md:h-8", "h-8 md:h-9", "h-9 md:h-10", "h-10 md:h-12", "h-12 md:h-14"];

function VennDiagram() {
  return (
    <svg
      viewBox="0 0 620 340"
      role="img"
      aria-label="Venn diagram: menselijke kracht en technologie overlappen in Brand Humanizing."
      className="w-full h-auto max-w-lg mx-auto"
    >
      <circle cx="235" cy="175" r="150" fill="rgba(223,48,42,0.10)" stroke="#df302a" strokeWidth="2" />
      <circle cx="385" cy="175" r="150" fill="rgba(17,84,172,0.10)" stroke="#1154ac" strokeWidth="2" />
      <g fontFamily="'Plus Jakarta Sans', sans-serif" textAnchor="middle">
        <text x="140" y="168" fill="#df302a" fontSize="21" fontWeight="700">Menselijke</text>
        <text x="140" y="194" fill="#df302a" fontSize="21" fontWeight="700">kracht</text>
        <text x="480" y="183" fill="#1154ac" fontSize="21" fontWeight="700">Technologie</text>
        <text x="310" y="166" fill="#1c1c1c" fontSize="20" fontWeight="800">Brand</text>
        <text x="310" y="192" fill="#1c1c1c" fontSize="20" fontWeight="800">Humanizing</text>
      </g>
    </svg>
  );
}

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
                  Geen slides in je mail. Wel de hele talk hieronder: de kern, de vier skills, de belangrijkste inzichten en de vraag om maandag mee te beginnen.
                </p>
              </div>
              <p className="mt-6 font-heading font-semibold text-foreground">Ferry Hoes</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Polaroid
                src="/assets/origin/speaking-2.jpg"
                alt="Ferry Hoes op het podium tijdens een Brand Humanizing keynote."
                caption="Tot de volgende keer"
                rotate={-2.5}
                widthClass="w-64 sm:w-72 md:w-80"
              />
            </div>
          </div>
        </section>

        {/* The recap + the venn */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De recap</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">Waar het over ging</h2>
              <div className="mt-6 space-y-5 text-body-lg text-muted-foreground leading-relaxed">
                <p>
                  AI en andere vormen van technologie zorgen ervoor dat teams, organisaties en producten steeds meer op elkaar gaan lijken. Iedereen automatiseert, iedereen gebruikt dezelfde tools, en zo zakt iedereen langzaam weg in hetzelfde grijze midden.
                </p>
                <p>
                  Brand Humanizing draait het om. Niet de technologie tegenhouden, maar hem inzetten om juist menselijker te worden. Precies daar, waar menselijke kracht en technologie elkaar versterken, ontstaat het voordeel dat niemand kan kopiëren.
                </p>
                <p className="text-foreground font-heading font-semibold">
                  De technologie neemt het saaie werk over. De mens wordt de reden dat klanten voor je kiezen, en blijven kiezen.
                </p>
              </div>
            </div>
            <div>
              <VennDiagram />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Menselijke kracht keer technologie. Dat is Brand Humanizing.
              </p>
            </div>
          </div>
        </section>

        {/* The four skills */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Het framework</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3">De skills van een Brand Humanizer</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Dit zijn de skills die jou de voorsprong geven. Je ontwikkelt ze naast je huidige expertise. Of je nu HR-manager bent, Category Manager of C-level, deze skills voeg je toe aan je skillset.
                </p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {skills.map((s, i) => (
                <ScrollRevealSection key={i}>
                  <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-7 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground leading-snug">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{s.desc}</p>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        <section className="section-padding bg-white">
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
                  <div className="h-full rounded-2xl bg-cream border border-border/50 p-7 md:p-8">
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

        {/* The one question to start with on Monday */}
        <section className="section-padding bg-secondary">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Begin maandag</span>
              <blockquote className="mt-5 text-2xl md:text-4xl font-heading font-extrabold text-foreground leading-[1.15]">
                &ldquo;Waar doe ik in mijn werk <span className="text-accent">robotwerk</span>? En waar laat ik een robot het <span className="text-accent">mensenwerk</span> doen?&rdquo;
              </blockquote>
              <p className="text-body-lg text-muted-foreground mt-6 max-w-xl mx-auto">
                Het klinkt simpel, maar het is precies de vraag waar de hele methode op rust. Zet de technologie op het voorspelbare werk, en je mensen op de momenten die er echt toe doen.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* CTA 1 — the book */}
        <section className="section-padding bg-white">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Het boek</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">
                Over een week ben je het grootste deel weer kwijt.
              </h2>
              <p className="text-body-lg text-muted-foreground mt-5 max-w-xl">
                Een keynote blijft een paar dagen hangen. Het boek zet het complete framework zwart op wit, met de research en de voorbeelden erbij. Zodat je er over een maand nog steeds naar handelt. Voor de prijs van een lunch.
              </p>
              <a href={BOOK.purchase.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-7">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  <BookOpen className="w-4 h-4" /> Haal het boek · {BOOK.price}
                </Button>
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/assets/book-cover.jpg"
                alt="Brand Humanizing, het boek van Ferry Hoes en Jonathan Flores."
                className="w-52 md:w-64 rounded-lg shadow-[0_24px_60px_-15px_rgba(18,21,46,0.45)] rotate-2"
              />
            </div>
          </div>
        </section>

        {/* Proof — client logos + FOMO, primes the team CTA */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground leading-tight">
                Deze teams gaven hun mensen de voorsprong.
              </h2>
              <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                De organisaties hieronder hoorden dit verhaal al, en deden er wat mee. De kans is groot dat je concurrent ertussen staat.
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-10 items-center mt-12">
                {MARQUEE_LOGOS.map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className={`${LOGO_SIZE[logo.sizeTier ?? 1]} w-auto max-w-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition object-contain`}
                    />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* CTA 2 — bring it to the team */}
        <section className="section-padding bg-navy">
          <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.55)] w-full max-w-md">
                <img
                  src="/assets/origin/ferry-in-company.jpg"
                  alt="Ferry Hoes brengt Brand Humanizing in-house bij een team."
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sunny text-caption uppercase tracking-widest font-heading font-semibold">Naar je team</span>
              <h2 className="text-display md:text-display-lg text-white mt-3 leading-tight">
                Elke maand dat je wacht, geef je voorsprong weg aan wie wél beweegt.
              </h2>
              <p className="text-white/70 text-body-lg mt-5 max-w-xl">
                De talk is de vonk. De echte verandering komt als je hele team het doorleeft en er maandag naar handelt. Wij brengen Brand Humanizing naar binnen, op maat, met een founder in de zaal. Geen junior trainer.
              </p>
              <Link href="/learning" className="inline-block mt-7">
                <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  <Users className="w-4 h-4" /> Breng dit naar je team
                </Button>
              </Link>
              <p className="text-white/50 text-sm mt-6">
                Liever eerst even sparren?{" "}
                <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-white hover:text-sunny transition-colors inline-flex items-center gap-1">
                  Plan een gratis gesprek <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </div>
        </section>
        <ShareAndContact />
      </main>
      <Footer />
    </>
  );
}
