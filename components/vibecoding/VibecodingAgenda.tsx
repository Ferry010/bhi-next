"use client";

import { useState } from "react";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import type { VibeContent } from "./content";

type Slot = "morning" | "afternoon";

// Afternoon is the morning example shifted four hours (13:00–16:00).
function shift(time: string, hours: number) {
  const [h, m] = time.split(":").map(Number);
  const nh = (h + hours) % 24;
  return `${String(nh).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function VibecodingAgenda({
  content,
  lang,
}: {
  content: VibeContent["agenda"];
  lang: "en" | "nl";
}) {
  const [slot, setSlot] = useState<Slot>("morning");
  const offset = slot === "afternoon" ? 4 : 0;

  const options: { key: Slot; label: string; range: string }[] = [
    { key: "morning", label: lang === "nl" ? "Ochtend" : "Morning", range: "9:00 – 12:00" },
    { key: "afternoon", label: lang === "nl" ? "Middag" : "Afternoon", range: "13:00 – 16:00" },
  ];

  return (
    <>
      <ScrollRevealSection>
        <div className="text-center mb-8">
          <h2 className="text-display md:text-display-lg text-foreground">{content.heading}</h2>
          <p className="text-body-lg text-muted-foreground mt-4">{content.sub}</p>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection>
        {/* Slot toggle — pick a morning or an afternoon */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label={lang === "nl" ? "Kies een dagdeel" : "Pick a slot"}
            className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
          >
            {options.map((o) => {
              const active = slot === o.key;
              return (
                <button
                  key={o.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSlot(o.key)}
                  className={`rounded-full px-5 py-2.5 text-center transition-colors ${
                    active
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="block font-heading font-bold text-sm md:text-base leading-tight">{o.label}</span>
                  <span className={`block text-xs tabular-nums ${active ? "text-accent-foreground/85" : "text-muted-foreground"}`}>
                    {o.range}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-10">
          <ol key={slot} className="relative border-l-2 border-border/60 space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-500">
            {content.items.map((it) => (
              <li key={it.time} className="relative pl-6 md:pl-8">
                <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-heading font-bold text-foreground tabular-nums w-16 shrink-0">
                    {shift(it.time, offset)}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{it.label}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ScrollRevealSection>
    </>
  );
}
