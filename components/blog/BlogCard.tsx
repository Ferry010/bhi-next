import Link from "next/link";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { estimateReadingTime } from "@/lib/readingTime";

export default function BlogCard({ post }: { post: BlogPost; index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-secondary rounded-3xl overflow-hidden hover-lift transition-all duration-300">
        <div className="w-full h-44 md:h-52 bg-gradient-to-br from-primary/10 to-accent/5 overflow-hidden">
          {post.header_image_url && (
            <img
              src={post.header_image_url}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        <div className="p-6">
          {post.seo_keywords?.[0] && (
            <span className="text-caption font-heading font-semibold text-accent uppercase tracking-wide">
              {post.seo_keywords[0]}
            </span>
          )}
          <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mt-2 mb-3 leading-snug group-hover:text-accent transition-colors line-clamp-3">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
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
        </div>
      </article>
    </Link>
  );
}
