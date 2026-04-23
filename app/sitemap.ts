import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://brandhumanizing.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/the-method`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learning`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/learning/inspiration-session`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learning/full-day-course`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learning/multi-day-programme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learning/online-course`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/learning/ai-literacy-certificate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work-with-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/work-with-us/audit-and-brainstorm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work-with-us/brand-humanizing-roadmap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work-with-us/organisation-wide-implementation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work-with-us/handover`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/our-story`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/podcast`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/media`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/assessment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/humantouch`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/no-cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Fetch all published blog post slugs — wrapped in try/catch so a network
  // failure at build time doesn't break the entire sitemap generation.
  let posts: { slug: string; updated_at: string }[] = [];
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    posts = data || [];
  } catch {
    // silently skip dynamic blog routes if DB is unreachable at build time
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
