// Fire-and-forget: send a form submission to HubSpot via our own API route.
// A failure never blocks the person filling in the form.
export function sendToHubspot(formType: string, data: Record<string, unknown>) {
  fetch("/api/hubspot-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form_type: formType, data }),
    keepalive: true,
  }).catch(() => {});
}
