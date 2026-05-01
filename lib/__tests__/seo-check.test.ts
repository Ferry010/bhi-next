import { describe, it, expect } from "vitest";
import {
  stripHtml,
  extractFirstParagraph,
  extractH2s,
  wordCount,
  countPhraseOccurrences,
  generateSlug,
  generateExcerpt,
  runSeoChecks,
  type PostDraft,
} from "../seo-check";

// ─── stripHtml ────────────────────────────────────────────────────────────────
describe("stripHtml", () => {
  it("removes simple tags", () => {
    expect(stripHtml("<p>Hello world</p>")).toBe("Hello world");
  });
  it("removes nested tags", () => {
    expect(stripHtml("<h2><strong>Title</strong></h2>")).toBe("Title");
  });
  it("decodes common HTML entities", () => {
    expect(stripHtml("AT&amp;T &mdash; &nbsp;yes")).toContain("AT&T");
    expect(stripHtml("&lt;b&gt;")).toContain("<b>");
  });
  it("collapses whitespace", () => {
    expect(stripHtml("<p>foo</p>  <p>bar</p>")).toBe("foo bar");
  });
  it("removes style and script blocks", () => {
    const html = "<style>body{color:red}</style><p>text</p><script>alert(1)</script>";
    expect(stripHtml(html)).toBe("text");
  });
});

// ─── extractFirstParagraph ────────────────────────────────────────────────────
describe("extractFirstParagraph", () => {
  it("extracts text from first <p>", () => {
    const html = "<p>First para</p><p>Second para</p>";
    expect(extractFirstParagraph(html)).toBe("First para");
  });
  it("returns empty string when no <p>", () => {
    expect(extractFirstParagraph("<h1>Title only</h1>")).toBe("");
  });
  it("strips inner tags", () => {
    expect(extractFirstParagraph("<p><strong>Bold</strong> text</p>")).toBe("Bold text");
  });
});

// ─── extractH2s ───────────────────────────────────────────────────────────────
describe("extractH2s", () => {
  it("extracts all H2 texts", () => {
    const html = "<h2>First</h2><p>body</p><h2>Second</h2>";
    expect(extractH2s(html)).toEqual(["First", "Second"]);
  });
  it("returns empty array when no H2s", () => {
    expect(extractH2s("<h1>Only H1</h1>")).toEqual([]);
  });
  it("strips inner tags from H2", () => {
    expect(extractH2s("<h2><em>Italic heading</em></h2>")).toEqual(["Italic heading"]);
  });
});

// ─── wordCount ────────────────────────────────────────────────────────────────
describe("wordCount", () => {
  it("counts words correctly", () => {
    expect(wordCount("one two three")).toBe(3);
  });
  it("returns 0 for empty string", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("   ")).toBe(0);
  });
  it("handles extra whitespace", () => {
    expect(wordCount("  one   two  ")).toBe(2);
  });
});

// ─── countPhraseOccurrences ───────────────────────────────────────────────────
describe("countPhraseOccurrences", () => {
  it("counts single occurrences", () => {
    expect(countPhraseOccurrences("brand humanizing is great", "brand humanizing")).toBe(1);
  });
  it("counts multiple occurrences", () => {
    expect(countPhraseOccurrences("cat cat cat", "cat")).toBe(3);
  });
  it("is case-insensitive", () => {
    expect(countPhraseOccurrences("Brand Humanizing", "brand humanizing")).toBe(1);
  });
  it("returns 0 for empty phrase", () => {
    expect(countPhraseOccurrences("some text", "")).toBe(0);
  });
});

// ─── generateSlug ─────────────────────────────────────────────────────────────
describe("generateSlug", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });
  it("removes special characters", () => {
    expect(generateSlug("What's New? (2024)")).toBe("what-s-new-2024");
  });
  it("strips leading and trailing hyphens", () => {
    expect(generateSlug("  Leading and trailing  ")).toBe("leading-and-trailing");
  });
  it("collapses multiple separators", () => {
    expect(generateSlug("one -- two --- three")).toBe("one-two-three");
  });
});

