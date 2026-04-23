"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-secondary pt-28 pb-16 md:pt-44 md:pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-8 items-center">
          <div className="space-y-5 md:space-y-8 min-w-0">
            <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest">
              The Human Edge in a Digital World
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground break-words">
              Everyone can copy your technology. No one can copy your <span className="text-primary">people.</span>
            </h1>
            <div className="max-w-lg space-y-2">
              <p className="text-base md:text-lg font-heading font-semibold text-foreground">
                Every organisation is automating. Most are becoming less human in the process.
              </p>
              <p className="text-sm md:text-body-lg text-text-light">
                Brand Humanizing is the philosophy, strategy, and way of working for organisations that understand this is a choice and choose differently.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link href="/the-method">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base w-full sm:w-auto">
                  See what Brand Humanizing is →
                </Button>
              </Link>
              <Link href="/work-with-us">
                <Button variant="outline" className="rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base w-full sm:w-auto">
                  Work with us →
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="text-xs text-muted-foreground font-heading">I want to:</span>
              <Link href="/learning" className="rounded-full border border-foreground/20 hover:border-foreground/40 px-3 h-7 text-xs font-heading font-semibold text-foreground/70 hover:text-foreground inline-flex items-center transition-colors">
                Train my team
              </Link>
              <Link href="/work-with-us" className="rounded-full border border-foreground/20 hover:border-foreground/40 px-3 h-7 text-xs font-heading font-semibold text-foreground/70 hover:text-foreground inline-flex items-center transition-colors">
                Start a project
              </Link>
              <Link href="/research" className="rounded-full border border-foreground/20 hover:border-foreground/40 px-3 h-7 text-xs font-heading font-semibold text-foreground/70 hover:text-foreground inline-flex items-center transition-colors">
                Read the research
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -top-8 right-0 w-48 h-48 md:w-[420px] md:h-[420px] rounded-full bg-accent/10 animate-blob-float" />
            <div className="relative z-10 flex items-center justify-center w-64 h-64 md:w-[400px] md:h-[400px]">
              <div className="absolute left-2 md:left-0 top-6 md:top-4 -rotate-3 bg-white p-2 pb-6 md:p-3 md:pb-8 rounded-lg shadow-xl z-10 transition-transform hover:-rotate-6 hover:scale-105">
                <div className="w-28 h-36 md:w-48 md:h-56 overflow-hidden rounded-sm">
                  <img src="/assets/ferry.jpg" alt="Ferry Hoes" className="w-full h-full object-cover" />
                </div>
                <p className="font-handwritten text-xs md:text-sm text-foreground/70 text-center mt-1 md:mt-2">Ferry</p>
              </div>
              <div className="absolute right-2 md:right-0 -top-2 md:-top-4 rotate-2 bg-white p-2 pb-6 md:p-3 md:pb-8 rounded-lg shadow-xl z-20 transition-transform hover:rotate-6 hover:scale-105">
                <div className="w-28 h-36 md:w-48 md:h-56 overflow-hidden rounded-sm">
                  <img src="/assets/jonathan.jpg" alt="Jonathan Flores" className="w-full h-full object-cover" />
                </div>
                <p className="font-handwritten text-xs md:text-sm text-foreground/70 text-center mt-1 md:mt-2">Jonathan</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-2 md:-right-4 bg-card shadow-lg rounded-2xl px-3 py-1.5 md:px-4 md:py-2 z-30 rotate-2">
              <p className="font-handwritten text-xs md:text-lg text-foreground">
                Ferry & Jonathan <span className="text-accent">(actual humans)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
