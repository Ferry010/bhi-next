import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: "Glossary | Key Concepts in Brand Humanizing",
  description: "Clear definitions of Brand Humanizing, Human-Technology Fit, AI Literacy, the Brand Humanizing Pyramid, and more. The terms that define our framework.",
};

interface Term {
  id: string;
  name: string;
  short: string;
  long: string;
  links: { label: string; to: string }[];
}

const TERMS: Term[] = [
  {
    id: "brand-humanizing",
    name: "Brand Humanizing",
    short: "A strategic framework that helps organisations build sustainable competitive advantage by deliberately combining human talent and technology.",
    long: "Brand Humanizing was developed by Ferry Hoes and Jonathan Flores in 2017 after observing that organisations investing most heavily in technology were often losing the human qualities that made them distinctive. The framework provides a structured, evidence-based approach to identifying where human skills create the most value and where technology should take over. It is not a marketing concept; it is a competitive strategy built on eight years of applied research.",
    links: [
      { label: "Full definition", to: "/what-is-brand-humanizing" },
      { label: "The methodology", to: "/the-method" },
    ],
  },
  {
    id: "human-technology-fit",
    name: "Human-Technology Fit",
    short: "The deliberate balance between where human talent creates value and where technology should take over: the core strategic decision that Brand Humanizing addresses.",
    long: "Human-technology fit is not about using more or less technology. It is about using the right technology in the right places, and investing in human capability where it matters most. Organisations with strong human-technology fit have clarity on which roles, processes, and decisions should be handled by people, which by machines, and which by both. This clarity is what separates organisations that thrive in technological change from those that simply survive it.",
    links: [
      { label: "Read the research", to: "/research" },
      { label: "Strategy during recession", to: "/blog/human-technology-strategy-recession" },
    ],
  },
  {
    id: "brand-humanizer",
    name: "The Brand Humanizer",
    short: "The professional who combines all four Brand Humanizing skills (creativity, human sciences, AI literacy, and emotional intelligence) connected by genuine care.",
    long: "A Brand Humanizer is not a job title. It is a capability profile: a person who can think creatively, understand human behaviour, work critically with AI, and make sound ethical judgments, all held together by care for people and quality. These are the professionals every organisation needs and very few are deliberately developing. The Brand Humanizing framework is designed to help organisations identify and build this capability systematically.",
    links: [
      { label: "The four skills", to: "/blog/the-four-skills-every-future-proof-organisation-needs" },
      { label: "About the founders", to: "/about" },
    ],
  },
  {
    id: "ai-literacy",
    name: "AI Literacy (Organisational)",
    short: "The organisational capability to understand, evaluate, and work effectively with AI tools. going beyond compliance to build genuine critical judgment.",
    long: "AI literacy in the Brand Humanizing context is not about technical skills or one-hour compliance modules. It is the ability to evaluate whether AI output is trustworthy in a given context, to understand where AI fails (hallucination, bias, overconfidence), and to integrate AI into workflows without creating the illusion of thoroughness while skipping actual thinking. The EU AI Act's Article 4 requirement sets a legal floor. The actual capability needed goes much further. Organisations building genuine AI literacy across their workforce gain a compounding advantage.",
    links: [
      { label: "AI ethics guide", to: "/blog/ai-ethics-in-the-workplace-a-practical-guide-for-leaders" },
      { label: "AI strategy & human strategy", to: "/blog/why-your-ai-strategy-needs-a-human-strategy-first" },
    ],
  },
  {
    id: "brand-humanizing-pyramid",
    name: "Brand Humanizing Pyramid",
    short: "The visual model that maps the four Brand Humanizing skills with Care at the centre, the connective tissue that turns competencies into strategy.",
    long: "The Brand Humanizing Pyramid places four skill domains (Creativity & Organisational Awareness, Human Sciences & Research, Programming, Automation & AI, and Emotional Intelligence & Ethics) around a central concept: Care. Care is what transforms individual capabilities into a coherent organisational strategy. Without care, the skills are isolated competencies. With care, they become the foundation for organisations that are both technologically capable and irreplaceably human.",
    links: [
      { label: "Explore the full methodology", to: "/the-method" },
      { label: "The four skills explained", to: "/blog/the-four-skills-every-future-proof-organisation-needs" },
    ],
  },
  {
    id: "care",
    name: "Care",
    short: "The centre of the Brand Humanizing Pyramid: genuine concern for people, quality, and doing work that matters. The quality that connects all four skills.",
    long: "Care is not a soft value. It is the strategic differentiator at the heart of Brand Humanizing. In a world where AI can replicate efficiency, speed, and even creativity at the pattern level, the one thing it cannot replicate is genuine care: for people, for outcomes, for doing the right thing. Organisations that embed care into their operations, decision-making, and culture create the kind of trust and loyalty that no amount of automation can manufacture.",
    links: [
      { label: "What is Brand Humanizing?", to: "/what-is-brand-humanizing" },
      { label: "Making your brand more human", to: "/blog/how-to-make-your-brand-more-human-in-the-age-of-ai" },
    ],
  },
];

function buildSchemas() {
  return TERMS.map((t) => ({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.name,
    description: t.short,
    url: `https://brandhumanizing.com/glossary#${t.id}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Brand Humanizing Glossary",
      url: "https://brandhumanizing.com/glossary",
    },
  }));
}

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas()) }}
      />
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="bg-secondary section-padding">
          <div className="container max-w-3xl">
            <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Glossary" }]} variant="light" />
            <h1 className="text-hero mt-4 text-foreground">Glossary</h1>
            <p className="text-body-lg text-muted-foreground mt-4">
              The key concepts behind Brand Humanizing, defined clearly, in our own words.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-3xl space-y-12">
            {TERMS.map((term) => (
              <article key={term.id} id={term.id} className="scroll-mt-28">
                <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                  {term.name}
                </h2>
                <p className="text-body-lg text-foreground mt-3 font-medium leading-relaxed">
                  {term.short}
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {term.long}
                </p>
                {term.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {term.links.map((l) => (
                      <Link
                        key={l.to}
                        href={l.to}
                        className="text-sm text-accent hover:underline font-heading font-semibold"
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
