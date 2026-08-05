import {
  DIMENSION_WEIGHTS,
  DIMENSION_NAMES,
  TIME_MIDPOINTS,
  TIME_MAX_HOURS,
  THREE_POINT_SCALE,
  TIME_OPTIONS,
  D3_LEADER_OPTIONS,
  D3_TEAM_OPTIONS,
  D4_OPTIONS,
  D4_NEW_VALUE,
  MECHANISM_LEADER_OPTIONS,
  type DimensionId,
  type LeaderAnswers,
  type TeamAnswers,
} from "./questions";

// Scoring for the Impact Gap.
//
// The score is a GAP, from 0 to 100, where lower is better. It measures the
// distance between what a leader believes happened after AI arrived and what
// the team reports happened. It is not a grade for the manager, it is not a
// measure of how good the team is, and no copy anywhere may present it as
// either.
//
// Note on shape: scoring consumes an AGGREGATE, never a list of individual
// responses. In a team of five, individual rows can be cross referenced back to
// a person even with no name attached, so the aggregation happens in the
// database and raw rows never reach the browser at all. Since D4 became a
// multiple choice question there is no free text anywhere in the tool, so there
// is nothing left that could identify anyone even in principle.

export type BandId = "aligned" | "minor" | "significant" | "wide";

export interface TeamAggregate {
  count: number;
  /** % answering daily or a few times a week. */
  d1_regular_pct: number;
  /** Mean hours per week saved, from the bucket midpoints. */
  d2_hours_mean: number;
  d3_time_use_counts: Record<string, number>;
  d3_mechanism_counts: Record<string, number>;
  /** % whose answer was anything other than "something genuinely new". */
  d4_no_new_pct: number;
  /** How many chose each of the four D4 answers. */
  d4_counts: Record<string, number>;
  /** Mean of D5 on a 0 to 100 scale. */
  d5_mean: number;
  /** Mean of D6 on a 0 to 100 scale. */
  d6_mean: number;
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
  /** The leader answered "I do not know", which is called out separately. */
  leaderUnsure?: boolean;
  /** Both sides said no. Treated as a shared problem, not an accusation. */
  sharedBlindSpot?: boolean;
}

export interface Mechanism {
  /** Only true when the D3 pair actually reveals something. */
  revealed: boolean;
  leaderView: string;
  quietPct: number;
  explanation: string;
}

export interface ImpactGapResult {
  score: number;
  band: Band;
  dimensions: DimensionResult[];
  headline: string;
  mechanism: Mechanism;
  responseCount: number;
  /** The problem looks like AI literacy rather than reallocation. */
  literacyLikely: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const clamp = (n: number) => Math.max(0, Math.min(100, n));
const round = (n: number) => Math.round(n);

const label = (options: readonly { value: string; label: string }[], value: string | null) =>
  options.find((o) => o.value === value)?.label ?? "Not answered";

/**
 * The team's most common answer. Ties resolve to whichever option appears
 * first in the canonical list, so the result is stable rather than dependent
 * on object key order.
 */
function plurality(counts: Record<string, number>, order: readonly string[]): string | null {
  let best: string | null = null;
  let bestN = -1;
  for (const key of order) {
    const n = counts[key] ?? 0;
    if (n > bestN) {
      best = key;
      bestN = n;
    }
  }
  return bestN > 0 ? best : null;
}

/** Rounds hours the way a person would say them out loud. */
export function formatHours(h: number): string {
  if (h < 1) return `${Math.round(h * 60)} minutes`;
  const rounded = Math.round(h * 2) / 2;
  return `${rounded} ${rounded === 1 ? "hour" : "hours"}`;
}

/**
 * Builds an aggregate from raw response rows.
 *
 * This is a deliberate duplicate of what impact_gap_report() does in SQL. The
 * database version is the one every browser uses, because it is the only way to
 * guarantee that raw rows never leave the server. This version exists so the
 * admin list can score every record from two queries instead of one round trip
 * per team, and so the aggregation itself can be unit tested. If one changes,
 * the other has to change with it.
 */
export function aggregateTeamAnswers(team: TeamAnswers[]): TeamAggregate {
  const n = team.length;
  const pct = (count: number) => (n === 0 ? 0 : (count / n) * 100);
  const mean = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length);
  const tally = (key: "d3_time_use" | "d3_mechanism") =>
    team.reduce<Record<string, number>>((acc, t) => {
      acc[t[key]] = (acc[t[key]] ?? 0) + 1;
      return acc;
    }, {});

  const d4Counts = team.reduce<Record<string, number>>((acc, t) => {
    acc[t.d4_capability] = (acc[t.d4_capability] ?? 0) + 1;
    return acc;
  }, {});
  const genuinelyNew = d4Counts[D4_NEW_VALUE] ?? 0;

