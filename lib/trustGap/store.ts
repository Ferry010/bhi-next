"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { LeaderAnswers, TeamAnswers } from "./questions";
import type { TeamAggregate } from "./scoring";

// Persistence for the Trust Gap.
//
// Team responses need to be readable across devices, so this is Supabase only.
// There is no localStorage fallback for responses, because a fallback that
// silently worked on one device would produce a report that looks real and
// is not. If the tables are missing we say so plainly instead.

const LS_CODE = "bh_trust_gap_code";
const LS_ANSWERED = "bh_trust_gap_answered";

export type StoreError = "not_provisioned" | "not_found" | "failed";

export interface ReportPayload {
  found: boolean;
  unlocked: boolean;
  responseCount: number;
  required: number;
  leader?: LeaderAnswers;
  team?: TeamAggregate;
}

function isMissingTable(err: unknown): boolean {
  const e = err as { code?: string; message?: string } | null;
  if (!e) return false;
  // PGRST205: table not in schema cache. 42P01: undefined table. 42883: no function.
  return (
    e.code === "PGRST205" ||
    e.code === "42P01" ||
    e.code === "42883" ||
    /could not find|does not exist|schema cache/i.test(e.message ?? "")
  );
}

// ─── Leader ──────────────────────────────────────────────────────────────────

export async function createSession(
  code: string,
  answers: LeaderAnswers,
): Promise<{ ok: true } | { ok: false; error: StoreError }> {
  try {
    const { error } = await createSupabaseBrowserClient()
      .from("trust_gap_sessions" as never)
      .insert({ code, ...answers } as never);
    if (error) throw error;
    rememberCode(code);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

export async function setLeaderEmail(code: string, email: string): Promise<boolean> {
  try {
    const { error } = await createSupabaseBrowserClient().rpc("trust_gap_set_email" as never, {
      p_code: code,
      p_email: email,
    } as never);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

// ─── Team ────────────────────────────────────────────────────────────────────

export async function getStatus(
  code: string,
): Promise<{ ok: true; exists: boolean; count: number } | { ok: false; error: StoreError }> {
  try {
    const { data, error } = await createSupabaseBrowserClient().rpc("trust_gap_status" as never, {
      p_code: code,
    } as never);
    if (error) throw error;
    // The generated Supabase types do not include these functions, so the
    // return type is widened here rather than fought with.
    const raw = data as unknown;
    const row = (Array.isArray(raw) ? raw[0] : raw) as
      | { session_exists?: boolean; response_count?: number }
      | null;
    return {
      ok: true,
      exists: Boolean(row?.session_exists),
      count: Number(row?.response_count ?? 0),
    };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

export async function submitTeamResponse(
  code: string,
  answers: TeamAnswers,
): Promise<{ ok: true } | { ok: false; error: StoreError }> {
  try {
    const { error } = await createSupabaseBrowserClient()
      .from("trust_gap_responses" as never)
      .insert({ session_code: code, ...answers } as never);
    if (error) throw error;
    markAnswered(code);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

export async function getReport(
  code: string,
): Promise<{ ok: true; data: ReportPayload } | { ok: false; error: StoreError }> {
  try {
    const { data, error } = await createSupabaseBrowserClient().rpc("trust_gap_report" as never, {
      p_code: code,
    } as never);
    if (error) throw error;
    const d = data as Record<string, unknown> | null;
    if (!d || d.found !== true) return { ok: false, error: "not_found" };

    return {
      ok: true,
      data: {
        found: true,
        unlocked: d.unlocked === true,
        responseCount: Number(d.response_count ?? 0),
        required: Number(d.required ?? 5),
        leader: d.leader as LeaderAnswers | undefined,
        team: d.team
          ? ({
              ...(d.team as Record<string, unknown>),
              count: Number((d.team as Record<string, unknown>).count ?? 0),
              d1_regular_pct: Number((d.team as Record<string, unknown>).d1_regular_pct ?? 0),
              d2_concealed_pct: Number((d.team as Record<string, unknown>).d2_concealed_pct ?? 0),
              d4_clarity_mean: Number((d.team as Record<string, unknown>).d4_clarity_mean ?? 0),
              d5_quiet_pct: Number((d.team as Record<string, unknown>).d5_quiet_pct ?? 0),
              d6_comfort_mean: Number((d.team as Record<string, unknown>).d6_comfort_mean ?? 0),
              d3_reason_counts:
                ((d.team as Record<string, unknown>).d3_reason_counts as Record<string, number>) ?? {},
            } as TeamAggregate)
          : undefined,
      },
    };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

// ─── Local memory ────────────────────────────────────────────────────────────
// Lets a leader return to their own link, and deters a team member from
// answering twice. Without accounts this is a deterrent, not a guarantee, and
// the copy does not claim otherwise.

export function rememberCode(code: string) {
  try {
    window.localStorage.setItem(LS_CODE, code);
  } catch {
    /* ignore */
  }
}

export function recallCode(): string | null {
  try {
    return window.localStorage.getItem(LS_CODE);
  } catch {
    return null;
  }
}

export function markAnswered(code: string) {
  try {
    const raw = window.localStorage.getItem(LS_ANSWERED);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(code)) list.push(code);
    window.localStorage.setItem(LS_ANSWERED, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function hasAnswered(code: string): boolean {
  try {
    const raw = window.localStorage.getItem(LS_ANSWERED);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(code);
  } catch {
    return false;
  }
}
