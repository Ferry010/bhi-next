// Every lead from this site lands in HubSpot (portal: Brand Humanizing Institute).
// Server-only: the service key never reaches the browser.
//
// What happens per lead:
//  1. The contact is created, or updated when the e-mail already exists. "Lead source" and
//     "Bron website" are only filled when still empty, so the first source is kept.
//  2. For buying intent (contact form, vibecoding workshop request) a deal is created in the
//     Sales pipeline at the first stage, linked to the contact.
//  3. A note with all form details is added to the contact (and the deal).
//
// Needs HUBSPOT_SERVICE_KEY: a HubSpot service key (Development > Keys > Service keys) with the
// scopes crm.objects.contacts.read/write and crm.objects.deals.read/write. The AIGA website has
// its own key; every lead is labelled with the site it came from. Without a key this does nothing.

const API = "https://api.hubapi.com";
// Names in Vercel are case-sensitive; accept the lowercase spelling too
const TOKEN = process.env.HUBSPOT_SERVICE_KEY || process.env.hubspot_service_key;

// Which website this lead came in on. Shown in deal names and notes, and stored in the contact
// property "Bron website" (internal name bron_website) when that property exists in HubSpot.
const SITE_LABEL = "Brand Humanizing";
const SITE_PROPERTY = "bron_website";

// The forms on this site, with how each one is filed in HubSpot
export const FORMS: Record<string, { title: string; deal?: (d: Record<string, unknown>) => string; source?: string }> = {
  contact: {
    title: "Contactformulier",
    deal: (d) => `${SITE_LABEL} · ${str(d.looking_for) || "Aanvraag"} · ${str(d.organization) || str(d.name)}`,
  },
  vibecoding: {
    title: "Aanvraag vibecoding-workshop",
    deal: (d) => `${SITE_LABEL} · Vibecoding-workshop · ${str(d.company) || str(d.name)}`,
  },
  vibecoding_save: { title: "Vibecoding: info bewaard voor later" },
  message: { title: "Bericht via de site" },
  newsletter: { title: "Aanmelding nieuwsbrief", source: "Newsletter" },
  book_request: { title: "Aanvraag boek" },
  book_english_edition: { title: "Aanvraag Engelse editie van het boek" },
  certification_waitlist: { title: "Wachtlijst certificering" },
  assessment: { title: "Assessment ingevuld" },
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v));

// Values of the existing contact property "lead_source"
function leadSource(formType: string, d: Record<string, unknown>): string {
  if (FORMS[formType]?.source) return FORMS[formType].source!;
  if (str(d.gclid)) return "Google Ads";
  if (formType === "contact" && str(d.looking_for).startsWith("Session")) return "Keynote booker";
  return "Website";
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

async function hs(path: string, init: RequestInit = {}): Promise<{ status: number; data: any }> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  return { status: res.status, data };
}

// Write contact properties; if "Bron website" doesn't exist (yet) in HubSpot, write the rest anyway
async function writeContact(path: string, method: "POST" | "PATCH", props: Record<string, string>) {
  const first = await hs(path, { method, body: JSON.stringify({ properties: props }) });
  const missingProperty = first.status === 400 && JSON.stringify(first.data || "").includes(SITE_PROPERTY);
  if (!missingProperty) return first;
  const rest = { ...props };
  delete rest[SITE_PROPERTY];
  return hs(path, { method, body: JSON.stringify({ properties: rest }) });
}

const assoc = (id: string, typeId: number) => ({
  to: { id },
  types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: typeId }],
});

export async function pushLeadToHubspot(formType: string, d: Record<string, unknown>): Promise<{ ok: boolean; reason?: string }> {
  if (!TOKEN) return { ok: false, reason: "HUBSPOT_SERVICE_KEY not set" };
  const form = FORMS[formType];
  if (!form) return { ok: false, reason: `unknown form ${formType}` };
  const email = str(d.email).toLowerCase();
  if (!email) return { ok: false, reason: "no e-mail" };

  try {
    // 1. Contact: find by e-mail, then update or create
    const found = await hs(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=lead_source,${SITE_PROPERTY}`);
    const props: Record<string, string> = { email };
    const phone = str(d.phone);
    const company = str(d.organization) || str(d.company);
    if (phone) props.phone = phone;
    if (company) props.company = company;

    let contactId: string;
    if (found.status === 200 && found.data?.id) {
      contactId = found.data.id;
      if (!found.data.properties?.lead_source) props.lead_source = leadSource(formType, d);
      if (!found.data.properties?.[SITE_PROPERTY]) props[SITE_PROPERTY] = SITE_LABEL;
      await writeContact(`/crm/v3/objects/contacts/${contactId}`, "PATCH", props);
    } else {
      const [firstname, ...rest] = str(d.name).split(/\s+/);
      props.firstname = firstname || "";
      props.lastname = rest.join(" ");
      props.lead_source = leadSource(formType, d);
      props.hs_lead_status = "NEW";
      props[SITE_PROPERTY] = SITE_LABEL;
      const created = await writeContact(`/crm/v3/objects/contacts`, "POST", props);
      if (!created.data?.id) return { ok: false, reason: `contact create failed (${created.status})` };
      contactId = created.data.id;
    }

    // 2. Deal for buying intent (deal → contact: association type 3)
    let dealId: string | undefined;
    if (form.deal) {
      const deal = await hs(`/crm/v3/objects/deals`, {
        method: "POST",
        body: JSON.stringify({
          properties: { dealname: form.deal(d).slice(0, 250), pipeline: "default", dealstage: "appointmentscheduled" },
          associations: [assoc(contactId, 3)],
        }),
      });
      dealId = deal.data?.id;
    }

    // 3. Note with every field of the form (note → contact: 202, note → deal: 214)
    const lines = Object.entries(d)
      .filter(([k, v]) => k !== "email" && v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${esc(k.replace(/_/g, " "))}: ${esc(typeof v === "object" ? JSON.stringify(v) : String(v))}`);
    await hs(`/crm/v3/objects/notes`, {
      method: "POST",
      body: JSON.stringify({
        properties: {
          hs_timestamp: new Date().toISOString(),
          hs_note_body: [`<strong>${esc(SITE_LABEL)} website · ${esc(form.title)}</strong>`, ...lines].join("<br>"),
        },
        associations: [assoc(contactId, 202), ...(dealId ? [assoc(dealId, 214)] : [])],
      }),
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown error" };
  }
}
