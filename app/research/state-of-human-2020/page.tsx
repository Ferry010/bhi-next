import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { yearsActiveWord } from "@/lib/facts";

const PDF = "/assets/state-of-human-2020.pdf";

export const metadata: Metadata = {
  alternates: { canonical: "/research/state-of-human-2020" },
  title: "The State of Human 2020 | Brand Humanizing Institute",
  description:
    "Our first report. 104 decision-makers, one question: is there still a place for humans in an automating world? 87.5% said yes. Read the findings and download the full 36-page report.",
  openGraph: { type: "article" },
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const findings = [
  {
    chapter: "Chapter 1",
    title: "The threat of AI and automation",
    lead: "The fear is real, but mostly abstract.",
    body: "In a 2017 EU study, 72% of Europeans said they feared robots would steal their jobs. Our own respondents agreed change was coming: 76.9% thought their organisation would likely increase automation. Yet when asked about their own job, most did not feel it would be heavily affected. Classic optimism bias: the risk is real, it just won't happen to me.",
    stat: "76.9%",
    statLabel: "expect their organisation to increase automation",
  },
  {
    chapter: "Chapter 2",
    title: "(Wo)man versus machine",
    lead: "Technology can mimic us. It cannot be us.",
    body: "Asked whether AI chatbots and voicebots would make customer contact more efficient, opinion split three ways: 47% agreed, 36% disagreed, 17% were undecided. But 68% personally preferred human interaction, and 72% would not automate customer care to cut costs if it lowered service. They understood what the machine misses: poor customer service already costs organisations an estimated $75 billion a year.",
    stat: "68%",
    statLabel: "personally prefer human interaction over automated",
  },
  {
    chapter: "Chapter 3",
    title: "Does AI create opportunities for humans?",
    lead: "Yes. By respecting what each side does best.",
    body: "Asked to describe where humans belong in a digital world, one word came up more than any other: creative. Followed by interact and contact. The vast majority, 87.5%, believed there will always be space for human labour, shifting toward creativity, interpersonal contact and judgement. Machines take the repetitive, low-emotion work; people get the room to do what only people can.",
    stat: "87.5%",
    statLabel: "believe there is always a place for human labour",
  },
];

const facts = [
  { v: "104", l: "decision-makers surveyed" },
  { v: "5", l: "regions across the globe" },
  { v: "Nov–Dec 2019", l: "when the data was collected" },
  { v: "12 + 2", l: "Likert statements and open questions" },
];

const regions = [
  { r: "Europe", p: "84.6%" },
  { r: "United States", p: "6.7%" },
  { r: "United Kingdom", p: "4.8%" },
  { r: "Asia", p: "2.9%" },
  { r: "Australia", p: "1.0%" },
];

const recommendations = [
  {
    who: "To people, individually",
    text: "Get a basic grip on what AI actually is, so you can picture its effect on your role. Look for where it helps you, and think about what you'd do with the time it frees up. That clarity is how you stay ready to change when your organisation needs you to.",
  },
  {
    who: "To organisations",
    text: "Start building the infrastructure for human and machine to work together. Find where machines genuinely take work off people's plates, and where that opens up new, more human tasks. That's what eases the transition instead of fighting it.",
  },
  {
    who: "And to both",
    text: "Treat AI as a friend, not a foe. Used well, it lets people blossom in reshaped roles, new jobs, even businesses we can't yet imagine, and increases the impact we have on the world.",
  },
];

export default function StateOfHuman2020Page() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Research", to: "/research" },
                { label: "State of Human 2020" },
              ]}
            />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Our first report · 2020</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              The State of Human <span className="text-accent">2020.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              We surveyed 104 decision-makers across five regions and asked them one question: is there still a place for humans in a world that keeps automating? This is what they told us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
              <a href={PDF} target="_blank" rel="noopener noreferrer" download="The State of Human 2020.pdf">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                  <Download className="w-4 h-4" /> Download the report (PDF)
                </Button>
              </a>
              <a href="#findings">
                <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/70 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  Read the findings ↓
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground/70 mt-4">Free · 36 pages · independent research by the Brand Humanizing Institute</p>
          </div>
        </section>

        {/* The headline finding */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">The short answer</span>
              <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">
                <span className="text-accent">87.5%</span> said there will always be a place for humans.
              </h2>
              <div className="mt-6 space-y-5 text-body-lg text-muted-foreground leading-relaxed">
                <p>
                  Back in 2019, almost none of our respondents had heard of ChatGPT, because it did not exist yet. What they had was a clear-eyed view of where their organisations were heading, and a conviction that it would not be humans versus machines, but humans with machines.
                </p>
                <p>
                  Their verdict: work will change, jobs will shift, but people keep a critical place, one that leans harder into creativity, relationships and judgement. The organisations that learn to synergise humans and machines outperform the ones that don&apos;t.
                </p>
                <p className="text-foreground font-heading font-semibold">
                  The future, they said, seems bright. Not despite technology. Because of how we choose to use it.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Methodology / the numbers */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">About the data</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3">Small, honest, and transparent.</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Invite-only, reached personally through LinkedIn, and open about its limits. A mostly European, senior sample, self-funded and done by hand.
                </p>
              </div>
            </ScrollRevealSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-10">
              {facts.map((f) => (
                <div key={f.l} className="text-center md:text-left">
                  <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary tabular-nums">{f.v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{f.l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-6 md:p-8">
              <p className="text-sm font-heading font-semibold text-foreground mb-4">Where the respondents were based</p>
              <div className="space-y-3">
                {regions.map((r) => (
                  <div key={r.r} className="flex items-center gap-4">
                    <span className="w-40 shrink-0 text-sm text-muted-foreground">{r.r}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-cream overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: r.p }} />
                    </div>
                    <span className="w-14 text-right text-sm font-heading font-semibold text-foreground tabular-nums">{r.p}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70 mt-5">
                67% male, 33% female · mostly aged 26–45 · 74% held an academic degree · 40% worked in IT and services.
              </p>
            </div>
          </div>
        </section>

        {/* Findings */}
        <section id="findings" className="section-padding bg-white scroll-mt-20">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <div className="mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">What we found</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3 leading-tight">Three chapters, one throughline.</h2>
              </div>
            </ScrollRevealSection>
            <div className="space-y-6 lg:space-y-8">
              {findings.map((f) => (
                <ScrollRevealSection key={f.chapter}>
                  <div className="rounded-2xl bg-cream border border-border/50 p-7 md:p-9">
                    <span className="text-xs font-heading font-semibold uppercase tracking-widest text-accent">{f.chapter}</span>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mt-2">{f.title}</h3>
                    <p className="text-primary font-heading font-semibold mt-1">{f.lead}</p>
                    <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start mt-4">
                      <p className="text-muted-foreground leading-relaxed">{f.body}</p>
                      <div className="md:text-right md:min-w-[140px] md:border-l md:border-border md:pl-8">
                        <div className="font-heading font-extrabold text-4xl md:text-5xl text-accent leading-none">{f.stat}</div>
                        <div className="text-xs text-muted-foreground mt-2 md:max-w-[140px] md:ml-auto">{f.statLabel}</div>
                      </div>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="section-padding bg-cream">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Recommendations</span>
                <h2 className="text-display md:text-display-lg text-foreground mt-3">What to do about it.</h2>
              </div>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {recommendations.map((r) => (
                <ScrollRevealSection key={r.who}>
                  <div className="h-full rounded-2xl bg-white border border-border/50 shadow-[0_4px_24px_rgba(18,21,46,0.06)] p-7 md:p-8">
                    <h3 className="font-heading font-bold text-lg text-foreground">{r.who}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{r.text}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Download band + 2026 follow-up */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white leading-tight">By working together, the future is bright.</h2>
              <p className="text-white/70 text-body-lg mt-5 max-w-xl mx-auto">
                Read it in full, all 36 pages, or see how the picture changed in {yearsActiveWord()} years of applied research and 50+ organisations later.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
                <a href={PDF} target="_blank" rel="noopener noreferrer" download="The State of Human 2020.pdf">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    <Download className="w-4 h-4" /> Download the report
                  </Button>
                </a>
                <Link href="/research/state-of-brand-humanizing-2026">
                  <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    Read the 2026 report <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-4">Want to apply this to your organisation?</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                The research is the foundation. The Spark Session is where it becomes useful for your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/learning/inspiration-session">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                    Book a Spark Session <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-[1.5px] border-foreground/40 font-heading font-semibold px-8 h-12 text-base gap-2">
                    Talk to a human <ArrowRight className="w-4 h-4" />
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
