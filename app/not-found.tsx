'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  fetchTopScores,
  submitScore,
  qualifies,
  MAX_ENTRIES,
  type ScoreEntry,
} from '@/lib/arcadeLeaderboard';

// ─── Canvas constants ────────────────────────────────────────────────────────
const CW = 680;
const CH = 440;
const PADDLE_W = 110;
const EXPAND_W = 168;
const PADDLE_H = 14;
const PADDLE_Y = CH - 36;
const BALL_R = 9;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_H = 22;
const BRICK_GAP = 5;
const BRICK_TOP = 52;
const BRICK_W = (CW - BRICK_GAP * (BRICK_COLS + 1)) / BRICK_COLS;
const PADDLE_SPEED = 8;
const MAX_LEVELS = 5;
const BASE_SPEED = 4.5;
const SPEED_INC = 0.7;

// Powerups
const PU_W = 30;
const PU_H = 16;
const PU_VY = 2.3;
const DROP_CHANCE = 0.2;
const MULTI_CAP = 6;
const SLOW_FACTOR = 0.6;
const EXPAND_MS = 9000;
const SLOW_MS = 7000;

const BRICK_COLORS = ['#E040C8', '#CE3DD4', '#B33AE0', '#9B3FF5', '#7B30D8'];

type PType = 'multi' | 'expand' | 'slow' | 'points';
const PU_META: Record<PType, { color: string; label: string }> = {
  multi: { color: '#38E8B0', label: '××' },
  expand: { color: '#FFC64B', label: '↔' },
  slow: { color: '#4BC0FF', label: 'S' },
  points: { color: '#E040C8', label: '+' },
};
const PU_TYPES: PType[] = ['multi', 'expand', 'slow', 'points'];

