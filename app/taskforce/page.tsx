import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import MessageUs from "@/components/MessageUs";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { TALK_TO_EXPERT } from "@/lib/pricing";
import {
  ArrowRight, Check, Clock, Users, CalendarDays, Target, UserCheck, Timer,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/taskforce" },
  title: "The Taskforce | Working Together | Brand Humanizing Institute",
  description:
    "Sixteen weeks. A taskforce of your own people takes one real business challenge to a working pilot, guided by the method. When we leave, the capability stays.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const facts = [
  { icon: Clock, label: "16 weeks", sub: "One half day a week" },
  { icon: Users, label: "6 to 8 people", sub: "Your team, not ours" },
  { icon: Timer, label: "~11 days", sub: "Of your time, across four months" },
  { icon: UserCheck, label: "1 owner", sub: "Formally holds the role at the end" },
];

const forYouIf = [
  {
    icon: Target,
    title: "You can name the challenge in one sentence",
    body: "Not a theme, not an ambition. A specific business problem that one sentence covers. If it takes a paragraph, it isn't scoped yet, and we'll help you cut it down before we start.",
  },
  {
    icon: UserCheck,
    title: "You have an executive sponsor",
    body: "Someone senior enough to make a decision in the room at four points across the engagement. Without that, good work stalls waiting for approval that never comes.",
  },
  {
    icon: CalendarDays,
    title: "You have appetite for four months",
    body: "This is not a workshop with follow-up. It's a weekly rhythm across sixteen weeks. That's what it takes for a capability to actually stick.",
  },
];

const walkAway = [
  "Your named challenge, with interventions designed, one piloted and the rest scheduled for integration",
  "A measured before and after, so you can see what actually moved",
  "An evaluation loop that keeps running after we've gone, with a named owner",
  "Six to eight people who can run the method themselves",
  "One of them formally holding the internal Brand Humanizer role",
  "A written log of what you rejected and why, which is worth as much as what you kept",
];

const timeline = [
  { weeks: "Before we start", phase: "Setup, taskforce selection and a baseline scan", gate: null },
  { weeks: "Week 1", phase: "Kickoff day and the Brand Humanizing Course", gate: null },
  { weeks: "Weeks 2 to 3", phase: "Map the consequences", gate: null },
  { weeks: "Week 4", phase: "Prioritise them", gate: "Gate 1" },
  { weeks: "Weeks 5 to 6", phase: "Devise interventions", gate: null },
  { weeks: "Week 7", phase: "Select what to build", gate: "Gate 2" },
  { weeks: "Weeks 8 to 9", phase: "Turn them into concrete plans", gate: null },
  { weeks: "Week 10", phase: "Plans reviewed", gate: "Gate 3" },
  { weeks: "Weeks 11 to 13", phase: "Pilot one intervention for real", gate: null },
  { weeks: "Week 14", phase: "Pilot review", gate: "Gate 4" },
  { weeks: "Weeks 15 to 16", phase: "Integrate, hand over, close", gate: null },
];

const seats = [
  { seat: "Front line", why: "Knows what actually happens, not what the process says happens" },
  { seat: "Technical", why: "Knows what the systems can and cannot really do" },
  { seat: "HR or L&D", why: "Owns capability, and usually carries this forward afterwards" },
  { seat: "Commercial", why: "Keeps the business case honest" },
  { seat: "Someone junior", why: "Asks what the senior people stopped asking years ago" },
  { seat: "A sceptic", why: "Named on purpose. Convince them and the rest follow" },
];

const preconditions = [
  "The challenge is written in one sentence, and we both agree on it",
  "An executive sponsor is named, senior enough to decide at the gates",
  "You propose the taskforce, with names, roles and departments",
  "The weekly slot is booked for all sixteen weeks, up front",
  "The four gate dates are in the sponsor's diary before week one",
];

