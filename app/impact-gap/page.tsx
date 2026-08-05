import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ToolHeader, ToolFooter } from "@/components/impact-gap/ToolShell";
import { MIN_TEAM_RESPONSES } from "@/lib/impactGap/questions";

export const metadata: Metadata = {
  alternates: { canonical: "/impact-gap" },
  // The root layout appends " | Brand Humanizing Institute" via its title
  // template, so the suffix is deliberately left off here.
  title: "The Impact Gap",
  description:
    "A free test. Answer six questions about what AI changed on your team, your team answers the same six anonymously, and you see the difference between what you believe and what they report.",
  openGraph: {
    title: "The Impact Gap",
    description:
      "Your team uses AI every day. Name one thing they can do now that they could not do before.",
  },
};

const steps = [
  {
    number: "1",
    title: "You answer six questions",
    body: "Two minutes, on what you believe is happening with AI on your team. No account, no email, nothing to install. You can do it on the train.",
  },
  {
    number: "2",
    title: "Your team answers the same six",
    body: `You get a link to send them. Their answers are anonymous, you never see an individual response, and nothing at all is shown until at least ${MIN_TEAM_RESPONSES} people have replied.`,
  },
  {
    number: "3",
    title: "You see the difference",
    body: "Between what you think is happening and what your team reports. That difference is the whole finding, and it is usually wider than anyone expects.",
  },
];

const included = [
  {
    title: "A score out of 100",
    body: "How far apart your picture and your team's picture are. Lower is better. It measures distance, not competence.",
  },
  {
    title: "Six comparisons",
    body: "Your answer against your team's answer, one card per question, with the gap on each stated plainly.",
  },
  {
    title: "Your team's own words",
    body: "Their unedited answers to the hardest question in the test, quoted in full. This does more work than any chart.",
  },
  {
    title: "Three things to do about it",
    body: "Doable inside a month, none of them a purchase, and none of them another round of training.",
  },
];

const privacy = [
  `Team answers are anonymous. You never see who wrote what, and neither do we.`,
  `Nothing is shown until at least ${MIN_TEAM_RESPONSES} people have answered, because below that number it becomes possible to work out who said what.`,
  `Individual answers are never visible to anyone, including us. The database is built so that they cannot be read out one at a time.`,
  `We never sell any of this, and we never pass it to anyone.`,
  `Once a year we publish the aggregate findings, with nothing in them that identifies a company or a person, as free research.`,
];

export default function ImpactGapLandingPage() {
  return (
    <>
      <ToolHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary pt-28 pb-16 md:pt-40 md:pb-24">
          <div className="container max-w-3xl">
            <h1 className="hero-headline text-hero md:text-hero-lg text-foreground">
              Your team uses AI every day.{" "}
              <span className="text-primary">
                Name one thing they can do now that they could not do before.
              </span>
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground">
              Most organisations have adopted AI at scale. They pay for it every month, people use
              it every day, and almost nobody can name a single thing the team can do now that was
              genuinely out of reach eighteen months ago. What they bought was speed, and speed got
              called a transformation.
            </p>
            <p className="mt-4 text-body-lg text-muted-foreground">
              This is a free test that checks whether anything actually changed. It takes two
              minutes of your time, six anonymous minutes of your team's, and it gives you the one
              number nobody in your organisation currently has.
            </p>

            <div className="mt-10">
              <Link href="/impact-gap/start">
                <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral">
                  Start the test <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Free. No account. No email until you are ready to send it to your team.
              </p>
            </div>
          </div>
        </section>

        {/* The hands-up moment */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">
              The thing that happens in every room
            </h2>
            <p className="mt-6 text-body-lg text-muted-foreground">
              Ask a room full of people who uses AI at work, and nearly every hand goes up. That
              stopped being interesting a while ago. Nobody is surprised by it, and nobody looks
              around to check what everyone else is doing before they answer.
            </p>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Then ask the second question. Who makes a bigger impact than they did two years ago?
              Who does work that was genuinely out of reach before? Who has changed something about
              how this company operates? The hands go down. Not quickly, and not with any
              embarrassment. People wait a beat to see whether anyone else is keeping theirs up, and
              then the room goes quiet in a way that everyone present understands, including the
              people who run the place.
            </p>
            <p className="mt-4 text-body-lg text-muted-foreground">
              That gap between the first show of hands and the second is the thing this test
              measures. It is not a failure of your people and it is not a sign that the technology
              was a mistake. It is what happens when time gets freed up and nobody ever decides what
              it is for.
            </p>
          </div>
        </section>

        {/* What the test does */}
        <section className="section-padding bg-cream">
          <div className="container max-w-4xl">
            <h2 className="text-display md:text-display-lg text-foreground">How it works</h2>
            <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
              Three steps, and the second one is not optional. A test that only asked you would
              return your own opinion with a number on it.
            </p>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.number} className="rounded-2xl bg-white p-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-lg font-bold text-primary-foreground"
                  >
                    {s.number}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What you get */}
        <section className="section-padding bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-display md:text-display-lg text-foreground">What you get back</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-body-lg font-semibold text-foreground">
              All of it free, with nothing to buy at the end of it.
            </p>
          </div>
        </section>

        {/* The human promise */}
        <section className="section-padding bg-navy">
          <div className="container-narrow">
            <h2 className="text-display md:text-display-lg text-white">
              A person reads your result. An actual one.
            </h2>
            <p className="mt-6 text-body-lg text-white/80">
              The score is calculated automatically, because scoring is arithmetic and a machine is
              better at arithmetic than we are. Reading the result is a different job. Once your
              report is ready, Ferry or Jonathan opens it, reads what your team wrote, and writes
              back with what they make of it. Within two working days.
            </p>
            <p className="mt-4 text-body-lg text-white/80">
              That is one of us at a desk with your results in front of us, not a sequence that
              fires on a timer with your first name pasted into the top of it. There is no drip
              campaign behind this and nothing gets added to a list. We spend our working lives
              arguing that technology should take the predictable part so that people are free to do
              the rest, so it would be strange to run our own test any other way.
            </p>
          </div>
        </section>

        {/* Privacy */}
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">
              What happens to the answers
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Your team is about to be asked to be honest about their manager. That only works if
              the promise underneath it is real, so here it is in full, before anyone answers
              anything.
            </p>
            <ul className="mt-8 space-y-4">
              {privacy.map((line) => (
                <li key={line} className="flex gap-3 text-body-lg text-muted-foreground">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Start again */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl text-center">
            <h2 className="text-display md:text-display-lg text-foreground">
              Six questions. Two minutes. Then you will know.
            </h2>
            <div className="mt-8">
              <Link href="/impact-gap/start">
                <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral">
                  Start the test <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ToolFooter />
    </>
  );
}
