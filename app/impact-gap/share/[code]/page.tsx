"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStatus, setContact, rememberCode, markContactSaved, hasContactSaved } from "@/lib/impactGap/store";
import { isValidCodeShape } from "@/lib/impactGap/code";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";
import { Check, Copy, ArrowRight, Mail } from "lucide-react";

type State = "loading" | "ok" | "missing";

const FIELDS = [
  { id: "name", label: "Your name", type: "text", autoComplete: "name", placeholder: "Sam Okafor" },
  { id: "organisation", label: "Organisation", type: "text", autoComplete: "organization", placeholder: "Where you work" },
  { id: "role", label: "Your role", type: "text", autoComplete: "organization-title", placeholder: "What you do there" },
  { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
] as const;

export default function ImpactGapSharePage({ params }: { params: { code: string } }) {
  const code = params.code;
  const [state, setState] = useState<State>("loading");
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState<"link" | "message" | null>(null);

  const [values, setValues] = useState({ name: "", organisation: "", role: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);

  // This page is the leader's dashboard, and the only link they need to keep.
  // It checks itself every fifteen seconds so that a leader who leaves it open
  // while chasing their team watches the number climb, and sees the report
  // appear the moment the fifth reply lands. No email tells them: there is no
  // email service in this tool, on purpose.
  useEffect(() => {
    if (!isValidCodeShape(code)) {
      setState("missing");
      return;
    }
    let cancelled = false;

    const check = async () => {
      const r = await getStatus(code);
      if (cancelled) return;
      if (!r.ok || !r.exists) {
        setState((prev) => (prev === "loading" ? "missing" : prev));
        return;
      }
      rememberCode(code);
      setCount(r.count);
      setState("ok");

      // Anyone coming back to their dashboard should land on the dashboard, not
      // on the form again. Already given their details, or already collected
      // replies, means they are past that step.
      if (hasContactSaved(code)) setSaved(true);
      if (hasContactSaved(code) || r.count > 0) setRevealed(true);
    };

    check();
    const id = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [code]);

  const ready = count >= MIN_TEAM_RESPONSES;

  const link = typeof window !== "undefined" ? `${window.location.origin}/impact-gap/t/${code}` : "";

  const message = `I have been wondering what AI has actually changed about how we work here, rather than how much of it we use. I would rather know than assume.

This is six anonymous questions and takes about a minute. I never see anyone's answers on their own, only a summary, and only once at least ${MIN_TEAM_RESPONSES} people have replied.

Please answer honestly rather than kindly. An honest answer is the only kind that is any use to me here.

${link}`;

  // Opens the leader's own email app with the message ready to go, no email
  // service on our side. They add their team's addresses and hit send, which
  // keeps the promise that every email from this tool is one a person sent.
  const emailSubject = "A quick, anonymous question for the team";
  const mailtoHref = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;

  const copy = async (text: string, what: "link" | "message") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard blocked: the text is on screen and selectable anyway */
    }
  };

  const saveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "We need a name to know who we are writing to.";
    if (!values.organisation.trim()) next.organisation = "Which organisation is this team part of?";
    if (!values.role.trim()) next.role = "Your role helps us read the result properly.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "That does not look like a working email address.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    await setContact(code, values);
    setSaving(false);
    markContactSaved(code);
    setSaved(true);
    setRevealed(true);
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <ToolHeader />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-2xl">{children}</div>
      </main>
      <ToolFooter />
    </>
  );

  if (state === "loading")
    return (
      <Shell>
        <p role="status" className="text-body-lg text-muted-foreground">
          Getting your link ready…
        </p>
      </Shell>
    );

  if (state === "missing")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot find this one</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          The link may have been mistyped, or it may belong to a test that was never finished.
          Answering the six questions again takes two minutes and gives you a fresh link.
        </p>
        <Link href="/impact-gap/start" className="mt-8 inline-block">
          <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral">
            Start again <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </Shell>
    );

  return (
    <>
      <ToolHeader />
      <main>
        <section className="bg-secondary pt-28 pb-16 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">
              {ready ? "Your team has answered" : "Now the half that matters"}
            </h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              {ready
                ? "Enough of your team has answered the same six questions, so there is now something to compare your answers against. This page stays here: it is your link back to the report, and to the message if you want more people to reply."
                : "Your answers are saved. What you have so far is one opinion about your team, which is the thing you already had this morning. The test only becomes worth anything once your team has answered the same six questions, so this step is the whole exercise rather than an extra one."}
            </p>

            {/* Contact. Asked once, here, and nowhere else in the flow. */}
            <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-white p-6">
              {saved ? (
                <div>
                  <p className="font-heading text-lg font-bold text-primary">
                    Thank you, {values.name.split(" ")[0]}.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Keep this page bookmarked. It updates itself, and your report appears here the
                    moment enough of your team has replied. Once it does, Ferry or Jonathan will
                    read it and write to you personally within two working days. That is the only
                    message you will get from us about this, and a person types it.
                  </p>
                </div>
              ) : (
                <form onSubmit={saveContact} noValidate>
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Where should the report go?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We use this for one thing: so Ferry or Jonathan can write to you about what your
                    result actually means. There is no mailing list, no automated sequence and no
                    third party. This tool cannot send you an email even if we wanted it to, because
                    there is no email service behind it.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.id} className={f.id === "email" ? "sm:col-span-2" : undefined}>
                        <label
                          htmlFor={f.id}
                          className="block font-heading text-sm font-semibold text-foreground"
                        >
                          {f.label}
                        </label>
                        <Input
                          id={f.id}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          placeholder={f.placeholder}
                          value={values[f.id]}
                          onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                          aria-invalid={Boolean(errors[f.id])}
                          aria-describedby={errors[f.id] ? `err-${f.id}` : undefined}
                          className="mt-1.5 h-12 rounded-lg"
                        />
                        {errors[f.id] && (
                          <p id={`err-${f.id}`} role="alert" className="mt-1.5 text-sm font-medium text-accent">
                            {errors[f.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="btn-scale h-12 rounded-full bg-accent px-8 font-heading font-semibold text-accent-foreground hover:bg-soft-coral"
                    >
                      {saving ? "Saving…" : "Save and show my link"}
                    </Button>
                    {!revealed && (
                      <button
                        type="button"
                        onClick={() => setRevealed(true)}
                        className="rounded text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        I would rather not, just show me the link
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {revealed && (
              <>
                <div className="mt-5 rounded-2xl border border-border bg-white p-6">
                  <label htmlFor="share-link" className="block font-heading font-bold text-foreground">
                    Your team&apos;s anonymous link
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
                  <p className="mt-3 text-sm text-muted-foreground">
                    Anyone with this link can answer, and nobody needs an account. Keep it somewhere
                    you can find it, because it is also the way back to your report.
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
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <a href={mailtoHref}>
                      <Button
                        type="button"
                        className="btn-scale h-12 w-full rounded-full bg-accent px-8 font-heading font-semibold text-accent-foreground hover:bg-soft-coral sm:w-auto"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="ml-2">Email my team</span>
                      </Button>
                    </a>
                    <span className="text-sm text-muted-foreground">
                      Opens your own email app with this ready to send. Add your team and go.
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    The line asking for honesty rather than kindness does more work than the rest of
                    the message put together. Rewrite the whole thing in your own words if you like,
                    but keep that part.
                  </p>
                </div>

                <div
                  className={`mt-8 rounded-2xl p-6 ${
                    ready ? "border-2 border-primary bg-primary/5" : "bg-cream"
                  }`}
                  aria-live="polite"
                >
                  {ready ? (
                    <>
                      <p className="font-heading text-lg font-bold text-primary">
                        Your report is ready
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {count} {count === 1 ? "person has" : "people have"} answered, which is
                        enough to show you the result without anyone being identifiable. Ferry or
                        Jonathan will read it and write to you within two working days.
                      </p>
                      <Link href={`/impact-gap/report/${code}`} className="mt-4 inline-block">
                        <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading font-semibold text-accent-foreground hover:bg-soft-coral">
                          Read my report <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="font-heading text-lg font-bold text-foreground">
                        {count} of {MIN_TEAM_RESPONSES} replies so far
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Your report opens at {MIN_TEAM_RESPONSES}. Below that number it becomes
                        possible to work out who said what, so it stays shut until that risk is
                        gone. Send the link to more people than you need, because not everyone
                        answers. This page checks for itself, so you can leave it open.
                      </p>
                    </>
                  )}
                </div>

              </>
            )}
          </div>
        </section>
      </main>
      <ToolFooter />
    </>
  );
}
