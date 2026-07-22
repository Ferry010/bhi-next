"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// ─────────────────────────────────────────────────────────────────────────────
// Leaderboard for the 404 arcade game.
//
// Global board: tries the Supabase `arcade_scores` table first. Until that table
// exists it transparently falls back to this browser's localStorage, so the
// feature works today and becomes a shared, promotable leaderboard the moment
// the SQL in supabase/arcade_scores.sql is applied. No code change needed.
// ─────────────────────────────────────────────────────────────────────────────

export interface ScoreEntry {
  name: string;
  score: number;
}

const TABLE = "arcade_scores";
const LS_KEY = "bh_arcade_leaderboard";
export const MAX_ENTRIES = 10;

function readLocal(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    const list = raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
    return list.sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

function writeLocal(entry: ScoreEntry) {
  if (typeof window === "undefined") return;
  try {
    const list = [...readLocal(), entry].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
    window.localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function fetchTopScores(): Promise<ScoreEntry[]> {
  try {
    const { data, error } = await createSupabaseBrowserClient()
      .from(TABLE as any)
      .select("name,score")
      .order("score", { ascending: false })
      .limit(MAX_ENTRIES);
    if (error || !data) throw error ?? new Error("no data");
    return data as unknown as ScoreEntry[];
  } catch {
    return readLocal();
  }
}

/** Returns true if `score` would land in the top 10 of the current board. */
export function qualifies(score: number, board: ScoreEntry[]): boolean {
  if (score <= 0) return false;
  if (board.length < MAX_ENTRIES) return true;
  return score > board[board.length - 1].score;
}

export async function submitScore(name: string, score: number): Promise<ScoreEntry[]> {
  const clean = name.trim().toUpperCase().slice(0, 10) || "ANON";
  const entry: ScoreEntry = { name: clean, score };
  // Best-effort global write; always keep a local copy as fallback.
  try {
    await createSupabaseBrowserClient().from(TABLE as any).insert(entry as any);
  } catch {
    // table not there yet — local only
  }
  writeLocal(entry);
  return fetchTopScores();
}
