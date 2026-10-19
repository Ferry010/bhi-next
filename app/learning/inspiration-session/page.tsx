import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.inspiration;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/inspiration-session" },
  title: "Brand Humanizing Spark Session | 60-Minute Keynote for Teams",
  description:
    "A one-hour keynote that gets your team ahead of the AI curve and hungry to change. Delivered by international speaker Ferry Hoes. For a whole team or event audience.",
  openGraph: { images: [{ url: "/og/inspiration-session.jpg" }] },
};

const data = {
  seoTitle: "Brand Humanizing Spark Session | 60-Minute Keynote for Teams",
  seoDescription: "A one-hour keynote that gets your team ahead of the AI curve and hungry to change.",
  seoOgImage: "/og/inspiration-session.jpg",
  path: "/learning/inspiration-session",
  breadcrumbs: [{ label: "How we help", to: "/learning" }, { label: "Spark Session" }],
  badge: "Most teams start here",
  title: "The Spark Session",
  subtitle:
    "One talk that gets your team excited about working with AI, instead of afraid of it. They walk out seeing their work, and what makes them special, in a whole new way.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes",
  urgencyLine:
    "Every month you wait, your team looks a bit more like everyone else’s.",
  description:
    "This is where it clicks for most companies. In about an hour, Ferry shares the ideas that have helped dozens of European companies get ahead. No boring slides. No AI hype. A sharp, funny, honest talk about what your company is really for. About why teams that work with technology, not against it, are pulling ahead. And about what that means for the people in the room. They leave full of energy, and for once, on the same page.",
  fomo: {
    heading: "Why now, and not later?",
    lead: "It takes one hour. Waiting costs you months.",
    points: [
      "Your competitors are already learning to work with AI. The gap between you grows every week you spend planning a meeting about it.",
      "Your best people are quietly asking themselves if this is still a fun place to work. One hour that shows them what is possible here can change their answer.",
      "The teams that move first set the bar. Everyone else spends years catching up. Right now, the bar is still up for grabs. Not for long.",
      "Standing still feels safe, but it means falling behind. Every month you wait, the team across the street gets further ahead.",
    ],
  },
  leaveWith: [
    "A team that finally sees why standing still is the real risk",
    "The same words for the talks you've been having in bits and pieces",
    "A clear view of what to give to computers, and what to keep for people",
    "First steps made for your company, not general advice",
    "The book for everyone, so the story sticks",
  ],
  pricingSignal: P.investmentLine,
  priceFrom: P.priceFrom,
  priceNote:
    "The final price depends on your group size and where we meet. You get it in writing, with a date, within one working day.",
  includes: [
    "Ferry on your stage, in person or online",
    "A 30-minute call first, so Ferry can fit the talk to your company",
    "A copy of the book for every participant",
    "First steps made for your company",
  ],
  howItWorks: [
    { title: "Request a quote", body: "Five fields. You get a date and an exact price within one working day." },
    { title: "A short call", body: "Thirty minutes with Ferry about your company and what your team should take away." },
    { title: "Made for your team", body: "Ferry fits the talk to your team. Best 3 to 6 weeks ahead." },
    { title: "The talk", body: "Ferry on your stage, and the book for everyone, so the story sticks." },
  ],
  honest: {
    forYou:
      "You want everyone to hear the same story at the same moment. At a kick-off, a team day or a company event, with ten people or five hundred.",
    notForYou:
      "You want your team to walk out able to do something new. One talk wakes people up, it doesn't teach them how. That's the Training.",
    catch:
      "It's one hour, so it starts the change, it doesn't finish it. VAT and travel outside Rotterdam come on top of the price.",
    showTerms: true,
    worth:
      "From €3,500 for the whole room, the book for everyone included. With 100 people that's €35 a person: less than a team lunch, for one hour that gets everyone talking about the same thing.",
    monday:
      "People use the same words for AI and for what makes you different. The meeting about \"what do we do with AI\" finally has a starting point. And the book is on their desks.",
  },
  groupOptions: ["Up to 50", "50 to 150", "150 to 500", "500+"],
  level: "spark" as const,
  includesBook: true,
  ctaLabel: "Book this session",
  ctaProduct: "inspiration-session",
  testimonials: [
    { quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room. We're very happy with the collaboration.", who: "Almer, ASR" },
    { quote: "Ferry has the gift of explaining complex theory in an accessible way. Even those without any experience came out of the workshop surprised and very enthusiastic.", who: "Maud, Chubb Fire & Security" },
  ],
  faqs: [
    { q: "Can the session be delivered online?", a: "Yes. In person and online both work well. We pick what suits you in the first call." },
    { q: "How much advance notice do you need?", a: "Best is 3 to 6 weeks. That gives us time for a short call, so we can fit the talk to your team." },
    { q: "What does Ferry need to know beforehand?", a: "We have a 30-minute call about your company, your field, and what you want your team to take away." },
    { q: "Is there a maximum group size?", a: "No. We have spoken to groups of more than 500. The talk works for any size." },
    { q: "What do I get for the price?", a: "Ferry on your stage, a talk made for your company, and the book for everyone in the room. Travel outside Rotterdam is billed on top." },
  ],
  crossSells: [
    { label: "Want to get acquainted first?", description: "The book is the cheapest way in. Read it, then we'll talk. Every session participant gets a copy anyway.", to: "/book" },
    { label: "Want to go deeper?", description: "The Training teaches your team the four skills in one day, and sends them home with a 90-day plan.", to: "/learning/full-day-course" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Brand Humanizing Spark Session",
    description: "A 60–90 minute keynote that gives your team a shared language for human-technology strategy.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT90M" },
  },
};

export default function InspirationSessionPage() {
  return <ProductPageTemplate data={data} />;
}
