"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useBlogPosts } from "@/hooks/useBlogPosts";

export default function BlogPodcast() {
  const { ref, isVisible } = useScrollReveal();
  const { data: posts, isLoading } = useBlogPosts();

  const latestPosts = posts?.slice(0, 3) ?? [];

  if (!isLoading && latestPosts.length === 0) return null;

  return (
    <section ref={ref} className="bg-white section-padding">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4">
          <div>
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Fresh thinking</span>
            <h2 className="text-display md:text-display-lg text-foreground mt-4">From our blog</h2>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-6">
              See all content →
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {latestPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] overflow-hidden hover-lift transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-full h-36 md:h-44 bg-gradient-to-br from-primary/10 to-accent/5 overflow-hidden">
                  {post.header_image_url && (
                    <img
                      src={post.header_image_url}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5 md:p-6">
                  {post.seo_keywords?.[0] && (
                    <span className="text-caption font-heading font-semibold text-accent uppercase tracking-wide">{post.seo_keywords[0]}</span>
                  )}
                  <h3 className="font-heading font-bold text-sm md:text-base text-foreground mt-2 mb-2 md:mb-3 leading-snug group-hover:text-accent transition-colors">{post.title}</h3>
                  {post.published_at && (
                    <span className="text-caption text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No posts published yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
}
