import type { Metadata } from "next";
import FullServicePageTemplate, { type FullServicePageData } from "@/components/work-with-us/FullServicePageTemplate";

export const metadata: Metadata = {
  title: "Inspiration Session | The Starting Point of Every Brand Humanizing Engagement",
  description: "Every Brand Humanizing engagement begins here. In 90 minutes, your team gains the shared language, framework, and honest first read that makes everything else possible. From €1,750.",
  openGraph: { images: [{ url: "/og/inspiration-session-wwu.jpg" }] },
};

const data: FullServicePageData = {
  seoTitle: "Inspiration Session | The Starting Point of Every Brand Humanizing Engagement",
  seoDescription: "Every Brand Humanizing engagement begins here. In 90 minutes, your team gains the shared language, framework, and honest first read that makes everything else possible. From €1,750.",
  path: "/work-with-us/inspiration-session",
  breadcrumbs: [{ label: "Work With Us", to: "/work-with-us" }, { label: "Inspiration Session" }],
  label: "STEP 01 · WHERE EVERY ENGAGEMENT STARTS",
  h1: "The Inspiration Session",
  subheading: "Before we audit anything, before we map anything, your team needs a shared foundation. In 90 minutes, we build it.",
  specs: [
    { icon: "clock", text: "90 minutes" },
    { icon: "users", text: "15–50 people" },
    { icon: "euro", text: "From €1,750 excl. VAT" },
  ],
  ctaLabel: "Book an Inspiration Session",
  ctaTo: "/contact?product=work-with-us-inspiration-session",

  whySection: {
    heading: "The audit only works when your team understands the framework.",
    content: [
      { type: "paragraph", text: "Most organisational assessments fail for the same reason: the people being interviewed don't share a common lens. They answer from their own perspective, their own assumptions, their own definition of what \"human\" or \"automated\" means. The results are fragmented. The report gets debated instead of acted on." },
      { type: "paragraph", text: "The Inspiration Session solves this. In 90 minutes, every person in the room gains the same mental model. the Brand Humanizing framework, the four skills, the pyramid. and an honest first read of where your organisation stands. When we conduct the audit afterwards, everyone is answering the same question. The data is sharper. The brainstorm is richer. The roadmap is faster." },
      { type: "paragraph", text: "This isn't optional. It's the foundation that makes every step after it work." },
    ],
  },

  processSection: {
    heading: "90 minutes. One question. A room that thinks differently.",
    content: [
      { type: "paragraph", text: "This is not a lecture. It is a conversation, built around the question that started Brand Humanizing in 2017: what are you doing to make sure the humans in your organisation are still valuable in ten years?" },
      { type: "paragraph", text: "Ferry takes your team through the state of human-technology relationships in your industry, the Brand Humanizing framework and its four skills, an honest first read of where your organisation sits, and a set of starting points your team can act on the following Monday. Every participant receives a copy of the book. Not as a takeaway. as a reference they'll actually use." },
      { type: "paragraph", text: "Example agenda:" },
      {
        type: "agenda",
        items: [
          "9:00. Opening: the question that started everything",
          "9:15. The state of human-technology in your industry",
          "9:30. The Brand Humanizing framework: four skills, one pyramid",
          "9:45. Your organisation: an honest first read",
          "10:00. What you can do differently starting Monday",
          "10:15. Q&A and open conversation",
        ],
      },
      { type: "paragraph", text: "Delivered by: Ferry Hoes" },
    ],
  },

  outputsHeading: "More than inspiration. A foundation.",
  outputs: [
    "A clear mental model for thinking about technology and human value. shared across your whole team",
    "The Brand Humanizing framework: the four skills and the pyramid, understood and owned",
    "An honest first read of where your organisation stands on human-technology fit",
    "Concrete starting points specific to your context, not generic advice",
    "A shared vocabulary for conversations you've been having in fragments",
    "A copy of the book for every participant",
  ],

  whoHeading: "This session is for you if...",
  whoItems: [
    "Your leadership team is making decisions about AI and automation without a shared framework",
    "You're about to embark on a digital transformation and want your people aligned before you start",
    "You've had the \"are we too automated?\" conversation but never resolved it",
    "You want to begin the full Brand Humanizing journey. Audit, Roadmap, and Implementation. on the right foundation",
    "You've seen Ferry speak at an event and want to bring that conversation to your own organisation",
    "Most organisations start here. Some come back for more. A few go all the way.",
  ],

  testimonials: [
    {
      quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room. We're very happy with the collaboration and he gave our clients plenty of inspiration they can put into practice.",
      who: "Almer, ASR · Inspiration Session, March 2025",
    },
  ],

  investmentHeading: "Investment",
  investmentBody: [
    "From €1,750 excl. VAT. varies by group size and format (in-person or virtual). Reach out for a quote.",
    "Every participant receives a copy of the book. Included.",
  ],

  faqs: [
    { q: "Can the session be delivered online or in hybrid format?", a: "Yes. The session works well in person and online. In-person tends to produce richer conversation; online is effective for distributed teams. Ferry adapts the format to what your team needs." },
    { q: "How much advance notice do you need?", a: "Most sessions are booked 3–6 weeks in advance. For large events or specific dates, earlier is better. Get in touch and we'll find what works." },
    { q: "What does Ferry need to know beforehand?", a: "The intake conversation is short but important. We want to understand your industry, the mix of people in the room, and any specific context we should know about. That's what makes the session feel like it was built for you. because it was." },
    { q: "What comes after the Inspiration Session?", a: "Many organisations continue to Step 02: the Audit & Brainstorm, where we go deep into how your organisation actually operates and identify where the biggest human opportunities sit. Some take the Full-Day Course to build skills before starting the project work. There's no pressure either way. Every step is its own commitment." },
    { q: "Is there a maximum group size?", a: "No fixed maximum. The session has been delivered to rooms of 5 and rooms of 500. The format adapts. For very large groups, we recommend a dedicated intake call to design the right configuration." },
  ],

  relatedEngagements: [
    { label: "The Audit & Brainstorm", description: "The Inspiration Session builds the foundation. The Audit tells you what's actually sitting on it. The natural next step for any organisation that wants honest data before committing to a direction.", to: "/work-with-us/audit-and-brainstorm" },
    { label: "The Multi-Day Programme", description: "For leadership teams who want the full framework experience before beginning the project work. Two to three days that build genuine alignment at the top.", to: "/learning/multi-day-programme" },
    { label: "All learning options", description: "Not every organisation needs the full engagement. The Full-Day Course and Multi-Day Programme are designed for teams who want to build the skill without the project scope.", to: "/learning" },
  ],

  finalCtaHeading: "Every engagement starts here.",
  finalCtaSubline: "There are no obligations beyond the step you're in. Book the Inspiration Session and we'll take it from there.",
  finalCtaLabel: "Book an Inspiration Session",
  finalCtaTo: "/contact?product=work-with-us-inspiration-session",

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Humanizing Inspiration Session",
    description: "A 90-minute session that gives your team the shared language, framework, and honest first read to start the Brand Humanizing journey.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    areaServed: { "@type": "Place", name: "Europe" },
  },
};

export default function InspirationSessionWWU() {
  return <FullServicePageTemplate data={data} />;
}
