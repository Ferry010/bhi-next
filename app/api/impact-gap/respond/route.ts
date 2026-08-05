import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidCodeShape } from "@/lib/impactGap/code";
import { MIN_TEAM_RESPONSES, CAPABILITY_MAX_LENGTH } from "@/lib/impactGap/questions";
import { notifyReportReady } from "@/lib/impactGap/notify";

export const dynamic = "force-dynamic";

// Team responses come through here rather than going straight to Supabase from
// the browser, for one reason: when the fifth response lands, the report becomes
// available and two emails have to go out. That needs the service role key, so
// it has to happen on a server.
//
// Nothing about a respondent is recorded. No IP address, no user agent, no
// account, no cookie set from here. The only thing that leaves this route is a
// count.

const ALLOWED: Record<string, readonly string[]> = {
  d1_frequency: ["daily", "weekly", "occasionally", "never"],
  d2_time_saved: ["none", "under1", "1to3", "3to5", "over5"],
  d3_time_use: ["new_work", "more_same", "breathing_room", "fill_time"],
  d3_mechanism: ["tell_manager", "quiet_other_work", "quiet_same_pace"],
  d5_told: ["yes", "somewhat", "no"],
  d6_human_work: ["more", "same", "less"],
};

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isMissingTable(err: unknown): boolean {
  const e = err as { code?: string; message?: string } | null;
  if (!e) return false;
  return (
    e.code === "PGRST205" ||
    e.code === "42P01" ||
    e.code === "42883" ||
    /could not find|does not exist|schema cache/i.test(e.message ?? "")
  );
}

export async function POST(request: Request) {
  let payload: { code?: unknown; answers?: Record<string, unknown> };
  try {
    payload = await request.json();
  } catch {
    return fail("bad_request", 400);
  }

  const code = String(payload.code ?? "");
  if (!isValidCodeShape(code)) return fail("not_found", 404);

  const a = payload.answers;
  if (!a || typeof a !== "object") return fail("bad_request", 400);

  // Every enum is checked here as well as by the database, because this is a
  // public endpoint and a check constraint violation is a worse error message
  // than a clear rejection.
  for (const [field, values] of Object.entries(ALLOWED)) {
    if (!values.includes(String(a[field]))) return fail("bad_request", 400);
  }

  const cannotName = a.d4_cannot_name === true;
  const rawText = typeof a.d4_capability_text === "string" ? a.d4_capability_text.trim() : "";
  const genuinelyNew = a.d4_genuinely_new === "new" || a.d4_genuinely_new === "faster"
    ? String(a.d4_genuinely_new)
    : null;

  if (!cannotName && (rawText.length === 0 || genuinelyNew === null)) return fail("bad_request", 400);
  if (rawText.length > CAPABILITY_MAX_LENGTH) return fail("bad_request", 400);

  try {
    // Inside the try on purpose. This throws when the service role key is
    // missing, and a team member halfway through answering should get a
    // sentence rather than an empty 500 from a Next error boundary.
    const supabase = createAdminClient();

    // The code has to exist before anything is written, otherwise a mistyped
    // link produces a foreign key error rather than a sentence a person can read.
    const { data: session, error: lookupError } = await supabase
      .from("impact_gap_sessions" as never)
      .select("code")
      .eq("code", code)
      .maybeSingle();

    if (lookupError) throw lookupError;
    if (!session) return fail("not_found", 404);

    const { error: insertError } = await supabase.from("impact_gap_responses" as never).insert({
      session_code: code,
      d1_frequency: a.d1_frequency,
      d2_time_saved: a.d2_time_saved,
      d3_time_use: a.d3_time_use,
      d3_mechanism: a.d3_mechanism,
      d4_capability_text: cannotName ? null : rawText,
      d4_cannot_name: cannotName,
      d4_genuinely_new: cannotName ? null : genuinelyNew,
      d5_told: a.d5_told,
      d6_human_work: a.d6_human_work,
    } as never);

    if (insertError) throw insertError;

    const { count, error: countError } = await supabase
      .from("impact_gap_responses" as never)
      .select("id", { count: "exact", head: true })
      .eq("session_code", code);

    if (countError) throw countError;

    const total = count ?? 0;

    // The report becoming available is what triggers the human step, so the
    // trigger is a real event rather than a nightly sweep. notifyReportReady
    // claims each email before sending, so calling it on every response past
    // the threshold is safe and gives a failed send another chance.
    //
    // Wrapped so that nothing about our email setup can ever cause a team
    // member's answers to look like they failed. Their answers are already
    // committed by this point.
    if (total >= MIN_TEAM_RESPONSES) {
      try {
        await notifyReportReady(code);
      } catch (err) {
        console.error(`[impact-gap] notification step failed for ${code}`, err);
      }
    }

    return NextResponse.json({ ok: true, count: total });
  } catch (err) {
    if (isMissingTable(err)) return fail("not_provisioned", 503);
    if (err instanceof Error && /environment variable/i.test(err.message)) {
      console.error("[impact-gap] respond route is missing its Supabase configuration", err);
      return fail("not_provisioned", 503);
    }
    console.error("[impact-gap] respond route failed", err);
    return fail("failed", 500);
  }
}
