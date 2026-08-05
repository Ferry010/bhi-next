import { createAdminClient } from "@/lib/supabase/admin";
import {
  scoreImpactGap,
  aggregateTeamAnswers,
  biggestGap,
  type ImpactGapResult,
} from "./scoring";
import { MIN_TEAM_RESPONSES, type LeaderAnswers, type TeamAnswers } from "./questions";
import {
  STATUSES,
  type StatusValue,
  type RecordSummary,
  type RecordDetail,
  type AggregateStats,
  type RecordUpdate,
} from "./adminTypes";

// Re-exported so the server routes have one import for everything admin.
export { STATUSES };
export type { StatusValue, RecordSummary, RecordDetail, AggregateStats, RecordUpdate };

// Server only. Every function here runs with the service role key, so nothing
// in this file may ever be imported into a client component.
//
// Raw team responses are read here and turned into aggregates immediately.
// They are never returned to a browser, not even to ours. The only individual
// Since Q4 became a multiple choice there is no free text anywhere in the tool,
// so nothing that leaves this file could identify anyone even in principle.

type SessionRow = Record<string, unknown> & {
  code: string;
  created_at: string;
  status: StatusValue;
  organisation: string | null;
  leader_name: string | null;
  leader_email: string | null;
  leader_role: string | null;
  notes: string | null;
  internal_notified_at: string | null;
  personal_email_sent_at: string | null;
  last_touched_at: string | null;
};

type ResponseRow = TeamAnswers & { session_code: string };

const SESSION_COLUMNS =
  "code, created_at, status, organisation, leader_name, leader_email, leader_role, notes, internal_notified_at, personal_email_sent_at, last_touched_at, " +
  "d1_adoption_estimate, d2_time_freed, d3_time_went, d3_mechanism, d4_capability, d5_reallocation, d6_human_work";

function leaderFrom(row: SessionRow): LeaderAnswers {
  return {
    d1_adoption_estimate: Number(row.d1_adoption_estimate ?? 0),
    d2_time_freed: String(row.d2_time_freed),
    d3_time_went: String(row.d3_time_went),
    d3_mechanism: String(row.d3_mechanism),
    d4_capability: String(row.d4_capability),
    d5_reallocation: String(row.d5_reallocation),
    d6_human_work: String(row.d6_human_work),
  };
}

function summarise(row: SessionRow, responses: TeamAnswers[]): RecordSummary & { result: ImpactGapResult | null } {
  const unlocked = responses.length >= MIN_TEAM_RESPONSES;
  const result = unlocked ? scoreImpactGap(leaderFrom(row), aggregateTeamAnswers(responses)) : null;

  return {
    code: row.code,
    organisation: row.organisation,
    leaderName: row.leader_name,
    leaderEmail: row.leader_email,
    leaderRole: row.leader_role,
    startedAt: row.created_at,
    responseCount: responses.length,
    score: result?.score ?? null,
    band: result?.band.label ?? null,
    status: row.status,
    personalEmailSentAt: row.personal_email_sent_at,
    lastTouchedAt: row.last_touched_at ?? row.created_at,
    result,
  };
}

/**
 * Two queries for the whole list, rather than one report call per team. Fine at
 * the volume a free diagnostic produces, and it keeps the screen fast enough
 * that nobody avoids opening it.
 */
export async function loadRecords(): Promise<{ records: RecordSummary[]; stats: AggregateStats }> {
  const supabase = createAdminClient();

  const [{ data: sessions, error: sErr }, { data: responses, error: rErr }] = await Promise.all([
    supabase.from("impact_gap_sessions" as never).select(SESSION_COLUMNS).order("created_at", { ascending: false }),
    supabase.from("impact_gap_responses" as never).select("session_code, d1_frequency, d2_time_saved, d3_time_use, d3_mechanism, d4_capability, d5_told, d6_human_work"),
  ]);

  if (sErr) throw sErr;
  if (rErr) throw rErr;

  const byCode = new Map<string, TeamAnswers[]>();
  for (const r of (responses ?? []) as unknown as ResponseRow[]) {
    const list = byCode.get(r.session_code) ?? [];
    list.push(r);
    byCode.set(r.session_code, list);
  }

  const scored = ((sessions ?? []) as unknown as SessionRow[]).map((row) =>
    summarise(row, byCode.get(row.code) ?? []),
  );

  const withResults = scored.filter((s) => s.result !== null);
  const dimensionTotals = new Map<string, { name: string; sum: number; n: number }>();
  for (const s of withResults) {
    for (const d of s.result!.dimensions) {
      const entry = dimensionTotals.get(d.id) ?? { name: d.name, sum: 0, n: 0 };
      entry.sum += d.gap;
      entry.n += 1;
      dimensionTotals.set(d.id, entry);
    }
  }

  const stats: AggregateStats = {
    teamsTested: scored.length,
    teamsWithReports: withResults.length,
    averageScore:
      withResults.length === 0
        ? null
        : Math.round(withResults.reduce((a, s) => a + (s.score ?? 0), 0) / withResults.length),
    averagePerDimension: Array.from(dimensionTotals, ([id, e]) => ({
      id,
      name: e.name,
      average: Math.round(e.sum / e.n),
    })),
    totalTeamResponses: (responses ?? []).length,
  };

  // Strip the scoring result off the list rows. The list only needs a number.
  const records = scored.map(({ result, ...rest }) => {
    void result;
    return rest;
  });

  return { records, stats };
}

export async function loadRecord(code: string): Promise<RecordDetail | null> {
  const supabase = createAdminClient();

  const { data: sessionData, error: sErr } = await supabase
    .from("impact_gap_sessions" as never)
    .select(SESSION_COLUMNS)
    .eq("code", code)
    .maybeSingle();

  if (sErr) throw sErr;
  if (!sessionData) return null;
  const row = sessionData as unknown as SessionRow;

  const { data: responses, error: rErr } = await supabase
    .from("impact_gap_responses" as never)
    .select("d1_frequency, d2_time_saved, d3_time_use, d3_mechanism, d4_capability, d5_told, d6_human_work")
    .eq("session_code", code);

  if (rErr) throw rErr;

  const rows = (responses ?? []) as unknown as TeamAnswers[];
  const summary = summarise(row, rows);

  return {
    ...summary,
    notes: row.notes,
    leader: leaderFrom(row),
    teamCounts: summary.result ? aggregateTeamAnswers(rows).d4_counts : {},
    notifiedAt: row.internal_notified_at,
  };
}

export async function updateRecord(code: string, update: RecordUpdate): Promise<boolean> {
  const supabase = createAdminClient();
  const patch: Record<string, unknown> = { last_touched_at: new Date().toISOString() };

  if (update.status) patch.status = update.status;
  if (typeof update.notes === "string") patch.notes = update.notes;

  // Marking the personal email sent is a human saying "I wrote it and sent it".
  // Nothing in this codebase can set it, which is the point.
  if (update.personalEmailSent === true) {
    patch.personal_email_sent_at = new Date().toISOString();
    if (!update.status) patch.status = "emailed";
  } else if (update.personalEmailSent === false) {
    patch.personal_email_sent_at = null;
  }

  const { error } = await supabase
    .from("impact_gap_sessions" as never)
    .update(patch as never)
    .eq("code", code);

  return !error;
}

/** The biggest gap, for the list and the internal alert. Re-exported so the
 *  admin routes do not need to reach into scoring themselves. */
export { biggestGap };
