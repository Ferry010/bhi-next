import { describe, it, expect } from "vitest";
import { scoreTrustGap, bandFor, aggregateTeamAnswers } from "@/lib/trustGap/scoring";
import { DIMENSION_WEIGHTS } from "@/lib/trustGap/questions";
import { generateCode, isValidCodeShape } from "@/lib/trustGap/code";
import type { LeaderAnswers, TeamAnswers } from "@/lib/trustGap/questions";

const leader = (over: Partial<LeaderAnswers> = {}): LeaderAnswers => ({
  d1_usage_estimate: 50,
  d2_concealment: "half",
  d3_reasons: ["job_security"],
  d4_clarity: 3,
  d5_timesaving: "more_work",
  d6_comfort: 3,
  ...over,
});

const member = (over: Partial<TeamAnswers> = {}): TeamAnswers => ({
  d1_frequency: "weekly",
  d2_concealed: "no",
  d3_reasons: [],
  d4_clarity: 3,
  d5_timesaving: "tell_manager",
  d6_comfort: 3,
  ...over,
});

const team = (n: number, over: Partial<TeamAnswers> = {}) =>
  aggregateTeamAnswers(Array.from({ length: n }, () => member(over)));

describe("weights", () => {
  it("sum to 1", () => {
    const total = Object.values(DIMENSION_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(1, 5);
  });
});

describe("bands", () => {
  it("maps scores to the bands in the brief", () => {
    expect(bandFor(0).label).toBe("Closely aligned");
    expect(bandFor(15).label).toBe("Closely aligned");
    expect(bandFor(16).label).toBe("Minor gap");
    expect(bandFor(30).label).toBe("Minor gap");
    expect(bandFor(31).label).toBe("Significant gap");
    expect(bandFor(50).label).toBe("Significant gap");
    expect(bandFor(51).label).toBe("Wide gap");
    expect(bandFor(100).label).toBe("Wide gap");
  });
});

describe("a perfectly aligned team", () => {
  it("scores at or near zero", () => {
    const t = team(5, { d1_frequency: "never", d2_concealed: "no" });
    const r = scoreTrustGap(
      leader({ d1_usage_estimate: 0, d2_concealment: "none", d4_clarity: 3, d6_comfort: 3 }),
      t,
    );
    expect(r.score).toBeLessThanOrEqual(15);
    expect(r.band.id).toBe("aligned");
  });
});

describe("D1 usage", () => {
  it("gap is the absolute difference in percentage points", () => {
    const t = team(4, { d1_frequency: "daily" }); // 100% regular
    const r = scoreTrustGap(leader({ d1_usage_estimate: 30 }), t);
    expect(r.dimensions.find((d) => d.id === "d1")!.gap).toBe(70);
  });

  it("counts daily and weekly as regular, not occasionally", () => {
    const t = aggregateTeamAnswers([
      member({ d1_frequency: "daily" }),
      member({ d1_frequency: "weekly" }),
      member({ d1_frequency: "occasionally" }),
      member({ d1_frequency: "never" }),
    ]);
    expect(t.d1_regular_pct).toBe(50);
  });
});

describe("D2 concealment", () => {
  it("maps leader buckets to midpoints", () => {
    const t = team(5, { d2_concealed: "yes" }); // 100%
    const r = scoreTrustGap(leader({ d2_concealment: "few" }), t); // midpoint 20
    expect(r.dimensions.find((d) => d.id === "d2")!.gap).toBe(80);
  });

  it("scores 'I don't know' as the maximum gap and flags it", () => {
    const t = team(5, { d2_concealed: "no" });
    const d2 = scoreTrustGap(leader({ d2_concealment: "unknown" }), t).dimensions.find(
      (d) => d.id === "d2",
    )!;
    expect(d2.gap).toBe(100);
    expect(d2.leaderUnsure).toBe(true);
  });
});

describe("D3 the reason", () => {
  it("is a mismatch when the team's top reason is not one the leader picked", () => {
    const t = aggregateTeamAnswers(
      Array.from({ length: 5 }, () => member({ d2_concealed: "yes", d3_reasons: ["cheating"] })),
    );
    const r = scoreTrustGap(leader({ d3_reasons: ["job_security"] }), t);
    const d3 = r.dimensions.find((d) => d.id === "d3")!;
    expect(d3.gap).toBe(100);
    expect(d3.note).toMatch(/wrong fear/);
  });

  it("is a match when the leader picked the team's top reason", () => {
    const t = aggregateTeamAnswers(
      Array.from({ length: 5 }, () => member({ d2_concealed: "yes", d3_reasons: ["cheating"] })),
    );
    const r = scoreTrustGap(leader({ d3_reasons: ["job_security", "cheating"] }), t);
    expect(r.dimensions.find((d) => d.id === "d3")!.gap).toBe(0);
  });

  it("does not penalise when nobody concealed anything", () => {
    const t = team(5, { d2_concealed: "no" });
    expect(scoreTrustGap(leader(), t).dimensions.find((d) => d.id === "d3")!.gap).toBe(0);
  });
});

describe("D4 and D6 scales", () => {
  it("normalise a 1 to 5 difference onto 0 to 100", () => {
    const t = team(5, { d4_clarity: 1, d6_comfort: 1 });
    const r = scoreTrustGap(leader({ d4_clarity: 5, d6_comfort: 5 }), t);
    expect(r.dimensions.find((d) => d.id === "d4")!.gap).toBe(100);
    expect(r.dimensions.find((d) => d.id === "d6")!.gap).toBe(100);
  });
});

describe("D5 the time-saving question", () => {
  it("is the maximum gap when the leader expects recognition and the team would stay quiet", () => {
    const t = team(5, { d5_timesaving: "quiet_same_pace" });
    const r = scoreTrustGap(leader({ d5_timesaving: "recognition" }), t);
    expect(r.dimensions.find((d) => d.id === "d5")!.gap).toBe(100);
  });

  it("is zero when the leader expects recognition and the team would tell them", () => {
    const t = team(5, { d5_timesaving: "tell_manager" });
    const r = scoreTrustGap(leader({ d5_timesaving: "recognition" }), t);
    expect(r.dimensions.find((d) => d.id === "d5")!.gap).toBe(0);
  });

  it("produces the business case line when the team would stay quiet", () => {
    const t = team(5, { d5_timesaving: "quiet_other_work" });
    const r = scoreTrustGap(leader({ d5_timesaving: "recognition" }), t);
    expect(r.dimensions.find((d) => d.id === "d5")!.note).toMatch(/paying for and not seeing/);
  });
});

describe("headline finding", () => {
  it("is the dimension with the widest gap", () => {
    const t = team(5, { d1_frequency: "daily" }); // D1 gap 100
    const r = scoreTrustGap(leader({ d1_usage_estimate: 0 }), t);
    expect(r.headline.id).toBe("d1");
  });
});

describe("clarity flag", () => {
  it("is set only when the team's absolute clarity is poor", () => {
    expect(scoreTrustGap(leader(), team(5, { d4_clarity: 2 })).clarityIsPoor).toBe(true);
    expect(scoreTrustGap(leader(), team(5, { d4_clarity: 4 })).clarityIsPoor).toBe(false);
  });
});

describe("score bounds", () => {
  it("never leaves 0 to 100 even at the extremes", () => {
    const worst = scoreTrustGap(
      leader({
        d1_usage_estimate: 0,
        d2_concealment: "unknown",
        d3_reasons: ["would_not_hide"],
        d4_clarity: 5,
        d5_timesaving: "recognition",
        d6_comfort: 5,
      }),
      aggregateTeamAnswers(
        Array.from({ length: 5 }, () =>
          member({
            d1_frequency: "daily",
            d2_concealed: "yes",
            d3_reasons: ["cheating"],
            d4_clarity: 1,
            d5_timesaving: "quiet_same_pace",
            d6_comfort: 1,
          }),
        ),
      ),
    );
    expect(worst.score).toBeGreaterThan(90);
    expect(worst.score).toBeLessThanOrEqual(100);
    expect(worst.band.id).toBe("wide");
  });
});

describe("codes", () => {
  it("generates valid, non-sequential codes", () => {
    const a = generateCode();
    const b = generateCode();
    expect(isValidCodeShape(a)).toBe(true);
    expect(a).not.toBe(b);
    expect(a).toHaveLength(10);
  });

  it("rejects malformed codes and ambiguous characters", () => {
    expect(isValidCodeShape("short")).toBe(false);
    expect(isValidCodeShape("0OIL111111")).toBe(false);
  });
});
