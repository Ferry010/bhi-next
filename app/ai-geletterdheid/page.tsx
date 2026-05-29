import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, ExternalLink, ShieldCheck, Users, Brain, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/ai-geletterdheid" },
  title: "AI Geletterdheid | Wat het is, waarom het verplicht is en hoe je het aanpakt",
  description:
    "AI geletterdheid is vanaf augustus 2026 verplicht voor elke organisatie die AI gebruikt. Ontdek wat de EU AI-wet vereist, wat echte AI geletterdheid inhoudt en hoe je jouw team voorbereidt.",
  openGraph: {
    title: "AI Geletterdheid | Brand Humanizing Institute & AIGA",
    description:
      "AI geletterdheid is meer dan een compliance-vinkje. Ontdek wat het inhoudt, wat de EU AI-wet vereist en hoe het AI Geletterdheid Certificaat van AIGA jouw organisatie helpt.",
    locale: "nl_NL",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "AI Geletterdheid: wat het is, waarom het verplicht is en hoe je het aanpakt",
      description:
        "Een volledig overzicht van AI geletterdheid, de EU AI-wet (Artikel 4), en hoe organisaties hun medewerkers kunnen voorbereiden via het AI Geletterdheid Certificaat van AIGA.",
      url: "https://brandhumanizing.com/ai-geletterdheid",
      inLanguage: "nl",
      author: [
        { "@type": "Person", name: "Ferry Hoes", url: "https://brandhumanizing.com/about" },
        { "@type": "Person", name: "Jonathan Flores", url: "https://brandhumanizing.com/about" },
      ],
      publisher: {
        "@type": "Organization",
        name: "Brand Humanizing Institute",
        url: "https://brandhumanizing.com",
      },
    },
    {
      "@type": "Course",
      name: "AI Geletterdheid Certificaat",
      description:
        "EU AI Act Artikel 4 gecertificeerde training in AI geletterdheid voor medewerkers en organisaties. Ontwikkeld door Brand Humanizing Institute en Speakers Academy, aangeboden via AIGA.",
      provider: {
        "@type": "Organization",
        name: "AIGA – AI Geletterdheid Academy",
        url: "https://aigeletterdheid.academy",
      },
      courseMode: "online",
      inLanguage: "nl",
      timeRequired: "PT3H",
      educationalLevel: "Professional",
      teaches: "AI geletterdheid, EU AI-wet naleving, kritisch denken over kunstmatige intelligentie",
    },
    {
      "@type": "Organization",
      name: "AIGA – AI Geletterdheid Academy",
      url: "https://aigeletterdheid.academy",
      description:
        "AIGA is het zusterinstituut van Brand Humanizing Institute, ontwikkeld in samenwerking met Speakers Academy. AIGA biedt EU AI Act Artikel 4 gecertificeerde AI geletterdheid training.",
      parentOrganization: {
        "@type": "Organization",
        name: "Brand Humanizing Institute",
        url: "https://brandhumanizing.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wat is AI geletterdheid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI geletterdheid is het vermogen om te begrijpen hoe AI-systemen werken, wat ze wel en niet kunnen, en hoe je er als professional kritisch en verantwoord mee omgaat. Het gaat verder dan technische kennis: het is ook het vermogen om te oordelen waar AI vertrouwd kan worden en waar menselijk inzicht onvervangbaar is.",
          },
        },
        {
          "@type": "Question",
          name: "Wanneer wordt AI geletterdheid verplicht?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De EU AI-wet verplicht alle organisaties die AI inzetten om te zorgen dat hun medewerkers voldoende AI-geletterd zijn. De handhaving van Artikel 4 gaat in op 2 augustus 2026. Organisaties zonder aantoonbare naleving riskeren boetes tot EUR 35 miljoen.",
          },
        },
        {
          "@type": "Question",
          name: "Wat zegt Artikel 4 van de EU AI-wet precies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Artikel 4 van de EU AI-wet verplicht aanbieders en inzetters van AI-systemen om maatregelen te treffen die zorgen voor een voldoende niveau van AI-geletterdheid bij hun medewerkers. Dat betekent dat medewerkers moeten begrijpen wat AI is, hoe het werkt, wat de risico's zijn en hoe ze er verantwoord gebruik van kunnen maken.",
          },
        },
        {
          "@type": "Question",
          name: "Voor wie is de AIGA-training bedoeld?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De training is bedoeld voor alle medewerkers die in hun werk gebruikmaken van AI-tools, ongeacht functie of sector. Van communicatieprofessionals tot HR-medewerkers, van managers tot juristen. AI geletterdheid is een organisatiebrede competentie.",
          },
        },
        {
          "@type": "Question",
          name: "Wat is het verschil tussen AIGA en Brand Humanizing Institute?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Brand Humanizing Institute ontwikkelt de strategische kaders voor organisaties die menselijke en technologische krachten willen combineren. AIGA is het zusterinstituut, ontwikkeld samen met Speakers Academy, specifiek gericht op AI geletterdheid en EU AI-wet naleving. De twee instituten werken samen en versterken elkaar.",
          },
        },
        {
          "@type": "Question",
          name: "Hoe lang duurt de AIGA-training?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De training duurt 3 tot 4 uur en is volledig online beschikbaar. Medewerkers kunnen hem in eigen tempo volgen. Bij voltooiing ontvangen zij een certificaat dat geldt als documentatie voor EU AI Act Artikel 4 naleving.",
          },
        },
      ],
    },
  ],
};

