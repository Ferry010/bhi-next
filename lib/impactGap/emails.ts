import { biggestGap, type ImpactGapResult } from "./scoring";

// The two automatic emails, and only these two.
//
// One tells a leader their report is ready. One tells us. There is no third
// email, no follow-up sequence, no reminder and no nurture track, because the
// landing page promises a person and a person is what has to arrive. The only
// other email anybody gets is the one Ferry or Jonathan writes by hand.
//
// These go straight out from the site rather than through the Supabase edge
// function. That function ends up calling Lovable's own email service, which
// stops working the moment the project leaves Lovable Cloud. Two emails per
// completed report do not need a queue, a dispatcher, retries and a dead letter
// queue in front of them, so they get a single HTTP request instead.
//
// House style is taken from lib/email-templates/assessment-nurture.ts so these
// look like the rest of the mail the site sends.

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://brandhumanizing.com";

export const INTERNAL_RECIPIENTS = [
  "ferry@brandhumanizing.com",
  "jonathan@brandhumanizing.com",
];

const STYLES = {
  wrapper: "margin:0;padding:0;background:#f9f5f0;font-family:Georgia,'Times New Roman',serif;",
  table: "background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;",
  header: "background:#12152e;padding:28px 40px;",
  headerText:
    "margin:0;color:#ffffff;font-family:Georgia,serif;font-size:17px;font-weight:bold;letter-spacing:0.02em;",
  body: "padding:40px 40px 32px;",
  p: "margin:0 0 20px;color:#12152e;font-size:16px;line-height:1.75;font-family:Georgia,serif;",
  pMuted: "margin:0 0 20px;color:#555;font-size:15px;line-height:1.75;font-family:Georgia,serif;",
  btnWrap: "padding:8px 0 28px;",
  btn: "display:inline-block;background:#ff6b2b;border-radius:50px;padding:14px 28px;text-decoration:none;color:#ffffff;font-family:Georgia,serif;font-size:15px;font-weight:bold;",
  divider: "border:none;border-top:1px solid #e8e0d8;margin:0;",
  footer: "padding:20px 40px;background:#f9f5f0;",
  footerText: "margin:0;color:#999;font-size:12px;line-height:1.7;font-family:Georgia,serif;",
  dl: "margin:0 0 24px;padding:20px 24px;background:#f9f5f0;border-radius:8px;",
  dtdd: "margin:0 0 8px;color:#12152e;font-size:15px;line-height:1.6;font-family:Georgia,serif;",
};

/** Anything that reaches an email body gets escaped. Free text is user input. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(body: string, footerNote: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="${STYLES.wrapper}">
  <table width="100%" cellpadding="0" cellspacing="0" style="${STYLES.wrapper}padding:40px 20px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="${STYLES.table}">
        <tr>
          <td style="${STYLES.header}">
            <p style="${STYLES.headerText}">Brand Humanizing Institute</p>
          </td>
        </tr>
        ${body}
        <tr><td><hr style="${STYLES.divider}"></td></tr>
        <tr>
          <td style="${STYLES.footer}">
            <p style="${STYLES.footerText}">${footerNote}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * To the leader, the moment the report opens. Short on purpose. It exists to
 * carry a link and to set up the thing that actually matters, which is that a
 * person is about to write to them.
 */
export function renderLeaderReportReady(args: {
  code: string;
  leaderName: string | null;
  responseCount: number;
}): { subject: string; html: string } {
  const first = args.leaderName?.trim().split(/\s+/)[0];
  const greeting = first ? `Hi ${esc(first)},` : "Hi,";
  const reportUrl = `${BASE_URL}/impact-gap/report/${args.code}`;

  const body = `
    <tr>
      <td style="${STYLES.body}">
        <p style="${STYLES.p}">${greeting}</p>
        <p style="${STYLES.p}">
          ${args.responseCount} people on your team have answered, which is enough to show you the
          result without anyone being identifiable. Your Impact Gap report is ready.
        </p>
        <div style="${STYLES.btnWrap}">
          <a href="${reportUrl}" style="${STYLES.btn}">Read your report</a>
        </div>
        <p style="${STYLES.p}">
          One thing worth saying before you open it. The score is a gap rather than a grade, and a
          wide one is the normal result. It measures the distance between what you expected and what
          your team reported, which is a thing worth knowing rather than a thing to feel bad about.
        </p>
        <p style="${STYLES.p}">
          Ferry or Jonathan will read your result properly over the next couple of working days and
          write to you with what they make of it. That will be a person at a desk rather than
          another automatic email, and you do not need to do anything to make it happen.
        </p>
        <p style="${STYLES.pMuted}">
          Keep this email. The link in it is the only way back to your report.
        </p>
      </td>
    </tr>`;

  return {
    subject: "Your Impact Gap report is ready",
    html: layout(
      body,
      "This is the only automatic email we will send you about this. You are not on a list, and there is no sequence behind it.",
    ),
  };
}

/**
 * To Ferry and Jonathan, so the human step actually gets triggered by something
 * rather than remembered. Everything needed to decide whether to reply now is
 * in the email itself.
 */
export function renderInternalAlert(args: {
  code: string;
  organisation: string | null;
  leaderName: string | null;
  leaderEmail: string | null;
  leaderRole: string | null;
  result: ImpactGapResult;
}): { subject: string; html: string } {
  const { result } = args;
  const top = biggestGap(result.dimensions);
  const org = args.organisation?.trim() || "Unknown organisation";
  const adminUrl = `${BASE_URL}/impact-gap/admin/${args.code}`;
  const reportUrl = `${BASE_URL}/impact-gap/report/${args.code}`;

  const row = (k: string, v: string) =>
    `<p style="${STYLES.dtdd}"><strong>${esc(k)}:</strong> ${esc(v)}</p>`;

  const body = `
    <tr>
      <td style="${STYLES.body}">
        <p style="${STYLES.p}">A new Impact Gap report just opened. Someone needs to read it and write back.</p>
        <div style="${STYLES.dl}">
          ${row("Organisation", org)}
          ${row("Leader", args.leaderName?.trim() || "Not given")}
          ${row("Role", args.leaderRole?.trim() || "Not given")}
          ${row("Email", args.leaderEmail?.trim() || "Not given, no personal email possible")}
          ${row("Score", `${result.score} (${result.band.label})`)}
          ${row("Biggest gap", `${top.name}, ${Math.round(top.gap)} out of 100`)}
          ${row("Team responses", String(result.responseCount))}
          ${result.mechanism.revealed ? row("Note", "The mechanism pair fired. They expect recognition, the team stays quiet.") : ""}
          ${result.literacyLikely ? row("Note", "Results point at AI literacy rather than reallocation.") : ""}
        </div>
        <div style="${STYLES.btnWrap}">
          <a href="${adminUrl}" style="${STYLES.btn}">Open the record and the draft</a>
        </div>
        <p style="${STYLES.pMuted}">
          The report as they see it: <a href="${reportUrl}">${esc(reportUrl)}</a>
        </p>
      </td>
    </tr>`;

  return {
    subject: `Impact Gap: ${org} scored ${result.score}, ${result.band.label.toLowerCase()}`,
    html: layout(body, "Internal notification. Two working days is the promise on the landing page."),
  };
}
