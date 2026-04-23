"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminPost, useCreatePost, useUpdatePost } from "@/hooks/useAdminPosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SEOFields from "@/components/admin/SEOFields";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Eye, Loader2, Plus, Trash2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PostEditor({ id }: { id?: string }) {
  const router = useRouter();
  const isEditing = !!id && id !== "new";
  const { data: existing, isLoading } = useAdminPost(isEditing ? id : "");
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [sources, setSources] = useState<{ title: string; url: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setExcerpt(existing.excerpt || "");
      setContent(existing.content || "");
      setHeaderImage(existing.header_image_url);
      setSeoTitle(existing.seo_title || "");
      setSeoDescription(existing.seo_description || "");
      setSeoKeywords((existing.seo_keywords || []).join(", "));
      setSources(Array.isArray(existing.sources) ? (existing.sources as { title: string; url: string }[]) : []);
      setAutoSlug(false);
    }
  }, [existing]);

  useEffect(() => {
    if (autoSlug && !isEditing) setSlug(slugify(title));
  }, [title, autoSlug, isEditing]);

  const handleSave = async (publish?: boolean) => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const payload = {
      title,
      slug,
      content,
      excerpt,
      header_image_url: headerImage,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_keywords: seoKeywords.split(",").map((k) => k.trim()).filter(Boolean),
      sources: sources.filter((s) => s.title.trim() || s.url.trim()),
      ...(publish !== undefined
        ? { published: publish, ...(publish ? { published_at: new Date().toISOString() } : {}) }
        : {}),
    };

    try {
      if (isEditing && id) {
        await updatePost.mutateAsync({ id, ...payload });
        toast("Post updated");
      } else {
        const result = await createPost.mutateAsync(payload);
        toast("Post created");
        router.replace(`/admin/posts/${(result as { id: string }).id}`);
      }
    } catch (err: unknown) {
      toast.error("Error: " + (err as Error).message);
    }
    setSaving(false);
  };

  if (isEditing && isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-foreground">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-lg font-heading font-semibold border-border text-foreground hover:bg-secondary"
            onClick={() => handleSave(false)}
            disabled={saving}
          >
            Save Draft
          </Button>
          <Button
            className="rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:brightness-110"
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Eye className="w-4 h-4 mr-1.5" />}
            Publish
          </Button>
        </div>
      </div>

      <ImageUpload value={headerImage} onChange={setHeaderImage} />

      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="text-lg font-heading font-semibold bg-card border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="slug" className="text-foreground">URL Slug</Label>
          {!isEditing && (
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => setAutoSlug(!autoSlug)}
            >
              {autoSlug ? "Edit manually" : "Auto-generate"}
            </button>
          )}
        </div>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
          placeholder="url-slug"
          className="bg-card border-border text-foreground"
        />
        <p className="text-xs text-muted-foreground">/blog/{slug || "…"}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-foreground">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A short summary for cards and social sharing"
          rows={2}
          className="bg-card border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Content</Label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-foreground">Sources</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg gap-1.5 border-border text-foreground hover:bg-secondary"
            onClick={() => setSources([...sources, { title: "", url: "" }])}
          >
            <Plus className="w-3.5 h-3.5" /> Add source
          </Button>
        </div>
        {sources.map((source, i) => (
          <div key={i} className="flex gap-2 items-start">
            <Input
              placeholder="Title"
              value={source.title}
              onChange={(e) => {
                const next = [...sources];
                next[i] = { ...next[i], title: e.target.value };
                setSources(next);
              }}
              className="flex-1 bg-card border-border text-foreground"
            />
            <Input
              placeholder="https://..."
              value={source.url}
              onChange={(e) => {
                const next = [...sources];
                next[i] = { ...next[i], url: e.target.value };
                setSources(next);
              }}
              className="flex-1 bg-card border-border text-foreground"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => setSources(sources.filter((_, j) => j !== i))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {sources.length === 0 && (
          <p className="text-sm text-muted-foreground">No sources added yet.</p>
        )}
      </div>

      <SEOFields
        seoTitle={seoTitle}
        setSeoTitle={setSeoTitle}
        seoDescription={seoDescription}
        setSeoDescription={setSeoDescription}
        seoKeywords={seoKeywords}
        setSeoKeywords={setSeoKeywords}
        slug={slug}
      />
    </div>
  );
}