const outcomes = [
  { icon: ShieldCheck, text: "Certificaat dat geldt als documentatie voor EU AI Act Artikel 4 naleving" },
  { icon: Brain, text: "Echt begrip van hoe AI-systemen werken en wat hun beperkingen zijn" },
  { icon: CheckCircle2, text: "Het vermogen om te beoordelen waar AI betrouwbaar is en waar niet" },
  { icon: Users, text: "Een gedeelde taal binnen jouw organisatie over mens en technologie" },
];

const faqs = [
  {
    q: "Wat is AI geletterdheid precies?",
    a: "AI geletterdheid is het vermogen om te begrijpen hoe AI-systemen werken, wat ze wel en niet kunnen, en hoe je er als professional kritisch en verantwoord mee omgaat. Het gaat verder dan technische kennis: het is ook het vermogen om te oordelen waar AI vertrouwd kan worden en waar menselijk inzicht onvervangbaar is.",
  },
  {
    q: "Wanneer wordt AI geletterdheid verplicht?",
    a: "De EU AI-wet verplicht alle organisaties die AI inzetten om te zorgen dat hun medewerkers voldoende AI-geletterd zijn. De handhaving van Artikel 4 gaat in op 2 augustus 2026. Organisaties zonder aantoonbare naleving riskeren boetes tot EUR 35 miljoen.",
  },
  {
    q: "Wat zegt Artikel 4 van de EU AI-wet precies?",
    a: "Artikel 4 verplicht aanbieders en inzetters van AI-systemen om maatregelen te treffen die zorgen voor een voldoende niveau van AI-geletterdheid bij hun medewerkers. Dat betekent: medewerkers moeten begrijpen wat AI is, hoe het werkt, wat de risico's zijn en hoe ze er verantwoord gebruik van kunnen maken.",
  },
  {
    q: "Voor wie is de AIGA-training bedoeld?",
    a: "Voor alle medewerkers die in hun werk gebruikmaken van AI-tools, ongeacht functie of sector. Van communicatieprofessionals tot HR-medewerkers, van managers tot juristen. AI geletterdheid is een organisatiebrede competentie, geen IT-aangelegenheid.",
  },
  {
    q: "Wat is het verschil tussen AIGA en Brand Humanizing Institute?",
    a: "Brand Humanizing Institute ontwikkelt de strategische kaders voor organisaties die menselijke en technologische krachten willen combineren. AIGA is het zusterinstituut, ontwikkeld samen met Speakers Academy, specifiek gericht op AI geletterdheid en EU AI-wet naleving. De twee instituten werken samen en versterken elkaar.",
  },
  {
    q: "Hoe lang duurt de training en wat kost het?",
    a: "De training duurt 3 tot 4 uur en is volledig online beschikbaar. Medewerkers kunnen hem in eigen tempo volgen. Bij voltooiing ontvangen zij een certificaat. Voor actuele prijsinformatie en teaminschrijvingen, bezoek aigeletterdheid.academy.",
  },
];

