import { biggestGap, type ImpactGapResult } from "./scoring";
import { D4_OPTIONS, D4_NEW_VALUE } from "./questions";

// The drafting aid for the personal email.
//
// This is a starting point, not a message. It is deliberately not sendable from
// the admin screen and there is no automatic send anywhere in this tool. The
// promise on the landing page is that a person reads the result and writes
// back, and the only way to keep that promise is for a person to actually write
// and send it from their own inbox.
//
// Which is why the draft has square bracket placeholders in it. They cannot be
// sent as they stand, so the draft cannot quietly become the product. Whoever
// sends it has to have looked at the report to fill them in.

export interface Draft {
  subject: string;
  body: string;
}

export function buildDraft(args: {
  leaderName: string | null;
  organisation: string | null;
  result: ImpactGapResult;
  teamCounts: Record<string, number>;
}): Draft {
  const { result, teamCounts } = args;
  const first = args.leaderName?.trim().split(/\s+/)[0];
  const top = biggestGap(result.dimensions);
  const nothing = teamCounts.nothing ?? 0;
  const faster = teamCounts.faster ?? 0;
  const higher = teamCounts.higher_standard ?? 0;
  const genuinelyNew = teamCounts[D4_NEW_VALUE] ?? 0;
  const labelFor = (v: string) => D4_OPTIONS.find((o) => o.value === v)?.label ?? v;

  const org = args.organisation?.trim();
  const subject = org
    ? `Your Impact Gap result, and one thing that stood out`
    : `Your Impact Gap result`;

  // Shaped by what the team actually said, because "4 people had nothing to
  // point to" and "everyone found something new" need completely different
  // opening paragraphs.
  const quoteBlock =
    nothing > 0
      ? `The number I keep coming back to is this one: ${nothing} of the ${result.responseCount} people who answered said there is nothing they can point to at all. Not that AI is useless to them, and not a complaint about anything. They simply had nothing to put down, which is a harder result to read than a complaint would have been.`
      : genuinelyNew === 0
        ? `Nobody on your team said anything genuinely new has become possible. ${faster} described the same work done faster and ${higher} described it done to a higher standard. Both of those are worth having. Neither is a thing the team could not do before, and only one of the three changes what you can take on.`
        : `${genuinelyNew} of the ${result.responseCount} people who answered pointed at something genuinely new, and the rest chose "${labelFor(faster >= higher ? "faster" : "higher_standard")}". That split is worth looking at, because whatever those ${genuinelyNew} are doing is the thing worth spreading.`;

  const mechanismBlock = result.mechanism.revealed
    ? `\n\nOne pattern worth pointing out. You said that halving a task would earn someone recognition, and ${Math.round(
        result.mechanism.quietPct,
      )}% of your team said they would keep it to themselves. That gap is usually the reason the freed-up time never shows up anywhere you can see it. It is not a people problem, it is a bet they are making about what happens to whoever finishes early.`
    : "";

  const body = `Hi ${first ?? "[first name]"},

Thanks for running the Impact Gap${org ? ` at ${org}` : ""}, and for asking your team rather than assuming. Most people never get as far as asking.

Your score came out at ${result.score}, which puts you in the ${result.band.label.toLowerCase()} band. The widest single gap was on ${top.name.toLowerCase()}, at ${Math.round(
    top.gap,
  )} out of 100.

  You: ${top.leaderView}
  Them: ${top.teamView}

${quoteBlock}${mechanismBlock}

[Two or three sentences of your own reading here. What you would actually say to this person if they were sitting opposite you. This is the part the whole tool exists for, so it should not sound like the report they already read.]

[One specific suggestion for their situation, and no pitch.]

If any of that is useful, I am happy to talk it through. No agenda.

${"[Ferry or Jonathan]"}`;

  return { subject, body };
}
