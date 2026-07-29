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
const HUD_H = 40;
const CELL = 20;
const COLS = Math.floor(CW / CELL);           // 34
const ROWS = Math.floor((CH - HUD_H) / CELL); // 20

const INITIAL_TICK = 180; // ms per move
const MIN_TICK = 60;
const TICK_DECAY = 6;     // ms faster per food eaten
const GOLDEN_CHANCE = 0.2;

const GAME_ID = 'snake';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Seg { col: number; row: number }
type Dir = 'up' | 'down' | 'left' | 'right';
type Status = 'waiting' | 'playing' | 'game-over';

interface SnakeState {
  segments: Seg[];
  dir: Dir;
  nextDir: Dir;
  food: { col: number; row: number; golden: boolean };
  score: number;
  status: Status;
  tickMs: number;
  lastTick: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function spawnFood(segs: Seg[]): SnakeState['food'] {
  const occupied = new Set(segs.map(s => `${s.col},${s.row}`));
  let col: number, row: number;
  do {
    col = Math.floor(Math.random() * COLS);
    row = Math.floor(Math.random() * ROWS);
  } while (occupied.has(`${col},${row}`));
  return { col, row, golden: Math.random() < GOLDEN_CHANCE };
}

function freshState(): SnakeState {
  const segments: Seg[] = [
    { col: 17, row: 10 },
    { col: 16, row: 10 },
    { col: 15, row: 10 },
  ];
  return {
    segments,
    dir: 'right',
    nextDir: 'right',
    food: spawnFood(segments),
    score: 0,
    status: 'waiting',
    tickMs: INITIAL_TICK,
    lastTick: 0,
  };
}

const OPPOSITE: Record<Dir, Dir> = {
  up: 'down', down: 'up', left: 'right', right: 'left',
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function NotFound() {
  const [showGame, setShowGame] = useState(false);
  const [ended, setEnded] = useState<{ score: number } | null>(null);
  const [board, setBoard] = useState<ScoreEntry[]>([]);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showBoard, setShowBoard] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<SnakeState>(freshState());
  const rafRef = useRef(0);
  const endedFired = useRef(false);

  const loadBoard = useCallback(() => { fetchTopScores(GAME_ID).then(setBoard); }, []);
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
    const next = await submitScore(name, ended.score, GAME_ID);
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

    function tick() {
      const gs = gsRef.current;
      const now = performance.now();
      if (now - gs.lastTick < gs.tickMs) return;
      gs.lastTick = now;

      gs.dir = gs.nextDir;
      const head = gs.segments[0];
      let newHead: Seg;
      switch (gs.dir) {
        case 'up':    newHead = { col: head.col,     row: head.row - 1 }; break;
        case 'down':  newHead = { col: head.col,     row: head.row + 1 }; break;
        case 'left':  newHead = { col: head.col - 1, row: head.row     }; break;
        default:      newHead = { col: head.col + 1, row: head.row     }; break;
      }

      if (newHead.col < 0 || newHead.col >= COLS || newHead.row < 0 || newHead.row >= ROWS) {
        gs.status = 'game-over'; return;
      }
      if (gs.segments.some(s => s.col === newHead.col && s.row === newHead.row)) {
        gs.status = 'game-over'; return;
      }

      const ateFood = newHead.col === gs.food.col && newHead.row === gs.food.row;
      gs.segments.unshift(newHead);
      if (ateFood) {
        gs.score += gs.food.golden ? 50 : 10;
        gs.tickMs = Math.max(MIN_TICK, gs.tickMs - TICK_DECAY);
        gs.food = spawnFood(gs.segments);
      } else {
        gs.segments.pop();
      }
    }

    function draw() {
      const gs = gsRef.current;

      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CW, CH);

      // HUD strip
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, CW, HUD_H - 2);
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${gs.score}`, 14, HUD_H / 2);
      ctx.textAlign = 'center';
      ctx.fillText(`Length: ${gs.segments.length}`, CW / 2, HUD_H / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#E040C8';
      const speedLevel = Math.round((INITIAL_TICK - gs.tickMs) / TICK_DECAY) + 1;
      ctx.fillText(`Speed ×${speedLevel}`, CW - 14, HUD_H / 2);

      // Subtle grid dots
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const dx = c * CELL + CELL / 2 - 1;
          const dy = HUD_H + r * CELL + CELL / 2 - 1;
          ctx.fillRect(dx, dy, 2, 2);
        }
      }

      // Food
      const fx = gs.food.col * CELL + CELL / 2;
      const fy = HUD_H + gs.food.row * CELL + CELL / 2;
      const foodColor = gs.food.golden ? '#FFC64B' : '#38E8B0';
      ctx.shadowColor = foodColor;
      ctx.shadowBlur = 14;
      ctx.fillStyle = foodColor;
      ctx.beginPath();
      ctx.arc(fx, fy, CELL / 2 - 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (gs.food.golden) {
        ctx.fillStyle = 'rgba(10,10,15,0.85)';
        ctx.font = 'bold 9px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+', fx, fy + 1);
      }

      // Snake body (back-to-front so head renders on top)
      for (let i = gs.segments.length - 1; i >= 0; i--) {
        const s = gs.segments[i];
        const x = s.col * CELL;
        const y = HUD_H + s.row * CELL;
        const t = i / gs.segments.length;

        if (i === 0) {
          const g = ctx.createLinearGradient(x, y, x + CELL, y + CELL);
          g.addColorStop(0, '#E040C8');
          g.addColorStop(1, '#9B3FF5');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = `rgba(155,63,245,${0.88 - t * 0.5})`;
        }
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, CELL - 4, CELL - 4, i === 0 ? 5 : 3);
        ctx.fill();
      }

      // Eyes on head
      if (gs.segments.length > 0) {
        const h = gs.segments[0];
        const hx = h.col * CELL;
        const hy = HUD_H + h.row * CELL;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        let e1x: number, e1y: number, e2x: number, e2y: number;
        switch (gs.dir) {
          case 'right': e1x = hx+CELL-6; e1y = hy+4;       e2x = hx+CELL-6; e2y = hy+CELL-8; break;
          case 'left':  e1x = hx+3;      e1y = hy+4;       e2x = hx+3;      e2y = hy+CELL-8; break;
          case 'up':    e1x = hx+4;      e1y = hy+3;       e2x = hx+CELL-8; e2y = hy+3;      break;
          default:      e1x = hx+4;      e1y = hy+CELL-6;  e2x = hx+CELL-8; e2y = hy+CELL-6; break;
        }
        ctx.beginPath(); ctx.arc(e1x, e1y, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e2x, e2y, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Waiting overlay
      if (gs.status === 'waiting') {
        ctx.fillStyle = 'rgba(10,10,15,0.62)';
        ctx.fillRect(0, HUD_H, CW, CH - HUD_H);
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const midY = HUD_H + (CH - HUD_H) / 2;
        ctx.fillText('Press SPACE or click to start', CW / 2, midY - 14);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '15px system-ui, sans-serif';
        ctx.fillText('Swipe · arrow keys · WASD to steer. No walls.', CW / 2, midY + 22);
      }

      // Game-over dim (modal rendered in HTML above)
      if (gs.status === 'game-over') {
        ctx.fillStyle = 'rgba(10,10,15,0.82)';
        ctx.fillRect(0, 0, CW, CH);
      }
    }

    function loop() {
      if (!running) return;
      const gs = gsRef.current;
      if (gs.status === 'playing') tick();
      draw();
      if (gs.status === 'game-over' && !endedFired.current) {
        endedFired.current = true;
        setEnded({ score: gs.score });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      const gs = gsRef.current;
      if (e.key === ' ') {
        e.preventDefault();
        if (gs.status === 'waiting') { gs.status = 'playing'; gs.lastTick = performance.now(); }
        return;
      }
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
        W: 'up', S: 'down', A: 'left', D: 'right',
      };
      const d = map[e.key];
      if (d && d !== OPPOSITE[gs.dir]) {
        gs.nextDir = d;
        if (e.key.startsWith('Arrow')) e.preventDefault();
      }
    }
    function onClick() {
      const gs = gsRef.current;
      if (gs.status === 'waiting') { gs.status = 'playing'; gs.lastTick = performance.now(); }
    }

    let touchStartX = 0;
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      const gs = gsRef.current;
      if (gs.status === 'waiting') { gs.status = 'playing'; gs.lastTick = performance.now(); }
    }
    function onTouchMove(e: TouchEvent) {
      if (gsRef.current.status === 'playing') e.preventDefault();
    }
    function onTouchEnd(e: TouchEvent) {
      const gs = gsRef.current;
      if (gs.status !== 'playing') return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 15 && Math.abs(dy) < 15) return;
      const d: Dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? 'right' : 'left')
        : (dy > 0 ? 'down' : 'up');
      if (d !== OPPOSITE[gs.dir]) gs.nextDir = d;
    }

    window.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
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

      <div className="flex gap-3 flex-wrap justify-center">
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
          {showGame ? '✕ Hide game' : '🐍 Play Snake'}
        </button>
        <button
          onClick={() => { loadBoard(); setShowBoard(v => !v); }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all hover:bg-white/5 active:scale-[0.97]"
          style={{ color: '#38E8B0', border: '2px solid rgba(56,232,176,0.5)' }}
        >
          🏆 Top 10
        </button>
        <Link
          href="/arcade"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all hover:bg-white/5 active:scale-[0.97]"
          style={{ color: 'rgba(255,255,255,0.5)', border: '2px solid rgba(255,255,255,0.14)' }}
        >
          🕹️ Previous games
        </Link>
      </div>

      {/* Leaderboard — shows whether the game is open or not */}
      {showBoard && (
        <div className="mt-8 w-full" style={{ maxWidth: 380 }}>
          <Leaderboard board={board} title="HIGH SCORES — SNAKE" />
        </div>
      )}

      {/* Game */}
      {showGame && (
        <div
          className="mt-10 relative rounded-2xl overflow-hidden w-full"
          style={{ maxWidth: `${CW}px`, border: '1px solid rgba(155,63,245,0.35)', boxShadow: '0 0 60px rgba(155,63,245,0.14), 0 0 120px rgba(224,64,200,0.07)' }}
        >
          <canvas ref={canvasRef} width={CW} height={CH} className="block w-full" style={{ touchAction: 'none' }} />

          {ended && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: 'rgba(16,16,24,0.92)', border: '1px solid rgba(155,63,245,0.4)' }}>
                <h2
                  className="font-heading font-black text-3xl mb-1"
                  style={{ background: 'linear-gradient(135deg, #9B3FF5, #E040C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  GAME OVER
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
                  <div className="mb-4">
                    <Leaderboard board={board} title="HIGH SCORES — SNAKE" compact />
                  </div>
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
          Swipe to steer · <span style={{ color: '#38E8B0' }}>green +10</span> · <span style={{ color: '#FFC64B' }}>gold +50</span> · speed grows with you
        </p>
      )}
    </div>
  );
}

function Leaderboard({ board, title, compact = false }: { board: ScoreEntry[]; title: string; compact?: boolean }) {
  const rows: (ScoreEntry | null)[] = Array.from({ length: MAX_ENTRIES }, (_, i) => board[i] ?? null);
  return (
    <div className="rounded-2xl p-4" style={{ background: compact ? 'transparent' : 'rgba(16,16,24,0.92)', border: compact ? 'none' : '1px solid rgba(155,63,245,0.4)' }}>
      <p className="font-heading font-bold text-center mb-3 tracking-[0.2em] text-sm" style={{ color: '#38E8B0' }}>{title}</p>
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
