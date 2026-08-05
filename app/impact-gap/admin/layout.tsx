import type { Metadata } from "next";

// Kept out of the index and out of the sitemap. The site's robots.ts is not
// touched, because a noindex here is enough and that file belongs to the rest
// of the site.
export const metadata: Metadata = {
  title: "Impact Gap admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function ImpactGapAdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
