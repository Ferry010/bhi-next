import type { Metadata } from "next";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";
import { estimateReadingTime } from "@/lib/readingTime";
import { ArrowRight, ArrowLeft } from "lucide-react";
import FAQSection from "@/components/FAQSection";

export const dynamic = "force-dynamic";

const FAQS = [
  {
    q: "What is a human-technology strategy?",
    a: "A human-technology strategy is a deliberate organizational approach that defines where human talent creates the most value and where technology should take over. Rather than adopting technology for its own sake, it aligns every tool, role, and process with a clear understanding of what makes the business irreplaceable.",
  },
  {
    q: "What is Brand Humanizing?",
    a: "Brand Humanizing is a strategic framework developed by Ferry Hoes and Jonathan Flores that helps organizations build sustainable competitive advantage by deliberately combining human talent and technology. It provides a structured approach to identify where human skills matter most and where automation should be deployed.",
  },
  {
    q: "How is Brand Humanizing different from an AI strategy?",
    a: "AI strategy focuses on which tools to adopt and how to implement them. Brand Humanizing operates one level above that: it defines what the organization is for, which capabilities are human, and how technology should serve that purpose. AI is one component. Brand Humanizing is the strategic architecture that makes every component work.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, seo_title, seo_description, excerpt, seo_og_image_url, header_image_url, slug")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    openGraph: {
      type: "article",
      // Only override when the editor set a custom OG image; otherwise the
      // file-based opengraph-image.tsx generates the image dynamically.
      ...(post.seo_og_image_url && {
        images: [{ url: post.seo_og_image_url }],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  // Adjacent posts
  const [{ data: prevPost }, { data: nextPost }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("title, slug")
      .eq("published", true)
      .lt("published_at", post.published_at)
      .order("published_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("blog_posts")
      .select("title, slug")
      .eq("published", true)
      .gt("published_at", post.published_at)
      .order("published_at", { ascending: true })
      .limit(1)
      .single(),
  ]);

  // Related posts
  const relatedSlugs: string[] = Array.isArray(post.related_slugs) ? post.related_slugs : [];
  const relatedPosts: BlogPost[] =
    relatedSlugs.length > 0
      ? (
          (
            await supabase
              .from("blog_posts")
              .select("*")
              .in("slug", relatedSlugs)
              .eq("published", true)
          ).data ?? []
        ) as unknown as BlogPost[]
      : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || post.excerpt,
    image: post.header_image_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: `https://brandhumanizing.com/blog/${post.slug}`,
    author: { "@type": "Person", name: "Ferry Hoes", url: "https://brandhumanizing.com/about" },
    publisher: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
  };

  const sources: { title: string; url: string }[] = Array.isArray(post.sources) ? post.sources as unknown as { title: string; url: string }[] : [];
  const keyTakeaways: string[] = Array.isArray(post.key_takeaways) ? post.key_takeaways as unknown as string[] : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="bg-secondary section-padding">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Blog", to: "/blog" },
                { label: post.title },
              ]}
            />
            {post.seo_keywords?.[0] && (
              <span className="text-accent text-caption font-heading font-semibold uppercase tracking-widest">
                {post.seo_keywords[0]}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-8">
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.content && (
                <span>· {estimateReadingTime(post.content)} min read</span>
              )}
            </div>
            {post.header_image_url && (
              <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
                <img
                  src={post.header_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container max-w-3xl">
            {keyTakeaways.length > 0 && (
              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-10">
                <p className="text-sm font-heading font-semibold text-accent uppercase tracking-widest mb-3">Key takeaways</p>
                <ul className="space-y-2">
                  {keyTakeaways.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-accent mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content || "") }}
            />

            {sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm font-heading font-semibold text-foreground mb-4">Sources</p>
                <ul className="space-y-2">
                  {sources.map((src, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        {src.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AuthorBio />

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-2 text-sm font-heading font-semibold text-foreground/60 hover:text-accent transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="line-clamp-1">{prevPost.title}</span>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-2 text-sm font-heading font-semibold text-foreground/60 hover:text-accent transition-colors text-right">
                  <span className="line-clamp-1">{nextPost.title}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="bg-cream section-padding">
            <div className="container max-w-5xl">
              <h2 className="text-display md:text-display-lg text-foreground mb-8">Related reading</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection faqs={FAQS} variant="light" jsonLd />

        <section className="bg-navy section-padding">
          <div className="container max-w-3xl text-center">
            <h2 className="text-display md:text-display-lg text-white mb-6">
              Ready to put this into practice?
            </h2>
            <Link href="/contact">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base">
                Talk to us →
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
