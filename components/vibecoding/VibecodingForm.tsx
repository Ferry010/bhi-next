"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, ArrowRight } from "lucide-react";
import type { VibeContent } from "./content";

export default function VibecodingForm({ labels, lang }: { labels: VibeContent["form"]; lang: "en" | "nl" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [location, setLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const inputCls = "rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent";
  const selectCls = `${inputCls} appearance-none`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const submissionId = crypto.randomUUID();
      const formData = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        group_size: groupSize || undefined,
        location: location || undefined,
        timing: timing.trim() || undefined,
        message: message.trim() || undefined,
        language: lang,
      };
      await createSupabaseBrowserClient()
        .from("form_submissions" as any)
        .insert({ id: submissionId, form_type: "vibecoding", data: formData } as any);
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

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input type="text" placeholder={labels.name} value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} />
        <Input type="email" placeholder={labels.email} value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
      </div>
      <Input type="text" placeholder={labels.company} value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />
      <div className="grid sm:grid-cols-2 gap-4">
        <select value={groupSize} onChange={(e) => setGroupSize(e.target.value)} className={`${selectCls} ${groupSize ? "text-foreground" : "text-muted-foreground"}`}>
          <option value="" disabled>{labels.groupSize}</option>
          {labels.groupOptions.map((o) => <option key={o} value={o} className="text-foreground">{o}</option>)}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className={`${selectCls} ${location ? "text-foreground" : "text-muted-foreground"}`}>
          <option value="" disabled>{labels.location}</option>
          {labels.locationOptions.map((o) => <option key={o} value={o} className="text-foreground">{o}</option>)}
        </select>
      </div>
      <Input type="text" placeholder={labels.timing} value={timing} onChange={(e) => setTiming(e.target.value)} className={inputCls} />
      <textarea
        placeholder={labels.message}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="w-full rounded-xl px-4 py-3 border border-input bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
      />
      <Button
        type="submit"
        disabled={loading || !name.trim() || !email.trim()}
        className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 text-base gap-2"
      >
        {loading ? labels.sending : labels.submit} <ArrowRight className="w-4 h-4" />
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        {labels.privacy}{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          {lang === "nl" ? "Privacybeleid" : "Privacy Policy"}
        </Link>
      </p>
    </form>
  );
}
