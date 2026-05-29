const BASE_URL = "https://brandhumanizing.com";

const STYLES = {
  wrapper: "margin:0;padding:0;background:#f9f5f0;font-family:Georgia,'Times New Roman',serif;",
  table: "background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;",
  header: "background:#12152e;padding:28px 40px;",
  headerText: "margin:0;color:#ffffff;font-family:Georgia,serif;font-size:17px;font-weight:bold;letter-spacing:0.02em;",
  body: "padding:40px 40px 32px;",
  p: "margin:0 0 20px;color:#12152e;font-size:16px;line-height:1.75;font-family:Georgia,serif;",
  pMuted: "margin:0 0 20px;color:#555;font-size:15px;line-height:1.75;font-family:Georgia,serif;",
  btnWrap: "padding:8px 0 28px;",
  btn: "display:inline-block;background:#ff6b2b;border-radius:50px;padding:14px 28px;text-decoration:none;color:#ffffff;font-family:Georgia,serif;font-size:15px;font-weight:bold;",
  divider: "border:none;border-top:1px solid #e8e0d8;margin:0;",
  footer: "padding:20px 40px;background:#f9f5f0;",
  footerText: "margin:0;color:#999;font-size:12px;line-height:1.7;font-family:Georgia,serif;",
  footerLink: "color:#999;text-decoration:underline;",
};

function layout(body: string, email: string): string {
  const unsubscribeUrl = `${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
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
        <tr>
          <td>
            <hr style="${STYLES.divider}">
          </td>
        </tr>
        <tr>
          <td style="${STYLES.footer}">
            <p style="${STYLES.footerText}">
              You received this because you took the Brand Humanizer assessment at brandhumanizing.com.
              <br>
              <a href="${unsubscribeUrl}" style="${STYLES.footerLink}">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export type NurtureData = {
  overallScore: number;
  skillScores: {
    ai_automation: number;
    creativity: number;
    human_sciences: number;
    emotional_intelligence: number;
  };
};

export function renderDay3Email(email: string, data: NurtureData): { subject: string; html: string } {
  const subject = "A thought on your Brand Humanizer score";

  const body = `
    <tr>
      <td style="${STYLES.body}">
        <p style="${STYLES.p}">Hi there,</p>
        <p style="${STYLES.p}">
          You took the Brand Humanizer assessment a few days ago and scored <strong>${data.overallScore}%</strong>.
          I hope the results gave you something useful to think about.
        </p>
        <p style="${STYLES.p}">
          Scores like yours tend to raise one question more than any other: what do we actually do with this?
        </p>
        <p style="${STYLES.p}">
          The honest answer is that a score is just a starting point. The more interesting work is
          understanding where the gaps are and what your organisation should specifically do about them.
          That depends on your industry, your team structure, and where technology has already made its
          way into how you work.
        </p>
        <p style="${STYLES.p}">
          That is exactly what we cover in the Inspiration Session. In 60 to 90 minutes, we take your
          team through the Brand Humanizing framework and apply it to your situation directly. Most teams
          leave with two or three concrete things they can start doing differently that week.
        </p>
        <p style="${STYLES.p}">
          If the results have stuck with you, it might be worth a conversation.
        </p>
        <div style="${STYLES.btnWrap}">
          <a href="${BASE_URL}/learning/inspiration-session" style="${STYLES.btn}">
            Learn about the Inspiration Session
          </a>
        </div>
        <p style="${STYLES.pMuted}">
          Or just reply to this email. I read everything myself.
        </p>
        <p style="${STYLES.p}">
          Best,<br>
          <strong>Ferry Hoes</strong><br>
          <span style="color:#666;font-size:14px;">Brand Humanizing Institute</span>
        </p>
      </td>
    </tr>`;

  return { subject, html: layout(body, email) };
}

export function renderDay7Email(email: string): { subject: string; html: string } {
  const subject = "One question";

  const body = `
    <tr>
      <td style="${STYLES.body}">
        <p style="${STYLES.p}">Hi there,</p>
        <p style="${STYLES.p}">Quick one.</p>
        <p style="${STYLES.p}">
          You took the Brand Humanizer assessment last week. I am curious: did anything in your
          results surprise you?
        </p>
        <p style="${STYLES.p}">
          The reason I ask is that when something catches your attention in an assessment like this,
          there is usually something worth exploring. The gap between where you are and where you want
          to be tends to be more specific than the overall score suggests.
        </p>
        <p style="${STYLES.p}">
          If you would like to talk through what your results mean for your organisation, reply to
          this email or book a short call below. No agenda. Just a conversation.
        </p>
        <div style="${STYLES.btnWrap}">
          <a href="${BASE_URL}/contact" style="${STYLES.btn}">
            Book a conversation
          </a>
        </div>
        <p style="${STYLES.p}">
          Best,<br>
          <strong>Ferry Hoes</strong><br>
          <span style="color:#666;font-size:14px;">Brand Humanizing Institute</span>
        </p>
      </td>
    </tr>`;

  return { subject, html: layout(body, email) };
}
