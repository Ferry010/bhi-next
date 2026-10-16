// Fire-and-forget: posts a form submission to Slack (#hello-bh) via our own API
// route, which holds the bot token. Never throws, never blocks the form.
export function notifySlack(formType: string, data: Record<string, unknown>) {
  try {
    fetch("/api/slack-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_type: formType, data }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
