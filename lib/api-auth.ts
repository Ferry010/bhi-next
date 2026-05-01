import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function requireAdmin(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;

  const admin = createAdminClient();
  const { data: { user }, error } = await admin.auth.getUser(token);
  if (error || !user) return null;

  const { data } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  return data ? user : null;
}
