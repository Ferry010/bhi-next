import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";
import { PRODUCTS } from "@/lib/pricing";

const P = PRODUCTS.multiDay;

export const metadata: Metadata = {
  alternates: { canonical: "/learning/multi-day-programme" },
  title: "Multi-Day Brand Humanizing Programme | Leadership Team Training",
  description:
    "A 2–3 day programme that puts Brand Humanizing into how your leadership decides, and leaves it there. Led by Ferry Hoes and Jonathan Flores. For teams of 8–20.",
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
  urgencyLine:
    "Alignment is cheapest to build now. Retrofitting it into a strategy already in motion costs far more.",
  description:
    "This is not a longer training day. It is a transformation designed for the people who set direction. Over two to three days, your leadership team aligns on the framework, maps the whole organisation's Human-Technology Fit, names the internal champions who will carry it, and builds a strategy that outlives the room. You walk out with decisions, owners and a way of thinking your competitors can't buy off a shelf.",
  agendaLabel: "Typical three-day structure",
  agendaDays: [
    {
      day: "Day 1 · Alignment and the framework",
      items: [
        { time: "09:00", activity: "Walk-in and coffee" },
        { time: "09:15", activity: "Opening: why this, why now, for this leadership team" },
        { time: "10:00", activity: "The strategic case for Brand Humanizing" },
        { time: "10:45", activity: "Coffee break" },
        { time: "11:00", activity: "Framework deep-dive: the pyramid and the four skills" },
        { time: "12:30", activity: "Lunch" },
        { time: "13:30", activity: "Mapping your organisation's Human-Technology Fit" },
        { time: "15:15", activity: "Workshop: where technology belongs, and where your people do" },
        { time: "16:30", activity: "Day 1 close and reflection" },
      ],
    },
    {
      day: "Day 2 · People and capability",
      items: [
        { time: "09:00", activity: "Recap, and the day ahead" },
        { time: "09:30", activity: "Skills inventory across departments and levels" },
        { time: "10:45", activity: "Coffee break" },
        { time: "11:00", activity: "Where the real gaps are, and which ones matter" },
        { time: "12:30", activity: "Lunch" },
        { time: "13:30", activity: "Internal champion selection: who carries this after we leave" },
        { time: "15:15", activity: "Capability design: building it to last without us" },
        { time: "16:30", activity: "Day 2 close" },
      ],
    },
    {
      day: "Day 3 · Strategy and commitment",
      items: [
        { time: "09:00", activity: "Recap, and the day ahead" },
        { time: "09:30", activity: "Strategy building: the 12 to 36 month roadmap" },
        { time: "10:45", activity: "Coffee break" },
        { time: "11:00", activity: "Pressure-testing the roadmap against your reality" },
        { time: "12:30", activity: "Lunch" },
        { time: "13:30", activity: "Commitment session: decisions, owners, milestones" },
        { time: "15:15", activity: "What happens Monday, and the ninety days after" },
        { time: "16:00", activity: "Programme close" },
      ],
    },
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
