import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEVELS, type LevelKey, type Level } from "@/lib/pricing";

// The four levels as a staircase: each step sits one riser higher than the one
// before, so "where am I, and what's above me" reads at a glance. `current`
// marks a level (the page you're on, or your /start result).
//
//   full    — homepage, /learning, /start: who it's for, commitment, price, CTA
//   compact — product pages: a slim strip that shows where this page sits

const RISERS = ["md:h-4", "md:h-10", "md:h-16", "md:h-[5.5rem]"];
const RISER_TONE = ["bg-primary/15", "bg-primary/30", "bg-primary/55", "bg-primary"];

function LevelLink({ l, className, children }: { l: Level; className: string; children: React.ReactNode }) {
  return l.cta.external ? (
    <a href={l.cta.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={l.cta.href} className={className}>
      {children}
    </Link>
  );
}

export default function Ladder({
  current,
  currentLabel = "You are here",
  variant = "full",
  showFinder = true,
}: {
  current?: LevelKey;
  currentLabel?: string;
  variant?: "full" | "compact";
  showFinder?: boolean;
}) {
  const compact = variant === "compact";

  return (
    <div>
      <ol className="grid md:grid-cols-4 gap-3 md:gap-4 md:items-end">
        {LEVELS.map((l, i) => {
          const on = l.key === current;
          return (
            <li key={l.key} className="flex flex-col">
              <div
                className={`relative flex-1 rounded-2xl p-5 md:p-6 flex flex-col transition-shadow ${
                  compact ? "" : "md:min-h-[17.5rem]"
                } ${
                  on
                    ? "bg-primary text-white shadow-[0_8px_32px_rgba(17,84,172,0.35)]"
                    : "bg-white text-foreground border border-border/60 shadow-[0_4px_24px_rgba(18,21,46,0.06)] hover:shadow-lg"
                }`}
              >
                {on && (
                  <span className="absolute -top-3 left-5 bg-sunny text-sunny-foreground text-[11px] font-heading font-bold uppercase tracking-wider rounded-md px-2.5 py-1">
                    {currentLabel}
                  </span>
                )}
                <p className={`text-xs font-heading font-semibold uppercase tracking-widest ${on ? "text-sunny" : "text-accent"}`}>
                  Level {l.level} · {l.verb}
                </p>
                <h3 className={`font-heading font-bold leading-tight mt-2 ${compact ? "text-base" : "text-xl"}`}>{l.name}</h3>

                {!compact && (
                  <p className={`text-sm leading-relaxed mt-3 flex-1 ${on ? "text-white/85" : "text-muted-foreground"}`}>{l.youAre}</p>
                )}

                <p className={`text-sm mt-3 ${on ? "text-white/80" : "text-muted-foreground"}`}>
                  {!compact && <span className="block">{l.commitment}</span>}
                  <span className={`font-heading font-semibold tabular-nums ${on ? "text-white" : "text-foreground"}`}>{l.price}</span>
                </p>

                {compact ? (
                  !on && (
                    <Link href={l.href} className="absolute inset-0 rounded-2xl" aria-label={`Level ${l.level}: ${l.name}`} />
                  )
                ) : (
                  <LevelLink
                    l={l}
                    className={`mt-4 inline-flex items-center gap-1.5 font-heading font-semibold text-sm transition-colors ${
                      on ? "text-sunny hover:text-white" : "text-primary hover:text-accent"
                    }`}
                  >
                    {l.cta.label} <ArrowRight className="w-4 h-4" />
                  </LevelLink>
                )}
              </div>
              {/* The riser: the step this level stands on. */}
              <div aria-hidden className={`hidden md:block mt-2 rounded-lg ${RISERS[i]} ${RISER_TONE[i]}`} />
            </li>
          );
        })}
      </ol>

      {showFinder && (
        <p className="text-center text-sm text-muted-foreground mt-8">
          Not sure which level you&apos;re at?{" "}
          <Link href="/start" className="font-heading font-semibold text-primary hover:text-accent transition-colors">
            Find your level in under a minute →
          </Link>
        </p>
      )}
    </div>
  );
}

/** "Level 2 of 4 · Spark": the hero marker on a level's own page. Links to #levels. */
export function LevelPill({ level }: { level: LevelKey }) {
  const l = LEVELS.find((x) => x.key === level)!;
  return (
    <a
      href="#levels"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-full px-4 py-1.5 hover:brightness-110 transition"
    >
      Level {l.level} of 4 · {l.verb}
    </a>
  );
}

/** The section near the end of a level's page: the ladder, with this page marked. */
export function LevelsSection({ current }: { current: LevelKey }) {
  const l = LEVELS.find((x) => x.key === current)!;
  return (
    <section id="levels" className="section-padding bg-cream scroll-mt-16">
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-display md:text-display-lg text-foreground">Four levels. This is level {l.level}.</h2>
          <p className="text-body-lg text-muted-foreground mt-3">Most organisations climb one level at a time.</p>
        </div>
        <Ladder current={current} variant="compact" />
      </div>
    </section>
  );
}
