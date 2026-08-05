import { describe, it, expect } from "vitest";
import {
  isQuestionAnswered,
  missingMessage,
  type AnswerableQuestion,
} from "@/lib/impactGap/validation";

const slider: AnswerableQuestion = { id: "d1", kind: "slider" };
const single: AnswerableQuestion = { id: "d2", kind: "single" };
const withSub: AnswerableQuestion = { id: "d3", kind: "single", sub: { id: "mechanism" } };
const d4: AnswerableQuestion = { id: "d4", kind: "single" };

describe("the slider", () => {
  // This is the regression. The slider used to start at 50 and pass validation
  // untouched, so a leader could submit an estimate they never made, and the
  // gap on D1 would be measured against a number the tool invented.
  it("is not answered until it has been touched", () => {
    expect(isQuestionAnswered(slider, {})).toBe(false);
  });

  it("is answered once a value is set, including the extremes", () => {
    expect(isQuestionAnswered(slider, { d1: 50 })).toBe(true);
    expect(isQuestionAnswered(slider, { d1: 0 })).toBe(true);
    expect(isQuestionAnswered(slider, { d1: 100 })).toBe(true);
  });

  it("treats zero as a real answer rather than an empty one", () => {
    // "Nobody on my team uses AI" is a genuine and interesting answer.
    expect(isQuestionAnswered(slider, { d1: 0 })).toBe(true);
  });

  it("says what to do when it is untouched", () => {
    expect(missingMessage(slider, {})).toBe("Move the slider to your best estimate.");
  });
});

describe("single choice questions", () => {
  it("needs a value", () => {
    expect(isQuestionAnswered(single, {})).toBe(false);
    expect(isQuestionAnswered(single, { d2: "" })).toBe(false);
    expect(isQuestionAnswered(single, { d2: "1to3" })).toBe(true);
  });
});

describe("a question with a nested one inside it", () => {
  it("needs both parts", () => {
    expect(isQuestionAnswered(withSub, { d3: "new_work" })).toBe(false);
    expect(isQuestionAnswered(withSub, { mechanism: "recognition" })).toBe(false);
    expect(isQuestionAnswered(withSub, { d3: "new_work", mechanism: "recognition" })).toBe(true);
  });

  it("names the second part when only the first is done", () => {
    expect(missingMessage(withSub, { d3: "new_work" })).toBe(
      "Answer both parts of this question to continue.",
    );
  });
});

describe("Q4, now a multiple choice", () => {
  it("needs an answer like any other choice", () => {
    expect(isQuestionAnswered(d4, {})).toBe(false);
    expect(isQuestionAnswered(d4, { d4: "nothing" })).toBe(true);
  });

  it("treats 'nothing I can point to' as a real answer", () => {
    // It is the most common answer and the most useful one. It must never be
    // read as an unanswered question.
    expect(isQuestionAnswered(d4, { d4: "nothing" })).toBe(true);
  });
});

describe("a whole leader survey", () => {
  const questions: AnswerableQuestion[] = [
    slider,
    single,
    withSub,
    d4,
    { id: "d5", kind: "single" },
    { id: "d6", kind: "single" },
  ];

  it("blocks an entirely empty submission on all six", () => {
    const missing = questions.filter((q) => !isQuestionAnswered(q, {}));
    expect(missing).toHaveLength(6);
  });

  it("passes only when every question has been answered by a person", () => {
    const answers = {
      d1: 70,
      d2: "3to5",
      d3: "new_work",
      mechanism: "recognition",
      d4: "new",
      d5: "explicit",
      d6: "more",
    };
    expect(questions.filter((q) => !isQuestionAnswered(q, answers))).toHaveLength(0);
  });
});
