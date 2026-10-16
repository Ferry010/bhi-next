import { NextRequest, NextResponse } from "next/server";
import { FORMS, pushLeadToHubspot } from "@/lib/hubspot";

// Puts a form submission in HubSpot. Called from the browser next to the Slack notification
// (see lib/sendToHubspot.ts). Only known form types are accepted, and values are clipped, so
// the route can't be used to write arbitrary data into the CRM.

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { form_type?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const formType = String(body.form_type || "");
  if (!FORMS[formType] || !body.data || typeof body.data !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body.data).slice(0, 30)) {
    data[k.slice(0, 60)] = typeof v === "string" ? v.slice(0, 2000) : v;
  }
  const result = await pushLeadToHubspot(formType, data);
  if (!result.ok && result.reason !== "HUBSPOT_SERVICE_KEY not set") console.error("HubSpot:", result.reason);
  return NextResponse.json({ ok: result.ok });
}
