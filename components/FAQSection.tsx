"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection({
  title = "Frequently asked questions",
  faqs,
  variant = "light",
  jsonLd,
}: {
  title?: string;
  faqs: FAQItem[];
  variant?: "light" | "dark";
  jsonLd?: boolean;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-navy section-padding" : "bg-cream section-padding"}>
      <div className="container max-w-3xl">
        {jsonLd !== false && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <h2 className={`text-display md:text-display-lg mb-8 ${isDark ? "text-white" : "text-foreground"}`}>
          {title}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={`rounded-2xl border-none px-6 ${isDark ? "bg-white" : "bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)]"}`}
            >
              <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline py-5 text-foreground [&>svg]:text-accent">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-body-lg pb-5 text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
