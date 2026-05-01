import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { runSeoChecks, type PostDraft } from "@/lib/seo-check";

type SaveMode = "publish" | "draft";

interface ImportBody {
  post: PostDraft & { slug: string };
  mode: SaveMode;
  forceUpdate?: boolean;
}

// POST /api/admin/blog/import
export async function POST(req: NextRequest) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as ImportBody;
  const { post, mode, forceUpdate = false } = body;

  // ── Server-side re-validation ──────────────────────────────────────────────
  if (!post.title && !post.content) {
    return NextResponse.json(
      { error: 'At least one of "title" or "content" must be present' },
      { status: 400 }
    );
  }
  if (!post.slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // ── Check slug existence ───────────────────────────────────────────────────
  const { data: existing } = await admin
    .from("blog_posts")
    .select("id")
    .eq("slug", post.slug)
    .maybeSingle();

  if (existing && !forceUpdate) {
    return NextResponse.json(
      { error: "Slug already exists", existingPostId: existing.id },
      { status: 409 }
    );
  }

  const now = new Date().toISOString();

  const payload = {
    title: post.title ?? "",
    slug: post.slug,
    content: post.content ?? null,
    excerpt: post.excerpt ?? null,
    header_image_url: post.header_image_url ?? null,
    seo_title: post.seo_title ?? null,
    seo_description: post.seo_description ?? null,
    seo_focus_keyphrase: post.seo_focus_keyphrase ?? null,
    seo_keywords: post.seo_keywords ?? null,
    seo_og_image_url: post.seo_og_image_url ?? null,
    sources: post.sources ?? null,
    published: mode === "publish",
    published_at: mode === "publish" ? now : null,
    updated_at: now,
  };

  // ── Save with graceful fallback for missing seo_focus_keyphrase column ─────
  const trySave = async (data: typeof payload | Omit<typeof payload, "seo_focus_keyphrase">) => {
    if (existing && forceUpdate) {
      return admin
        .from("blog_posts")
        .update(data as never)
        .eq("id", existing.id)
        .select("id, slug, published")
        .single();
    }
    return admin
      .from("blog_posts")
      .insert(data as never)
      .select("id, slug, published")
      .single();
  };

  let { data: result, error } = await trySave(payload);

  // If the column doesn't exist yet, retry without seo_focus_keyphrase
  if (error?.message?.includes("seo_focus_keyphrase")) {
    const { seo_focus_keyphrase: _dropped, ...withoutKeyphrase } = payload;
    const retry = await trySave(withoutKeyphrase);
    result = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("[blog/import] save error:", error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }

  const seoReport = runSeoChecks(post);

  return NextResponse.json({
    id: result!.id,
    slug: result!.slug,
    published: result!.published,
    seoScore: { passing: seoReport.passing, total: seoReport.total },
    keyphraseDropped: error === null && !payload.seo_focus_keyphrase ? false : undefined,
  });
}
