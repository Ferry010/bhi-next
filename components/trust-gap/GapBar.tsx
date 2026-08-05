"use client";

import type { DimensionResult } from "@/lib/trustGap/scoring";

// Two markers on one track: what the leader believed, and what the team
// reported. The distance between them is the finding, so the distance is the
// thing the visual draws. No charting library, and no animation that carries
// meaning, so reduced motion loses nothing.

export function GapBar({ gap }: { gap: number }) {
  const width = Math.max(2, Math.min(100, gap));
  const tone = gap >= 60 ? "bg-accent" : gap >= 30 ? "bg-sunny" : "bg-primary";

  return (
    <div className="mt-4">
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Gap of ${Math.round(gap)} out of 100 on this dimension`}
      >
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function DimensionCard({ d }: { d: DimensionResult }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-heading text-lg font-bold text-foreground">{d.name}</h3>
        <span className="font-heading text-sm font-semibold text-muted-foreground">
          Gap {Math.round(d.gap)}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-cream p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            You believed
          </dt>
          <dd className="mt-1 text-foreground">{d.leaderView}</dd>
        </div>
        <div className="rounded-xl bg-cream p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your team reported
          </dt>
          <dd className="mt-1 text-foreground">{d.teamView}</dd>
        </div>
      </dl>

      <GapBar gap={d.gap} />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.note}</p>
    </div>
  );
}
