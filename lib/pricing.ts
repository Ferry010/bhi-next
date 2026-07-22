// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the Brand Humanizing product line.
// Change a price, a duration, a stage, a stat or an example here and it updates
// everywhere: the pricing page, the learning index, and every product page.
//
// Pricing philosophy (2026-07): we do NOT display prices publicly. Like Growth
// Tribe, we describe each format by scale and outcome and route every path to a
// conversation. The numbers below are kept for internal reference and intake.
// Flip DISPLAY_PRICES to true to show the "from" anchors again.
// ─────────────────────────────────────────────────────────────────────────────

export const DISPLAY_PRICES = false;

// The one commercial CTA across the site. No prices, no forms into the void:
// every "buy" path routes to a real conversation. Swap the URL when the
// scheduling tool changes.
export const TALK_TO_EXPERT = {
  label: "Talk to an expert",
  url: "https://calendly.com/ferryhoes/meeting",
};

// Keynote-specific booking goes through Speakers Academy, not this site.
// Swap the URL in once it's confirmed.
export const SPEAKERS_ACADEMY = {
  label: "Book Ferry for a keynote",
  url: "[PLACEHOLDER: Speakers Academy URL]",
};

export interface ProductPricing {
  slug: string;
  /** Full display name, e.g. "The Inspiration Session" */
  name: string;
  /** One-line experience promise (outcome, not format) */
  promise: string;
  duration: string;
  audience: string;
  /** Who it's for — used as the differentiator when prices are hidden */
  bestFor: string;
  /** Internal reference only (not rendered while DISPLAY_PRICES is false) */
  priceFrom: string;
  /** Compact spec line for cards (no price) */
  specs: string;
  /** Value line shown on the product page where the price used to be */
  investmentLine: string;
  href: string;
}

export const PRODUCTS: Record<"inspiration" | "halfDay" | "fullDay" | "multiDay", ProductPricing> = {
  inspiration: {
    slug: "inspiration-session",
    name: "The Spark Session",
    promise: "The keynote that stops your team defending the old way of working and gets them hungry for the new one.",
    duration: "1 hour",
    audience: "Whole team or event audience",
    bestFor: "A whole department, or the entire company, in one room",
    priceFrom: "€3,500",
    specs: "1 hour · whole team / event audience",
    investmentLine:
      "Every session is shaped around your organisation and scoped in a short intake. Tell us the room and the moment, and we come back with the right format and an exact proposal.",
    href: "/learning/inspiration-session",
  },
  halfDay: {
    slug: "half-day-deep-dive",
    name: "The Half-Day Deep Dive",
    promise: "One theme, taken deep. Your team leaves able to apply it, not just nod along to it.",
    duration: "3–4 hours",
    audience: "One team, one theme",
    bestFor: "One team that wants to go hands-on with a single Brand Humanizing theme",
    priceFrom: "€5,000",
    specs: "3–4 hours · one team, one theme",
    investmentLine:
      "Pick the theme that fits your moment, from AI Ethics to Staying Human. We shape the half day around it and scope it in a short intake.",
    href: "/learning/half-day-deep-dive",
  },
  fullDay: {
    slug: "full-day-course",
    name: "The Full-Day Course",
    promise: "One focused day that turns a curious team into one that knows exactly how to out-human its competitors.",
    duration: "A full day (6–7 hrs)",
    audience: "12–30 people",
    bestFor: "One team that needs to go from curious to genuinely capable",
    priceFrom: "€7,500",
    specs: "Full day · 12–30 people",
    investmentLine:
      "Scoped to your team and objectives in a short intake, and it always includes the 90-day plan and the book for everyone. Tell us where your team is, and we'll come back with a proposal.",
    href: "/learning/full-day-course",
  },
  multiDay: {
    slug: "multi-day-programme",
    name: "The Multi-Day Programme",
    promise: "The programme that puts Brand Humanizing into how your leadership actually decides, and leaves it there.",
    duration: "2–3 days",
    audience: "8–20 people",
    bestFor: "A leadership team ready to change how it decides",
    priceFrom: "€15,000",
    specs: "2–3 days · 8–20 people",
    investmentLine:
      "A programme this deep is always built to fit. We scope the days, the depth and the outcomes with you, then come back with a proposal your board can sign off.",
    href: "/learning/multi-day-programme",
  },
};

export const PRODUCT_LIST = [PRODUCTS.inspiration, PRODUCTS.fullDay, PRODUCTS.multiDay];

// ─────────────────────────────────────────────────────────────────────────────
// Credibility — reused on product pages and the pricing page.
// ─────────────────────────────────────────────────────────────────────────────

export const FACILITATOR = {
  name: "Ferry Hoes",
  role: "Founder & international keynote speaker on Brand Humanizing and AI",
  stagesLine:
    "Ferry has taken Brand Humanizing to stages across Europe, in front of teams at Unilever, VodafoneZiggo, GlaxoSmithKline, Toshiba, Atos and the Dutch government.",
  acknowledgementLine:
    "His work has been acknowledged by Steven Kotler, UN AI advisor Neil Sahota, and former State Secretary Mona Keijzer.",
  closingLine: "He doesn't send a junior trainer. He shows up himself.",
  photo: "/assets/ferry.jpg",
};

export const STATS = [
  { value: "50+", label: "organisations" },
  { value: "~40", label: "keynotes a year" },
  { value: "2017", label: "founded" },
];

export const MARQUEE_LOGOS = [
  { src: "/assets/logos/unilever.png", alt: "Unilever" },
  { src: "/assets/logos/vodafone.png", alt: "Vodafone" },
  { src: "/assets/logos/ziggo.png", alt: "Ziggo" },
  { src: "/assets/logos/gsk.png", alt: "GlaxoSmithKline" },
  { src: "/assets/logos/toshiba.png", alt: "Toshiba" },
  { src: "/assets/logos/atos.png", alt: "Atos" },
  { src: "/assets/logos/asr.png", alt: "a.s.r." },
  { src: "/assets/logos/chubb.png", alt: "Chubb" },
  { src: "/assets/logos/uwv.png", alt: "UWV" },
  { src: "/assets/logos/minfin.png", alt: "Ministerie van Financiën" },
  { src: "/assets/logos/eindhoven.png", alt: "Gemeente Eindhoven" },
  { src: "/assets/logos/ama.webp", alt: "American Marketing Association" },
];

// Concrete "they already heard this and acted on it" examples. Grounded in the
// real-world cases already published on /the-method.
export const EXAMPLES = [
  {
    tag: "Retail",
    title: "The store that stopped selling and started helping",
    body: "Apple doesn't staff its stores with salespeople. It staffs them with enthusiasts. The technology runs the backend, the humans run the relationship. Result: the number-one retailer in the world by sales per square foot, while the rest of physical retail struggles.",
  },
  {
    tag: "Healthcare",
    title: "The hospital that gave time back to its nurses",
    body: "Tablets and apps took the endless non-medical questions, visiting hours, parking, meal times. That freed nurses and doctors to spend their hours on care and the complex work only they can do. Automate the routine, give expertise back to the people who have it.",
  },
  {
    tag: "Utilities",
    title: "The utility that made its people sharper",
    body: "A major UK utility gave its service agents AI that surfaced the right answer in real time. Handling times dropped, service levels rose, and the humans stayed in the conversation throughout. The technology didn't replace the relationship. It made the people better at it.",
  },
  {
    tag: "Your organisation",
    title: "The team that stopped competing on price",
    body: "This is the one we build with you. We find where automation is quietly turning you into a commodity, and where your people should own the moments that decide whether a customer stays. Then your team leaves knowing exactly what to do about it.",
  },
];
