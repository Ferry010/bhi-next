"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

// Inline Calendly scheduler. Loads Calendly's widget script once and mounts the
// calendar into our own page, so booking a call never sends people off-site.
// Works on client-side navigation too (initInlineWidget instead of relying on
// the script's one-time DOM scan).
export default function CalendlyEmbed({
  url,
  fallbackLabel,
  bookedContent,
}: {
  url: string;
  fallbackLabel: string;
  /** Shown in place of the calendar once Calendly reports a booked meeting. */
  bookedContent?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [booked, setBooked] = useState(false);

  // Calendly posts a message to the parent page when a booking is confirmed.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      if (e.data?.event === "calendly.event_scheduled") {
        setBooked(true);
        requestAnimationFrame(() => wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const init = () => {
      if (!window.Calendly || el.querySelector("iframe")) return;
      window.Calendly.initInlineWidget({ url, parentElement: el });
      // The iframe paints a moment later; drop the placeholder once it exists.
      const iframe = el.querySelector("iframe");
      if (iframe) iframe.addEventListener("load", () => setReady(true), { once: true });
      else setReady(true);
    };

    if (window.Calendly) {
      init();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [url]);

  const showThanks = booked && !!bookedContent;

  // The calendar stays mounted (just hidden) after booking: Calendly's script owns
  // the iframe's DOM, so letting React tear it down mid-flight is fragile.
  return (
    <div ref={wrapRef} className="relative">
      {showThanks && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none">
          {bookedContent}
        </div>
      )}
      <div className={showThanks ? "hidden" : "relative"} aria-hidden={showThanks}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Loading the calendar…
          </div>
        )}
        <div ref={ref} className="relative min-w-[320px] h-[1080px] md:h-[720px]" />
        <noscript>
          <a href={url} className="underline">{fallbackLabel}</a>
        </noscript>
      </div>
    </div>
  );
}
