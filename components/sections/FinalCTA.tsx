"use client";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TALK_TO_EXPERT } from "@/lib/pricing";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding relative overflow-hidden">
      <div className="absolute -top-28 left-1/4 w-[520px] h-[520px] glow-teal pointer-events-none" />
      <div className="absolute -bottom-28 right-1/4 w-[460px] h-[460px] glow-amber pointer-events-none" />
      <div className={`container text-center relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-display md:text-display-lg lg:text-hero text-white max-w-3xl mx-auto">
          Every quarter you wait, you look a little more like everyone else.
        </h2>
        <p className="text-sm md:text-body-lg text-white/65 mt-4 md:mt-6 max-w-xl mx-auto">
          Book a course, start with the book, or just ask a question. One message and you&apos;re on our radar. No forms into the void, no bots, no sales script.
        </p>
        <div className="flex justify-center mt-8 md:mt-10">
          <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base">
              {TALK_TO_EXPERT.label} →
            </Button>
          </a>
        </div>
        <p className="text-xs text-white/50 mt-5 font-heading">
          One 30-minute call. A real human, not a bot.
        </p>
      </div>
    </section>
  );
}
