import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.fullDay;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/full-day-course" },
  title: "Full-Day Brand Humanizing Course | Human Skills for the AI Era",
  description:
    "One focused day that teaches your team to out-human its competitors and leaves with a 90-day plan. Led by international speaker Ferry Hoes. For teams of 12–30.",
  openGraph: { images: [{ url: "/og/full-day-course.jpg" }] },
};

const data = {
  seoTitle: "Full-Day Brand Humanizing Course | Human Skills for the AI Era",
  seoDescription: "One focused day that teaches your team to out-human its competitors and leaves with a 90-day plan.",
  path: "/learning/full-day-course",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Full-Day Course" }],
  badge: "Flagship training",
  title: "The Full-Day Course",
  subtitle:
    "The Inspiration Session opens the conversation. This builds the skill. One focused day and your team goes from curious to genuinely capable, with a 90-day plan to prove it.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes and/or Jonathan Flores",
  description:
    "This is the flagship. A full day dedicated to making your team fluent in the four skills technology can't replace, then turning that fluency into a plan you can run the following week. It's not a lecture, it's a working day. Your team maps their own Human-Technology Fit, takes an honest inventory of where they stand, spots the human opportunities their competitors are walking straight past, and learns to make AI a tool their people wield rather than a threat they fear. They leave sharper, aligned, and genuinely ahead.",
  agenda: [
    { time: "9:00", activity: "Intake review and context setting" },
    { time: "9:30", activity: "Framework deep-dive: the pyramid and four skills" },
    { time: "10:30", activity: "Break" },
    { time: "10:45", activity: "Workshop: mapping your Human-Technology Fit" },
    { time: "12:00", activity: "Lunch" },
    { time: "13:00", activity: "Skills inventory: where your team really stands" },
    { time: "14:00", activity: "Workshop: the human opportunities your competitors miss" },
    { time: "15:00", activity: "Break" },
    { time: "15:15", activity: "Building your 90-day plan" },
    { time: "16:00", activity: "Wrap-up: shared language, next steps, commitments" },
  ],
  leaveWith: [
    "The complete four-skill framework, understood deeply enough to use",
    "A mapped read of your current Human-Technology Fit",
    "An honest team skills inventory across AI, creativity, human sciences, and EQ & ethics",
    "A prioritised list of human opportunities your competitors are missing",
    "A 90-day plan with clear owners and milestones you can start Monday",
    "The book in every pair of hands",
  ],
  pricingSignal: P.investmentLine,
  includesBook: true,
  ctaLabel: "Book the full day",
  ctaProduct: "full-day-course",
  testimonials: [
    { quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room.", who: "Almer, ASR" },
    { quote: "Even those without any experience came out of the workshop surprised and very enthusiastic. The full day gave us something we can actually work with.", who: "Maud, Chubb Fire & Security" },
  ],
  faqs: [
    { q: "What makes this different from two half-day sessions?", a: "The full day creates momentum. Your team goes from framework to skills inventory to a plan in one continuous arc. Splitting it breaks the flow." },
    { q: "Can it be delivered online?", a: "Yes, though in-person is strongly recommended for the workshop intensity. We discuss formats during intake." },
    { q: "What preparation is needed?", a: "We handle it through a 30-minute intake conversation. Your team shows up ready to work." },
    { q: "What's included in the investment?", a: "The full day led by a founder, all materials, the 90-day plan, and a copy of the book for every participant. Travel outside Rotterdam is billed separately." },
    { q: "What happens after the training day?", a: "You leave with a 90-day plan. Many organisations follow up with a Multi-Day Programme or a project engagement to keep building." },
  ],
  crossSells: [
    { label: "Want this across the whole organisation?", description: "The Multi-Day Programme extends the training to leadership teams over 2–3 days.", to: "/learning/multi-day-programme" },
    { label: "Ready to implement?", description: "Our project engagements embed Brand Humanizing into how you actually operate.", to: "/work-with-us" },
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
