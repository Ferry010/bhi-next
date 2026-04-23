"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const setupLines = [
  "Every organisation is plugging in technology and automation. And it's working. Things are faster. Cheaper. More efficient.",
  "But your competitors are embedding the same technology. Automating the processes. Generating the same content. Building the same customer journeys.",
  "You're all becoming copies of each other. And the thing that made people choose you is quietly disappearing.",
];

const payoffLines = [
  "The organisations that win the next decade won't be the ones with the best technology. They'll be the ones that use technology to make their people matter more.",
  "That's Brand Humanizing.",
];

export default function DisruptionStatement() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container-narrow">
        <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">THE SHIFT</span>
        <div className="space-y-6 md:space-y-8 mt-8">
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
        </div>
      </div>
    </section>
  );
}
