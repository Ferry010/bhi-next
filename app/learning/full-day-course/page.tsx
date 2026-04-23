import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Full-Day Brand Humanizing Course | Human Skills for the AI Era",
  description:
    "The flagship full-day training. Build the complete four-skill framework, create a 90-day implementation plan. For teams of 12–30. From €6,500.",
  openGraph: { images: [{ url: "/og/full-day-course.jpg" }] },
};

const data = {
  seoTitle: "Full-Day Brand Humanizing Course | Human Skills for the AI Era",
  seoDescription: "The flagship full-day training. Build the complete four-skill framework, create a 90-day implementation plan.",
  path: "/learning/full-day-course",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Full-Day Course" }],
  badge: "Flagship training",
  title: "The Full-Day Course",
  subtitle: "The inspiration session opens the conversation. The full-day training builds the skill. Over one focused day, your team works through the Brand Humanizing framework in depth and leaves with a plan.",
  duration: "6–7 hours",
  audience: "12–30 people",
  deliveredBy: "Ferry Hoes and/or Jonathan Flores",
  description: "This is the flagship learning product. A full day dedicated to building your team's fluency in the Brand Humanizing framework. Not a lecture: a working session. Your team maps their own Human-Technology Fit, inventories their skills across all four dimensions, identifies opportunities they've been missing, and builds a 90-day implementation plan they can start executing the following week.",
  agenda: [
    { time: "9:00", activity: "Intake review and context setting" },
    { time: "9:30", activity: "Framework deep-dive: the pyramid and four skills" },
    { time: "10:30", activity: "Break" },
    { time: "10:45", activity: "Workshop: mapping your Human-Technology Fit" },
    { time: "12:00", activity: "Lunch" },
    { time: "13:00", activity: "Skills inventory: where your team stands across all four dimensions" },
    { time: "14:00", activity: "Workshop: identifying human opportunities in your organization" },
    { time: "15:00", activity: "Break" },
    { time: "15:15", activity: "Building your 90-day implementation roadmap" },
    { time: "16:00", activity: "Wrap-up: shared language, next steps, commitments" },
  ],
  leaveWith: [
    "The complete Brand Humanizing four-skill framework, deeply understood and applied",
    "A mapped assessment of your current Human-Technology Fit",
    "An honest team skills inventory across AI literacy, creativity, human sciences, and EQ & ethics",
    "A prioritized list of human opportunities your organization has been missing",
    "A 90-day implementation plan with clear owners and milestones",
  ],
  pricingSignal: "From €6,500. Every participant receives a copy of the book.",
  includesBook: true,
  ctaLabel: "Book the full-day",
  ctaProduct: "full-day-course",
  testimonials: [
    { quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room.", who: "Almer, ASR" },
    { quote: "Even those without any experience came out of the workshop surprised and very enthusiastic. The full day gave us something we can actually work with.", who: "Maud, Chubb Fire & Security" },
  ],
  faqs: [
    { q: "What makes this different from two half-day sessions?", a: "The full day creates momentum. Your team goes from framework understanding to skills inventory to implementation plan in one continuous arc. Splitting it breaks the flow." },
    { q: "Can it be delivered online?", a: "Yes, though in-person is strongly recommended for the workshop intensity. We discuss formats during intake." },
    { q: "What preparation is needed?", a: "We handle the preparation through a 30-minute intake conversation. Your team shows up ready to work." },
    { q: "What happens after the training day?", a: "You leave with a 90-day plan. Many organizations follow up with a Multi-Day Programme or a project engagement to continue building." },
  ],
  crossSells: [
    { label: "Want this across the whole organisation?", description: "The Multi-Day Programme extends the training to leadership teams over 2–3 days.", to: "/learning/multi-day-programme" },
    { label: "Ready to implement?", description: "Our project engagements embed Brand Humanizing into your operations.", to: "/work-with-us" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Full-Day Brand Humanizing Course",
    description: "The flagship full-day training in the Brand Humanizing framework.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT7H" },
  },
};

export default function FullDayCoursePage() {
  return <ProductPageTemplate data={data} />;
}
