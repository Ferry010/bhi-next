"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// A little tag dangling from the top-right of the vibecoding pages: the meta
// proof that the offer works, right where people decide. This whole site (this
// page included) was vibecoded, so come try it. "Try it" scrolls to the inline
// builder. Dismissible; desktop only.
const COPY = {
  nl: { label: "Vibecoded", line: "Ja, deze hele site ook.", cta: "Kom het zelf proberen →" },
  en: { label: "Vibecoded", line: "Yep, this whole site too.", cta: "Try it yourself →" },
};

export default function VibecodedTag({ lang }: { lang: "en" | "nl" }) {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid a flash before we know
  const [show, setShow] = useState(false); // scroll position says it should be visible
  const [render, setRender] = useState(false); // kept mounted during the fall-off animation
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem("vibecoded-tag-dismissed") === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      // Hysteresis: dangle in once past the hero, fall off only near the very top.
      setShow((prev) => (y > h * 0.7 ? true : y < h * 0.25 ? false : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (show) {
      setRender(true);
      setExiting(false);
    } else if (render) {
      setExiting(true);
      const t = setTimeout(() => {
        setRender(false);
        setExiting(false);
      }, 480);
      return () => clearTimeout(t);
    }
  }, [show, render]);

  if (dismissed || !render) return null;
  const t = COPY[lang];

  const dismiss = () => {
    try {
      localStorage.setItem("vibecoded-tag-dismissed", "1");
    } catch {
      /* storage blocked; just hide for this view */
    }
    setDismissed(true);
  };

  return (
    <div className={`fixed top-14 right-3 sm:right-6 z-40 hidden sm:block print:hidden ${exiting ? "vibe-tag-exit" : "vibe-tag-enter"}`}>
      {/* string, hangs from the menu bar */}
      <div className="w-px h-8 bg-foreground/25 ml-auto mr-8" />
      {/* tag */}
      <div className="vibe-tag-sway -mt-1.5">
        <div className="relative w-44 rounded-xl bg-sunny text-foreground shadow-[0_14px_30px_-10px_rgba(18,21,46,0.45)] ring-1 ring-foreground/10">
          {/* eyelet */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white ring-1 ring-foreground/25" />
          <button
            type="button"
            onClick={dismiss}
            aria-label={lang === "nl" ? "Sluiten" : "Close"}
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <a href="#wat-is-vibecoding" className="block px-4 pt-4 pb-3 text-center group">
            <p className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em]">{t.label}</p>
            <p className="text-[12px] leading-snug mt-1 font-heading font-semibold">
              {t.line}
              <span className="block text-accent group-hover:underline">{t.cta}</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
