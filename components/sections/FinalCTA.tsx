"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className={`container text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-display md:text-display-lg lg:text-hero text-white max-w-3xl mx-auto">
          Ready to make your brand unforgettably human?
        </h2>
        <p className="text-sm md:text-body-lg text-white/65 mt-4 md:mt-6 max-w-xl mx-auto">
          Whether you want to learn what Brand Humanizing is, implement it inside your organization, or stay close to the research. We&apos;re here. And yes, a real human will reply.
        </p>
        <div className="flex justify-center mt-8 md:mt-10">
          <Link href="/contact">
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base">
              Talk to us →
            </Button>
          </Link>
        </div>
        <p className="text-xs text-white/50 mt-5 font-heading">
          No sales calls unless you ask for one. A real human will reply.
        </p>
      </div>
    </section>
  );
}
