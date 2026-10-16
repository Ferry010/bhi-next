import { NextRequest, NextResponse } from "next/server";
import { pushLeadToHubspot } from "@/lib/hubspot";
import { postLeadToSlack } from "@/lib/slack";

// Called by CalendlyEmbed when someone books a call on our own pages. Calendly's
// browser event only carries two API links (invitee + event), no personal data,
// so we look the booking up server-side with our own token, then file it in
// HubSpot (contact + deal, form type "call_booked") and ping Slack.
//
// Needs CALENDLY_TOKEN (a Calendly personal access token). Without it the route
// fails soft: Calendly still sends its own confirmation e-mails as before.

export const dynamic = "force-dynamic";

const API = "https://api.calendly.com/";
const URI = /^https:\/\/api\.calendly\.com\/scheduled_events\/[A-Za-z0-9-]+(\/invitees\/[A-Za-z0-9-]+)?$/;
const FRESH_MS = 30 * 60 * 1000; // only bookings made in the last half hour, so old links can't be replayed

const clip = (v: unknown, n = 200) => (typeof v === "string" ? v.slice(0, n) : undefined);

async function calendly(uri: string, token: string) {
  const res = await fetch(uri, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!res.ok) return null;
  const json = (await res.json().catch(() => null)) as { resource?: Record<string, unknown> } | null;
  return json?.resource ?? null;
}

export async function POST(req: NextRequest) {
  let body: { invitee?: string; event?: string; product?: string; from_page?: string; gclid?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const invitee = String(body.invitee || "");
  const event = String(body.event || "");
  if (!URI.test(invitee) || !URI.test(event) || !invitee.startsWith(event + "/invitees/") || !invitee.startsWith(API)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const token = process.env.CALENDLY_TOKEN;
  if (!token) return NextResponse.json({ ok: false, error: "not_configured" });

  const [inv, ev] = await Promise.all([calendly(invitee, token), calendly(event, token)]);
  if (!inv || !ev) return NextResponse.json({ ok: false, error: "not_found" });
  const created = Date.parse(String(inv.created_at || ""));
  if (!created || Date.now() - created > FRESH_MS) return NextResponse.json({ ok: false, error: "stale" });

  // Calendly's own booking questions (e.g. company, what it's about) come along too.
  const answers = Array.isArray(inv.questions_and_answers)
    ? (inv.questions_and_answers as { question?: string; answer?: string }[])
        .filter((q) => q.question && q.answer)
        .map((q) => `${q.question}: ${q.answer}`)
        .join(" | ")
    : "";
  const start = Date.parse(String(ev.start_time || ""));
  const when = start
    ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Amsterdam" }).format(start)
    : undefined;

  const data: Record<string, unknown> = {
    name: clip(inv.name),
    email: clip(inv.email),
    phone: clip(inv.text_reminder_number),
    meeting: clip(ev.name),
    when,
    answers: answers ? answers.slice(0, 1500) : undefined,
    product_name: clip(body.product),
    from_page: clip(body.from_page),
    gclid: clip(body.gclid),
  };

  const hubspot = await pushLeadToHubspot("call_booked", data);
  if (!hubspot.ok && hubspot.reason !== "HUBSPOT_SERVICE_KEY not set") console.error("HubSpot:", hubspot.reason);

  // Stored for /admin/forms, like every other lead on the site.
  const supaUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supaUrl && anon) {
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${anon}`, apikey: anon };
    await Promise.all([
      fetch(`${supaUrl}/rest/v1/form_submissions`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({ form_type: "call_booked", data }),
      }).catch((err) => console.error("[calendly-booked] store failed:", err)),
    ]);
  }
  await postLeadToSlack("call_booked", data);

  return NextResponse.json({ ok: true });
}
