"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import SurveyForm, {
  emptyCapability,
  type CapabilityValue,
  type Question,
} from "@/components/impact-gap/SurveyForm";
import { LEADER_QUESTIONS, type LeaderAnswers } from "@/lib/impactGap/questions";
import { generateCode } from "@/lib/impactGap/code";
import { createSession } from "@/lib/impactGap/store";

const questions: Question[] = LEADER_QUESTIONS.map((q) => ({
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

export default function ImpactGapStartPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (a: Record<string, unknown>) => {
    setBusy(true);
    setError(null);

    const capability = (a.d4 as CapabilityValue | undefined) ?? emptyCapability;

    const answers: LeaderAnswers = {
      d1_adoption_estimate: Number(a.d1 ?? 50),
      d2_time_freed: String(a.d2),
      d3_time_went: String(a.d3),
      d3_mechanism: String(a.mechanism),
      // The text and the follow-up are cleared together when someone says there
      // isn't one, so a stale sentence can never be quoted back in the report.
      d4_capability_text: capability.cannotName ? null : capability.text.trim(),
      d4_cannot_name: capability.cannotName,
      d4_genuinely_new: capability.cannotName ? null : capability.genuinelyNew,
      d5_reallocation: String(a.d5),
      d6_human_work: String(a.d6),
    };

    const code = generateCode();
    const res = await createSession(code, answers);

    if (!res.ok) {
      setBusy(false);
      setError(
        res.error === "not_provisioned"
          ? "This test is not switched on yet. The database tables still need to be created. Nothing you typed has gone anywhere, so please try again shortly."
          : "Something went wrong saving your answers. Please try again.",
      );
      return;
    }

    router.push(`/impact-gap/share/${code}`);
  };

  return (
    <>
      <ToolHeader />
      <main>
        <section className="bg-secondary pt-28 pb-10 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">What do you think has changed?</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Six questions about what AI has actually done to the work on your team, as you see it
              today. Answer honestly rather than optimistically. The distance between your answers
              and your team's is the entire finding, so an accurate starting point is worth more
              here than a flattering one.
            </p>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Your team never sees these answers. Not now, and not in the report.
            </p>
          </div>
        </section>

        <section className="bg-secondary pb-20">
          <div className="container max-w-2xl">
            <SurveyForm
              questions={questions}
              submitLabel="Get my team link"
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
