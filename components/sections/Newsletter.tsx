"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Newsletter() {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const submissionId = crypto.randomUUID();
      const formData = { email: email.trim() };
      await supabase.from("form_submissions" as any).insert({ id: submissionId, form_type: "newsletter", data: formData } as any);
      await supabase.functions.invoke("notify-slack", { body: { form_type: "newsletter", data: formData } });
      notifyByEmail("newsletter", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="bg-cream section-padding">
      <div className="container-narrow text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-display md:text-display-lg text-foreground">
            Thinking that stays human.
          </h2>
          <p className="text-sm md:text-body-lg text-text-light mt-4 md:mt-6 max-w-xl mx-auto">
            We write about technology, organizational behavior, brand strategy, and what it actually means to lead with humanity in a world moving fast toward automation. No fluff. No AI-generated content spam. Just honest thinking, when we have something worth saying.
          </p>

          {submitted ? (
            <p className="text-accent font-heading font-semibold mt-8">
              You&apos;re in! We&apos;ll be in touch. 🙌
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-full h-12 px-5 flex-1"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 px-6"
                >
                  {loading ? "Sending…" : "Subscribe"}
                </Button>
              </form>
              <p className="text-xs text-text-light/60 mt-4">
                No spam. Unsubscribe anytime. Written by actual humans.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
