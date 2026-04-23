import type { Metadata } from "next";
import FullServicePageTemplate, { type FullServicePageData } from "@/components/work-with-us/FullServicePageTemplate";

export const metadata: Metadata = {
  title: "The Brand Humanizing Handover | Training Internal Brand Humanizers",
  description: "We don't stay forever. That's the point. The Handover trains your internal Brand Humanizers and gives your organisation the capability to apply the methodology permanently. without us.",
  openGraph: { images: [{ url: "/og/handover.jpg" }] },
};

const data: FullServicePageData = {
  seoTitle: "The Brand Humanizing Handover | Training Internal Brand Humanizers",
  seoDescription: "We don't stay forever. That's the point. The Handover trains your internal Brand Humanizers and gives your organisation the capability to apply the methodology permanently. without us.",
  path: "/work-with-us/handover",
  breadcrumbs: [{ label: "Work With Us", to: "/work-with-us" }, { label: "The Handover" }],
  label: "STEP 05 · YOUR PEOPLE TAKE OVER",
  h1: "The Handover",
  subheading: "We don't stay forever. That's the point. The final step is making sure you don't need us anymore.",
  specs: [
    { icon: "clock", text: "Final phase of Implementation" },
    { icon: "users", text: "2–5 internal Brand Humanizers" },
    { icon: "euro", text: "Included in Implementation. Quarterly check-ins available." },
  ],
  ctaLabel: "Ask about the Handover",
  ctaTo: "/contact?product=handover",

  whySection: {
    heading: "Success is when you don't need us anymore.",
    content: [
      { type: "paragraph", text: "Most consulting relationships create dependency. The organisation improves while the consultants are there, plateaus when they leave, and calls them back when things drift. That cycle is good for consulting revenue. It's bad for organisations." },
      { type: "paragraph", text: "We built the Handover into the methodology from the start because we believe the mark of a genuinely successful engagement is an organisation that can do this without us. Not because they remember the training. Because they have trained people, established processes, and an internal culture that makes Brand Humanizing self-sustaining." },
      { type: "paragraph", text: "The Handover is not a goodbye meeting. It is the final phase of a structured capability transfer." },
    ],
  },

  processSection: {
    heading: "How we hand it over",
    content: [
      { type: "paragraph", text: "Throughout the Organisation-Wide Implementation, we identify the people in your organisation who have the natural instinct for Brand Humanizing. the ones who see the human dimension in a technology decision before anyone else does, the ones who ask the right questions in the Brainstorm, the ones their colleagues turn to when something doesn't feel right." },
      { type: "paragraph", text: "These people become your internal Brand Humanizers. In the Handover phase:" },
      { type: "bullets", items: [
        "Internal Brand Humanizer training programme. a structured programme that teaches your designated people to run the Audit, facilitate Brainstorms, apply the four-skill framework to new challenges, and train others",
        "Methodology documentation. your organisation's specific application of Brand Humanizing, documented in a form your internal champions can use independently",
        "Handover sessions. live sessions where we transfer each element of the engagement methodology to your team, with practice and feedback built in",
        "Certification. your internal Brand Humanizers leave with formal recognition of their capability",
        "Quarterly check-in structure. we step back, but we don't disappear. Quarterly check-ins are available for organisations who want ongoing access to our thinking as the methodology evolves",
      ]},
    ],
  },

  outputsHeading: "The outcomes",
  outputs: [
    "2–5 certified internal Brand Humanizers who can apply, teach, and extend the methodology independently",
    "A documented Brand Humanizing practice specific to your organisation. not a generic handbook",
    "The ability to onboard new people into the framework without external support",
    "Permanent internal capability that compounds over time as your Brand Humanizers develop and train others",
    "Optional quarterly check-ins to stay connected to new research and evolving applications of the framework",
  ],

  whoHeading: "This phase is for organisations who...",
  whoItems: [
    "Have completed the Organisation-Wide Implementation and are ready to own the methodology fully",
    "Have identified internal people with the capability and commitment to carry Brand Humanizing forward",
    "Want a lasting capability, not a consulting dependency",
    "Are building a long-term culture of human-centered thinking and need internal stewards for that culture",
  ],

  testimonials: [
    { quote: "We didn't just leave with a framework. We left with people who own it. That's worth more than any document they could have handed us.", who: "L&D Director, Healthcare Organisation" },
  ],

  investmentHeading: "Investment",
  investmentBody: [
    "The Handover is included in every Organisation-Wide Implementation engagement. It is not a separate purchase. it is the final phase of the full engagement.",
    "Quarterly check-ins are available after the Handover at a separate rate. Ask us about this when scoping the implementation.",
  ],

  faqs: [
    { q: "Can we do the Handover without doing the full Implementation?", a: "Not as a standalone. The Handover only works because your internal Brand Humanizers have been developing throughout the Implementation engagement. Without that foundation, the training would be theory without practice. If you're interested in a shorter internal capability pathway, the Multi-Day Programme is the right starting point." },
    { q: "What does a certified internal Brand Humanizer actually do?", a: "They run the Audit process internally when new departments or challenges emerge. They facilitate Brainstorms. They train new team members in the four-skill framework. They act as the internal voice of Brand Humanizing when technology or automation decisions are being made. the person who asks the question nobody else thought to ask." },
    { q: "What if the people we designate leave the organisation?", a: "This is a real risk and worth planning for. We recommend designating at least 3 internal Brand Humanizers, not one or two, to build redundancy into the capability. And because your methodology is documented, onboarding a new internal champion is significantly faster than starting from scratch." },
    { q: "Is there ongoing support after the Handover?", a: "Yes. quarterly check-ins are available. These are typically 90-minute sessions where we review how the methodology is being applied, discuss any new challenges, and share relevant research and developments. Think of it as a standing conversation rather than a consulting retainer." },
  ],

  relatedEngagements: [
    { label: "The Inspiration Session", description: "Every journey through the five steps starts here. If you're reading this page and haven't started yet, this is where to go.", to: "/work-with-us/inspiration-session" },
    { label: "Organisation-Wide Implementation", description: "The Handover is the final phase of the Implementation. Learn what the full engagement looks like.", to: "/work-with-us/organisation-wide-implementation" },
    { label: "The Multi-Day Programme", description: "The people you're planning to designate as internal Brand Humanizers will move through the Handover faster if they've already done the Multi-Day Programme.", to: "/learning/multi-day-programme" },
  ],

  finalCtaHeading: "The goal was always your independence.",
  finalCtaSubline: "Build an organisation that doesn't need us.",
  finalCtaLabel: "Ask about the Handover",
  finalCtaTo: "/contact?product=handover",

  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Humanizing Handover",
    description: "The final phase of Organisation-Wide Implementation: training internal Brand Humanizers and transferring the methodology for permanent organisational independence.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    areaServed: { "@type": "Place", name: "Europe" },
  },
};

export default function Handover() {
  return <FullServicePageTemplate data={data} />;
}
