// When is a question actually answered?
//
// Pulled out of the form component because it is a rule about the data rather
// than about the rendering, and because getting it wrong is expensive in a way
// that is invisible: a question that silently counts itself as answered
// collects a number nobody chose, and the whole tool is built on the claim that
// these answers mean something.
//
// The slider is the case that caused this. It used to start at 50 and pass
// validation untouched, so a leader could submit "half my team, probably"
// without ever forming the estimate.

export type AnswerKind = "slider" | "single";

export interface AnswerableQuestion {
  id: string;
  kind: AnswerKind;
  /** A second question asked inside this one, which must also be answered. */
  sub?: { id: string };
}

export type Answers = Record<string, unknown>;

export function isFilled(answers: Answers, id: string): boolean {
  const v = answers[id];
  return v !== undefined && v !== null && v !== "";
}

export function isQuestionAnswered(q: AnswerableQuestion, answers: Answers): boolean {
  if (q.sub && !isFilled(answers, q.sub.id)) return false;
  return isFilled(answers, q.id);
}

export function missingMessage(q: AnswerableQuestion, answers: Answers): string {
  if (q.kind === "slider" && !isFilled(answers, q.id))
    return "Move the slider to your best estimate.";
  if (q.sub && !isFilled(answers, q.sub.id) && isFilled(answers, q.id))
    return "Answer both parts of this question to continue.";
  return "Choose an answer to continue.";
}
