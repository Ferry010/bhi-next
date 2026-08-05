import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/impactGap/adminAuth";
import { loadRecords } from "@/lib/impactGap/adminData";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }

  try {
    const { records, stats } = await loadRecords();
    return NextResponse.json({ ok: true, records, stats });
  } catch (err) {
    console.error("[impact-gap] admin list failed", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
