// The written parts of the report that are the same for everyone.
//
// Two rules govern this file. Nothing here is a statistic, because no research
// numbers were supplied for this tool and inventing one would poison the whole
// thing. And none of the three moves is training. Training is what gets bought
// when nobody wants to make the harder decision, and the harder decision is
// what the report is about.

export interface Move {
  title: string;
  timeframe: string;
  body: string;
}

/**
 * All three are about reallocation and permission. All three are doable inside
 * a month by one person, with no budget and nothing to buy.
 */
export const MOVES: Move[] = [
  {
    title: "Decide out loud what the freed-up time is for",
    timeframe: "This week, ten minutes",
    body:
      "Not a strategy. One sentence, said to the people it applies to, naming what you want the recovered hours to go into. Deeper client relationships, or the research nobody has had time for, or thinking properly about a problem instead of reacting to it. Time that nobody has claimed gets absorbed by whatever is loudest, which is almost never the thing you would have chosen. Say the sentence, and say it again a fortnight later, because nobody believes a thing they heard once.",
  },
  {
    title: "Name one thing you want the team to be able to do in six months that it cannot do today",
    timeframe: "This month, one afternoon",
    body:
      "Write it down and tell the team what it is. Not a target and not a number, a capability: something that would be genuinely out of reach for you right now. This is the question the test asks, pointed forward instead of backward. It also turns the freed-up time into something with a destination, which is the single difference between the organisations that got something out of AI and the ones that got faster at what they already did.",
  },
  {
    title: "Make it explicitly safe to say a task now takes one hour instead of three",
    timeframe: "This month, and then every time it comes up",
    body:
      "Say plainly that if something got quicker you want to hear about it, and that hearing about it will not be repaid with a fuller calendar. Then honour it the first time someone tests you, because everyone is watching what happens to that person. Until saying it is safe, the rational move for anyone who saves two hours is to keep those two hours to themselves, and you will never see the capacity you are already paying for.",
  },
];

/** Deliberately secondary. Shown only when the shape of the results points at
 *  literacy rather than reallocation, and never allowed to compete with the
 *  three moves above. */
export const LITERACY_NOTE = {
  text:
    "One thing worth separating out: on these answers the tools are barely being used, or they are being used and giving almost nothing back. That is a different problem from this one, and reallocation advice will not touch it. Structured AI literacy training is a real answer for that specific gap.",
  linkLabel: "aigeletterdheid.academy",
  href: "https://aigeletterdheid.academy",
};

/** The honest paragraph. Kept honest on purpose. */
export const LIMITATIONS =
  "This is a snapshot of one team at one moment, built from a small number of self-reported answers. It cannot tell you who said what, and it was designed so that nobody can. It cannot tell you whether the AI work happening on your team is any good, whether it is safe, or whether it is producing anything worth having. It cannot tell you whether the freed-up time was the tool's doing or something else entirely. People describe their own working habits generously, so the real figures are more likely to be less flattering than these than more. And a test that asks about the last eighteen months will always miss a change that started slowly. Treat all of it as a good reason for a conversation, not as a measurement you could take to a board.";

/** The human step, stated the same way on the report and in the email. */
export const HUMAN_STEP =
  "The score above was calculated automatically, because it is arithmetic. What it means for your team is not. Ferry or Jonathan will read this report properly, including what your team wrote, and send you their own reading of it within two working days. That is a person writing to you, not a sequence with your name in it. There is nothing to book and nothing to reply to unless you want to.";

/** One quiet line at the very bottom. One line, no box, no urgency. */
export const CLOSING_LINE = {
  before: "If you would rather have this conversation with the team in the room, that is what the ",
  linkLabel: "Spark Session",
  href: "/learning/inspiration-session",
  after: " is for.",
};
