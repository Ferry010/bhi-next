import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/impactGap/adminAuth";
import { loadRecord, updateRecord, STATUSES, type StatusValue } from "@/lib/impactGap/adminData";
import { buildDraft } from "@/lib/impactGap/draftEmail";
import { isValidCodeShape } from "@/lib/impactGap/code";

export const dynamic = "force-dynamic";

const VALID_STATUSES = STATUSES.map((s) => s.value) as readonly string[];

export async function GET(_request: Request, { params }: { params: { code: string } }) {
  if (!requireAdmin()) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }
  if (!isValidCodeShape(params.code)) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  try {
    const record = await loadRecord(params.code);
    if (!record) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    // The draft is generated fresh every time rather than stored, so it always
    // reflects the current answers and nobody can accidentally send a stale one.
    const draft = record.result
      ? buildDraft({
          leaderName: record.leaderName,
          organisation: record.organisation,
          result: record.result,
          verbatims: record.verbatims,
        })
      : null;

    return NextResponse.json({ ok: true, record, draft });
  } catch (err) {
    console.error("[impact-gap] admin record failed", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { code: string } }) {
  if (!requireAdmin()) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }
  if (!isValidCodeShape(params.code)) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  let body: { status?: unknown; notes?: unknown; personalEmailSent?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (body.status !== undefined && !VALID_STATUSES.includes(String(body.status))) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (body.notes !== undefined && typeof body.notes !== "string") {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  try {
    const ok = await updateRecord(params.code, {
      status: body.status as StatusValue | undefined,
      notes: body.notes as string | undefined,
      personalEmailSent:
        body.personalEmailSent === true ? true : body.personalEmailSent === false ? false : undefined,
    });
    if (!ok) return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });

    const record = await loadRecord(params.code);
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("[impact-gap] admin update failed", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
