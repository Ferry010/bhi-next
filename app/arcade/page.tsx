'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchTopScores, type ScoreEntry } from '@/lib/arcadeLeaderboard';

interface GameCard {
  id: string;
  num: number;
  title: string;
  emoji: string;
  description: string;
  controls: string;
  href: string;
  current: boolean;
}

const GAMES: GameCard[] = [
  {
    id: 'snake',
    num: 2,
    title: 'Snake',
    emoji: '🐍',
    description: 'Eat food, grow longer, don\'t hit yourself. Speed increases as you grow. Gold food is worth 5×.',
    controls: 'Arrow keys or WASD',
    href: '/this-page-does-not-exist',
    current: true,
  },
  {
    id: 'breakout',
    num: 1,
    title: 'Breakout',
    emoji: '🎮',
    description: 'Classic brick-breaker. Five levels, one life, four powerups: multi-ball, wider paddle, slow, and bonus points.',
    controls: 'Mouse · Arrow keys · Touch',
    href: '/arcade/breakout',
    current: false,
  },
];

function useTopScore(game: string) {
  const [top, setTop] = useState<ScoreEntry | null>(null);
  useEffect(() => {
    fetchTopScores(game).then(board => setTop(board[0] ?? null));
  }, [game]);
  return top;
}

function GameCardView({ game }: { game: GameCard }) {
  const top = useTopScore(game.id);

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-0.5"
      style={{
        background: 'rgba(16,16,24,0.85)',
        border: game.current
          ? '1px solid rgba(224,64,200,0.5)'
          : '1px solid rgba(155,63,245,0.25)',
        boxShadow: game.current
          ? '0 0 40px rgba(224,64,200,0.08)'
          : 'none',
      }}
    >
      {game.current && (
        <div className="absolute top-4 right-4">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-heading font-bold tracking-[0.16em] uppercase"
            style={{ background: 'rgba(224,64,200,0.18)', color: '#E040C8', border: '1px solid rgba(224,64,200,0.4)' }}
          >
            Current
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: 'rgba(155,63,245,0.12)', border: '1px solid rgba(155,63,245,0.2)' }}
        >
          {game.emoji}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-heading text-white/30 tracking-widest">#{game.num}</span>
            <h2 className="font-heading font-black text-xl text-white">{game.title}</h2>
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {game.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[12px]">
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{game.controls}</span>
        {top ? (
          <span style={{ color: '#38E8B0' }}>
            Best: <span className="font-heading font-bold">{top.name}</span> · {top.score}
          </span>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>No scores yet</span>
        )}
      </div>

      {game.current ? (
        <Link
          href={game.href}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-[14px] text-white transition-opacity hover:opacity-90 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)' }}
        >
          {game.emoji} Find the game →
        </Link>
      ) : (
        <Link
          href={game.href}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-[14px] transition-all hover:bg-white/5 active:scale-[0.97]"
          style={{ color: '#E040C8', border: '2px solid rgba(155,63,245,0.55)' }}
        >
          Play →
        </Link>
      )}
    </div>
  );
}

export default function ArcadePage() {
  return (
    <div className="min-h-screen px-6 py-20" style={{ background: '#0a0a0f' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-heading mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ← Back home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🕹️</span>
            <h1
              className="font-heading font-black tracking-tight"
              style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                background: 'linear-gradient(135deg, #9B3FF5 0%, #E040C8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              404 Arcade
            </h1>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.6, maxWidth: '480px' }}>
            We hide a playable game on our 404 page. Every so often we swap it
            out and archive the previous one here.
          </p>

          <p className="mt-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Tip: navigate to any page that doesn't exist to find the current game.
          </p>
        </div>

        {/* Game cards */}
        <div className="flex flex-col gap-5">
          {GAMES.map(game => (
            <GameCardView key={game.id} game={game} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Each game has its own leaderboard. High scores persist across sessions.
        </p>
      </div>
    </div>
  );
}
