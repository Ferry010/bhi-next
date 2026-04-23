"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type SupabaseClient = ReturnType<typeof createClient<Database>>;

let _client: SupabaseClient | null = null;

export function createSupabaseBrowserClient(): SupabaseClient {
  if (!_client) {
    _client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: true, autoRefreshToken: true } },
    );
  }
  return _client;
}
