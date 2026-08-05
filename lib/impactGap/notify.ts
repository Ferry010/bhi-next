import { createAdminClient } from "@/lib/supabase/admin";
import { scoreImpactGap, type TeamAggregate, type Verbatim } from "./scoring";
import { renderLeaderReportReady, renderInternalAlert } from "./emails";
import type { LeaderAnswers } from "./questions";

// Server only. Runs when a report opens, and never anywhere else.
//
// Two emails go out: one to the leader, one to us. Nothing is scheduled, queued
// or repeated. The personal email that follows is written and sent by a human
// from their own inbox, and there is deliberately no code path in this project
// that could send it for them.

const INTERNAL_RECIPIENTS = ["ferry@brandhumanizing.com", "jonathan@brandhumanizing.com"];

// The deployed edge function routes on a template name. Kept in an env var so
// the name can be corrected without a code change if the function expects
// something else.
const TEMPLATE = process.env.IMPACT_GAP_EMAIL_TEMPLATE ?? "impact-gap-notification";

type SessionRow = {
  code: string;
  leader_name: string | null;
  leader_email: string | null;
  organisation: string | null;
  leader_role: string | null;
  notified_at: string | null;
  internal_notified_at: string | null;
};

async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
  idempotencyKey: string;
}): Promise<void> {
  const { error } = await createAdminClient().functions.invoke("send-transactional-email", {
    body: {
      templateName: TEMPLATE,
      recipientEmail: args.to,
      idempotencyKey: args.idempotencyKey,
      templateData: { subject: args.subject, htmlBody: args.html },
    },
  });
  if (error) throw error;
}

/**
 * Called every time a response lands once the threshold is met, so it has to be
 * safe to call repeatedly.
 *
 * Each email is claimed with a conditional update before it is sent, which is
 * what stops two responses arriving at the same moment from producing two
 * emails. If the send then fails, the claim is released so that the next
 * response retries it. The two emails are claimed separately, because a leader
 * who declined to leave an address should not stop us being told.
 */
export async function notifyReportReady(code: string): Promise<void> {
  const supabase = createAdminClient();

  const { data: sessionData, error: sessionError } = await supabase
    .from("impact_gap_sessions" as never)
    .select("code, leader_name, leader_email, organisation, leader_role, notified_at, internal_notified_at")
    .eq("code", code)
    .maybeSingle();

  if (sessionError || !sessionData) return;
  const session = sessionData as unknown as SessionRow;

  // Nothing left to do. Avoids building a report on every response forever.
  if (session.notified_at && session.internal_notified_at) return;

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
    d4_cannot_name_count: Number(team.d4_cannot_name_count ?? 0),
    d4_faster_count: Number(team.d4_faster_count ?? 0),
    d4_new_count: Number(team.d4_new_count ?? 0),
    d5_mean: Number(team.d5_mean ?? 0),
    d6_mean: Number(team.d6_mean ?? 0),
  };

  const result = scoreImpactGap(d.leader as LeaderAnswers, aggregate);
  const verbatims = (d.verbatims as Verbatim[] | undefined) ?? [];
  void verbatims; // the draft is built in the admin view, from the same data

  // The record stops being "awaiting responses" the moment the report opens.
  // Scoped to 'awaiting' so a status a human has already moved on is never
  // dragged backwards.
  await supabase
    .from("impact_gap_sessions" as never)
    .update({ status: "ready" } as never)
    .eq("code", code)
    .eq("status", "awaiting");

  // ── The leader's email ──
  if (!session.notified_at && session.leader_email) {
    const { data: claimed } = await supabase
      .from("impact_gap_sessions" as never)
      .update({ notified_at: new Date().toISOString() } as never)
      .eq("code", code)
      .is("notified_at", null)
      .select("code");

    if (claimed && claimed.length > 0) {
      try {
        const { subject, html } = renderLeaderReportReady({
          code,
          leaderName: session.leader_name,
          responseCount: result.responseCount,
        });
        await sendEmail({
          to: session.leader_email,
          subject,
          html,
          idempotencyKey: `impact-gap-ready-${code}`,
        });
      } catch (err) {
        // Release the claim so the next response tries again rather than the
        // leader silently never hearing from us.
        await supabase
          .from("impact_gap_sessions" as never)
          .update({ notified_at: null } as never)
          .eq("code", code);
        console.error(`[impact-gap] leader notification failed for ${code}`, err);
      }
    }
  }

  // ── Ours ──
  if (!session.internal_notified_at) {
    const { data: claimed } = await supabase
      .from("impact_gap_sessions" as never)
      .update({ internal_notified_at: new Date().toISOString() } as never)
      .eq("code", code)
      .is("internal_notified_at", null)
      .select("code");

    if (claimed && claimed.length > 0) {
      try {
        const { subject, html } = renderInternalAlert({
          code,
          organisation: session.organisation,
          leaderName: session.leader_name,
          leaderEmail: session.leader_email,
          leaderRole: session.leader_role,
          result,
        });
        await Promise.all(
          INTERNAL_RECIPIENTS.map((to) =>
            sendEmail({ to, subject, html, idempotencyKey: `impact-gap-internal-${code}-${to}` }),
          ),
        );
      } catch (err) {
        await supabase
          .from("impact_gap_sessions" as never)
          .update({ internal_notified_at: null } as never)
          .eq("code", code);
        console.error(`[impact-gap] internal notification failed for ${code}`, err);
      }
    }
  }
}
