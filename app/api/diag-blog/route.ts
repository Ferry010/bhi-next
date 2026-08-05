import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// TEMPORARY DIAGNOSTIC. Delete once the blog index is fixed.
//
// The blog page discards the Supabase error and renders an empty state, so a
// permission problem, a timeout and genuinely-zero-rows all look identical from
// outside. This runs the exact same query with the exact same client and
// reports what actually comes back, including which project the server is
// really talking to.
//
// Returns no post content and no keys. Only the host, a row count and the
// error, all of which are already discoverable or harmless.

export async function GET() {
  const host = (() => {
    try {
      return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").host;
    } catch {
      return "NEXT_PUBLIC_SUPABASE_URL is unset or malformed";
    }
  })();

  const anonKeyShape = (() => {
    const k = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!k) return "MISSING";
    if (k.startsWith("sb_secret_")) return "WRONG: a secret key is in the public var";
    if (k.startsWith("sb_publishable_")) return "publishable";
    if (k.startsWith("eyJ")) return "jwt (legacy anon)";
    return "unrecognised";
  })();

  // Exactly what app/blog/page.tsx runs.
  const supabase = createServerClient();
  const { data, error, status } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  // And a deliberately simpler one, to separate "cannot read at all" from
  // "something about this particular query".
  const simple = await supabase.from("blog_posts").select("slug").limit(50);

  return NextResponse.json({
    supabaseHost: host,
    anonKeyShape,
    pageQuery: {
      rows: data?.length ?? null,
      httpStatus: status,
      error: error ? { message: error.message, code: error.code, details: error.details } : null,
    },
    simpleQuery: {
      rows: simple.data?.length ?? null,
      error: simple.error ? { message: simple.error.message, code: simple.error.code } : null,
    },
  });
}
