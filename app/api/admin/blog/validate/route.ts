import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  runSeoChecks,
  generateSlug,
  generateExcerpt,
  type PostDraft,
} from "@/lib/seo-check";

// POST /api/admin/blog/validate
export async function POST(req: NextRequest) {
  const caller = await requireAdmin(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { rawJson?: string };
  if (!body.rawJson) {
    return NextResponse.json({ error: "rawJson is required" }, { status: 400 });
  }

  // ── 1. Parse JSON ──────────────────────────────────────────────────────────
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(body.rawJson) as Record<string, unknown>;
  } catch (e) {
    return NextResponse.json({
      parseError: true,
      error: `Invalid JSON: ${(e as Error).message}`,
    }, { status: 400 });
  }

  // ── 2. Schema validation ───────────────────────────────────────────────────
  const errors: string[] = [];

  const title = typeof raw.title === "string" ? raw.title.trim() : undefined;
  const content = typeof raw.content === "string" ? raw.content : undefined;

  if (!title && !content) {
    errors.push('At least one of "title" or "content" must be present');
  }

  // Slug: use provided, or generate from title, or error
  let slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
  if (!slug && title) {
    slug = generateSlug(title);
  } else if (!slug) {
    errors.push('Cannot generate slug: no title or slug provided');
  }

  // seo_title defaults to title
  const seoTitle =
    typeof raw.seo_title === "string"
      ? raw.seo_title.trim()
      : (title ?? "");

  // excerpt auto-generated from content if missing
  const excerpt =
    typeof raw.excerpt === "string"
      ? raw.excerpt.trim()
      : content
        ? generateExcerpt(content)
        : undefined;

  const post: PostDraft & { slug: string; _autoSlug?: boolean; _autoExcerpt?: boolean } = {
    title,
    slug,
    excerpt,
    content,
    header_image_url:
      typeof raw.header_image_url === "string" ? raw.header_image_url : null,
    seo_title: seoTitle || undefined,
    seo_description:
      typeof raw.seo_description === "string" ? raw.seo_description : undefined,
    seo_focus_keyphrase:
      typeof raw.seo_focus_keyphrase === "string"
        ? raw.seo_focus_keyphrase
        : undefined,
    seo_keywords: Array.isArray(raw.seo_keywords)
      ? (raw.seo_keywords as string[]).filter((k) => typeof k === "string")
      : undefined,
    seo_og_image_url:
      typeof raw.seo_og_image_url === "string" ? raw.seo_og_image_url : null,
    sources: Array.isArray(raw.sources)
      ? (raw.sources as Array<{ title: string; url: string }>).filter(
          (s) => typeof s?.title === "string" && typeof s?.url === "string"
        )
      : undefined,
    _autoSlug: !raw.slug && !!title,
    _autoExcerpt: !raw.excerpt && !!content,
  };

  // ── 3. Slug uniqueness check ───────────────────────────────────────────────
  let slugExists = false;
  let existingPostId: string | undefined;
  let existingPostTitle: string | undefined;

  if (slug) {
    const admin = createAdminClient();
    const { data } = await admin
      .from("blog_posts")
      .select("id, title")
      .eq("slug", slug)
      .maybeSingle();
    if (data) {
      slugExists = true;
      existingPostId = data.id;
      existingPostTitle = data.title;
    }
  }

  // ── 4. SEO checks ─────────────────────────────────────────────────────────
  const seoReport = runSeoChecks(post);

  return NextResponse.json({
    post,
    errors,
    seoReport,
    slugExists,
    existingPostId,
    existingPostTitle,
  });
}
