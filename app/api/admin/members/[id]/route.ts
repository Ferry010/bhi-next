import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type AppRole = "admin" | "moderator" | "user";

async function requireAdmin(req: NextRequest) {
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

// PATCH /api/admin/members/[id] — change a member's role
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { role?: AppRole };
  const { role } = body;

  const validRoles: AppRole[] = ["admin", "moderator", "user"];
  if (!role || !validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { error } = await admin
    .from("user_roles")
    .upsert({ user_id: params.id, role }, { onConflict: "user_id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/members/[id] — revoke access (remove role) and delete auth user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prevent self-deletion
  if (params.id === caller.id) {
    return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Remove role first, then delete auth user
  await admin.from("user_roles").delete().eq("user_id", params.id);
  const { error } = await admin.auth.admin.deleteUser(params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
