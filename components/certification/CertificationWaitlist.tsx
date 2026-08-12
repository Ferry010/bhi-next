"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";

export default function CertificationWaitlist() {
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
      await createSupabaseBrowserClient()
        .from("form_submissions" as any)
        .insert({ id: submissionId, form_type: "certification_waitlist", data: formData } as any);
      createSupabaseBrowserClient().functions.invoke("notify-slack", {
        body: { form_type: "certification_waitlist", data: formData },
      });
      notifyByEmail("certification_waitlist", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-primary font-heading font-semibold mt-4">
        You&apos;re on the list. We&apos;ll tell you the moment it opens.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-4 max-w-md">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-full h-11 px-5 flex-1 bg-white"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-11 px-6 whitespace-nowrap"
        >
          {loading ? "Adding you…" : "Join the waitlist →"}
        </Button>
      </form>
      <p className="text-caption text-muted-foreground mt-3">
        No spam. One email when the certification opens. By joining you agree to our{" "}
        <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
      </p>
    </>
  );
}
