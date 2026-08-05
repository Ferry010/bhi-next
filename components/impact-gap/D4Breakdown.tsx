"use client";

import { D4_OPTIONS, D4_NEW_VALUE } from "@/lib/impactGap/questions";

// What the team actually answered on the most important question, as a
// distribution.
//
// This replaced a list of the team's own words. The words read harder and
// landed better, and this is the trade for having every answer comparable
// automatically. What it keeps is the thing that mattered most: the people who
// have nothing to point to are shown, not averaged away.

export default function D4Breakdown({
  counts,
  total,
  leaderAnswer,
}: {
  counts: Record<string, number>;
  total: number;
  leaderAnswer: string;
}) {
  if (total === 0) return null;

  return (
    <ul className="mt-8 space-y-3">
      {D4_OPTIONS.map((o) => {
        const n = counts[o.value] ?? 0;
        const pct = Math.round((n / total) * 100);
        const isNew = o.value === D4_NEW_VALUE;
        const isLeader = o.value === leaderAnswer;

        return (
          <li
            key={o.value}
            className={`rounded-2xl border p-5 ${
              isLeader ? "border-primary bg-primary/5" : "border-border bg-white"
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-heading font-bold text-foreground">{o.label}</span>
              <span className="font-heading text-sm font-semibold text-muted-foreground">
                {n} of {total}
              </span>
            </div>

            <div
              className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
              role="img"
              aria-label={`${n} of ${total} people, ${pct} percent`}
            >
              <div
                className={`h-full rounded-full ${isNew ? "bg-primary" : "bg-accent"}`}
                style={{ width: `${Math.max(n === 0 ? 0 : 2, pct)}%` }}
              />
            </div>

            {isLeader && (
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                This is what you answered
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
