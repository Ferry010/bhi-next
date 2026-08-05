import { describe, it, expect } from "vitest";
import { buildSlackMessage, reportUrlFor, adminUrlFor } from "@/lib/impactGap/slack";
import { scoreImpactGap, type TeamAggregate } from "@/lib/impactGap/scoring";
import type { LeaderAnswers } from "@/lib/impactGap/questions";

const leader: LeaderAnswers = {
  d1_adoption_estimate: 80,
  d2_time_freed: "3to5",
  d3_time_went: "new_work",
  d3_mechanism: "recognition",
  d4_capability: "new",
  d5_reallocation: "explicit",
  d6_human_work: "more",
};

const team: TeamAggregate = {
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

const result = scoreImpactGap(leader, team);

const full = buildSlackMessage({
  code: "ABCDEFGHJK",
  organisation: "Northwind",
  leaderName: "Sam Okafor",
  leaderEmail: "sam@northwind.test",
  leaderRole: "Head of Ops",
  result,
});

const flat = (m: { blocks: unknown[] }) => JSON.stringify(m.blocks);

describe("links", () => {
  it("are absolute, because Slack cannot resolve a relative path", () => {
    expect(reportUrlFor("ABCDEFGHJK")).toMatch(/^https?:\/\/.+\/impact-gap\/report\/ABCDEFGHJK$/);
    expect(adminUrlFor("ABCDEFGHJK")).toMatch(/^https?:\/\/.+\/impact-gap\/admin\/ABCDEFGHJK$/);
  });
});

describe("the Slack message", () => {
  it("says the essentials in the fallback text, for the notification preview", () => {
    expect(full.text).toBe("Impact Gap: Northwind scored 65, wide gap");
  });

  it("carries everything needed to triage without opening anything", () => {
    const b = flat(full);
    expect(b).toContain("Northwind");
    expect(b).toContain("Sam Okafor, Head of Ops");
    expect(b).toContain("sam@northwind.test");
    expect(b).toContain("65 (Wide gap)");
    expect(b).toContain("Where the time went, 100/100");
    expect(b).toContain("*Responses*\\n8");
  });

  it("offers both the admin record and the leader's own report", () => {
    const b = flat(full);
    expect(b).toContain("/impact-gap/admin/ABCDEFGHJK");
    expect(b).toContain("/impact-gap/report/ABCDEFGHJK");
  });

  it("flags the mechanism when the pair revealed it", () => {
    expect(flat(full)).toContain("Mechanism fired");
  });

  it("warns loudly when there is no address to write to", () => {
    // Without an email there is no way to keep the promise on the landing page,
    // so this has to be impossible to miss in the message.
    const m = buildSlackMessage({
      code: "ABCDEFGHJK",
      organisation: null,
      leaderName: null,
      leaderEmail: null,
      leaderRole: null,
      result,
    });
    expect(flat(m)).toContain("no way to write to them");
    expect(m.text).toContain("Unknown organisation");
  });

  it("does not invent a leader when nothing was given", () => {
    const m = buildSlackMessage({
      code: "ABCDEFGHJK",
      organisation: null,
      leaderName: null,
      leaderEmail: null,
      leaderRole: null,
      result,
    });
    expect(flat(m)).toContain("Not given");
    expect(flat(m)).not.toContain("null");
  });

  it("mentions the literacy pointer only when it applies", () => {
    expect(flat(full)).not.toContain("AI literacy");
    const lowUse = scoreImpactGap(leader, { ...team, d1_regular_pct: 30 });
    const m = buildSlackMessage({
      code: "ABCDEFGHJK",
      organisation: "Northwind",
      leaderName: "Sam",
      leaderEmail: "sam@northwind.test",
      leaderRole: "Ops",
      result: lowUse,
    });
    expect(flat(m)).toContain("AI literacy");
  });
});
