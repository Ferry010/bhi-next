import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

// One password, held in an environment variable, exchanged for a signed cookie.
//
// Deliberately not a user system. There are two people who need this screen and
// adding accounts, roles and password resets for two people would be building a
// small product nobody asked for. The site already has a real auth system for
// the main admin area, and this tool is kept separate from it on purpose so
// that neither can break the other.

export const ADMIN_COOKIE = "impact_gap_admin";

/** Eight hours. Long enough for a working day, short enough to matter. */
const TTL_MS = 8 * 60 * 60 * 1000;

function secret(): string | null {
  const value = process.env.IMPACT_GAP_ADMIN_PASSWORD;
  return value && value.length > 0 ? value : null;
}

/** True when the tool has been given a password at all. */
export function isConfigured(): boolean {
  return secret() !== null;
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("hex");
}

/** Compares without leaking length or content through timing. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still burn a comparison so a wrong length is not measurably faster.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(input: unknown): boolean {
  const key = secret();
  if (!key || typeof input !== "string" || input.length === 0) return false;
  return safeEqual(input, key);
}

/**
 * The token carries an expiry and a nonce, signed with the password. Nothing
 * about who is holding it, because there is nobody to identify.
 */
export function createSessionToken(): string {
  const key = secret();
  if (!key) throw new Error("IMPACT_GAP_ADMIN_PASSWORD is not set");
  const payload = `${Date.now() + TTL_MS}.${randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload, key)}`;
}

export function verifySessionToken(token: unknown): boolean {
  const key = secret();
  if (!key || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiry, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expiry}.${nonce}`, key))) return false;

  const expiresAt = Number(expiry);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

/** The gate on every admin route. There is no other way in. */
export function requireAdmin(): boolean {
  return verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: TTL_MS / 1000,
};
