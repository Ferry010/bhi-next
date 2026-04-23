import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Brand Humanizing Inspiration Session | 60–90 Min Team Workshop",
  description:
    "A 60–90 minute interactive session that gives your team a shared language for human-technology strategy. For teams of 15–500. From €2,500.",
  openGraph: { images: [{ url: "/og/inspiration-session.jpg" }] },
};

const data = {
  seoTitle: "Brand Humanizing Inspiration Session | 60–90 Min Team Workshop",
  seoDescription: "A 60–90 minute interactive session that gives your team a shared language for human-technology strategy.",
  seoOgImage: "/og/inspiration-session.jpg",
  path: "/learning/inspiration-session",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Inspiration Session" }],
  badge: "Most teams start here",
  title: "The Inspiration Session",
  subtitle: "The question that started everything. One session. One conversation. A room that leaves thinking differently about what their work is actually for.",
  duration: "60–90 minutes",
  audience: "15–500+ people",
  deliveredBy: "Ferry Hoes",
  description: "This is where Brand Humanizing starts for most organizations. In 60 to 90 minutes, Ferry takes your team through the framework that has reshaped how organizations across Europe think about the relationship between humans and technology. No slides full of bullet points. No generic AI hype. An honest, interactive conversation about what your organization is actually for — and what that means for the people inside it.",
  agenda: [
    { time: "9:00", activity: "Opening: the question that started everything" },
    { time: "9:15", activity: "The state of human-technology relationships in your industry" },
    { time: "9:30", activity: "The Brand Humanizing framework: four skills, one pyramid" },
    { time: "9:45", activity: "Your organization: an honest first read" },
    { time: "10:00", activity: "What you can start doing differently on Monday" },
    { time: "10:15", activity: "Q&A and conversation" },
  ],
  leaveWith: [
    "A clear mental model for thinking about technology and human value",
    "The four-skill framework and an honest read of where your organization stands",
    "Concrete starting points specific to your context",
    "A shared language for conversations you've been having in fragments",
  ],
  pricingSignal: "Pricing from €2,500 — varies by group size and format. Reach out for a quote.",
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
    { q: "What does Ferry need to know beforehand?", a: "We have a 30-minute intake conversation to understand your organization, industry, and what you want the room to walk away with." },
    { q: "Is there a maximum group size?", a: "No formal maximum. We've delivered to groups of 500+. The session adapts to the room." },
  ],
  crossSells: [
    { label: "Want to go deeper?", description: "The Full-Day Course builds the complete four-skill framework with your team.", to: "/learning/full-day-course" },
    { label: "Ready for leadership alignment?", description: "The Multi-Day Programme embeds Brand Humanizing into how your leadership team thinks.", to: "/learning/multi-day-programme" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Brand Humanizing Inspiration Session",
    description: "A 60–90 minute interactive session that gives your team a shared language for human-technology strategy.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT90M" },
  },
};

export default function InspirationSessionPage() {
  return <ProductPageTemplate data={data} />;
}
