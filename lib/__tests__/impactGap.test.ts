import { describe, it, expect } from "vitest";
import { scoreImpactGap, bandFor, formatHours, type TeamAggregate } from "@/lib/impactGap/scoring";
import { DIMENSION_WEIGHTS, type LeaderAnswers } from "@/lib/impactGap/questions";

// A leader who believes the transformation happened, which is the belief the
// whole tool exists to test.
const optimisticLeader: LeaderAnswers = {
  d1_adoption_estimate: 80,
  d2_time_freed: "3to5",
  d3_time_went: "new_work",
  d3_mechanism: "recognition",
  d4_capability: "new",
  d5_reallocation: "explicit",
  d6_human_work: "more",
};

/** A team that adopted AI and reallocated none of the time it saved. */
const disappointingTeam: TeamAggregate = {
  count: 8,
  d1_regular_pct: 87.5,
  d2_hours_mean: 3.5,
  d3_time_use_counts: { new_work: 1, more_same: 4, breathing_room: 2, fill_time: 1 },
  d3_mechanism_counts: { tell_manager: 1, quiet_other_work: 4, quiet_same_pace: 3 },
  d4_no_new_pct: 75,
  d4_counts: { nothing: 4, faster: 2, new: 2 },
  d5_mean: 12.5,
  d6_mean: 37.5,
};

/** The rare team where the belief and the reality match. */
const alignedTeam: TeamAggregate = {
  count: 6,
  d1_regular_pct: 83,
  d2_hours_mean: 4,
  d3_time_use_counts: { new_work: 4, more_same: 1, breathing_room: 1, fill_time: 0 },
  d3_mechanism_counts: { tell_manager: 5, quiet_other_work: 1, quiet_same_pace: 0 },
  d4_no_new_pct: 17,
  d4_counts: { nothing: 1, new: 5 },
  d5_mean: 92,
  d6_mean: 92,
};

const gapOf = (result: ReturnType<typeof scoreImpactGap>, id: string) =>
  result.dimensions.find((d) => d.id === id)!.gap;

describe("weights", () => {
  it("sum to exactly 1, so the score cannot drift above 100", () => {
    const total = Object.values(DIMENSION_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(1, 10);
  });
});

describe("bands", () => {
  it("puts each boundary in the band the brief specifies", () => {
    expect(bandFor(0).id).toBe("aligned");
    expect(bandFor(15).id).toBe("aligned");
    expect(bandFor(16).id).toBe("minor");
    expect(bandFor(30).id).toBe("minor");
    expect(bandFor(31).id).toBe("significant");
    expect(bandFor(50).id).toBe("significant");
    expect(bandFor(51).id).toBe("wide");
    expect(bandFor(100).id).toBe("wide");
  });
});

describe("the score", () => {
  it("is wide when a leader believes in a change the team is not experiencing", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(r.score).toBeGreaterThan(50);
    expect(r.band.id).toBe("wide");
  });

  it("is low when both sides describe the same thing", () => {
    const r = scoreImpactGap(optimisticLeader, alignedTeam);
    expect(r.score).toBeLessThanOrEqual(15);
    expect(r.band.id).toBe("aligned");
  });

  it("never leaves the 0 to 100 range", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });
});

describe("D1 adoption", () => {
  it("is the absolute difference in percentage points", () => {
    const r = scoreImpactGap({ ...optimisticLeader, d1_adoption_estimate: 50 }, disappointingTeam);
    expect(gapOf(r, "d1")).toBeCloseTo(37.5, 5);
  });
});

describe("D2 time freed", () => {
  it("normalises the difference in hours against the top of the scale", () => {
    // Leader midpoint for "3 to 5 hours" is 4, team mean is 3.5, so 0.5 of 6.
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(gapOf(r, "d2")).toBeCloseTo((0.5 / 6) * 100, 5);
  });
});

