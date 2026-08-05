import {
  DIMENSION_WEIGHTS,
  DIMENSION_NAMES,
  D2_MIDPOINTS,
  type DimensionId,
  type LeaderAnswers,
  type TeamAnswers,
} from "./questions";

// Scoring for the AI Trust Gap.
//
// The score is a GAP, from 0 to 100, where lower is better. It measures the
// distance between what the leader believes and what the team reports. It is
// not a grade for the manager, and no copy should present it as one.
//
// Note on shape: scoring consumes an AGGREGATE, never a list of individual
// responses. Even anonymous rows can be cross referenced to deanonymise
// someone in a team of five, so the aggregation happens in the database and
// individual answers never reach the client.

export type BandId = "aligned" | "minor" | "significant" | "wide";

export interface TeamAggregate {
  count: number;
  /** % answering daily or weekly on D1. */
  d1_regular_pct: number;
  /** % answering yes on D2. */
  d2_concealed_pct: number;
  /** Counts per reason across everyone who concealed. */
  d3_reason_counts: Record<string, number>;
  /** Mean of D4, on the original 1 to 5 scale. */
  d4_clarity_mean: number;
  /** % who would keep the time saved to themselves. */
  d5_quiet_pct: number;
  /** Mean of D6, on the original 1 to 5 scale. */
  d6_comfort_mean: number;
}

export interface Band {
  id: BandId;
  label: string;
  reading: string;
}

export interface DimensionResult {
  id: DimensionId;
  name: string;
  /** 0 to 100, higher means a wider gap on this dimension. */
  gap: number;
  weight: number;
  leaderView: string;
  teamView: string;
  note: string;
  leaderUnsure?: boolean;
}

export interface TrustGapResult {
  score: number;
  band: Band;
  dimensions: DimensionResult[];
  headline: DimensionResult;
  responseCount: number;
  /** D4 is poor in absolute terms. The one case where training is a real answer. */
  clarityIsPoor: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const clamp = (n: number) => Math.max(0, Math.min(100, n));
const round = (n: number) => Math.round(n);

function topReason(counts: Record<string, number>): string | null {
  let best: string | null = null;
  let bestN = 0;
  for (const [k, n] of Object.entries(counts)) {
    if (n > bestN) {
      best = k;
      bestN = n;
    }
  }
  return bestN > 0 ? best : null;
}

const REASON_LABELS: Record<string, string> = {
  job_security: "job security",
  lazy: "looking lazy",
  cheating: "looking like cheating",
  unclear_rules: "unclear rules",
  would_not_hide: "nothing to hide",
  did_not_matter: "it did not seem to matter",
};

/**
 * Build an aggregate from raw answers. Used in tests and for any local
 * computation. In production the database does this so raw rows stay server side.
 */
export function aggregateTeamAnswers(team: TeamAnswers[]): TeamAggregate {
  const n = team.length;
  const p = (count: number) => (n === 0 ? 0 : (count / n) * 100);
  const avg = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length);

  const reasonCounts: Record<string, number> = {};
  for (const t of team) {
    if (t.d2_concealed !== "yes") continue;
    for (const r of t.d3_reasons) reasonCounts[r] = (reasonCounts[r] ?? 0) + 1;
  }

  return {
    count: n,
    d1_regular_pct: p(team.filter((t) => t.d1_frequency === "daily" || t.d1_frequency === "weekly").length),
    d2_concealed_pct: p(team.filter((t) => t.d2_concealed === "yes").length),
    d3_reason_counts: reasonCounts,
    d4_clarity_mean: avg(team.map((t) => t.d4_clarity)),
    d5_quiet_pct: p(
      team.filter((t) => t.d5_timesaving === "quiet_other_work" || t.d5_timesaving === "quiet_same_pace").length,
    ),
    d6_comfort_mean: avg(team.map((t) => t.d6_comfort)),
  };
}

// ─── Bands ───────────────────────────────────────────────────────────────────

