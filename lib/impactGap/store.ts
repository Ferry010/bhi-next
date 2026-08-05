"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { LeaderAnswers, TeamAnswers } from "./questions";
import type { TeamAggregate } from "./scoring";

// Persistence for the Impact Gap.
//
// Team responses have to be readable across devices, so this is Supabase only.
// There is no localStorage fallback, because a fallback that quietly worked on
// one device would produce a report that looks real and is not. If the tables
// are missing we say so plainly instead of pretending.

const LS_CODE = "bh_impact_gap_code";
const LS_ANSWERED = "bh_impact_gap_answered";
const LS_CONTACT = "bh_impact_gap_contact";

export type StoreError = "not_provisioned" | "not_found" | "failed";

export interface Contact {
  name: string;
  email: string;
  organisation: string;
  role: string;
}

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
      .from("impact_gap_sessions" as never)
      .insert({ code, ...answers } as never);
    if (error) throw error;
    rememberCode(code);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

/**
 * Contact details, captured at the share step and nowhere else. Written through
 * a function scoped to those four columns, because the anon key cannot read or
 * update the sessions table directly.
 */
export async function setContact(code: string, contact: Contact): Promise<boolean> {
  try {
    const { error } = await createSupabaseBrowserClient().rpc("impact_gap_set_contact" as never, {
      p_code: code,
      p_name: contact.name.trim(),
      p_email: contact.email.trim(),
      p_organisation: contact.organisation.trim(),
      p_role: contact.role.trim(),
    } as never);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

// ─── Team ────────────────────────────────────────────────────────────────────

/**
 * Team responses go through a route handler rather than straight to Supabase.
 * The insert itself would work from the browser, but the moment the fifth
 * response lands somebody has to be told, and that has to happen somewhere the
 * service role key lives.
 */
export async function submitTeamResponse(
  code: string,
  answers: TeamAnswers,
): Promise<{ ok: true; count: number } | { ok: false; error: StoreError }> {
  try {
    const res = await fetch("/api/impact-gap/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, answers }),
    });
    const body = (await res.json()) as { ok?: boolean; count?: number; error?: string };

    if (!res.ok || !body.ok) {
      if (body.error === "not_found") return { ok: false, error: "not_found" };
      if (body.error === "not_provisioned") return { ok: false, error: "not_provisioned" };
      return { ok: false, error: "failed" };
    }

    markAnswered(code);
    return { ok: true, count: Number(body.count ?? 0) };
  } catch {
    return { ok: false, error: "failed" };
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

export async function getReport(
  code: string,
): Promise<{ ok: true; data: ReportPayload } | { ok: false; error: StoreError }> {
  try {
    const { data, error } = await createSupabaseBrowserClient().rpc("impact_gap_report" as never, {
      p_code: code,
    } as never);
    if (error) throw error;
    const d = data as Record<string, unknown> | null;
    if (!d || d.found !== true) return { ok: false, error: "not_found" };

    const team = d.team as Record<string, unknown> | undefined;

    return {
      ok: true,
      data: {
        found: true,
        unlocked: d.unlocked === true,
        responseCount: Number(d.response_count ?? 0),
        required: Number(d.required ?? 5),
        leader: d.leader as LeaderAnswers | undefined,
        // Postgres returns numeric as a string through PostgREST, so every
        // number the scoring touches is coerced here rather than in six places.
        team: team
          ? ({
              count: Number(team.count ?? 0),
              d1_regular_pct: Number(team.d1_regular_pct ?? 0),
              d2_hours_mean: Number(team.d2_hours_mean ?? 0),
              d3_time_use_counts: (team.d3_time_use_counts as Record<string, number>) ?? {},
              d3_mechanism_counts: (team.d3_mechanism_counts as Record<string, number>) ?? {},
              d4_no_new_pct: Number(team.d4_no_new_pct ?? 0),
              d4_counts: (team.d4_counts as Record<string, number>) ?? {},
              d5_mean: Number(team.d5_mean ?? 0),
              d6_mean: Number(team.d6_mean ?? 0),
            } as TeamAggregate)
          : undefined,
      },
    };
  } catch (err) {
    return { ok: false, error: isMissingTable(err) ? "not_provisioned" : "failed" };
  }
}

// ─── Status ──────────────────────────────────────────────────────────────────

export async function getStatus(
  code: string,
): Promise<{ ok: true; exists: boolean; count: number } | { ok: false; error: StoreError }> {
  try {
    const { data, error } = await createSupabaseBrowserClient().rpc("impact_gap_status" as never, {
      p_code: code,
    } as never);
    if (error) throw error;
    // The generated Supabase types do not know about these functions, so the
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

// ─── Local memory ────────────────────────────────────────────────────────────
// Lets a leader find their way back to their own link, and deters a team member
// from answering twice. Without accounts this is a deterrent rather than a
// guarantee, and no copy anywhere claims otherwise.

export function rememberCode(code: string) {
  try {
    window.localStorage.setItem(LS_CODE, code);
  } catch {
    /* private mode, storage disabled: the link is on screen anyway */
  }
}

export function recallCode(): string | null {
  try {
    return window.localStorage.getItem(LS_CODE);
  } catch {
    return null;
  }
}

/**
 * Whether this browser has already handed over contact details for this code.
 * The dashboard is a page leaders bookmark and come back to, and asking for
 * their name and email every single visit would be absurd. The sessions table
 * cannot be read from a browser, so this is remembered locally instead.
 */
export function markContactSaved(code: string) {
  try {
    const raw = window.localStorage.getItem(LS_CONTACT);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(code)) list.push(code);
    window.localStorage.setItem(LS_CONTACT, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function hasContactSaved(code: string): boolean {
  try {
    const raw = window.localStorage.getItem(LS_CONTACT);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(code);
  } catch {
    return false;
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
