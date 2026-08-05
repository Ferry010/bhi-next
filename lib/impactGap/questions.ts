// The six dimensions of the Impact Gap.
//
// Each dimension is asked once of the leader and once of the team, in as close
// to the same words as first person and third person allow. The difference
// between the two answers is the finding. Nothing here asks whether AI is being
// used, because that question stopped being interesting a while ago. It asks
// what happened to the time.

export type DimensionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6";

export const MIN_TEAM_RESPONSES = 5;

export const DIMENSION_WEIGHTS: Record<DimensionId, number> = {
  d1: 0.10, // Adoption. Usually small, and that is the point.
  d2: 0.15, // Time freed
  d3: 0.25, // Where the time went
  d4: 0.25, // New capability. The most important question in the tool.
  d5: 0.15, // Deliberate reallocation
  d6: 0.10, // Human work
};

export const DIMENSION_NAMES: Record<DimensionId, string> = {
  d1: "Adoption",
  d2: "Time freed",
  d3: "Where the time went",
  d4: "New capability",
  d5: "Deliberate reallocation",
  d6: "Human work",
};

// ─── Shared option sets ──────────────────────────────────────────────────────

/** D2, asked identically of both sides. */
export const TIME_OPTIONS = [
  { value: "none", label: "None" },
  { value: "under1", label: "Under 1 hour" },
  { value: "1to3", label: "1 to 3 hours" },
  { value: "3to5", label: "3 to 5 hours" },
  { value: "over5", label: "More than 5 hours" },
] as const;

/** Hours per week each bucket is treated as, for comparison. */
export const TIME_MIDPOINTS: Record<string, number> = {
  none: 0,
  under1: 0.5,
  "1to3": 2,
  "3to5": 4,
  over5: 6,
};

/** The top of the D2 scale, used to normalise the gap to 0 to 100. */
export const TIME_MAX_HOURS = 6;

export const D1_TEAM_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "A few times a week" },
  { value: "occasionally", label: "Occasionally" },
  { value: "never", label: "Never" },
] as const;

export const D3_LEADER_OPTIONS = [
  { value: "new_work", label: "Taken on work they could not do before" },
  { value: "more_same", label: "More of the same work" },
  { value: "nothing", label: "Nothing has changed" },
  { value: "dont_know", label: "I do not know" },
] as const;

export const D3_TEAM_OPTIONS = [
  { value: "new_work", label: "New work I could not do before" },
  { value: "more_same", label: "More of the same work" },
  { value: "breathing_room", label: "I keep the same pace, it is breathing room" },
  { value: "fill_time", label: "I do not mention it and fill the time" },
] as const;

/** The mechanism pair. Stored and explained, never scored. */
export const MECHANISM_LEADER_OPTIONS = [
  { value: "recognition", label: "Recognition" },
  { value: "more_work", label: "They would get more work" },
  { value: "role_questions", label: "Questions about their role" },
  { value: "not_sure", label: "I am not sure" },
] as const;

export const MECHANISM_TEAM_OPTIONS = [
  { value: "tell_manager", label: "Tell my manager" },
  { value: "quiet_other_work", label: "Keep quiet and use the time for other work" },
  { value: "quiet_same_pace", label: "Keep quiet and keep the same pace" },
] as const;

/**
 * D4, asked of both sides in exactly the same words so the two answers compare
 * directly. Only "new" counts as a capability that did not exist before. Faster
 * and higher standard are both worth having, and neither is the same thing as
 * being able to do something you could not do at all.
 */
export const D4_OPTIONS = [
  { value: "new", label: "Something genuinely new, that was not possible before" },
  { value: "higher_standard", label: "The same work, to a noticeably higher standard" },
  { value: "faster", label: "The same work, just faster" },
  { value: "nothing", label: "Nothing I can point to" },
] as const;

/** The only answer that counts as a new capability. */
export const D4_NEW_VALUE = "new";

export const D5_LEADER_OPTIONS = [
  { value: "explicit", label: "Yes, explicitly" },
  { value: "somewhat", label: "Somewhat" },
  { value: "no", label: "No" },
] as const;

export const D5_TEAM_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "somewhat", label: "Somewhat" },
  { value: "no", label: "No" },
] as const;

