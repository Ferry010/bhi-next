"use client";

import { useState } from "react";
import Link from "next/link";
import { LEVELS, TALK_TO_EXPERT, type Level } from "@/lib/pricing";
import { ArrowRight, ArrowLeft } from "lucide-react";

// "Where do you start?": three questions, then one firm offer (lib/pricing LEVELS).
//   pain — which part of the sameness problem hits home (echoed in the result)
//   know — what they know about Brand Humanizing right now
//   win  — which next step would feel like a win (this picks the level)
// One guard: the Taskforce needs a team that already knows the idea (see
// /taskforce, "we will not sell you this cold"), so if they haven't worked
// with us yet, the Training comes first.
// No email, nothing stored: answers live in this component only.

type Key = "pain" | "know" | "win";
type Answers = Partial<Record<Key, number>>;
type Option = { label: string; value: number; echo: string };

const QUESTIONS: Record<Key, { question: string; options: Option[] }> = {
  pain: {
    question: "Which one hits closest to home?",
    options: [
      { label: "We're starting to look and sound like everyone else", value: 1, echo: "Your company is starting to look and sound like everyone else." },
      { label: "We put bots where customers want a human", value: 2, echo: "You've put bots where customers want a human." },
      { label: "Our people are stuck doing robot work", value: 3, echo: "Your people are stuck doing robot work." },
      { label: "We have the AI, but not who should do what", value: 4, echo: "You have the AI, but not yet who should do what." },
    ],
  },
  know: {
    question: "How well do you know Brand Humanizing?",
    options: [
      { label: "It's new to me", value: 1, echo: "It's new to you," },
      { label: "I've read about it, or follow Ferry online", value: 2, echo: "You know the idea," },
      { label: "I saw Ferry speak live", value: 3, echo: "You saw Ferry live," },
      { label: "We've worked with you before", value: 4, echo: "You've worked with us before," },
    ],
  },
  win: {
    question: "What would be a win for you right now?",
    options: [
      { label: "Understand it better myself", value: 1, echo: "and you want to understand it better yourself." },
      { label: "Get my team to hear the message", value: 2, echo: "and you want your team to hear the message too." },
      { label: "Train my team to actually do it", value: 3, echo: "and you want your team to learn how to do it." },
      { label: "Make it part of how our company works", value: 4, echo: "and you want it to become part of how your company works." },
    ],
  },
};

const FLOW: Key[] = ["pain", "know", "win"];

const at = (n: number) => LEVELS[Math.min(4, Math.max(1, n)) - 1];
const echoOf = (k: Key, v?: number) => QUESTIONS[k].options.find((o) => o.value === v)?.echo ?? "";

function place(a: Answers): { level: Level; reason: string } {
  const pain = echoOf("pain", a.pain);
  const said = `${pain} ${echoOf("know", a.know)} ${echoOf("win", a.win)}`;
  const win = a.win ?? 2;

  if (win === 4 && (a.know ?? 1) < 4) {
    const level = at(3);
    return {
      level,
      reason: `${said} The way there starts with ${level.name}: your team learns how it works. Then the Taskforce makes it stick.`,
    };
  }
  const level = at(win);
  return { level, reason: `${said} That's what ${level.name} is for.` };
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