export function bandFor(score: number): Band {
  if (score <= 15)
    return {
      id: "aligned",
      label: "Closely aligned",
      reading:
        "What you believe and what your team reports are close together. That is uncommon, and it is worth protecting.",
    };
  if (score <= 30)
    return {
      id: "minor",
      label: "Minor gap",
      reading:
        "You are reading your team well on most things, with one or two places where the picture differs from what you expected.",
    };
  if (score <= 50)
    return {
      id: "significant",
      label: "Significant gap",
      reading:
        "There is real distance between your picture and your team's. This is the most common result, and every item below is something you can act on.",
    };
  return {
    id: "wide",
    label: "Wide gap",
    reading:
      "Your team is having a noticeably different experience from the one you described. The national data predicts this, and you are now one of the few leaders who can see it.",
  };
}

// ─── The six dimensions ──────────────────────────────────────────────────────

function scoreD1(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const gap = clamp(Math.abs(leader.d1_usage_estimate - t.d1_regular_pct));
  const direction = leader.d1_usage_estimate < t.d1_regular_pct ? "more" : "less";
  return {
    id: "d1",
    name: DIMENSION_NAMES.d1,
    gap,
    weight: DIMENSION_WEIGHTS.d1,
    leaderView: `You estimated ${round(leader.d1_usage_estimate)}%`,
    teamView: `${round(t.d1_regular_pct)}% use it daily or weekly`,
    note:
      gap < 10
        ? "Your estimate of how much AI is in use is close to what your team reports."
        : `Your team uses AI ${direction} than you estimated, by about ${round(gap)} percentage points.`,
  };
}

function scoreD2(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const unsure = leader.d2_concealment === "unknown";
  // "I don't know" is the maximum gap here and is called out separately in the
  // report, because not knowing is itself the finding.
  const midpoint = D2_MIDPOINTS[leader.d2_concealment] ?? 0;
  const gap = unsure ? 100 : clamp(Math.abs(midpoint - t.d2_concealed_pct));
  return {
    id: "d2",
    name: DIMENSION_NAMES.d2,
    gap,
    weight: DIMENSION_WEIGHTS.d2,
    leaderUnsure: unsure,
    leaderView: unsure ? "You said you did not know" : `You thought around ${midpoint}%`,
    teamView: `${round(t.d2_concealed_pct)}% have used AI without mentioning it`,
    note: unsure
      ? `You said you did not know whether anyone hides AI use, and ${round(t.d2_concealed_pct)}% of your team say they have. Not knowing is a normal place to start, and it is the reason this tool exists.`
      : gap < 15
        ? "You have a realistic read on how much goes unmentioned."
        : `${round(t.d2_concealed_pct)}% of your team have used AI without mentioning it, against the ${midpoint}% or so you expected.`,
  };
}

function scoreD3(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const teamTop = topReason(t.d3_reason_counts);
  // The brief asks for the leader's "top-ranked" reason, but the leader question
  // is a multi select with no ranking. A match is therefore scored as: the
  // team's most selected reason is among the reasons the leader picked.
  const noData = teamTop === null;
  const matched = !noData && leader.d3_reasons.includes(teamTop);
  const gap = noData ? 0 : matched ? 0 : 100;

  return {
    id: "d3",
    name: DIMENSION_NAMES.d3,
    gap,
    weight: DIMENSION_WEIGHTS.d3,
    leaderView:
      leader.d3_reasons.length > 0
        ? leader.d3_reasons.map((r) => REASON_LABELS[r] ?? r).join(", ")
        : "You did not pick a reason",
    teamView: noData ? "Nobody reported hiding AI use" : `Most often: ${REASON_LABELS[teamTop] ?? teamTop}`,
    note: noData
      ? "Nobody on your team reported using AI without mentioning it, so there is no reason to compare."
      : matched
        ? "You correctly identified the reason your team gives most often. That is the hardest part of this to get right."
        : `Your team's most common reason is ${REASON_LABELS[teamTop] ?? teamTop}, and it is not among the reasons you picked. If you have been reassuring people about something else, the reassurance has been aimed at the wrong fear.`,
  };
}

