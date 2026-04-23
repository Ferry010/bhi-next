"use client";

import { useEffect, useState, useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Inbox,
  Clock,
  CheckCircle2,
  Circle,
  ArrowLeft,
  User,
  Mail,
  CalendarDays,
  MessageSquare,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type FormSubmission = {
  id: string;
  form_type: string;
  data: Record<string, unknown>;
  created_at: string;
  status: string;
  assigned_to: string | null;
  notes: string | null;
};

const STATUSES = ["new", "in_progress", "closed"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ElementType; color: string; pillClass: string }> = {
  new: { label: "New", icon: Circle, color: "text-primary", pillClass: "bg-primary/15 text-primary border-primary/25" },
  in_progress: { label: "In Progress", icon: Clock, color: "text-accent", pillClass: "bg-accent/15 text-accent border-accent/25" },
  closed: { label: "Closed", icon: CheckCircle2, color: "text-emerald-400", pillClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
};

const ASSIGNEES = ["Ferry", "Jonathan", "Unassigned"] as const;

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  newsletter: "Newsletter",
  book_request: "Book Request",
  boss_referral: "Boss Referral",
  lead_magnet: "Lead Magnet",
  assessment: "Assessment",
};

const TYPE_COLORS: Record<string, string> = {
  contact: "bg-primary/15 text-primary",
  newsletter: "bg-emerald-500/15 text-emerald-400",
  book_request: "bg-violet-500/15 text-violet-400",
  boss_referral: "bg-accent/15 text-accent",
  lead_magnet: "bg-pink-500/15 text-pink-400",
  assessment: "bg-indigo-500/15 text-indigo-400",
};

function extractKeyFields(data: Record<string, unknown>) {
  return {
    email: (data.email as string) || (data.bossEmail as string) || undefined,
    name: (data.name as string) || (data.bossName as string) || undefined,
    message: (data.message as string) || (data.looking_for as string) || undefined,
  };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setSubmissions((data as FormSubmission[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (typeFilter !== "all" && s.form_type !== typeFilter) return false;
      return true;
    });
  }, [submissions, statusFilter, typeFilter]);

  const statusCounts = useMemo(() => {
    const counts = { all: submissions.length, new: 0, in_progress: 0, closed: 0 };
    submissions.forEach((s) => {
      if (s.status in counts) counts[s.status as Status]++;
    });
    return counts;
  }, [submissions]);

  const selected = submissions.find((s) => s.id === selectedId) || null;

  const updateSubmission = async (id: string, updates: Partial<FormSubmission>) => {
    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("form_submissions")
      .update(updates as never)
      .eq("id", id);
    if (error) {
      toast.error("Failed to update");
    } else {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
      toast.success("Updated");
    }
    setSaving(false);
  };

  useEffect(() => {
    if (selected) setNoteDraft(selected.notes || "");
  }, [selected?.id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Inbox className="w-6 h-6 text-primary" /> Inbox
        </h1>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px] h-8 text-xs bg-card border-border text-foreground">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All types</SelectItem>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-1 mb-4">
        {(["all", ...STATUSES] as const).map((s) => {
          const isActive = statusFilter === s;
          const config = s !== "all" ? STATUS_CONFIG[s] : null;
          const Icon = config?.icon || Inbox;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                isActive
                  ? s === "all"
                    ? "bg-foreground/10 text-foreground border-foreground/20"
                    : config!.pillClass
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {s === "all" ? "All" : config!.label}
              <span className="ml-0.5 opacity-70">{statusCounts[s]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 gap-0 rounded-xl border border-border overflow-hidden min-h-0">
        <div
          className={cn(
            "flex flex-col border-r border-border overflow-y-auto bg-card",
            selected ? "w-[380px] hidden md:flex" : "flex-1"
          )}
        >
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-12 text-sm">No submissions.</p>
          ) : (
            filtered.map((sub) => {
              const { email, name, message } = extractKeyFields(sub.data);
              const config = STATUS_CONFIG[sub.status as Status] || STATUS_CONFIG.new;
              const isSelected = selectedId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedId(sub.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-border transition-colors",
                    isSelected
                      ? "bg-primary/10 border-l-2 border-l-primary"
                      : "hover:bg-secondary/50",
                    sub.status === "new" && !isSelected && "bg-primary/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {sub.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" style={{ boxShadow: "0 0 6px hsl(185 30% 46% / 0.5)" }} />
                        )}
                        <span className="font-medium text-sm text-foreground truncate">
                          {name || email || "Anonymous"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 border-0", TYPE_COLORS[sub.form_type])}>
                          {TYPE_LABELS[sub.form_type] || sub.form_type}
                        </Badge>
                        {sub.assigned_to && (
                          <span className="flex items-center gap-0.5">
                            <User className="w-3 h-3" /> {sub.assigned_to}
                          </span>
                        )}
                      </div>
                      {message && (
                        <p className="text-xs text-muted-foreground truncate">{message}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[11px] text-muted-foreground">{timeAgo(sub.created_at)}</span>
                      <config.icon className={cn("w-3.5 h-3.5", config.color)} />
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {selected && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-background">
            <div className="sticky top-0 bg-card z-10 border-b border-border px-5 py-3 flex items-center gap-3">
              <button
                onClick={() => setSelectedId(null)}
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h2 className="font-heading font-semibold text-foreground">
                  {extractKeyFields(selected.data).name || "Anonymous"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {new Date(selected.created_at).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Status
                  </label>
                  <Select
                    value={selected.status}
                    onValueChange={(val) => updateSubmission(selected.id, { status: val })}
                    disabled={saving}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          <span className="flex items-center gap-1.5">
                            {(() => { const I = STATUS_CONFIG[s].icon; return <I className={cn("w-3.5 h-3.5", STATUS_CONFIG[s].color)} />; })()}
                            {STATUS_CONFIG[s].label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" /> Assigned to
                  </label>
                  <Select
                    value={selected.assigned_to || "Unassigned"}
                    onValueChange={(val) =>
                      updateSubmission(selected.id, {
                        assigned_to: val === "Unassigned" ? null : val,
                      })
                    }
                    disabled={saving}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {ASSIGNEES.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
                  <MessageSquare className="w-3 h-3" /> Submission Details
                </h3>
                <div className="rounded-xl border border-border bg-card divide-y divide-border">
                  {Object.entries(selected.data).map(([key, value]) => {
                    if (value === null || value === undefined || value === "") return null;
                    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
                    return (
                      <div key={key} className="flex px-4 py-2.5">
                        <span className="text-xs font-medium text-muted-foreground w-32 shrink-0">{label}</span>
                        <span className="text-sm text-foreground break-all">{String(value)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> Internal Notes
                </h3>
                <Textarea
                  placeholder="Add internal notes about this submission..."
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  className="min-h-[80px] text-sm resize-none bg-card border-border text-foreground"
                />
                <Button
                  size="sm"
                  variant="outline"
                  disabled={saving || noteDraft === (selected.notes || "")}
                  onClick={() => updateSubmission(selected.id, { notes: noteDraft })}
                  className="text-xs border-border text-foreground hover:bg-secondary"
                >
                  Save Notes
                </Button>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                {selected.status === "new" && (
                  <Button
                    size="sm"
                    onClick={() => updateSubmission(selected.id, { status: "in_progress" })}
                    disabled={saving}
                    className="bg-accent text-accent-foreground hover:brightness-110 text-xs"
                  >
                    <Clock className="w-3.5 h-3.5 mr-1" /> Mark In Progress
                  </Button>
                )}
                {selected.status !== "closed" && (
                  <Button
                    size="sm"
                    onClick={() => updateSubmission(selected.id, { status: "closed" })}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Close
                  </Button>
                )}
                {selected.status === "closed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateSubmission(selected.id, { status: "new" })}
                    disabled={saving}
                    className="text-xs border-border text-foreground"
                  >
                    Reopen
                  </Button>
                )}
                {extractKeyFields(selected.data).email && (
                  <a href={`mailto:${extractKeyFields(selected.data).email}`}>
                    <Button size="sm" variant="outline" className="text-xs border-border text-foreground">
                      <Mail className="w-3.5 h-3.5 mr-1" /> Reply via Email
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
