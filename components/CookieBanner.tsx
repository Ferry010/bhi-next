"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "bh-privacy-dismissed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-near-black rounded-3xl p-6 md:p-8 shadow-2xl border border-white/5">
        <div className="flex items-start gap-4">
          <div className="shrink-0 relative w-12 h-12 flex items-center justify-center">
            <span className="text-3xl" role="img" aria-label="cookie">🍪</span>
            <svg className="absolute inset-0 w-12 h-12" viewBox="0 0 48 48" fill="none">
              <line x1="8" y1="8" x2="40" y2="40" stroke="hsl(21 100% 58%)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              We don&apos;t use tracking cookies. We have no idea what you are doing on our website, as we cannot follow you around. This is a conscious decision made by us because if we would invite you to our office, we wouldn&apos;t follow your every move either.
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <Link href="/no-cookies" onClick={dismiss} className="text-accent hover:text-soft-coral text-sm font-heading font-semibold underline underline-offset-2 transition-colors">
            Read our no-cookie policy
          </Link>
          <Button onClick={dismiss} className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-10 text-sm">
            Fair enough
          </Button>
        </div>
      </div>
    </div>
  );
}
