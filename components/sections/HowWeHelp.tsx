"use client";

import Link from "next/link";
import { GraduationCap, Rocket, FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  {
    icon: GraduationCap,
    title: "Learning",
    body: "From a 1-hour spark session that makes your team think differently, to a full-day deep dive that reshapes how your organization sees humans and technology. These aren't lectures. They're conversations that move things.",
    cta: "See available sessions →",
    to: "/learning",
    primary: true,
  },
  {
    icon: Rocket,
    title: "Project-Based",
    body: "Ready to implement Brand Humanizing across your organization? We work alongside your team, not above it. We roll up our sleeves, bring the research, and help you find where the human opportunities live inside your business.",
    cta: "Schedule a call →",
    to: "/contact",
    primary: true,
  },
  {
    icon: FlaskConical,
    title: "Research",
    body: "Ongoing, independent research on technology, organizational behavior, and what it means to be genuinely human at work. Freely available, because knowledge that sits behind a paywall isn't doing anyone any good.",
    cta: "Read the studies",
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
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Three ways in</span>
          <h2 className="text-display md:text-display-lg text-foreground mt-4">However deep you want to go.</h2>
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
          <Link href="/contact" className="font-heading font-semibold text-primary hover:text-accent transition-colors">
            Talk to a human first →
          </Link>
        </p>
      </div>
    </section>
  );
}
