"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  header_image_url: string | null;
  published: boolean;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  seo_og_image_url: string | null;
  author_id: string | null;
  sort_order: number;
  sources: { title: string; url: string }[] | null;
  key_takeaways: string[] | null;
  related_slugs: string[] | null;
  created_at: string;
  updated_at: string;
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as unknown as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as BlogPost | null;
    },
    enabled: !!slug,
  });
}

export function useAdjacentPosts(currentSlug: string) {
  return useQuery({
    queryKey: ["adjacent-posts", currentSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, published_at, header_image_url")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      const posts = data || [];
      const idx = posts.findIndex((p) => p.slug === currentSlug);
      return {
        previous: idx > 0 ? posts[idx - 1] : null,
        next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null,
      };
    },
    enabled: !!currentSlug,
  });
}

export function useRelatedPosts(slugs: string[] | null) {
  return useQuery({
    queryKey: ["related-posts", slugs],
    queryFn: async () => {
      if (!slugs?.length) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, header_image_url, published_at, seo_keywords, content")
        .eq("published", true)
        .in("slug", slugs);
      if (error) throw error;
      return data as unknown as BlogPost[];
    },
    enabled: !!slugs?.length,
  });
}
