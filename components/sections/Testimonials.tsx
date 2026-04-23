"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote: "Ferry is a fantastic speaker. He adapts perfectly to the audience and showed during the workshops that he's highly flexible and alert to reactions from the room. We're very happy with the collaboration and he gave our clients plenty of inspiration they can put into practice.",
    name: "Almer",
    company: "ASR",
    context: "Keynote, March 2025",
  },
  {
    quote: "I recently organized a workshop where Ferry Hoes and the Brand Humanizing Institute delivered a lecture on the Ethics of AI. No 'Death by PowerPoint,' but a smooth and captivating story that got us as an IT organization thinking. Ferry is second to none at keeping his audience engaged.",
    name: "Laurens",
    company: "Atos",
    context: "AI Ethics Workshop, January 2025",
  },
  {
    quote: "Ferry has the gift of explaining complex theory in an accessible way. The AI experience among participants varied widely, from no experience at all to employees who already use it daily. Even those without any experience came out of the workshop surprised and very enthusiastic.",
    name: "Maud",
    company: "Chubb Fire & Security",
    context: "Team Workshop, February 2025",
  },
  {
    quote: "Ferry took us on an inspiring journey, with the topic perfectly tailored to our audience. He engaged participants effectively and left more than enough room for questions.",
    name: "",
    company: "Avans Hogeschool",
    context: "Guest Lecture, November 2024",
  },
  {
    quote: "From our very first meeting with Ferry, the collaboration was wonderful. He's incredibly enthusiastic, flexible, and loves thinking along about both content and practical matters. Participants of the keynote and the in-depth workshop said they felt inspired and gained new insights about ChatGPT and AI.",
    name: "Abel",
    company: "Aestate",
    context: "Keynote & Workshop, December 2024",
  },
  {
    quote: "Energetic, positive, funny. It was a wonderful session and we received a lot of positive feedback about Ferry's talk. Communication was pleasant. The aftercare was neatly arranged too. We're happy!",
    name: "",
    company: "CPM Nederland",
    context: "Spark Session, October 2024",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brand Humanizing Institute",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "9",
      reviewCount: "9",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.name || "Anonymous" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
  };

  return (
    <section ref={ref} className="bg-cream section-padding">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        <div className="text-center mb-14">
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">What people say</span>
          <h2 className="text-display md:text-display-lg text-foreground mt-4">Trusted by real humans.</h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)] flex flex-col justify-between"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-body text-muted-foreground mb-6 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-heading font-semibold text-foreground">
                  {t.name ? `${t.name}, ` : ""}{t.company}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
