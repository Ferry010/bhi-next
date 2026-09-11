"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TALK_TO_EXPERT } from "@/lib/pricing";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-sunny section-padding">
      <div className={`container text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-display md:text-display-lg lg:text-hero text-foreground max-w-3xl mx-auto">
          Every quarter you wait, you look a little more like everyone else.
        </h2>
        <p className="text-sm md:text-body-lg text-foreground/75 mt-4 md:mt-6 max-w-xl mx-auto">
          Book a course, start with the book, or just ask a question. One message and you&apos;re on our radar. No forms into the void, no bots, no sales script.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 md:mt-10">
          <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base">
              {TALK_TO_EXPERT.label} →
            </Button>
          </a>
          <Link href="/start">
            <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/60 font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base">
              Not sure? Find your fit →
            </Button>
          </Link>
        </div>
        <p className="text-xs text-foreground/55 mt-5 font-heading">
          A free 30-minute call with a Brand Humanizer, or three quick questions if you&apos;d rather we point you first.
        </p>
      </div>
    </section>
  );
}
