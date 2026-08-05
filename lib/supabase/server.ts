import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Supabase makes its requests through fetch, and Next.js caches fetch
  // responses in its Data Cache keyed on the request URL. That cache lives on
  // Vercel's infrastructure and survives redeploys, so a query issued while a
  // table was empty keeps returning nothing long after the table has rows in
  // it, with no error and no way to tell from the outside.
  //
  // That is exactly what happened to the blog index: it returned zero posts
  // while the identical query with one extra parameter, and therefore a
  // different URL, returned all eleven.
  //
  // Every page using this client is already force-dynamic, so it is asking for
  // fresh data on every request anyway. This makes that true.
  return createClient<Database>(url, key, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
