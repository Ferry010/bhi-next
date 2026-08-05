"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recallCode, setLeaderEmail, getStatus } from "@/lib/trustGap/store";
import { MIN_TEAM_RESPONSES } from "@/lib/trustGap/questions";
import { Check, Copy, ArrowRight } from "lucide-react";

export default function TrustGapSharePage() {
  const [code, setCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<"link" | "message" | null>(null);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const c = recallCode();
    setCode(c);
    setReady(true);
    if (c) getStatus(c).then((r) => r.ok && setCount(r.count));
  }, []);

  const link = code && typeof window !== "undefined" ? `${window.location.origin}/trust-gap/t/${code}` : "";

  const message = `I have been thinking about how we use AI here, and I would rather know what is actually going on than guess.

This is six anonymous questions and takes about a minute. I never see individual answers, only a summary, and only once at least ${MIN_TEAM_RESPONSES} people have replied.

Please be honest. That is the entire point of it.

${link}`;

  const copy = async (text: string, what: "link" | "message") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard blocked, the text is selectable on screen anyway */
    }
  };

  const saveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("That does not look like a working email address.");
      return;
    }
    setEmailError(null);
    if (code) await setLeaderEmail(code, email.trim());
    setEmailSaved(true);
  };

  if (!ready) return null;

  if (!code) {
    return (
      <>
        <Navbar variant="light" />
        <main className="bg-secondary pt-28 pb-20 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">We could not find your link</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Your sharing link is remembered in this browser. If you have cleared your history,
              switched device or opened this in a private window, the quickest fix is to answer the
              six questions again. It takes two minutes.
            </p>
            <Link href="/trust-gap/start" className="mt-8 inline-block">
              <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral">
                Start again <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 pb-16 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">Now the half that matters</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Your answers are saved. Send this link to your team, and your report unlocks once{" "}
              {MIN_TEAM_RESPONSES} of them have replied. There is no way to see the result without
              this step, which is deliberate. Asking is the whole exercise.
            </p>

            <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-white p-6">
              <label htmlFor="share-link" className="block font-heading font-bold text-foreground">
                Your team's anonymous link
              </label>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  id="share-link"
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                  className="flex-1 rounded-lg border border-input bg-cream px-4 py-3 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button
                  type="button"
                  onClick={() => copy(link, "link")}
                  className="btn-scale h-12 rounded-lg bg-primary px-6 font-heading font-semibold text-primary-foreground"
                >
                  {copied === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied === "link" ? "Copied" : "Copy link"}</span>
                </Button>
              </div>
              <p aria-live="polite" className="sr-only">
                {copied === "link" ? "Link copied to clipboard" : ""}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading font-bold text-foreground">A message you can send</h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => copy(message, "message")}
                  className="btn-scale rounded-full border-2 font-heading font-semibold"
                >
                  {copied === "message" ? "Copied" : "Copy message"}
                </Button>
              </div>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-cream p-4 font-body text-sm leading-relaxed text-muted-foreground">
                {message}
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Saying you would rather know than guess does more work than anything else in this
                message. Feel free to rewrite it in your own words.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white p-6">
              {emailSaved ? (
                <p className="font-heading font-semibold text-primary">
                  Saved. We will email you when your report is ready.
                </p>
              ) : (
                <form onSubmit={saveEmail} noValidate>
                  <label htmlFor="leader-email" className="block font-heading font-bold text-foreground">
                    Want us to tell you when it unlocks?
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Optional. Used only to let you know the report is ready, and nothing else.
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="leader-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(emailError)}
                      aria-describedby={emailError ? "email-error" : undefined}
                      className="h-12 flex-1 rounded-lg"
                    />
                    <Button
                      type="submit"
                      className="btn-scale h-12 rounded-lg bg-accent px-6 font-heading font-semibold text-accent-foreground hover:bg-soft-coral"
                    >
                      Notify me
                    </Button>
                  </div>
                  {emailError && (
                    <p id="email-error" role="alert" className="mt-2 text-sm font-medium text-accent">
                      {emailError}
                    </p>
                  )}
                </form>
              )}
            </div>

            <div className="mt-8 rounded-2xl bg-cream p-6">
              <p className="font-heading font-bold text-foreground">
                {count} of {MIN_TEAM_RESPONSES} replies so far
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep this page or the report link somewhere safe. You can come back to it any time.
              </p>
              <Link href={`/trust-gap/report/${code}`} className="mt-4 inline-block">
                <Button
                  variant="outline"
                  className="btn-scale rounded-full border-2 font-heading font-semibold"
                >
                  Check my report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
