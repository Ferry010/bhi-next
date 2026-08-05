// Single source of truth for factual claims made across the site.
//
// Anything here is a real, checkable fact. If a number is not verified, it does
// not belong in this file. Years are derived rather than written down, because
// a hardcoded "eight years" silently becomes wrong every January.

export const FOUNDED_YEAR = 2017;

/** Whole years since Brand Humanizing was coined. Recomputed on every render. */
export function yearsActive(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
] as const;

/** "nine" rather than "9", for use inside prose. Falls back to digits past 15. */
export function yearsActiveWord(now: Date = new Date()): string {
  const n = yearsActive(now);
  return WORDS[n] ?? String(n);
}

/** Same, capitalised, for the start of a sentence. */
export function YearsActiveWord(now: Date = new Date()): string {
  const w = yearsActiveWord(now);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/** Organisations worked with. Kept as a "+" because it is a floor, not a count. */
export const ORG_COUNT = "50+";

/** Reach of the client roster. Confirmed 2026-07. */
export const GEOGRAPHY = "across the globe";
