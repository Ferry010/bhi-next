import type { Metadata } from "next";
import FullServicePageTemplate, { type FullServicePageData } from "@/components/work-with-us/FullServicePageTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/work-with-us/brand-humanizing-roadmap" },
  title: "Brand Humanizing Roadmap | Human-Technology Strategy for Organisations",
  description: "The Roadmap turns your Audit findings into a 12–36 month strategy your leadership team will actually follow. Not a document. A set of decisions. built together, owned by your team.",
  openGraph: { images: [{ url: "/og/brand-humanizing-roadmap.jpg" }] },
};

const data: FullServicePageData = {
  seoTitle: "Brand Humanizing Roadmap | Human-Technology Strategy for Organisations",
  seoDescription: "The Roadmap turns your Audit findings into a 12–36 month strategy your leadership team will actually follow. Not a document. A set of decisions. built together, owned by your team.",
  path: "/work-with-us/brand-humanizing-roadmap",
  breadcrumbs: [{ label: "Work With Us", to: "/work-with-us" }, { label: "Brand Humanizing Roadmap" }],
  label: "STEP 03 · TURNING DIAGNOSIS INTO DECISIONS",
  h1: "The Brand Humanizing Roadmap",
  subheading: "The Audit tells you where you are. The Roadmap tells you where to go, and in what order.",
  specs: [
    { icon: "clock", text: "4–8 weeks" },
    { icon: "users", text: "Leadership team + department leads" },
    { icon: "euro", text: "From €12,500 excl. VAT" },
  ],
  ctaLabel: "Build our Roadmap",
  ctaTo: "/contact?product=brand-humanizing-roadmap",

  whySection: {
    heading: "A good roadmap isn't long. It's clear.",
    content: [
      { type: "paragraph", text: "Most organisations have strategies. They sit in decks. They get presented at off-sites. They get referenced in board reports. They don't get acted on. not because people disagree with them, but because they're not clear enough to turn into a Monday morning decision." },
      { type: "paragraph", text: "The Brand Humanizing Roadmap is built differently. It's not a document we hand over. It's a working session. or a series of working sessions. where your leadership team sits with us and translates what the Audit found into specific, concrete decisions. What gets automated. What stays human. Where you invest in capability. How you structure teams so all four Brand Humanizing skills are present where they matter most." },
      { type: "paragraph", text: "When we're done, the Roadmap lives in your organisation, not in our files. Your team made it. Your team owns it." },
    ],
  },

  processSection: {
    heading: "How the Roadmap is built",
    content: [
      { type: "bullets", items: [
        "Audit findings review. we start from the honest picture the Audit & Brainstorm created. If you haven't done the Audit, we discuss scope.",
        "Leadership working sessions. typically 2–4 sessions with your leadership team. Not presentations. Working sessions where we build together.",
        "Department-level input workshops. gathering the operational reality that leadership strategy sometimes misses.",
        "Competitive analysis through the Brand Humanizing lens. where are your competitors losing their human edge? Where are they building it? What does that mean for your positioning?",
        "Technology inventory. what you have, what you need, what you should stop using, and where each tool sits on the human-automation spectrum.",
        "Roadmap construction. a prioritised, sequenced set of decisions: initiatives, owners, timelines, and the human rationale behind each one.",
      ]},
    ],
  },

  outputsHeading: "The outputs",
  outputs: [
    "A technology-human roadmap for the next 12–36 months. built by your team, grounded in your data",
    "Clear, specific decisions on what to automate and where to invest in human capability",
    "A culture strategy that stays human as technology changes around it",
    "A prioritised initiative list with owners and milestones. not vague aspirations",
    "Full leadership alignment on the human-technology direction: everyone pulling the same way",
    "The foundation that makes Organisation-Wide Implementation fast and coherent",
  ],

  whoHeading: "This engagement is right for you if...",
  whoItems: [
    "You've completed the Audit & Brainstorm and are ready to move from diagnosis to strategy",
    "Your leadership team is planning significant technology investments and wants a human-technology framework to evaluate them against",
    "Your digital transformation feels like it's missing its human dimension. you can feel it, but can't name it yet",
    "You've been running AI pilots in pockets and need a coherent strategy that covers the whole organisation",
    "You need your C-suite and department heads aligned on a shared direction before implementation begins",
  ],

  testimonials: [
    { quote: "Not a strategy document that sits in a drawer. Something our organisation acted on next quarter.", who: "Strategy Director, Technology Company" },
  ],

  investmentHeading: "Investment",
  investmentBody: [
    "From €12,500 excl. VAT. Scoped to your organisation size, leadership team configuration, and the depth of the Audit findings. All prices exclude travel costs outside Rotterdam.",
  ],

  faqs: [
    { q: "Do we need to have done the Audit first?", a: "For most organisations, yes. The Roadmap is most powerful when it's built on honest data from the Audit & Brainstorm. If you've done equivalent internal diagnostic work, we'll discuss whether that provides enough foundation. Get in touch and we'll be straight with you." },
    { q: "How long does the Roadmap take to build?", a: "Most Roadmaps are completed in 4–8 weeks, depending on the number of working sessions and the size of your leadership team. We don't rush it. a Roadmap that your team hasn't fully processed won't land. But we also don't drag it out." },
    { q: "What if our leadership team disagrees on direction?", a: "That's actually valuable data. Disagreement at the strategy stage is far cheaper than disagreement at the implementation stage. Our Roadmap sessions are designed to surface and resolve strategic tensions, not avoid them. Some of the best Roadmaps came out of leadership teams that started the process in strong disagreement." },
    { q: "How is this different from hiring a strategy consultancy?", a: "Most consultancies deliver analysis. We deliver decisions. The difference is that we build the Roadmap with your leadership team rather than for them. That means the people who need to execute it were in the room when it was made. Ownership is built in from the start." },
    { q: "What happens after the Roadmap?", a: "The natural next step is Organisation-Wide Implementation. making the Roadmap real across every level of your organisation. Some organisations take time between Roadmap and Implementation to run internal alignment sessions. We're here for both." },
  ],

  relatedEngagements: [
    { label: "The Audit & Brainstorm", description: "The Roadmap is only as good as the data it's built on. The Audit gives you that data.", to: "/work-with-us/audit-and-brainstorm" },
    { label: "Organisation-Wide Implementation", description: "The Roadmap points the direction. Implementation builds the capability to go there. across every team, every level, for the long term.", to: "/work-with-us/organisation-wide-implementation" },
    { label: "The Multi-Day Programme", description: "Some leadership teams benefit from a 2–3 day deep-dive on the Brand Humanizing framework before the Roadmap sessions begin. It shortens the strategy work considerably.", to: "/learning/multi-day-programme" },
  ],

  finalCtaHeading: "Build the strategy your organisation will actually follow.",
  finalCtaLabel: "Build our Roadmap",
  finalCtaTo: "/contact?product=brand-humanizing-roadmap",

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Humanizing Roadmap",
    description: "A strategic planning engagement producing a 12–36 month technology-human roadmap, built collaboratively with your leadership team.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    areaServed: { "@type": "Place", name: "Europe" },
  },
};

export default function BrandHumanizingRoadmap() {
  return <FullServicePageTemplate data={data} />;
}
