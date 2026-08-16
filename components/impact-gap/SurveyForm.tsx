"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  isQuestionAnswered,
  missingMessage as missingMessageFor,
  isFilled,
} from "@/lib/impactGap/validation";

// One survey component, used for both the leader and the team, so the two
// sides of every question are asked in visibly the same way.
//
// Native inputs throughout. Keyboard order, screen reader announcements and
// focus behaviour then come from the browser rather than from a reimplementation
// of the browser.

type Option = { readonly value: string; readonly label: string };

export type Question = {
  id: string;
  kind: "slider" | "single";
  question: string;
  help?: string;
  options?: readonly Option[];
  /**
   * A second question asked inside this one, and deliberately not numbered.
   * Used for the mechanism pair, which belongs to D3 but is never scored, so
   * counting it would turn a six question test into a seven question test.
   */
  sub?: {
    id: string;
    question: string;
    help?: string;
    options: readonly Option[];
  };
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Choice({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly Option[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <label
            key={o.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              active ? "border-primary bg-primary/5" : "border-border bg-white hover:border-primary/40"
            } focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                active ? "border-primary bg-primary" : "border-muted-foreground/40"
              }`}
            >
              {active && <span className="block h-2 w-2 rounded-full bg-white" />}
            </span>
            <span className="text-foreground">{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export default function SurveyForm({
  questions,
  submitLabel,
  onSubmit,
  busy = false,
  error,
}: {
  questions: Question[];
  submitLabel: string;
  onSubmit: (answers: Record<string, unknown>) => void;
  busy?: boolean;
  error?: string | null;
}) {
  // Deliberately empty. A slider that starts at 50 and counts as answered
  // collects a number nobody chose, and "half my team, probably" is exactly the
  // guess this tool exists to test. The slider sits at 50 visually until it is
  // touched, and until then the question is not answered.
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [showErrors, setShowErrors] = useState(false);

  const filled = (id: string) => isFilled(answers, id);

  const isAnswered = (q: Question) => isQuestionAnswered(q, answers);

  const missing = questions.filter((q) => !isAnswered(q));

  const set = (id: string, v: unknown) => setAnswers((a) => ({ ...a, [id]: v }));

  const missingMessage = (q: Question) => missingMessageFor(q, answers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missing.length > 0) {
      setShowErrors(true);
      document.getElementById(`q-${missing[0].id}`)?.scrollIntoView({ block: "center" });
      return;
    }
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {questions.map((q, i) => {
        const unanswered = showErrors && !isAnswered(q);
        return (
          <fieldset key={q.id} id={`q-${q.id}`} className="scroll-mt-28">
            <legend className="mb-1 block font-heading text-lg font-bold text-foreground md:text-xl">
              <span className="mr-2 text-muted-foreground">{i + 1}.</span>
              {q.question}
            </legend>
            {q.help ? (
              <p className="mb-4 text-sm text-muted-foreground">{q.help}</p>
            ) : (
              <div className="mb-4" />
            )}

            {q.kind === "slider" && (
              <div>
                <label htmlFor={`slider-${q.id}`} className="sr-only">
                  {q.question}
                </label>
                <div
                  className={`mb-1 font-heading text-3xl font-bold ${
                    filled(q.id) ? "text-primary" : "text-muted-foreground/50"
                  }`}
                  aria-live="polite"
                >
                  {filled(q.id) ? `${String(answers[q.id])}%` : "Not set"}
                </div>
                {/* The slider is easy to miss as something you interact with,
                    so the instruction is explicit and coloured until touched. */}
                <p
                  className={`mb-3 text-sm font-semibold ${
                    filled(q.id) ? "text-muted-foreground" : "text-accent"
                  }`}
                >
                  {filled(q.id)
                    ? "Drag the handle again any time to adjust."
                    : "Drag the handle along the bar to your best estimate."}
                </p>
                <input
                  id={`slider-${q.id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={Number(answers[q.id] ?? 50)}
                  aria-valuetext={filled(q.id) ? `${String(answers[q.id])} percent` : "not set"}
                  onChange={(e) => set(q.id, Number(e.target.value))}
                  // A click or a key press that lands on the value already shown
                  // fires no change event, so someone who genuinely means 50
                  // would be stuck. Any deliberate interaction commits the
                  // current value.
                  onPointerUp={() => set(q.id, Number(answers[q.id] ?? 50))}
                  onKeyUp={() => set(q.id, Number(answers[q.id] ?? 50))}
                  className={`w-full ${filled(q.id) ? "accent-primary" : "accent-muted-foreground/40"} ${focusRing}`}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {q.kind === "single" && q.options && (
              <Choice
                name={q.id}
                options={q.options}
                value={answers[q.id] as string | undefined}
                onChange={(v) => set(q.id, v)}
              />
            )}

            {q.sub && (
              <fieldset className="mt-6 rounded-xl bg-cream p-5">
                <legend className="px-1 font-heading font-bold text-foreground">
                  {q.sub.question}
                </legend>
                {q.sub.help && <p className="mt-2 text-sm text-muted-foreground">{q.sub.help}</p>}
                <div className="mt-3">
                  <Choice
                    name={q.sub.id}
                    options={q.sub.options}
                    value={answers[q.sub.id] as string | undefined}
                    onChange={(v) => set(q.sub!.id, v)}
                  />
                </div>
              </fieldset>
            )}

            {unanswered && (
              <p id={`err-${q.id}`} role="alert" className="mt-3 text-sm font-medium text-accent">
                {missingMessage(q)}
              </p>
            )}
          </fieldset>
        );
      })}

      {error && (
        <p role="alert" className="rounded-xl border-2 border-accent/30 bg-accent/5 p-4 text-accent">
          {error}
        </p>
      )}

      <div>
        <Button
          type="submit"
          disabled={busy}
          className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral"
        >
          {busy ? "Saving…" : submitLabel} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {showErrors && missing.length > 0 && (
          <p role="status" className="mt-3 text-sm text-muted-foreground">
            {missing.length} question{missing.length === 1 ? "" : "s"} still to answer.
          </p>
        )}
      </div>
    </form>
  );
}
