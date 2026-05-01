// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckId =
  | "keyphrase-set"
  | "keyphrase-in-title"
  | "keyphrase-in-description"
  | "keyphrase-in-slug"
  | "keyphrase-in-first-p"
  | "keyphrase-in-h2"
  | "keyphrase-density"
  | "title-length"
  | "description-length"
  | "slug-length"
  | "content-length"
  | "has-header-image"
  | "has-og-image";

export type CheckStatus = "pass" | "warn" | "fail";

export type SeoCheck = {
  id: CheckId;
  label: string;
  status: CheckStatus;
  message: string;
};

export type SeoReport = {
  checks: SeoCheck[];
  passing: number;
  total: number;
};

export type PostDraft = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  header_image_url?: string | null;
  seo_title?: string;
  seo_description?: string;
  seo_focus_keyphrase?: string;
  seo_keywords?: string[];
  seo_og_image_url?: string | null;
  sources?: Array<{ title: string; url: string }>;
};

// ─── HTML utilities ───────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&[a-z\d]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFirstParagraph(html: string): string {
  const m = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(html);
  return m ? stripHtml(m[1]) : "";
}

export function extractH2s(html: string): string[] {
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    results.push(stripHtml(m[1]));
  }
  return results;
}

export function wordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).filter(Boolean).length : 0;
}

export function countPhraseOccurrences(text: string, phrase: string): number {
  if (!phrase.trim()) return 0;
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(escaped, "gi")) ?? []).length;
}

// ─── Slug / excerpt generators ────────────────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateExcerpt(content: string, maxLen = 160): string {
  const plain = stripHtml(content);
  if (plain.length <= maxLen) return plain;
  const cut = plain.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut) + "…";
}

// ─── SEO check runner ─────────────────────────────────────────────────────────

