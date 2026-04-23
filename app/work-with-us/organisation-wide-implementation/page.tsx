import type { Metadata } from "next";
import FullServicePageTemplate, { type FullServicePageData } from "@/components/work-with-us/FullServicePageTemplate";

export const metadata: Metadata = {
  title: "Organisation-Wide Brand Humanizing Implementation | Transformation That Sticks",
  description: "The full engagement. 3–6 months of embedded work alongside your teams. building real capability across every level, training your internal Brand Humanizers, and making the methodology yours to keep.",
  openGraph: { images: [{ url: "/og/organisation-wide.jpg" }] },
};

const data: FullServicePageData = {
  seoTitle: "Organisation-Wide Brand Humanizing Implementation | Transformation That Sticks",
  seoDescription: "The full engagement. 3–6 months of embedded work alongside your teams. building real capability across every level, training your internal Brand Humanizers, and making the methodology yours to keep.",
  path: "/work-with-us/organisation-wide-implementation",
  breadcrumbs: [{ label: "Work With Us", to: "/work-with-us" }, { label: "Organisation-Wide Implementation" }],
  label: "STEP 04 · BUILDING IT. TOGETHER.",
  h1: "Organisation-Wide Implementation",
  subheading: "This is where Brand Humanizing stops being a strategy and becomes the way your organisation actually works.",
  specs: [
    { icon: "clock", text: "3–6 months" },
    { icon: "users", text: "Multiple teams, multiple levels" },
    { icon: "euro", text: "Quote-based. Most engagements €25,000–€60,000+" },
  ],
  ctaLabel: "Have a conversation",
  ctaTo: "/contact?product=organisation-wide-implementation",

  whySection: {
    heading: "Most projects deliver a document. This one delivers a capability.",
    content: [
      { type: "paragraph", text: "Here's the pattern. An organisation hires a consultancy. The consultancy does the analysis. They present the findings. They hand over a strategy document. They leave. Six months later, nothing has changed. not because the strategy was wrong, but because the capability to execute it was never built." },
      { type: "paragraph", text: "We don't do that." },
      { type: "paragraph", text: "Organisation-Wide Implementation is embedded work. We work alongside your teams. not above them, not behind a glass wall of PowerPoint decks. We facilitate the hard conversations that strategy documents can't have. We redesign the workflows that the Roadmap identified. We train the people who need new skills across all four Brand Humanizing dimensions. And we identify and develop the internal champions who will carry this forward after we leave." },
      { type: "paragraph", text: "By the time we step back, the methodology belongs to your organisation. That's the point." },
    ],
  },

  processSection: {
    heading: "Six months. Every level. Real change.",
    content: [
      { type: "bullets", items: [
        "Leadership alignment sessions to establish the strategic framework and ensure your most senior people are genuinely behind it. not just endorsing it in presentations",
        "Department-level workshops tailored to each team's specific context. what Brand Humanizing means for the marketing team looks different to what it means for customer service or operations",
        "Internal champion selection and training programme. identifying the people in your organisation with the natural ability to carry this forward and developing them into certified internal Brand Humanizers",
        "Cross-functional skill-building sessions across all four dimensions: AI & Automation Intelligence, Creativity, Human Sciences, and Emotional Intelligence & Ethics",
        "Process redesign workshops where the Brand Humanizing framework meets the reality of daily operations. specific workflows, specific decisions, specific moments",
        "Monthly review and calibration sessions to assess progress, surface blockers, and adjust the approach as your organisation learns",
        "Live implementation support. applying the framework to real decisions as they arise, not just in workshop settings",
      ]},
    ],
  },

  outputsHeading: "The outputs. and the capability that outlasts them",
  outputs: [
    "Organisation-wide fluency in the Brand Humanizing framework. not just in leadership, across every level",
    "A complete Human-Technology Fit map across all departments, with measurable starting and ending points",
    "2–5 trained internal Brand Humanizers who can sustain and extend the methodology independently",
    "A documented strategy with milestones, clear owners, and measurable outcomes. built during the engagement, not handed over at the end",
    "Measurable improvement in human-technology decision-making quality: fewer bad automation decisions, stronger human investments",
    "A culture that makes this way of thinking self-sustaining. because the people who think this way are now in your organisation permanently",
  ],

  whoHeading: "This engagement is right for you if...",
  whoItems: [
    "You've completed the Audit & Brainstorm and the Brand Humanizing Roadmap and you're ready to make it real",
    "You're a C-suite leader who has seen the Brand Humanizing framework and wants it embedded in how your organisation operates. not just talked about",
    "You're an HR or L&D director planning a multi-year capability building programme and you want a research-backed, practitioner-led methodology at its core",
    "Your organisation is undergoing significant digital transformation and you're determined not to lose your human edge in the process",
    "You need measurable results, not just a good offsite",
  ],

  comparisonTable: {
    heading: "What other consultants do. What we do.",
    rows: [
      { them: "Deliver a report and leave", us: "Build alongside your team, not above it" },
      { them: "Run a one-day workshop and call it transformation", us: "Multi-month engagement that creates lasting change" },
      { them: "Apply a generic framework to your specific situation", us: "A framework invented through 8 years of primary research" },
      { them: "Measure success by hours billed", us: "Measure success by what your organisation can do without us" },
      { them: "Leave you dependent on their return", us: "Train internal champions who carry the work forward" },
    ],
  },

  testimonials: [
    { quote: "Most projects deliver a document. This one delivered a decision. and the capability to keep making better ones.", who: "CEO, European Services Company" },
    { quote: "The framework is built on 8 years of primary research, not borrowed theory. Our team owns the methodology now. That's what we paid for.", who: "Implementation client" },
  ],

  investmentHeading: "Investment",
  investmentBody: [
    "Quote-based. Most engagements sit between €25,000 and €60,000+ depending on organisation size, number of departments, and programme duration. We scope every engagement honestly. you won't be surprised by what the invoice says.",
    "All prices exclude VAT and travel costs outside Rotterdam.",
  ],

  faqs: [
    { q: "How is this different from hiring a consultant or internal L&D programme?", a: "Most consultants analyse and advise. Most L&D programmes train and leave. We do both simultaneously. embedded in your organisation, building capability as we go, and leaving with your people genuinely owning the methodology. The goal is your independence, not your dependency." },
    { q: "How many people from our organisation are involved?", a: "Everyone, eventually. but it's structured. We start with leadership, move to department leads, then to the broader team. The internal champion programme runs in parallel. Most organisations have 2–5 people designated as internal Brand Humanizers by the end of the engagement." },
    { q: "What happens when you leave?", a: "That's what the Handover is for. The final phase of every implementation is a structured transition to your internal Brand Humanizers. They've been trained throughout the engagement. The Handover formalises their readiness and establishes a quarterly check-in structure so you're never without support." },
    { q: "Do you sign NDAs?", a: "Yes, standard practice. Get in touch and we'll handle the paperwork before any scoping conversations." },
    { q: "Can you work with organisations outside the Netherlands?", a: "Yes. We've worked across 12 countries. Remote delivery is available for the right engagements. Travel costs for in-person elements outside Rotterdam are billed at cost." },
  ],

  relatedEngagements: [
    { label: "The Audit & Brainstorm", description: "The Audit gives you the honest baseline every successful implementation is built on.", to: "/work-with-us/audit-and-brainstorm" },
    { label: "The Multi-Day Programme", description: "Leadership teams that complete the Multi-Day Programme before implementation begins move significantly faster through the strategic alignment phases.", to: "/learning/multi-day-programme" },
    { label: "The Handover", description: "Implementation doesn't end when we stop showing up. The Handover trains your internal Brand Humanizers and sets your organisation up for permanent independence.", to: "/work-with-us/handover" },
  ],

  finalCtaHeading: "Ready to stop planning and start changing?",
  finalCtaSubline: "Every implementation starts with one honest conversation.",
  finalCtaLabel: "Have a conversation",
  finalCtaTo: "/contact?product=organisation-wide-implementation",

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Humanizing Organisation-Wide Implementation",
    description: "3–6 month embedded implementation of the Brand Humanizing framework across your entire organisation, including internal champion training.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    areaServed: { "@type": "Place", name: "Europe" },
  },
};

export default function OrganisationWideImplementation() {
  return <FullServicePageTemplate data={data} />;
}
