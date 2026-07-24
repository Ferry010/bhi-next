import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Download, ArrowRight, HelpCircle, GraduationCap, Scale, Handshake, RefreshCw } from "lucide-react";

const PDF = "/research/towards-a-human-technology-fit.pdf";

export const metadata: Metadata = {
  alternates: { canonical: "/research/towards-a-human-technology-fit" },
  title: "Towards a Human-Technology Fit | Brand Humanizing Research",
  description:
    "A peer-quality study with Erasmus University Rotterdam that gives the Human-Technology Fit its academic foundation: how to socialise AI in a way that accounts for employees and customers. Free to read and cite.",
  openGraph: { images: [{ url: "/og/research.jpg" }] },
};

const challenges = [
  { icon: HelpCircle, title: "Overcoming uncertainty", body: "Before people meet a new technology, they anticipate it. Unspoken uncertainty in that phase quietly shapes whether the rollout ever works." },
  { icon: Scale, title: "Considering technological readiness", body: "Does the organisation actually have the data, the quality and the realistic expectations for the technology to deliver? Hype hides the answer." },
  { icon: Handshake, title: "Building trust", body: "Trust is earned when people see the benefit for their own work, and when they stay in the loop with real control over the outcome." },
  { icon: RefreshCw, title: "Sufficient evaluation", body: "Without a continuous, human feedback loop, no one knows whether the technology is producing the outcomes anyone actually wanted." },
];

const recommendations = [
  { n: "01", title: "Determine the type of symbiosis with stakeholders in the room", body: "Not every job suits the same human-machine relationship. Involve representatives of the people affected early. If AI is the answer, what was the question?" },
  { n: "02", title: "Provide sufficient education", body: "Pre-entry knowledge and training on the technology removes uncertainty before the first encounter, and lets people prepare instead of brace." },
  { n: "03", title: "Manage expectations", body: "Don't get swept up in vendor and media hype. Get the real numbers on time, cost and effort. Humanising technology is a long-term investment, not a short-term revenue line." },
  { n: "04", title: "Enhance trust by letting people feel the benefit", body: "Make tasks clear, let the machine take the simple work so people can use their creativity on the complex, and keep humans in the loop to hold control." },
  { n: "05", title: "Evaluate regularly", body: "Keep a continuous, humanised feedback loop running, from the people using it and the clients affected by it, so the system keeps improving." },
];

export default function TowardsHumanTechnologyFitPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary section-padding pt-28 md:pt-36">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Research", to: "/research" },
                { label: "Towards a Human-Technology Fit" },
              ]}
              variant="light"
            />
            <div className="flex items-center gap-2 mt-4 mb-2">
              <span className="text-caption font-heading font-semibold text-accent">2022</span>
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-2 py-0.5">Peer-reviewed</span>
            </div>
            <h1 className="text-hero md:text-hero-lg text-foreground">Towards a Human-Technology Fit</h1>
            <p className="text-body-lg text-muted-foreground mt-6">
              Organisations keep adopting AI for the short-term win, blind to the long-term cost to the people who have to live with it. This study asks the harder question: how do you introduce technology in a way that actually accounts for your employees and your customers?
            </p>
            <p className="text-body-lg text-muted-foreground mt-4">
              The answer it builds is the <span className="text-foreground font-semibold">Human-Technology Fit</span>: the missing foundation beneath everything else an organisation is trying to grow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={PDF} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  <Download className="w-4 h-4" /> Read the full report (PDF)
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              In partnership with Erasmus University Rotterdam. Free to read, free to cite, no registration.
            </p>
          </div>
        </section>

        {/* The premise */}
        <section className="section-padding bg-white border-t border-border">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-6">The premise</h2>
              <div className="space-y-4 text-body-lg text-muted-foreground">
                <p>
                  Replacing people with technology looks like a saving on the spreadsheet. Swap customer service for a chatbot and you get lower costs and round-the-clock availability. You also, done badly, get customers who feel unseen and employees who feel replaceable. The short-term win becomes a long-term loss.
                </p>
                <p>
                  Brand Humanizing Institute commissioned this research with the Erasmus School of Social and Behavioural Sciences to give its central belief an academic spine. That belief, in the words of the founders:
                </p>
              </div>
              <blockquote className="my-8 border-l-4 border-accent pl-6 text-xl md:text-2xl font-heading font-semibold text-foreground leading-snug">
                &ldquo;Automation should result in the further humanization of the company, not a decline in human involvement.&rdquo;
                <span className="block text-sm font-body font-normal text-muted-foreground mt-3">Flores &amp; Hoes, 2018</span>
              </blockquote>
              <p className="text-body-lg text-muted-foreground">
                To pressure-test it, the researchers interviewed six technology professionals through the lens of socio-technical systems theory, mapping what actually happens when an organisation tries to make people and machines work as one.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* The big idea — blue panel */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <p className="text-sunny font-heading font-semibold mb-3">The big idea</p>
              <h2 className="text-display md:text-display-lg text-white mb-6">A sixth layer beneath the pyramid.</h2>
              <div className="space-y-4 text-body-lg text-white/80">
                <p>
                  The Brand Humanizing Pyramid describes what an organisation needs to reach growth: Company-Employee Fit, Product-Market Fit, Branding &amp; Positioning, Company-Client Fit, and Growth on top.
                </p>
                <p>
                  This study adds a new foundation at the very bottom: the <span className="text-sunny font-semibold">Human-Technology Fit</span>. Everything above it is built on how well your people and your technology actually get along. Get that wrong and the rest wobbles.
                </p>
                <p>
                  To reach that fit, the report introduces the <span className="text-white font-semibold">Human-Technology Socialization Model</span>: three phases a team moves through when a new technology arrives. Employee Anticipation, the AI-Employee Encounter, and a Symbiotic Socio-technical Relationship. A humanised feedback loop keeps the whole thing honest.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Four challenges */}
        <section className="section-padding bg-white">
          <div className="container max-w-4xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">The four challenges of socialising AI</h2>
              <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl">Every rollout runs into these. Naming them is half the battle.</p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-5">
              {challenges.map((c) => (
                <ScrollRevealSection key={c.title}>
                  <div className="bg-cream rounded-2xl p-6 md:p-7 h-full">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <c.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Five recommendations */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">Five ways to do it right</h2>
              <p className="text-body-lg text-muted-foreground mb-10">The practical playbook the report hands an organisation.</p>
            </ScrollRevealSection>
            <div className="space-y-4">
              {recommendations.map((r) => (
                <ScrollRevealSection key={r.n}>
                  <div className="bg-white rounded-2xl p-6 md:p-7 flex gap-5 items-start shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                    <span className="font-heading font-bold text-2xl text-accent/30 shrink-0 tabular-nums">{r.n}</span>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Credits + download */}
        <section className="section-padding bg-white border-t border-border">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">The researchers</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sylvana Bal, Lisa Gerritsen, Tim Kösters, Sophie Scheurwater and Lucia Zuiderwijk, as part of &ldquo;AI: The Present and Future of Work&rdquo; at the Erasmus School of Social and Behavioural Sciences.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    Supervised by Dr. Ward van Zoonen and Ryan Morgan, Erasmus University Rotterdam. Commissioned by the Brand Humanizing Institute, 2022.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-3">Cite or read it</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    Free to read and cite. Please credit the authors and the Brand Humanizing Institute with a link back.
                  </p>
                  <a href={PDF} target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 h-11 text-sm gap-2">
                      <Download className="w-4 h-4" /> Download the report
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Final CTA — blue with yellow CTAs */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-4">Want the fit inside your organisation?</h2>
              <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto">
                The research is the foundation. A session is where your team turns it into how they actually work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    See the training <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/the-method">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-sunny/70 text-sunny hover:border-sunny hover:bg-sunny/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                    Dive into the method <ArrowRight className="w-4 h-4" />
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
