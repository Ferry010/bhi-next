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

// GET /api/admin/members — list all members with their roles
export async function GET(req: NextRequest) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  const [{ data: authUsers, error: usersError }, { data: roles }] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from("user_roles").select("user_id, role"),
  ]);

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const roleMap = new Map<string, AppRole>(
    (roles ?? []).map((r) => [r.user_id, r.role as AppRole])
  );

  const members = (authUsers?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    invited_at: u.invited_at ?? null,
    confirmed: !!u.email_confirmed_at,
    role: roleMap.get(u.id) ?? null,
  }));

  return NextResponse.json({ members });
}

// POST /api/admin/members — invite a new member
export async function POST(req: NextRequest) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { email?: string; role?: AppRole };
  const { email, role } = body;

  if (!email || !role) {
    return NextResponse.json({ error: "email and role are required" }, { status: 400 });
  }

  const validRoles: AppRole[] = ["admin", "moderator", "user"];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { intended_role: role },
    redirectTo: `${siteUrl}/invite`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: { id: data.user.id, email: data.user.email } });
}
