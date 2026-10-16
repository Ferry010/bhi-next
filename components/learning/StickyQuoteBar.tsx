"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// A translucent bar that keeps the price and the quote button in reach once the
// hero has scrolled away. It steps aside while the quote block itself is on
// screen, and near the footer, so it never covers the thing it points to.
export default function StickyQuoteBar({ title, priceFrom }: { title: string; priceFrom: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("quote"), document.querySelector("footer")].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-opacity ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-t border-border/60 bg-white/80 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white pb-[env(safe-area-inset-bottom,0px)]">
        <div className="container max-w-4xl flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="font-heading font-bold text-foreground text-sm md:text-base truncate">{title}</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              From <span className="font-semibold text-foreground tabular-nums">{priceFrom}</span> excl. VAT
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#call"
              tabIndex={show ? 0 : -1}
              className="hidden sm:inline-flex font-heading font-semibold text-sm text-foreground hover:text-accent px-3 h-10 items-center transition-colors"
            >
              Book a call
            </a>
            <a
              href="#quote"
              tabIndex={show ? 0 : -1}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-soft-coral active:scale-[0.97] transition font-heading font-semibold text-sm px-4 h-10"
            >
              Request a quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
