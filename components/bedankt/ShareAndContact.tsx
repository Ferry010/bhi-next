"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Mail, Link2, Check, Linkedin, CalendarDays } from "lucide-react";
import { TALK_TO_EXPERT } from "@/lib/pricing";

// Share targets. The link that gets shared is the live page URL (so a future
// per-event /bedankt/[event] shares its own url); we fall back to the canonical
// during SSR / before hydration.
const CANONICAL = "https://brandhumanizing.com/bedankt";
const SHARE_TITLE = "Brand Humanizing, de recap";
const SHARE_TEXT =
  "De recap van de keynote: de kern, de key takeaways en de vraag om maandag mee te beginnen.";
const MAIL_SUBJECT = "De recap van de Brand Humanizing keynote";
const FERRY_MAIL = "ferry@brandhumanizing.com";
const FERRY_LINKEDIN = "https://www.linkedin.com/in/ferryhoes/";

export default function ShareAndContact() {
  const [url, setUrl] = useState(CANONICAL);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href.split("#")[0]);
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  const mailHref = `mailto:?subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(
    `${SHARE_TEXT}\n\n${url}`
  )}`;
  const ferryMailHref = `mailto:${FERRY_MAIL}?subject=${encodeURIComponent("Naar aanleiding van de keynote")}`;

  const nativeShare = async () => {
    try {
      await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
    } catch {
      /* user cancelled the share sheet */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; the link is visible in the address bar anyway */
    }
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Share this recap */}
          <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-8">
            <div className="w-11 h-11 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">Stuur &apos;m door</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Ken je iemand die hierbij had moeten zijn? Mail de recap naar een collega, of naar jezelf om er maandag op terug te komen.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {canNativeShare && (
                <Button
                  onClick={nativeShare}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-11 gap-2"
                >
                  <Share2 className="w-4 h-4" /> Deel
                </Button>
              )}
              <a href={mailHref}>
                <Button
                  variant="outline"
                  className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2"
                >
                  <Mail className="w-4 h-4" /> Mail de recap
                </Button>
              </a>
              <Button
                onClick={copyLink}
                variant="outline"
                className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
                {copied ? "Gekopieerd" : "Kopieer link"}
              </Button>
            </div>
          </div>

          {/* Contact Ferry */}
          <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-8">
            <div className="w-11 h-11 rounded-xl bg-[rgba(17,84,172,0.1)] flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">Even direct contact?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Een vraag, een idee, of gewoon kennismaken? Je komt rechtstreeks bij mij uit. Ik lees mijn eigen mail.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href={ferryMailHref}>
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 btn-scale font-heading font-semibold px-6 h-11 gap-2">
                  <Mail className="w-4 h-4" /> Mail Ferry
                </Button>
              </a>
              <a href={FERRY_LINKEDIN} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Button>
              </a>
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-6 h-11 gap-2"
                >
                  <CalendarDays className="w-4 h-4" /> Plan een gesprek
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
