import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const res = await fetch(`${supabaseUrl}/functions/v1/podcast-rss`, {
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return new NextResponse("Could not fetch RSS feed", { status: 502 });
    }

    const data = await res.json();

    // Build RSS XML from episode data
    const episodes: Array<{
      title: string;
      description: string;
      pubDate: string;
      duration: string;
      audioUrl: string;
      guid: string;
      episodeNumber?: number;
    }> = data.episodes || [];

    const showTitle = "The Human Era Podcast";
    const showDescription = "Conversations about staying human in a world that is automating everything.";
    const showLink = "https://brandhumanizing.com/podcast";
    const showImage = data.showImage || "https://brandhumanizing.com/og/podcast.jpg";

    const itemsXml = episodes
      .map(
        (ep) => `
    <item>
      <title><![CDATA[${ep.title}]]></title>
      <description><![CDATA[${ep.description}]]></description>
      <pubDate>${new Date(ep.pubDate).toUTCString()}</pubDate>
      <itunes:duration>${ep.duration}</itunes:duration>
      <enclosure url="${ep.audioUrl}" type="audio/mpeg" />
      <guid isPermaLink="false">${ep.guid}</guid>
      ${ep.episodeNumber ? `<itunes:episode>${ep.episodeNumber}</itunes:episode>` : ""}
    </item>`
      )
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${showTitle}</title>
    <link>${showLink}</link>
    <description>${showDescription}</description>
    <language>en</language>
    <itunes:image href="${showImage}" />
    <itunes:author>Ferry Hoes</itunes:author>
    <itunes:category text="Business" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
