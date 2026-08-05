// Published research the report compares against.
// Cite these exactly as given. Do not round them into something punchier,
// and do not add a figure here without a source.

export interface Benchmark {
  stat: string;
  claim: string;
  source: string;
}

export const BENCHMARKS: Benchmark[] = [
  {
    stat: "57%",
    claim: "of employees admit hiding AI use from their employer",
    source: "Global study cited by Business Insider, 2026",
  },
  {
    stat: "48.8%",
    claim: "conceal AI use to avoid judgment, rising to 53.4% among C-suite",
    source: "WalkMe",
  },
  {
    stat: "47%",
    claim:
      "of workers uncomfortable admitting AI use say it feels like cheating, followed by fear of appearing less competent (46%) and fear of appearing lazy (46%). Company policy was the least common reason.",
    source: "Slack, 10,000 desk workers",
  },
  {
    stat: "66%",
    claim: "of employees admit to hiding time saved by AI",
    source: "Forbes, 2026",
  },
  {
    stat: "30%",
    claim: "of organisations have full visibility into employee AI usage",
    source: "Published industry research",
  },
];

// The three moves.
//
// These are deliberately culture and trust interventions, not training. The
// research is clear that training is not what closes this gap, so a report
// that recommends a course would be the wrong tool. Each move has to be
// doable within a month and require no purchase.

export interface Move {
  title: string;
  body: string;
  timeframe: string;
}

export const MOVES: Move[] = [
  {
    title: "Say the thing out loud, once, in public",
    timeframe: "This week, ten minutes",
    body:
      "In your next team meeting, say plainly that using AI is allowed, that you would rather know than not know, and that nobody will be judged for it. Then give an example of where you used it yourself and what it did badly. The admission of your own use is the part that does the work. People do not believe a policy, they believe a precedent.",
  },
  {
    title: "Change what happens when someone saves time",
    timeframe: "This month, one decision",
    body:
      "If halving a task quietly earns someone more work, staying quiet is the rational choice and no amount of encouragement will change it. Decide what the actual reward is, say it, and then honour it the first time someone tests you. The first case sets the rule for everyone watching.",
  },
  {
    title: "Write down what is allowed, on one page",
    timeframe: "This month, an hour",
    body:
      "Not a policy document. One page that answers the questions people are actually asking: which tools, what may go into them, what must never, and who to ask when it is unclear. Unclear rules push people to guess privately, and guessing privately is what you are measuring here.",
  },
];

/** Shown only when D4 clarity is genuinely poor. Deliberately secondary. */
export const LITERACY_NOTE = {
  text:
    "If the gap here is knowledge rather than trust, structured AI literacy training is a real answer for that specific problem.",
  linkLabel: "aigeletterdheid.academy",
  href: "https://aigeletterdheid.academy",
};

/** What this tool cannot tell you. Kept honest on purpose. */
export const LIMITATIONS =
  "This is a snapshot of one team at one moment, taken from a small number of self-reported answers. It cannot tell you who said what, and it is not designed to. It cannot tell you whether the AI use on your team is any good, whether it is safe, or whether it is producing anything worth having. People answer surveys about their own behaviour generously, so the real concealment figure is more likely to be higher than lower. Treat the numbers as a prompt for a conversation, not as a measurement you could take to a board.";
