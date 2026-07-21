import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.multiDay;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/multi-day-programme" },
  title: "Multi-Day Brand Humanizing Programme | Leadership Team Training",
  description:
    "A 2–3 day programme that puts Brand Humanizing into how your leadership decides, and leaves it there. Led by Ferry Hoes and Jonathan Flores. For teams of 8–20. From €15,000.",
  openGraph: { images: [{ url: "/og/multi-day-programme.jpg" }] },
};

const data = {
  seoTitle: "Multi-Day Brand Humanizing Programme | Leadership Team Training",
  seoDescription: "A 2–3 day programme that puts Brand Humanizing into how your leadership decides, and leaves it there.",
  path: "/learning/multi-day-programme",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Multi-Day Programme" }],
  badge: "For leadership teams",
  title: "The Multi-Day Programme",
  subtitle:
    "For leadership teams who want Brand Humanizing built into how they lead, not just something they once heard. Two to three days that change how your team thinks about technology, people and the advantage between them.",
  duration: P.duration,
  audience: P.audience,
  deliveredBy: "Ferry Hoes and Jonathan Flores",
  description:
    "This is not a longer training day. It is a transformation designed for the people who set direction. Over two to three days, your leadership team aligns on the framework, maps the whole organisation's Human-Technology Fit, names the internal champions who will carry it, and builds a strategy that outlives the room. You walk out with decisions, owners and a way of thinking your competitors can't buy off a shelf.",
  agendaLabel: "Typical programme structure",
  agenda: [
    { time: "Day 1, 9:00", activity: "Leadership alignment: the strategic case for Brand Humanizing" },
    { time: "Day 1, 13:00", activity: "Framework deep-dive and organisational mapping" },
    { time: "Day 2, 9:00", activity: "Skills inventory across departments and levels" },
    { time: "Day 2, 13:00", activity: "Internal champion selection and capability design" },
    { time: "Day 3, 9:00", activity: "Strategy building: 12–36 month roadmap" },
    { time: "Day 3, 13:00", activity: "Commitment session: decisions, owners, milestones" },
  ],
  leaveWith: [
    "Full leadership alignment on the Brand Humanizing framework",
    "A complete organisational Human-Technology Fit map",
    "Internal champions equipped to sustain the methodology without you",
    "A 12–36 month strategy with clear decisions and milestones",
    "A shared language that makes technology-and-people conversations productive",
    "The book in every pair of hands",
  ],
  pricingSignal: P.investmentLine,
  includesBook: true,
  ctaLabel: "Design our programme",
  ctaProduct: "multi-day-programme",
  testimonials: [
    { quote: "The multi-day format gave our leadership team something a single session never could: genuine alignment. We left with decisions, not just inspiration.", who: "Leadership participant, Financial Services" },
  ],
  faqs: [
    { q: "What's the ideal group size?", a: "8–20 people. This is designed for leadership teams, not large audiences. The intimacy is what makes it work." },
    { q: "Can it be two days instead of three?", a: "Yes. We scope the programme to your needs during intake. Two days is common; three allows deeper strategy work." },
    { q: "Where does it take place?", a: "At your location, at our Rotterdam office, or an off-site venue. Many teams prefer to get away from the office for this." },
    { q: "What's included in the investment?", a: "Both founders for the full programme, all materials and facilitation, the roadmap you build, and a copy of the book for every participant. Venue and travel are scoped separately." },
    { q: "What happens after the programme?", a: "You leave with internal champions and a roadmap. Many organisations continue with an Organisation-Wide Implementation engagement." },
  ],
  crossSells: [
    { label: "Want this embedded organisation-wide?", description: "Our implementation engagement takes what your leadership team built and rolls it across the organisation.", to: "/work-with-us/organisation-wide-implementation" },
    { label: "Start with a shorter format?", description: "The Full-Day Course gives one team the complete framework in a single day.", to: "/learning/full-day-course" },
  ],
  courseSchema: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Multi-Day Brand Humanizing Programme",
    description: "A 2–3 day transformational programme for leadership teams.",
    provider: { "@type": "Organization", name: "Brand Humanizing Institute", url: "https://brandhumanizing.com" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", duration: "P3D" },
  },
};

export default function MultiDayProgrammePage() {
  return <ProductPageTemplate data={data} />;
}
