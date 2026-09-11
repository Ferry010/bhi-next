"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { TALK_TO_EXPERT } from "@/lib/pricing";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

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

const RECS = {
  book: {
    name: "The Book",
    why: "You're still forming a view, so start light. The whole method for the price of lunch. Read it, then we talk.",
    href: "/book",
    cta: "About the book",
  },
  spark: {
    name: "The Spark Session",
    why: "A one-hour in-house keynote that gets the whole team seeing AI and their work differently. The fastest way to align a room.",
    href: "/learning/inspiration-session",
    cta: "See the Spark Session",
  },
  fullday: {
    name: "The Full-Day Course",
    why: "A day that turns a curious team into a capable one, and sends them home with a 90-day plan.",
    href: "/learning/full-day-course",
    cta: "See the Full-Day Course",
  },
  taskforce: {
    name: "The Taskforce",
    why: "Sixteen weeks, your own people, one real challenge taken to a working pilot. When we leave, the capability stays.",
    href: "/taskforce",
    cta: "See the Taskforce",
  },
};

type RecKey = keyof typeof RECS;

function recommend(a: Answers): RecKey {
  if (a.who === "me") return "book";
  if (a.who === "org" || a.where === "stick") return "taskforce";
  if (a.where === "capable") return "fullday";
  return "spark"; // team + curious/wake
}

// Human-readable labels for the lead that lands in the Inbox.
function labelFor(key: keyof Answers, value?: string) {
  const step = STEPS.find((s) => s.key === key);
  return step?.options.find((o) => o.value === value)?.label ?? value ?? "";
}

export default function StartClient() {
  const [step, setStep] = useState(0); // 0-2 = questions, 3 = capture
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const recKey = recommend(answers);
  const rec = RECS[recKey];
  const firstName = name.trim().split(" ")[0];

  const select = (value: string) => {
    const key = STEPS[step].key;
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const submissionId = crypto.randomUUID();
      const formData = {
        name: name.trim(),
        email: email.trim(),
        organization: organization.trim() || undefined,
        question: question.trim() || undefined,
        who: labelFor("who", answers.who),
        where: labelFor("where", answers.where),
        timeline: labelFor("timeline", answers.timeline),
        recommendation: rec.name,
      };
      await createSupabaseBrowserClient()
        .from("form_submissions" as any)
        .insert({ id: submissionId, form_type: "qualifier", data: formData } as any);
      createSupabaseBrowserClient().functions.invoke("notify-slack", {
        body: { form_type: "qualifier", data: formData },
      });
      setSubmitted(true);
    } catch {
      // The lead is the priority; if Slack fails the row is still saved. If the
      // insert itself fails we still show success so we never lose the person to
      // an error screen; Slack + Inbox are best-effort.
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // ── Success ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-display md:text-display-lg text-foreground leading-tight">
          Thanks{firstName ? `, ${firstName}` : ""}. We&apos;ve got it.
        </h1>
        <p className="text-body-lg text-muted-foreground mt-5">
          Based on your answers, <span className="text-foreground font-heading font-semibold">{rec.name}</span> looks like your best fit. {rec.why}
        </p>
        <p className="text-muted-foreground mt-4">
          A human, Ferry or Jonathan, reads your note and replies to your specific question. Usually within two working days. No junior, no bot.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-9">
          <Link href={rec.href}>
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
              {rec.cta} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
              Or book a call now
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / (STEPS.length + 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground">
          {step < STEPS.length ? `Question ${step + 1} of ${STEPS.length}` : "Almost there"}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden mb-10">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Questions */}
      {step < STEPS.length && (
        <div>
          <h1 className="text-display md:text-display-lg text-foreground leading-tight mb-8">
            {STEPS[step].question}
          </h1>
          <div className="space-y-3">
            {STEPS[step].options.map((o) => {
              const active = answers[STEPS[step].key] === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => select(o.value)}
                  className={`group w-full text-left rounded-2xl border bg-white p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:border-accent/40 ${
                    active ? "border-accent shadow-lg" : "border-border/60"
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
              );
            })}
          </div>
        </div>
      )}

      {/* Capture */}
      {step === STEPS.length && (
        <div>
          <div className="rounded-2xl bg-cream border border-border/50 p-6 md:p-7 mb-8">
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Your best fit</span>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mt-1">{rec.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">{rec.why}</p>
          </div>

          <h1 className="text-section md:text-display text-foreground leading-tight">
            Tell us the one thing you want to solve.
          </h1>
          <p className="text-muted-foreground mt-3">
            We&apos;ll come back to <span className="text-foreground font-heading font-semibold">you</span>, on <span className="text-foreground font-heading font-semibold">your</span> question, not a generic pitch.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent"
              />
              <Input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent"
              />
            </div>
            <Input
              type="text"
              placeholder="Organisation (optional)"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent"
            />
            <textarea
              placeholder="What's the one thing you want to solve? (optional, but it helps)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-4 py-3 border border-input bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
            />
            <Button
              type="submit"
              disabled={loading || !name.trim() || !email.trim()}
              className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 text-base gap-2"
            >
              {loading ? "Sending…" : "Send and get a personal reply"} <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              A human reads this and replies within two working days. By sending you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
