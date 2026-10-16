// Posts website leads to Slack with our own bot (SLACK_BOT_TOKEN, chat:write,
// invited to the channel). Replaces the old notify-slack edge function, which
// went through Lovable's connector gateway and stopped delivering after the
// move to Vercel. Server-only: the token never reaches the browser.

export const LEADS_CHANNEL = "C0ADZ7SDRN0"; // #hello-bh

// Strip Slack control chars so a form value can never smuggle in <!channel> etc.
const clean = (v: unknown, n = 600) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, n);

const LABELS: Record<string, string> = {
  name: "Name",
  email: "E-mail",
  phone: "Phone",
  company: "Company",
  organization: "Organisation",
  product_name: "Session",
  group_size: "Group",
  timing: "When",
  meeting: "Meeting",
  when: "When",
  answers: "Answers",
  looking_for: "Looking for",
  intent: "Intent",
  message: "Message",
  from_page: "Page",
};
const SKIP = new Set(["product", "gclid", "price_from"]);

const HEADERS: Record<string, string> = {
  session_quote: ":moneybag: Quote request",
  call_booked: ":calendar: Call booked",
  contact: ":incoming_envelope: Contact form",
  message: ":speech_balloon: Message via the site",
  newsletter: ":newspaper: Newsletter signup",
  book_request: ":book: Book request",
  book_english_edition: ":book: English edition request",
  certification_waitlist: ":mortar_board: Certification waitlist",
  assessment: ":bar_chart: Assessment completed",
};

export async function postLeadToSlack(
  formType: string,
  data: Record<string, unknown>,
  channel = LEADS_CHANNEL
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) return { ok: false, error: "not_configured" };

  const head = HEADERS[formType] ?? `:memo: ${clean(formType, 60)}`;
  const title = data.product_name && formType === "session_quote" ? `${head}: ${clean(data.product_name, 80)}` : head;

  const rows = Object.entries(data)
    .filter(([k, v]) => !SKIP.has(k) && v !== undefined && v !== null && v !== "" && typeof v !== "object")
    .map(([k, v]) => `*${LABELS[k] ?? clean(k, 40)}:* ${clean(v)}`);
  if (data.gclid) rows.push("*Via Google Ads* :white_check_mark:");

  const text = [`*${title}*`, ...rows].join("\n");

  try {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ channel, text, unfurl_links: false }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!json.ok) console.error("[slack] postMessage failed:", json.error);
    return { ok: !!json.ok, error: json.error };
  } catch (err) {
    console.error("[slack] request failed:", err);
    return { ok: false, error: "request_failed" };
  }
}
