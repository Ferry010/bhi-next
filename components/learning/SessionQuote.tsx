"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";
import { TALK_TO_EXPERT } from "@/lib/pricing";
import { ArrowRight, Check, Send } from "lucide-react";

type Tab = "quote" | "call";

// The conversion block on every session page: get an exact quote (five fields)
// or book a call, without leaving the page. A quote lands in Slack and becomes a
// HubSpot contact + deal (form type "session_quote"); a booked call does the same
// via /api/calendly-booked. Hero and sticky-bar buttons link to #quote / #call.
export default function SessionQuote({
  productName,
  productSlug,
  priceFrom,
  groupOptions,
}: {
  productName: string;
  productSlug: string;
  priceFrom?: string;
  groupOptions: string[];
}) {
  const [tab, setTab] = useState<Tab>("quote");
  const [callOpened, setCallOpened] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", group: "", timing: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // #call opens the calendar, #quote the form. Works for hero and sticky-bar links.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#call") setTab("call");
      else if (window.location.hash === "#quote") setTab("quote");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (tab === "call") setCallOpened(true); // Calendly only loads once someone asks for it
  }, [tab]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim() && form.company.trim() && form.email.trim() && form.phone.trim() && form.group;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    let gclid: string | undefined;
    try {
      gclid = new URLSearchParams(window.location.search).get("gclid") || sessionStorage.getItem("vibe:gclid") || undefined;
    } catch {
      gclid = undefined;
    }
    const data = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      group_size: form.group,
      timing: form.timing.trim() || undefined,
      product_name: productName,
      product: productSlug,
      price_from: priceFrom,
      from_page: window.location.pathname,
      gclid,
    };
    try {
      const id = crypto.randomUUID();
      const supabase = createSupabaseBrowserClient();
      await supabase.from("form_submissions" as never).insert({ id, form_type: "session_quote", data } as never);
      supabase.functions.invoke("notify-slack", { body: { form_type: "session_quote", data } });
      notifyByEmail("session_quote", data, id); // also files it in HubSpot (contact + deal)
    } catch {
      // Best-effort: never strand someone on an error.
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  const shareHref = () => {
    const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
    return `mailto:?subject=${encodeURIComponent(`${productName} for our team`)}&body=${encodeURIComponent(
      `Hi,\n\nThis could be a good fit for us: ${productName} by Brand Humanizing.${priceFrom ? ` From ${priceFrom}.` : ""}\n\n${url}\n`
    )}`;
  };

  const tabCls = (t: Tab) =>
    `flex-1 rounded-full px-5 py-2.5 text-sm md:text-base font-heading font-semibold transition-colors ${
      tab === t ? "bg-accent text-accent-foreground shadow-sm" : "text-foreground hover:bg-secondary"
    }`;
  const field = "rounded-xl h-12 px-4 border border-input bg-white focus-visible:ring-accent";

  return (
    <section id="quote" className="section-padding bg-secondary scroll-mt-12">
      <div className="container max-w-3xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display md:text-display-lg text-foreground">
            Your price, within <span className="text-accent">one working day</span>.
          </h2>
          <p className="text-body-lg text-muted-foreground mt-4">
            Five fields, and Ferry or Jonathan comes back with a date and an exact proposal for your team. Rather talk
            first? Book a call. No obligations either way.
          </p>
        </div>

        <div id="call" role="tablist" aria-label="Quote or call" className="scroll-mt-28 mt-8 flex max-w-md mx-auto rounded-full border border-border bg-white p-1 shadow-sm">
          <button role="tab" aria-selected={tab === "quote"} className={tabCls("quote")} onClick={() => setTab("quote")}>
            Request a quote
          </button>
          <button role="tab" aria-selected={tab === "call"} className={tabCls("call")} onClick={() => setTab("call")}>
            Book a call
          </button>
        </div>

        <div className="mt-8">
          <div hidden={tab !== "quote"}>
            {sent ? (
              <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] px-7 py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground">Got it. Your quote is on its way.</h3>
                <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                  Ferry or Jonathan comes back with a date and an exact proposal, usually within one working day.
                </p>
                <button onClick={() => setTab("call")} className="mt-6 inline-flex items-center gap-1.5 font-heading font-semibold text-primary hover:text-accent transition-colors">
                  Want to talk sooner? Book a call <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-foreground">
                    Your name
                    <Input autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} required className={field} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-foreground">
                    Company
                    <Input autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} required className={field} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-foreground">
                    Work email
                    <Input type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={field} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-foreground">
                    Phone number
                    <Input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required className={field} />
                  </label>
                </div>
                <fieldset className="mt-5">
                  <legend className="text-sm font-medium text-foreground mb-2">How many people?</legend>
                  <div className="flex flex-wrap gap-2">
                    {groupOptions.map((o) => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => set("group", o)}
                        aria-pressed={form.group === o}
                        className={`rounded-full border px-4 py-2 text-sm font-heading font-semibold transition-colors ${
                          form.group === o ? "border-accent bg-accent/10 text-accent" : "border-input bg-white text-foreground hover:border-accent"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="grid gap-1.5 text-sm font-medium text-foreground mt-5">
                  <span>
                    Roughly when? <span className="text-muted-foreground font-normal">(optional)</span>
                  </span>
                  <Input placeholder="e.g. our kick-off in March" value={form.timing} onChange={(e) => set("timing", e.target.value)} className={field} />
                </label>
                <Button
                  type="submit"
                  disabled={!valid || loading}
                  className="mt-6 w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 text-base gap-2"
                >
                  {loading ? "Sending…" : "Request my quote"} <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  A real human replies within one working day. We only use your details to get back to you.{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">Privacy policy</Link>
                </p>
              </form>
            )}
          </div>

          <div hidden={tab !== "call"}>
            {callOpened && (
              <>
                <CalendlyEmbed
                  url={`${TALK_TO_EXPERT.calendly}?primary_color=df302a&text_color=1c1c1c&background_color=ffffff`}
                  fallbackLabel="Open the calendar on Calendly"
                  product={productName}
                  bookedContent={
                    <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] px-7 py-10 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                        <Check className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-2xl text-foreground">
                        Booked. Looking forward to <span className="text-accent">meeting you</span>.
                      </h3>
                      <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                        A confirmation from Calendly is on its way to your inbox. No need to prepare anything. Bring your
                        situation, we&apos;ll take it from there.
                      </p>
                      <p className="font-handwritten text-3xl text-primary mt-5">Ferry</p>
                    </div>
                  }
                />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  The calendar is Calendly. It uses its own cookies to make the booking work, only once you open it.{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">Privacy policy</Link>
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Not deciding this alone?{" "}
          <a href={shareHref()} className="inline-flex items-center gap-1 font-heading font-semibold text-primary hover:text-accent transition-colors">
            <Send className="w-3.5 h-3.5" /> Send this page to a colleague
          </a>
        </p>
      </div>
    </section>
  );
}
