"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SurveyForm, { type Question } from "@/components/trust-gap/SurveyForm";
import { LEADER_QUESTIONS, type LeaderAnswers } from "@/lib/trustGap/questions";
import { generateCode } from "@/lib/trustGap/code";
import { createSession } from "@/lib/trustGap/store";

const questions: Question[] = LEADER_QUESTIONS.map((q) => ({
  id: q.id,
  kind: q.kind,
  question: q.question,
  help: "help" in q ? q.help : undefined,
  options: "options" in q ? q.options : undefined,
  lowLabel: "lowLabel" in q ? q.lowLabel : undefined,
  highLabel: "highLabel" in q ? q.highLabel : undefined,
}));

export default function TrustGapStartPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (a: Record<string, unknown>) => {
    setBusy(true);
    setError(null);

    const answers: LeaderAnswers = {
      d1_usage_estimate: Number(a.d1 ?? 50),
      d2_concealment: String(a.d2),
      d3_reasons: (a.d3 as string[]) ?? [],
      d4_clarity: Number(a.d4),
      d5_timesaving: String(a.d5),
      d6_comfort: Number(a.d6),
    };

    const code = generateCode();
    const res = await createSession(code, answers);

    if (!res.ok) {
      setBusy(false);
      setError(
        res.error === "not_provisioned"
          ? "This tool is not switched on yet. The database tables still need to be created. Nothing you entered has been lost, so please try again shortly."
          : "Something went wrong saving your answers. Please try again.",
      );
      return;
    }

    router.push("/trust-gap/share");
  };

  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 pb-10 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">What do you think is happening?</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Six questions about AI on your team, as you see it right now. Answer honestly rather
              than optimistically, because the gap is the point. Nobody sees these answers except
              you, and your team is never shown them.
            </p>
          </div>
        </section>

        <section className="bg-secondary pb-20">
          <div className="container max-w-2xl">
            <SurveyForm
              questions={questions}
              submitLabel="Get my sharing link"
              onSubmit={handleSubmit}
              busy={busy}
              error={error}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
