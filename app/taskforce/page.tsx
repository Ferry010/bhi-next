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
import { LevelPill, LevelsSection } from "@/components/Ladder";
import HonestAnswers from "@/components/HonestAnswers";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/taskforce" },
  title: "The Taskforce | Working Together",
  description:
    "Sixteen weeks. A small team of your own people takes on one real business problem and tests a solution for real. When we leave, they can do it without us.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const facts = [
  { label: "16 weeks", sub: "One half day a week" },
  { label: "6 to 8 people", sub: "Your people, not ours" },
  { label: "About 11 days", sub: "Of their time, over four months" },
  { label: "1 owner", sub: "Keeps it going after we leave" },
];

const forYouIf = [
  {
    title: "You can say the problem in one sentence",
    body: "Not a theme or a dream. One real business problem. If it takes a whole paragraph to explain, we'll help you make it smaller before we start.",
  },
  {
    title: "A boss backs it",
    body: "Someone senior enough to say yes or no on the spot, four times along the way. Without that, good work gets stuck waiting for a yes that never comes.",
  },
  {
    title: "You have four months",
    body: "This is not a workshop with a follow-up. It's one half day a week, for sixteen weeks. That's what it takes for something new to really stick.",
  },
];

const walkAway = [
  "Your problem, with solutions worked out, one tested for real, and a plan for the rest",
  "A before and after, so you can see what really changed",
  "A simple way to keep checking what works, with someone in charge of it",
  "Six to eight people who can do this on their own",
  "One of them officially in charge of it inside your company",
  "A list of what you said no to, and why. That is worth as much as what you kept",
];

const timeline = [
  { weeks: "Before we start", phase: "Pick the team, and measure where you start", gate: null },
  { weeks: "Week 1", phase: "A kick-off day, with the Training", gate: null },
  { weeks: "Weeks 2 to 3", phase: "Find out what the problem really causes", gate: null },
  { weeks: "Week 4", phase: "Pick what matters most", gate: "Boss decides" },
  { weeks: "Weeks 5 to 6", phase: "Come up with solutions", gate: null },
  { weeks: "Week 7", phase: "Choose which ones to build", gate: "Boss decides" },
  { weeks: "Weeks 8 to 9", phase: "Turn them into real plans", gate: null },
  { weeks: "Week 10", phase: "Check the plans", gate: "Boss decides" },
  { weeks: "Weeks 11 to 13", phase: "Test one solution for real", gate: null },
  { weeks: "Week 14", phase: "Look at the results of the test", gate: "Boss decides" },
  { weeks: "Weeks 15 to 16", phase: "Make it part of daily work, hand over, close", gate: null },
];

const seats = [
  { seat: "Front line", why: "Knows what actually happens, not what the process says happens" },
  { seat: "Tech", why: "Knows what your systems can and can't really do" },
  { seat: "HR or training", why: "Looks after people's skills, and usually keeps this going afterwards" },
  { seat: "Sales", why: "Keeps an eye on the money" },
  { seat: "Someone junior", why: "Asks what the senior people stopped asking years ago" },
  { seat: "A doubter", why: "On purpose. Win them over and the rest follow" },
];

const preconditions = [
  "The challenge is written in one sentence, and we both agree on it",
  "A boss is named who backs it, senior enough to say yes or no",
  "You suggest the team: names, jobs and departments",
  "The weekly slot is booked for all sixteen weeks, up front",
  "The four decision dates are in the boss's diary before week one",
];

