"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStatus, setContact, rememberCode } from "@/lib/impactGap/store";
import { isValidCodeShape } from "@/lib/impactGap/code";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";
import { Check, Copy, ArrowRight } from "lucide-react";

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

  useEffect(() => {
    if (!isValidCodeShape(code)) {
      setState("missing");
      return;
    }
    getStatus(code).then((r) => {
      if (!r.ok || !r.exists) {
        setState("missing");
        return;
      }
      rememberCode(code);
      setCount(r.count);
      setState("ok");
    });
  }, [code]);

  const link = typeof window !== "undefined" ? `${window.location.origin}/impact-gap/t/${code}` : "";

  const message = `I have been wondering what AI has actually changed about how we work here, rather than how much of it we use. I would rather know than assume.

This is six anonymous questions and takes about a minute. I never see anyone's answers on their own, only a summary, and only once at least ${MIN_TEAM_RESPONSES} people have replied.

Please answer honestly rather than kindly. An honest answer is the only kind that is any use to me here.

${link}`;

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
            <h1 className="text-hero text-foreground">Now the half that matters</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Your answers are saved. What you have so far is one opinion about your team, which is
              the thing you already had this morning. The test only becomes worth anything once your
              team has answered the same six questions, so this step is the whole exercise rather
              than an extra one.
            </p>

            {/* Contact. Asked once, here, and nowhere else in the flow. */}
            <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-white p-6">
              {saved ? (
                <div>
                  <p className="font-heading text-lg font-bold text-primary">
                    Thank you, {values.name.split(" ")[0]}.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We will email you the moment your report is ready, and then Ferry or Jonathan
                    will read it and write to you personally within two working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={saveContact} noValidate>
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Where should the report go?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We use this for two things and nothing else: telling you when your report is
                    ready, and letting Ferry or Jonathan write to you personally about what it says.
                    No list, no sequence, and we never pass it to anyone.
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
                  <p className="mt-3 text-sm text-muted-foreground">
                    The line asking for honesty rather than kindness does more work than the rest of
                    the message put together. Rewrite the whole thing in your own words if you like,
                    but keep that part.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-cream p-6">
                  <p className="font-heading text-lg font-bold text-foreground">
                    {count} of {MIN_TEAM_RESPONSES} replies so far
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Your report opens at {MIN_TEAM_RESPONSES}. Below that number it becomes possible
                    to work out who said what, so the report stays shut until that risk is gone. Send
                    the link to more people than you need, because not everyone answers.
                  </p>
                  <Link href={`/impact-gap/report/${code}`} className="mt-4 inline-block">
                    <Button
                      variant="outline"
                      className="btn-scale rounded-full border-2 font-heading font-semibold"
                    >
                      Check my report <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