describe("D3 where the time went", () => {
  it("is the maximum gap when the leader says new work and the team majority does not", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(gapOf(r, "d3")).toBe(100);
  });

  it("is zero when the leader says new work and the team majority agrees", () => {
    const r = scoreImpactGap(optimisticLeader, alignedTeam);
    expect(gapOf(r, "d3")).toBe(0);
  });

  it("scores high for I do not know, and flags it for separate mention", () => {
    const r = scoreImpactGap({ ...optimisticLeader, d3_time_went: "dont_know" }, alignedTeam);
    expect(gapOf(r, "d3")).toBe(85);
    expect(r.dimensions.find((d) => d.id === "d3")!.leaderUnsure).toBe(true);
  });
});

describe("D4 new capability", () => {
  it("uses the team percentage directly, and never reads the free text", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(gapOf(r, "d4")).toBe(75);
  });

  it("carries the heaviest weight alongside D3", () => {
    expect(DIMENSION_WEIGHTS.d4).toBe(0.25);
    expect(DIMENSION_WEIGHTS.d3).toBe(0.25);
  });
});

describe("D5 deliberate reallocation", () => {
  it("is the distance between the leader and the team mean", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(gapOf(r, "d5")).toBeCloseTo(87.5, 5);
  });

  it("treats both sides saying no as a shared problem rather than a wide gap", () => {
    const r = scoreImpactGap(
      { ...optimisticLeader, d5_reallocation: "no" },
      { ...disappointingTeam, d5_mean: 6 },
    );
    const d5 = r.dimensions.find((d) => d.id === "d5")!;
    expect(d5.sharedBlindSpot).toBe(true);
    expect(d5.gap).toBeLessThan(10);
  });
});

describe("the mechanism pair", () => {
  it("does not appear in the scored dimensions", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(r.dimensions.map((d) => d.id)).toEqual(["d1", "d2", "d3", "d4", "d5", "d6"]);
  });

  it("is revealed when the leader expects recognition and the team would keep quiet", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(r.mechanism.revealed).toBe(true);
    expect(r.mechanism.quietPct).toBeCloseTo(87.5, 5);
  });

  it("stays hidden when the team would actually speak up", () => {
    const r = scoreImpactGap(optimisticLeader, alignedTeam);
    expect(r.mechanism.revealed).toBe(false);
  });

  it("stays hidden when the leader already expects the team to stay quiet", () => {
    const r = scoreImpactGap({ ...optimisticLeader, d3_mechanism: "more_work" }, disappointingTeam);
    expect(r.mechanism.revealed).toBe(false);
  });
});

describe("the headline", () => {
  it("names the hours and counts everyone who found nothing genuinely new", () => {
    const r = scoreImpactGap(optimisticLeader, disappointingTeam);
    expect(r.headline).toContain("3.5 hours");
    expect(r.headline).toContain("6 of the 8 people");
  });
});

describe("the literacy pointer", () => {
  it("stays hidden when the tools are in use and returning time", () => {
    expect(scoreImpactGap(optimisticLeader, disappointingTeam).literacyLikely).toBe(false);
  });

  it("appears when barely anyone uses AI", () => {
    const r = scoreImpactGap(optimisticLeader, { ...disappointingTeam, d1_regular_pct: 30 });
    expect(r.literacyLikely).toBe(true);
  });

  it("appears when AI is in use and giving almost nothing back", () => {
    const r = scoreImpactGap(optimisticLeader, { ...disappointingTeam, d2_hours_mean: 0.4 });
    expect(r.literacyLikely).toBe(true);
  });
});

describe("formatHours", () => {
  it("says minutes below an hour and rounds to the nearest half above it", () => {
    expect(formatHours(0.5)).toBe("30 minutes");
    expect(formatHours(1)).toBe("1 hour");
    expect(formatHours(3.4)).toBe("3.5 hours");
    expect(formatHours(2.1)).toBe("2 hours");
  });
});
