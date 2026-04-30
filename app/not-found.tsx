'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Canvas constants ────────────────────────────────────────────────────────
const CW = 680;
const CH = 440;
const PADDLE_W = 110;
const PADDLE_H = 14;
const PADDLE_Y = CH - 36;      // top edge of paddle
const BALL_R = 9;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_H = 22;
const BRICK_GAP = 5;
const BRICK_TOP = 52;
const BRICK_W = (CW - BRICK_GAP * (BRICK_COLS + 1)) / BRICK_COLS;
const PADDLE_SPEED = 8;
const MAX_LEVELS = 3;
const BASE_SPEED = 4.5;
const SPEED_INC = 0.8;

const BRICK_COLORS = ['#E040C8', '#CE3DD4', '#B33AE0', '#9B3FF5', '#7B30D8'];

// ─── Types ───────────────────────────────────────────────────────────────────
type Status = 'waiting' | 'playing' | 'level-clear' | 'game-over' | 'won';

interface Brick { x: number; y: number; alive: boolean; color: string }
interface GameState {
  ball: { x: number; y: number; dx: number; dy: number };
  attached: boolean;
  paddleX: number;
  bricks: Brick[];
  score: number;
  lives: number;
  level: number;
  status: Status;
  keys: { left: boolean; right: boolean };
  mouseX: number | null;
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

function freshState(level = 1, score = 0, lives = 3): GameState {
  return {
    ball: { x: CW / 2, y: PADDLE_Y - BALL_R - 1, dx: 0, dy: 0 },
    attached: true,
    paddleX: CW / 2 - PADDLE_W / 2,
    bricks: makeBricks(),
    score,
    lives,
    level,
    status: 'waiting',
    keys: { left: false, right: false },
    mouseX: null,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function NotFound() {
  const [showGame, setShowGame] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GameState>(freshState());
  const rafRef = useRef(0);

  useEffect(() => {
    if (!showGame) return;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    gsRef.current = freshState();
    let running = true;

    // ── Ball launch ──────────────────────────────────────────────────────────
    function launch() {
      const gs = gsRef.current;
      if (!gs.attached) return;
      const speed = getBallSpeed(gs.level);
      const angle = (Math.random() - 0.5) * (Math.PI / 4); // ±22.5° off vertical
      gs.ball.dx = speed * Math.sin(angle);
      gs.ball.dy = -speed;
      gs.attached = false;
      gs.status = 'playing';
    }

    // ── Update ───────────────────────────────────────────────────────────────
    function update() {
      const gs = gsRef.current;

      // Paddle always tracks input
      if (gs.mouseX !== null) {
        gs.paddleX = Math.max(0, Math.min(CW - PADDLE_W, gs.mouseX - PADDLE_W / 2));
      } else {
        if (gs.keys.left)  gs.paddleX = Math.max(0, gs.paddleX - PADDLE_SPEED);
        if (gs.keys.right) gs.paddleX = Math.min(CW - PADDLE_W, gs.paddleX + PADDLE_SPEED);
      }

      // Ball sits on paddle when attached
      if (gs.attached) {
        gs.ball.x = gs.paddleX + PADDLE_W / 2;
        gs.ball.y = PADDLE_Y - BALL_R - 1;
      }

      if (gs.status !== 'playing' || gs.attached) return;

      // Move ball
      gs.ball.x += gs.ball.dx;
      gs.ball.y += gs.ball.dy;

      // Wall bounces
      if (gs.ball.x - BALL_R < 0)  { gs.ball.x = BALL_R;       gs.ball.dx =  Math.abs(gs.ball.dx); }
      if (gs.ball.x + BALL_R > CW) { gs.ball.x = CW - BALL_R;  gs.ball.dx = -Math.abs(gs.ball.dx); }
      if (gs.ball.y - BALL_R < 0)  { gs.ball.y = BALL_R;       gs.ball.dy =  Math.abs(gs.ball.dy); }

      // Paddle collision — angle varies by hit position
      if (
        gs.ball.dy > 0 &&
        gs.ball.y + BALL_R >= PADDLE_Y &&
        gs.ball.y - BALL_R <= PADDLE_Y + PADDLE_H &&
        gs.ball.x >= gs.paddleX - 2 &&
        gs.ball.x <= gs.paddleX + PADDLE_W + 2
      ) {
        const rel = (gs.ball.x - (gs.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2);
        const speed = getBallSpeed(gs.level);
        const angle = rel * (Math.PI / 3); // max ±60° from vertical
        gs.ball.dx = speed * Math.sin(angle);
        gs.ball.dy = -Math.abs(speed * Math.cos(angle));
        gs.ball.y = PADDLE_Y - BALL_R;
      }

      // Ball lost
      if (gs.ball.y - BALL_R > CH) {
        gs.lives -= 1;
        if (gs.lives <= 0) {
          gs.status = 'game-over';
        } else {
          gs.attached = true;
          gs.status = 'waiting';
        }
        return;
      }

      // Brick collisions — one brick per frame to avoid double-bounce
      let hit = false;
      for (const b of gs.bricks) {
        if (!b.alive || hit) continue;
        if (
          gs.ball.x + BALL_R > b.x          &&
          gs.ball.x - BALL_R < b.x + BRICK_W &&
          gs.ball.y + BALL_R > b.y          &&
          gs.ball.y - BALL_R < b.y + BRICK_H
        ) {
          b.alive = false;
          hit = true;
          gs.score += 10 * gs.level;
          // Bounce on the axis with the smallest overlap
          const ol = gs.ball.x + BALL_R - b.x;
          const or_ = b.x + BRICK_W - (gs.ball.x - BALL_R);
          const ot = gs.ball.y + BALL_R - b.y;
          const ob = b.y + BRICK_H - (gs.ball.y - BALL_R);
          const min = Math.min(ol, or_, ot, ob);
          if (min === ot || min === ob) gs.ball.dy = -gs.ball.dy;
          else gs.ball.dx = -gs.ball.dx;
        }
      }

      // Check level/game clear
      if (gs.bricks.every(b => !b.alive)) {
        if (gs.level >= MAX_LEVELS) {
          gs.status = 'won';
        } else {
          gs.level++;
          gs.bricks = makeBricks();
          gs.attached = true;
          gs.status = 'level-clear';
        }
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────────
    function draw() {
      const gs = gsRef.current;

      // Background
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CW, CH);

      // HUD strip
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
      ctx.fillText(`Lives: ${'♥ '.repeat(gs.lives).trim()}`, CW - 14, 19);

      // Bricks
      for (const b of gs.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, BRICK_W, BRICK_H, 4);
        ctx.fill();
        // inner highlight
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(b.x + 2, b.y + 2, BRICK_W - 4, 5);
      }

      // Paddle
      const padG = ctx.createLinearGradient(gs.paddleX, 0, gs.paddleX + PADDLE_W, 0);
      padG.addColorStop(0, '#9B3FF5');
      padG.addColorStop(1, '#E040C8');
      ctx.fillStyle = padG;
      ctx.beginPath();
      ctx.roundRect(gs.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H, 7);
      ctx.fill();

      // Ball
      const bG = ctx.createRadialGradient(gs.ball.x - 2, gs.ball.y - 2, 1, gs.ball.x, gs.ball.y, BALL_R);
      bG.addColorStop(0, '#ffffff');
      bG.addColorStop(0.55, '#e8a0f0');
      bG.addColorStop(1, '#9B3FF5');
      ctx.fillStyle = bG;
      ctx.beginPath();
      ctx.arc(gs.ball.x, gs.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      // ── Overlay helper ───────────────────────────────────────────────────
      function overlay(heading: string, sub: string, hint: string) {
        ctx.fillStyle = 'rgba(10,10,15,0.78)';
        ctx.fillRect(0, 0, CW, CH);
        const g = ctx.createLinearGradient(CW / 2 - 200, 0, CW / 2 + 200, 0);
        g.addColorStop(0, '#9B3FF5');
        g.addColorStop(1, '#E040C8');
        ctx.fillStyle = g;
        ctx.font = 'bold 46px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(heading, CW / 2, CH / 2 - 32);
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = '20px system-ui, sans-serif';
        ctx.fillText(sub, CW / 2, CH / 2 + 14);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '15px system-ui, sans-serif';
        ctx.fillText(hint, CW / 2, CH / 2 + 50);
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
        ctx.fillText('Move the mouse or use ← → keys', CW / 2, CH / 2 + 26);
      }

      if (gs.status === 'level-clear') {
        overlay(
          `Level ${gs.level - 1} complete! 🎊`,
          `Score: ${gs.score}`,
          'Press SPACE for the next level'
        );
      }

      if (gs.status === 'game-over') {
        overlay(
          'GAME OVER',
          `Final score: ${gs.score}`,
          'Press ENTER to play again'
        );
      }

      if (gs.status === 'won') {
        overlay(
          'YOU WIN! 🎉',
          `Total score: ${gs.score}`,
          'Press ENTER to play again'
        );
      }
    }

    // ── Game loop ────────────────────────────────────────────────────────────
    function loop() {
      if (!running) return;
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    // ── Event handlers ───────────────────────────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      const gs = gsRef.current;
      if (e.key === 'ArrowLeft')  { gs.keys.left  = true; e.preventDefault(); }
      if (e.key === 'ArrowRight') { gs.keys.right = true; e.preventDefault(); }
      if (e.key === ' ') {
        e.preventDefault();
        if (gs.status === 'waiting' || gs.status === 'level-clear') launch();
      }
      if (e.key === 'Enter' && (gs.status === 'game-over' || gs.status === 'won')) {
        gsRef.current = freshState();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      const gs = gsRef.current;
      if (e.key === 'ArrowLeft')  gs.keys.left  = false;
      if (e.key === 'ArrowRight') gs.keys.right = false;
    }
    function onMouseMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect();
      gsRef.current.mouseX = (e.clientX - r.left) * (CW / r.width);
    }
    function onMouseLeave() { gsRef.current.mouseX = null; }
    function onClick() {
      const gs = gsRef.current;
      if (gs.status === 'waiting' || gs.status === 'level-clear') { launch(); return; }
      if (gs.status === 'game-over' || gs.status === 'won') gsRef.current = freshState();
    }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      gsRef.current.mouseX = (e.touches[0].clientX - r.left) * (CW / r.width);
    }
    function onTouchStart() {
      const gs = gsRef.current;
      if (gs.status === 'waiting' || gs.status === 'level-clear') { launch(); return; }
      if (gs.status === 'game-over' || gs.status === 'won') gsRef.current = freshState();
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
  }, [showGame]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#0a0a0f' }}
    >
      {/* 404 headline */}
      <h1
        className="font-heading font-black leading-none tracking-tighter select-none"
        style={{
          fontSize: 'clamp(96px, 22vw, 200px)',
          background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        404
      </h1>

      {/* Dutch subtitle */}
      <p
        className="font-body text-center mt-4 mb-10"
        style={{
          color: 'rgba(255,255,255,0.82)',
          fontSize: 'clamp(16px, 3vw, 22px)',
          maxWidth: '500px',
        }}
      >
        This page does not exist. Luckily you do ❤️
      </p>

      {/* CTA buttons */}
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
      </div>

      {/* Game canvas */}
      {showGame && (
        <div
          className="mt-10 rounded-2xl overflow-hidden w-full"
          style={{
            maxWidth: `${CW}px`,
            border: '1px solid rgba(155,63,245,0.35)',
            boxShadow:
              '0 0 60px rgba(155,63,245,0.14), 0 0 120px rgba(224,64,200,0.07)',
          }}
        >
          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            className="block w-full"
            style={{ cursor: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
