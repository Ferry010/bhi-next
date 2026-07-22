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
      <p className="text-[#C9A96E] font-heading font-semibold mt-4">
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
          className="rounded-full h-11 px-5 flex-1 border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[#5AA6B2]"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#C9A96E] text-[#0F1117] hover:brightness-110 btn-scale font-heading font-semibold h-11 px-6 whitespace-nowrap"
        >
          {loading ? "Adding you…" : "Join the waitlist →"}
        </Button>
      </form>
      <p className="text-caption text-white/40 mt-3">
        No spam. One email when the certification opens. By joining you agree to our{" "}
        <a href="/privacy" className="underline hover:text-white/70">Privacy Policy</a>.
      </p>
    </>
  );
}
