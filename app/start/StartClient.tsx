"use client";

import { useState } from "react";
import Link from "next/link";
import { LEVELS, TALK_TO_EXPERT, type Level } from "@/lib/pricing";
import { ArrowRight, ArrowLeft } from "lucide-react";

// "Find your level": places someone on the four levels (lib/pricing LEVELS).
// The result is one firm offer: your level is a product. Go to it, or talk to
// us first. No email, nothing stored: answers live in this component only.
//
// Three signals decide the level:
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
      { label: "Just me", value: 0 },
      { label: "My team", value: 1 },
      { label: "My whole company", value: 2 },
    ],
  },
  done: {
    question: "What have you already done with us?",
    options: [
      { label: "Nothing yet", value: 1 },
      { label: "I read the book, or saw Ferry speak", value: 2 },
      { label: "We had a Spark Session", value: 3 },
      { label: "We did the Training", value: 4 },
    ],
  },
  need: {
    question: "What does your team need most right now?",
    options: [
      { label: "I want to understand it myself first", value: 1 },
      { label: "They need to hear it and get excited", value: 2 },
      { label: "They get it, but don't know how to do it yet", value: 3 },
      { label: "It has to become part of how we work", value: 4 },
    ],
  },
  capacity: {
    question: "How much time can you make for it now?",
    options: [
      { label: "A few evenings of reading", value: 1 },
      { label: "One hour with the whole team", value: 2 },
      { label: "One full day with one team", value: 3 },
      { label: "A few months, with a boss who backs it", value: 4 },
    ],
  },
};

const flowFor = (a: Answers): Key[] => (a.who === 0 ? ["who", "done"] : ["who", "done", "need", "capacity"]);

const at = (n: number) => LEVELS[Math.min(4, Math.max(1, n)) - 1];

function place(a: Answers): { level: Level; reason: string; nextUp?: Level; floor: number } {
  // Nothing yet → 1, read/heard → 2, had a Spark → 3, did the Training → 4.
  const floor = a.done ?? 1;

  if (a.who === 0) {
    const level = at(floor);
    const reason =
      floor === 1
        ? "You want to understand it yourself first. That's the right place to start."
        : floor === 2
          ? "You already know the idea. The next step is getting your team to hear it."
          : "You've done the level below this one. This is the next step up.";
    return { level, reason, floor };
  }

  const need = a.need ?? 2;
  const capacity = a.capacity ?? 4;
  const wanted = Math.max(need, floor);
  const level = at(Math.min(wanted, capacity));

  // We don't sell the Taskforce cold (see /taskforce): it needs a team that has
  // already had a Spark or the Training with us. Until then, the Training first.
  if (level.key === "taskforce" && floor < 3) {
    return {
      level: at(3),
      reason: "The Taskforce works best once we've worked together and your team speaks the same language. So start with the Training. The Taskforce comes right after.",
      nextUp: level,
      floor,
    };
  }

  if (wanted > capacity) {
    const target = at(wanted);
    const reason =
      level.level < floor
        ? `You've already done this level with your team. Next up is ${target.name}. Until you have time for that, this works well for the people who missed it.`
        : `Your team is ready for ${target.name}, but you don't have the time for it yet. Start here. ${target.name} comes next.`;
    return { level, reason, nextUp: target, floor };
  }
  if (floor > need) {
    return { level, reason: "You've already done the level below. No need to do it again. This is your next step.", floor };
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
    const { level, reason } = place(answers);
    const btn =
      "inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto";

    // One result, one offer: your level is a product. Go to it, or talk to us first.
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setStep(0)}
          className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Change my answers
        </button>

        <div className="rounded-2xl bg-white border border-border/60 shadow-[0_4px_24px_rgba(18,21,46,0.08)] overflow-hidden">
          <p className="bg-cream text-center text-xs md:text-sm text-muted-foreground px-5 py-2.5">
            We didn&apos;t save your answers. They stay in your browser.
          </p>
          <div className="p-6 md:p-10 text-center">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
              Level {level.level} of 4 · {level.verb}
            </span>
            <h1 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">
              That&apos;s <span className="text-primary">{level.name}</span>.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-4">{reason}</p>
            <p className="text-sm text-muted-foreground mt-3">
              {level.commitment} · <span className="font-heading font-semibold text-foreground tabular-nums">{level.price}</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              {level.cta.external ? (
                <a href={level.cta.href} target="_blank" rel="noopener noreferrer" className={btn}>
                  {level.cta.label} <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={level.cta.href} className={btn}>
                  {level.cta.label} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link href={TALK_TO_EXPERT.url} className="font-heading font-semibold text-primary hover:text-accent transition-colors">
                Or talk to us first
              </Link>
            </div>
          </div>
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
