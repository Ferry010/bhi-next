import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What is Brand Humanizing? | Definition, Origin & Framework",
  description: "Brand Humanizing is a strategy that uses technology to amplify human talent, not replace it. The definition, origin, four skills, and pyramid explained.",
  openGraph: { images: [{ url: "/og/what-is-brand-humanizing.jpg" }] },
};

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Brand Humanizing",
  description: "Brand Humanizing is a strategic framework that helps organisations build sustainable competitive advantage by deliberately combining human talent and technology. Developed by Ferry Hoes and Jonathan Flores in 2017, it provides a structured approach to identify where human skills matter most and where automation should be deployed.",
  url: "https://brandhumanizing.com/what-is-brand-humanizing",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "Brand Humanizing Glossary",
    url: "https://brandhumanizing.com/glossary",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brand Humanizing Institute",
  url: "https://brandhumanizing.com",
  foundingDate: "2017",
  founder: [
    { "@type": "Person", name: "Ferry Hoes" },
    { "@type": "Person", name: "Jonathan Flores" },
  ],
};

export default function WhatIsBrandHumanizingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([definedTermSchema, orgSchema]) }}
      />
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="bg-secondary section-padding">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "What is Brand Humanizing?" },
              ]}
              variant="light"
            />
            <h1 className="text-hero mt-4 text-foreground">
              What is Brand Humanizing?
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 leading-relaxed">
              <strong className="text-foreground">Brand Humanizing is a strategic framework that helps organisations build sustainable competitive advantage by deliberately combining human talent and technology.</strong>{" "}
              It is not a marketing concept. It is a proven competitive strategy for organisations that want to use technology to amplify their people, not replace them.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-3xl space-y-6">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              The origin
            </span>
            <h2 className="text-display md:text-display-lg text-foreground">
              Where it started
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              In 2017, Ferry Hoes and Jonathan Flores were working with McDonald&apos;s when they noticed something that would change the direction of their careers. The organisations investing most heavily in technology were not necessarily becoming better at what they did. In many cases, they were losing the very thing that made them distinctive: the human element.
            </p>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              That observation led to eight years of applied research, working with organisations across industries and developing a framework for what it takes to remain irreplaceably human in an increasingly automated world. The result is <Link href="/the-method" className="text-accent hover:underline">the Brand Humanizing methodology</Link>: a structured, evidence-based approach to building organisations where technology and people work together deliberately, not accidentally.
            </p>
          </div>
        </section>

        <section className="bg-cream section-padding">
          <div className="container max-w-3xl space-y-6">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              The framework
            </span>
            <h2 className="text-display md:text-display-lg text-foreground">
              The four skills every future-proof organisation needs
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Brand Humanizing identifies four organisational capabilities that AI cannot replicate and that create the most value when developed deliberately:
            </p>
            <ol className="space-y-6 list-none pl-0">
              {[
                {
                  title: "Creativity & Organisational Awareness",
                  desc: "The ability to generate novel solutions, make unexpected connections, and see what needs to change before the data shows it.",
                },
                {
                  title: "Human Sciences & Research",
                  desc: "A working understanding of how people actually behave, grounded in psychology, sociology, and behavioural science, not assumptions.",
                },
                {
                  title: "Programming, Automation & AI",
                  desc: "The capability to understand, evaluate, and work with AI tools critically, knowing when to use them and when not to.",
                },
                {
                  title: "Emotional Intelligence & Ethics",
                  desc: "The operating system for everything else: the ability to read people, manage emotions, and make sound ethical judgments under pressure.",
                },
              ].map((skill, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">{skill.title}</h3>
                    <p className="text-muted-foreground mt-1">{skill.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground">
              Read the full analysis:{" "}
              <Link href="/blog/the-four-skills-every-future-proof-organisation-needs" className="text-accent hover:underline">
                The Four Skills Every Future-Proof Organisation Needs →
              </Link>
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-3xl space-y-6">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              The model
            </span>
            <h2 className="text-display md:text-display-lg text-foreground">
              The Brand Humanizing Pyramid
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              The four skills converge in the{" "}
              <Link href="/glossary#brand-humanizing-pyramid" className="text-accent hover:underline">Brand Humanizing Pyramid</Link>,
              a visual model with <strong className="text-foreground">Care</strong> at its centre. Care is the connective tissue: the genuine concern for people, for quality, for doing work that matters. Without it, the skills are just competencies. With it, they become a strategy.
            </p>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              The person who embodies all four skills, connected by care, is what we call the{" "}
              <Link href="/glossary#brand-humanizer" className="text-accent hover:underline">Brand Humanizer</Link>:
              the kind of professional every organisation needs and very few are deliberately developing.
            </p>
          </div>
        </section>

        <section className="bg-navy section-padding">
          <div className="container max-w-3xl text-center space-y-6">
            <h2 className="text-display md:text-display-lg text-white">
              Go deeper
            </h2>
            <p className="text-body-lg text-white/70 max-w-xl mx-auto">
              Brand Humanizing is more than a concept. It&apos;s a methodology you can learn, a strategy you can implement, and a movement you can join.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/the-method">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-11 text-sm gap-2">
                  Explore the methodology <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href="/research">
                <Button variant="outline" className="rounded-full border-[1.5px] border-white/40 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-6 h-11 text-sm gap-2">
                  Read the research <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href="/learning">
                <Button variant="outline" className="rounded-full border-[1.5px] border-white/40 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-6 h-11 text-sm gap-2">
                  Join a session <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/40 pt-2">
              Or explore the{" "}
              <Link href="/book" className="text-accent hover:underline">book</Link>{" "}
              and the{" "}
              <Link href="/glossary" className="text-accent hover:underline">glossary of key concepts</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
