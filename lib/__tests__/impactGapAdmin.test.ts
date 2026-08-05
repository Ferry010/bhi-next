import { describe, it, expect } from "vitest";
import { csvCell, csvDocument } from "@/lib/impactGap/csv";
import { aggregateTeamAnswers } from "@/lib/impactGap/scoring";
import { STATUSES } from "@/lib/impactGap/adminTypes";
import type { TeamAnswers } from "@/lib/impactGap/questions";

const answer = (over: Partial<TeamAnswers> = {}): TeamAnswers => ({
  d1_frequency: "daily",
  d2_time_saved: "1to3",
  d3_time_use: "more_same",
  d3_mechanism: "quiet_same_pace",
  d4_capability: "nothing",
  d5_told: "no",
  d6_human_work: "same",
  ...over,
});

describe("CSV export", () => {
  it("quotes every field and doubles inner quotes", () => {
    expect(csvCell("Cedar & Co")).toBe('"Cedar & Co"');
    expect(csvCell('He said "hello"')).toBe('"He said ""hello"""');
  });

  it("keeps commas and newlines inside one cell", () => {
    expect(csvCell("Acme, Ltd")).toBe('"Acme, Ltd"');
    expect(csvCell("line one\nline two")).toBe('"line one\nline two"');
  });

  it("defuses anything a spreadsheet would run as a formula", () => {
    // Organisation names are typed by strangers and this file gets opened in
    // Excel. Without the leading apostrophe these execute on open.
    expect(csvCell("=1+1")).toBe("\"'=1+1\"");
    expect(csvCell("+44 20 7946")).toBe("\"'+44 20 7946\"");
    expect(csvCell("-2")).toBe("\"'-2\"");
    expect(csvCell("@SUM(A1)")).toBe("\"'@SUM(A1)\"");
  });

  it("writes empty cells for missing values rather than the word null", () => {
    expect(csvCell(null)).toBe('""');
    expect(csvCell(undefined)).toBe('""');
    expect(csvCell(0)).toBe('"0"');
  });

  it("uses carriage returns between rows", () => {
    const doc = csvDocument(["A", "B"], [[1, 2]]);
    expect(doc).toBe('"A","B"\r\n"1","2"');
  });
});

describe("statuses", () => {
  it("covers every status the brief asks for", () => {
    expect(STATUSES.map((s) => s.label)).toEqual([
      "Awaiting responses",
      "Report ready",
      "Personal email sent",
      "In conversation",
      "Closed",
    ]);
  });
});

describe("aggregateTeamAnswers", () => {
  it("counts regular use as daily or a few times a week", () => {
    const agg = aggregateTeamAnswers([
      answer({ d1_frequency: "daily" }),
      answer({ d1_frequency: "weekly" }),
      answer({ d1_frequency: "occasionally" }),
      answer({ d1_frequency: "never" }),
    ]);
    expect(agg.d1_regular_pct).toBe(50);
  });

  it("averages the time buckets by their midpoints", () => {
    const agg = aggregateTeamAnswers([
      answer({ d2_time_saved: "none" }), // 0
      answer({ d2_time_saved: "under1" }), // 0.5
      answer({ d2_time_saved: "1to3" }), // 2
      answer({ d2_time_saved: "3to5" }), // 4
      answer({ d2_time_saved: "over5" }), // 6
    ]);
    expect(agg.d2_hours_mean).toBeCloseTo(2.5, 5);
  });

  it("counts everything except 'genuinely new' as no new capability", () => {
    // Faster and higher standard are both worth having. Neither is a thing the
    // team could not do before, so both count towards the gap.
    const agg = aggregateTeamAnswers([
      answer({ d4_capability: "nothing" }),
      answer({ d4_capability: "faster" }),
      answer({ d4_capability: "higher_standard" }),
      answer({ d4_capability: "new" }),
    ]);
    expect(agg.d4_counts).toEqual({ nothing: 1, faster: 1, higher_standard: 1, new: 1 });
    expect(agg.d4_no_new_pct).toBe(75);
  });

  it("reports no gap at all when everyone found something genuinely new", () => {
    const agg = aggregateTeamAnswers([answer({ d4_capability: "new" }), answer({ d4_capability: "new" })]);
    expect(agg.d4_no_new_pct).toBe(0);
  });

  it("puts D5 and D6 on the same 0 to 100 scale as the leader", () => {
    const agg = aggregateTeamAnswers([
      answer({ d5_told: "yes", d6_human_work: "more" }),
      answer({ d5_told: "no", d6_human_work: "less" }),
    ]);
    expect(agg.d5_mean).toBe(50);
    expect(agg.d6_mean).toBe(50);
  });

  it("tallies the D3 answers and the mechanism separately", () => {
    const agg = aggregateTeamAnswers([
      answer({ d3_time_use: "fill_time", d3_mechanism: "quiet_same_pace" }),
      answer({ d3_time_use: "fill_time", d3_mechanism: "tell_manager" }),
      answer({ d3_time_use: "new_work", d3_mechanism: "quiet_other_work" }),
    ]);
    expect(agg.d3_time_use_counts).toEqual({ fill_time: 2, new_work: 1 });
    expect(agg.d3_mechanism_counts).toEqual({
      quiet_same_pace: 1,
      tell_manager: 1,
      quiet_other_work: 1,
    });
  });

  it("returns zeroes rather than dividing by zero on an empty team", () => {
    const agg = aggregateTeamAnswers([]);
    expect(agg.count).toBe(0);
    expect(agg.d1_regular_pct).toBe(0);
    expect(agg.d2_hours_mean).toBe(0);
    expect(agg.d4_no_new_pct).toBe(0);
  });
});
