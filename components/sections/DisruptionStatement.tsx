"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const setupLines = [
  "You plugged in the technology. It's working. Faster, cheaper, more efficient. Good.",
  "So did your competitors. Same tools. Same automations. Same AI-generated content. Same customer journeys.",
  "You're becoming copies of each other. And the reason people chose you in the first place is quietly disappearing.",
];

const payoffLines = [
  "The organisations that win the next decade won't have the best technology. They'll be the ones that use it to make their people matter more. That gap is opening now, and it compounds.",
  "This is the part your competitors haven't figured out yet.",
];

export default function DisruptionStatement() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container-narrow">
        <div className="space-y-6 md:space-y-8">
          {setupLines.map((line, i) => (
            <p
              key={i}
              className={`text-base md:text-xl font-heading text-white/80 leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {line}
            </p>
          ))}
          {payoffLines.map((line, i) => (
            <p
              key={`payoff-${i}`}
              className={`text-2xl md:text-4xl font-heading font-bold leading-snug transition-all duration-700 ${
                i === payoffLines.length - 1 ? "text-accent" : "text-white"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + (setupLines.length + i) * 150}ms` }}
            >
              {line}
            </p>
          ))}
          <div
            className={`pt-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${200 + (setupLines.length + payoffLines.length) * 150}ms` }}
          >
            <Link href="/the-method" className="inline-flex items-center gap-2 font-heading font-semibold text-white hover:text-accent transition-colors group">
              See exactly how they do it
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