  return {
    count: n,
    d1_regular_pct: pct(team.filter((t) => t.d1_frequency === "daily" || t.d1_frequency === "weekly").length),
    d2_hours_mean: mean(team.map((t) => TIME_MIDPOINTS[t.d2_time_saved] ?? 0)),
    d3_time_use_counts: tally("d3_time_use"),
    d3_mechanism_counts: tally("d3_mechanism"),
    d4_no_new_pct: pct(n - genuinelyNew),
    d4_counts: d4Counts,
    d5_mean: mean(team.map((t) => THREE_POINT_SCALE[t.d5_told] ?? 0)),
    d6_mean: mean(team.map((t) => THREE_POINT_SCALE[t.d6_human_work] ?? 0)),
  };
}

// ─── Bands ───────────────────────────────────────────────────────────────────

export function bandFor(score: number): Band {
  if (score <= 15)
    return {
      id: "aligned",
      label: "Aligned",
      reading:
        "What you believe and what your team reports are close together. That is rare, and it usually means someone has been deliberate about this rather than lucky.",
    };
  if (score <= 30)
    return {
      id: "minor",
      label: "Minor gap",
      reading:
        "Some of the freed-up time is being put to use, unevenly. You are reading your team accurately on most of this, with one or two places where their experience differs from yours.",
    };
  if (score <= 50)
    return {
      id: "significant",
      label: "Significant gap",
      reading:
        "Adoption is real. Reallocation is not. Your team is using the tools and the time is going somewhere other than the work you think it is going into. This is the most common result of the four.",
    };
  return {
    id: "wide",
    label: "Wide gap",
    reading:
      "You are describing a change your team is not experiencing. That sounds harsh written down, and it is worth saying that almost nobody who runs this scores well. You now know something most people in your position are still guessing at.",
  };
}

// ─── The six dimensions ──────────────────────────────────────────────────────

function scoreD1(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const gap = clamp(Math.abs(leader.d1_adoption_estimate - t.d1_regular_pct));
  const direction = leader.d1_adoption_estimate < t.d1_regular_pct ? "more" : "less";
  return {
    id: "d1",
    name: DIMENSION_NAMES.d1,
    gap,
    weight: DIMENSION_WEIGHTS.d1,
    leaderView: `You estimated ${round(leader.d1_adoption_estimate)}%`,
    teamView: `${round(t.d1_regular_pct)}% use it daily or a few times a week`,
    note:
      gap < 15
        ? "You have an accurate read on how much AI is in use. This is the dimension almost everyone gets right, and it is here to establish that adoption is not your problem."
        : `Your team uses AI ${direction} than you estimated, by about ${round(gap)} percentage points. Worth noting, though adoption is rarely where the real gap sits.`,
  };
}

function scoreD2(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const leaderHours = TIME_MIDPOINTS[leader.d2_time_freed] ?? 0;
  const gap = clamp((Math.abs(leaderHours - t.d2_hours_mean) / TIME_MAX_HOURS) * 100);
  return {
    id: "d2",
    name: DIMENSION_NAMES.d2,
    gap,
    weight: DIMENSION_WEIGHTS.d2,
    leaderView: `You said ${label(TIME_OPTIONS, leader.d2_time_freed).toLowerCase()} per person per week`,
    teamView: `Your team reports about ${formatHours(t.d2_hours_mean)} each per week`,
    note:
      gap < 15
        ? "You and your team broadly agree on how much time AI is giving back. That agreement makes the next question much harder to avoid, because the time is real and it went somewhere."
        : leaderHours > t.d2_hours_mean
          ? "You think AI is giving your team more time back than they report getting. Either the tools are doing less than the licence suggests, or the time is being absorbed before anyone notices it."
          : "Your team reports getting more time back than you thought. That is more capacity than you have been planning with, and at the moment nobody is deciding what it is for.",
  };
}

/**
 * D3 compares what the leader believes happened to the freed time against what
 * the team says it actually does with it.
 *
 * Two cases are handled explicitly rather than by arithmetic. A leader who
 * believes the team took on work it could not do before, against a team that
 * reports anything else, is the maximum gap: that is the exact belief this tool
 * exists to test. "I do not know" scores high and is called out separately,
 * because not knowing is itself the finding rather than an absence of one.
 *
 * Everything else is scored as the distance between the two answers on a shared
 * ladder, running from time being quietly absorbed at the bottom to genuinely
 * new work at the top.
 */
const D3_LEADER_LADDER: Record<string, number> = { new_work: 100, more_same: 40, nothing: 10 };
const D3_TEAM_LADDER: Record<string, number> = {
  new_work: 100,
  more_same: 40,
  breathing_room: 25,
  fill_time: 0,
};

