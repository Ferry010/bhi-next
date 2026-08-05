import { biggestGap, type ImpactGapResult } from "./scoring";

// What gets sent to the two Impact Gap email templates.
//
// The edge function does not accept HTML. It looks a name up in a registry of
// React Email components and renders that component with whatever object is
// passed as templateData, resolving the subject from the template itself. So
// this file builds props, not markup, and the two names below have to match the
// keys registered in the function's registry.ts exactly.

export const LEADER_TEMPLATE = "impact-gap-report-ready";
export const INTERNAL_TEMPLATE = "impact-gap-internal";

export const INTERNAL_RECIPIENTS = [
  "ferry@brandhumanizing.com",
  "jonathan@brandhumanizing.com",
];

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://brandhumanizing.com";

export const reportUrlFor = (code: string) => `${BASE_URL}/impact-gap/report/${code}`;
export const adminUrlFor = (code: string) => `${BASE_URL}/impact-gap/admin/${code}`;

export interface LeaderPayload {
  leaderName: string;
  reportUrl: string;
  responseCount: number;
}

export function leaderPayload(args: {
  code: string;
  leaderName: string | null;
  responseCount: number;
}): LeaderPayload {
  return {
    // The template greets on first name and falls back gracefully, so an empty
    // string is safer here than null going through JSON.
    leaderName: args.leaderName?.trim() ?? "",
    reportUrl: reportUrlFor(args.code),
    responseCount: args.responseCount,
  };
}

export interface InternalPayload {
  organisation: string;
  leaderName: string;
  leaderRole: string;
  leaderEmail: string;
  score: number;
  band: string;
  biggestGapName: string;
  biggestGapValue: number;
  responseCount: number;
  adminUrl: string;
  reportUrl: string;
  mechanismFired: boolean;
  literacyLikely: boolean;
}

export function internalPayload(args: {
  code: string;
  organisation: string | null;
  leaderName: string | null;
  leaderEmail: string | null;
  leaderRole: string | null;
  result: ImpactGapResult;
}): InternalPayload {
  const { result } = args;
  const top = biggestGap(result.dimensions);

  return {
    organisation: args.organisation?.trim() || "",
    leaderName: args.leaderName?.trim() || "",
    leaderRole: args.leaderRole?.trim() || "",
    leaderEmail: args.leaderEmail?.trim() || "",
    score: result.score,
    band: result.band.label,
    biggestGapName: top.name,
    biggestGapValue: Math.round(top.gap),
    responseCount: result.responseCount,
    adminUrl: adminUrlFor(args.code),
    reportUrl: reportUrlFor(args.code),
    mechanismFired: result.mechanism.revealed,
    literacyLikely: result.literacyLikely,
  };
}
