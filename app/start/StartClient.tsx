"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Ladder from "@/components/Ladder";
import { LEVELS, TALK_TO_EXPERT, type Level } from "@/lib/pricing";
import { ArrowRight, ArrowLeft } from "lucide-react";

// "Find your level": places someone on the four-level ladder (lib/pricing LEVELS).
// Three signals decide it:
//   need     — where the team is (what level the situation calls for)
//   done     — what they've already done (you don't go back down a level)
//   capacity — what they can make room for now (you can't skip past it)
// Level = need, raised to the step after what's done, capped by capacity.
// Individuals only answer "who" and "done": their level is the next step up.

type Key = "who" | "done" | "need" | "capacity";
type Answers = Partial<Record<Key, number>>;
type Option = { label: string; hint?: string; value: number };

const QUESTIONS: Record<Key, { question: string; options: Option[] }> = {
  who: {
    question: "Who is this for?",
    options: [
      { label: "Just me", hint: "My own understanding first", value: 0 },
      { label: "My team", hint: "One team I lead or work with", value: 1 },
      { label: "My whole organisation", hint: "Across departments", value: 2 },
    ],
  },
  done: {
    question: "What have you already done with Brand Humanizing?",
    options: [
      { label: "Nothing yet", hint: "This is where I'm getting to know it", value: 1 },
      { label: "Read the book, or saw Ferry speak", hint: "I know the thinking", value: 2 },
      { label: "Had a Spark Session", hint: "The team has heard the story", value: 3 },
      { label: "Trained a team with you", hint: "We've done the Full-Day Course", value: 4 },
    ],
  },
  need: {
    question: "Where is your team right now?",
    options: [
      { label: "I want to understand it myself first", hint: "Before I take it to anyone", value: 1 },
      { label: "They need a wake-up and a shared language", hint: "Everyone in one room, seeing it the same way", value: 2 },
      { label: "They get it. Now they need to be able to do it", hint: "From understanding to genuinely capable", value: 3 },
      { label: "It has to be built into how we work, for good", hint: "A lasting change, not a one-off", value: 4 },
    ],
  },
  capacity: {
    question: "What can you make room for right now?",
    options: [
      { label: "Some reading, on my own time", value: 1 },
      { label: "An hour with the whole team", value: 2 },
      { label: "A full day with one team", value: 3 },
      { label: "A few months, with an executive sponsor", value: 4 },
    ],
  },
};

const flowFor = (a: Answers): Key[] => (a.who === 0 ? ["who", "done"] : ["who", "done", "need", "capacity"]);

const at = (n: number) => LEVELS[Math.min(4, Math.max(1, n)) - 1];

function place(a: Answers): { level: Level; reason: string; nextUp?: Level; floor: number } {
  // Nothing yet → 1, read/heard → 2, had a Spark → 3, trained a team → 4.
  const floor = a.done ?? 1;

  if (a.who === 0) {
    const level = at(floor);
    const reason =
      floor === 1
        ? "You're getting to know it on your own, so start where the whole method fits in a weekend's reading."
        : floor === 2
          ? `You already know the thinking. The next level is taking it to your team: ${level.name}.`
          : `You've already done the level below this one. The next step up is ${level.name}.`;
    return { level, reason, floor };
  }

  const need = a.need ?? 2;
  const capacity = a.capacity ?? 4;
  const wanted = Math.max(need, floor);
  const level = at(Math.min(wanted, capacity));

  if (wanted > capacity) {
    const target = at(wanted);
    const reason =
      level.level < floor
        ? `You're past ${level.name} with this team. The next level is ${target.name}. Until you can make room for it, ${level.name} works well for the people who weren't there yet.`
        : `Your team is ready for ${target.name}, but that takes more room than you have right now. Start with ${level.name}. ${target.name} is your next level.`;
    return { level, reason, nextUp: target, floor };
  }
  if (floor > need) {
    return {
      level,
      reason: `You've already done the level below this one, so going back would only repeat it. Your next step up is ${level.name}.`,
      floor,
    };
  }
  return { level, reason: level.youAre, floor };
}

export default function StartClient() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const flow = flowFor(answers);
  const atResult = step >= flow.length;
  const key = flow[Math.min(step, flow.length - 1)];
  const progress = ((step + 1) / (flow.length + 1)) * 100;

  const select = (value: number) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  if (atResult) {
    const { level, reason, nextUp, floor } = place(answers);
    // Never suggest a lighter level they've already done.
    const lighter = level.level > 1 && level.level - 1 >= floor ? at(level.level - 1) : null;
    const primaryHref = level.key === "spark" || level.key === "training" ? `${level.href}#quote` : level.cta.href;
    const primaryLabel =
      level.key === "book" ? level.cta.label : level.key === "taskforce" ? "See the Taskforce" : "See the price and request a quote";

    return (
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setStep(0)}
          className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Change my answers
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
            Your level: {level.level} of 4
          </span>
          <h1 className="text-display md:text-display-lg text-foreground mt-2 leading-tight">{level.name}</h1>
          <p className="text-body-lg text-muted-foreground mt-4">{reason}</p>
          <p className="text-sm text-muted-foreground mt-3">
            {level.commitment} · <span className="font-heading font-semibold text-foreground">{level.price}</span>
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            {level.cta.external ? (
              <a href={primaryHref} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {primaryLabel} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            ) : (
              <Link href={primaryHref}>
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {primaryLabel} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Link
              href={TALK_TO_EXPERT.url}
              className="font-heading font-semibold text-primary hover:text-accent transition-colors px-3 h-12 inline-flex items-center"
            >
              Or talk it through first
            </Link>
          </div>

          {level.key === "book" && (
            <p className="text-sm text-muted-foreground mt-6">
              The book is in Dutch for now. Not a Dutch reader?{" "}
              <Link href="/book/english-edition" className="font-heading font-semibold text-primary hover:text-accent underline underline-offset-2">
                Get on the English-edition list
              </Link>
              .
            </p>
          )}
          {nextUp ? (
            <p className="mt-6 rounded-2xl bg-sunny/15 border border-sunny/40 p-4 text-sm md:text-base text-foreground">
              When you&apos;re ready for more:{" "}
              <Link href={nextUp.href} className="font-heading font-semibold text-primary hover:text-accent">
                {nextUp.name} →
              </Link>
            </p>
          ) : (
            lighter && (
              <p className="mt-6 rounded-2xl bg-sunny/15 border border-sunny/40 p-4 text-sm md:text-base text-foreground">
                Feels like too big a step?{" "}
                <Link href={lighter.href} className="font-heading font-semibold text-primary hover:text-accent">
                  Start one level lower, with {lighter.name} →
                </Link>
              </p>
            )
          )}
        </div>

        <div className="mt-14 md:mt-20">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground text-center mb-8">Where that sits</h2>
          <Ladder current={level.key} currentLabel="Your level" showFinder={false} />
        </div>
      </div>
    );
  }

  const q = QUESTIONS[key];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground tabular-nums">
          Question {step + 1} of {flow.length}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden mb-10">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <h1 className="text-display md:text-display-lg text-foreground leading-tight mb-8">{q.question}</h1>
      <div className="space-y-3">
        {q.options.map((o) => (
          <button
            key={o.label}
            onClick={() => select(o.value)}
            className={`group w-full text-left rounded-2xl border bg-white p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:border-accent/40 ${
              answers[key] === o.value ? "border-accent" : "border-border/60"
            }`}
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
    </div>
  );
}
