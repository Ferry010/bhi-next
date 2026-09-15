"use client";

import { useEffect, useRef, useState } from "react";
import type { VibeContent } from "./content";

// The "day after" colleague chat, revealed message by message like a real
// conversation: a typing bubble, then the message pops in. Starts when the card
// scrolls into view.
export default function VibecodingChat({ content }: { content: VibeContent["chat"] }) {
  const messages = content.messages;
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || visible >= messages.length) return;
    const next = messages[visible];
    const delay = 550 + Math.min(1100, next.text.length * 22);
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [started, visible, messages]);

  const typing = started && visible < messages.length ? messages[visible] : null;

  return (
    <div className="rounded-2xl bg-cream border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-5 md:p-7">
      <div ref={ref} className="min-h-[20rem] flex flex-col justify-end space-y-3">
        {messages.slice(0, visible).map((m, i) => (
          <div
            key={i}
            className={`flex animate-in fade-in slide-in-from-bottom-2 duration-300 ${m.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex flex-col max-w-[82%] ${m.side === "right" ? "items-end" : "items-start"}`}>
              <span className="text-[11px] font-heading font-semibold text-muted-foreground mb-1 px-1">{m.name}</span>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  m.side === "right"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white border border-border/50 text-foreground/90 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className={`flex ${typing.side === "right" ? "justify-end" : "justify-start"}`}>
            <div className={`flex flex-col max-w-[82%] ${typing.side === "right" ? "items-end" : "items-start"}`}>
              <span className="text-[11px] font-heading font-semibold text-muted-foreground mb-1 px-1">{typing.name}</span>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  typing.side === "right" ? "bg-primary/70 rounded-br-sm" : "bg-white border border-border/50 rounded-bl-sm"
                }`}
              >
                <span className="flex gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${typing.side === "right" ? "bg-white" : "bg-muted-foreground"}`} style={{ animationDelay: "0ms" }} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${typing.side === "right" ? "bg-white" : "bg-muted-foreground"}`} style={{ animationDelay: "150ms" }} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${typing.side === "right" ? "bg-white" : "bg-muted-foreground"}`} style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
