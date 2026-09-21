"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

// A little tag dangling from the top-right that flexes the meta-proof: the whole
// site is vibecoded, so come try it. Hidden on the vibecoding pages themselves
// (where the CTA already lives), and dismissible so repeat visitors aren't nagged.
export default function VibecodedTag() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true); // start hidden to avoid a flash before we know

  useEffect(() => {
    try {
      setHidden(localStorage.getItem("vibecoded-tag-dismissed") === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  const onVibecodingPage = pathname?.startsWith("/vibecoding") || pathname?.startsWith("/teamuitje");
  if (hidden || onVibecodingPage) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("vibecoded-tag-dismissed", "1");
    } catch {
      /* storage blocked; just hide for this view */
    }
    setHidden(true);
  };

  return (
    <div className="fixed top-0 right-3 sm:right-6 z-40 hidden sm:block print:hidden">
      {/* string */}
      <div className="w-px h-14 bg-foreground/25 ml-auto mr-8" />
      {/* tag */}
      <div className="vibe-tag-sway -mt-1.5">
        <div className="relative w-44 rounded-xl bg-sunny text-foreground shadow-[0_14px_30px_-10px_rgba(18,21,46,0.45)] ring-1 ring-foreground/10">
          {/* eyelet */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white ring-1 ring-foreground/25" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Sluiten"
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <Link href="/vibecoding" className="block px-4 pt-4 pb-3 text-center group">
            <p className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em]">Vibecoded</p>
            <p className="text-[12px] leading-snug mt-1 font-heading font-semibold">
              Ja, deze hele site ook.
              <span className="block text-accent group-hover:underline">Kom het zelf proberen &rarr;</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
