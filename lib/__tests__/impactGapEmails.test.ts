import { describe, it, expect } from "vitest";
import { buildDraft, pickVerbatim } from "@/lib/impactGap/draftEmail";
import { renderLeaderReportReady, renderInternalAlert } from "@/lib/impactGap/emails";
import { scoreImpactGap, type TeamAggregate, type Verbatim } from "@/lib/impactGap/scoring";
import type { LeaderAnswers } from "@/lib/impactGap/questions";

const leader: LeaderAnswers = {
  d1_adoption_estimate: 80,
  d2_time_freed: "3to5",
  d3_time_went: "new_work",
  d3_mechanism: "recognition",
  d4_capability_text: "We run our own customer research now",
  d4_cannot_name: false,
  d4_genuinely_new: "new",
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
  d4_cannot_name_count: 4,
  d4_faster_count: 2,
  d4_new_count: 2,
  d5_mean: 12.5,
  d6_mean: 37.5,
};

const result = scoreImpactGap(leader, team);

const verbatims: Verbatim[] = [
  { text: "I analyse the whole support inbox now instead of a sample.", cannot_name: false, genuinely_new: "new" },
  { text: null, cannot_name: true, genuinely_new: null },
  { text: "I get through the same list quicker.", cannot_name: false, genuinely_new: "faster" },
];

describe("pickVerbatim", () => {
  it("prefers an honest 'same work, faster' answer over a new capability", () => {
    expect(pickVerbatim(verbatims)?.genuinely_new).toBe("faster");
  });

  it("falls back to a genuinely new one when nobody said faster", () => {
    const only = verbatims.filter((v) => v.genuinely_new !== "faster");
    expect(pickVerbatim(only)?.genuinely_new).toBe("new");
  });

  it("returns null when every answer was blank", () => {
    expect(pickVerbatim([{ text: null, cannot_name: true, genuinely_new: null }])).toBeNull();
  });

  it("never picks a blank, even one with leftover whitespace text", () => {
    const picked = pickVerbatim([{ text: "   ", cannot_name: false, genuinely_new: "new" }]);
    expect(picked).toBeNull();
  });
});

describe("the draft personal email", () => {
  const draft = buildDraft({
    leaderName: "Sam Okafor",
    organisation: "Northwind",
    result,
    verbatims,
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

  it("quotes one of the team's own answers", () => {
    expect(draft.body).toContain("I get through the same list quicker.");
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

  it("describes the blanks in words when nobody wrote anything", () => {
    const d = buildDraft({
      leaderName: null,
      organisation: null,
      result,
      verbatims: [
        { text: null, cannot_name: true, genuinely_new: null },
        { text: null, cannot_name: true, genuinely_new: null },
      ],
    });
    expect(d.body).toContain("what was not written");
    expect(d.body).toContain("Hi [first name],");
  });
});

describe("the leader email", () => {
  const mail = renderLeaderReportReady({ code: "ABCDEFGHJK", leaderName: "Sam", responseCount: 8 });

  it("links to the report", () => {
    expect(mail.html).toContain("/impact-gap/report/ABCDEFGHJK");
  });

  it("promises the personal follow-up", () => {
    expect(mail.html).toContain("Ferry or Jonathan");
    expect(mail.html).toContain("working days");
  });

  it("says plainly that no sequence follows", () => {
    expect(mail.html).toContain("only automatic email");
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

  it("puts the organisation, score and band in the subject", () => {
    expect(mail.subject).toBe("Impact Gap: Northwind scored 65, wide gap");
  });

  it("carries the biggest gap and a link to the admin record", () => {
    expect(mail.html).toContain("Biggest gap");
    expect(mail.html).toContain("/impact-gap/admin/ABCDEFGHJK");
  });

  it("says so when there is no address to reply to", () => {
    const m = renderInternalAlert({
      code: "ABCDEFGHJK",
      organisation: null,
      leaderName: null,
      leaderEmail: null,
      leaderRole: null,
      result,
    });
    expect(m.html).toContain("no personal email possible");
    expect(m.subject).toContain("Unknown organisation");
  });

  it("escapes free text so a stray angle bracket cannot break the markup", () => {
    const m = renderInternalAlert({
      code: "ABCDEFGHJK",
      organisation: '<script>alert("x")</script>',
      leaderName: null,
      leaderEmail: null,
      leaderRole: null,
      result,
    });
    expect(m.html).not.toContain("<script>");
    expect(m.html).toContain("&lt;script&gt;");
  });
});
