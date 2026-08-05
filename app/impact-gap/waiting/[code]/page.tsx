"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import { Button } from "@/components/ui/button";
import { getStatus } from "@/lib/impactGap/store";
import { isValidCodeShape } from "@/lib/impactGap/code";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";
import { Check, Copy } from "lucide-react";

export default function WaitingPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const router = useRouter();
  const [count, setCount] = useState<number | null>(null);
  const [missing, setMissing] = useState(false);
  const [copied, setCopied] = useState(false);

  const link = typeof window !== "undefined" ? `${window.location.origin}/impact-gap/t/${code}` : "";

  const check = useCallback(async () => {
    if (!isValidCodeShape(code)) {
      setMissing(true);
      return;
    }
    const r = await getStatus(code);
    if (!r.ok) return;
    if (!r.exists) {
      setMissing(true);
      return;
    }
    setCount(r.count);
    if (r.count >= MIN_TEAM_RESPONSES) router.replace(`/impact-gap/report/${code}`);
  }, [code, router]);

  useEffect(() => {
    check();
    // Light polling, so a leader watching this page sees it change rather than
    // having to work out that a refresh is required.
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, [check]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the link is on screen and selectable */
    }
  };

  const remaining = count === null ? null : Math.max(0, MIN_TEAM_RESPONSES - count);

  if (missing)
    return (
      <>
        <ToolHeader />
        <main className="bg-secondary pt-28 pb-20 md:pt-36">
          <div className="container max-w-2xl">
            <h1 className="text-hero text-foreground">We cannot find this one</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              The link may have been mistyped. If you started a test and lost your way back to it,
              the quickest route is to run it again.
            </p>
            <Link
              href="/impact-gap/start"
              className="mt-6 inline-block font-heading font-semibold text-primary underline underline-offset-4"
            >
              Start again
            </Link>
          </div>
        </main>
        <ToolFooter />
      </>
    );

  return (
    <>
      <ToolHeader />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-2xl">
          <h1 className="text-hero text-foreground">Not yet</h1>
          <p className="mt-5 text-body-lg text-muted-foreground" aria-live="polite">
            {count === null
              ? "Checking how many people have replied…"
              : remaining === 0
                ? "Your report is ready. Taking you there now."
                : `${count} ${count === 1 ? "person has" : "people have"} replied. ${remaining} more and your report opens.`}
          </p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            The threshold is there to protect the people answering, not to make you wait. Below{" "}
            {MIN_TEAM_RESPONSES} replies it starts to become possible to work out who said what,
            especially on the question where people write in their own words, so nothing is shown
            until that risk has gone. This page checks for itself every few seconds, and you can
            safely close it and come back later.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6">
            <label htmlFor="waiting-link" className="block font-heading font-bold text-foreground">
              Send it to a few more people
            </label>
            <p className="mt-2 text-sm text-muted-foreground">
              Most teams need to ask more people than they expect. Nobody is being rude, they are
              being busy.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                id="waiting-link"
                readOnly
                value={link}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 rounded-lg border border-input bg-cream px-4 py-3 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="button"
                onClick={copy}
                className="btn-scale h-12 rounded-lg bg-primary px-6 font-heading font-semibold text-primary-foreground"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied ? "Copied" : "Copy link"}</span>
              </Button>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? "Link copied to clipboard" : ""}
            </p>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Back to{" "}
            <Link
              href={`/impact-gap/share/${code}`}
              className="font-semibold text-primary underline underline-offset-4"
            >
              your sharing page
            </Link>
            .
          </p>
        </div>
      </main>
      <ToolFooter />
    </>
  );
}