// ─── Types ───────────────────────────────────────────────────────────────────
type Status = 'waiting' | 'playing' | 'level-clear' | 'game-over' | 'won';
interface Ball { x: number; y: number; dx: number; dy: number }
interface Brick { x: number; y: number; alive: boolean; color: string }
interface PowerUp { x: number; y: number; type: PType }
interface GameState {
  balls: Ball[];
  attached: boolean;
  paddleX: number;
  bricks: Brick[];
  powerups: PowerUp[];
  score: number;
  level: number;
  status: Status;
  keys: { left: boolean; right: boolean };
  mouseX: number | null;
  expandUntil: number;
  slowUntil: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function makeBricks(): Brick[] {
  return Array.from({ length: BRICK_ROWS * BRICK_COLS }, (_, i) => {
    const r = Math.floor(i / BRICK_COLS);
    const c = i % BRICK_COLS;
    return {
      x: BRICK_GAP + c * (BRICK_W + BRICK_GAP),
      y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
      alive: true,
      color: BRICK_COLORS[r],
    };
  });
}
function getBallSpeed(level: number) { return BASE_SPEED + (level - 1) * SPEED_INC; }
function freshBall(): Ball { return { x: CW / 2, y: PADDLE_Y - BALL_R - 1, dx: 0, dy: 0 }; }
function freshState(level = 1, score = 0): GameState {
  return {
    balls: [freshBall()],
    attached: true,
    paddleX: CW / 2 - PADDLE_W / 2,
    bricks: makeBricks(),
    powerups: [],
    score,
    level,
    status: 'waiting',
    keys: { left: false, right: false },
    mouseX: null,
    expandUntil: 0,
    slowUntil: 0,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function NotFound() {
  const [showGame, setShowGame] = useState(false);
  const [ended, setEnded] = useState<{ status: 'game-over' | 'won'; score: number } | null>(null);
  const [board, setBoard] = useState<ScoreEntry[]>([]);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showBoard, setShowBoard] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GameState>(freshState());
  const rafRef = useRef(0);
  const endedFired = useRef(false);

  const loadBoard = useCallback(() => { fetchTopScores().then(setBoard); }, []);

  useEffect(() => { loadBoard(); }, [loadBoard]);

  const restart = useCallback(() => {
    gsRef.current = freshState();
    endedFired.current = false;
    setEnded(null);
    setSubmitted(false);
    setName('');
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!ended || saving) return;
    setSaving(true);
    const next = await submitScore(name, ended.score);
    setBoard(next);
    setSubmitted(true);
    setSaving(false);
  }, [ended, name, saving]);

  useEffect(() => {
    if (!showGame) return;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    restart();
    loadBoard();
    let running = true;

    function launch() {
      const gs = gsRef.current;
      if (!gs.attached) return;
      const speed = getBallSpeed(gs.level);
      const angle = (Math.random() - 0.5) * (Math.PI / 4);
      gs.balls[0].dx = speed * Math.sin(angle);
      gs.balls[0].dy = -speed;
      gs.attached = false;
      gs.status = 'playing';
    }

    function applyPowerup(gs: GameState, type: PType) {
      const now = performance.now();
      if (type === 'points') { gs.score += 100; return; }
      if (type === 'expand') { gs.expandUntil = now + EXPAND_MS; return; }
      if (type === 'slow') { gs.slowUntil = now + SLOW_MS; return; }
      if (type === 'multi') {
        const cur = gs.balls.slice();
        for (const b of cur) {
          if (gs.balls.length >= MULTI_CAP) break;
          gs.balls.push({ x: b.x, y: b.y, dx: -(b.dx || 1.6), dy: b.dy || -getBallSpeed(gs.level) });
        }
      }
    }

    function update() {
      const gs = gsRef.current;
      const now = performance.now();
      const pw = now < gs.expandUntil ? EXPAND_W : PADDLE_W;
      const sf = now < gs.slowUntil ? SLOW_FACTOR : 1;

      // Paddle input
      if (gs.mouseX !== null) {
        gs.paddleX = Math.max(0, Math.min(CW - pw, gs.mouseX - pw / 2));
      } else {
        if (gs.keys.left) gs.paddleX = Math.max(0, gs.paddleX - PADDLE_SPEED);
        if (gs.keys.right) gs.paddleX = Math.min(CW - pw, gs.paddleX + PADDLE_SPEED);
      }

      if (gs.attached) {
        gs.balls[0].x = gs.paddleX + pw / 2;
        gs.balls[0].y = PADDLE_Y - BALL_R - 1;
      }

      if (gs.status !== 'playing' || gs.attached) return;

      // Move + collide each ball
      for (const ball of gs.balls) {
        ball.x += ball.dx * sf;
        ball.y += ball.dy * sf;

        if (ball.x - BALL_R < 0) { ball.x = BALL_R; ball.dx = Math.abs(ball.dx); }
        if (ball.x + BALL_R > CW) { ball.x = CW - BALL_R; ball.dx = -Math.abs(ball.dx); }
        if (ball.y - BALL_R < 0) { ball.y = BALL_R; ball.dy = Math.abs(ball.dy); }

        if (
          ball.dy > 0 &&
          ball.y + BALL_R >= PADDLE_Y &&
          ball.y - BALL_R <= PADDLE_Y + PADDLE_H &&
          ball.x >= gs.paddleX - 2 &&
          ball.x <= gs.paddleX + pw + 2
        ) {
          const rel = (ball.x - (gs.paddleX + pw / 2)) / (pw / 2);
          const speed = getBallSpeed(gs.level);
          const angle = rel * (Math.PI / 3);
          ball.dx = speed * Math.sin(angle);
          ball.dy = -Math.abs(speed * Math.cos(angle));
          ball.y = PADDLE_Y - BALL_R;
        }

        // Brick collisions — one per ball per frame
        let hit = false;
        for (const b of gs.bricks) {
          if (!b.alive || hit) continue;
          if (
            ball.x + BALL_R > b.x && ball.x - BALL_R < b.x + BRICK_W &&
            ball.y + BALL_R > b.y && ball.y - BALL_R < b.y + BRICK_H
          ) {
            b.alive = false;
            hit = true;
            gs.score += 10 * gs.level;
            if (Math.random() < DROP_CHANCE) {
              gs.powerups.push({ x: b.x + BRICK_W / 2, y: b.y + BRICK_H / 2, type: PU_TYPES[Math.floor(Math.random() * PU_TYPES.length)] });
            }
            const ol = ball.x + BALL_R - b.x;
            const or_ = b.x + BRICK_W - (ball.x - BALL_R);
            const ot = ball.y + BALL_R - b.y;
            const ob = b.y + BRICK_H - (ball.y - BALL_R);
            const min = Math.min(ol, or_, ot, ob);
            if (min === ot || min === ob) ball.dy = -ball.dy;
            else ball.dx = -ball.dx;
          }
        }
      }

      // Drop lost balls; single life ends when none remain
      gs.balls = gs.balls.filter(b => b.y - BALL_R <= CH);
      if (gs.balls.length === 0) { gs.status = 'game-over'; return; }

      // Move powerups + catch
      const keep: PowerUp[] = [];
      for (const p of gs.powerups) {
        p.y += PU_VY;
        const caught =
          p.y + PU_H / 2 >= PADDLE_Y &&
          p.y - PU_H / 2 <= PADDLE_Y + PADDLE_H &&
          p.x >= gs.paddleX - 4 && p.x <= gs.paddleX + pw + 4;
        if (caught) { applyPowerup(gs, p.type); continue; }
        if (p.y - PU_H / 2 <= CH) keep.push(p);
      }
      gs.powerups = keep;

      // Level / game clear
      if (gs.bricks.every(b => !b.alive)) {
        if (gs.level >= MAX_LEVELS) {
          gs.status = 'won';
        } else {
          gs.level++;
          gs.bricks = makeBricks();
          gs.balls = [freshBall()];
          gs.powerups = [];
          gs.attached = true;
          gs.expandUntil = 0;
          gs.slowUntil = 0;
          gs.status = 'level-clear';
        }
      }
    }

    function draw() {
      const gs = gsRef.current;
      const now = performance.now();
      const pw = now < gs.expandUntil ? EXPAND_W : PADDLE_W;

      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CW, CH);

      // HUD
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, CW, 38);
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${gs.score}`, 14, 19);
      ctx.textAlign = 'center';
      ctx.fillText(`Level ${gs.level} / ${MAX_LEVELS}`, CW / 2, 19);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#E040C8';
      ctx.fillText('1 LIFE', CW - 14, 19);

      // Bricks
      for (const b of gs.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, BRICK_W, BRICK_H, 4);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(b.x + 2, b.y + 2, BRICK_W - 4, 5);
      }

      // Powerups
      for (const p of gs.powerups) {
        const m = PU_META[p.type];
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.roundRect(p.x - PU_W / 2, p.y - PU_H / 2, PU_W, PU_H, 5);
        ctx.fill();
        ctx.fillStyle = 'rgba(10,10,15,0.9)';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(m.label, p.x, p.y + 1);
      }

      // Paddle
      const padG = ctx.createLinearGradient(gs.paddleX, 0, gs.paddleX + pw, 0);
      padG.addColorStop(0, '#9B3FF5');
      padG.addColorStop(1, '#E040C8');
      ctx.fillStyle = padG;
      ctx.beginPath();
      ctx.roundRect(gs.paddleX, PADDLE_Y, pw, PADDLE_H, 7);
      ctx.fill();

      // Balls
      for (const ball of gs.balls) {
        const bG = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 1, ball.x, ball.y, BALL_R);
        bG.addColorStop(0, '#ffffff');
        bG.addColorStop(0.55, '#e8a0f0');
        bG.addColorStop(1, '#9B3FF5');
        ctx.fillStyle = bG;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();
      }

      if (gs.status === 'waiting') {
        ctx.fillStyle = 'rgba(10,10,15,0.62)';
        ctx.fillRect(0, 0, CW, CH);
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Press SPACE or click to start', CW / 2, CH / 2 - 10);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '15px system-ui, sans-serif';
        ctx.fillText('One life. Five levels. Catch the powerups.', CW / 2, CH / 2 + 26);
      }

      if (gs.status === 'level-clear') {
        ctx.fillStyle = 'rgba(10,10,15,0.78)';
        ctx.fillRect(0, 0, CW, CH);
        const g = ctx.createLinearGradient(CW / 2 - 200, 0, CW / 2 + 200, 0);
        g.addColorStop(0, '#9B3FF5'); g.addColorStop(1, '#E040C8');
        ctx.fillStyle = g;
        ctx.font = 'bold 44px system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(`Level ${gs.level - 1} clear`, CW / 2, CH / 2 - 24);
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = '20px system-ui, sans-serif';
        ctx.fillText(`Score: ${gs.score}`, CW / 2, CH / 2 + 16);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '15px system-ui, sans-serif';
        ctx.fillText('Press SPACE for the next level', CW / 2, CH / 2 + 48);
      }

      if (gs.status === 'game-over' || gs.status === 'won') {
        // dim behind the HTML result panel
        ctx.fillStyle = 'rgba(10,10,15,0.82)';
        ctx.fillRect(0, 0, CW, CH);
      }
    }

    function loop() {
      if (!running) return;
      update();
      draw();
      const gs = gsRef.current;
      if ((gs.status === 'game-over' || gs.status === 'won') && !endedFired.current) {
        endedFired.current = true;
        setEnded({ status: gs.status, score: gs.score });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      const gs = gsRef.current;
      if (e.key === 'ArrowLeft') { gs.keys.left = true; e.preventDefault(); }
      if (e.key === 'ArrowRight') { gs.keys.right = true; e.preventDefault(); }
      if (e.key === ' ') {
        e.preventDefault();
        if (gs.status === 'waiting' || gs.status === 'level-clear') launch();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      const gs = gsRef.current;
      if (e.key === 'ArrowLeft') gs.keys.left = false;
      if (e.key === 'ArrowRight') gs.keys.right = false;
    }
    function onMouseMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect();
      gsRef.current.mouseX = (e.clientX - r.left) * (CW / r.width);
    }
    function onMouseLeave() { gsRef.current.mouseX = null; }
    function onClick() {
      const gs = gsRef.current;
      if (gs.status === 'waiting' || gs.status === 'level-clear') launch();
    }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      gsRef.current.mouseX = (e.touches[0].clientX - r.left) * (CW / r.width);
    }
    function onTouchStart() {
      const gs = gsRef.current;
      if (gs.status === 'waiting' || gs.status === 'level-clear') launch();
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGame]);

  const canSubmit = ended ? qualifies(ended.score, board) : false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: '#0a0a0f' }}>
      <h1
        className="font-heading font-black leading-none tracking-tighter select-none"
        style={{
          fontSize: 'clamp(96px, 22vw, 200px)',
          background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        404
      </h1>

      <p className="font-body text-center mt-4 mb-10" style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(16px, 3vw, 22px)', maxWidth: '500px' }}>
        This page does not exist. Luckily you do ❤️
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-semibold text-white text-[15px] transition-opacity hover:opacity-90 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)' }}
        >
          ← Back home
        </Link>
        <button
          onClick={() => setShowGame(v => !v)}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all hover:bg-white/5 active:scale-[0.97]"
          style={{ color: '#E040C8', border: '2px solid rgba(155,63,245,0.65)' }}
        >
          {showGame ? '✕ Hide game' : '🎮 Play a game'}
        </button>
        <button
          onClick={() => { loadBoard(); setShowBoard(v => !v); }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all hover:bg-white/5 active:scale-[0.97]"
          style={{ color: '#38E8B0', border: '2px solid rgba(56,232,176,0.5)' }}
        >
          🏆 Top 10
        </button>
      </div>

      {/* Standalone leaderboard */}
      {showBoard && !showGame && (
        <div className="mt-8 w-full" style={{ maxWidth: 380 }}>
          <Leaderboard board={board} />
        </div>
      )}

      {/* Game */}
      {showGame && (
        <div
          className="mt-10 relative rounded-2xl overflow-hidden w-full"
          style={{ maxWidth: `${CW}px`, border: '1px solid rgba(155,63,245,0.35)', boxShadow: '0 0 60px rgba(155,63,245,0.14), 0 0 120px rgba(224,64,200,0.07)' }}
        >
          <canvas ref={canvasRef} width={CW} height={CH} className="block w-full" style={{ cursor: 'none' }} />

          {ended && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: 'rgba(16,16,24,0.92)', border: '1px solid rgba(155,63,245,0.4)' }}>
                <h2
                  className="font-heading font-black text-3xl mb-1"
                  style={{ background: 'linear-gradient(135deg, #9B3FF5, #E040C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {ended.status === 'won' ? 'YOU WIN' : 'GAME OVER'}
                </h2>
                <p className="text-white/80 text-sm mb-4">Score: <span className="font-bold text-white">{ended.score}</span></p>

                {canSubmit && !submitted ? (
                  <div className="mb-4">
                    <p className="text-[13px] mb-2" style={{ color: '#38E8B0' }}>You made the Top 10. Enter your name:</p>
                    <div className="flex gap-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 10))}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                        maxLength={10}
                        placeholder="AAA"
                        autoFocus
                        className="flex-1 px-3 py-2 rounded-lg text-white text-center tracking-[0.3em] font-heading font-bold outline-none"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(155,63,245,0.5)' }}
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={saving || name.trim().length < 1}
                        className="px-4 py-2 rounded-lg font-heading font-semibold text-white text-sm disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, #9B3FF5, #E040C8)' }}
                      >
                        {saving ? '…' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4"><Leaderboard board={board} compact /></div>
                )}

                <button
                  onClick={restart}
                  className="w-full px-5 py-2.5 rounded-lg font-heading font-semibold text-[15px]"
                  style={{ color: '#E040C8', border: '2px solid rgba(155,63,245,0.65)' }}
                >
                  ↻ Play again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showGame && (
        <p className="text-white/30 text-xs mt-4 text-center">
          Powerups: <span style={{ color: '#38E8B0' }}>×× multi-ball</span> · <span style={{ color: '#FFC64B' }}>↔ wider paddle</span> · <span style={{ color: '#4BC0FF' }}>S slow</span> · <span style={{ color: '#E040C8' }}>+ bonus</span>
        </p>
      )}
    </div>
  );
}

function Leaderboard({ board, compact = false }: { board: ScoreEntry[]; compact?: boolean }) {
  const rows: (ScoreEntry | null)[] = Array.from({ length: MAX_ENTRIES }, (_, i) => board[i] ?? null);
  return (
    <div className="rounded-2xl p-4" style={{ background: compact ? 'transparent' : 'rgba(16,16,24,0.92)', border: compact ? 'none' : '1px solid rgba(155,63,245,0.4)' }}>
      <p className="font-heading font-bold text-center mb-3 tracking-[0.2em] text-sm" style={{ color: '#38E8B0' }}>HIGH SCORES</p>
      <ol className="space-y-1">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center justify-between text-[13px] font-heading" style={{ color: r ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.28)' }}>
            <span className="tabular-nums w-6 text-white/40">{i + 1}.</span>
            <span className="flex-1 tracking-[0.15em] truncate px-2">{r ? r.name : '— — —'}</span>
            <span className="tabular-nums">{r ? r.score : '0'}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
