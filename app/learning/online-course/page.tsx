import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Brand Humanizing Online Course | Coming Soon",
  description:
    "Self-paced online course in the Brand Humanizing framework. Learn the four skills at your own pace. Coming soon.",
};

const data = {
  seoTitle: "Brand Humanizing Online Course | Coming Soon",
  seoDescription: "Self-paced online course in the Brand Humanizing framework. Coming soon.",
  path: "/learning/online-course",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Online Course" }],
  badge: "Coming soon",
  title: "The Online Course",
  subtitle: "Learn the Brand Humanizing framework at your own pace. For the individual who loves the thinking and wants to build the skill, before bringing it to their team.",
  duration: "Self-paced · 4–6 modules",
  audience: "Individual",
  deliveredBy: "Ferry Hoes (video)",
  description: "The full Brand Humanizing framework — the pyramid, the four skills, the real-world case studies — in a format you can learn at your desk. We're building this now based on demand. Join the waitlist to be first.",
  agenda: [
    { time: "Module 1", activity: "Introduction: The human-technology question" },
    { time: "Module 2", activity: "The Brand Humanizing Pyramid" },
    { time: "Module 3", activity: "The four skills: deep dive" },
    { time: "Module 4", activity: "Mapping your own Human-Technology Fit" },
    { time: "Module 5", activity: "Real-world case studies" },
    { time: "Module 6", activity: "Building your personal Brand Humanizer plan" },
  ],
  leaveWith: [
    "Complete understanding of the Brand Humanizing framework",
    "Your personal Human-Technology Fit map",
    "A plan for bringing it to your team",
    "Certificate of completion",
  ],
  pricingSignal: "Pricing to be announced. Join the waitlist to be first and get the introductory rate.",
  includesBook: false,
  ctaLabel: "Join the waitlist",
  ctaProduct: "online-course",
  comingSoon: true,
  testimonials: [],
  faqs: [
    { q: "When will this be available?", a: "We're building it now. The waitlist determines the development priority. Join and we'll let you know as soon as it's ready." },
    { q: "Will there be a certificate?", a: "Yes. Completion of the online course comes with a certificate of completion from the Brand Humanizing Institute." },
  ],
  crossSells: [
    { label: "Want it sooner?", description: "The Inspiration Session is available now. 90 minutes with Ferry, live.", to: "/learning/inspiration-session" },
    { label: "AI literacy certificate", description: "Available now via AIGA. EU AI Act compliant.", to: "/learning/ai-literacy-certificate" },
  ],
};

export default function OnlineCoursePage() {
  return <ProductPageTemplate data={data} />;
}
