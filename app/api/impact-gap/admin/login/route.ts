import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  COOKIE_OPTIONS,
  checkPassword,
  createSessionToken,
  isConfigured,
} from "@/lib/impactGap/adminAuth";

export const dynamic = "force-dynamic";

/** Slows down anyone working through a list of guesses. */
const WRONG_PASSWORD_DELAY_MS = 600;

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!checkPassword(body.password)) {
    await new Promise((r) => setTimeout(r, WRONG_PASSWORD_DELAY_MS));
    return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), COOKIE_OPTIONS);
  return response;
}
