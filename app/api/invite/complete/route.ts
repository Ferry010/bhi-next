import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type AppRole = "admin" | "moderator" | "user";

// POST /api/invite/complete
// Called after the user verifies their invite OTP and sets a password.
// Uses their access token to read intended_role from metadata and insert into user_roles.
export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: { user }, error } = await admin.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const intendedRole = (user.user_metadata?.intended_role as AppRole | undefined) ?? "user";
  const validRoles: AppRole[] = ["admin", "moderator", "user"];
  const role: AppRole = validRoles.includes(intendedRole) ? intendedRole : "user";

  const { error: roleError } = await admin
    .from("user_roles")
    .upsert({ user_id: user.id, role }, { onConflict: "user_id" });

  if (roleError) {
    return NextResponse.json({ error: roleError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, role });
}
