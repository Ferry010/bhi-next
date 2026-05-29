import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PodcastClientPage from "./PodcastClientPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/podcast" },
  title: "The Human Era Podcast",
  description:
    "Conversations about staying human in a world that is automating everything. With Ferry Hoes.",
  openGraph: {
    images: [{ url: "/og/podcast.jpg" }],
  },
};

export default async function PodcastPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let episodes: any[] = [];
  let showImage: string | null = null;

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/podcast-rss`, {
      headers: { Authorization: `Bearer ${supabaseKey}` },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      episodes = data.episodes || [];
      showImage = data.showImage || null;
    }
  } catch {
    // show empty state
  }

  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary section-padding pb-12 pt-24 md:pt-32">
          <div className="container max-w-3xl">
            <Breadcrumb items={[{ label: "Podcast" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">PODCAST</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              The Human Era <span className="text-accent">Podcast</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Honest, unscripted conversations with fascinating people about technology, leadership, and what it means to be human. No scripts. No soundbites.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://open.spotify.com/show/6eGkXe767cYZ5Rw627Xpgu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-heading font-semibold px-6 h-11 text-sm transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                Listen on Spotify
              </a>
              <a
                href="https://podcasts.apple.com/nl/podcast/the-human-era-podcast/id1598552331"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#9933FF] hover:bg-[#9933FF]/90 text-white font-heading font-semibold px-6 h-11 text-sm transition-colors"
              >
                Apple Podcasts
              </a>
            </div>
          </div>
        </section>

        <PodcastClientPage episodes={episodes} showImage={showImage} />

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <h2 className="text-display md:text-display-lg text-white mb-4">Bring the conversation into your organisation</h2>
            <p className="text-body-lg text-white/80 mb-8">
              The podcast is the thinking. The Inspiration Session is where your team works through it together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learning/inspiration-session">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Book an Inspiration Session <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/the-method">
                <Button variant="outline" className="rounded-full border-[1.5px] border-white/70 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                  Explore the method <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
