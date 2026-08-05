import type { ImpactGapResult, Verbatim } from "./scoring";
import type { LeaderAnswers } from "./questions";

// The client-safe half of the admin module.
//
// Split out from adminData.ts on purpose. That file imports the service role
// Supabase client, so anything importing a runtime value from it drags server
// code into the browser bundle. The admin screens need STATUSES at runtime, so
// STATUSES lives here with the types and adminData.ts imports it back.

export const STATUSES = [
  { value: "awaiting", label: "Awaiting responses" },
  { value: "ready", label: "Report ready" },
  { value: "emailed", label: "Personal email sent" },
  { value: "conversation", label: "In conversation" },
  { value: "closed", label: "Closed" },
] as const;

export type StatusValue = (typeof STATUSES)[number]["value"];

export interface RecordSummary {
  code: string;
  organisation: string | null;
  leaderName: string | null;
  leaderEmail: string | null;
  leaderRole: string | null;
  startedAt: string;
  responseCount: number;
  /** Null until the response threshold is met. */
  score: number | null;
  band: string | null;
  status: StatusValue;
  personalEmailSentAt: string | null;
  lastTouchedAt: string;
}

export interface RecordDetail extends RecordSummary {
  notes: string | null;
  leader: LeaderAnswers;
  result: ImpactGapResult | null;
  verbatims: Verbatim[];
  notifiedAt: string | null;
}

export interface AggregateStats {
  teamsTested: number;
  teamsWithReports: number;
  averageScore: number | null;
  averagePerDimension: { id: string; name: string; average: number }[];
  totalTeamResponses: number;
}

export interface RecordUpdate {
  status?: StatusValue;
  notes?: string;
  personalEmailSent?: boolean;
}
