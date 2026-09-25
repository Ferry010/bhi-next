"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, Mail, Send } from "lucide-react";

// A low-commitment exit-saver: someone not ready to book can leave their email
// (a soft lead we follow up on) or forward the page to a colleague from their
// own mail client (a mailto — no backend, no spam risk).
export default function VibecodingSave({ lang }: { lang: "en" | "nl" }) {
  const nl = lang === "nl";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const t = nl
    ? {
        heading: "Nog niet klaar om te boeken?",
        sub: "Laat je e-mail achter, dan sturen we je de details. Handig om er nog even over na te denken of te delen met je team.",
        placeholder: "Je e-mail",
        submit: "Stuur me de details",
        sending: "Versturen…",
        confirm: "Top, genoteerd. We sturen je de details toe, meestal binnen een werkdag.",
        share: "Of deel deze pagina met een collega",
        mailSubject: "Dit teamuitje: samen een app bouwen met AI",
        mailBody: "Hoi,\n\nDit leek me wat voor ons team: een teamdag waarop je samen een werkende app bouwt met AI, zonder te programmeren.\n\n",
      }
    : {
        heading: "Not ready to book?",
        sub: "Leave your email and we'll send you the details. Handy to think it over, or share with your team.",
        placeholder: "Your email",
        submit: "Send me the details",
        sending: "Sending…",
        confirm: "Got it. We'll send you the details, usually within a working day.",
        share: "Or share this page with a colleague",
        mailSubject: "This team day: build an app together with AI",
        mailBody: "Hi,\n\nThought this might be for our team: a team day where you build a working app together with AI, no coding.\n\n",
      };

  const getGclid = () => {
    try {
      return (
        sessionStorage.getItem("vibe:gclid") ||
        new URLSearchParams(window.location.search).get("gclid") ||
        ""
      );
    } catch {
      return "";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const data = { email: email.trim(), gclid: getGclid() || undefined, language: lang };
    try {
      await createSupabaseBrowserClient()
        .from("form_submissions" as never)
        .insert({ id: crypto.randomUUID(), form_type: "vibecoding_save", data } as never);
      createSupabaseBrowserClient().functions.invoke("notify-slack", {
        body: { form_type: "vibecoding_save", data },
      });
      // Also push it to the dedicated #vibecoding-workshop channel.
      fetch("/api/vibecoding/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "vibecoding_save", data }),
      }).catch(() => {});
    } catch {
      // Best-effort: never block the person on an error.
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  const shareToColleague = () => {
    const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
    const href = `mailto:?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody + url)}`;
    window.location.href = href;
  };

  return (
    <section className="py-14 md:py-20 bg-cream border-t border-border/40">
      <div className="container max-w-2xl">
        <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-9 text-center">
          {sent ? (
            <div className="py-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <p className="text-body-lg text-foreground font-heading font-semibold max-w-md mx-auto">{t.confirm}</p>
            </div>
          ) : (
            <>
              <h2 className="text-section md:text-display text-foreground font-heading font-bold">{t.heading}</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t.sub}</p>
              <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                  className="rounded-full h-12 px-5 flex-1 border border-input bg-white focus-visible:ring-accent"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 px-6 gap-2 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" /> {loading ? t.sending : t.submit}
                </Button>
              </form>
              <button
                type="button"
                onClick={shareToColleague}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-primary hover:text-accent transition-colors"
              >
                <Send className="w-4 h-4" /> {t.share}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
