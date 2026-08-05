import { describe, it, expect } from "vitest";
import { buildDraft } from "@/lib/impactGap/draftEmail";
import { leaderPayload, internalPayload, LEADER_TEMPLATE, INTERNAL_TEMPLATE } from "@/lib/impactGap/emails";
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

describe("the draft personal email", () => {
  const draft = buildDraft({
    leaderName: "Sam Okafor",
    organisation: "Northwind",
    result,
    teamCounts: team.d4_counts,
  });

  it("greets by first name only", () => {
    expect(draft.body).toContain("Hi Sam,");
    expect(draft.body).not.toContain("Okafor");
  });

  it("carries the score, the band and the biggest gap", () => {
    expect(draft.body).toContain("65");
    expect(draft.body).toContain("wide gap");
    expect(draft.body).toContain("where the time went");
  });

  it("leads with how many people had nothing to point to", () => {
    expect(draft.body).toContain("4 of the 8 people");
    expect(draft.body).toContain("nothing they can point to");
  });

  it("includes the mechanism when the pair revealed it", () => {
    expect(draft.body).toContain("keep it to themselves");
  });

  it("cannot be sent without a human editing it", () => {
    // The placeholders are the safeguard. If these ever disappear, the draft
    // could quietly become the product, and the promise is a personal email.
    expect(draft.body).toContain("[Two or three sentences of your own reading here.");
    expect(draft.body).toContain("[One specific suggestion");
    expect(draft.body).toContain("[Ferry or Jonathan]");
  });

  it("changes shape when nobody found anything genuinely new", () => {
    const d = buildDraft({
      leaderName: null,
      organisation: null,
      result,
      teamCounts: { faster: 5, higher_standard: 3 },
    });
    expect(d.body).toContain("Nobody on your team said anything genuinely new");
    expect(d.body).toContain("Hi [first name],");
  });
});

describe("the leader email payload", () => {
  const p = leaderPayload({ code: "ABCDEFGHJK", leaderName: "Sam Okafor", responseCount: 8 });

  it("names a template the edge function actually has registered", () => {
    // These two strings are a contract with registry.ts in the Supabase
    // function. An unregistered name is rejected outright, so a typo here means
    // silence rather than a bad email.
    expect(LEADER_TEMPLATE).toBe("impact-gap-report-ready");
    expect(INTERNAL_TEMPLATE).toBe("impact-gap-internal");
  });

  it("carries a full report link and the response count", () => {
    expect(p.reportUrl).toContain("/impact-gap/report/ABCDEFGHJK");
    expect(p.reportUrl.startsWith("http")).toBe(true);
    expect(p.responseCount).toBe(8);
  });

  it("sends an empty string rather than null when there is no name", () => {
    // The template greets on the first word of this, and null would render as
    // the word "null" in someone's inbox.
    expect(leaderPayload({ code: "ABCDEFGHJK", leaderName: null, responseCount: 5 }).leaderName).toBe("");
  });
});

describe("the internal alert payload", () => {
  const p = internalPayload({
    code: "ABCDEFGHJK",
    organisation: "Northwind",
    leaderName: "Sam Okafor",
    leaderEmail: "sam@northwind.test",
    leaderRole: "Head of Ops",
    result,
  });

  it("carries everything needed to triage without opening anything", () => {
    expect(p.organisation).toBe("Northwind");
    expect(p.score).toBe(65);
    expect(p.band).toBe("Wide gap");
    expect(p.responseCount).toBe(8);
    expect(p.adminUrl).toContain("/impact-gap/admin/ABCDEFGHJK");
  });

  it("names the widest gap, rounded", () => {
    expect(p.biggestGapName).toBe("Where the time went");
    expect(p.biggestGapValue).toBe(100);
    expect(Number.isInteger(p.biggestGapValue)).toBe(true);
  });

  it("flags the mechanism and the literacy pointer as booleans", () => {
    expect(p.mechanismFired).toBe(true);
    expect(p.literacyLikely).toBe(false);
  });

  it("degrades to empty strings when contact details were never given", () => {
    const q = internalPayload({
      code: "ABCDEFGHJK",
      organisation: null,
      leaderName: null,
      leaderEmail: null,
      leaderRole: null,
      result,
    });
    expect(q.organisation).toBe("");
    expect(q.leaderEmail).toBe("");
  });
});
