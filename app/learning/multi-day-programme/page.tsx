import type { Metadata } from "next";
import ProductPageTemplate from "@/components/learning/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Multi-Day Brand Humanizing Programme | Leadership Team Training",
  description:
    "A 2–3 day transformational programme for leadership teams. Full framework adoption, internal champion designation. From €12,500.",
  openGraph: { images: [{ url: "/og/multi-day-programme.jpg" }] },
};

const data = {
  seoTitle: "Multi-Day Brand Humanizing Programme | Leadership Team Training",
  seoDescription: "A 2–3 day transformational programme for leadership teams.",
  path: "/learning/multi-day-programme",
  breadcrumbs: [{ label: "Learning", to: "/learning" }, { label: "Multi-Day Programme" }],
  badge: "For leadership teams",
  title: "The Multi-Day Programme",
  subtitle: "For leadership teams ready to make Brand Humanizing part of how they lead. Two to three days that change how your team thinks about technology, people, and competitive advantage.",
  duration: "2–3 days",
  audience: "8–20 people",
  deliveredBy: "Ferry Hoes and Jonathan Flores",
  description: "This is not a longer version of the training day. It is a transformational experience designed for leadership teams who want to embed Brand Humanizing into how they make decisions. Over two to three days, your leadership team aligns on the framework, maps the entire organization's Human-Technology Fit, designates internal champions, and builds a strategy that lasts beyond the programme.",
  agendaLabel: "Typical programme structure",
  agenda: [
    { time: "Day 1, 9:00", activity: "Leadership alignment: the strategic case for Brand Humanizing" },
    { time: "Day 1, 13:00", activity: "Framework deep-dive and organizational mapping" },
    { time: "Day 2, 9:00", activity: "Skills inventory across departments and levels" },
    { time: "Day 2, 13:00", activity: "Internal champion selection and capability design" },
    { time: "Day 3, 9:00", activity: "Strategy building: 12–36 month roadmap" },
    { time: "Day 3, 13:00", activity: "Commitment session: decisions, owners, milestones" },
  ],
  leaveWith: [
    "Full leadership team alignment on the Brand Humanizing framework",
    "A complete organizational Human-Technology Fit map",
    "Designated internal champions who can sustain the methodology",
    "A 12–36 month strategy with clear decisions and milestones",
    "A shared language that makes technology-human conversations productive",
  ],
  pricingSignal: "From €12,500, scoped to your leadership team size and objectives.",
  includesBook: true,
  ctaLabel: "Design our programme",
  ctaProduct: "multi-day-programme",
  testimonials: [
    { quote: "The multi-day format gave our leadership team something a single session never could: genuine alignment. We left with decisions, not just inspiration.", who: "Leadership participant, Financial Services" },
  ],
  faqs: [
    { q: "What's the ideal group size?", a: "8–20 people. This is designed for leadership teams, not large audiences. The intimacy is what makes it work." },
    { q: "Can it be two days instead of three?", a: "Yes. We scope the programme to your needs during intake. Two days is common; three days allows for deeper strategy work." },
    { q: "Where does it take place?", a: "At your location, at our Rotterdam office, or at an off-site venue. Many teams prefer to get away from the office for this." },
    { q: "What happens after the programme?", a: "You leave with internal champions and a roadmap. Many organizations continue with an Organisation-Wide Implementation engagement." },
  ],
  crossSells: [
    { label: "Want this embedded organisation-wide?", description: "Our implementation engagement takes what your leadership team built and rolls it across the organization.", to: "/work-with-us/organisation-wide-implementation" },
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