/** D6, asked of both sides. */
export const D6_OPTIONS = [
  { value: "more", label: "More" },
  { value: "same", label: "About the same" },
  { value: "less", label: "Less" },
] as const;

/** D5 and D6 both map to a 0 to 100 scale so the two sides compare directly. */
export const THREE_POINT_SCALE: Record<string, number> = {
  explicit: 100,
  yes: 100,
  more: 100,
  somewhat: 50,
  same: 50,
  no: 0,
  less: 0,
};

// ─── Answer shapes ───────────────────────────────────────────────────────────

export interface LeaderAnswers {
  d1_adoption_estimate: number;
  d2_time_freed: string;
  d3_time_went: string;
  d3_mechanism: string;
  d4_capability: string;
  d5_reallocation: string;
  d6_human_work: string;
}

export interface TeamAnswers {
  d1_frequency: string;
  d2_time_saved: string;
  d3_time_use: string;
  d3_mechanism: string;
  d4_capability: string;
  d5_told: string;
  d6_human_work: string;
}

// ─── The questions as asked ──────────────────────────────────────────────────
// Question ids are the field ids the survey form collects. The mapping from
// these to the answer shapes above lives in the page that submits them, so the
// wording can change without touching the database.

export const LEADER_QUESTIONS = [
  {
    id: "d1",
    kind: "slider",
    question: "What share of your team uses AI regularly for work?",
    help: "Your best estimate. Nobody is checking it against a licence report.",
  },
  {
    id: "d2",
    kind: "single",
    question: "Roughly how much time do you think AI saves each person on your team per week?",
    options: TIME_OPTIONS,
  },
  {
    id: "d3",
    kind: "single",
    question: "What has your team done with the time AI freed up?",
    help: "If the honest answer is that you do not know, say that. It is a normal answer and it tells us something real.",
    options: D3_LEADER_OPTIONS,
    sub: {
      id: "mechanism",
      question: "If someone on your team halved a task using AI, what would happen to them?",
      help: "This part is not scored. It is here because it usually explains the rest.",
      options: MECHANISM_LEADER_OPTIONS,
    },
  },
  {
    id: "d4",
    kind: "single",
    question: "What can your team do now that it could not do eighteen months ago?",
    help: "This is the question the whole test is built around, so take a moment on it. \"Nothing I can point to\" is a real answer and a common one.",
    options: D4_OPTIONS,
  },
  {
    id: "d5",
    kind: "single",
    question: "Has anyone decided what the freed-up capacity is for?",
    help: "Anyone at all, not only you.",
    options: D5_LEADER_OPTIONS,
  },
  {
    id: "d6",
    kind: "single",
    question:
      "Compared to two years ago, is your team spending more or less time on judgment, creativity, relationships and difficult conversations?",
    options: D6_OPTIONS,
  },
] as const;

export const TEAM_QUESTIONS = [
  {
    id: "d1",
    kind: "single",
    question: "How often do you use AI for work?",
    options: D1_TEAM_OPTIONS,
  },
  {
    id: "d2",
    kind: "single",
    question: "Roughly how much time does AI save you in a week?",
    options: TIME_OPTIONS,
  },
  {
    id: "d3",
    kind: "single",
    question: "What do you actually do with the time AI saves you?",
    help: "Answer with what is true, not with what sounds good. Your manager never sees this answer on its own.",
    options: D3_TEAM_OPTIONS,
    sub: {
      id: "mechanism",
      question: "If you halved a task using AI, what would you do?",
      options: MECHANISM_TEAM_OPTIONS,
    },
  },
  {
    id: "d4",
    kind: "single",
    question: "What can you do now that you could not do eighteen months ago?",
    help: "Answer with what is true. \"Nothing I can point to\" is a real answer, it is a common one, and it is genuinely useful here.",
    options: D4_OPTIONS,
  },
  {
    id: "d5",
    kind: "single",
    question: "Has anyone talked to you about what to do with the time AI saves you?",
    options: D5_TEAM_OPTIONS,
  },
  {
    id: "d6",
    kind: "single",
    question:
      "Compared to two years ago, are you spending more or less time on judgment, creativity, relationships and difficult conversations?",
    options: D6_OPTIONS,
  },
] as const;
