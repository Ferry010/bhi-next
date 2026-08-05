"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/impact-gap/AdminGate";
import DimensionCard from "@/components/impact-gap/DimensionCard";
import D4Breakdown from "@/components/impact-gap/D4Breakdown";
import { Button } from "@/components/ui/button";
import { STATUSES, type RecordDetail } from "@/lib/impactGap/adminTypes";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";
import { Check, Copy } from "lucide-react";

type Draft = { subject: string; body: string };

const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "—");

export default function AdminRecordPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [record, setRecord] = useState<RecordDetail | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [notes, setNotes] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/impact-gap/admin/record/${code}`);
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      setAuthed(true);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      if (!data.ok) return;
      setRecord(data.record);
      setNotes(data.record.notes ?? "");
      setDraft(data.draft);
      // Only seed the editable draft once, so a save never wipes an edit in
      // progress.
      setBody((current) => (current.length > 0 ? current : (data.draft?.body ?? "")));
    } catch {
      setAuthed(true);
    }
  }, [code]);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (payload: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/impact-gap/admin/record/${code}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setRecord(data.record);
        setSavedAt(new Date().toLocaleTimeString());
      }
    } finally {
      setSaving(false);
    }
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, the text is selectable */
    }
  };

  if (authed === null)
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary">
        <p role="status" className="text-muted-foreground">
          Loading…
        </p>
      </main>
    );

  if (authed === false) return <AdminGate onSuccess={load} />;

  if (notFound)
    return (
      <main className="min-h-screen bg-secondary py-10">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-2xl font-bold text-foreground">No such record</h1>
          <Link href="/impact-gap/admin" className="mt-4 inline-block text-primary underline underline-offset-4">
            Back to the list
          </Link>
        </div>
      </main>
    );

  if (!record)
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary">
        <p role="status" className="text-muted-foreground">
          Loading the record…
        </p>
      </main>
    );

  const unlocked = record.result !== null;

  return (
    <main className="min-h-screen bg-secondary py-10">
      <div className="container max-w-4xl">
        <Link href="/impact-gap/admin" className="text-sm text-primary underline underline-offset-4">
          Back to the list
        </Link>

        <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {record.organisation || "Organisation not given"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {record.leaderName || "Name not given"}
              {record.leaderRole ? `, ${record.leaderRole}` : ""}
              {record.leaderEmail ? (
                <>
                  {" · "}
                  <a href={`mailto:${record.leaderEmail}`} className="text-primary underline underline-offset-4">
                    {record.leaderEmail}
                  </a>
                </>
              ) : (
                " · no email given, no personal reply possible"
              )}
            </p>
          </div>
          {unlocked && (
            <div className="text-right">
              <p className="font-heading text-4xl font-extrabold leading-none text-primary">
                {record.result!.score}
              </p>
              <p className="mt-1 font-heading text-sm font-semibold text-foreground">
                {record.result!.band.label}
              </p>
            </div>
          )}
        </header>

        <dl className="mt-6 grid gap-3 rounded-2xl border border-border bg-white p-5 sm:grid-cols-4">
          {[
            { k: "Started", v: day(record.startedAt) },
            {
              k: "Responses",
              v:
                record.responseCount >= MIN_TEAM_RESPONSES
                  ? String(record.responseCount)
                  : `${record.responseCount} of ${MIN_TEAM_RESPONSES} needed`,
            },
            { k: "Slack notified", v: day(record.notifiedAt) },
            { k: "Personal email sent", v: day(record.personalEmailSentAt) },
          ].map((i) => (
            <div key={i.k}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{i.k}</dt>
              <dd className="mt-1 text-foreground">{i.v}</dd>
            </div>
          ))}
        </dl>

        {/* Status, the sent toggle and notes */}
        <section className="mt-5 rounded-2xl border border-border bg-white p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="status" className="block font-heading text-sm font-semibold text-foreground">
                Status
              </label>
              <select
                id="status"
                value={record.status}
                onChange={(e) => patch({ status: e.target.value })}
                className="mt-1.5 h-11 rounded-lg border border-input bg-white px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => patch({ personalEmailSent: !record.personalEmailSentAt })}
              className="btn-scale h-11 rounded-full border-2 font-heading font-semibold"
            >
              {record.personalEmailSentAt ? "Undo personal email sent" : "Mark personal email sent"}
            </Button>

            <p aria-live="polite" className="text-sm text-muted-foreground">
              {saving ? "Saving…" : savedAt ? `Saved at ${savedAt}` : ""}
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="notes" className="block font-heading text-sm font-semibold text-foreground">
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => notes !== (record.notes ?? "") && patch({ notes })}
              placeholder="Anything worth remembering before the next conversation. Saves when you click away."
              className="mt-1.5 w-full rounded-xl border-2 border-border bg-white p-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </section>

        {!unlocked && (
          <p className="mt-5 rounded-2xl border border-border bg-white p-6 text-muted-foreground">
            This team is still collecting answers. There is no report and no draft
            until {MIN_TEAM_RESPONSES} people have replied.
          </p>
        )}

        {unlocked && (
          <>
            {/* The drafting aid */}
            <section className="mt-5 rounded-2xl border-2 border-primary/20 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">The personal email</h2>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    A starting point, not a message. Edit it, fill in the bracketed parts, then copy
                    it and send it from your own inbox. There is no send button here on purpose:
                    the landing page promises a person, so a person has to send it.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={copyDraft}
                  className="btn-scale h-11 rounded-lg bg-primary px-5 font-heading font-semibold text-primary-foreground"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Subject
              </p>
              <p className="mt-1 font-heading font-semibold text-foreground">{draft?.subject}</p>

              <label htmlFor="draft-body" className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Body
              </label>
              <textarea
                id="draft-body"
                rows={22}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1.5 w-full rounded-xl border-2 border-border bg-white p-4 font-body text-sm leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="button"
                onClick={() => setBody(draft?.body ?? "")}
                className="mt-2 rounded text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Reset to the generated draft
              </button>
            </section>

            {/* Full results */}
            <section className="mt-8">
              <h2 className="font-heading text-lg font-bold text-foreground">Both sides, all six</h2>
              <p className="mt-1 text-sm text-muted-foreground">{record.result!.headline}</p>
              <div className="mt-5 space-y-4">
                {record.result!.dimensions.map((d) => (
                  <DimensionCard key={d.id} d={d} />
                ))}
              </div>
            </section>

            {record.result!.mechanism.revealed && (
              <section className="mt-6 rounded-2xl bg-navy p-6">
                <h2 className="font-heading font-bold text-white">The mechanism fired</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {record.result!.mechanism.explanation}
                </p>
              </section>
            )}

            <section className="mt-8">
              <h2 className="font-heading text-lg font-bold text-foreground">
                What the team said on Q4
              </h2>
              <D4Breakdown
                counts={record.teamCounts}
                total={record.responseCount}
                leaderAnswer={record.leader.d4_capability}
              />
            </section>

            <p className="mt-8 text-sm text-muted-foreground">
              The report as they see it:{" "}
              <Link
                href={`/impact-gap/report/${record.code}`}
                className="text-primary underline underline-offset-4"
              >
                /impact-gap/report/{record.code}
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
