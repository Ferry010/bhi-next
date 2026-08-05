import { biggestGap, type ImpactGapResult, type Verbatim } from "./scoring";

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

/**
 * Picks the line worth quoting back.
 *
 * Preference order is deliberate. Something the team called "the same work,
 * faster" is the most useful quote in the whole report, because it is an honest
 * answer that proves the point without anybody having to argue it. A genuinely
 * new capability is the next best thing to open with when there is one. If
 * every answer was blank, that is said in words instead, because "they all left
 * it empty" is a stronger sentence than any quotation would be.
 */
export function pickVerbatim(verbatims: Verbatim[]): Verbatim | null {
  const withText = verbatims.filter((v) => !v.cannot_name && v.text?.trim());
  return (
    withText.find((v) => v.genuinely_new === "faster") ??
    withText.find((v) => v.genuinely_new === "new") ??
    withText[0] ??
    null
  );
}

export function buildDraft(args: {
  leaderName: string | null;
  organisation: string | null;
  result: ImpactGapResult;
  verbatims: Verbatim[];
}): Draft {
  const { result, verbatims } = args;
  const first = args.leaderName?.trim().split(/\s+/)[0];
  const top = biggestGap(result.dimensions);
  const quote = pickVerbatim(verbatims);
  const blanks = verbatims.filter((v) => v.cannot_name || !v.text?.trim()).length;

  const org = args.organisation?.trim();
  const subject = org
    ? `Your Impact Gap result, and one thing that stood out`
    : `Your Impact Gap result`;

  // The quote paragraph changes shape depending on what the team actually gave
  // us, because a paragraph that says "one of your team wrote: nothing" reads
  // like a bug rather than a finding.
  const quoteBlock = quote
    ? `The line I keep coming back to is this one, from someone on your team:\n\n  "${quote.text?.trim()}"\n\n${
        quote.genuinely_new === "faster"
          ? "They were asked whether that was genuinely new or the same work done faster, and they said faster. That is an honest answer and a common one, and it is the whole finding in a single sentence."
          : "That is a real capability, and it is worth noticing who is already doing this so that it spreads rather than stays in one place."
      }`
    : blanks > 0
      ? `The thing that stood out is what was not written. ${blanks} of the ${result.responseCount} people who answered could not name a single thing they can do now that they could not do eighteen months ago. Nobody wrote anything unkind. They simply had nothing to put down, which is a harder result to read than a complaint would have been.`
      : `[No free text came back on this one, so open with something from the six comparisons instead.]`;

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
