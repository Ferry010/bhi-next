"use client";

import { useEffect, useState, useCallback } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Mail, Clock, ShieldCheck, UserMinus, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AppRole = "admin" | "moderator" | "user";

type Member = {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | null;
  invited_at: string | null;
  confirmed: boolean;
  role: AppRole | null;
};

const ROLE_CONFIG: Record<AppRole, { label: string; pill: string }> = {
  admin:     { label: "Admin",     pill: "bg-primary/15 text-primary border-primary/25" },
  moderator: { label: "Moderator", pill: "bg-accent/15 text-accent border-accent/25" },
  user:      { label: "Member",    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
};

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

async function getToken(): Promise<string | null> {
  const supabase = createSupabaseBrowserClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

async function apiFetch(path: string, opts?: RequestInit) {
  const token = await getToken();
  return fetch(path, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...opts?.headers },
  });
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AppRole>("user");
  const [inviting, setInviting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/admin/members");
      const json = await res.json() as { members?: Member[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to load");
      setMembers(json.members ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load members");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadMembers(); }, [loadMembers]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      const res = await apiFetch("/api/admin/members", {
        method: "POST",
        body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
      });
      const json = await res.json() as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to send invite");
      toast.success(`Invite sent to ${inviteEmail.trim()}`);
      setInviteEmail("");
      void loadMembers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send invite");
    } finally {
      setInviting(false);
    }
  }

  async function handleRoleChange(memberId: string, role: AppRole) {
    setUpdatingId(memberId);
    try {
      const res = await apiFetch(`/api/admin/members/${memberId}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      const json = await res.json() as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to update role");
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role } : m));
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update role");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleRemove(member: Member) {
    if (!confirm(`Remove ${member.email ?? member.id} and delete their account?`)) return;
    setRemovingId(member.id);
    try {
      const res = await apiFetch(`/api/admin/members/${member.id}`, { method: "DELETE" });
      const json = await res.json() as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to remove");
      setMembers(prev => prev.filter(m => m.id !== member.id));
      toast.success("Member removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove member");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <div>
          <h1 className="font-heading font-bold text-xl text-foreground">Members</h1>
          <p className="text-sm text-muted-foreground">Invite people and manage their access.</p>
        </div>
      </div>

      {/* Invite form */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          Invite a new member
        </h2>
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="name@company.com"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            required
            className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Select value={inviteRole} onValueChange={v => setInviteRole(v as AppRole)}>
            <SelectTrigger className="w-full sm:w-36 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Member</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={inviting} className="h-9 gap-2">
            {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send invite
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          They&apos;ll receive an email with a link to set their own password.
        </p>
      </div>

      {/* Members table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {loading ? "Loading…" : `${members.length} member${members.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <Users className="w-8 h-8 opacity-30" />
            <p className="text-sm">No members yet. Send an invite above.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {members.map(member => (
              <div key={member.id} className="flex items-center gap-4 px-5 py-4">
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">
                    {(member.email ?? "?")[0].toUpperCase()}
                  </span>
                </div>

                {/* Email + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground truncate">
                      {member.email ?? "Unknown"}
                    </span>
                    {!member.confirmed && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-yellow-500/10 text-yellow-400 border-yellow-500/25">
                        <Clock className="w-2.5 h-2.5" />
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Joined {fmt(member.created_at)}
                    </span>
                    {member.last_sign_in_at && (
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Last seen {fmt(member.last_sign_in_at)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Current role badge */}
                {member.role && (
                  <span className={cn(
                    "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border",
                    ROLE_CONFIG[member.role].pill
                  )}>
                    {ROLE_CONFIG[member.role].label}
                  </span>
                )}

                {/* Role selector */}
                <Select
                  value={member.role ?? "user"}
                  onValueChange={v => handleRoleChange(member.id, v as AppRole)}
                  disabled={updatingId === member.id}
                >
                  <SelectTrigger className="w-32 h-8 text-xs">
                    {updatingId === member.id
                      ? <Loader2 className="w-3 h-3 animate-spin" />
                      : <SelectValue />
                    }
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Member</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(member)}
                  disabled={removingId === member.id}
                  className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  title="Remove member"
                >
                  {removingId === member.id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <UserMinus className="w-4 h-4" />
                  }
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
