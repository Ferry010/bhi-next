"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Languages, Check, X } from "lucide-react";
import type { DemoContent, DemoApp } from "./demoContent";

// ── A genuinely playable Pong, drawn on a canvas ────────────────────────────
function PongGame({ youLabel, aiLabel, hint }: { youLabel: string; aiLabel: string; hint: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ you: 0, ai: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 900;
    const H = 460;
    canvas.width = W;
    canvas.height = H;
    const padH = 96;
    const padW = 13;
    const ballR = 10;
    const g = {
      playerY: H / 2 - padH / 2,
      targetY: H / 2 - padH / 2,
      aiY: H / 2 - padH / 2,
      bx: W / 2,
      by: H / 2,
      vx: 6 * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.random() * 5 - 2.5,
      you: 0,
      ai: 0,
    };
    const resetBall = (dir: number) => {
      g.bx = W / 2;
      g.by = H / 2;
      g.vx = 6 * dir;
      g.vy = Math.random() * 5 - 2.5;
    };
    let raf = 0;
    const draw = () => {
      // move player toward pointer target (smooth)
      g.playerY += (g.targetY - g.playerY) * 0.32;
      // simple AI: track the ball with a capped speed
      const aiC = g.aiY + padH / 2;
      if (aiC < g.by - 10) g.aiY += 5;
      else if (aiC > g.by + 10) g.aiY -= 5;
      g.playerY = Math.max(0, Math.min(H - padH, g.playerY));
      g.aiY = Math.max(0, Math.min(H - padH, g.aiY));
      // ball
      g.bx += g.vx;
      g.by += g.vy;
      if (g.by < ballR || g.by > H - ballR) g.vy *= -1;
      if (g.bx - ballR < 26 + padW && g.by > g.playerY && g.by < g.playerY + padH && g.vx < 0) {
        g.vx *= -1.06;
        g.vy += (g.by - (g.playerY + padH / 2)) * 0.09;
        g.bx = 26 + padW + ballR;
      }
      if (g.bx + ballR > W - 26 - padW && g.by > g.aiY && g.by < g.aiY + padH && g.vx > 0) {
        g.vx *= -1.06;
        g.vy += (g.by - (g.aiY + padH / 2)) * 0.09;
        g.bx = W - 26 - padW - ballR;
      }
      g.vx = Math.max(-13, Math.min(13, g.vx));
      if (g.bx < -ballR) {
        g.ai++;
        setScore({ you: g.you, ai: g.ai });
        resetBall(1);
      }
      if (g.bx > W + ballR) {
        g.you++;
        setScore({ you: g.you, ai: g.ai });
        resetBall(-1);
      }
      // paint
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#e8e2d8";
      ctx.lineWidth = 3;
      ctx.setLineDash([11, 15]);
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#1c1c1c";
      ctx.fillRect(26, g.playerY, padW, padH);
      ctx.fillStyle = "#df302a";
      ctx.fillRect(W - 26 - padW, g.aiY, padW, padH);
      ctx.fillStyle = "#1c1c1c";
      ctx.beginPath();
      ctx.arc(g.bx, g.by, ballR, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const setTarget = (clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      g.targetY = (clientY - rect.top) * (H / rect.height) - padH / 2;
    };
    const onMouse = (e: MouseEvent) => setTarget(e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && setTarget(e.touches[0].clientY);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-6 md:gap-10 mb-3">
        <span className="font-heading font-bold text-foreground flex items-baseline gap-2">
          {youLabel} <span className="text-3xl tabular-nums">{score.you}</span>
        </span>
        <span className="font-heading font-bold text-accent flex items-baseline gap-2">
          {aiLabel} <span className="text-3xl tabular-nums">{score.ai}</span>
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-xl border border-border/50 bg-white touch-none"
        style={{ aspectRatio: "900 / 460" }}
      />
      <p className="text-center text-sm text-muted-foreground mt-3">{hint}</p>
    </div>
  );
}

// ── A working name generator ─────────────────────────────────────────────────
function BabyName({ firstNames, vibes, label }: { firstNames: string[]; vibes: string[]; label: string }) {
  const pick = () => ({
    name: firstNames[Math.floor(Math.random() * firstNames.length)],
    vibe: vibes[Math.floor(Math.random() * vibes.length)],
  });
  const [cur, setCur] = useState(pick);
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="rounded-2xl bg-cream border border-border/50 px-6 py-12">
        <span className="font-heading font-extrabold text-5xl md:text-6xl text-foreground">{cur.name}</span>
        <p className="text-muted-foreground mt-4 text-lg">{cur.vibe}</p>
      </div>
      <Button
        type="button"
        onClick={() => setCur(pick())}
        className="mt-5 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 px-7 text-base"
      >
        {label}
      </Button>
    </div>
  );
}

// ── The rendered mini-app inside the "browser" frame ────────────────────────
function AppResult({ app, doneLabel }: { app: DemoApp; doneLabel: string }) {
  const [quizPick, setQuizPick] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-accent">{doneLabel}</span>
        <h4 className="font-heading font-extrabold text-2xl text-foreground">{app.title}</h4>
      </div>

      {app.kind === "pong" && (
        <div className="mt-5">
          <PongGame youLabel={app.youLabel} aiLabel={app.aiLabel} hint={app.hint} />
        </div>
      )}

      {app.kind === "babyname" && (
        <div className="mt-6">
          <BabyName firstNames={app.firstNames} vibes={app.vibes} label={app.generateLabel} />
        </div>
      )}

      {app.kind === "quiz" && (
        <div className="mt-5 max-w-md">
          <p className="text-foreground/80 text-lg">{app.question}</p>
          <div className="mt-4 space-y-2">
            {app.options.map((o, i) => {
              const picked = quizPick !== null;
              const isAnswer = i === app.answer;
              const cls = !picked
                ? "bg-cream border-border/50 text-foreground/80 hover:border-accent"
                : isAnswer
                ? "bg-primary/10 border-primary text-primary"
                : "bg-cream border-border/50 text-foreground/40";
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setQuizPick(i)}
                  className={`w-full text-left rounded-xl px-4 py-3 font-heading font-semibold border transition-colors ${cls}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {quizPick !== null && <p className="text-sm text-muted-foreground mt-3">{app.answerNote}</p>}
        </div>
      )}
    </div>
  );
}

// ── The prompt -> build demo, on one big screen ──────────────────────────────
function Builder({ c }: { c: DemoContent["builder"] }) {
  const [appId, setAppId] = useState(c.apps[0].id);
  const [phase, setPhase] = useState<"idle" | "building" | "done">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const app = c.apps.find((a) => a.id === appId)!;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const build = () => {
    clearTimers();
    setPhase("building");
    setStepIdx(0);
    c.buildingSteps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStepIdx(i), i * 550));
    });
    timers.current.push(setTimeout(() => setPhase("done"), c.buildingSteps.length * 550 + 350));
  };

  const pick = (id: string) => {
    clearTimers();
    setAppId(id);
    setPhase("idle");
  };

  return (
    <div>
      {/* Prompt picker */}
      <span className="text-sm font-heading font-bold text-foreground">{c.promptLabel}</span>
      <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
        {c.apps.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => pick(a.id)}
            className={`flex-1 text-left sm:text-center rounded-xl px-4 py-3 font-heading font-semibold border transition-colors ${
              a.id === appId ? "bg-accent/10 border-accent text-accent" : "bg-white border-border/50 text-foreground/80 hover:border-accent"
            }`}
          >
            &ldquo;{a.prompt}&rdquo;
          </button>
        ))}
      </div>
      <Button
        type="button"
        onClick={build}
        disabled={phase === "building"}
        className="mt-4 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 px-7 text-base gap-2"
      >
        {phase === "building" ? c.buildingSteps[stepIdx] : c.buildCta} <ArrowRight className="w-4 h-4" />
      </Button>

      {/* One big screen */}
      <div className="mt-7 rounded-2xl bg-white border border-border/50 shadow-[0_20px_60px_-25px_rgba(18,21,46,0.4)] overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50 bg-cream">
          <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-sunny" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
        </div>
        <div className="p-5 md:p-8 min-h-[24rem] md:min-h-[30rem] flex flex-col justify-center">
          {phase === "idle" && <p className="text-muted-foreground text-center">{c.idleHint}</p>}
          {phase === "building" && (
            <div className="space-y-2 font-mono text-sm md:text-base text-muted-foreground">
              {c.buildingSteps.slice(0, stepIdx + 1).map((s, i) => (
                <p key={i} className={i === stepIdx ? "text-foreground" : ""}>
                  <span className="text-accent">&gt;</span> {s}
                  {i === stepIdx ? <span className="animate-pulse">▋</span> : " ✓"}
                </p>
              ))}
            </div>
          )}
          {phase === "done" && <AppResult key={app.id} app={app} doneLabel={c.doneLabel} />}
        </div>
      </div>
    </div>
  );
}

// ── The comparator ───────────────────────────────────────────────────────────
function Comparator({ c }: { c: DemoContent["compare"] }) {
  return (
    <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] overflow-hidden max-w-3xl mx-auto">
      <div className="grid grid-cols-[1.4fr_1fr_1fr]">
        <div className="p-4 md:p-5" />
        <div className="p-4 md:p-5 text-center font-heading font-bold text-foreground/60 border-l border-border/50">{c.colA}</div>
        <div className="p-4 md:p-5 text-center font-heading font-bold text-accent border-l border-border/50 bg-accent/5">{c.colB}</div>
        {c.rows.map((r) => (
          <div key={r.label} className="contents">
            <div className="p-4 md:p-5 border-t border-border/50 text-sm font-heading font-semibold text-foreground">{r.label}</div>
            <div className="p-4 md:p-5 border-t border-l border-border/50 text-sm text-muted-foreground text-center flex items-center justify-center gap-1.5">
              <X className="w-3.5 h-3.5 text-foreground/30 shrink-0" /> {r.a}
            </div>
            <div className="p-4 md:p-5 border-t border-l border-border/50 text-sm text-foreground text-center bg-accent/5 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {r.b}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm font-heading font-semibold text-foreground p-4 border-t border-border/50">{c.verdict}</p>
    </div>
  );
}

// ── The playable quiz ────────────────────────────────────────────────────────
function Quiz({ c }: { c: DemoContent["quiz"] }) {
  const total = c.questions.length;
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = c.questions[step];

  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (step + 1 < total) {
      setStep(step + 1);
      setPick(null);
    } else {
      setDone(true);
    }
  };
  const restart = () => {
    setStarted(false);
    setStep(0);
    setPick(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-9 max-w-2xl mx-auto">
      {!started && (
        <div className="text-center">
          <Button
            onClick={() => setStarted(true)}
            className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-12 px-8 text-base gap-2"
          >
            {c.startCta} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {started && !done && (
        <div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="tabular-nums">{c.progress.replace("{n}", String(step + 1)).replace("{total}", String(total))}</span>
          </div>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mt-2">{q.q}</h3>
          <div className="mt-5 space-y-2.5">
            {q.options.map((o, i) => {
              const answered = pick !== null;
              const isCorrect = i === q.correct;
              const isPick = i === pick;
              const cls = !answered
                ? "bg-cream border-border/50 text-foreground/80 hover:border-accent"
                : isCorrect
                ? "bg-primary/10 border-primary text-primary"
                : isPick
                ? "bg-accent/10 border-accent text-accent"
                : "bg-cream border-border/50 text-foreground/40";
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => choose(i)}
                  className={`w-full text-left rounded-xl px-4 py-3 font-heading font-semibold border transition-colors ${cls}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {pick !== null && (
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{q.reaction}</p>
              <Button
                onClick={next}
                className="rounded-full bg-foreground text-white hover:bg-foreground/90 btn-scale font-heading font-semibold h-11 px-6 gap-2 shrink-0"
              >
                {step + 1 < total ? c.nextCta : c.seeResultCta} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="text-center">
          <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground">
            {c.resultTitle.replace("{score}", String(score)).replace("{total}", String(total))}
          </h3>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">{c.resultNote}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-6 rounded-full border-[1.5px] border-foreground/30 px-5 py-2.5 text-sm font-heading font-semibold hover:border-accent transition-colors"
          >
            {c.restartCta}
          </button>
        </div>
      )}
    </div>
  );
}

// ── The page ─────────────────────────────────────────────────────────────────
export default function VibecodingDemo({ content }: { content: DemoContent }) {
  const c = content;
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <Link href={c.backHref} className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> {c.backLabel}
              </Link>
              <Link href={c.langSwitch.href} className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors">
                <Languages className="w-4 h-4" /> {c.langSwitch.label}
              </Link>
            </div>
            <h1 className="text-hero md:text-hero-lg text-foreground leading-[1.05]">{c.intro.heading}</h1>
            <p className="text-body-lg text-muted-foreground mt-5 max-w-2xl">{c.intro.sub}</p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-display md:text-display-lg text-foreground">{c.builder.heading}</h2>
              <p className="text-body-lg text-muted-foreground mt-3">{c.builder.sub}</p>
            </div>
            <div className="mt-10">
              <Builder c={c.builder} />
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-display md:text-display-lg text-foreground">{c.compare.heading}</h2>
              <p className="text-body-lg text-muted-foreground mt-3">{c.compare.sub}</p>
            </div>
            <Comparator c={c.compare} />
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-display md:text-display-lg text-foreground">{c.quiz.heading}</h2>
              <p className="text-body-lg text-muted-foreground mt-3">{c.quiz.sub}</p>
            </div>
            <Quiz c={c.quiz} />
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container max-w-2xl text-center">
            <h2 className="text-display md:text-display-lg text-white">{c.cta.heading}</h2>
            <p className="text-white/70 text-body-lg mt-4">{c.cta.sub}</p>
            <div className="mt-8">
              <Link href={c.cta.href}>
                <Button className="rounded-full bg-sunny text-foreground hover:bg-sunny/90 btn-scale font-heading font-semibold h-12 px-8 text-base gap-2">
                  {c.cta.button} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
