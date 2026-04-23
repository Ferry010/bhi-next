"use client";

import Link from "next/link";
import { useAdminPosts, useDeletePost, useUpdatePost } from "@/hooks/useAdminPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenSquare, Trash2, Eye, EyeOff, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { data: posts, isLoading } = useAdminPosts();
  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();

  const togglePublish = async (id: string, published: boolean) => {
    await updatePost.mutateAsync({
      id,
      published: !published,
      ...(!published ? { published_at: new Date().toISOString() } : {}),
    });
    toast(!published ? "Published" : "Unpublished");
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deletePost.mutateAsync(id);
    toast("Post deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-foreground">Blog Posts</h1>
        <Link href="/admin/posts/new">
          <Button className="rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:brightness-110 transition-all">
            <Plus className="w-4 h-4 mr-1.5" />New Post
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading…</div>
      ) : !posts?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          No posts yet. Create your first one!
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground truncate">{post.title}</h3>
                <p className="text-sm text-muted-foreground truncate">/blog/{post.slug}</p>
              </div>
              <Badge
                variant="secondary"
                className={post.published
                  ? "bg-primary/15 text-primary border-primary/20"
                  : "bg-secondary text-muted-foreground border-border"
                }
              >
                {post.published ? "Published" : "Draft"}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => togglePublish(post.id, post.published)}
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Link href={`/admin/posts/${post.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <PenSquare className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(post.id, post.title)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
