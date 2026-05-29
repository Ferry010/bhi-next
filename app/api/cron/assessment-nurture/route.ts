import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderDay3Email, renderDay7Email, type NurtureData } from "@/lib/email-templates/assessment-nurture";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: pending, error } = await supabase
    .from("pending_nurture_emails" as never)
    .select("*")
    .eq("status", "pending")
    .lte("send_at", new Date().toISOString())
    .limit(50) as { data: PendingEmail[] | null; error: unknown };

  if (error || !pending?.length) {
    return NextResponse.json({ sent: 0 });
  }

  const { data: suppressed } = await supabase
    .from("suppressed_emails" as never)
    .select("email")
    .in("email", pending.map((r) => r.email)) as { data: { email: string }[] | null };

  const suppressedSet = new Set((suppressed ?? []).map((r) => r.email));

  let sent = 0;
  let failed = 0;

  for (const record of pending) {
    if (suppressedSet.has(record.email)) {
      await supabase
        .from("pending_nurture_emails" as never)
        .update({ status: "suppressed" } as never)
        .eq("id", record.id);
      continue;
    }

    try {
      const { subject, html } = renderEmail(record);

      const { error: sendError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: record.template_name,
          recipientEmail: record.email,
          idempotencyKey: `nurture-${record.id}`,
          templateData: { subject, htmlBody: html, ...record.template_data },
        },
      });

      if (sendError) throw sendError;

      await supabase
        .from("pending_nurture_emails" as never)
        .update({ status: "sent", sent_at: new Date().toISOString() } as never)
        .eq("id", record.id);

      sent++;
    } catch {
      await supabase
        .from("pending_nurture_emails" as never)
        .update({ status: "failed" } as never)
        .eq("id", record.id);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed });
}

type PendingEmail = {
  id: string;
  email: string;
  template_name: string;
  template_data: NurtureData;
};

function renderEmail(record: PendingEmail): { subject: string; html: string } {
  if (record.template_name === "assessment-nurture-7d") {
    return renderDay7Email(record.email);
  }
  return renderDay3Email(record.email, record.template_data);
}
