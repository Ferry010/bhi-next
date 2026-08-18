"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";
import { TALK_TO_EXPERT } from "@/lib/pricing";
import { ArrowRight } from "lucide-react";

// Reusable "book a call, or just write to us" block. Drop it on any page.
// `variant="dark"` for blue sections (yellow CTA), "light" for white/cream.
export default function MessageUs({
  variant = "light",
  context = "general",
  heading = "Talk to a human about it.",
  subheading = "Book a call, or write a few lines and we'll come back to you. No sales script, no bot.",
}: {
  variant?: "light" | "dark";
  context?: string;
  heading?: string;
  subheading?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const dark = variant === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const submissionId = crypto.randomUUID();
      const formData = { name: name.trim(), email: email.trim(), message: message.trim(), context };
      await createSupabaseBrowserClient()
        .from("form_submissions" as any)
        .insert({ id: submissionId, form_type: "message", data: formData } as any);
      createSupabaseBrowserClient().functions.invoke("notify-slack", {
        body: { form_type: "message", data: formData },
      });
      notifyByEmail("message", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
      <div>
        <h2 className={`text-display md:text-display-lg ${dark ? "text-white" : "text-foreground"}`}>{heading}</h2>
        <p className={`text-body-lg mt-4 ${dark ? "text-white/75" : "text-muted-foreground"}`}>{subheading}</p>
        <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-7">
          <Button
            className={`rounded-full btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 ${
              dark
                ? "bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95"
                : "bg-accent text-accent-foreground hover:bg-soft-coral"
            }`}
          >
            {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
        <p className={`text-sm mt-4 ${dark ? "text-white/50" : "text-muted-foreground"}`}>
          A 30 minute call. A real human replies, usually within 24 hours.
        </p>
      </div>

      <div>
        {submitted ? (
          <div
            className={`rounded-2xl p-7 ${dark ? "bg-white/5 border border-white/10" : "bg-white border border-border shadow-[0_4px_24px_rgba(18,21,46,0.06)]"}`}
          >
            <p className={`font-heading font-semibold ${dark ? "text-sunny" : "text-accent"}`}>Got it. Thanks.</p>
            <p className={`text-sm mt-2 ${dark ? "text-white/70" : "text-muted-foreground"}`}>
              One of us reads every message. You&apos;ll hear back from a person, not an autoresponder.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`rounded-2xl p-6 md:p-7 space-y-3 ${dark ? "bg-white/5 border border-white/10" : "bg-white border border-border shadow-[0_4px_24px_rgba(18,21,46,0.06)]"}`}
          >
            <p className={`text-sm font-heading font-semibold ${dark ? "text-white" : "text-foreground"}`}>
              Rather just write to us?
            </p>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-lg h-11 ${dark ? "bg-white/5 border-white/20 text-white placeholder:text-white/40" : ""}`}
            />
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-lg h-11 ${dark ? "bg-white/5 border-white/20 text-white placeholder:text-white/40" : ""}`}
            />
            <Textarea
              required
              rows={4}
              placeholder="What's the challenge you're sitting with?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`rounded-lg ${dark ? "bg-white/5 border-white/20 text-white placeholder:text-white/40" : ""}`}
            />
            <Button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg btn-scale font-heading font-semibold h-11 ${
                dark
                  ? "bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95"
                  : "bg-accent text-accent-foreground hover:bg-soft-coral"
              }`}
            >
              {loading ? "Sending…" : "Send it"}
            </Button>
            <p className={`text-caption ${dark ? "text-white/40" : "text-muted-foreground"}`}>
              By sending you agree to our{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
