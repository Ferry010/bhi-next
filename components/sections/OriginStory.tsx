"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function OriginStory() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream section-padding">
      <div className="container-narrow">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
            The backstory
          </span>
          <h2 className="text-display md:text-display-lg text-foreground mt-4 md:mt-6">
            Our best idea was born over fast food.
          </h2>
          <div className="space-y-5 mt-6 md:mt-8 text-sm md:text-body-lg text-muted-foreground">
            <p>
              It was 2017. Jonathan and Ferry were sitting in a McDonald&apos;s in Rotterdam, talking about the technology they were using every day at work. Data scraping, behavioral tracking, automated ads, A/B testing on people who didn&apos;t know they were being tested.
            </p>
            <p>
              They were good at it. And they both hated what it had become.
            </p>
            <p>
              &ldquo;What if brands used technology to become closer to people, instead of using it to squeeze more money out of them?&rdquo;
            </p>
            <p>
              That question launched a year of deep research. They studied brand equity, behavioral science, human-technology dynamics, organizational psychology, and what actually builds lasting customer loyalty. What they found was both simple and radical: the most durable competitive advantage any organization can build isn&apos;t its tech stack. It&apos;s its humanity.
            </p>
            <p>
              They called it Brand Humanizing. Not Company Humanizing, because everything and everyone is a brand. And humanizing is something every brand can do.
            </p>
          </div>
          <blockquote className="mt-8 md:mt-10 text-lg md:text-3xl font-heading font-semibold italic text-primary max-w-2xl leading-snug">
            &ldquo;The best brands don&apos;t just sell products. They make people feel seen.&rdquo;
          </blockquote>
          <a
            href="https://medium.com/@brandhumanizing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 font-heading font-semibold text-sm text-primary hover:text-accent transition-colors"
          >
            Read the full origin story →
          </a>
        </div>
      </div>
    </section>
  );
}
