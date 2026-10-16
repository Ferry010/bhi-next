"use client";

import { useState } from "react";
import Link from "next/link";
import { LEVELS, TALK_TO_EXPERT, type Level } from "@/lib/pricing";
import { ArrowRight, ArrowLeft } from "lucide-react";

// "Where do you start?": three questions about what someone needs right now
// (not what they've done with us), then one firm offer from lib/pricing LEVELS.
//   problem — what hurts now              (votes for a level)
//   win     — what they feel solves it    (votes for a level)
//   fit     — what they can make room for (caps the level)
// Level = the middle of problem and win, rounded up, capped by fit.
// No email, nothing stored: answers live in this component only.

type Key = "problem" | "win" | "fit";
type Answers = Partial<Record<Key, number>>;
type Option = { label: string; value: number; echo?: string };

const QUESTIONS: Record<Key, { question: string; options: Option[] }> = {
  problem: {
    question: "What's the problem right now?",
    options: [
      { label: "I don't really know what AI means for us yet", value: 1, echo: "you don't know yet what AI means for you" },
      { label: "My team is scared of AI, or just not on board", value: 2, echo: "your team isn't on board yet" },
      { label: "We want to use AI, but nobody knows how", value: 3, echo: "your team wants to use AI, but nobody knows how" },
      { label: "We tried things, but nothing sticks", value: 4, echo: "you've tried things, but nothing sticks" },
    ],
  },
  win: {
    question: "What would feel like a win, three months from now?",
    options: [
      { label: "I finally get it, and know what to do next", value: 1, echo: "to finally get it yourself" },
      { label: "My whole team is excited and on the same page", value: 2, echo: "your whole team excited and on the same page" },
      { label: "My team uses AI well, and follows a clear plan", value: 3, echo: "a team that uses AI well, with a clear plan" },
      { label: "It's simply how we work now, without outside help", value: 4, echo: "it to simply be how you work, without outside help" },
    ],
  },
  fit: {
    question: "What fits right now?",
    options: [
      { label: "Something I can read on my own", value: 1 },
      { label: "One hour with the whole team", value: 2 },
      { label: "One full day with one team", value: 3 },
      { label: "A few months, with a boss who backs it", value: 4 },
    ],
  },
};

const FLOW: Key[] = ["problem", "win", "fit"];

const at = (n: number) => LEVELS[Math.min(4, Math.max(1, n)) - 1];
const echoOf = (k: Key, v?: number) => QUESTIONS[k].options.find((o) => o.value === v)?.echo ?? "";

function place(a: Answers): { level: Level; reason: string } {
  const problem = a.problem ?? 2;
  const win = a.win ?? 2;
  const fit = a.fit ?? 4;
  const need = Math.ceil((problem + win) / 2);
  const level = at(Math.min(need, fit));

  if (fit < need) {
    const target = at(need);
    return {
      level,
      reason: `${target.name} would get you there, but it takes ${target.commitment.toLowerCase()}. ${level.name} fits right now, and it's the first step.`,
    };
  }
  return {
    level,
    reason: `You said ${echoOf("problem", a.problem)}, and you want ${echoOf("win", a.win)}. That's what ${level.name} is for.`,
  };
}

export default function StartClient() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const atResult = step >= FLOW.length;
  const key = FLOW[Math.min(step, FLOW.length - 1)];
  const progress = ((step + 1) / (FLOW.length + 1)) * 100;

  const select = (value: number) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  if (atResult) {
    const { level, reason } = place(answers);
    const btn =
      "inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto";

    // One result, one offer: your need is a product. Go to it, or talk to us first.
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
            <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">
              That&apos;s <span className="text-primary">{level.name}</span>.
            </h2>
            <p className="text-body-lg text-muted-foreground mt-4">{reason}</p>
            <p className="text-foreground font-heading font-semibold mt-4">{level.outcome}</p>
            <p className="text-sm text-muted-foreground mt-2">
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
          Question {step + 1} of {FLOW.length}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden mb-10">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <h3 className="text-display md:text-display-lg text-foreground leading-tight mb-8">{q.question}</h3>
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
              <div className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors">{o.label}</div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
