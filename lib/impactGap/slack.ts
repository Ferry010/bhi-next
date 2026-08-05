import { biggestGap, type ImpactGapResult } from "./scoring";

// The one notification this tool sends, and it goes to us rather than to a lead.
//
// There is deliberately no email service anywhere in the Impact Gap. That is
// not a shortcut, it is the point: the landing page promises that a person
// reads the result and writes back, and with no sending infrastructure in the
// codebase there is no way for that promise to quietly become an automated
// sequence. The only email a leader ever receives about this is one Ferry or
// Jonathan typed.
//
// A Slack incoming webhook is a single POST to a URL, so this needs no SDK, no
// edge function and no vendor account beyond the Slack you already have.

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://brandhumanizing.com";

export const reportUrlFor = (code: string) => `${BASE_URL}/impact-gap/report/${code}`;
export const adminUrlFor = (code: string) => `${BASE_URL}/impact-gap/admin/${code}`;
export const dashboardUrlFor = (code: string) => `${BASE_URL}/impact-gap/share/${code}`;

export interface SlackMessage {
  /** Shown in notifications and as the fallback where blocks cannot render. */
  text: string;
  blocks: unknown[];
}

/**
 * Everything needed to decide whether to reply now, in the message itself. A
 * notification that requires opening a dashboard before you can judge it is a
 * notification that gets postponed.
 */
export function buildSlackMessage(args: {
  code: string;
  organisation: string | null;
  leaderName: string | null;
  leaderEmail: string | null;
  leaderRole: string | null;
  result: ImpactGapResult;
}): SlackMessage {
  const { result } = args;
  const top = biggestGap(result.dimensions);
  const org = args.organisation?.trim() || "Unknown organisation";
  const who = [args.leaderName?.trim(), args.leaderRole?.trim()].filter(Boolean).join(", ");
  const email = args.leaderEmail?.trim();

  const notes = [
    result.mechanism.revealed
      ? "Mechanism fired: they expect recognition, the team stays quiet."
      : null,
    result.literacyLikely ? "Points at AI literacy rather than reallocation." : null,
    email ? null : "No email given, so there is no way to write to them.",
  ].filter(Boolean) as string[];

  const text = `Impact Gap: ${org} scored ${result.score}, ${result.band.label.toLowerCase()}`;

  const fields = [
    `*Organisation*\n${org}`,
    `*Leader*\n${who || "Not given"}`,
    `*Email*\n${email || "Not given"}`,
    `*Score*\n${result.score} (${result.band.label})`,
    `*Biggest gap*\n${top.name}, ${Math.round(top.gap)}/100`,
    `*Responses*\n${result.responseCount}`,
  ];

  const blocks: unknown[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "A new Impact Gap report just opened", emoji: true },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Someone needs to read this and write to them by hand. Two working days is the promise on the landing page.",
      },
    },
    { type: "section", fields: fields.map((t) => ({ type: "mrkdwn", text: t })) },
  ];

  if (notes.length > 0) {
    blocks.push({
      type: "context",
      elements: notes.map((n) => ({ type: "mrkdwn", text: n })),
    });
  }

  blocks.push({
    type: "actions",
    elements: [
      {
        type: "button",
        text: { type: "plain_text", text: "Open the record and the draft", emoji: true },
        url: adminUrlFor(args.code),
        style: "primary",
      },
      {
        type: "button",
        text: { type: "plain_text", text: "See their report", emoji: true },
        url: reportUrlFor(args.code),
      },
    ],
  });

  return { text, blocks };
}
