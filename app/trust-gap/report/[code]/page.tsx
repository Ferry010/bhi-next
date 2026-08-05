"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DimensionCard from "@/components/trust-gap/GapBar";
import { getReport } from "@/lib/trustGap/store";
import { scoreTrustGap, type TrustGapResult } from "@/lib/trustGap/scoring";
import { BENCHMARKS, MOVES, LITERACY_NOTE, LIMITATIONS } from "@/lib/trustGap/benchmarks";
import { isValidCodeShape } from "@/lib/trustGap/code";
import { MIN_TEAM_RESPONSES } from "@/lib/trustGap/questions";

type State = "loading" | "ok" | "missing" | "offline";

export default function ReportPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const router = useRouter();
  const [state, setState] = useState<State>("loading");
  const [result, setResult] = useState<TrustGapResult | null>(null);

  useEffect(() => {
    if (!isValidCodeShape(code)) {
      setState("missing");
      return;
    }
    getReport(code).then((r) => {
      if (!r.ok) {
        setState(r.error === "not_found" ? "missing" : "offline");
        return;
      }
      if (!r.data.unlocked) {
        router.replace(`/trust-gap/waiting/${code}`);
        return;
      }
      if (r.data.leader && r.data.team) {
        setResult(scoreTrustGap(r.data.leader, r.data.team));
        setState("ok");
      } else {
        setState("offline");
      }
    });
  }, [code, router]);

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar variant="light" />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-3xl">{children}</div>
      </main>
      <Footer />
    </>
  );

  if (state === "loading")
    return (
      <Shell>
        <p role="status" className="text-body-lg text-muted-foreground">
          Building your report…
        </p>
      </Shell>
    );

  if (state === "missing")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot find this report</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          The link may have been mistyped. If you started a diagnostic and lost the link, the
          fastest route is to run it again.
        </p>
        <Link href="/trust-gap/start" className="mt-6 inline-block font-heading font-semibold text-primary underline">
          Start again
        </Link>
      </Shell>
    );

  if (state === "offline" || !result)
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot load your report right now</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Nothing has been lost. Please try again in a few minutes.
        </p>
      </Shell>
    );

  const { score, band, dimensions, headline, responseCount, clarityIsPoor } = result;

  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* 1. The score */}
        <section className="bg-secondary pt-28 pb-14 md:pt-36">
          <div className="container max-w-3xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Your AI Trust Gap, based on {responseCount} team {responseCount === 1 ? "reply" : "replies"}
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <span className="font-heading text-[5rem] font-bold leading-none text-primary md:text-[7rem]">
                {score}
              </span>
              <span className="pb-3 font-heading text-2xl font-bold text-foreground">{band.label}</span>
            </div>
            <p className="mt-5 text-body-lg text-muted-foreground">{band.reading}</p>
            <p className="mt-4 rounded-2xl bg-cream p-5 text-sm leading-relaxed text-muted-foreground">
              This is a gap, not a grade. It measures the distance between what you believed and
              what your team reported, and a wide gap is the normal result rather than a sign of a
              bad manager. The leaders who never look have the same gap. They just cannot see it.
            </p>
          </div>
        </section>

        {/* 2. Headline finding */}
        <section className="section-padding bg-navy">
          <div className="container-narrow">
            <h2 className="text-display md:text-display-lg text-white">The main thing to look at</h2>
            <p className="mt-3 font-heading text-lg font-bold text-sunny">{headline.name}</p>
            <p className="mt-4 text-body-lg text-white/80">{headline.note}</p>
          </div>
        </section>

        {/* 3. Dimensions */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">All six, side by side</h2>
            <div className="mt-8 space-y-4">
              {dimensions.map((d) => (
                <DimensionCard key={d.id} d={d} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Benchmark */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">How this compares</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Published research on the same behaviour, so you can see whether your team is unusual.
              Mostly, teams are not.
            </p>
            <ul className="mt-8 space-y-4">
              {BENCHMARKS.map((b) => (
                <li key={b.stat} className="rounded-2xl bg-white p-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-heading text-2xl font-bold text-primary">{b.stat}</span>
                    <span className="flex-1 text-foreground">{b.claim}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Source: {b.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Three moves */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">Three things you can do</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              All three are culture moves rather than training, because training is not what closes
              this particular gap. None of them costs anything, and all of them fit inside a month.
            </p>
            <ol className="mt-8 space-y-4">
              {MOVES.map((m, i) => (
                <li key={m.title} className="rounded-2xl border border-border bg-cream p-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-heading text-xl font-bold text-accent">{i + 1}</span>
                    <h3 className="flex-1 font-heading text-lg font-bold text-foreground">{m.title}</h3>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{m.timeframe}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{m.body}</p>
                </li>
              ))}
            </ol>

            {clarityIsPoor && (
              <p className="mt-6 text-sm text-muted-foreground">
                {LITERACY_NOTE.text}{" "}
                <a
                  href={LITERACY_NOTE.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline"
                >
                  {LITERACY_NOTE.linkLabel}
                </a>
              </p>
            )}
          </div>
        </section>

        {/* 6. Limitations */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">
              What this cannot tell you
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-muted-foreground">{LIMITATIONS}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Your team's answers stay anonymous and aggregated. This report needed at least{" "}
              {MIN_TEAM_RESPONSES} replies before it would open, and individual answers are never
              stored in a way that could point back to a person.
            </p>

            {/* 7. One quiet line. No banner, no box, no urgency. */}
            <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
              If you would rather work through this with the team in the room, a{" "}
              <Link href="/learning/inspiration-session" className="font-semibold text-primary underline">
                Spark session
              </Link>{" "}
              is one hour and covers exactly this.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
