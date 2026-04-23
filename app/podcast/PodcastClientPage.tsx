"use client";

import { Mic2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Episode {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  guid: string;
  guest?: string;
  episodeNumber?: number;
  imageUrl?: string;
}

export default function PodcastClientPage({
  episodes,
  showImage,
}: {
  episodes: Episode[];
  showImage: string | null;
}) {
  if (episodes.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container max-w-5xl text-center py-12">
          <p className="text-muted-foreground">Could not load episodes. Please try again later.</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://open.spotify.com/show/6eGkXe767cYZ5Rw627Xpgu" target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const featured = episodes[0];
  const rest = episodes.slice(1);

  return (
    <section className="section-padding bg-white">
      <div className="container max-w-5xl">
        <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold block text-center mb-4">EPISODES</span>
        <h2 className="text-display md:text-display-lg text-foreground text-center mb-12">Recent conversations</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Featured latest episode */}
          <article className="group relative overflow-hidden bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(18,21,46,0.08)] border-l-4 border-[#1DB954]/40 hover:border-[#1DB954] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full font-heading">
                  <Mic2 className="h-3.5 w-3.5" />
                  Latest Episode
                </span>
                <span className="text-sm text-muted-foreground">{featured.duration}</span>
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">{featured.title}</h3>
              {featured.guest && (
                <p className="text-muted-foreground mb-3">with {featured.guest}</p>
              )}
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                {featured.description?.substring(0, 200)}
                {(featured.description?.length || 0) > 200 ? "…" : ""}
              </p>
            </div>
            <a
              href={featured.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-heading font-semibold px-6 h-11 text-sm transition-colors w-fit"
            >
              <Play className="h-4 w-4 fill-current" />
              Listen now
            </a>
          </article>

          {/* Rest of episodes */}
          <div className="space-y-4">
            {rest.slice(0, 4).map((ep) => (
              <article
                key={ep.guid}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(18,21,46,0.06)] hover:shadow-[0_4px_20px_rgba(18,21,46,0.1)] transition-all duration-300 flex gap-4 items-start"
              >
                {ep.imageUrl && (
                  <img src={ep.imageUrl} alt={ep.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-heading font-semibold text-foreground text-sm leading-snug line-clamp-2">
                      {ep.title}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">{ep.duration}</span>
                  </div>
                  {ep.guest && <p className="text-xs text-muted-foreground mt-0.5">with {ep.guest}</p>}
                  <a
                    href={ep.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-accent hover:underline mt-2"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Listen
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://open.spotify.com/show/6eGkXe767cYZ5Rw627Xpgu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-6 h-10 text-sm transition-colors"
          >
            See all episodes on Spotify →
          </a>
        </div>
      </div>
    </section>
  );
}
