import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { sendToHubspot } from "@/lib/sendToHubspot";

const NOTIFY_EMAILS = ["ferry@brandhumanizing.com", "jonathan@brandhumanizing.com"];

export async function notifyByEmail(
  formType: string,
  formData: Record<string, unknown>,
  submissionId: string
) {
  // Every form that notifies the team also lands in HubSpot
  sendToHubspot(formType, formData);

  const details: Record<string, string> = {};
  for (const [key, value] of Object.entries(formData)) {
    if (value !== undefined && value !== null && value !== "") {
      details[key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")] = String(value);
    }
  }

  const templateData = {
    formType,
    submittedAt: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
    details,
  };

  await Promise.allSettled(
    NOTIFY_EMAILS.map((email) =>
      createSupabaseBrowserClient().functions.invoke("send-transactional-email", {
        body: {
          templateName: "form-notification",
          recipientEmail: email,
          idempotencyKey: `form-notify-${submissionId}-${email}`,
          templateData,
        },
      })
    )
  );
}