function scoreD3(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const majority = plurality(
    t.d3_time_use_counts,
    D3_TEAM_OPTIONS.map((o) => o.value),
  );
  const unsure = leader.d3_time_went === "dont_know";

  let gap: number;
  if (unsure) {
    gap = 85;
  } else if (leader.d3_time_went === "new_work") {
    gap = majority === "new_work" ? 0 : 100;
  } else {
    const l = D3_LEADER_LADDER[leader.d3_time_went] ?? 0;
    const m = majority ? (D3_TEAM_LADDER[majority] ?? 0) : 0;
    gap = clamp(Math.abs(l - m));
  }

  const newWorkCount = t.d3_time_use_counts.new_work ?? 0;

  return {
    id: "d3",
    name: DIMENSION_NAMES.d3,
    gap,
    weight: DIMENSION_WEIGHTS.d3,
    leaderUnsure: unsure,
    leaderView: label(D3_LEADER_OPTIONS, leader.d3_time_went),
    teamView: majority
      ? `Most say: ${label(D3_TEAM_OPTIONS, majority).toLowerCase()}`
      : "No clear answer",
    note: unsure
      ? "You said you did not know what happened to the time, which is a more useful answer than a confident guess would have been. It is also the finding. Capacity that nobody is tracking is capacity that nobody has decided anything about."
      : gap < 15
        ? "You and your team describe the same thing happening to the freed-up time. That agreement is uncommon and it is the thing to protect."
        : leader.d3_time_went === "new_work"
          ? `You believe the time went into work your team could not do before. ${newWorkCount} of ${t.count} people describe it that way. The rest report the time going somewhere quieter, which is the difference this whole test is built to surface.`
          : "Your picture of where the time went and your team's picture do not line up. Nobody is being dishonest here. Freed-up time is almost invisible unless somebody decides in advance what it is for.",
  };
}

function scoreD4(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  // The team metric is the gap directly: everyone whose answer was not
  // "something genuinely new". Faster is worth having and so is a higher
  // standard, but neither is a capability that did not exist before, and only
  // one of those three changes what an organisation can take on.
  const gap = clamp(t.d4_no_new_pct);
  const noNew = t.count - (t.d4_counts[D4_NEW_VALUE] ?? 0);
  const leaderSaysNew = leader.d4_capability === D4_NEW_VALUE;

  return {
    id: "d4",
    name: DIMENSION_NAMES.d4,
    gap,
    weight: DIMENSION_WEIGHTS.d4,
    leaderView: label(D4_OPTIONS, leader.d4_capability),
    teamView: `${noNew} of ${t.count} named nothing genuinely new`,
    note:
      gap < 25
        ? "Most of your team can point at something they can do now that was out of reach before. That is the thing almost every other team taking this test cannot find, and it did not happen by accident."
        : leaderSaysNew
          ? "You believe something genuinely new became possible. Most of your team describe faster, better, or nothing at all. Those are all worth having and none of them is a new capability, which is the difference this whole test exists to surface."
          : "You and your team broadly agree that nothing genuinely new has arrived yet. That agreement is worth something: there is no argument to have about whether the problem is real, only a decision to make about what to do next.",
  };
}

function scoreD5(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const leaderValue = THREE_POINT_SCALE[leader.d5_reallocation] ?? 0;
  const gap = clamp(Math.abs(leaderValue - t.d5_mean));
  // The one dimension where both sides regularly agree, and agreeing on "no"
  // turns the finding into a shared problem rather than an accusation.
  const sharedBlindSpot = leader.d5_reallocation === "no" && t.d5_mean < 25;

  return {
    id: "d5",
    name: DIMENSION_NAMES.d5,
    gap,
    weight: DIMENSION_WEIGHTS.d5,
    sharedBlindSpot,
    leaderView:
      leader.d5_reallocation === "explicit"
        ? "You said yes, explicitly"
        : leader.d5_reallocation === "somewhat"
          ? "You said somewhat"
          : "You said no",
    teamView: `Your team averages ${round(t.d5_mean)} out of 100 on having been told`,
    note: sharedBlindSpot
      ? "You both said no. Nobody has decided what the freed-up time is for, and everybody knows it. That is the most fixable finding in this report, because there is no disagreement to resolve first. Somebody just has to decide, out loud, and it may as well be you."
      : gap < 15
        ? "You and your team agree on how clearly the freed-up capacity has been talked about."
        : leaderValue > t.d5_mean
          ? "You believe this has been talked about more clearly than your team experienced it. Something said once in a leadership meeting rarely survives the trip to the people doing the work. It usually has to be said again, in plainer words, to the people it applies to."
          : "Your team feels they have had more direction on this than you thought you gave them. Worth finding out who gave it, and whether it was the direction you would have chosen.",
  };
}