export function runSeoChecks(post: PostDraft): SeoReport {
  const checks: SeoCheck[] = [];

  const kp = (post.seo_focus_keyphrase ?? "").trim();
  const seoTitle = (post.seo_title ?? post.title ?? "").trim();
  const seoDesc = (post.seo_description ?? "").trim();
  const slug = (post.slug ?? "").trim();
  const content = post.content ?? "";
  const plainContent = stripHtml(content);
  const firstP = extractFirstParagraph(content);
  const h2s = extractH2s(content);
  const words = wordCount(plainContent);

  const noKp = !kp;
  const noKpMsg = "No focus keyphrase set";

  // ── 1. Focus keyphrase set ─────────────────────────────────────────────────
  checks.push({
    id: "keyphrase-set",
    label: "Focus keyphrase set",
    status: kp ? "pass" : "warn",
    message: kp ? `Keyphrase: "${kp}"` : "No focus keyphrase — add one for targeted SEO",
  });

  // ── 2. Keyphrase in SEO title ──────────────────────────────────────────────
  const kpInTitle = !noKp && seoTitle.toLowerCase().includes(kp.toLowerCase());
  checks.push({
    id: "keyphrase-in-title",
    label: "Keyphrase in SEO title",
    status: noKp ? "warn" : kpInTitle ? "pass" : "warn",
    message: noKp
      ? noKpMsg
      : kpInTitle
        ? "Keyphrase found in SEO title"
        : `"${kp}" not found in SEO title`,
  });

  // ── 3. Keyphrase in meta description ──────────────────────────────────────
  const kpInDesc = !noKp && seoDesc.toLowerCase().includes(kp.toLowerCase());
  checks.push({
    id: "keyphrase-in-description",
    label: "Keyphrase in meta description",
    status: noKp ? "warn" : kpInDesc ? "pass" : "warn",
    message: noKp
      ? noKpMsg
      : kpInDesc
        ? "Keyphrase found in meta description"
        : `"${kp}" not found in meta description`,
  });

  // ── 4. Keyphrase in slug ───────────────────────────────────────────────────
  const slugifiedKp = kp
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const kpInSlug = !noKp && (slug.includes(slugifiedKp) || slug.includes(kp.toLowerCase().replace(/\s+/g, "-")));
  checks.push({
    id: "keyphrase-in-slug",
    label: "Keyphrase in slug",
    status: noKp ? "warn" : kpInSlug ? "pass" : "warn",
    message: noKp
      ? noKpMsg
      : kpInSlug
        ? "Keyphrase found in slug"
        : `"${kp}" not found in slug`,
  });

  // ── 5. Keyphrase in first paragraph ───────────────────────────────────────
  const kpInFirstP = !noKp && firstP.toLowerCase().includes(kp.toLowerCase());
  checks.push({
    id: "keyphrase-in-first-p",
    label: "Keyphrase in opening paragraph",
    status: noKp ? "warn" : kpInFirstP ? "pass" : "warn",
    message: noKp
      ? noKpMsg
      : !firstP
        ? "No opening paragraph found"
        : kpInFirstP
          ? "Keyphrase found in opening paragraph"
          : `"${kp}" not in opening paragraph`,
  });

  // ── 6. Keyphrase in at least one H2 ───────────────────────────────────────
  const kpInH2 = !noKp && h2s.some((h) => h.toLowerCase().includes(kp.toLowerCase()));
  checks.push({
    id: "keyphrase-in-h2",
    label: "Keyphrase in an H2 heading",
    status: noKp ? "warn" : h2s.length === 0 ? "warn" : kpInH2 ? "pass" : "warn",
    message: noKp
      ? noKpMsg
      : h2s.length === 0
        ? "No H2 headings found in content"
        : kpInH2
          ? "Keyphrase found in an H2 heading"
          : `"${kp}" not found in any H2 heading`,
  });

  // ── 7. Keyphrase density ───────────────────────────────────────────────────
  if (noKp || words === 0) {
    checks.push({
      id: "keyphrase-density",
      label: "Keyphrase density",
      status: "warn",
      message: noKp ? noKpMsg : "No content to analyze",
    });
  } else {
    const occ = countPhraseOccurrences(plainContent, kp);
    const density = (occ / words) * 100;
    const pct = density.toFixed(1);
    let status: CheckStatus;
    let message: string;
    if (density < 0.5) {
      status = "warn";
      message = `Density is ${pct}% (${occ}× in ${words} words) — below the 0.5% minimum`;
    } else if (density > 2.5) {
      status = "warn";
      message = `Density is ${pct}% (${occ}× in ${words} words) — above the 2.5% maximum`;
    } else {
      status = "pass";
      message = `Density is ${pct}% — within the 0.5%–2.5% target`;
    }
    checks.push({ id: "keyphrase-density", label: "Keyphrase density", status, message });
  }

  // ── 8. SEO title length ────────────────────────────────────────────────────
  const titleLen = seoTitle.length;
  checks.push({
    id: "title-length",
    label: "SEO title length",
    status: !seoTitle
      ? "warn"
      : titleLen >= 50 && titleLen <= 60
        ? "pass"
        : "warn",
    message: !seoTitle
      ? "No SEO title set"
      : `${titleLen} characters — ${titleLen < 50 ? "too short" : titleLen > 60 ? "too long" : "ideal"} (50–60 ideal)`,
  });

  // ── 9. Meta description length ─────────────────────────────────────────────
  const descLen = seoDesc.length;
  checks.push({
    id: "description-length",
    label: "Meta description length",
    status: !seoDesc
      ? "warn"
      : descLen >= 140 && descLen <= 160
        ? "pass"
        : "warn",
    message: !seoDesc
      ? "No meta description set"
      : `${descLen} characters — ${descLen < 140 ? "too short" : descLen > 160 ? "too long" : "ideal"} (140–160 ideal)`,
  });

  // ── 10. Slug length ────────────────────────────────────────────────────────
  checks.push({
    id: "slug-length",
    label: "Slug length",
    status: !slug ? "warn" : slug.length <= 60 ? "pass" : "warn",
    message: !slug
      ? "No slug set"
      : `${slug.length} characters — ${slug.length > 60 ? "over the 60-character ideal" : "good length"}`,
  });

  // ── 11. Content word count ─────────────────────────────────────────────────
  checks.push({
    id: "content-length",
    label: "Content length",
    status: words >= 300 ? "pass" : "warn",
    message: `${words} words${words < 300 ? " — aim for at least 300" : ""}`,
  });

  // ── 12. Header image ───────────────────────────────────────────────────────
  checks.push({
    id: "has-header-image",
    label: "Header image",
    status: post.header_image_url ? "pass" : "warn",
    message: post.header_image_url
      ? "Header image URL provided"
      : "No header image — add one for visual impact",
  });

  // ── 13. OG image ───────────────────────────────────────────────────────────
  checks.push({
    id: "has-og-image",
    label: "OG / social image",
    status: post.seo_og_image_url ? "pass" : "warn",
    message: post.seo_og_image_url
      ? "OG image URL provided"
      : "No OG image — social shares won't have a custom image",
  });

  const passing = checks.filter((c) => c.status === "pass").length;
  return { checks, passing, total: checks.length };
}
