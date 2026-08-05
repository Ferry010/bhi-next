"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SurveyForm, { type Question } from "@/components/trust-gap/SurveyForm";
import { TEAM_QUESTIONS, MIN_TEAM_RESPONSES, type TeamAnswers } from "@/lib/trustGap/questions";
import { isValidCodeShape } from "@/lib/trustGap/code";
import { getStatus, submitTeamResponse, hasAnswered } from "@/lib/trustGap/store";

const questions: Question[] = TEAM_QUESTIONS.map((q) => ({
  id: q.id,
  kind: q.kind,
  question: q.question,
  help: "help" in q ? q.help : undefined,
  options: "options" in q ? q.options : undefined,
  lowLabel: "lowLabel" in q ? q.lowLabel : undefined,
  highLabel: "highLabel" in q ? q.highLabel : undefined,
  // D3 only makes sense for people who actually concealed something.
  showIf: q.id === "d3" ? (a) => a.d2 === "yes" : undefined,
}));

type State = "loading" | "ready" | "missing" | "done" | "already" | "offline";

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
    getStatus(code).then((r) => {
      if (!r.ok) setState("offline");
      else setState(r.exists ? "ready" : "missing");
    });
  }, [code]);

  const handleSubmit = async (a: Record<string, unknown>) => {
    setBusy(true);
    setError(null);
    const answers: TeamAnswers = {
      d1_frequency: String(a.d1),
      d2_concealed: String(a.d2),
      d3_reasons: a.d2 === "yes" ? ((a.d3 as string[]) ?? []) : [],
      d4_clarity: Number(a.d4),
      d5_timesaving: String(a.d5),
      d6_comfort: Number(a.d6),
    };
    const res = await submitTeamResponse(code, answers);
    setBusy(false);
    if (!res.ok) {
      setError("Something went wrong sending your answers. Please try again.");
      return;
    }
    setState("done");
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar variant="light" />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-2xl">{children}</div>
      </main>
      <Footer />
    </>
  );

  if (state === "loading") {
    return (
      <Shell>
        <p className="text-body-lg text-muted-foreground" role="status">
          Loading…
        </p>
      </Shell>
    );
  }

  if (state === "missing") {
    return (
      <Shell>
        <h1 className="text-hero text-foreground">This link does not work</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          It may have been mistyped, or the person who sent it may have started again. Ask them for
          a fresh link and it will work straight away.
        </p>
      </Shell>
    );
  }

  if (state === "offline") {
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot reach the survey right now</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Nothing is wrong with your link. Please try again in a few minutes.
        </p>
      </Shell>
    );
  }

  if (state === "already") {
    return (
      <Shell>
        <h1 className="text-hero text-foreground">You have already answered</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Thanks. One answer per person keeps the result honest, so there is nothing more to do
          here. Your manager only ever sees a summary.
        </p>
      </Shell>
    );
  }

  if (state === "done") {
    return (
      <Shell>
        <h1 className="text-hero text-foreground">Thank you. That was genuinely useful.</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Your answers are anonymous and go into a summary with everyone else's. Your manager sees
          the totals only, never who said what, and only once at least {MIN_TEAM_RESPONSES} people
          have replied.
        </p>
        <p className="mt-4 text-body-lg text-muted-foreground">
          If you want to know why anyone is asking these questions in the first place, there is more
          about the thinking behind it on this site.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-hero text-foreground">Six quick questions</h1>
      <p className="mt-5 text-body-lg text-muted-foreground">
        Your manager wants a truthful picture of how AI is really being used here, so please answer
        as things actually are rather than as they are supposed to be.
      </p>
      <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-white p-5">
        <p className="font-heading font-bold text-foreground">This is anonymous</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your name is not attached to anything, and no individual answer is ever shown. Your
          manager receives a summary of the whole team, and only once at least{" "}
          {MIN_TEAM_RESPONSES} people have replied. If fewer than that answer, nobody sees anything
          at all.
        </p>
      </div>

      <div className="mt-10">
        <SurveyForm
          questions={questions}
          submitLabel="Send my answers"
          onSubmit={handleSubmit}
          busy={busy}
          error={error}
        />
      </div>
    </Shell>
  );
}
