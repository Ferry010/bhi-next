import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.inspiration;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/inspiration-session" },
  title: "Brand Humanizing Inspiration Session | Keynote for Teams",
  description:
    "A 60–90 minute keynote that gets your team ahead of the AI curve and hungry to change. Delivered by international speaker Ferry Hoes. For teams of 15–500+.",
  openGraph: { images: [{ url: "/og/inspiration-session.jpg" }] },
};

const data = {
  seoTitle: "Brand Humanizing Inspiration Session | Keynote for Teams",
  seoDescription: "A 60–90 minute keynote that gets your team ahead of the AI curve and hungry to change.",
  seoOgImage: "/og/inspiration-session.jpg",
  path: "/learning/inspiration-session",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Inspiration Session" }],
  badge: "Most teams start here",
  title: "The Inspiration Session",
  subtitle:
    "One keynote that stops your team defending the old way of working and gets them hungry for the new one. They walk out seeing AI, their work and their edge over the competition completely differently.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes",
  description:
    "This is where it clicks for most organisations. In 60 to 90 minutes, Ferry takes your team through the thinking that has put dozens of European organisations ahead of their competitors. Not slides full of bullets. Not generic AI hype. A sharp, funny, honest keynote about what your organisation is actually for, why the teams that learn to work with technology instead of against it are pulling away, and what that means for the people in the room. They leave energised and, for once, aligned.",
  agenda: [
    { time: "0:00", activity: "The question that started everything" },
    { time: "0:15", activity: "Where your industry is quietly becoming a commodity" },
    { time: "0:30", activity: "The Brand Humanizing framework: four skills, one pyramid" },
    { time: "0:45", activity: "How the best teams turn AI into an edge instead of a threat" },
    { time: "1:00", activity: "What your people can start doing differently on Monday" },
    { time: "1:15", activity: "Open, honest Q&A" },
  ],
  leaveWith: [
    "A team that finally sees why standing still is the real risk",
    "A shared language for the conversations you've been having in fragments",
    "A clear read on where technology belongs, and where your people do",
    "Concrete first moves, specific to your organisation, not generic advice",
    "The book in every pair of hands to keep the momentum going",
  ],
  pricingSignal: P.investmentLine,
  includesBook: true,
  ctaLabel: "Book this session",
  ctaProduct: "inspiration-session",
  testimonials: [
    { quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room. We're very happy with the collaboration.", who: "Almer, ASR" },
    { quote: "Ferry has the gift of explaining complex theory in an accessible way. Even those without any experience came out of the workshop surprised and very enthusiastic.", who: "Maud, Chubb Fire & Security" },
  ],
  faqs: [
    { q: "Can the session be delivered online?", a: "Yes. Both in-person and virtual formats work well. We discuss what's best for your situation during the intake call." },
    { q: "How much advance notice do you need?", a: "Ideally 3–6 weeks. This gives us time for the intake conversation that shapes the session around your team." },
    { q: "What does Ferry need to know beforehand?", a: "We have a 30-minute intake conversation to understand your organisation, industry, and what you want the room to walk away with." },
    { q: "Is there a maximum group size?", a: "No formal maximum. We've delivered to groups of 500+. The keynote adapts to the room." },
    { q: "What's included in the investment?", a: "Ferry on your stage, a session shaped around your organisation in intake, and a copy of the book for every participant. Travel outside Rotterdam is billed separately." },
  ],
  crossSells: [
    { label: "Want to go deeper?", description: "The Full-Day Course builds the complete four-skill framework with your team and sends them home with a 90-day plan.", to: "/learning/full-day-course" },
    { label: "Ready for leadership alignment?", description: "The Multi-Day Programme embeds Brand Humanizing into how your leadership team decides.", to: "/learning/multi-day-programme" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Brand Humanizing Inspiration Session",
    description: "A 60–90 minute keynote that gives your team a shared language for human-technology strategy.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT90M" },
  },
};

export default function InspirationSessionPage() {
  return <ProductPageTemplate data={data} />;
}
