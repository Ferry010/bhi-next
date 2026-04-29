"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";

export default function EnglishEditionClient() {
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
      const supabase = createSupabaseBrowserClient();
      await (supabase.from as (table: string) => ReturnType<typeof supabase.from>)("english_book_requests").insert({ email: email.trim() } as never);
      await (supabase.from as (table: string) => ReturnType<typeof supabase.from>)("form_submissions").insert({
        id: submissionId,
        form_type: "book_request",
        data: formData,
      } as never);
      supabase.functions.invoke("notify-slack", {
        body: { form_type: "book_english_edition", data: formData },
      });
      notifyByEmail("book_request", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream section-padding">
      <div className="container max-w-xl text-center">
        <h2 className="text-display text-foreground mb-4">Be the first to know.</h2>
        <p className="text-body text-muted-foreground mb-8">
          Drop your email and we will let you know the moment the English edition is available. No spam. Just one email when it matters.
        </p>

        {submitted ? (
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(18,21,46,0.08)]">
            <p className="text-lg font-heading font-semibold text-foreground">You are on the list.</p>
            <p className="text-sm text-muted-foreground mt-2">
              We will email you as soon as the English edition is ready.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-full px-5 h-12"
              />
              <Button
                type="submit"
                disabled={loading}
                className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral font-heading font-semibold px-6 h-12"
              >
                {loading ? "Sending..." : "Notify me"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              By submitting you agree to our{" "}
              <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
              {" "}We&apos;ll only email you when the English edition is ready.
            </p>
          </>
        )}

        <div className="mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-accent hover:underline"
          >
            Read about the Dutch edition <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
