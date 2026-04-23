"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import type { BlogPost } from "./useBlogPosts";

export function useAdminPosts() {
  const { user, isAdmin, loading } = useAdminAccess();

  return useQuery({
    queryKey: ["admin-posts", user?.id],
    enabled: !loading && !!user && isAdmin,
    retry: false,
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as unknown as BlogPost[];
    },
  });
}

export function useAdminPost(id: string) {
  const { user, isAdmin, loading } = useAdminAccess();

  return useQuery({
    queryKey: ["admin-post", id, user?.id],
    enabled: !loading && !!user && isAdmin && !!id,
    retry: false,
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as BlogPost;
    },
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(post as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates as never)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });
}
