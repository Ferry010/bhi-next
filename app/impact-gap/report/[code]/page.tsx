"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import ReportView from "@/components/impact-gap/ReportView";
import { getReport } from "@/lib/impactGap/store";
import { scoreImpactGap, type ImpactGapResult } from "@/lib/impactGap/scoring";
import { isValidCodeShape } from "@/lib/impactGap/code";

type State = "loading" | "ok" | "missing" | "offline";

export default function ReportPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const router = useRouter();
  const [state, setState] = useState<State>("loading");
  const [result, setResult] = useState<ImpactGapResult | null>(null);
  const [teamCounts, setTeamCounts] = useState<Record<string, number>>({});
  const [leaderAnswer, setLeaderAnswer] = useState("");

  useEffect(() => {
    if (!isValidCodeShape(code)) {
      setState("missing");
      return;
    }
    getReport(code).then((r) => {
      if (!r.ok) {
        setState(r.error === "not_found" ? "missing" : "offline");
        return;
      }
      // Below the threshold the database returns no answer data at all, so
      // there is nothing here to accidentally render.
      if (!r.data.unlocked) {
        router.replace(`/impact-gap/share/${code}`);
        return;
      }
      if (r.data.leader && r.data.team) {
        setResult(scoreImpactGap(r.data.leader, r.data.team));
        setTeamCounts(r.data.team.d4_counts);
        setLeaderAnswer(r.data.leader.d4_capability);
        setState("ok");
      } else {
        setState("offline");
      }
    });
  }, [code, router]);

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <ToolHeader />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-3xl">{children}</div>
      </main>
      <ToolFooter />
    </>
  );

  if (state === "loading")
    return (
      <Shell>
        <p role="status" className="text-body-lg text-muted-foreground">
          Building your report…
        </p>
      </Shell>
    );

  if (state === "missing")
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot find this report</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          The link may have been mistyped. If you ran the test and lost your way back to it, running
          it again takes two minutes, though your team would have to answer again too.
        </p>
        <Link
          href="/impact-gap/start"
          className="mt-6 inline-block font-heading font-semibold text-primary underline underline-offset-4"
        >
          Start again
        </Link>
      </Shell>
    );

  if (state === "offline" || !result)
    return (
      <Shell>
        <h1 className="text-hero text-foreground">We cannot reach your report</h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          Something is wrong at our end rather than yours. Your answers and your team&apos;s are
          safe. Please try again in a few minutes.
        </p>
      </Shell>
    );

  return (
    <>
      <ToolHeader />
      <ReportView result={result} teamCounts={teamCounts} leaderAnswer={leaderAnswer} />
      <ToolFooter />
    </>
  );
}
