"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// ─────────────────────────────────────────────────────────────────────────────
// Leaderboard for the 404 arcade games.
//
// Per-game board: tries the Supabase `arcade_scores` table (with a `game`
// column) first. Falls back to localStorage transparently, so each game has
// its own isolated board from day one without requiring the DB to exist.
// ─────────────────────────────────────────────────────────────────────────────

export interface ScoreEntry {
  name: string;
  score: number;
}

const TABLE = "arcade_scores";
export const MAX_ENTRIES = 10;

function lsKey(game: string) {
  // Preserve the original key for breakout so existing local scores survive.
  return game === "breakout" ? "bh_arcade_leaderboard" : `bh_arcade_${game}_leaderboard`;
}

function readLocal(game: string): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(lsKey(game));
    const list = raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
    return list.sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

function writeLocal(game: string, entry: ScoreEntry) {
  if (typeof window === "undefined") return;
  try {
    const list = [...readLocal(game), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
    window.localStorage.setItem(lsKey(game), JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function fetchTopScores(game = "breakout"): Promise<ScoreEntry[]> {
  try {
    const { data, error } = await createSupabaseBrowserClient()
      .from(TABLE as any)
      .select("name,score")
      .eq("game", game)
      .order("score", { ascending: false })
      .limit(MAX_ENTRIES);
    if (error || !data) throw error ?? new Error("no data");
    return data as unknown as ScoreEntry[];
  } catch {
    return readLocal(game);
  }
}

/** Returns true if `score` would land in the top 10 of the current board. */
export function qualifies(score: number, board: ScoreEntry[]): boolean {
  if (score <= 0) return false;
  if (board.length < MAX_ENTRIES) return true;
  return score > board[board.length - 1].score;
}

export async function submitScore(
  name: string,
  score: number,
  game = "breakout"
): Promise<ScoreEntry[]> {
  const clean = name.trim().toUpperCase().slice(0, 10) || "ANON";
  const entry: ScoreEntry = { name: clean, score };
  try {
    await createSupabaseBrowserClient()
      .from(TABLE as any)
      .insert({ ...entry, game } as any);
  } catch {
    // table not there yet — local only
  }
  writeLocal(game, entry);
  return fetchTopScores(game);
}
