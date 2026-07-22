"use client";

import { useEffect, useRef, useState } from "react";

// Animates the numeric part of a stat (e.g. "50+", "~40") from 0 to target
// once it scrolls into view. Years and large numbers render static, and it
// fully respects prefers-reduced-motion. Non-numeric strings pass through.
export default function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/(\d[\d,]*)/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const animatable = target !== null && target < 1000; // skip years, ids, etc.
  const [display, setDisplay] = useState(animatable ? value.replace(match![1], "0") : value);
  const done = useRef(false);

  useEffect(() => {
    if (!animatable || done.current) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDisplay(value); done.current = true; return; }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const n = Math.round(eased * (target as number));
        setDisplay(value.replace(match![1], String(n)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}
