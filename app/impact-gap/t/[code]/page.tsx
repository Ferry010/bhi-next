"use client";

import { useEffect, useState } from "react";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import SurveyForm, {
  emptyCapability,
  type CapabilityValue,
  type Question,
} from "@/components/impact-gap/SurveyForm";
import { TEAM_QUESTIONS, MIN_TEAM_RESPONSES, type TeamAnswers } from "@/lib/impactGap/questions";
import { isValidCodeShape } from "@/lib/impactGap/code";
import { getStatus, submitTeamResponse, hasAnswered } from "@/lib/impactGap/store";

const questions: Question[] = TEAM_QUESTIONS.map((q) => ({
  id: q.id,
  kind: q.kind,
  question: q.question,
  help: "help" in q ? q.help : undefined,
  options: "options" in q ? q.options : undefined,
  sub: "sub" in q ? q.sub : undefined,
  cannotLabel: "cannotLabel" in q ? q.cannotLabel : undefined,
  followUpQuestion: "followUpQuestion" in q ? q.followUpQuestion : undefined,
  followUpOptions: "followUpOptions" in q ? q.followUpOptions : undefined,
}));

type State = "loading" | "ready" | "missing" | "already" | "done";

export default function TeamSurveyPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidCodeShape(code)) {
      setState("missing");
      return;
    }
    if (hasAnswered(code)) {
      setState("already");
      return;
    }
    getStatus(code).then((r) => setState(r.ok && r.exists ? "ready" : "missing"));
  }, [code]);

  const handleSubmit = async (a: Record<string, unknown>) => {
    setBusy(true);
    setError(null);

    const capability = (a.d4 as CapabilityValue | undefined) ?? emptyCapability;

    const answers: TeamAnswers = {
      d1_frequency: String(a.d1),
      d2_time_saved: String(a.d2),
      d3_time_use: String(a.d3),
      d3_mechanism: String(a.mechanism),
      d4_capability_text: capability.cannotName ? null : capability.text.trim(),
      d4_cannot_name: capability.cannotName,
      d4_genuinely_new: capability.cannotName ? null : capability.genuinelyNew,
      d5_told: String(a.d5),
      d6_human_work: String(a.d6),
    };

    const res = await submitTeamResponse(code, answers);
    setBusy(false);

    if (!res.ok) {
      setError(
        res.error === "not_found"
          ? "This link does not seem to work any more. Worth checking with whoever sent it to you."
          : res.error === "not_provisioned"
            ? "This is not switched on yet. Nothing you typed has been sent anywhere. Please try again shortly."
            : "Something went wrong sending your answers. Your answers are still on this page, so please try again.",
      );
      return;
    }

    setState("done");
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <ToolHeader />
      <main className="bg-secondary pt-24 pb-20 md:pt-36">
        <div className="container max-w-2xl">{children}</div>
      </main>
      <ToolFooter />
    </>
  );

  if (state === "loading")
    return (
      <Shell>
        <p role="status" className="text-body-lg text-muted-foreground">
          Loading the questions…
        </p>
      </Shell>
    );

  if (state === "missing")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">This link does not work</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          It may have been cut short somewhere between being sent and being opened, which happens
          often enough in chat apps. Ask whoever sent it to send the whole thing again. There is
          nothing you need to do here in the meantime.
        </p>
      </Shell>
    );

  if (state === "already")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">You have already answered this one</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Your answers are in, and they are anonymous. Answering twice would quietly weight the
          result towards one person, so this browser only lets you through once. If you genuinely
          have not answered yet, it will be because you are on a different device or the same one
          has had its history cleared. Ask whoever sent the link and they can tell you how many
          replies have come in.
        </p>
      </Shell>
    );

  if (state === "done")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">That is it. Thank you.</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Your answers have gone in anonymously. Nobody, including the person who sent you this and
          including us, can see what you wrote on its own. It is added to everyone else&apos;s and
          only the summary is ever shown, and only once at least {MIN_TEAM_RESPONSES} people have
          replied.
        </p>
        <p className="mt-4 text-body-lg text-muted-foreground">
          One last thing worth knowing: the answer people most often worry about giving, that
          nothing much has changed, is the single most useful answer in the whole exercise. You can
          close this now.
        </p>
      </Shell>
    );

  return (
    <>
      <ToolHeader />
      <main>
        <section className="bg-secondary pt-24 pb-8 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">Six questions, anonymously</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Your manager is trying to find out what AI has actually changed about the work here,
              rather than how much of it gets used. These are the same six questions they answered
              themselves. The difference between the two sets of answers is the entire point.
            </p>

            {/* The promise, stated before anybody answers anything rather than after. */}
            <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-white p-6">
              <h2 className="font-heading font-bold text-foreground">Before you start</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                <li>
                  Your answers are anonymous. No name, no email, no login, and nothing that ties a
                  reply back to you.
                </li>
                <li>
                  Nothing is shown to anyone until at least {MIN_TEAM_RESPONSES} people have
                  replied, because below that number single answers become easy to guess at.
                </li>
                <li>
                  Your manager only ever sees a summary. The one thing shown in your own words is
                  the answer to question 4, which appears without any name next to it, mixed in with
                  everyone else&apos;s.
                </li>
                <li>
                  It takes about a minute, and it works fine on a phone. There is no way to save
                  half of it, so it is worth doing in one go.
                </li>
              </ul>
            </div>

            <p className="mt-6 text-body-lg font-semibold text-foreground">
              Answer honestly rather than kindly. A generous answer here helps nobody, least of all
              you.
            </p>
          </div>
        </section>

        <section className="bg-secondary pb-20">
          <div className="container max-w-2xl">
            <SurveyForm
              questions={questions}
              submitLabel="Send my answers"
              onSubmit={handleSubmit}
              busy={busy}
              error={error}
            />
          </div>
        </section>
      </main>
      <ToolFooter />
    </>
  );
}