const faqs = [
  {
    q: "How is this different from a training?",
    a: "In a training, we decide the program up front. The Taskforce follows your problem wherever it goes, so nobody knows the exact route in advance. It is not a longer training, and we won't pretend it is.",
  },
  {
    q: "How is it different from consultancy?",
    a: "We don't do the work for you. Your people do the work between sessions, and we help them get it right. If you want a report full of advice, we are the wrong people, and we'll tell you so.",
  },
  {
    q: "Why only a half day a week?",
    a: "Because people learn by doing, not by watching us. The team works in between and reports back. Clients often ask us to come more, usually around week five when energy drops. More of us makes the result worse, so we say no and explain why.",
  },
  {
    q: "What does the handover actually look like?",
    a: "We lead until week four. Until week seven we lead together with someone from your team. In week nine they lead half the session. In week thirteen they lead all of it while we watch. By week fifteen we're just a guest. By the end, one of your own people runs it.",
  },
  {
    q: "What happens when the boss decides?",
    a: "Four times along the way, the team shows its work to the boss and asks for a yes or no. Thirty minutes. We sit at the back and stay quiet unless asked. A no is a fine answer. It means the process works.",
  },
  {
    q: "How big does my company need to be?",
    a: "Big or fairly big. Sixteen weeks takes real time and attention. It is not a fit for a small business.",
  },
  {
    q: "What does it cost?",
    a: "It depends on your problem and your team, so we give you a price once we agree on both. Talk to us and you get a clear price, with no surprises.",
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
            <LevelPill level="taskforce" />
            <h1 className="hero-headline text-hero md:text-hero-lg text-foreground mt-4">
              Four months from now, your team runs this{" "}
              <span className="text-primary">without us.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              A small team of your own people takes on one real business problem, and tests a solution for real. We are there half a day a week. They do the work in between. When we leave, they can do it without us, and one of them is in charge of it.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-white p-4">
                  <p className="font-heading font-bold text-foreground">{f.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
              <a href={TALK_TO_EXPERT.url}>
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
                Most consultants leave you with a report, and you keep needing them. We leave you with people who can take on the next problem on their own. That is not a bonus. It is the whole point, and we judge ourselves on it.
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
                If one is missing, things get stuck around month two. We would rather find that out now.
              </p>
            </ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-5">
              {forYouIf.map((f) => (
                <ScrollRevealSection key={f.title}>
                  <div className="bg-cream rounded-2xl p-6 md:p-7 h-full">
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
                One kick-off day, a half day with us each week, four moments where the boss decides, one real test, and a closing day.
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
                  We lead until week four. Then we lead together with someone from your team. By week nine, they lead half the session. By week thirteen, they lead all of it while we watch. By week fifteen, we are just a guest.
                </p>
                <p className="text-white font-heading font-semibold">
                  By the end, one of your own people runs it. Not us.
                </p>
                <p>
                  That is also why we are only there half a day a week. Your people learn by doing it, not by watching us.
                </p>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Gates */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-foreground mb-3">The boss decides four times.</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Thirty minutes each. The team shows its work and asks for a yes or no. We sit at the back and stay quiet unless asked. A no is a fine answer. It means the process works.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { g: "Decision 1", w: "Week 4", q: "Are these the right things to work on?" },
                  { g: "Decision 2", w: "Week 7", q: "Shall we plan these solutions?" },
                  { g: "Decision 3", w: "Week 10", q: "Are the plans good enough to test one for real?" },
                  { g: "Decision 4", w: "Week 14", q: "Did the test work well enough to make it part of daily work?" },
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
                You suggest the people, we check the mix. Different kinds of know-how matter more than rank here. Everyone wants to send managers, so we say it out loud. Eight people at most, or people stop joining in and just sit there.
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
                Five things, and we don't bend on them. In the excitement of a new deal they often get skipped, and that always hurts later. We would rather be strict now.
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
                  The Taskforce only works if your people already speak the same language, and if we trust each other from working together before. If we haven't worked with you yet, we'll tell you to start with the Training.
                </p>
                <p>
                  That is not a trick to sell you more. It is the difference between a Taskforce that works and one that gets stuck in month two.
                </p>
                <p className="font-heading font-semibold text-foreground">
                  We would rather say no to a big deal today than watch it fail later.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link href="/learning/full-day-course">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    Start with the Training <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/learning">
                  <Button variant="outline" className="rounded-full border-2 border-foreground/30 hover:border-foreground/50 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                    See all four levels <span className="cta-arrow">→</span>
                  </Button>
                </Link>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        <HonestAnswers
          afterLabel="What does it look like after?"
          data={{
            forYou:
              "You can say one real business problem in one sentence, a boss backs it, and you want your own people to solve it for good.",
            elsewhere: {
              text: "Want your team to learn the method first?",
              label: "Start with the Training",
              href: "/learning/full-day-course",
            },
            q2: {
              question: "What if it isn't working?",
              answer:
                "Four times along the way, your boss decides whether to go on. If the answer is no, you stop there and only pay for the weeks so far. You're never locked in.",
            },
            worth:
              "Most companies hire outside help again for every new problem. After this, six to eight of your own people can take on the next one themselves, and one of them is in charge of it.",
            after:
              "Four months from now: one solution tested for real, a before and after, and your own people running the next problem without us.",
          }}
        />

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
        <LevelsSection current="taskforce" />
      </main>
      <Footer />
    </>
  );
}
