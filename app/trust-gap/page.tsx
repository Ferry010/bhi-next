import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Users, ShieldCheck } from "lucide-react";
import { MIN_TEAM_RESPONSES } from "@/lib/trustGap/questions";

export const metadata: Metadata = {
  alternates: { canonical: "/trust-gap" },
  title: "The AI Trust Gap | Brand Humanizing Institute",
  description:
    "A free diagnostic. Answer six questions about AI on your team, send an anonymous link to your team, and see the gap between what you believe and what they report.",
};

const steps = [
  {
    icon: Users,
    title: "You answer six questions",
    body: "Two minutes. What you believe is happening with AI on your team. No email needed to start.",
  },
  {
    icon: ShieldCheck,
    title: "Your team answers the same six",
    body: `You get an anonymous link to send them. Their answers are never shown individually, and the report stays locked until at least ${MIN_TEAM_RESPONSES} people have replied.`,
  },
  {
    icon: Lock,
    title: "You see the gap",
    body: "Where your picture and their experience line up, where they do not, and three things you can do about it within a month.",
  },
];

export default function TrustGapLandingPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 pb-16 md:pt-40 md:pb-24">
          <div className="container max-w-3xl">
            <h1 className="hero-headline text-hero md:text-hero-lg text-foreground">
              You know what your team tells you about AI. <span className="text-primary">Do you know the rest?</span>
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground">
              Most people using AI at work have not mentioned all of it. Not because they are doing
              anything wrong, but because nobody has made it clearly safe to say. This is a free
              diagnostic that measures the distance between what you believe is happening on your
              team and what your team reports.
            </p>
            <p className="mt-4 text-body-lg text-muted-foreground">
              It measures trust and psychological safety, not AI literacy. It is not a test of how
              much anyone knows about the technology, and it is not a grade for you as a manager.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/trust-gap/start">
                <Button className="btn-scale h-12 w-full rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral sm:w-auto">
                  Start the diagnostic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free. Takes two minutes. No account, and no email until you are ready to share it.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-display md:text-display-lg text-foreground">How it works</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.title} className="rounded-2xl bg-cream p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                    <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container-narrow">
            <h2 className="text-display md:text-display-lg text-white">
              Why you have to send it to your team
            </h2>
            <p className="mt-5 text-body-lg text-white/75">
              There is no way to see your result without asking your team, and there is no button
              here to skip that step. A diagnostic that told you what you already believe would be
              worth nothing. The whole point is the second opinion, and the only people who can give
              it are the people who work for you.
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-foreground">What happens to the data</h2>
            <ul className="mt-6 space-y-3 text-body-lg text-muted-foreground">
              <li>Team answers are anonymous. We never show you an individual response, and the report cannot be unlocked below {MIN_TEAM_RESPONSES} replies for exactly that reason.</li>
              <li>Results are stored in aggregate, with no names and no way to trace an answer back to a person.</li>
              <li>We never sell any of it.</li>
              <li>We publish the aggregate findings once a year as free research, so the whole picture gets better for everyone.</li>
              <li>Your email is asked for only at the point where you share the link, and it is used to tell you when your report is ready.</li>
            </ul>
            <div className="mt-10">
              <Link href="/trust-gap/start">
                <Button className="btn-scale h-12 rounded-full bg-accent px-8 font-heading text-base font-semibold text-accent-foreground hover:bg-soft-coral">
                  Start the diagnostic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
