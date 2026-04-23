import type { Metadata } from "next";
import type { BlogPost } from "@/hooks/useBlogPosts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { createServerClient } from "@/lib/supabase/server";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays on technology, humanity, and organizations brave enough to take both seriously. Fresh thinking from the Institute.",
  openGraph: {
    images: [{ url: "/og/blog.jpg" }],
  },
};

export default async function BlogPage() {
  const supabase = createServerClient();
  const { data: rawPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  const posts = (rawPosts ?? []) as unknown as BlogPost[];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-secondary min-h-screen flex items-center relative">
          <div className="container max-w-4xl pt-28 md:pt-40 pb-16 md:pb-24">
            <Breadcrumb items={[{ label: "Media", to: "/media" }, { label: "Blog" }]} />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Blog</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              Fresh thinking. <span className="text-accent">Real opinions.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Essays and perspectives on technology, humanity, and the organizations brave enough to take both seriously.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-3 font-heading">
              No fluff, no gatekeeping. Just honest thinking from the Institute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
              <a href="#posts">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-11 md:px-8 md:h-12 text-sm md:text-base w-full sm:w-auto">
                  Start reading <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </a>
              <Link href="/podcast">
                <Button variant="outline" className="rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-6 h-11 md:px-8 md:h-12 text-sm md:text-base w-full sm:w-auto">
                  Listen to the podcast <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="posts" className="bg-card section-padding">
          <div className="container">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No posts published yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
