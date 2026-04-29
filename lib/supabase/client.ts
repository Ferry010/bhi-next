"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type SupabaseClient = ReturnType<typeof createClient<Database>>;

let _client: SupabaseClient | null = null;

export function createSupabaseBrowserClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (Vercel dashboard → " +
      "Project → Settings → Environment Variables)."
    );
  }

  _client = createClient<Database>(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}
