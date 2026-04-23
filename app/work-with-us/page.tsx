import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Us | Brand Humanizing Projects",
  description:
    "From a Human-Technology Fit Audit to full Organisation-Wide Implementation. Project-based Brand Humanizing work that changes how your organization operates.",
  openGraph: { images: [{ url: "/og/work-with-us.jpg" }] },
};

const steps = [
  {
    number: "01",
    label: "Where every engagement starts",
    title: "The Inspiration Session",
    body: "Before we audit anything, your team needs a shared foundation. In 90 minutes, we introduce your team to Brand Humanizing — not as a theory, but as a lens. This is the starting point.",
    specs: "90 min · 15–50 people · €1,750 excl. VAT",
    cta: { text: "Book an Inspiration Session", to: "/learning/inspiration-session" },
  },
  {
    number: "02",
    label: "Understanding where you actually are",
    title: "The Audit & Brainstorm",
    body: "We interview key people across your organisation. We look at processes. We review your technology stack. We study where human talent is wasted on machine work — and where automation misses the human judgement it needs.",
    specs: "4–6 weeks · On request",
    cta: null,
  },
  {
    number: "03",
    label: "Turning diagnosis into decisions",
    title: "The Roadmap",
    body: "The audit tells you where you are. The roadmap tells you where to go and in what order. We build this with your leadership team — not a document we hand over, but a working session that produces real decisions.",
    specs: "4–8 weeks · On request",
    cta: null,
  },
  {
    number: "04",
    label: "Building it. Together.",
    title: "Implementation",
    body: "This is where Brand Humanizing moves from strategy to reality. We work alongside your teams — department by department, process by process — redesigning workflows and training the people who need new skills.",
    specs: "3–6 months · On request",
    cta: null,
  },
  {
    number: "05",
    label: "Your people take over",
    title: "Handover",
    body: "The goal was never to make you dependent on us. During implementation, we identify and develop your internal Brand Humanizers. The handover means the method lives inside your organization permanently.",
    specs: "On request",
    cta: null,
  },
];

const faqs = [
  { q: "Do we have to start with step 1?", a: "Yes. The Inspiration Session is the foundation. Without it, the audit doesn't have the shared language it needs to work." },
  { q: "How long does the full journey take?", a: "From Inspiration Session to Handover: typically 6–12 months. Most clients spend 3–4 months in implementation." },
  { q: "Can we do just the audit?", a: "Yes. Some organisations come to us specifically for the audit and roadmap, then implement internally. We'll be clear about what that requires." },
  { q: "What size organizations do you work with?", a: "We've worked with teams of 8 and companies of 10,000+. The framework scales. The engagement is scoped accordingly." },
  { q: "How many organizations can you take on at once?", a: "We're deliberately small. We cap active project engagements to ensure quality. Reach out early if you're considering this." },
];

export default function WorkWithUsPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary min-h-screen flex items-center relative">
          <div className="container max-w-4xl pt-28 md:pt-40 pb-16 md:pb-24">
            <Breadcrumb items={[{ label: "Work With Us" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Projects</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              A journey, not a project.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Brand Humanizing isn&apos;t implemented in a sprint. It&apos;s built in layers, with your team, starting with a shared foundation and ending with internal ownership.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#journey">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  See the full journey <ArrowDown className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base gap-2">
                  Talk to us first
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="journey" className="section-padding bg-navy">
          <div className="container max-w-3xl space-y-20">
            {steps.map((step, i) => (
              <ScrollRevealSection key={step.number}>
                <div className="relative">
                  <span className="text-accent/20 font-heading font-bold text-7xl leading-none select-none">{step.number}</span>
                  <div className="-mt-6">
                    <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">{step.label}</span>
                    <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mt-2 mb-4">{step.title}</h2>
                    <p className="text-body-lg text-white/70 leading-relaxed mb-4">{step.body}</p>
                    <p className="text-sm text-white/40 font-heading">{step.specs}</p>
                    {step.cta && (
                      <Link href={step.cta.to} className="inline-block mt-6">
                        <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-10 text-sm gap-2">
                          {step.cta.text} <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-16 flex justify-start pl-4">
                    <ArrowDown className="w-6 h-6 text-accent/30" />
                  </div>
                )}
              </ScrollRevealSection>
            ))}
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container max-w-4xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground text-center mb-3">Individual engagement pages</h2>
              <p className="text-body-lg text-muted-foreground text-center mb-10">Each step is also available as a standalone engagement.</p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Human-Technology Fit Audit", to: "/work-with-us/audit-and-brainstorm", desc: "Our diagnostic process for understanding where your organization actually stands." },
                { title: "Brand Humanizing Roadmap", to: "/work-with-us/brand-humanizing-roadmap", desc: "A working session that produces decisions, not documents." },
                { title: "Organisation-Wide Implementation", to: "/work-with-us/organisation-wide-implementation", desc: "Building Brand Humanizing into how your teams actually work." },
                { title: "The Handover", to: "/work-with-us/handover", desc: "Developing your internal Brand Humanizers to carry this forward independently." },
              ].map((item) => (
                <ScrollRevealSection key={item.title}>
                  <Link href={item.to} className="group block bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(18,21,46,0.08)] hover:shadow-lg hover:border-accent/30 border border-border/50 transition-all duration-300 h-full">
                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <span className="text-accent font-heading font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} variant="light" />

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Ready to start the conversation?</h2>
              <Link href="/contact">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base">
                  Talk to a human →
                </Button>
              </Link>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
