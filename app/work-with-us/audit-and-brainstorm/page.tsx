import type { Metadata } from "next";
import FullServicePageTemplate, { type FullServicePageData } from "@/components/work-with-us/FullServicePageTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/work-with-us/audit-and-brainstorm" },
  title: "The Audit & Brainstorm | Brand Humanizing Organisational Assessment",
  description: "We interview your people, map your processes, and find where human potential is being wasted on machine work, and where automation is missing the human judgement it needs. With your team, not above them.",
  openGraph: { images: [{ url: "/og/audit-brainstorm.jpg" }] },
};

const data: FullServicePageData = {
  seoTitle: "The Audit & Brainstorm | Brand Humanizing Organisational Assessment",
  seoDescription: "We interview your people, map your processes, and find where human potential is being wasted on machine work, and where automation is missing the human judgement it needs. With your team, not above them.",
  path: "/work-with-us/audit-and-brainstorm",
  breadcrumbs: [{ label: "Work With Us", to: "/work-with-us" }, { label: "The Audit & Brainstorm" }],
  label: "STEP 02 · UNDERSTANDING WHERE YOU ACTUALLY ARE",
  h1: "The Audit & Brainstorm",
  subheading: "Not a report handed over from the outside. An honest look at your organisation, built together. with your people in the room.",
  specs: [
    { icon: "clock", text: "4–6 weeks" },
    { icon: "users", text: "8–20 people across departments" },
    { icon: "euro", text: "On request" },
  ],
  ctaLabel: "Start with the Audit",
  ctaTo: "/contact?product=audit-and-brainstorm",

  whySection: {
    heading: "Most organisations think they know where they stand. They don't.",
    content: [
      { type: "paragraph", text: "Leaders make strategic decisions about technology and people based on assumptions. Those assumptions are understandable. but they're often expensive. The team that seems over-reliant on manual work often has technology sitting unused. The department that looks efficient has people doing repetitive tasks that a simple automation could handle. The customer journey that feels \"appropriately digital\" is quietly alienating the customers who wanted a human." },
      { type: "paragraph", text: "The Audit doesn't tell you what you want to hear. It tells you what the data says. And the data is always more interesting than the assumption." },
      { type: "paragraph", text: "One financial services firm we worked with discovered they were spending 40% of human time on tasks their existing technology could already handle. The assessment paid for itself in the first quarter." },
    ],
  },

  processSection: {
    heading: "How the Audit works",
    content: [
      { type: "paragraph", text: "We start with the Inspiration Session already behind you. Your team has the framework. They understand the lens. Now we go deep." },
      { type: "bullets", items: [
        "Structured interviews with 8–20 people across departments and levels. not just leadership. The people closest to the work are the ones who see it most clearly.",
        "Process mapping to identify where human talent is genuinely valuable and where it's being used on tasks technology could handle better.",
        "Customer journey analysis through the Brand Humanizing lens. finding the moments where human presence creates loyalty, and the moments where automation has quietly eroded trust.",
        "Culture assessment focused on the four Brand Humanizing skills. where are they strong? Where are they absent? Where are they systematically being squeezed out?",
      ]},
      { type: "paragraph", text: "The Brainstorm. this is what makes our audit different. We don't go away and write a report. We come back and brainstorm with you. Your team brings the reality. We bring the framework and the patterns we've seen across 50+ organisations. That combination is where the real insights live." },
    ],
  },

  outputsHeading: "The outputs",
  outputs: [
    "A clear map of where your human and technology capabilities actually sit. not where you assumed",
    "Plain-language report your leadership team can act on immediately",
    "Gap analysis across all four Brand Humanizing skills with specific, prioritised starting points",
    "Identification of your highest-leverage human opportunities. the moments where investment in people creates disproportionate return",
    "A full picture of where the Brand Humanizing Roadmap should focus",
  ],

  whoHeading: "This engagement is right for you if...",
  whoItems: [
    "Your organisation is preparing for significant AI or automation investment and wants honest baseline data first",
    "You've heard \"we need to be more human\" in meetings but nobody has defined what that actually means in your context",
    "HR or L&D leadership suspects the human side of the strategy is underdeveloped but can't point to the data",
    "You're preparing for EU AI Act compliance and want to understand your organisational readiness across all dimensions, not just legal checkboxes",
    "You've done the Inspiration Session and your team is ready to find out what's actually there",
  ],

  testimonials: [
    { quote: "The assessment wasn't comfortable. But it was honest. And that honesty was exactly what we needed before committing to the next phase.", who: "Leadership team participant, professional services" },
  ],

  investmentHeading: "Investment",
  investmentBody: [
    "On request. Scope depends on organisation size and the number of departments involved. Most audits run for 4–6 weeks. Get in touch and we'll scope it together.",
  ],

  faqs: [
    { q: "Do we need to have done the Inspiration Session first?", a: "Yes. and here's why. The Audit only works when the people being interviewed understand the Brand Humanizing framework. Without the shared language the Inspiration Session creates, the interviews produce fragmented data. We don't skip steps. Each one builds on the one before it." },
    { q: "How many people from our organisation are involved?", a: "Typically 8–20 people across departments and seniority levels. We deliberately involve people beyond leadership. the clearest views of how an organisation actually operates usually come from the people doing the work. You don't need to prepare them extensively; the intake process handles that." },
    { q: "What does the Brainstorm look like?", a: "It's a working session. usually half a day. where we present what we found and work through the implications with your leadership team. It's not a presentation with a Q&A at the end. It's a genuine collaborative session. Some of the best insights come from the room, not from us." },
    { q: "How is this different from a generic organisational audit?", a: "Most audits audit everything. Ours has a specific lens: the balance between human capability and technology, measured against the Brand Humanizing framework. We're not assessing your P&L or your market position. We're answering a specific, high-value question. where are humans and technology working together well, and where is the gap?" },
    { q: "What happens after the Audit?", a: "The natural next step is the Brand Humanizing Roadmap, which takes the Audit's findings and turns them into a prioritised strategy your organisation can act on. Most organisations move from Audit to Roadmap within 2–4 weeks of receiving the report." },
  ],

  relatedEngagements: [
    { label: "The Inspiration Session", description: "The Audit builds on the foundation the Inspiration Session creates. It's where every engagement starts.", to: "/work-with-us/inspiration-session" },
    { label: "The Brand Humanizing Roadmap", description: "The Audit tells you where you are. The Roadmap decides where you go.", to: "/work-with-us/brand-humanizing-roadmap" },
    { label: "The Multi-Day Programme", description: "For leadership teams who want deeper framework fluency before the diagnostic work starts.", to: "/learning/multi-day-programme" },
  ],

  finalCtaHeading: "Find out where you actually are.",
  finalCtaSubline: "Not where you assume. Where the data says.",
  finalCtaLabel: "Start with the Audit",
  finalCtaTo: "/contact?product=audit-and-brainstorm",

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Humanizing Audit & Brainstorm",
    description: "A structured organisational assessment that maps where human and technology capabilities actually sit, followed by a collaborative brainstorm session.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    areaServed: { "@type": "Place", name: "Europe" },
  },
};

export default function AuditAndBrainstorm() {
  return <FullServicePageTemplate data={data} />;
}
