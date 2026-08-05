import { describe, it, expect } from "vitest";
import { buildDraft } from "@/lib/impactGap/draftEmail";
import { renderLeaderReportReady, renderInternalAlert, INTERNAL_RECIPIENTS } from "@/lib/impactGap/emails";
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

describe("the leader email", () => {
  const mail = renderLeaderReportReady({ code: "ABCDEFGHJK", leaderName: "Sam Okafor", responseCount: 8 });

  it("links to the report with an absolute url", () => {
    expect(mail.html).toContain("/impact-gap/report/ABCDEFGHJK");
    expect(mail.html).toMatch(/https?:\/\/[^"]+\/impact-gap\/report\/ABCDEFGHJK/);
  });

  it("greets on the first name only", () => {
    expect(mail.html).toContain("Hi Sam,");
    expect(mail.html).not.toContain("Okafor");
  });

  it("promises the personal follow-up and denies any sequence", () => {
    expect(mail.html).toContain("Ferry or Jonathan");
    expect(mail.html).toContain("working days");
    expect(mail.html).toContain("only automatic email");
  });

  it("greets without a name rather than saying null", () => {
    const m = renderLeaderReportReady({ code: "ABCDEFGHJK", leaderName: null, responseCount: 5 });
    expect(m.html).toContain("Hi,");
    expect(m.html).not.toContain("null");
  });
});

describe("the internal alert", () => {
  const mail = renderInternalAlert({
    code: "ABCDEFGHJK",
    organisation: "Northwind",
    leaderName: "Sam Okafor",
    leaderEmail: "sam@northwind.test",
    leaderRole: "Head of Ops",
    result,
  });

  it("goes to both of us", () => {
    expect(INTERNAL_RECIPIENTS).toEqual([
      "ferry@brandhumanizing.com",
      "jonathan@brandhumanizing.com",
    ]);
  });

  it("puts the organisation, score and band in the subject", () => {
    expect(mail.subject).toBe("Impact Gap: Northwind scored 65, wide gap");
  });

  it("carries the biggest gap and a link to the admin record", () => {
    expect(mail.html).toContain("Biggest gap");
    expect(mail.html).toContain("Where the time went");
    expect(mail.html).toContain("/impact-gap/admin/ABCDEFGHJK");
  });

  it("says so when there is no address to reply to", () => {
    const m = renderInternalAlert({
      code: "ABCDEFGHJK", organisation: null, leaderName: null,
      leaderEmail: null, leaderRole: null, result,
    });
    expect(m.html).toContain("no personal email possible");
    expect(m.subject).toContain("Unknown organisation");
  });

  it("escapes free text so a stray angle bracket cannot break the markup", () => {
    const m = renderInternalAlert({
      code: "ABCDEFGHJK", organisation: '<script>alert("x")</script>', leaderName: null,
      leaderEmail: null, leaderRole: null, result,
    });
    expect(m.html).not.toContain("<script>");
    expect(m.html).toContain("&lt;script&gt;");
  });
});