const faqs = [
  {
    q: "How is this different from a training?",
    a: "A training has a curriculum we set in advance. The Taskforce follows your challenge wherever it goes, so the shape is genuinely unpredictable. Anyone selling this to you as a longer training is setting an expectation the engagement cannot meet.",
  },
  {
    q: "How is it different from consultancy?",
    a: "We do not produce the work for you. Your people do the work between sessions and we correct it. If what you want is a set of recommendations delivered to you, we are the wrong partner and we will tell you so.",
  },
  {
    q: "Why only a half day a week?",
    a: "Because people learn by doing the work and being corrected, not by watching someone else do it. The taskforce works between sessions and reports back. Clients often ask us to be there more, usually around week five when energy dips. More of our presence makes the outcome worse, so we say no and explain why.",
  },
  {
    q: "What does the handover actually look like?",
    a: "We lead the room through week four, co-facilitate with a member of your taskforce to week seven, coach while they run half a session at week nine, observe while they run all of week thirteen, and by week fifteen we are a guest. By the end, somebody who does not work for us is running a Brand Humanizing session inside your organisation.",
  },
  {
    q: "What happens at a gate?",
    a: "Four times across the engagement, your taskforce presents to your sponsor and asks for a decision. Thirty minutes. We sit at the back and say nothing unless asked. A no-go is a legitimate outcome and means the process worked.",
  },
  {
    q: "What size organisation is this for?",
    a: "Corporate and upper mid-market. A sixteen week engagement is a serious commitment of time and attention, and it is not a fit for a small business.",
  },
  {
    q: "What does it cost?",
    a: "It is scoped per engagement and quoted after we have agreed the challenge and the shape. Talk to us and you will get a clear proposal with no surprises.",
  },
];