function scoreD6(leader: LeaderAnswers, t: TeamAggregate): DimensionResult {
  const leaderValue = THREE_POINT_SCALE[leader.d6_human_work] ?? 0;
  const gap = clamp(Math.abs(leaderValue - t.d6_mean));

  return {
    id: "d6",
    name: DIMENSION_NAMES.d6,
    gap,
    weight: DIMENSION_WEIGHTS.d6,
    leaderView:
      leader.d6_human_work === "more"
        ? "You said more"
        : leader.d6_human_work === "same"
          ? "You said about the same"
          : "You said less",
    teamView: `Your team averages ${round(t.d6_mean)} out of 100`,
    note:
      gap < 15
        ? "You and your team see the same amount of judgment, creativity and difficult conversation in the work as before."
        : leaderValue > t.d6_mean
          ? "You believe your team has moved further into the work only people can do than they report having moved. This is the dimension the whole idea rests on, so it is the one worth checking again in six months."
          : "Your team reports spending more time on judgment, creativity and relationships than you realised. That is the shift worth naming out loud, because what gets noticed is what continues.",
  };
}

// ─── The mechanism ───────────────────────────────────────────────────────────

/**
 * The mechanism pair does not score. It explains. A leader who expects that
 * saving time earns recognition, against a team that would keep quiet about
 * it, is the reason the capacity never surfaces anywhere the leader can see it.
 */
function readMechanism(leader: LeaderAnswers, t: TeamAggregate): Mechanism {
  const quiet =
    (t.d3_mechanism_counts.quiet_other_work ?? 0) + (t.d3_mechanism_counts.quiet_same_pace ?? 0);
  const quietPct = t.count === 0 ? 0 : (quiet / t.count) * 100;
  const leaderExpectsGood = leader.d3_mechanism === "recognition";
  const leaderUnsure = leader.d3_mechanism === "not_sure";
  const revealed = quietPct > 50 && (leaderExpectsGood || leaderUnsure);

  return {
    revealed,
    quietPct,
    leaderView: label(MECHANISM_LEADER_OPTIONS, leader.d3_mechanism),
    explanation: leaderExpectsGood
      ? `You said that halving a task would earn someone recognition. ${round(quietPct)}% of your team said they would keep it to themselves. That single pair of answers explains most of this report. If the time never gets mentioned, it never becomes capacity anyone can plan with, and the work it could have paid for never gets proposed. Nobody in this situation is behaving badly. Your team is making a reasonable bet about what happens to people who finish early, and they made that bet based on something other than what you would actually do.`
      : `You were not sure what would happen to someone who halved a task. ${round(quietPct)}% of your team already know what they would do, which is nothing, quietly. When the answer is genuinely unclear from the inside, staying quiet is the safe choice, and safe choices compound into a team that never tells you what it just made possible.`,
  };
}

/**
 * The dimension worth leading with. The widest raw gap, with weight breaking
 * ties so that a tie between adoption and new capability resolves to the one
 * that actually matters. Used by the internal alert and the draft email, so
 * that both name the same thing the report does.
 */
export function biggestGap(dimensions: DimensionResult[]): DimensionResult {
  return [...dimensions].sort((a, b) => b.gap - a.gap || b.weight - a.weight)[0];
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function scoreImpactGap(leader: LeaderAnswers, team: TeamAggregate): ImpactGapResult {
  const dimensions: DimensionResult[] = [
    scoreD1(leader, team),
    scoreD2(leader, team),
    scoreD3(leader, team),
    scoreD4(leader, team),
    scoreD5(leader, team),
    scoreD6(leader, team),
  ];

  const score = clamp(dimensions.reduce((sum, d) => sum + d.gap * d.weight, 0));
  const noNew = team.count - (team.d4_counts[D4_NEW_VALUE] ?? 0);

  // Written to be forwarded. One sentence, two numbers, no jargon, and nothing
  // in it that needs the rest of the report to make sense.
  const headline =
    `Your team reports saving roughly ${formatHours(team.d2_hours_mean)} per person per week, ` +
    `and ${noNew} of the ${team.count} people who answered say nothing genuinely new has become ` +
    `possible in the last eighteen months. ` +
    (noNew === 0
      ? "Everyone pointed at something genuinely new, which almost never happens."
      : "They describe the same work, done faster or to a higher standard, or nothing they can point to at all.");

  // AI literacy is a different problem from reallocation, and it needs a
  // different answer. It looks like this: the tools are barely in use, or they
  // are in use and returning almost nothing. Reallocation advice cannot fix
  // that, so the report points elsewhere rather than pretending otherwise.
  const literacyLikely = team.d1_regular_pct < 50 || team.d2_hours_mean < 1;

  return {
    score: round(score),
    band: bandFor(score),
    dimensions,
    headline,
    mechanism: readMechanism(leader, team),
    responseCount: team.count,
    literacyLikely,
  };
}
