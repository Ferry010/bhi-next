"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";

export function useAdminAccess() {
  const auth = useAuth();
  const { hasRole: isAdmin, loading: roleLoading, error: roleError } = useUserRole(auth.user?.id, "admin", {
    enabled: !auth.loading && !!auth.user,
  });

  return {
    ...auth,
    isAdmin,
    roleLoading,
    roleError,
    loading: auth.loading || (!!auth.user && roleLoading),
  };
}
