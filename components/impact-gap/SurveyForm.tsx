"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CAPABILITY_MAX_LENGTH } from "@/lib/impactGap/questions";

// One survey component, used for both the leader and the team, so the two
// sides of every question are asked in visibly the same way.
//
// Native inputs throughout. Keyboard order, screen reader announcements and
// focus behaviour then come from the browser rather than from a reimplementation
// of the browser.

type Option = { readonly value: string; readonly label: string };

export type CapabilityValue = {
  text: string;
  cannotName: boolean;
  genuinelyNew: string | null;
};

export type Question = {
  id: string;
  kind: "slider" | "single" | "capability";
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
  /** Capability questions only. */
  cannotLabel?: string;
  followUpQuestion?: string;
  followUpOptions?: readonly Option[];
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

/**
 * The D4 question. A short free text answer, an explicit way to say there isn't
 * one, and a follow-up that turns the text into something scoreable without
 * anyone trying to interpret the words. The text itself is never classified
 * automatically. It is quoted back in the report exactly as written.
 */
function Capability({
  q,
  value,
  onChange,
}: {
  q: Question;
  value: CapabilityValue;
  onChange: (v: CapabilityValue) => void;
}) {
  const remaining = CAPABILITY_MAX_LENGTH - value.text.length;

  return (
    <div>
      <label htmlFor={`text-${q.id}`} className="sr-only">
        {q.question}
      </label>
      <textarea
        id={`text-${q.id}`}
        value={value.text}
        maxLength={CAPABILITY_MAX_LENGTH}
        rows={3}
        disabled={value.cannotName}
        onChange={(e) => onChange({ ...value, text: e.target.value })}
        placeholder="One thing. In your own words."
        aria-describedby={`count-${q.id}`}
        className={`w-full rounded-xl border-2 border-border bg-white p-4 text-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${focusRing}`}
      />
      <p id={`count-${q.id}`} className="mt-1 text-sm text-muted-foreground">
        {value.cannotName
          ? "Not needed, you have ticked the box below."
          : `${remaining} character${remaining === 1 ? "" : "s"} left`}
      </p>

      <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-border bg-white p-4 transition-colors hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="checkbox"
          checked={value.cannotName}
          onChange={(e) =>
            onChange(
              e.target.checked
                ? { text: "", cannotName: true, genuinelyNew: null }
                : { ...value, cannotName: false },
            )
          }
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
            value.cannotName ? "border-primary bg-primary" : "border-muted-foreground/40"
          }`}
        >
          {value.cannotName && <span className="block h-2 w-2 rounded-sm bg-white" />}
        </span>
        <span className="text-foreground">{q.cannotLabel}</span>
      </label>

      {!value.cannotName && value.text.trim().length > 0 && q.followUpOptions && (
        <fieldset className="mt-6 rounded-xl bg-cream p-5">
          <legend className="px-1 font-heading font-bold text-foreground">{q.followUpQuestion}</legend>
          <div className="mt-3">
            <Choice
              name={`${q.id}-followup`}
              options={q.followUpOptions}
              value={value.genuinelyNew ?? undefined}
              onChange={(v) => onChange({ ...value, genuinelyNew: v })}
            />
          </div>
        </fieldset>
      )}
    </div>
  );
}

export const emptyCapability: CapabilityValue = { text: "", cannotName: false, genuinelyNew: null };

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

  const capabilityOf = (id: string) => (answers[id] as CapabilityValue | undefined) ?? emptyCapability;

  const filled = (id: string) => {
    const v = answers[id];
    return v !== undefined && v !== null && v !== "";
  };

  const isAnswered = (q: Question) => {
    if (q.sub && !filled(q.sub.id)) return false;
    if (q.kind === "capability") {
      const v = capabilityOf(q.id);
      if (v.cannotName) return true;
      return v.text.trim().length > 0 && v.genuinelyNew !== null;
    }
    return filled(q.id);
  };

  const missing = questions.filter((q) => !isAnswered(q));

  const set = (id: string, v: unknown) => setAnswers((a) => ({ ...a, [id]: v }));

  const missingMessage = (q: Question) => {
    if (q.kind === "capability") {
      const v = capabilityOf(q.id);
      if (v.cannotName) return "Answer both parts of this question to continue.";
      if (v.text.trim().length === 0)
        return "Write one thing, or tick the box to say there isn't one.";
      if (v.genuinelyNew === null)
        return "Say whether that is genuinely new or the same work done faster.";
    }
    if (q.sub && !filled(q.sub.id) && filled(q.id))
      return "Answer both parts of this question to continue.";
    return "Choose an answer to continue.";
  };

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

            {q.kind === "single" && q.options && (
              <Choice
                name={q.id}
                options={q.options}
                value={answers[q.id] as string | undefined}
                onChange={(v) => set(q.id, v)}
              />
            )}

            {q.kind === "capability" && (
              <Capability q={q} value={capabilityOf(q.id)} onChange={(v) => set(q.id, v)} />
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
