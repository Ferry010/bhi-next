"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle2,
  AlertTriangle,
  FileJson,
  Upload,
  Loader2,
  FileText,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeoReport, SeoCheck, PostDraft } from "@/lib/seo-check";

// ─── Types ────────────────────────────────────────────────────────────────────

type ValidatedPost = PostDraft & {
  slug: string;
  _autoSlug?: boolean;
  _autoExcerpt?: boolean;
};

type ValidationResult = {
  post: ValidatedPost;
  errors: string[];
  seoReport: SeoReport;
  slugExists: boolean;
  existingPostId?: string;
  existingPostTitle?: string;
};

type SaveMode = "publish" | "draft";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getToken() {
  const supabase = createSupabaseBrowserClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

async function authedFetch(path: string, body: unknown) {
  const token = await getToken();
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(body),
  });
}

// ─── SEO check row ────────────────────────────────────────────────────────────

function CheckRow({ check }: { check: SeoCheck }) {
  const icon =
    check.status === "pass" ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
    ) : check.status === "fail" ? (
      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
    );

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{check.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{check.message}</p>
      </div>
    </div>
  );
}

// ─── Score badge ──────────────────────────────────────────────────────────────

function ScoreBadge({ passing, total }: { passing: number; total: number }) {
  const pct = (passing / total) * 100;
  const color =
    pct >= 85
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
      : pct >= 60
        ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
        : "bg-destructive/15 text-destructive border-destructive/25";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border",
        color
      )}
    >
      {passing}/{total} checks passing
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ImportJsonPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rawJson, setRawJson] = useState("");
  const [validating, setValidating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);

  // Modal state
  const [slugModal, setSlugModal] = useState(false);
  const [warnModal, setWarnModal] = useState(false);
  const [pendingMode, setPendingMode] = useState<SaveMode>("publish");
  const [pendingForceUpdate, setPendingForceUpdate] = useState(false);

  // ── File upload ─────────────────────────────────────────────────────────────
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawJson(ev.target?.result as string ?? "");
      setResult(null);
      setParseError(null);
    };
    reader.readAsText(file);
  }, []);

  // ── Validate ────────────────────────────────────────────────────────────────
  const handleValidate = useCallback(async () => {
    if (!rawJson.trim()) {
      toast.error("Paste or upload JSON first");
      return;
    }
    setValidating(true);
    setParseError(null);
    setResult(null);
    try {
      const res = await authedFetch("/api/admin/blog/validate", { rawJson });
      const json = await res.json() as
        | ValidationResult
        | { parseError: boolean; error: string }
        | { error: string };

      if (!res.ok) {
        if ("parseError" in json && json.parseError) {
          setParseError(json.error);
        } else {
          toast.error("error" in json ? json.error : "Validation failed");
        }
        return;
      }
      setResult(json as ValidationResult);
    } catch {
      toast.error("Network error — could not reach the server");
    } finally {
      setValidating(false);
    }
  }, [rawJson]);

  // ── Save flow ───────────────────────────────────────────────────────────────
  const initSave = useCallback((mode: SaveMode) => {
    if (!result) return;
    setPendingMode(mode);
    setPendingForceUpdate(false);

    if (mode === "draft") {
      void doSave(mode, false);
      return;
    }

    // publish path — check for blockers
    if (result.slugExists) {
      setSlugModal(true);
      return;
    }
    if (result.seoReport.passing < result.seoReport.total) {
      setWarnModal(true);
      return;
    }
    void doSave(mode, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleSlugConfirm = useCallback(async () => {
    setSlugModal(false);
    const forceUpdate = true;
    setPendingForceUpdate(true);
    if (result && result.seoReport.passing < result.seoReport.total) {
      setWarnModal(true);
      return;
    }
    await doSave(pendingMode, forceUpdate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, pendingMode]);

  const handleWarnConfirm = useCallback(async () => {
    setWarnModal(false);
    await doSave(pendingMode, pendingForceUpdate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMode, pendingForceUpdate]);

  async function doSave(mode: SaveMode, forceUpdate: boolean) {
    if (!result) return;
    setSaving(true);
    try {
      const res = await authedFetch("/api/admin/blog/import", {
        post: result.post,
        mode,
        forceUpdate,
      });
      const json = await res.json() as
        | { id: string; slug: string; published: boolean }
        | { error: string };

      if (!res.ok) {
        toast.error("error" in json ? json.error : "Save failed");
        return;
      }

      const { slug } = json as { id: string; slug: string; published: boolean };
      if (mode === "publish") {
        toast.success("Post published!");
        router.push(`/blog/${slug}`);
      } else {
        toast.success("Saved as draft");
        router.push("/admin/dashboard");
      }
    } catch {
      toast.error("Network error — could not save the post");
    } finally {
      setSaving(false);
    }
  }

  const canSave = result && result.errors.length === 0;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileJson className="w-6 h-6 text-primary" />
        <div>
          <h1 className="font-heading font-bold text-xl text-foreground">
            Import blog post from JSON
          </h1>
          <p className="text-sm text-muted-foreground">
            Paste or upload a JSON file, validate, then save.
          </p>
        </div>
      </div>

      {/* Input card */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">JSON input</span>
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload .json
            </Button>
            {fileName && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileText className="w-3 h-3" />
                {fileName}
              </span>
            )}
          </div>
        </div>

        <textarea
          value={rawJson}
          onChange={(e) => {
            setRawJson(e.target.value);
            setResult(null);
            setParseError(null);
          }}
          placeholder={`{\n  "title": "My post title",\n  "slug": "my-post-title",\n  "content": "<p>Full HTML content...</p>",\n  "seo_focus_keyphrase": "brand humanizing",\n  "seo_title": "My SEO Title · BHI",\n  "seo_description": "A 140–160 char meta description..."\n}`}
          rows={14}
          spellCheck={false}
          className="w-full resize-y rounded-lg border border-input bg-background p-3 text-sm font-jetbrains text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {parseError && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive font-mono">{parseError}</p>
          </div>
        )}

        <Button
          onClick={handleValidate}
          disabled={validating || !rawJson.trim()}
          className="gap-2"
        >
          {validating
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <RotateCcw className="w-4 h-4" />
          }
          {validating ? "Validating…" : "Validate"}
        </Button>
      </div>

      {/* Validation report */}
      {result && (
        <>
          {/* Schema errors */}
          {result.errors.length > 0 && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 space-y-1">
              <p className="text-sm font-semibold text-destructive">Schema errors</p>
              {result.errors.map((e) => (
                <p key={e} className="text-sm text-destructive/80">• {e}</p>
              ))}
            </div>
          )}

          {/* Slug conflict warning */}
          {result.slugExists && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-400">Slug already exists</p>
                <p className="text-xs text-amber-400/80 mt-0.5">
                  A post with slug <code className="font-mono">/{result.post.slug}</code> exists
                  {result.existingPostTitle ? ` ("${result.existingPostTitle}")` : ""}.
                  Saving will update that post.
                </p>
              </div>
            </div>
          )}

          {/* Post preview */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Post preview
            </p>
            <div className="space-y-1.5">
              <h2 className="font-heading font-bold text-lg text-foreground leading-snug">
                {result.post.title ?? <span className="text-muted-foreground italic">No title</span>}
              </h2>
              <p className="text-sm text-primary font-mono">
                /blog/{result.post.slug}
                {result.post._autoSlug && (
                  <span className="ml-2 text-amber-400 font-sans text-xs">(auto-generated)</span>
                )}
              </p>
              {result.post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {result.post.excerpt}
                  {result.post._autoExcerpt && (
                    <span className="ml-1 text-amber-400 text-xs">(auto-generated)</span>
                  )}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                result.post.seo_focus_keyphrase && `🎯 ${result.post.seo_focus_keyphrase}`,
                result.post.seo_keywords?.length &&
                  `🏷 ${result.post.seo_keywords.length} keyword${result.post.seo_keywords.length !== 1 ? "s" : ""}`,
                result.post.sources?.length &&
                  `📚 ${result.post.sources.length} source${result.post.sources.length !== 1 ? "s" : ""}`,
                result.post.header_image_url && "🖼 Header image",
                result.post.seo_og_image_url && "📣 OG image",
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag as string}
                    className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          {/* SEO report */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">SEO analysis</p>
              <ScoreBadge
                passing={result.seoReport.passing}
                total={result.seoReport.total}
              />
            </div>
            <div className="px-5 py-2">
              {result.seoReport.checks.map((check) => (
                <CheckRow key={check.id} check={check} />
              ))}
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              disabled={!canSave || saving}
              onClick={() => initSave("draft")}
              className="border-border text-foreground hover:bg-secondary"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              Save as draft
            </Button>
            <Button
              disabled={!canSave || saving}
              onClick={() => initSave("publish")}
              className="bg-accent text-accent-foreground hover:brightness-110"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              Save and publish
            </Button>
            {!canSave && result.errors.length > 0 && (
              <p className="text-xs text-destructive">
                Fix schema errors before saving
              </p>
            )}
          </div>
        </>
      )}

      {/* ── Slug conflict modal ──────────────────────────────────────────────── */}
      <Dialog open={slugModal} onOpenChange={setSlugModal}>
        <DialogContent className="admin-dark">
          <DialogHeader>
            <DialogTitle>Slug already exists</DialogTitle>
            <DialogDescription>
              A post with the slug{" "}
              <code className="font-mono text-primary">/{result?.post.slug}</code> already
              exists
              {result?.existingPostTitle ? ` — "${result.existingPostTitle}"` : ""}.
              Do you want to update it?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSlugModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSlugConfirm}>Update existing post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── SEO warnings modal ───────────────────────────────────────────────── */}
      <Dialog open={warnModal} onOpenChange={setWarnModal}>
        <DialogContent className="admin-dark">
          <DialogHeader>
            <DialogTitle>Publish with SEO warnings?</DialogTitle>
            <DialogDescription>
              {result && (
                <>
                  This post passes {result.seoReport.passing}/{result.seoReport.total} SEO checks.
                  The remaining {result.seoReport.total - result.seoReport.passing} check
                  {result.seoReport.total - result.seoReport.passing !== 1 ? "s" : ""} have
                  warnings. You can publish now and improve later.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setWarnModal(false)}>
              Go back
            </Button>
            <Button onClick={handleWarnConfirm}>Publish anyway</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
