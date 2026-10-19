import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CANCELLATION } from "@/lib/pricing";

// The four questions every buyer has, answered with confidence on every level
// page: is this for us, what if plans change, is it worth it, what changes
// after. Reassure, never plant a doubt the buyer didn't have: no "catch", no
// fee table here (the full ladder lives in the terms).
export interface Honest {
  forYou: string;
  /** Points to the better level when this one isn't it. */
  elsewhere: { text: string; label: string; href: string };
  worth: string;
  after: string;
  /** Replaces the default "What if plans change?" answer (e.g. for the book). */
  q2?: { question: string; answer: string };
}

export default function HonestAnswers({ data, afterLabel = "What changes after?" }: { data: Honest; afterLabel?: string }) {
  const card = "rounded-2xl bg-cream p-6 md:p-7";
  const q = "font-heading font-bold text-lg text-foreground mb-3";
  const a = "text-muted-foreground leading-relaxed";

  return (
    <section className="section-padding bg-white">
      <div className="container max-w-5xl">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground text-center mb-10">Your questions, answered</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className={card}>
            <h3 className={q}>Is this for us?</h3>
            <p className="flex gap-2.5 text-foreground leading-relaxed">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>{data.forYou}</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              {data.elsewhere.text}{" "}
              <Link href={data.elsewhere.href} className="inline-flex items-center gap-1 font-heading font-semibold text-primary hover:text-accent">
                {data.elsewhere.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>

          <div className={card}>
            <h3 className={q}>{data.q2?.question ?? "What if plans change?"}</h3>
            {data.q2 ? (
              <p className={a}>{data.q2.answer}</p>
            ) : (
              <p className={a}>
                No problem. You can move the date once for free, up to {CANCELLATION.freeMoveDays} days before. Cancel more
                than 30 days ahead and you pay nothing. And if we ever have to cancel, it costs you nothing.{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  The details
                </Link>
              </p>
            )}
          </div>

          <div className={card}>
            <h3 className={q}>Is it worth it?</h3>
            <p className={a}>{data.worth}</p>
          </div>

          <div className={card}>
            <h3 className={q}>{afterLabel}</h3>
            <p className={a}>{data.after}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
