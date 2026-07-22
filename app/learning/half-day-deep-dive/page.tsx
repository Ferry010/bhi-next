import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.halfDay;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/half-day-deep-dive" },
  title: "Half-Day Deep Dive | One Brand Humanizing Theme, Hands-On",
  description:
    "Three to four hours on a single Brand Humanizing theme, from AI Ethics to Staying Human. One team leaves able to apply it, not just discuss it. Led by Ferry Hoes.",
  openGraph: { images: [{ url: "/og/full-day-course.jpg" }] },
};

const data = {
  seoTitle: "Half-Day Deep Dive | One Brand Humanizing Theme, Hands-On",
  seoDescription: "Three to four hours on a single Brand Humanizing theme, hands-on.",
  path: "/learning/half-day-deep-dive",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Half-Day Deep Dive" }],
  badge: "One theme, taken deep",
  title: "The Half-Day Deep Dive",
  subtitle:
    "The Spark Session opens the conversation. This is where one team rolls up its sleeves on a single theme, from AI Ethics to Staying Human, and leaves able to apply it the same week.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes",
  description:
    "Pick the theme that fits your moment. AI Ethics and the Human Edge, when your team is deploying AI and needs a spine. Staying Human in a Digital World, when the culture is drifting. Whatever the theme, this is three to four hours of hands-on work, not a talk. Your team takes the framework, applies it to their own cases, and walks out with something they can use, not just notes they'll forget.",
  agendaLabel: "How a deep dive runs",
  agenda: [
    { time: "0:00", activity: "Framing the theme against your reality" },
    { time: "0:30", activity: "The Brand Humanizing lens on this theme" },
    { time: "1:15", activity: "Workshop: your team's own cases, worked through live" },
    { time: "2:15", activity: "Break" },
    { time: "2:30", activity: "From insight to what changes on Monday" },
    { time: "3:15", activity: "Commitments and open discussion" },
  ],
  leaveWith: [
    "A working grasp of one Brand Humanizing theme, applied to your context",
    "Your team's own cases worked through, not generic examples",
    "A short list of concrete changes to make the same week",
    "A shared language for a conversation you've been having in fragments",
    "The book in every pair of hands",
  ],
  pricingSignal: P.investmentLine,
  includesBook: true,
  ctaLabel: "Book a deep dive",
  ctaProduct: "half-day-deep-dive",
  testimonials: [
    { quote: "I recently organized a workshop where Ferry Hoes and the Brand Humanizing Institute delivered a lecture on the Ethics of AI. No 'Death by PowerPoint,' but a smooth and captivating story that got us as an IT organization thinking.", who: "Laurens, Atos" },
  ],
  faqs: [
    { q: "Which themes can we choose from?", a: "AI Ethics and the Human Edge, and Staying Human in a Digital World are the two we run most. We shape the theme to your moment in the intake, so if there's a sharper fit for your team, we'll build it." },
    { q: "How is this different from the Full-Day Course?", a: "The deep dive goes deep on one theme. The Full-Day Course builds the complete four-skill framework and sends your team home with a 90-day plan. Many teams do a deep dive first, then the full day." },
    { q: "Can it be delivered online?", a: "Yes, though in-person keeps the workshop energy higher. We discuss formats in the intake." },
    { q: "What's included in the investment?", a: "Ferry for the session, a theme shaped around your team, all materials, and a copy of the book for every participant. Travel outside Rotterdam is billed separately." },
  ],
  crossSells: [
    { label: "Want the whole method?", description: "The Full-Day Course builds all four skills and a 90-day plan in one day.", to: "/learning/full-day-course" },
    { label: "Start lighter?", description: "The Spark Session wakes the whole team up in an hour.", to: "/learning/inspiration-session" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Brand Humanizing Half-Day Deep Dive",
    description: "A 3–4 hour hands-on deep dive on a single Brand Humanizing theme.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT4H" },
  },
};

export default function HalfDayDeepDivePage() {
  return <ProductPageTemplate data={data} />;
}
