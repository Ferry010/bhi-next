import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, BookOpen, Mic2, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Media | Brand Humanizing Institute",
  description:
    "Blog, podcast, research, and press. All content from the Brand Humanizing Institute.",
};

const channels = [
  {
    icon: BookOpen,
    title: "Blog",
    desc: "Essays and perspectives on technology, humanity, and the organizations brave enough to take both seriously.",
    cta: "Read the blog",
    to: "/blog",
  },
  {
    icon: Mic2,
    title: "The Human Era Podcast",
    desc: "Honest, unscripted conversations with fascinating people about technology, leadership, and what it means to be human.",
    cta: "Listen to episodes",
    to: "/podcast",
  },
  {
    icon: FileText,
    title: "Research",
    desc: "Independent research on technology, organizational behavior, and human-technology strategy. Freely available.",
    cta: "View all research",
    to: "/research",
  },
];

export default function MediaPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-16">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Media" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Media</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              Fresh thinking. Real opinions.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Blog, podcast, and research from the Brand Humanizing Institute. No fluff, no gatekeeping.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {channels.map((c) => (
                <ScrollRevealSection key={c.title}>
                  <div className="bg-cream rounded-2xl p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <c.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="font-heading font-bold text-xl text-foreground mb-3">{c.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>
                    <Link href={c.to}>
                      <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm gap-2">
                        {c.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-4">Looking for Ferry as a speaker?</h2>
              <p className="text-white/70 text-body-lg mb-8">
                Keynote appearances and event hosting go through Speakers Academy.
              </p>
              <a href="https://www.speakersacademy.com/en/request-a-quote/?speaker_id=153966" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Book via Speakers Academy <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
