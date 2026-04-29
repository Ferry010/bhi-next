"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BookSection() {
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
      await createSupabaseBrowserClient().from("english_book_requests" as any).insert({ email: email.trim() } as any);
      await createSupabaseBrowserClient().from("form_submissions" as any).insert({ id: submissionId, form_type: "book_request", data: formData } as any);
      createSupabaseBrowserClient().functions.invoke("notify-slack", { body: { form_type: "book_request", data: formData } });
      notifyByEmail("book_request", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="bg-secondary section-padding">
      <div className="container">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex justify-center">
            <div
              className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 -rotate-3"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-foreground/10 rounded-full blur-xl" />
              <img
                src="/assets/book-cover.jpg"
                alt="Brand Humanizing book by Ferry Hoes and Jonathan Flores"
                loading="lazy"
                className="relative w-56 md:w-72 rounded-lg shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)]"
              />
            </div>
          </div>

          <div className={`space-y-5 md:space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            <span className="text-text-light text-caption uppercase tracking-widest font-heading font-semibold">The book</span>
            <h2 className="text-display md:text-display-lg text-foreground">
              We wrote the book on it. Literally.
            </h2>
            <p className="text-sm md:text-body-lg text-text-light">
              <em>Brand Humanizing: The superpower that makes your brand more human and your business grow faster</em>, written by Ferry Hoes and Jonathan Flores.
            </p>
            <p className="text-sm md:text-body-lg text-text-light">
              If you want to go deep on the methodology, the research, and the real-world application of Brand Humanizing, this is where to start.
            </p>
            <Link href="/book">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-5 h-10 text-sm md:px-8 md:h-12 md:text-base mt-2">
                Learn more about the book →
              </Button>
            </Link>
            <p className="text-sm text-text-light mt-3">
              Every session participant receives a copy. <Link href="/learning" className="text-accent hover:underline font-medium">See sessions →</Link>
            </p>

            <div className="mt-6 pt-6 border-t border-border">
              <span className="inline-flex items-center gap-2 text-caption text-text-light font-heading font-semibold tracking-widest uppercase">
                🇳🇱 Available now in Dutch · English coming soon
              </span>
              <p className="text-foreground font-semibold text-base md:text-lg mt-2">
                Want to help us bring it to English?
              </p>

              {submitted ? (
                <p className="text-accent font-heading font-semibold mt-4">
                  Got it! We&apos;ll be in touch. 🙌
                </p>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-full h-11 px-5 flex-1 border border-input bg-background focus-visible:ring-accent"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-11 px-6 whitespace-nowrap"
                    >
                      {loading ? "Sending…" : "Be first to get the English edition →"}
                    </Button>
                  </form>
                  <p className="text-caption text-primary/70 mt-3 font-medium">
                    Your vote counts. We&apos;ll let you know when it&apos;s ready.{" "}
                    By submitting you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
