"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/impact-gap/AdminGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STATUSES, type RecordSummary, type AggregateStats } from "@/lib/impactGap/adminTypes";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";

type SortKey = "organisation" | "startedAt" | "responseCount" | "score" | "status" | "lastTouchedAt";

const COLUMNS: { key: SortKey | null; label: string; className?: string }[] = [
  { key: "organisation", label: "Organisation" },
  { key: null, label: "Leader" },
  { key: null, label: "Email" },
  { key: "startedAt", label: "Started" },
  { key: "responseCount", label: "Responses" },
  { key: "score", label: "Score" },
  { key: "status", label: "Status" },
  { key: "lastTouchedAt", label: "Last touched" },
];

const statusLabel = (v: string) => STATUSES.find((s) => s.value === v)?.label ?? v;
const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

export default function AdminListPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [records, setRecords] = useState<RecordSummary[]>([]);
  const [stats, setStats] = useState<AggregateStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("lastTouchedAt");
  const [ascending, setAscending] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/impact-gap/admin/list");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const body = await res.json();
      if (!body.ok) {
        setError("Could not load the records. The tables may not exist yet.");
        setAuthed(true);
        return;
      }
      setRecords(body.records);
      setStats(body.stats);
      setAuthed(true);
    } catch {
      setError("Could not reach the server.");
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = records.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      return [r.organisation, r.leaderName, r.leaderEmail, r.leaderRole]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });

    const direction = ascending ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      // Records with no score yet always sort to the bottom rather than being
      // treated as a zero, which would read as a perfect result.
      if (av === null) return 1;
      if (bv === null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * direction;
      return String(av).localeCompare(String(bv)) * direction;
    });
  }, [records, query, statusFilter, sortKey, ascending]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAscending((a) => !a);
    else {
      setSortKey(key);
      setAscending(false);
    }
  };

  const logout = async () => {
    await fetch("/api/impact-gap/admin/logout", { method: "POST" });
    setAuthed(false);
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

  return (
    <main className="min-h-screen bg-secondary py-10">
      <div className="container max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Impact Gap</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {records.length} {records.length === 1 ? "team" : "teams"} have started the test.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/api/impact-gap/admin/export" download>
              <Button variant="outline" className="btn-scale rounded-full border-2 font-heading font-semibold">
                Export CSV
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={logout}
              className="btn-scale rounded-full border-2 font-heading font-semibold"
            >
              Lock
            </Button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-xl border-2 border-accent/30 bg-accent/5 p-4 text-accent">
            {error}
          </p>
        )}

        {/* The aggregate view. The beginning of the published research. */}
        {stats && (
          <section className="mt-8 rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Across everyone</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Only teams past the {MIN_TEAM_RESPONSES} response threshold count towards the averages.
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Teams tested", value: String(stats.teamsTested) },
                { label: "Reports opened", value: String(stats.teamsWithReports) },
                { label: "Average score", value: stats.averageScore === null ? "n/a" : String(stats.averageScore) },
                { label: "Team responses", value: String(stats.totalTeamResponses) },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-cream p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-heading text-2xl font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            {stats.averagePerDimension.length > 0 && (
              <div className="mt-5">
                <h3 className="font-heading text-sm font-semibold text-foreground">Average gap per dimension</h3>
                <ul className="mt-3 space-y-2">
                  {stats.averagePerDimension.map((d) => (
                    <li key={d.id} className="flex items-center gap-3">
                      <span className="w-44 shrink-0 text-sm text-muted-foreground">{d.name}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{ width: `${Math.max(2, d.average)}%` }}
                        />
                      </span>
                      <span className="w-10 text-right font-heading text-sm font-semibold text-foreground">
                        {d.average}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[220px]">
            <label htmlFor="admin-search" className="block font-heading text-sm font-semibold text-foreground">
              Search
            </label>
            <Input
              id="admin-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Organisation, name, email or role"
              className="mt-1.5 h-11 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="admin-status" className="block font-heading text-sm font-semibold text-foreground">
              Status
            </label>
            <select
              id="admin-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1.5 h-11 rounded-lg border border-input bg-white px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">
              Every team that has started the Impact Gap, sortable by column.
            </caption>
            <thead className="border-b border-border bg-cream">
              <tr>
                {COLUMNS.map((c) => (
                  <th key={c.label} scope="col" className="px-4 py-3 font-heading font-semibold text-foreground">
                    {c.key ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(c.key!)}
                        aria-label={`Sort by ${c.label}`}
                        className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {c.label}
                        {sortKey === c.key ? (ascending ? " ↑" : " ↓") : ""}
                      </button>
                    ) : (
                      c.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-muted-foreground">
                    {records.length === 0
                      ? "Nobody has taken the test yet."
                      : "Nothing matches those filters."}
                  </td>
                </tr>
              )}
              {visible.map((r) => (
                <tr key={r.code} className="border-b border-border last:border-0 hover:bg-cream/50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/impact-gap/admin/${r.code}`}
                      className="font-semibold text-primary underline underline-offset-4"
                    >
                      {r.organisation || "Not given"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.leaderName || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.leaderEmail || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{day(r.startedAt)}</td>
                  <td className="px-4 py-3">
                    {/* The threshold is only worth showing while it is still
                        the thing standing between a lead and a report. */}
                    {r.responseCount >= MIN_TEAM_RESPONSES ? (
                      <span className="font-semibold text-foreground">{r.responseCount}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        {r.responseCount} of {MIN_TEAM_RESPONSES} needed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.score === null ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <span className="font-heading font-bold text-foreground">
                        {r.score}{" "}
                        <span className="font-body text-xs font-normal text-muted-foreground">{r.band}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground">{statusLabel(r.status)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{day(r.lastTouchedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
