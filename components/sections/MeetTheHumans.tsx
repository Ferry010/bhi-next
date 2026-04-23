"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function MeetTheHumans() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-white section-padding">
      <div className="container">
        <div className={`grid lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative">
            <div className="w-full aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden">
              <img src="/assets/founders.jpeg" alt="Ferry Hoes and Jonathan Flores, founders of Brand Humanizing Institute" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-5 md:space-y-6">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              Who&apos;s behind this
            </span>
            <h2 className="text-display md:text-display-lg text-foreground">
              The people behind this are actual humans.
            </h2>
            <div className="space-y-4 text-sm md:text-body-lg text-muted-foreground max-w-lg">
              <p>
                Ferry Hoes and Jonathan Flores founded Brand Humanizing in 2017 after years of working inside organizations that were using data and automation in ways that felt increasingly wrong. They&apos;ve since worked with 50+ organisations across 12 countries, helping them find their human edge.
              </p>
              <p className="font-heading font-semibold text-foreground">
                When you message this website, a real human replies. Always.
              </p>
            </div>
            <Link href="/contact">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base gap-2 mt-2">
                <MessageCircle className="w-4 h-4" /> Message us directly →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
