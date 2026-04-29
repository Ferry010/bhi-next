"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type AppRole = Database["public"]["Enums"]["app_role"];

type UseUserRoleOptions = {
  enabled?: boolean;
};

const ROLE_CHECK_TIMEOUT_MS = 8000;

export function useUserRole(
  userId?: string | null,
  role: AppRole = "admin",
  options?: UseUserRoleOptions,
) {
  const enabled = options?.enabled ?? true;
  const shouldLoad = enabled && !!userId;
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(shouldLoad);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!shouldLoad || !userId) {
      setHasRole(false);
      setLoading(false);
      setError(null);
      return () => { cancelled = true; };
    }

    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        cancelled = true;
        setHasRole(false);
        setLoading(false);
        setError("timeout");
      }
    }, ROLE_CHECK_TIMEOUT_MS);

    const loadRole = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error: rpcError } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: role,
        });

        if (cancelled) return;
        clearTimeout(timeoutId);
        if (rpcError) {
          setHasRole(false);
          setError(rpcError.message);
        } else {
          setHasRole(!!data);
          setError(null);
        }
      } catch (err) {
        if (cancelled) return;
        clearTimeout(timeoutId);
        setHasRole(false);
        setError(err instanceof Error ? err.message : "unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadRole();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [shouldLoad, userId, role]);

  return { hasRole, loading, error };
}
