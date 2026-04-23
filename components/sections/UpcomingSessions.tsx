"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const sessions = [
  {
    type: "Spark Session",
    title: "Brand Humanizing in 60 Minutes",
    date: "September 18, 2026",
    location: "Rotterdam",
    spots: 6,
    to: "/contact",
  },
  {
    type: "Deep Dive Workshop",
    title: "AI Ethics & The Human Edge",
    date: "October 2, 2026",
    location: "Amsterdam",
    spots: 4,
    to: "/contact",
  },
  {
    type: "Leadership Programme",
    title: "Staying Human in a Digital World",
    date: "October 16–17, 2026",
    location: "Utrecht",
    spots: 8,
    to: "/contact",
  },
];

export default function UpcomingSessions() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream section-padding">
      <div className="container">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
            Join us live
          </span>
          <h2 className="text-display md:text-display-lg text-foreground mt-4">
            See Brand Humanizing in action.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
          {sessions.map((s, i) => (
            <div
              key={s.title}
              className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6 md:p-8 flex flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="text-accent text-xs uppercase tracking-widest font-heading font-semibold mb-3">
                {s.type}
              </span>
              <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-4">
                {s.title}
              </h3>
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-accent" />
                  {s.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent" />
                  {s.location}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Users className="w-4 h-4" />
                  {s.spots} spots left
                </div>
              </div>
              <Link href={s.to}>
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm w-full">
                  Reserve your spot →
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/learning"
            className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm rounded-full border-[1.5px] border-foreground/20 hover:border-foreground/40 px-6 h-10 transition-colors"
          >
            See all sessions →
          </Link>
        </div>
      </div>
    </section>
  );
}
