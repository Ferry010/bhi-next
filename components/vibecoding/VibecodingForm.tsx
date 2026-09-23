"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import type { VibeContent } from "./content";

type Answers = {
  groupSize: string;
  name: string;
  location: string;
  timing: string;
  email: string;
  phone: string;
  company: string;
};

const EMPTY: Answers = { groupSize: "", name: "", location: "", timing: "", email: "", phone: "", company: "" };

// A conversational, one-question-at-a-time form. Multi-step flows convert far
// better than a single wall of fields, and clicking a pricing tier is the first
// (low-friction) commitment: it presets the group size via a "vibe:start" event
// and drops the person straight at the name question.
export default function VibecodingForm({ labels, lang }: { labels: VibeContent["form"]; lang: "en" | "nl" }) {
  const s = labels.steps;
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [presetSize, setPresetSize] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  // Steps in order. The group-size question is dropped when a tier click already
  // told us the size.
  const stepKeys = (presetSize ? [] : ["groupSize"]).concat(["name", "location", "timing", "contact"]);
  const total = stepKeys.length;
  const current = stepKeys[step] ?? "contact";

  // A pricing tier (or a generic CTA) starts / restarts the flow.
  useEffect(() => {
    const onStart = (e: Event) => {
      const size = ((e as CustomEvent).detail?.groupSize as string | undefined) ?? "";
      setSent(false);
      setStep(0);
      if (size) {
        setAnswers({ ...EMPTY, groupSize: size });
        setPresetSize(true);
      } else {
        setAnswers(EMPTY);
        setPresetSize(false);
      }
    };
    window.addEventListener("vibe:start", onStart);
    return () => window.removeEventListener("vibe:start", onStart);
  }, []);

  // Focus the text field whenever we land on a typing step.
  useEffect(() => {
    if (current === "name" || current === "timing" || current === "contact") {
      const t = setTimeout(() => textRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [step, current]);

  const set = (key: keyof Answers, val: string) => setAnswers((a) => ({ ...a, [key]: val }));

  const canAdvance =
    current === "name" ? answers.name.trim().length > 0
      : current === "contact" ? answers.email.trim().length > 0 && answers.phone.trim().length > 0
      : true; // group-size and location auto-advance on click; timing is optional

  const submitLead = async () => {
    setLoading(true);
    try {
      const formData = {
        name: answers.name.trim(),
        email: answers.email.trim(),
        phone: answers.phone.trim() || undefined,
        company: answers.company.trim() || undefined,
        group_size: answers.groupSize || undefined,
        location: answers.location || undefined,
        timing: answers.timing.trim() || undefined,
        language: lang,
      };
      await createSupabaseBrowserClient()
        .from("form_submissions" as any)
        .insert({ id: crypto.randomUUID(), form_type: "vibecoding", data: formData } as any);
      createSupabaseBrowserClient().functions.invoke("notify-slack", {
        body: { form_type: "vibecoding", data: formData },
      });
      setSent(true);
    } catch {
      // Best-effort: never drop the person on an error screen.
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const advance = () => {
    if (!canAdvance) return;
    if (current === "contact") {
      submitLead();
    } else {
      setStep((st) => Math.min(stepKeys.length - 1, st + 1));
    }
  };

  const pick = (key: keyof Answers, val: string) => {
    set(key, val);
    // Auto-advance on a choice, Typeform style.
    setTimeout(() => setStep((st) => Math.min(stepKeys.length - 1, st + 1)), 180);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-8 md:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-section md:text-display text-foreground font-heading font-bold">{labels.success.title}</h3>
        <p className="text-body-lg text-muted-foreground mt-3 max-w-md mx-auto">{labels.success.body}</p>
      </div>
    );
  }

  const chip =
    "text-left rounded-xl border border-input bg-white px-5 py-4 font-heading font-semibold text-foreground hover:border-accent hover:bg-accent/5 transition-colors";
  const chipActive = "border-accent bg-accent/10 ring-1 ring-accent";
  const inputCls = "rounded-xl h-14 px-4 text-lg border border-input bg-white focus-visible:ring-accent";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        advance();
      }}
      className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-8"
    >
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((st) => Math.max(0, st - 1))} className="text-muted-foreground hover:text-foreground transition-colors" aria-label={s.back}>
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <span className="w-5" />
        )}
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">{step + 1}/{total}</span>
      </div>

      <div className="min-h-[15rem] flex flex-col">
        {current === "groupSize" && (
          <>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{s.groupSizeQ}</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {labels.groupOptions.map((o) => (
                <button type="button" key={o} onClick={() => pick("groupSize", o)} className={`${chip} ${answers.groupSize === o ? chipActive : ""}`}>
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {current === "name" && (
          <>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{s.nameQ}</h3>
            <Input ref={textRef} type="text" autoComplete="name" placeholder={labels.name} value={answers.name} onChange={(e) => set("name", e.target.value)} className={`${inputCls} mt-6`} />
          </>
        )}

        {current === "location" && (
          <>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{s.locationQ}</h3>
            <div className="grid gap-3 mt-6">
              {labels.locationOptions.map((o) => (
                <button type="button" key={o} onClick={() => pick("location", o)} className={`${chip} ${answers.location === o ? chipActive : ""}`}>
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {current === "timing" && (
          <>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{s.timingQ}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.timingHelp}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {labels.timingOptions.map((o) => (
                <button type="button" key={o} onClick={() => set("timing", o)} className={`rounded-full border px-4 py-2 text-sm font-heading font-semibold transition-colors ${answers.timing === o ? "border-accent bg-accent/10 text-accent" : "border-input bg-white text-foreground hover:border-accent"}`}>
                  {o}
                </button>
              ))}
            </div>
            <Input ref={textRef} type="text" placeholder={labels.timing} value={answers.timing} onChange={(e) => set("timing", e.target.value)} className={`${inputCls} mt-4`} />
          </>
        )}

        {current === "contact" && (
          <>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{s.contactQ}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.contactHelp}</p>
            <div className="space-y-3 mt-5">
              <Input ref={textRef} type="email" autoComplete="email" placeholder={labels.email} value={answers.email} onChange={(e) => set("email", e.target.value)} required className={inputCls} />
              <Input type="tel" inputMode="tel" autoComplete="tel" placeholder={labels.phone} value={answers.phone} onChange={(e) => set("phone", e.target.value)} required className={inputCls} />
              <Input type="text" autoComplete="organization" placeholder={labels.company} value={answers.company} onChange={(e) => set("company", e.target.value)} className={inputCls} />
            </div>
          </>
        )}

        {/* Advance / submit for typing steps (choice steps auto-advance) */}
        {(current === "name" || current === "timing" || current === "contact") && (
          <div className="mt-auto pt-6">
            <Button
              type="submit"
              disabled={!canAdvance || loading}
              className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 text-base gap-2"
            >
              {current === "contact" ? (loading ? labels.sending : labels.submit) : s.next}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {current === "contact" && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                {labels.privacy}{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  {lang === "nl" ? "Privacybeleid" : "Privacy Policy"}
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
