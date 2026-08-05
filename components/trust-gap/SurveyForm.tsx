"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// One survey component, used for both the leader and the team.
// Native inputs throughout, so keyboard navigation and screen reader
// behaviour come for free rather than being reimplemented.

type Option = { readonly value: string; readonly label: string };

export type Question = {
  id: string;
  kind: "slider" | "scale" | "single" | "multi";
  question: string;
  help?: string;
  options?: readonly Option[];
  lowLabel?: string;
  highLabel?: string;
  /** Only show this question when the predicate passes. */
  showIf?: (answers: Record<string, unknown>) => boolean;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Scale({
  name,
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  name: string;
  value: number | undefined;
  onChange: (v: number) => void;
  lowLabel?: string;
  highLabel?: string;
}) {
  return (
    <div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          return (
            <label
              key={n}
              className={`flex-1 cursor-pointer rounded-xl border-2 py-3 text-center font-heading font-bold transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-foreground hover:border-primary/40"
              } focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
            >
              <input
                type="radio"
                name={name}
                value={n}
                checked={active}
                onChange={() => onChange(n)}
                className="sr-only"
              />
              {n}
            </label>
          );
        })}
      </div>
      {(lowLabel || highLabel) && (
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

function Choice({
  name,
  options,
  value,
  onChange,
  multi = false,
}: {
  name: string;
  options: readonly Option[];
  value: string | string[] | undefined;
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  const isOn = (v: string) =>
    multi ? Array.isArray(value) && value.includes(v) : value === v;

  return (
    <div className="space-y-2">
      {options.map((o) => {
        const active = isOn(o.value);
        return (
          <label
            key={o.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              active ? "border-primary bg-primary/5" : "border-border bg-white hover:border-primary/40"
            } focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
          >
            <input
              type={multi ? "checkbox" : "radio"}
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
                multi ? "rounded" : "rounded-full"
              } ${active ? "border-primary bg-primary" : "border-muted-foreground/40"}`}
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
  const [answers, setAnswers] = useState<Record<string, unknown>>({ d1: 50 });
  const [showErrors, setShowErrors] = useState(false);

  const visible = questions.filter((q) => !q.showIf || q.showIf(answers));

  const isAnswered = (q: Question) => {
    const v = answers[q.id];
    if (q.kind === "multi") return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== null && v !== "";
  };

  const missing = visible.filter((q) => !isAnswered(q));

  const set = (id: string, v: unknown) => setAnswers((a) => ({ ...a, [id]: v }));

  const toggleMulti = (id: string, v: string) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return { ...a, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

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
      {visible.map((q, i) => {
        const unanswered = showErrors && !isAnswered(q);
        return (
          <fieldset
            key={q.id}
            id={`q-${q.id}`}
            className="scroll-mt-28"
            aria-describedby={unanswered ? `err-${q.id}` : undefined}
          >
            <legend className="mb-1 block font-heading text-lg font-bold text-foreground md:text-xl">
              <span className="mr-2 text-muted-foreground">{i + 1}.</span>
              {q.question}
            </legend>
            {q.help && <p className="mb-4 text-sm text-muted-foreground">{q.help}</p>}
            {!q.help && <div className="mb-4" />}

            {q.kind === "slider" && (
              <div>
                <label htmlFor={`slider-${q.id}`} className="sr-only">
                  {q.question}
                </label>
                <div className="mb-3 font-heading text-3xl font-bold text-primary">
                  {String(answers[q.id] ?? 50)}%
                </div>
                <input
                  id={`slider-${q.id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={Number(answers[q.id] ?? 50)}
                  onChange={(e) => set(q.id, Number(e.target.value))}
                  className={`w-full accent-primary ${focusRing}`}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {q.kind === "scale" && (
              <Scale
                name={q.id}
                value={answers[q.id] as number | undefined}
                onChange={(v) => set(q.id, v)}
                lowLabel={q.lowLabel}
                highLabel={q.highLabel}
              />
            )}

            {(q.kind === "single" || q.kind === "multi") && q.options && (
              <Choice
                name={q.id}
                options={q.options}
                value={answers[q.id] as string | string[] | undefined}
                multi={q.kind === "multi"}
                onChange={(v) => (q.kind === "multi" ? toggleMulti(q.id, v) : set(q.id, v))}
              />
            )}

            {unanswered && (
              <p id={`err-${q.id}`} role="alert" className="mt-2 text-sm font-medium text-accent">
                {q.kind === "multi"
                  ? "Pick at least one option to continue."
                  : "Choose an answer to continue."}
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
