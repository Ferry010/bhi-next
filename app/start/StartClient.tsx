"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { BOOK, TALK_TO_EXPERT } from "@/lib/pricing";
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

// Each fit links straight to where they can act: get the book, see/book a
// training, or start the Taskforce. A call is always offered alongside.
const RECS = {
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

// Human-readable labels for the lead that lands in the Inbox.
function labelFor(key: keyof Answers, value?: string) {
  const step = STEPS.find((s) => s.key === key);
  return step?.options.find((o) => o.value === value)?.label ?? value ?? "";
}

export default function StartClient() {
  const [step, setStep] = useState(0); // 0-2 = questions, 3 = result
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false); // the optional capture form was sent

  const recKey = recommend(answers);
  const rec = RECS[recKey];
  const firstName = name.trim().split(" ")[0];
  const atResult = step === STEPS.length;
  const progress = ((step + 1) / (STEPS.length + 1)) * 100;

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
      setSent(true);
    } catch {
      // The action buttons stay available regardless; if capture fails we still
      // confirm so the person is never dropped on an error screen.
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent";

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
        // ── Result: act now, human help optional ─────────────────
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-7">
              {rec.action.external ? (
                <a href={rec.action.href} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    {rec.action.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <Link href={rec.action.href}>
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    {rec.action.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  Book a call
                </Button>
              </a>
            </div>
          </div>

          {/* Optional: a personal answer to their specific question */}
          <div className="mt-8">
            {sent ? (
              <div className="rounded-2xl bg-cream border border-border/50 p-6 md:p-7 text-center">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <p className="font-heading font-semibold text-foreground">Thanks{firstName ? `, ${firstName}` : ""}. We&apos;ve got it.</p>
                <p className="text-sm text-muted-foreground mt-1">Ferry or Jonathan replies to {email || "you"} within two working days, on your question.</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-cream border border-border/50 p-6 md:p-7">
                <h2 className="font-heading font-bold text-xl text-foreground">Prefer a personal answer first?</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Tell us the one thing you want to solve. A human, Ferry or Jonathan, replies within two working days, on your question, not a generic pitch.
                </p>
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} />
                    <Input type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
                  </div>
                  <Input type="text" placeholder="Organisation (optional)" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputCls} />
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
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 btn-scale font-heading font-semibold h-12 text-base gap-2"
                  >
                    {loading ? "Sending…" : "Send my question"} <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By sending you agree to our{" "}
                    <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
