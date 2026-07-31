"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, GraduationCap, Users2, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PRODUCTS, TALK_TO_EXPERT } from "@/lib/pricing";

const formats = [
  { icon: Sparkles, name: PRODUCTS.inspiration.name, duration: PRODUCTS.inspiration.duration, to: PRODUCTS.inspiration.href },
  { icon: Layers, name: PRODUCTS.halfDay.name, duration: PRODUCTS.halfDay.duration, to: PRODUCTS.halfDay.href },
  { icon: GraduationCap, name: PRODUCTS.fullDay.name, duration: PRODUCTS.fullDay.duration, to: PRODUCTS.fullDay.href },
  { icon: Users2, name: PRODUCTS.multiDay.name, duration: PRODUCTS.multiDay.duration, to: PRODUCTS.multiDay.href },
];

export default function InCompany() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container max-w-5xl">
        <div
          className="max-w-2xl"
          style={{
            transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1), transform 400ms cubic-bezier(0.23, 1, 0.32, 1)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h2 className="text-display md:text-display-lg text-white">
            You don&apos;t wait for a date. We come to you.
          </h2>
          <p className="text-body-lg text-white/75 mt-5">
            No public schedule to squeeze into. We bring the training inside your organisation, shaped around your team and your real challenges, on the day that suits you. Private, focused, built for exactly the room you&apos;re in.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {formats.map((f, i) => (
            <Link
              key={f.name}
              href={f.to}
              className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-sunny/40"
              style={{
                transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1), transform 400ms cubic-bezier(0.23, 1, 0.32, 1), background-color 300ms ease-out, border-color 300ms ease-out",
                transitionDelay: `${80 + i * 50}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <f.icon className="w-6 h-6 text-sunny mb-3" />
              <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-sunny transition-colors">
                {f.name.replace(/^The /, "")}
              </h3>
              <p className="text-white/50 text-sm mt-1">{f.duration}</p>
            </Link>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 mt-10"
          style={{
            transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1), transform 400ms cubic-bezier(0.23, 1, 0.32, 1)",
            transitionDelay: "280ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <Link href="/learning">
            <Button className="rounded-full bg-sunny text-sunny-foreground hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
              See the training formats <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="rounded-full border-[1.5px] border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto"
            >
              {TALK_TO_EXPERT.label}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