export default function AIGeletterdheid() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar variant="light" />
      <main>

        {/* Hero */}
        <section className="bg-secondary min-h-[80vh] flex items-center relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container max-w-4xl pt-28 md:pt-40 pb-16 md:pb-24 relative z-10">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              EU AI Act · Artikel 4 · AIGA
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              AI Geletterdheid.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
              Vanaf 2 augustus 2026 zijn organisaties wettelijk verplicht om te zorgen dat hun
              medewerkers voldoende AI-geletterd zijn. Maar echte AI geletterdheid is meer dan een
              compliance-vinkje. Het is de vaardigheid om intelligent met AI te werken: te begrijpen
              wat het kan, wat het niet kan, en wanneer jij onvervangbaar bent.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Ga naar aigeletterdheid.academy <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/learning/ai-literacy-certificate">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 text-foreground hover:border-foreground hover:bg-foreground/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                  Meer over het certificaat <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why now */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Waarom nu</span>
              <h2 className="text-display md:text-display-lg text-white mt-4 mb-6">
                De EU AI-wet is geen ver-van-je-bed-show.
              </h2>
              <p className="text-body-lg text-white/80 leading-relaxed">
                De Europese AI-wet (de EU AI Act) trad in werking in augustus 2024. Artikel 4 stelt
                uitdrukkelijk dat alle organisaties die AI inzetten moeten zorgen voor aantoonbare AI
                geletterdheid bij hun medewerkers. De handhaving van dit artikel gaat in op
                <strong className="text-white"> 2 augustus 2026</strong>. Organisaties die dan niet kunnen aantonen
                dat hun mensen voldoende AI-geletterd zijn, riskeren boetes die kunnen oplopen tot
                <strong className="text-white"> EUR 35 miljoen</strong>.
              </p>
              <p className="text-body-lg text-white/80 leading-relaxed mt-6">
                Dat betekent dat de deadline nu al dichtbij is. En dat organisaties die wachten op
                een kant-en-klare oplossing van buitenaf, straks voor een korte tijdlijn staan om
                honderden of duizenden medewerkers gecertificeerd te krijgen.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* What real AI literacy means */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Wat het inhoudt</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-4 mb-6">
                AI geletterdheid is geen technische vaardigheid.
              </h2>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                De meest gemaakte fout is denken dat AI geletterdheid voor IT-afdelingen is. Dat is
                het niet. AI geletterdheid is een competentie voor iedereen die in zijn of haar werk
                gebruikmaakt van AI-tools. En dat zijn steeds meer mensen, in steeds meer functies.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed mt-6">
                Echte AI geletterdheid betekent dat medewerkers begrijpen hoe AI-systemen werken en
                hoe ze kunnen falen. Dat ze kunnen beoordelen wanneer een AI-uitkomst betrouwbaar is
                en wanneer niet. Dat ze weten waar hun eigen oordeel en ervaring doorslaggevend is.
                En dat ze dit kunnen uitleggen aan collega's en klanten.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed mt-6">
                Dat is precies wat het Brand Humanizing framework al jaren onderwijst: de combinatie
                van technologisch begrip, kritisch denken en menselijk inzicht. AIGA brengt dit samen
                in een gecertificeerde training die voldoet aan de eisen van de EU AI-wet.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* The 4 skills */}
        <section className="section-padding bg-white">
          <div className="container max-w-4xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De vier vaardigheden</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-4">
                  Het fundament van AI geletterdheid.
                </h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  De AIGA-training is gebouwd op het Brand Humanizing raamwerk: vier vaardigheden
                  die bepalen of een professional effectief en verantwoord met AI kan werken.
                </p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Creativiteit en organisatiebewustzijn",
                  body: "Het vermogen om AI-toepassingen te beoordelen in de context van je organisatie: wat past bij onze doelen, onze cultuur, onze klanten?",
                },
                {
                  title: "Gedragswetenschappen en onderzoek",
                  body: "Begrijpen hoe mensen reageren op AI-gestuurde processen en wanneer menselijke interactie de uitkomst bepaalt.",
                },
                {
                  title: "Programmeren, automatisering en AI",
                  body: "Geen code schrijven, maar begrijpen hoe AI-systemen zijn opgebouwd, wat ze doen met data en waar ze structureel falen.",
                },
                {
                  title: "Emotionele intelligentie en ethiek",
                  body: "Het oordeel om te herkennen wanneer een AI-beslissing menselijk toezicht vereist en de moed om dat ook te zeggen.",
                },
              ].map((skill) => (
                <ScrollRevealSection key={skill.title}>
                  <div className="bg-secondary rounded-2xl p-6 md:p-8 h-full">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3">{skill.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{skill.body}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
            <ScrollRevealSection>
              <p className="text-center text-muted-foreground mt-8 text-sm">
                Meer over het raamwerk:{" "}
                <Link href="/the-method" className="text-accent hover:underline font-semibold">
                  De Brand Humanizing methode
                </Link>
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* AIGA training outcomes */}
        <section className="section-padding bg-navy">
          <div className="container max-w-4xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De training</span>
                <h2 className="text-display md:text-display-lg text-white mt-4">
                  Wat medewerkers meenemen.
                </h2>
                <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
                  De AIGA-training duurt 3 tot 4 uur, is volledig online en sluit af met een
                  certificaat dat geldt als documentatie voor EU AI Act Artikel 4.
                </p>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((item) => (
                <ScrollRevealSection key={item.text}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start">
                    <item.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-white/90 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
            <ScrollRevealSection>
              <div className="text-center mt-10">
                <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Bekijk de training op aigeletterdheid.academy <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Collaboration section */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">De samenwerking</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-4 mb-6">
                Brand Humanizing Institute en Speakers Academy.
              </h2>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                AIGA, het AI Geletterdheid Academy, is een samenwerking tussen het Brand Humanizing
                Institute en Speakers Academy. Brand Humanizing ontwikkelt al jaren de strategische
                kaders voor organisaties die menselijke en technologische krachten willen combineren.
                Speakers Academy heeft jarenlange ervaring in het trainen van professionals in
                communicatie en presentatie.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed mt-6">
                Die combinatie is niet toevallig. AI geletterdheid vereist zowel inhoudelijke diepte
                als de didactische kwaliteit om het begrijpelijk over te brengen aan mensen die geen
                technici zijn. AIGA brengt beide samen in een training die inhoudelijk robuust is en
                die mensen ook echt iets leert.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed mt-6">
                De training is ontwikkeld in het Nederlands en momenteel beschikbaar voor Nederlandse
                en Belgische organisaties. Een Engelstalige versie is in ontwikkeling.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Bezoek aigeletterdheid.academy <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/about">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 text-foreground hover:border-foreground hover:bg-foreground/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                    Over Brand Humanizing Institute <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title="Veelgestelde vragen over AI geletterdheid"
          faqs={faqs}
          variant="light"
          jsonLd={false}
        />

        {/* Final CTA */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-4">
                Klaar om jouw organisatie voor te bereiden?
              </h2>
              <p className="text-body-lg text-white/80 mb-8">
                De deadline is 2 augustus 2026. De training is nu beschikbaar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Ga naar aigeletterdheid.academy <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-white/70 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                    Stel een vraag <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
