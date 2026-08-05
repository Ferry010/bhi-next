"use client";

import type { Verbatim } from "@/lib/impactGap/scoring";

// Your team's own words, unedited and in full.
//
// The blanks are shown rather than filtered out, because a team where four
// people out of nine could not name anything is telling you something that a
// list of only the good answers would hide. They arrive from the database
// already shuffled and with no timestamps, so the order says nothing about who
// answered when.

export default function Verbatims({ items }: { items: Verbatim[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-8 space-y-3">
      {items.map((v, i) => {
        const blank = v.cannot_name || !v.text?.trim();
        return (
          <li
            key={i}
            className={`rounded-2xl border p-5 ${
              blank ? "border-dashed border-muted-foreground/30 bg-muted/40" : "border-border bg-white"
            }`}
          >
            {blank ? (
              <p className="font-heading font-semibold text-muted-foreground">
                Could not name one
              </p>
            ) : (
              <>
                <blockquote className="text-body-lg leading-relaxed text-foreground">
                  &ldquo;{v.text}&rdquo;
                </blockquote>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {v.genuinely_new === "new"
                    ? "They called this genuinely new"
                    : "They called this the same work, faster"}
                </p>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
