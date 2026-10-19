import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.fullDay;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/full-day-course" },
  title: "The Brand Humanizing Training | One Day, Human Skills for the AI Era",
  description:
    "One focused day that teaches your team to out-human its competitors and leaves with a 90-day plan. Led by international speaker Ferry Hoes. For teams of 12–30.",
  openGraph: { images: [{ url: "/og/full-day-course.jpg" }] },
};

const data = {
  seoTitle: "The Brand Humanizing Training | One Day, Human Skills for the AI Era",
  seoDescription: "One focused day that teaches your team to out-human its competitors and leaves with a 90-day plan.",
  path: "/learning/full-day-course",
  breadcrumbs: [{ label: "How we help", to: "/learning" }, { label: "The Training" }],
  badge: "Most chosen",
  title: "The Training",
  subtitle:
    "The Spark Session gets your team excited. The Training teaches them how to do it. One full day, and your team goes from \"interesting\" to \"we can do this\", with a 90-day plan to prove it.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes and/or Jonathan Flores",
  urgencyLine:
    "The teams that book this would rather be a year ahead than spend next year catching up.",
  description:
    "Our most chosen level. One full day to learn the four skills computers can't copy, and turn them into a plan you can start the next week. It's not a lecture, it's a working day. Your team works out what to give to computers and what to keep for people. They see honestly where they stand. They find the human chances their competitors miss. And they learn to use AI as a tool, not fear it as a threat. They leave sharper, on the same page, and ahead.",
  agenda: [
    { time: "08:45", activity: "Walk-in and coffee" },
    { time: "09:00", activity: "Start: what we heard in our call, and why we're here" },
    { time: "09:30", activity: "The idea: the pyramid and the four skills" },
    { time: "10:30", activity: "Coffee break" },
    { time: "10:45", activity: "Workshop: what goes to computers, what stays with people" },
    { time: "12:00", activity: "Lunch" },
    { time: "13:00", activity: "Skills check: where your team really stands" },
    { time: "14:00", activity: "Workshop: the human opportunities your competitors miss" },
    { time: "15:00", activity: "Coffee break" },
    { time: "15:15", activity: "Building your 90-day plan" },
    { time: "16:00", activity: "Wrap-up: next steps, and who does what" },
    { time: "16:30", activity: "Close" },
  ],
  leaveWith: [
    "The four skills, understood well enough to use",
    "A clear map of what goes to computers and what stays with people",
    "An honest check of your team's skills: AI, creativity, understanding people, and doing the right thing",
    "A short list of human chances your competitors are missing",
    "A 90-day plan with names and dates, ready for Monday",
    "The book for everyone",
  ],
  pricingSignal: P.investmentLine,
  priceFrom: P.priceFrom,
  priceNote:
    "The final price depends on your team and where we meet. You get it in writing, with a date, within one working day.",
  includes: [
    "A full day with one of the founders",
    "A 30-minute call first, so we can fit the day to your team",
    "All materials and your team's 90-day plan",
    "A copy of the book for every participant",
  ],
  howItWorks: [
    { title: "Request a quote", body: "Five fields. You get a date and an exact price within one working day." },
    { title: "A short call", body: "Thirty minutes about your team, where it stands and what the day should bring." },
    { title: "The day", body: "From the idea, to a check of your skills, to a plan. All in one day." },
    { title: "Your 90-day plan", body: "Your team leaves with it. Many then do the Taskforce to make it stick." },
  ],
  honest: {
    forYou:
      "One team, up to 30 people, that gets the idea and now needs to do something with it. You pick the team that goes first.",
    notForYou:
      "Nobody has heard the story yet: start with a Spark Session. Or you want the whole company to change at once: that's the Taskforce.",
    catch:
      "It's a working day, not a lecture. Your whole team needs to be there for the whole day. It works much better in person. VAT and travel outside Rotterdam come on top.",
    showTerms: true,
    worth:
      "From €7,500 for up to 30 people: €250 a person for a full day with one of the founders, the book, and a 90-day plan with names and dates.",
    monday:
      "Your team knows which work goes to computers and which stays with people. There's a 90-day plan on the wall with names and dates, and the first step starts that week.",
  },
  groupOptions: ["Up to 12", "12 to 20", "20 to 30", "More than 30"],
  level: "training" as const,
  includesBook: true,
  ctaLabel: "Book the Training",
  ctaProduct: "full-day-course",
  testimonials: [
    { quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room.", who: "Almer, ASR" },
    { quote: "Even those without any experience came out of the workshop surprised and very enthusiastic. The full day gave us something we can actually work with.", who: "Maud, Chubb Fire & Security" },
  ],
  faqs: [
    { q: "Why one full day, and not two half days?", a: "One day keeps the energy up. Your team goes from the idea, to a skills check, to a plan, without a break in between. Splitting it loses that." },
    { q: "Can it be delivered online?", a: "Yes, but in person works much better for a working day like this. We pick what suits you in the first call." },
    { q: "What preparation is needed?", a: "Only a 30-minute call with us. Your team just shows up, ready to work." },
    { q: "What do I get for the price?", a: "A full day with one of the founders, all materials, the 90-day plan, and the book for everyone. Travel outside Rotterdam is billed on top." },
    { q: "What happens after the training day?", a: "You leave with a 90-day plan. Many companies then do the Taskforce, where their own people make it part of how they work." },
  ],
  crossSells: [
    { label: "Want it to actually stick?", description: "The Taskforce turns one real challenge into a working pilot over sixteen weeks, run by your own people. When we leave, the capability stays.", to: "/taskforce" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "The Brand Humanizing Training",
    description: "A one-day training in the four Brand Humanizing skills, ending with a 90-day plan.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "PT7H" },
  },
};

export default function FullDayCoursePage() {
  return <ProductPageTemplate data={data} />;
}
