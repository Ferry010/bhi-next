// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the Brand Humanizing product line.
// Change a price, a duration, a stage or a stat here and it updates everywhere:
// the pricing page, the learning index, and every individual product page.
//
// Pricing philosophy: premium "from" anchors, not a fixed price list. Every
// engagement is scoped in a short intake, so the number below is a floor that
// qualifies and signals value, never a ceiling.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductPricing {
  slug: string;
  /** Full display name, e.g. "The Inspiration Session" */
  name: string;
  /** One-line experience promise (outcome, not format) */
  promise: string;
  duration: string;
  audience: string;
  /** The floor, e.g. "€3,500" */
  priceFrom: string;
  /** Compact spec line for cards: "duration · audience · from €X" */
  specs: string;
  /** Long-form line for the investment block on the product page */
  investmentLine: string;
  href: string;
}

export const PRODUCTS: Record<"inspiration" | "fullDay" | "multiDay", ProductPricing> = {
  inspiration: {
    slug: "inspiration-session",
    name: "The Inspiration Session",
    promise: "The keynote that stops your team defending the old way of working and gets them hungry for the new one.",
    duration: "60–90 minutes",
    audience: "15–500+ people",
    priceFrom: "€3,500",
    specs: "60–90 min · 15–500+ people · from €3,500",
    investmentLine:
      "Investment starts at €3,500 and is scoped to your group size, format and location. You get an exact proposal after a 30-minute intake, never a surprise.",
    href: "/learning/inspiration-session",
  },
  fullDay: {
    slug: "full-day-course",
    name: "The Full-Day Course",
    promise: "One focused day that turns a curious team into one that knows exactly how to out-human its competitors.",
    duration: "A full day (6–7 hrs)",
    audience: "12–30 people",
    priceFrom: "€7,500",
    specs: "Full day · 12–30 people · from €7,500",
    investmentLine:
      "Investment starts at €7,500, including a 90-day implementation plan and the book for every participant. Final scope is set in your intake.",
    href: "/learning/full-day-course",
  },
  multiDay: {
    slug: "multi-day-programme",
    name: "The Multi-Day Programme",
    promise: "The programme that puts Brand Humanizing into how your leadership actually decides, and leaves it there.",
    duration: "2–3 days",
    audience: "8–20 people",
    priceFrom: "€15,000",
    specs: "2–3 days · 8–20 people · from €15,000",
    investmentLine:
      "Investment starts at €15,000, scoped to your leadership team size, the number of days and your objectives. Shaped together in a strategic intake.",
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
  // Grounded in the existing client roster and acknowledgements already on the site.
  stagesLine:
    "Ferry has taken Brand Humanizing to stages across Europe, in front of teams at Unilever, VodafoneZiggo, GlaxoSmithKline, Toshiba, Atos and the Dutch government.",
  acknowledgementLine:
    "His work has been acknowledged by Steven Kotler, UN AI advisor Neil Sahota, and former State Secretary Mona Keijzer.",
  closingLine: "He doesn't send a junior trainer. He shows up himself.",
  photo: "/assets/ferry.jpg",
};

export const STATS = [
  { value: "50+", label: "organisations" },
  { value: "12", label: "countries" },
  { value: "9.2", label: "average rating" },
  { value: "2017", label: "researching this" },
];

export const MARQUEE_LOGOS = [
  { src: "/assets/logos/unilever.png", alt: "Unilever" },
  { src: "/assets/logos/vodafone.png", alt: "Vodafone" },
  { src: "/assets/logos/gsk.png", alt: "GlaxoSmithKline" },
  { src: "/assets/logos/toshiba.png", alt: "Toshiba" },
  { src: "/assets/logos/atos.png", alt: "Atos" },
  { src: "/assets/logos/asr.png", alt: "a.s.r." },
  { src: "/assets/logos/chubb.png", alt: "Chubb" },
  { src: "/assets/logos/minfin.png", alt: "Ministerie van Financiën" },
];