export default function TaskforcePage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "Taskforce" }]} variant="light" />
            <h1 className="hero-headline text-hero md:text-hero-lg text-foreground mt-4">
              Four months from now, your team runs this{" "}
              <span className="text-primary">without us.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              A taskforce of your own people takes one real business challenge from diagnosis to a working pilot, guided by the method. We are in the room half a day a week. They do the work in between. When we leave, the capability stays behind and one of them formally owns it.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-white p-4">
                  <f.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="font-heading font-bold text-foreground">{f.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
              <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                  {TALK_TO_EXPERT.label} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#fit">
                <Button variant="outline" className="rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                  See if it fits <span className="cta-arrow">→</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* The promise, blue panel */}
        <section className="bg-navy section-padding">
          <div className="container-narrow">
            <ScrollRevealSection>
              <p className="text-2xl md:text-4xl font-heading font-bold text-white leading-snug">
                We don&apos;t leave with the knowledge.{" "}
                <span className="text-sunny">We leave the knowledge.</span>
              </p>
              <p className="text-body-lg text-white/75 mt-6">
                Most engagements end with a document and a dependency. This one ends with your people able to run the next challenge on their own. That is not a nice side effect of the work. It is the actual deliverable, and we measure ourselves against it.
              </p>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Is it for you */}
        <section id="fit" className="section-padding bg-white">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">This is for you if three things are true.</h2>
              <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl">
                If one of them is missing, the engagement stalls somewhere in month two. We would rather find that out now than then.
              </p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5">
              {forYouIf.map((f) => (
                <ScrollRevealSection key={f.title}>
                  <div className="bg-cream rounded-2xl p-6 md:p-7 h-full">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <f.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* What you walk away with */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-8">What you walk away with.</h2>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-2 gap-4">
              {walkAway.map((item, i) => (
                <ScrollRevealSection key={i}>
                  <div className="bg-white rounded-2xl p-6 h-full flex gap-4 items-start shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* The shape */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">The shape of sixteen weeks.</h2>
              <p className="text-body-lg text-muted-foreground mb-10">
                A full kickoff day, a half day on site each week, four decision gates, one live pilot and a close day.
              </p>
            </ScrollRevealSection>
            <div className="space-y-2">
              {timeline.map((t) => (
                <ScrollRevealSection key={t.weeks}>
                  <div
                    className={`rounded-xl px-5 py-4 flex flex-wrap items-center gap-x-4 gap-y-1 ${
                      t.gate ? "bg-navy" : "bg-cream"
                    }`}
                  >
                    <span
                      className={`font-heading font-semibold text-sm min-w-[130px] ${
                        t.gate ? "text-sunny" : "text-accent"
                      }`}
                    >
                      {t.weeks}
                    </span>
                    <span className={`text-sm flex-1 ${t.gate ? "text-white" : "text-foreground"}`}>{t.phase}</span>
                    {t.gate && (
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-sunny-foreground bg-sunny rounded-full px-3 py-1">
                        {t.gate}
                      </span>
                    )}
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Handover */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">We hand over the room, week by week.</h2>
              <div className="space-y-4 text-body-lg text-white/75">
                <p>
                  We lead through week four. Then we co-facilitate with someone from your taskforce. By week nine we are coaching while they run half the session. By week thirteen we are watching them run all of it. By week fifteen we are a guest in a room we used to lead.
                </p>
                <p className="text-white font-heading font-semibold">
                  By the end, somebody who does not work for us is running a Brand Humanizing session inside your organisation.
                </p>
                <p>
                  That is also why we are only there half a day a week. Your people learn by doing the work and being corrected, not by watching us do it well.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Gates */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">Your sponsor makes four decisions.</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Thirty minutes each. Your taskforce presents and asks for a decision in the room. We sit at the back and say nothing unless we are asked. A no is a legitimate answer and it means the process worked.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { g: "Gate 1", w: "Week 4", q: "Do you agree these are the consequences worth working on?" },
                  { g: "Gate 2", w: "Week 7", q: "Do you approve these interventions for planning?" },
                  { g: "Gate 3", w: "Week 10", q: "Do you approve these plans and release the pilot?" },
                  { g: "Gate 4", w: "Week 14", q: "Do you approve integration based on the pilot results?" },
                ].map((x) => (
                  <div key={x.g} className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-heading font-bold text-accent">{x.g}</span>
                      <span className="text-sm text-muted-foreground">{x.w}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{x.q}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Seats */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">Who sits on the taskforce.</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                You propose the people, we pressure-test the mix. Diversity of expertise beats seniority here, and we will say that out loud, because the instinct is always to send managers. Eight people maximum, or they stop contributing and start attending.
              </p>
              <div className="space-y-3">
                {seats.map((s) => (
                  <div key={s.seat} className="flex flex-wrap gap-x-4 gap-y-1 items-baseline border-l-4 border-accent bg-cream rounded-r-2xl px-5 py-4">
                    <span className="font-heading font-bold text-foreground min-w-[130px]">{s.seat}</span>
                    <span className="text-sm text-muted-foreground flex-1">{s.why}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Preconditions */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">What we need from you before week one.</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Five things, all of them non-negotiable. Every one of these gets skipped in the excitement of a signed deal, and every one of them causes pain later. We would rather be strict now.
              </p>
              <div className="space-y-3">
                {preconditions.map((p, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-[0_4px_24px_rgba(18,21,46,0.06)]">
                    <span className="font-heading font-bold text-accent/40 text-xl tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground leading-relaxed pt-1">{p}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* The honest bit */}
        <section className="section-padding bg-sunny">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-6">
                We will not sell you this cold.
              </h2>
              <div className="space-y-4 text-body-lg text-foreground/80">
                <p>
                  The Taskforce only works with a group that already shares the language, and it needs a level of trust that comes from having delivered something together first. If we have not worked with you yet, we will point you at the Full-Day Course and tell you to start there.
                </p>
                <p>
                  That is not a hoop to jump through, and it is not an upsell in reverse. It is the difference between an engagement that lands and one that stalls in month two.
                </p>
                <p className="font-heading font-semibold text-foreground">
                  We would rather turn down the bigger cheque today than take it and watch the work fail.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link href="/learning/full-day-course">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    Start with the Full-Day Course <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/learning">
                  <Button variant="outline" className="rounded-full border-2 border-foreground/30 hover:border-foreground/50 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                    See all training <span className="cta-arrow">→</span>
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        <FAQSection title="Questions people ask before they commit" faqs={faqs} variant="light" />

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div className="container max-w-5xl">
            <ScrollRevealSection>
              <MessageUs
                variant="dark"
                context="taskforce"
                heading="Have a challenge in mind?"
                subheading="Tell us what it is in a sentence or two. We'll tell you honestly whether the Taskforce is the right shape for it, or whether you should start somewhere smaller."
              />
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
