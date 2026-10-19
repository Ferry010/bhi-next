import Link from "next/link";
import { Check, X } from "lucide-react";
import { CANCELLATION } from "@/lib/pricing";

// The four questions every buyer has, answered on every level page:
// will this work for us, what's the catch, is it worth it, what changes after.
// Written as a straight answer, not a case study. `showTerms` adds the
// cancel/move ladder (single source: CANCELLATION in lib/pricing.ts).
export interface Honest {
  forYou: string;
  notForYou: string;
  catch: string;
  worth: string;
  monday: string;
  showTerms?: boolean;
}

export default function HonestAnswers({ data, mondayLabel = "What does Monday look like?" }: { data: Honest; mondayLabel?: string }) {
  const card = "rounded-2xl bg-cream p-6 md:p-7";
  const q = "font-heading font-bold text-lg text-foreground mb-3";
  const a = "text-muted-foreground leading-relaxed";

  return (
    <section className="section-padding bg-white">
      <div className="container max-w-5xl">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground text-center mb-10">Four honest answers</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className={card}>
            <h3 className={q}>Is this for us?</h3>
            <p className="flex gap-2.5 text-foreground leading-relaxed">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>{data.forYou}</span>
            </p>
            <p className="flex gap-2.5 text-muted-foreground leading-relaxed mt-3">
              <X className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{data.notForYou}</span>
            </p>
          </div>

          <div className={card}>
            <h3 className={q}>What&apos;s the catch?</h3>
            <p className={a}>{data.catch}</p>
            {data.showTerms && (
              <div className="mt-4">
                <p className="text-sm font-heading font-semibold text-foreground mb-2">If you cancel, you pay:</p>
                <ul className="text-sm divide-y divide-border/60 rounded-xl bg-white">
                  {CANCELLATION.tiers.map((t) => (
                    <li key={t.en} className="flex justify-between gap-4 px-4 py-2">
                      <span className="text-muted-foreground">{t.en}</span>
                      <span className="font-heading font-semibold text-foreground tabular-nums">
                        {t.fee === 0 ? "Nothing" : `${t.fee}%`}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Moving the date is free once, up to {CANCELLATION.freeMoveDays} days before. If we have to cancel, you pay
                  nothing.{" "}
                  <Link href="/terms" className="underline hover:text-foreground">
                    Full terms
                  </Link>
                </p>
              </div>
            )}
          </div>

          <div className={card}>
            <h3 className={q}>Is it worth it?</h3>
            <p className={a}>{data.worth}</p>
          </div>

          <div className={card}>
            <h3 className={q}>{mondayLabel}</h3>
            <p className={a}>{data.monday}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
