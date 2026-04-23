"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  link: string;
  audioUrl: string;
  imageUrl: string;
  guest?: string;
}

function extractGuest(title: string): string | undefined {
  const match = title.match(/\bwith\s+(.+)$/i);
  return match ? match[1].trim() : undefined;
}

function formatDuration(dur: string): string {
  const parts = dur.split(":").map(Number);
  if (parts.length === 3) return `${parts[0] * 60 + parts[1]} min`;
  if (parts.length === 2) return `${parts[0]} min`;
  return dur;
}

export function usePodcastFeed() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    async function fetchFeed() {
      try {
        const { data, error: fnError } = await createSupabaseBrowserClient().functions.invoke("podcast-rss");
        if (fnError) throw fnError;
        const eps = (data.episodes || []).map((ep: any) => ({
          ...ep,
          duration: formatDuration(ep.duration),
          guest: extractGuest(ep.title),
        }));
        setEpisodes(eps);
        setShowImage(data.showImage || "");
      } catch (err: any) {
        setError(err.message || "Failed to load episodes");
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  return { episodes, loading, error, showImage };
}
