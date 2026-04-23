"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const statements = [
  "Technology should amplify the human, not replace it.",
  "Customers aren't data points. They're people with real lives.",
  "The most durable competitive advantage is genuine care.",
  "Happy employees and loyal customers are two sides of the same coin.",
  "Short-term thinking is the enemy of great brands.",
  "Care belongs at the center of everything. Not as a value on a wall, as an actual way of working.",
  "The future of business is human. And it always has been.",
];

export default function Manifesto() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container-narrow">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">What we believe</span>
          <h2 className="text-display md:text-display-lg text-white mt-4">A few things we know to be true.</h2>
        </div>

        <div className="space-y-6 md:space-y-8">
          {statements.map((s, i) => (
            <p
              key={i}
              className={`text-lg md:text-2xl lg:text-3xl font-heading font-bold text-white/90 leading-snug transition-all duration-700 ${isVisible ? "translate-y-0" : "translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {s}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
