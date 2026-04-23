"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface SEOFieldsProps {
  seoTitle: string;
  setSeoTitle: (v: string) => void;
  seoDescription: string;
  setSeoDescription: (v: string) => void;
  seoKeywords: string;
  setSeoKeywords: (v: string) => void;
  slug: string;
}

export default function SEOFields({
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  seoKeywords,
  setSeoKeywords,
  slug,
}: SEOFieldsProps) {
  const [open, setOpen] = useState(true);
  const titleLen = seoTitle.length;
  const descLen = seoDescription.length;
  const titleOk = titleLen > 0 && titleLen <= 60;
  const descOk = descLen > 0 && descLen <= 160;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-heading font-semibold text-foreground w-full py-3 border-b border-border">
        <span className="flex-1 text-left">🔍 SEO Settings</span>
        <span className="text-xs text-muted-foreground">{open ? "▲" : "▼"}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-5 pt-4">
        <div className="rounded-xl border border-border bg-background p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-medium mb-2">Google Search Preview</p>
          <p className="text-[#1a0dab] text-lg leading-snug font-medium truncate">
            {seoTitle || "Page Title"}
          </p>
          <p className="text-[#006621] text-sm">
            brandhumanizing.com/blog/{slug || "your-slug"}
          </p>
          <p className="text-sm text-[#545454] line-clamp-2">
            {seoDescription || "Add a meta description to see a preview here."}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo-title">SEO Title</Label>
            <div className="flex items-center gap-1.5">
              {titleOk ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : titleLen > 60 ? (
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
              ) : null}
              <span className={`text-xs font-mono ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                {titleLen}/60
              </span>
            </div>
          </div>
          <Input
            id="seo-title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Enter SEO title (max 60 characters)"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo-desc">Meta Description</Label>
            <div className="flex items-center gap-1.5">
              {descOk ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : descLen > 160 ? (
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
              ) : null}
              <span className={`text-xs font-mono ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>
                {descLen}/160
              </span>
            </div>
          </div>
          <Textarea
            id="seo-desc"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Enter meta description (max 160 characters)"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="brand humanizing, human strategy, AI"
          />
          {seoKeywords && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {seoKeywords.split(",").map((k) => k.trim()).filter(Boolean).map((k) => (
                <Badge key={k} variant="secondary" className="text-xs">{k}</Badge>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
