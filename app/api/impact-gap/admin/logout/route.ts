import { NextResponse } from "next/server";
import { ADMIN_COOKIE, COOKIE_OPTIONS } from "@/lib/impactGap/adminAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return response;
}
