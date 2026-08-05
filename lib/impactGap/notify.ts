import { createAdminClient } from "@/lib/supabase/admin";
import { scoreImpactGap, type TeamAggregate } from "./scoring";
import { buildSlackMessage } from "./slack";
import type { LeaderAnswers } from "./questions";

// Server only. Runs when a report opens, and never anywhere else.
//
// One notification goes out, to us, in Slack. Nothing is sent to the leader
// automatically. They already hold their dashboard link, which shows them the
// report the moment it opens, and the only message they receive about their
// result is the one a person writes to them afterwards.
//
// There is no email service in this project. That is deliberate rather than
// unfinished: with no sending code there is no way for the promise on the
// landing page to quietly turn into an automated sequence.

type SessionRow = {
  code: string;
  leader_name: string | null;
  leader_email: string | null;
  organisation: string | null;
  leader_role: string | null;
  internal_notified_at: string | null;
};

async function postToSlack(message: { text: string; blocks: unknown[] }): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) throw new Error("SLACK_WEBHOOK_URL is not set, so nobody can be told");

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    throw new Error(`Slack returned ${res.status}: ${await res.text()}`);
  }
}

/**
 * Called on every response once the threshold is met, so it has to be safe to
 * call repeatedly.
 *
 * The notification is claimed with a conditional update before it is sent,
 * which is what stops two responses landing in the same second from producing
 * two Slack messages. If the post then fails, the claim is released so the next
 * response retries rather than the report opening in silence.
 */
export async function notifyReportReady(code: string): Promise<void> {
  const supabase = createAdminClient();

  // The record stops being "awaiting responses" the moment the report opens.
  // This happens first and unconditionally, because the admin list is how a
  // report gets found if Slack is not configured or the message is missed, and
  // a list still showing "awaiting" for a finished report is worse than none.
  // Scoped to 'awaiting' so a status a human has already moved on is never
  // dragged backwards.
  await supabase
    .from("impact_gap_sessions" as never)
    .update({ status: "ready" } as never)
    .eq("code", code)
    .eq("status", "awaiting");

  // No webhook configured means notifications are switched off, which is a
  // setting rather than a fault. Stopping here leaves the claim column
  // untouched, so nothing is recorded as sent that was not, and the logs do not
  // fill with the same error on every response after the fifth.
  if (!process.env.SLACK_WEBHOOK_URL) return;

  const { data: sessionData, error: sessionError } = await supabase
    .from("impact_gap_sessions" as never)
    .select("code, leader_name, leader_email, organisation, leader_role, internal_notified_at")
    .eq("code", code)
    .maybeSingle();

  if (sessionError || !sessionData) return;
  const session = sessionData as unknown as SessionRow;

  // Already announced. Avoids rebuilding the report on every later response.
  if (session.internal_notified_at) return;

  const { data: reportData, error: reportError } = await supabase.rpc("impact_gap_report" as never, {
    p_code: code,
  } as never);
  if (reportError || !reportData) return;

  const d = reportData as Record<string, unknown>;
  if (d.found !== true || d.unlocked !== true) return;

  const team = d.team as Record<string, unknown>;
  const aggregate: TeamAggregate = {
    count: Number(team.count ?? 0),
    d1_regular_pct: Number(team.d1_regular_pct ?? 0),
    d2_hours_mean: Number(team.d2_hours_mean ?? 0),
    d3_time_use_counts: (team.d3_time_use_counts as Record<string, number>) ?? {},
    d3_mechanism_counts: (team.d3_mechanism_counts as Record<string, number>) ?? {},
    d4_no_new_pct: Number(team.d4_no_new_pct ?? 0),
    d4_counts: (team.d4_counts as Record<string, number>) ?? {},
    d5_mean: Number(team.d5_mean ?? 0),
    d6_mean: Number(team.d6_mean ?? 0),
  };

  const result = scoreImpactGap(d.leader as LeaderAnswers, aggregate);

  const { data: claimed } = await supabase
    .from("impact_gap_sessions" as never)
    .update({ internal_notified_at: new Date().toISOString() } as never)
    .eq("code", code)
    .is("internal_notified_at", null)
    .select("code");

  if (!claimed || claimed.length === 0) return;

  try {
    await postToSlack(
      buildSlackMessage({
        code,
        organisation: session.organisation,
        leaderName: session.leader_name,
        leaderEmail: session.leader_email,
        leaderRole: session.leader_role,
        result,
      }),
    );
  } catch (err) {
    // Release the claim so the next response tries again, rather than a report
    // opening and nobody ever hearing about it.
    await supabase
      .from("impact_gap_sessions" as never)
      .update({ internal_notified_at: null } as never)
      .eq("code", code);
    console.error(`[impact-gap] Slack notification failed for ${code}`, err);
  }
}
