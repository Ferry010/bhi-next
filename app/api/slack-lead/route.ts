import { NextRequest, NextResponse } from "next/server";
import { FORMS } from "@/lib/hubspot";
import { postLeadToSlack } from "@/lib/slack";

// Posts a form submission to #hello-bh. Called from the browser (lib/notifySlack.ts)
// next to the HubSpot push. Only known form types, values clipped. Booked calls are
// posted server-side by /api/calendly-booked, and vibecoding leads go to their own
// channel via /api/vibecoding/notify, so neither is accepted here.

export const dynamic = "force-dynamic";

const NOT_HERE = new Set(["call_booked", "vibecoding", "vibecoding_save"]);

export async function POST(req: NextRequest) {
  let body: { form_type?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const formType = String(body.form_type || "");
  if (!FORMS[formType] || NOT_HERE.has(formType) || !body.data || typeof body.data !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body.data).slice(0, 30)) {
    data[k.slice(0, 60)] = typeof v === "string" ? v.slice(0, 2000) : v;
  }
  const result = await postLeadToSlack(formType, data);
  return NextResponse.json({ ok: result.ok, error: result.error });
}
