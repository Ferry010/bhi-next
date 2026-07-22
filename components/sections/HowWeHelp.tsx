"use client";

import Link from "next/link";
import { GraduationCap, Award, FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TALK_TO_EXPERT } from "@/lib/pricing";

const cards = [
  {
    icon: GraduationCap,
    title: "Wake your team up",
    body: "Your people leave with a new lens on AI and their own work, and the shared language to act on it. From a 1-hour spark session to a full-day deep dive. Not a lecture. A shift you can feel in the room the next morning.",
    cta: "Book a session →",
    to: "/learning",
    primary: true,
  },
  {
    icon: Award,
    title: "Get certified",
    body: "Become the person your organisation turns to for staying human through the AI shift. Certify your team in AI literacy now, or join the waitlist to become a certified Brand Humanizer.",
    cta: "Get certified →",
    to: "/certification",
    primary: true,
  },
  {
    icon: FlaskConical,
    title: "See the evidence",
    body: "Independent research on technology, organisational behaviour, and what actually makes people choose one brand over another. Free, because proof shouldn't sit behind a paywall while your competitors guess.",
    cta: "Read the research",
    to: "/research",
    primary: false,
  },
];

export default function HowWeHelp() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="how-we-help" className="bg-cream section-padding">
      <div className="container">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-display md:text-display-lg text-foreground">Pick where you want to start.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6 md:p-10 flex flex-col hover-lift transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center mb-4 md:mb-6">
                <c.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg md:text-section mb-2 md:mb-3 text-foreground">{c.title}</h3>
              <p className="text-sm md:text-body-lg text-muted-foreground mb-6 md:mb-8 flex-1">
                {c.body}
              </p>
              {c.primary ? (
                <Link href={c.to}>
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm">
                    {c.cta}
                  </Button>
                </Link>
              ) : (
                <Link href={c.to} className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-primary hover:text-accent transition-colors">
                  {c.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Not sure which fits?{" "}
          <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-primary hover:text-accent transition-colors">
            Talk to an expert →
          </a>
        </p>
      </div>
    </section>
  );
}
