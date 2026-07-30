import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import DisruptionStatement from "@/components/sections/DisruptionStatement";
import SocialProofBar from "@/components/sections/SocialProofBar";
import WhatIsBrandHumanizing from "@/components/sections/WhatIsBrandHumanizing";
import HowWeHelp from "@/components/sections/HowWeHelp";
import InCompany from "@/components/sections/InCompany";
import Testimonials from "@/components/sections/Testimonials";
import MeetTheHumans from "@/components/sections/MeetTheHumans";
import BookSection from "@/components/sections/BookSection";
import BlogPodcast from "@/components/sections/BlogPodcast";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Brand Humanizing Institute | Human Edge in a Digital World",
  description:
    "Brand Humanizing: keynote, training and strategy that turns your people into your competitive edge against AI. Rotterdam, since 2017.",
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

const FERRY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ferry Hoes",
  jobTitle: "Founder & Keynote Speaker",
  url: "https://brandhumanizing.com/about",
  worksFor: { "@type": "Organization", name: "Brand Humanizing Institute" },
  sameAs: ["https://www.linkedin.com/in/ferryhoes"],
};

const JONATHAN_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonathan Flores",
  jobTitle: "Co-founder",
  url: "https://brandhumanizing.com/about",
  worksFor: { "@type": "Organization", name: "Brand Humanizing Institute" },
};

const BOOK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Brand Humanizing",
  headline: "The superpower that makes your brand more human and your business grow faster",
  author: [
    { "@type": "Person", name: "Ferry Hoes" },
    { "@type": "Person", name: "Jonathan Flores" },
  ],
  publisher: { "@type": "Organization", name: "Brand Humanizing Institute" },
  inLanguage: "nl",
  url: "https://brandhumanizing.com/book",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FERRY_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JONATHAN_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BOOK_SCHEMA) }} />
      <Navbar />
      <main>
        <Hero />
        <DisruptionStatement />
        <SocialProofBar />
        <WhatIsBrandHumanizing />
        <HowWeHelp />
        <InCompany />
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