// ─── generateExcerpt ──────────────────────────────────────────────────────────
describe("generateExcerpt", () => {
  it("strips HTML tags", () => {
    expect(generateExcerpt("<p>Plain text here</p>")).toBe("Plain text here");
  });
  it("returns full text if under maxLen", () => {
    expect(generateExcerpt("<p>Short</p>")).toBe("Short");
  });
  it("truncates at word boundary and appends ellipsis", () => {
    const words = Array.from({ length: 50 }, (_, i) => `word${i}`).join(" ");
    const excerpt = generateExcerpt(`<p>${words}</p>`);
    expect(excerpt.endsWith("…")).toBe(true);
    expect(excerpt.length).toBeLessThanOrEqual(161); // 160 + ellipsis char
  });
});

// ─── runSeoChecks ─────────────────────────────────────────────────────────────
describe("runSeoChecks", () => {
  const goodPost: PostDraft = {
    title: "Brand Humanizing in the Modern Age",
    slug: "brand-humanizing-modern-age",
    content: Array.from({ length: 60 }, (_, i) =>
      `<p>${i === 0 ? "Brand humanizing is the future of marketing." : `Word ${i} makes content longer brand humanizing again.`}</p>`
    ).join("") +
      "<h2>Why brand humanizing matters</h2><p>Because it works.</p>",
    seo_title: "Brand Humanizing in the Modern Age · BHI",
    seo_description:
      "Discover how brand humanizing transforms marketing strategy. Learn the key principles that make brands more human and connected to their audience today.",
    seo_focus_keyphrase: "brand humanizing",
    header_image_url: "https://example.com/image.jpg",
    seo_og_image_url: "https://example.com/og.jpg",
  };

  it("returns 13 total checks", () => {
    const { total } = runSeoChecks(goodPost);
    expect(total).toBe(13);
  });

  it("scores well for a complete post", () => {
    const { passing, total } = runSeoChecks(goodPost);
    expect(passing).toBeGreaterThan(8);
    expect(total).toBe(13);
  });

  it("warns when no focus keyphrase is set", () => {
    const { checks } = runSeoChecks({ ...goodPost, seo_focus_keyphrase: undefined });
    const kpCheck = checks.find((c) => c.id === "keyphrase-set");
    expect(kpCheck?.status).toBe("warn");
  });

  it("warns on short content (<300 words)", () => {
    const { checks } = runSeoChecks({ ...goodPost, content: "<p>Short post.</p>" });
    const wc = checks.find((c) => c.id === "content-length");
    expect(wc?.status).toBe("warn");
  });

  it("warns when SEO title is too long", () => {
    const { checks } = runSeoChecks({
      ...goodPost,
      seo_title: "A".repeat(70),
    });
    const tl = checks.find((c) => c.id === "title-length");
    expect(tl?.status).toBe("warn");
  });

  it("warns when meta description is too short", () => {
    const { checks } = runSeoChecks({ ...goodPost, seo_description: "Short." });
    const dl = checks.find((c) => c.id === "description-length");
    expect(dl?.status).toBe("warn");
  });

  it("warns when slug is longer than 60 chars", () => {
    const { checks } = runSeoChecks({ ...goodPost, slug: "a".repeat(65) });
    const sl = checks.find((c) => c.id === "slug-length");
    expect(sl?.status).toBe("warn");
  });

  it("warns when no header image", () => {
    const { checks } = runSeoChecks({ ...goodPost, header_image_url: null });
    const hi = checks.find((c) => c.id === "has-header-image");
    expect(hi?.status).toBe("warn");
  });

  it("warns when keyphrase not in SEO title", () => {
    const { checks } = runSeoChecks({ ...goodPost, seo_title: "Something Else Entirely" });
    const kt = checks.find((c) => c.id === "keyphrase-in-title");
    expect(kt?.status).toBe("warn");
  });

  it("detects keyphrase in slug correctly", () => {
    const { checks } = runSeoChecks({ ...goodPost, slug: "brand-humanizing-modern-age" });
    const ks = checks.find((c) => c.id === "keyphrase-in-slug");
    expect(ks?.status).toBe("pass");
  });

  it("warns when keyphrase not in slug", () => {
    const { checks } = runSeoChecks({ ...goodPost, slug: "completely-different-slug" });
    const ks = checks.find((c) => c.id === "keyphrase-in-slug");
    expect(ks?.status).toBe("warn");
  });
});
