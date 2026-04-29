import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight } from "lucide-react";
import Manifesto from "@/components/sections/Manifesto";
import OriginStory from "@/components/sections/OriginStory";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About | Brand Humanizing Institute",
  description:
    "Meet Ferry Hoes and Jonathan Flores, the founders of Brand Humanizing Institute. Rotterdam, 2017.",
  openGraph: { images: [{ url: "/og/about.jpg" }] },
};

const teamMembers = [
  {
    id: "ferry",
    name: "Ferry Hoes",
    role: "Co-founder, Speaker, Strategist",
    photo: "/assets/ferry.jpg",
    alt: "Ferry Hoes, co-founder Brand Humanizing Institute",
    rotation: "-rotate-2",
    bio: [
      "Ferry spent a decade in corporate marketing and sales before co-creating Brand Humanizing with Jonathan Flores in 2017.",
      "He is a public speaker, represented by Speakers Academy, and has delivered keynotes and workshops for organizations across 12 countries. He won the Dutch Government AI Hackathon in 2020.",
      "His background spans social psychology, change management, and innovation management.",
    ],
    email: "ferry@brandhumanizing.com",
  },
  {
    id: "jonathan",
    name: "Jonathan Flores",
    role: "Co-founder, Researcher, Methodologist",
    photo: "/assets/jonathan.jpg",
    alt: "Jonathan Flores, co-founder Brand Humanizing Institute",
    rotation: "rotate-2",
    bio: [
      "Jonathan is the research architecture behind Brand Humanizing.",
      "While Ferry is typically the one in the room, Jonathan is typically the one making sure what Ferry says is actually right. He co-founded Brand Humanizing in 2017 and has been building the methodological and research foundation ever since.",
    ],
    email: "jonathan@brandhumanizing.com",
  },
];

const faqs = [
  { q: "Where are you based?", a: "Rotterdam, the Netherlands. We deliver sessions across Europe and remotely worldwide." },
  { q: "How many organisations have you worked with?", a: "50+ organisations across 12 countries, spanning financial services, healthcare, tech, FMCG, government, and education." },
  { q: "Can Ferry speak at our event?", a: "Yes. Keynotes and event appearances go through Speakers Academy. Workshops and sessions are booked directly through this website." },
  { q: "Do you work with non-profits?", a: "Yes, and we offer a reduced rate for non-profit organizations. Reach out directly." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary min-h-[60vh] flex items-center relative pt-28 md:pt-36 pb-16">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "About" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">The humans behind this</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              Actual people. Actual opinions.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Ferry Hoes and Jonathan Flores founded Brand Humanizing in 2017. The organization they run deliberately stays small so the quality stays high.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              {teamMembers.map((member) => (
                <ScrollRevealSection key={member.id}>
                  <div className="space-y-5">
                    <div className={`w-full aspect-[4/5] rounded-3xl overflow-hidden ${member.rotation} transition-transform hover:rotate-0 duration-300 max-w-xs`}>
                      <img src={member.photo} alt={member.alt} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-foreground">{member.name}</h2>
                      <p className="text-accent font-heading font-semibold text-sm mt-1">{member.role}</p>
                    </div>
                    <div className="space-y-3">
                      {member.bio.map((para, i) => (
                        <p key={i} className="text-sm md:text-body-lg text-muted-foreground leading-relaxed">{para}</p>
                      ))}
                    </div>
                    <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-accent hover:underline">
                      {member.email} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <OriginStory />
        <Manifesto />

        <section className="section-padding bg-cream">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-6">Want to work with us?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Get in touch <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/our-story">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base">
                    Read the full story
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />
      </main>
      <Footer />
    </>
  );
}
