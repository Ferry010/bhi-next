"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getStatus } from "@/lib/trustGap/store";
import { MIN_TEAM_RESPONSES } from "@/lib/trustGap/questions";
import { Check, Copy, ArrowRight } from "lucide-react";

export default function WaitingPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const router = useRouter();
  const [count, setCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const link = typeof window !== "undefined" ? `${window.location.origin}/trust-gap/t/${code}` : "";

  const check = useCallback(async () => {
    const r = await getStatus(code);
    if (!r.ok) return;
    setCount(r.count);
    if (r.count >= MIN_TEAM_RESPONSES) router.replace(`/trust-gap/report/${code}`);
  }, [code, router]);

  useEffect(() => {
    check();
    // Light polling so the page updates itself while a leader watches it.
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, [check]);

  const remaining = count === null ? null : Math.max(0, MIN_TEAM_RESPONSES - count);

  return (
    <>
      <Navbar variant="light" />
      <main className="bg-secondary pt-28 pb-20 md:pt-36">
        <div className="container max-w-2xl">
          <h1 className="text-hero text-foreground">Not quite yet</h1>
          <p className="mt-5 text-body-lg text-muted-foreground" aria-live="polite">
            {count === null
              ? "Checking how many people have replied…"
              : remaining === 0
                ? "Your report is ready. Taking you there now."
                : `${count} ${count === 1 ? "person has" : "people have"} replied. ${remaining} more and your report unlocks.`}
          </p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            The threshold exists to protect the people answering. Below {MIN_TEAM_RESPONSES}{" "}
            replies it becomes possible to work out who said what, so the report stays shut until
            that risk is gone. This page updates itself, and you can safely close it and come back.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6">
            <label htmlFor="waiting-link" className="block font-heading font-bold text-foreground">
              Send the link to a few more people
            </label>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                id="waiting-link"
                readOnly
                value={link}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 rounded-lg border border-input bg-cream px-4 py-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    /* selectable on screen */
                  }
                }}
                className="btn-scale h-12 rounded-lg bg-primary px-6 font-heading font-semibold text-primary-foreground"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/trust-gap/share">
              <Button variant="outline" className="btn-scale rounded-full border-2 font-heading font-semibold">
                Back to sharing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
