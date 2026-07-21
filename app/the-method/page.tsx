import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, Apple, Stethoscope, Zap } from "lucide-react";
import PyramidScrollReveal from "@/components/sections/PyramidScrollReveal";
import FourSkillsSpotlight from "@/components/sections/FourSkillsSpotlight";

export const metadata: Metadata = {
  alternates: { canonical: "/the-method" },
  title: "The Brand Humanizing Method | Four Skills Framework",
  description:
    "The research-backed pyramid and four skills that make your brand impossible to copy. Used by 50+ organizations in 12 countries.",
  openGraph: { images: [{ url: "/og/the-method.jpg" }] },
};

const realWorldExamples = [
  {
    icon: Apple,
    title: "The Apple Store",
    description: "Apple does not staff its stores with salespeople. It staffs them with enthusiasts who genuinely want to help. The technology runs the backend. The humans run the relationship. It is the number-one retailer in the world by sales per square foot, while the rest of physical retail struggles. That is Brand Humanizing, operating at scale.",
  },
  {
    icon: Stethoscope,
    title: "The hospital that gave time back",
    description: "A hospital introduced tablets and apps to answer the simple, non-medical questions patients ask constantly: visiting hours, parking, meal times, where to go next. That freed nurses and doctors from repetitive admin so they could spend their time where it matters: on care, consultation, and the complex work only they can do. Automate the routine. Give human expertise back to the people who need it.",
  },
  {
    icon: Zap,
    title: "The utility that made its people sharper",
    description: "A major UK utility company deployed AI to support its human customer service team — giving agents faster access to the right answers in real time. Handling times dropped. Service levels rose. And the humans stayed in the conversation throughout. The technology did not replace the relationship. It made the people on the other end of it better.",
  },
];

const faqs = [
  { q: "Is Brand Humanizing only relevant for large organizations?", a: "No. The framework applies equally to a team of 10 and a corporation of 10,000. The questions are the same: where does technology belong, and where do humans belong?" },
  { q: "How is Brand Humanizing different from general \"human-centered design\"?", a: "Human-centered design focuses primarily on product and interface design. Brand Humanizing is an organizational strategy that spans how you implement technology, how you build culture, how you serve customers, and how you grow sustainably." },
  { q: "Do we need to have an AI problem to benefit from Brand Humanizing?", a: "No. Every organization that uses any technology benefits from having a clear position on where humans belong. Most organizations have made those decisions by accident. Brand Humanizing makes them deliberately." },
  { q: "Is there academic evidence behind this framework?", a: "Yes. The Brand Humanizing framework is backed by peer-reviewed, primary research. See our research archive for the full methodology and findings." },
];

export default function TheMethodPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary min-h-screen flex items-center relative">
          <div className="container max-w-4xl pt-28 md:pt-40 pb-16 md:pb-24">
            <Breadcrumb items={[{ label: "The Method" }]} variant="light" />
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              The framework that makes your brand{" "}
              <span className="text-accent">impossible to copy.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Eight years and 50+ organisations went into this. Ten minutes to understand it. Then you&apos;ll see why the teams using it don&apos;t compete on price.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#pyramid">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Explore the framework <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/work-with-us">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 text-foreground hover:border-foreground hover:bg-foreground/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                  See it in practice <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <PyramidScrollReveal />

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-8">What it looks like in practice</h2>
              <p className="text-body-lg text-white/90 leading-relaxed">
                Technology identifies that 70% of customer service inquiries are answerable without a human. You automate those. The 30% that remain are the emotionally complex, high-stakes, relationship-critical moments. You staff those with your best people. You train them differently. You measure different outcomes.
              </p>
              <p className="text-body-lg text-white/90 leading-relaxed mt-6">
                Same technology budget. Lower costs. Higher customer loyalty. Not instead of each other. At the same time.
              </p>
              <p className="text-xl md:text-2xl font-heading font-bold text-accent mt-8">
                That is Brand Humanizing.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        <FourSkillsSpotlight />

        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-display md:text-display-lg text-foreground">You already admire companies doing this.</h2>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
              {realWorldExamples.map((ex) => (
                <ScrollRevealSection key={ex.title}>
                  <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6 md:p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(255,107,43,0.1)] flex items-center justify-center mb-4">
                      <ex.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3">{ex.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">{ex.description}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground text-center mb-10">What this means for your organization</h2>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollRevealSection>
                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-8 md:p-10 h-full flex flex-col">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">Start with a session</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    90 minutes or a full-day workshop, designed around your team. Walk out with a shared language and concrete starting points.
                  </p>
                  <Link href="/learning">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                      Book a session <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </ScrollRevealSection>
              <ScrollRevealSection>
                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-8 md:p-10 h-full flex flex-col">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">Build it with us</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    Ready to go beyond learning? We work alongside your team to map, strategize, and implement Brand Humanizing across your organization.
                  </p>
                  <Link href="/work-with-us">
                    <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 text-foreground hover:border-foreground hover:bg-foreground/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                      Start a project <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </ScrollRevealSection>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently asked questions about the Brand Humanizing method" faqs={faqs} variant="light" />

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Ready to go beyond the framework?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Book a session <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/work-with-us">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-white/70 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                    Start a project <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
