"use client";

import Link from "next/link";
import DimensionCard from "@/components/impact-gap/DimensionCard";
import D4Breakdown from "@/components/impact-gap/D4Breakdown";
import type { ImpactGapResult } from "@/lib/impactGap/scoring";
import { REPORT_PRINT_CSS } from "@/components/impact-gap/reportPrint.css";
import { MOVES, LIMITATIONS, LITERACY_NOTE, HUMAN_STEP, CLOSING_LINE } from "@/lib/impactGap/content";

// The report itself, split from the page that fetches it so that the thing on
// screen can be rendered from any set of results. The page below it does data
// and error states, this does nothing but present what it is given.
//
// Order is fixed by the brief: score, headline, six comparisons, the team's own
// words, the mechanism when it shows up, three moves, the honest paragraph, the
// human step, and one quiet line at the very bottom.

export default function ReportView({
  result,
  teamCounts,
  leaderAnswer,
}: {
  result: ImpactGapResult;
  teamCounts: Record<string, number>;
  leaderAnswer: string;
}) {
  const unsureDimension = result.dimensions.find((d) => d.leaderUnsure);
  const sharedDimension = result.dimensions.find((d) => d.sharedBlindSpot);

  return (
    <main className="print-ink">
      <style dangerouslySetInnerHTML={{ __html: REPORT_PRINT_CSS }} />

      {/* Print button. Hidden from the printout itself, obviously. */}
      <div className="print-hide fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-foreground px-5 py-3 font-heading text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Save as PDF
        </button>
      </div>

      {/* 1. The score and the band */}
      <section className="bg-secondary pt-28 pb-12 md:pt-36">
        <div className="container max-w-3xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Your Impact Gap, from {result.responseCount} replies
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
            <span className="font-heading text-[5rem] font-extrabold leading-none text-primary md:text-[7rem]">
              {result.score}
            </span>
            <span className="pb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
              {result.band.label}
            </span>
          </div>
          <p className="mt-6 text-body-lg text-muted-foreground">{result.band.reading}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is a gap, not a grade. It measures the distance between what you believed and what
            your team reported, and it says nothing about whether you are any good at your job. A
            leader who runs this and finds a wide gap is in a better position than one who never
            asked, because the gap was already there this morning.
          </p>
        </div>
      </section>

      {/* 2. The headline finding, written to be forwarded */}
      <section className="bg-secondary pb-12">
        <div className="container max-w-3xl">
          <div className="rounded-2xl bg-navy p-6 md:p-8">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
              The finding
            </h2>
            <p className="mt-3 font-heading text-xl leading-snug text-white md:text-2xl">
              {result.headline}
            </p>
          </div>
        </div>
      </section>

      {/* 3. The six dimensions */}
      <section className="bg-secondary pb-16">
        <div className="container max-w-3xl">
          <h2 className="text-display text-foreground">The six comparisons</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Your answer against your team&apos;s, on each of the six. The number on each card is how
            far apart the two sides are, out of 100.
          </p>
          <div className="mt-8 space-y-5">
            {result.dimensions.map((d) => (
              <div key={d.id} className="print-keep">
                <DimensionCard d={d} />
              </div>
            ))}
          </div>

          {unsureDimension && (
            <div className="mt-6 rounded-2xl border-2 border-sunny bg-sunny/10 p-6">
              <h3 className="font-heading font-bold text-foreground">Worth pulling out on its own</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You answered &ldquo;I do not know&rdquo; on where the freed-up time went. That is
                scored as a wide gap, and it should be read as the most honest answer available
                rather than as a failing. Almost nobody tracks this, because freed-up time leaves no
                trace unless someone decides in advance to look for it. It does mean the first move
                below is the one to start with.
              </p>
            </div>
          )}

          {sharedDimension && (
            <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
              <h3 className="font-heading font-bold text-foreground">One you already agree on</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You and your team both said that nobody has decided what the freed-up time is for.
                There is no disagreement to unpick here and nobody to persuade, which makes it the
                cheapest thing in this report to change. It is a shared problem rather than
                anybody&apos;s fault.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. What the team answered on the question the test is built around */}
      <section className="section-padding bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-display text-foreground">What your team actually said</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Every answer to the question about what they can do now that they could not do eighteen
            months ago. Your own answer is marked. The people with nothing to point to are shown
            rather than averaged away, because they are the point.
          </p>
          <D4Breakdown
            counts={teamCounts}
            total={result.responseCount}
            leaderAnswer={leaderAnswer}
          />
        </div>
      </section>

      {/* 5. The mechanism, only when the pair reveals it */}
      {result.mechanism.revealed && (
        <section className="section-padding bg-navy">
          <div className="container-narrow">
            <h2 className="text-display text-white">Why the time never surfaced</h2>
            <p className="mt-5 text-body-lg text-white/80">{result.mechanism.explanation}</p>
          </div>
        </section>
      )}

      {/* 6. Three moves */}
      <section className="section-padding bg-cream print-break-before">
        <div className="container max-w-3xl">
          <h2 className="text-display text-foreground">Three things to do about it</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            All three are doable inside a month, none of them costs anything, and none of them is
            training. Training is what gets bought when the harder decision is the one that actually
            needs making, and on these answers the harder decision is about permission and where the
            time is supposed to go.
          </p>
          <ol className="mt-8 space-y-5">
            {MOVES.map((m, i) => (
              <li key={m.title} className="rounded-2xl bg-white p-6">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-heading font-bold text-primary-foreground"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{m.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {m.timeframe}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {result.literacyLikely && (
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {LITERACY_NOTE.text}{" "}
              <a
                href={LITERACY_NOTE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                {LITERACY_NOTE.linkLabel}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* 7. What this cannot tell you */}
      <section className="section-padding bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-display text-foreground">What this cannot tell you</h2>
          <p className="mt-5 text-body-lg text-muted-foreground">{LIMITATIONS}</p>
        </div>
      </section>

      {/* 8. The human step */}
      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-display text-foreground">Someone is reading this</h2>
          <p className="mt-5 text-body-lg text-muted-foreground">{HUMAN_STEP}</p>
        </div>
      </section>

      {/* 9. One quiet line. No box, no urgency, no second CTA. */}
      <section className="bg-white pb-16 pt-2">
        <div className="container max-w-3xl">
          <p className="text-sm text-muted-foreground">
            {CLOSING_LINE.before}
            <Link
              href={CLOSING_LINE.href}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {CLOSING_LINE.linkLabel}
            </Link>
            {CLOSING_LINE.after}
          </p>
        </div>
      </section>
    </main>
  );
}
