"use client";

import { useState } from "react";
import Link from "next/link";
import Ladder from "@/components/Ladder";
import { LEVELS, TALK_TO_EXPERT, type Level, type LevelKey } from "@/lib/pricing";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";

// "Find your level": places someone on the four levels (lib/pricing LEVELS) and,
// first of all, gives them something useful to do this week without us.
// No email, nothing stored: answers live in this component only.
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

// Free, concrete, doable without us. In order: each step builds on the last.
const THIS_WEEK: Record<LevelKey, { steps: string[]; free: { label: string; href: string; note: string } }> = {
  book: {
    steps: [
      "Write down ten things you did at work this week.",
      "Put a C next to the ones a computer could do. Put an H next to the ones only a human can do well.",
      "Look at the H list. That's where you make the difference. Ask yourself how much of your week goes there.",
    ],
    free: { label: "Read our free research", href: "/research", note: "No sign-up, no email." },
  },
  spark: {
    steps: [
      "At your next team meeting, ask one question: what part of your work would you happily give to a computer?",
      "Then ask: what part should always stay human?",
      "Write both lists on the wall. Don't fix anything yet. Just let everyone see it.",
    ],
    free: {
      label: "Try the free AI Trust Gap test",
      href: "/trust-gap",
      note: "You answer six questions, your team answers the same six anonymously. See if you agree.",
    },
  },
  training: {
    steps: [
      "Pick one boring task your team does every week, always the same way.",
      "Let a tool do it for two weeks. Write down how much time it saves.",
      "Spend that time on something customers notice: a call, a visit, a personal note.",
    ],
    free: {
      label: "Try the free Impact Gap test",
      href: "/impact-gap",
      note: "See what AI really changed on your team, compared with what you think it changed.",
    },
  },
  taskforce: {
    steps: [
      "Write your biggest challenge in one sentence. If you can't, that's the first job.",
      "Find the person at the top who wants it solved, and three people who would do the work.",
      "Pick one moment where a customer meets your company. Write down who handles it: a person or a machine.",
    ],
    free: {
      label: "Try the free Impact Gap test",
      href: "/impact-gap",
      note: "A quick, anonymous check of where your team really is with AI.",
    },
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
    const { level, reason, nextUp, floor } = place(answers);
    const week = THIS_WEEK[level.key];
    // Never suggest a lighter level they've already done.
    const lighter = level.level > 1 && level.level - 1 >= floor ? at(level.level - 1) : null;
    const mailBody = `My level: ${level.level} of 4 (${level.name})\n\nThis week:\n${week.steps
      .map((s, i) => `${i + 1}. ${s}`)
      .join("\n")}\n\nhttps://brandhumanizing.com/start`;

    return (
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setStep(0)}
          className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Change my answers
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Your level</span>
          <h1 className="text-display md:text-display-lg text-foreground mt-2 leading-tight">
            Level {level.level} of 4: <span className="text-primary">{level.verb}.</span>
          </h1>
          <p className="text-body-lg text-muted-foreground mt-4">{reason}</p>
        </div>

        {/* Value first: what to do this week, free, without us. */}
        <section className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white border border-border/60 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-9">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">Start this week, on your own</h2>
          <p className="text-muted-foreground mt-1">Free. No help from us needed.</p>
          <ol className="mt-6 space-y-4">
            {week.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary font-heading font-bold inline-flex items-center justify-center tabular-nums">
                  {i + 1}
                </span>
                <p className="text-foreground leading-relaxed pt-1">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 rounded-xl bg-cream p-4 md:p-5">
            <Link href={week.free.href} className="font-heading font-semibold text-primary hover:text-accent inline-flex items-center gap-1.5">
              {week.free.label} <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{week.free.note}</p>
          </div>
          <a
            href={`mailto:?subject=${encodeURIComponent("My next steps")}&body=${encodeURIComponent(mailBody)}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" /> Email these steps to yourself
          </a>
        </section>

        {/* Then, quietly: if you want help with this level. */}
        <section className="mt-10 max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">Want us to help?</h2>
          <p className="text-muted-foreground mt-2">
            At your level that&apos;s <span className="font-semibold text-foreground">{level.name}</span>.{" "}
            {level.commitment}, <span className="font-semibold text-foreground tabular-nums">{level.price.replace(/^From/, "from")}</span>.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
            {level.cta.external ? (
              <a href={level.cta.href} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-primary hover:text-accent inline-flex items-center gap-1.5">
                {level.cta.label} <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link href={level.cta.href} className="font-heading font-semibold text-primary hover:text-accent inline-flex items-center gap-1.5">
                {level.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link href={TALK_TO_EXPERT.url} className="font-heading font-semibold text-muted-foreground hover:text-foreground">
              Or ask us a question
            </Link>
          </div>
          {level.key === "book" && (
            <p className="text-sm text-muted-foreground mt-5">
              The book is in Dutch for now.{" "}
              <Link href="/book/english-edition" className="font-heading font-semibold text-primary hover:text-accent underline underline-offset-2">
                Hear when the English one is out
              </Link>
              .
            </p>
          )}
          {nextUp ? (
            <p className="text-sm text-muted-foreground mt-5">
              Later on:{" "}
              <Link href={nextUp.href} className="font-heading font-semibold text-primary hover:text-accent">
                {nextUp.name} →
              </Link>
            </p>
          ) : (
            lighter && (
              <p className="text-sm text-muted-foreground mt-5">
                Too big a step?{" "}
                <Link href={lighter.href} className="font-heading font-semibold text-primary hover:text-accent">
                  Start with {lighter.name} →
                </Link>
              </p>
            )
          )}
        </section>

        <div className="mt-16 md:mt-20">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground text-center mb-8">All four levels</h2>
          <Ladder current={level.key} currentLabel="Your level" showFinder={false} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          We didn&apos;t save your answers. They stay in your browser.
        </p>
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