function scoreD4(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const gap = clamp((Math.abs(leader.d4_clarity - t.d4_clarity_mean) / 4) * 100);
  return {
    id: "d4",
    name: DIMENSION_NAMES.d4,
    gap,
    weight: DIMENSION_WEIGHTS.d4,
    leaderView: `You said ${leader.d4_clarity} out of 5`,
    teamView: `Your team averages ${t.d4_clarity_mean.toFixed(1)} out of 5`,
    note:
      gap < 15
        ? "You and your team agree on how clear the rules are."
        : leader.d4_clarity > t.d4_clarity_mean
          ? "You believe the rules are clearer than your team finds them. This is usually the cheapest thing on the list to fix, because it is a writing job rather than a culture job."
          : "Your team finds the rules clearer than you assumed.",
  };
}

function scoreD5(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const mostlyQuiet = t.d5_quiet_pct > 50;
  // A leader expecting recognition against a team that would stay quiet is the
  // maximum gap. Other combinations scale below it.
  let gap: number;
  if (leader.d5_timesaving === "recognition") {
    gap = mostlyQuiet ? 100 : clamp(t.d5_quiet_pct);
  } else if (leader.d5_timesaving === "unsure") {
    gap = 50;
  } else {
    gap = mostlyQuiet ? 25 : clamp(Math.abs(50 - t.d5_quiet_pct));
  }

  return {
    id: "d5",
    name: DIMENSION_NAMES.d5,
    gap,
    weight: DIMENSION_WEIGHTS.d5,
    leaderView:
      leader.d5_timesaving === "recognition"
        ? "You expect it would be recognised"
        : leader.d5_timesaving === "more_work"
          ? "You expect they would get more work"
          : leader.d5_timesaving === "questions"
            ? "You expect questions about their role"
            : "You were not sure",
    teamView: `${round(t.d5_quiet_pct)}% would keep it to themselves`,
    note: mostlyQuiet
      ? "Most of your team would keep the time saved to themselves rather than tell you. That is time the organisation is already paying for and not seeing. It is also a rational choice on their part, which is what makes it a system problem rather than a people problem."
      : "Most of your team would tell you if they saved time. That is worth more than it sounds.",
  };
}

function scoreD6(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const gap = clamp((Math.abs(leader.d6_comfort - t.d6_comfort_mean) / 4) * 100);
  return {
    id: "d6",
    name: DIMENSION_NAMES.d6,
    gap,
    weight: DIMENSION_WEIGHTS.d6,
    leaderView: `You said ${leader.d6_comfort} out of 5`,
    teamView: `Your team averages ${t.d6_comfort_mean.toFixed(1)} out of 5`,
    note:
      gap < 15
        ? "You read your team's comfort level accurately."
        : leader.d6_comfort > t.d6_comfort_mean
          ? "Your team is less comfortable telling you about AI use than you think. Comfort is the thing that has to move first, because everything else depends on it."
          : "Your team is more comfortable raising this than you expected.",
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function scoreTrustGap(leader: LeaderAnswers, team: TeamAggregate): TrustGapResult {
  const dimensions: DimensionResult[] = [
    scoreD1(leader, team),
    scoreD2(leader, team),
    scoreD3(leader, team),
    scoreD4(leader, team),
    scoreD5(leader, team),
    scoreD6(leader, team),
  ];

  const score = clamp(dimensions.reduce((sum, d) => sum + d.gap * d.weight, 0));

  // Headline is the widest raw gap. Weight breaks ties, so a tie between
  // concealment and usage resolves to the one that matters more.
  const headline = [...dimensions].sort((a, b) => b.gap - a.gap || b.weight - a.weight)[0];

  return {
    score: round(score),
    band: bandFor(score),
    dimensions,
    headline,
    responseCount: team.count,
    clarityIsPoor: team.d4_clarity_mean < 3,
  };
}
