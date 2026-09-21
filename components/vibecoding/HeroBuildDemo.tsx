"use client";

import { useEffect, useRef, useState } from "react";
import type { VibeContent } from "./content";

const COLS = 7;
const ROWS = 6;
type Cell = null | "r" | "y";
const idx = (r: number, c: number) => r * COLS + c;

function drop(board: Cell[], col: number, who: "r" | "y") {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[idx(r, col)]) {
      const nb = board.slice();
      nb[idx(r, col)] = who;
      return nb;
    }
  }
  return null;
}
function wins(board: Cell[], who: "r" | "y") {
  const at = (r: number, c: number) => (r >= 0 && r < ROWS && c >= 0 && c < COLS ? board[idx(r, c)] : null);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (at(r, c) !== who) continue;
      for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        let k = 1;
        while (k < 4 && at(r + dr * k, c + dc * k) === who) k++;
        if (k >= 4) return true;
      }
    }
  }
  return false;
}
const openCols = (board: Cell[]) => {
  const cols: number[] = [];
  for (let c = 0; c < COLS; c++) if (!board[idx(0, c)]) cols.push(c);
  return cols;
};

// A genuinely playable Connect Four (4 op een rij). You are red, the AI is
// yellow. On-brand: blue board, red + yellow discs.
function ConnectFour({ lang }: { lang: "en" | "nl" }) {
  const [board, setBoard] = useState<Cell[]>(Array(COLS * ROWS).fill(null));
  const [winner, setWinner] = useState<null | "r" | "y" | "draw">(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const aiMove = (b: Cell[]) => {
    const cols = openCols(b);
    if (cols.length === 0) {
      setWinner("draw");
      setBusy(false);
      return;
    }
    let choice = cols.find((c) => {
      const nb = drop(b, c, "y");
      return nb && wins(nb, "y");
    });
    if (choice === undefined)
      choice = cols.find((c) => {
        const nb = drop(b, c, "r");
        return nb && wins(nb, "r");
      });
    if (choice === undefined) {
      const order = [3, 2, 4, 1, 5, 0, 6].filter((c) => cols.includes(c));
      choice = order[Math.floor(Math.random() * Math.min(3, order.length))] ?? cols[0];
    }
    const nb = drop(b, choice, "y")!;
    setBoard(nb);
    if (wins(nb, "y")) setWinner("y");
    else if (openCols(nb).length === 0) setWinner("draw");
    setBusy(false);
  };

  const play = (col: number) => {
    if (winner || busy) return;
    const nb = drop(board, col, "r");
    if (!nb) return;
    setBoard(nb);
    if (wins(nb, "r")) {
      setWinner("r");
      return;
    }
    if (openCols(nb).length === 0) {
      setWinner("draw");
      return;
    }
    setBusy(true);
    timer.current = setTimeout(() => aiMove(nb), 420);
  };

  const reset = () => {
    clearTimeout(timer.current);
    setBoard(Array(COLS * ROWS).fill(null));
    setWinner(null);
    setBusy(false);
  };

  const status =
    winner === "r"
      ? lang === "nl" ? "Jij wint! 🎉" : "You win! 🎉"
      : winner === "y"
      ? lang === "nl" ? "AI wint 🤖" : "AI wins 🤖"
      : winner === "draw"
      ? lang === "nl" ? "Gelijkspel" : "Draw"
      : lang === "nl" ? "Jij bent (rood). Klik een kolom." : "Your turn (red). Click a column.";

  return (
    <div className="h-full flex flex-col p-2.5">
      <div className="flex items-center justify-between px-1 mb-1.5">
        <span className="text-[11px] md:text-xs font-heading font-semibold text-foreground/80">4 op een rij</span>
        <span className="text-[11px] md:text-xs text-muted-foreground">{status}</span>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="grid grid-cols-7 gap-1 md:gap-1.5 bg-primary rounded-lg p-1.5 md:p-2 w-full max-w-[300px]">
          {Array.from({ length: COLS }).map((_, c) => (
            <button
              key={c}
              type="button"
              onClick={() => play(c)}
              disabled={!!winner || busy}
              aria-label={`Kolom ${c + 1}`}
              className="flex flex-col gap-1 md:gap-1.5 group"
            >
              {Array.from({ length: ROWS }).map((_, r) => {
                const v = board[idx(r, c)];
                return (
                  <span
                    key={r}
                    className={`aspect-square rounded-full transition-colors ${
                      v === "r" ? "bg-accent" : v === "y" ? "bg-sunny" : "bg-white group-hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </button>
          ))}
        </div>
      </div>
      {winner && (
        <div className="text-center mt-1.5">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border-[1.5px] border-foreground/30 px-4 py-1 text-[11px] md:text-xs font-heading font-semibold hover:border-accent transition-colors"
          >
            {lang === "nl" ? "Opnieuw" : "Play again"}
          </button>
        </div>
      )}
    </div>
  );
}

// The hero show-don't-tell: a floating chat types a plain-language prompt, the
// laptop screen shows "building", and ~2s later a real, playable game appears.
export default function HeroBuildDemo({ phone, lang }: { phone: VibeContent["hero"]["phone"]; lang: "en" | "nl" }) {
  const msg = phone.userMessage;
  const [phase, setPhase] = useState<"typing" | "reply" | "building" | "done">("typing");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const type = () => {
      i++;
      setTyped(msg.slice(0, i));
      if (i < msg.length) timers.push(setTimeout(type, 45));
      else {
        timers.push(setTimeout(() => setPhase("reply"), 450));
        timers.push(setTimeout(() => setPhase("building"), 1050));
        timers.push(setTimeout(() => setPhase("done"), 3050));
      }
    };
    timers.push(setTimeout(type, 650));
    return () => timers.forEach(clearTimeout);
  }, [msg]);

  return (
    <div className="relative pt-10 md:pt-6">
      {/* Laptop */}
      <div className="w-full max-w-lg mx-auto">
        <div className="rounded-t-2xl bg-foreground p-3 shadow-[0_30px_70px_-20px_rgba(18,21,46,0.5)]">
          <div className="rounded-lg bg-cream overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
            {phase !== "done" ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                {phase === "building" ? (
                  <>
                    <span className="font-heading font-bold text-foreground">{phone.status}</span>
                    <span className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "300ms" }} />
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-sm text-muted-foreground">
                    {lang === "nl" ? "wachten op je opdracht" : "waiting for your prompt"}
                    <span className="animate-pulse">▋</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="h-full animate-in fade-in zoom-in-95 duration-500">
                <ConnectFour lang={lang} />
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto h-3 w-[112%] -ml-[6%] rounded-b-xl bg-foreground/85" />
      </div>

      {/* Floating chat */}
      <div className="absolute top-0 left-0 md:-left-6 w-52 rotate-[-3deg] rounded-2xl bg-white border border-border/50 shadow-[0_18px_45px_-12px_rgba(18,21,46,0.4)] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50 bg-cream">
          <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent text-[9px] font-heading font-bold">AI</span>
          <span className="font-heading font-bold text-xs text-foreground">{phone.appName}</span>
        </div>
        <div className="p-2.5 space-y-2">
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-primary text-white px-2.5 py-1.5">
              <p className="text-[11px] leading-snug">
                {typed || " "}
                {phase === "typing" && <span className="animate-pulse">▋</span>}
              </p>
            </div>
          </div>
          {(phase === "reply" || phase === "building" || phase === "done") && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white border border-border/50 px-2.5 py-1.5">
                <p className="text-[11px] leading-snug text-foreground/80">{phone.aiReply}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
