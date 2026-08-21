import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import OriginTour from "@/components/origin/OriginTour";

export const metadata: Metadata = {
  alternates: { canonical: "/our-story" },
  title: "Our Story | Brand Humanizing Institute",
  description:
    "From a line in a notebook in a Rotterdam McDonald's in 2017 to a framework, 40 keynotes a year and a book. The origin story of Brand Humanizing, told screen by screen.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

// An immersive, scroll-snap story page. It manages its own full-height scroll
// container, so there is no global Footer here; the final screen closes it out
// with the CTAs and the essential links.
export default function OurStoryPage() {
  return (
    <>
      <Navbar variant="dark" />
      <OriginTour />
    </>
  );
}
