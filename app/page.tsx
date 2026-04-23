import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import DisruptionStatement from "@/components/sections/DisruptionStatement";
import SocialProofBar from "@/components/sections/SocialProofBar";
import WhatIsBrandHumanizing from "@/components/sections/WhatIsBrandHumanizing";
import HowWeHelp from "@/components/sections/HowWeHelp";
import UpcomingSessions from "@/components/sections/UpcomingSessions";
import Testimonials from "@/components/sections/Testimonials";
import MeetTheHumans from "@/components/sections/MeetTheHumans";
import BookSection from "@/components/sections/BookSection";
import BlogPodcast from "@/components/sections/BlogPodcast";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Brand Humanizing Institute | Human Edge in a Digital World",
  description:
    "Turn human talent into your strongest competitive advantage. Strategy for organizations navigating AI and automation. Founded 2017, Rotterdam.",
  openGraph: {
    images: [{ url: "/og/default.jpg" }],
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brand Humanizing Institute",
  url: "https://brandhumanizing.com",
  logo: "https://brandhumanizing.com/assets/logo.png",
  foundingDate: "2017",
  founders: [
    { "@type": "Person", name: "Ferry Hoes" },
    { "@type": "Person", name: "Jonathan Flores" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rotterdam",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/company/brand-humanizing-institute",
    "https://open.spotify.com/show/6eGkXe767cYZ5Rw627Xpgu",
    "https://podcasts.apple.com/nl/podcast/the-human-era-podcast/id1598552331",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Brand Humanizing Institute",
  url: "https://brandhumanizing.com",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <Navbar />
      <main>
        <Hero />
        <DisruptionStatement />
        <SocialProofBar />
        <WhatIsBrandHumanizing />
        <HowWeHelp />
        <UpcomingSessions />
        <Testimonials />
        <MeetTheHumans />
        <BookSection />
        <BlogPodcast />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
