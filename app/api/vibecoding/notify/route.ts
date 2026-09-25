import { NextRequest, NextResponse } from "next/server";

// Posts an incoming vibecoding request to the #vibecoding-workshop Slack channel
// via chat.postMessage (a bot token, so it can target the channel by id). This
// is separate from the general notify-slack edge function on purpose: it routes
// vibecoding leads to their own channel without touching the shared function.
//
// Needs SLACK_BOT_TOKEN (a xoxb- token from a Slack app with the chat:write
// scope, with the bot invited to the channel). If it's unset the route fails
// soft — the lead is already stored in Supabase and shows in /admin/forms.

const CHANNEL_ID = "C0C4Q9YDBRS"; // #vibecoding-workshop

export const dynamic = "force-dynamic";

// Strip Slack control chars so a form value can never smuggle in <!channel> etc.
const clean = (v: unknown) => String(v).replace(/[<>]/g, "").trim();

export async function POST(req: NextRequest) {
  const token = process.env.SLACK_BOT_TOKEN;

  let body: { form_type?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { form_type, data } = body ?? {};
  if (form_type !== "vibecoding" && form_type !== "vibecoding_save") {
    return NextResponse.json({ ok: false, error: "unsupported_type" }, { status: 400 });
  }

  // Not configured yet: fail soft so the form flow never breaks.
  if (!token) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 200 });

  const d = data ?? {};
  const isSave = form_type === "vibecoding_save";

  const rows = [
    d.name && `*Naam:* ${clean(d.name)}`,
    d.email && `*E-mail:* ${clean(d.email)}`,
    d.phone && `*Telefoon:* ${clean(d.phone)}`,
    d.company && `*Bedrijf:* ${clean(d.company)}`,
    d.group_size && `*Groep:* ${clean(d.group_size)}`,
    d.location && `*Locatie:* ${clean(d.location)}`,
    d.timing && `*Wanneer:* ${clean(d.timing)}`,
    d.language && `*Taal:* ${clean(d.language)}`,
    d.gclid && `*Via Google Ads* ✅`,
  ].filter(Boolean);

  const header = isSave
    ? ":bookmark_tabs: Vibecoding — iemand wil de details (nog niet geboekt)"
    : ":tada: Nieuwe vibecoding-aanvraag";
  const text = [header, ...rows].join("\n");

  try {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ channel: CHANNEL_ID, text, unfurl_links: false }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!json.ok) {
      console.error("[vibecoding notify] Slack error:", json.error);
      return NextResponse.json({ ok: false, error: json.error ?? "slack_error" }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[vibecoding notify] request failed:", err);
    return NextResponse.json({ ok: false, error: "request_failed" }, { status: 200 });
  }
}
