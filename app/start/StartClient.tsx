"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BOOK } from "@/lib/pricing";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Answers = { who?: string; where?: string; timeline?: string };

// Three short questions. Selecting an option advances to the next step.
const STEPS = [
  {
    key: "who" as const,
    question: "Who are you looking into this for?",
    options: [
      { value: "me", label: "Just me", hint: "My own skills and understanding" },
      { value: "team", label: "My team", hint: "One team I lead or work with" },
      { value: "org", label: "My whole organisation", hint: "Across departments" },
    ],
  },
  {
    key: "where" as const,
    question: "Where are you right now?",
    options: [
      { value: "curious", label: "Curious, still figuring it out", hint: "Getting a feel for what this means" },
      { value: "wake", label: "Ready to wake the team up", hint: "Get everyone aligned and hungry to change" },
      { value: "capable", label: "Ready to build real capability", hint: "From understanding to genuinely able" },
      { value: "stick", label: "It needs to stick and change how we work", hint: "A lasting shift, not a one-off" },
    ],
  },
  {
    key: "timeline" as const,
    question: "What's your timeline?",
    options: [
      { value: "exploring", label: "Just exploring, no date yet", hint: "" },
      { value: "quarter", label: "Within a quarter", hint: "" },
      { value: "now", label: "As soon as possible, or we already have a date", hint: "" },
    ],
  },
];

type Action = { label: string; href: string; external: boolean };

// Each fit links straight to where they can act.
const RECS: Record<string, { name: string; why: string; action: Action }> = {
  book: {
    name: "The Book",
    why: "You're still forming a view, so start light. The whole method for the price of lunch. Read it, then we talk.",
    action: { label: "Get the book", href: BOOK.purchase.url, external: true },
  },
  spark: {
    name: "The Spark Session",
    why: "A one-hour in-house keynote that gets the whole team seeing AI and their work differently. The fastest way to align a room.",
    action: { label: "See the Spark Session", href: "/learning/inspiration-session", external: false },
  },
  fullday: {
    name: "The Full-Day Course",
    why: "A day that turns a curious team into a capable one, and sends them home with a 90-day plan.",
    action: { label: "See the Full-Day Course", href: "/learning/full-day-course", external: false },
  },
  taskforce: {
    name: "The Taskforce",
    why: "Sixteen weeks, your own people, one real challenge taken to a working pilot. When we leave, the capability stays.",
    action: { label: "See the Taskforce", href: "/taskforce", external: false },
  },
  assessment: {
    name: "The Self-Assessment",
    why: "Since it's just you, start by seeing exactly where you stand. The free assessment scores you across the four Brand Humanizing skills and points you to what to build next.",
    action: { label: "Take the assessment", href: "/assessment", external: false },
  },
};

type RecKey = keyof typeof RECS;

function recommend(a: Answers): RecKey {
  // Individuals can't book team training, so they get the book or the free
  // self-assessment, split by how ready they are (not always the book).
  if (a.who === "me") return a.where === "curious" ? "book" : "assessment";
  if (a.who === "org" || a.where === "stick") return "taskforce";
  if (a.where === "capable") return "fullday";
  return "spark"; // team + curious/wake
}

// One step lighter, for the "feels like too big a commitment?" fall-back.
const FALLBACK: Partial<Record<RecKey, RecKey>> = {
  taskforce: "fullday",
  fullday: "spark",
  spark: "book",
};

function TextLink({ action, children }: { action: Action; children: React.ReactNode }) {
  const cls =
    "font-heading font-semibold text-primary hover:text-accent underline-offset-2 hover:underline inline-flex items-center gap-1";
  return action.external ? (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} <ArrowRight className="w-3.5 h-3.5" />
    </a>
  ) : (
    <Link href={action.href} className={cls}>
      {children} <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );
}

export default function StartClient() {
  const [step, setStep] = useState(0); // 0-2 = questions, 3 = result
  const [answers, setAnswers] = useState<Answers>({});

  const recKey = recommend(answers);
  const rec = RECS[recKey];
  const fallback = FALLBACK[recKey] ? RECS[FALLBACK[recKey] as RecKey] : null;
  const atResult = step === STEPS.length;
  const progress = ((step + 1) / (STEPS.length + 1)) * 100;

  const select = (value: string) => {
    const key = STEPS[step].key;
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!atResult ? (
        // ── Questions ────────────────────────────────────────────
        <>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground">
              Question {step + 1} of {STEPS.length}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-border/60 overflow-hidden mb-10">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <h1 className="text-display md:text-display-lg text-foreground leading-tight mb-8">{STEPS[step].question}</h1>
          <div className="space-y-3">
            {STEPS[step].options.map((o) => (
              <button
                key={o.value}
                onClick={() => select(o.value)}
                className="group w-full text-left rounded-2xl border border-border/60 bg-white p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:border-accent/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors">{o.label}</div>
                    {o.hint && <div className="text-sm text-muted-foreground mt-0.5">{o.hint}</div>}
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        // ── Result: the advice, plus a one-tier-lighter option ───────
        <>
          <button
            onClick={() => setStep(STEPS.length - 1)}
            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Change my answers
          </button>

          <div className="rounded-2xl border border-accent/30 bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6 md:p-9 text-center">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Your best fit</span>
            <h1 className="text-display md:text-display-lg text-foreground mt-2 leading-tight">{rec.name}</h1>
            <p className="text-body-lg text-muted-foreground mt-4 max-w-xl mx-auto">{rec.why}</p>
            <div className="mt-7">
              {rec.action.external ? (
                <a href={rec.action.href} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    {rec.action.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <Link href={rec.action.href}>
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    {rec.action.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
            {recKey === "book" && (
              <p className="text-sm text-muted-foreground mt-6 max-w-lg mx-auto">
                The book is in Dutch for now. Not a Dutch reader?{" "}
                <Link href="/book/english-edition" className="font-heading font-semibold text-primary hover:text-accent underline underline-offset-2">
                  Get on the English-edition list
                </Link>{" "}
                and we&apos;ll tell you the moment it lands.
              </p>
            )}
          </div>

          {/* A lighter step, if there is one */}
          {fallback && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="rounded-2xl bg-sunny/15 border border-sunny/40 p-4 md:p-5 text-center">
                <p className="text-sm md:text-base text-foreground">
                  Feels like too big a step?{" "}
                  <TextLink action={fallback.action}>Start with {fallback.name.replace(/^The /, "the ")}</TextLink>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
