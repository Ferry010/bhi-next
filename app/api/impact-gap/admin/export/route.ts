import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/impactGap/adminAuth";
import { loadRecords, STATUSES } from "@/lib/impactGap/adminData";
import { csvDocument } from "@/lib/impactGap/csv";

export const dynamic = "force-dynamic";

const HEADERS = [
  "Organisation",
  "Leader name",
  "Email",
  "Role",
  "Started",
  "Team responses",
  "Score",
  "Band",
  "Status",
  "Personal email sent",
  "Last touched",
  "Code",
];

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }

  try {
    const { records } = await loadRecords();
    const labelOf = (v: string) => STATUSES.find((s) => s.value === v)?.label ?? v;

    const csv = csvDocument(
      HEADERS,
      records.map((r) => [
        r.organisation,
        r.leaderName,
        r.leaderEmail,
        r.leaderRole,
        r.startedAt.slice(0, 10),
        r.responseCount,
        r.score,
        r.band,
        labelOf(r.status),
        r.personalEmailSentAt ? r.personalEmailSentAt.slice(0, 10) : "",
        r.lastTouchedAt.slice(0, 10),
        r.code,
      ]),
    );

    const filename = `impact-gap-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[impact-gap] admin export failed", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
