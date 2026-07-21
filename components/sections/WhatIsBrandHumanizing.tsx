"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function WhatIsBrandHumanizing() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream section-padding">
      <div className="container">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-display md:text-display-lg text-foreground">
              Use AI to make your people matter more, not&nbsp;less.
            </h2>
            <div className="space-y-4 text-sm md:text-body-lg text-muted-foreground">
              <p>
                Let AI take the predictable work. That frees your people for the things technology will never do: genuine empathy, real creativity, and the human connection customers actually remember.
              </p>
              <p>
                The result is an organisation that costs less to run and is harder to leave. Lower overhead, higher loyalty, a brand competitors can&apos;t copy. We&apos;ve spent eight years proving it works. Here&apos;s exactly how.
              </p>
            </div>
            <Link href="/the-method" className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-primary hover:text-accent transition-colors pt-2">
              See the method → <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <svg viewBox="0 0 520 500" className="w-72 h-72 md:w-[420px] md:h-[400px]" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle cx="250" cy="175" r="115" fill="hsl(241 70% 78% / 0.7)" className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
                <circle cx="175" cy="275" r="115" fill="hsl(168 80% 55% / 0.75)" className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
                <circle cx="325" cy="275" r="115" fill="hsl(240 20% 88% / 0.65)" className={`transition-all duration-700 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
                <circle cx="250" cy="345" r="115" fill="hsl(21 100% 58% / 0.8)" className={`transition-all duration-700 delay-[1100ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              </g>
              <text x="250" y="125" textAnchor="middle" fill="hsl(241 89% 45%)" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                <tspan x="250" dy="0">Creativity &amp;</tspan>
                <tspan x="250" dy="15">Organizational Awareness</tspan>
              </text>
              <text x="138" y="255" textAnchor="middle" fill="hsl(241 89% 45%)" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                <tspan x="138" dy="0">Human Sciences</tspan>
                <tspan x="138" dy="15">&amp; Research</tspan>
              </text>
              <text x="362" y="255" textAnchor="middle" fill="hsl(241 89% 45%)" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                <tspan x="362" dy="0">Programming,</tspan>
                <tspan x="362" dy="15">Automation &amp; AI</tspan>
              </text>
              <text x="250" y="400" textAnchor="middle" fill="hsl(241 89% 45%)" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
                <tspan x="250" dy="0">Emotional Intelligence</tspan>
                <tspan x="250" dy="15">&amp; Ethics</tspan>
              </text>
              <path d="M250,248 C250,236 240,226 228,226 C214,226 210,240 210,240 C210,258 250,278 250,278 C250,278 290,258 290,240 C290,240 286,226 272,226 C260,226 250,236 250,248 Z" fill="hsl(340 85% 58%)" stroke="white" strokeWidth="2" />
              <text x="250" y="258" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Care</text>
              <line x1="272" y1="240" x2="430" y2="95" stroke="hsl(235 40% 13%)" strokeWidth="3" strokeDasharray="1 8" strokeLinecap="round" />
              <text x="435" y="88" textAnchor="start" fill="hsl(235 40% 13%)" fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">Brand</text>
              <text x="435" y="108" textAnchor="start" fill="hsl(235 40% 13%)" fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">Humanizer</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
