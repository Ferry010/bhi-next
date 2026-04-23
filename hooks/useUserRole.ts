"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type AppRole = Database["public"]["Enums"]["app_role"];

type UseUserRoleOptions = {
  enabled?: boolean;
};

export function useUserRole(
  userId?: string | null,
  role: AppRole = "admin",
  options?: UseUserRoleOptions,
) {
  const enabled = options?.enabled ?? true;
  const shouldLoad = enabled && !!userId;
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(shouldLoad);

  useEffect(() => {
    let cancelled = false;

    if (!shouldLoad || !userId) {
      setHasRole(false);
      setLoading(false);
      return () => { cancelled = true; };
    }

    setLoading(true);

    const loadRole = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: role,
        });

        if (cancelled) return;
        setHasRole(!error && !!data);
      } catch {
        if (cancelled) return;
        setHasRole(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadRole();

    return () => { cancelled = true; };
  }, [shouldLoad, userId, role]);

  return { hasRole, loading };
}
