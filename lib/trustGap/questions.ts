// The six dimensions of the AI Trust Gap.
// Each is asked once of the leader and once of the team. The difference
// between the two answers is the finding.

export type DimensionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6";

export const DIMENSION_WEIGHTS: Record<DimensionId, number> = {
  d1: 0.15, // Usage
  d2: 0.25, // Concealment
  d3: 0.20, // The reason
  d4: 0.15, // Clarity
  d5: 0.15, // The time-saving question
  d6: 0.10, // Comfort
};

export const DIMENSION_NAMES: Record<DimensionId, string> = {
  d1: "Usage",
  d2: "Concealment",
  d3: "The reason",
  d4: "Clarity",
  d5: "Time saved",
  d6: "Comfort",
};

// ─── Shared option values ────────────────────────────────────────────────────

export const D2_LEADER_OPTIONS = [
  { value: "none", label: "No one" },
  { value: "few", label: "A few" },
  { value: "half", label: "About half" },
  { value: "most", label: "Most" },
  { value: "unknown", label: "I don't know" },
] as const;

/** Leader buckets mapped to a percentage midpoint for comparison. */
export const D2_MIDPOINTS: Record<string, number> = {
  none: 0,
  few: 20,
  half: 50,
  most: 80,
};

export const D3_LEADER_OPTIONS = [
  { value: "job_security", label: "They worry about job security" },
  { value: "lazy", label: "They think it looks lazy" },
  { value: "cheating", label: "They think it looks like cheating" },
  { value: "unclear_rules", label: "The rules are unclear" },
  { value: "would_not_hide", label: "They wouldn't hide it" },
] as const;

export const D3_TEAM_OPTIONS = [
  { value: "job_security", label: "I worry about my job security" },
  { value: "lazy", label: "I thought it would look lazy" },
  { value: "cheating", label: "I thought it would look like cheating" },
  { value: "unclear_rules", label: "The rules here are unclear" },
  { value: "did_not_matter", label: "I did not think it mattered" },
] as const;

export const D5_LEADER_OPTIONS = [
  { value: "recognition", label: "Recognition" },
  { value: "more_work", label: "They would get more work" },
  { value: "questions", label: "Questions about their role" },
  { value: "unsure", label: "I'm not sure" },
] as const;

export const D5_TEAM_OPTIONS = [
  { value: "tell_manager", label: "Tell my manager" },
  { value: "quiet_other_work", label: "Keep quiet and use the time for other work" },
  { value: "quiet_same_pace", label: "Keep quiet and keep working at the same pace" },
] as const;

export const D1_TEAM_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "occasionally", label: "Occasionally" },
  { value: "never", label: "Never" },
] as const;

// ─── Answer shapes ───────────────────────────────────────────────────────────

export interface LeaderAnswers {
  d1_usage_estimate: number;        // 0 to 100
  d2_concealment: string;           // none | few | half | most | unknown
  d3_reasons: string[];             // multi-select
  d4_clarity: number;               // 1 to 5
  d5_timesaving: string;            // recognition | more_work | questions | unsure
  d6_comfort: number;               // 1 to 5
}

export interface TeamAnswers {
  d1_frequency: string;             // daily | weekly | occasionally | never
  d2_concealed: string;             // yes | no
  d3_reasons: string[];             // multi-select, only asked if d2 is yes
  d4_clarity: number;               // 1 to 5
  d5_timesaving: string;            // tell_manager | quiet_other_work | quiet_same_pace
  d6_comfort: number;               // 1 to 5
}

// ─── Question copy ───────────────────────────────────────────────────────────

export const LEADER_QUESTIONS = [
  {
    id: "d1" as const,
    kind: "slider" as const,
    question: "What share of your team do you think uses AI regularly for work?",
    help: "Your best estimate is fine. Nobody expects you to know this exactly.",
  },
  {
    id: "d2" as const,
    kind: "single" as const,
    question: "Do you think anyone on your team uses AI without mentioning it?",
    options: D2_LEADER_OPTIONS,
  },
  {
    id: "d3" as const,
    kind: "multi" as const,
    question: "If they do, why do you think that is?",
    help: "Pick everything you think applies.",
    options: D3_LEADER_OPTIONS,
  },
  {
    id: "d4" as const,
    kind: "scale" as const,
    question: "Does your team know what is allowed here?",
    lowLabel: "Not at all",
    highLabel: "Completely",
  },
  {
    id: "d5" as const,
    kind: "single" as const,
    question: "If someone on your team halved a task using AI, what would happen to them?",
    options: D5_LEADER_OPTIONS,
  },
  {
    id: "d6" as const,
    kind: "scale" as const,
    question:
      "How comfortable would your team be telling you they used AI on something important?",
    lowLabel: "Not at all",
    highLabel: "Completely",
  },
];

export const TEAM_QUESTIONS = [
  {
    id: "d1" as const,
    kind: "single" as const,
    question: "How often do you use AI for work?",
    options: D1_TEAM_OPTIONS,
  },
  {
    id: "d2" as const,
    kind: "single" as const,
    question: "Have you ever used AI on work without mentioning it?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ] as const,
  },
  {
    id: "d3" as const,
    kind: "multi" as const,
    question: "Why did you not mention it?",
    help: "Pick everything that applies.",
    options: D3_TEAM_OPTIONS,
  },
  {
    id: "d4" as const,
    kind: "scale" as const,
    question: "Do you know what is allowed here?",
    lowLabel: "Not at all",
    highLabel: "Completely",
  },
  {
    id: "d5" as const,
    kind: "single" as const,
    question: "If you halved a task using AI, what would you do?",
    options: D5_TEAM_OPTIONS,
  },
  {
    id: "d6" as const,
    kind: "scale" as const,
    question: "How comfortable would you be telling your manager you used AI on something important?",
    lowLabel: "Not at all",
    highLabel: "Completely",
  },
];

export const MIN_TEAM_RESPONSES = 5;
