"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Polaroid from "./Polaroid";
import { BOOK, TALK_TO_EXPERT } from "@/lib/pricing";
import { ChevronDown, ArrowRight, BookOpen, GraduationCap } from "lucide-react";

const SECTION_COUNT = 7;
const labels = ["Start", "2017", "2018", "First client", "The stages", "The book", "What's next"];

// Shared per-screen wrapper classes. Light "book cover" palette so the tour
// matches /learning and the homepage. Each screen is its own snap target;
// content top-aligns under the fixed navbar on mobile, centres on desktop.
const screenBase =
  "relative min-h-[100dvh] md:h-[100dvh] snap-start snap-always flex flex-col items-center justify-start md:justify-center overflow-hidden px-6 pt-24 pb-16 md:py-24";
const gridBase = "relative w-full max-w-6xl grid md:grid-cols-2 gap-6 md:gap-14 items-center";
const eyebrow = "text-accent text-caption uppercase tracking-widest font-heading font-semibold";
const heading = "text-display md:text-display-lg font-heading font-extrabold text-foreground mt-3 leading-tight";
const subhead = "text-primary font-heading font-semibold mt-2";
const bodyText = "text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl";

export default function OriginTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { root, threshold: 0.55 }
    );
    sections.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (i: number) => sections.current[i]?.scrollIntoView({ behavior: "smooth" });
  const setRef = (i: number) => (el: HTMLElement | null) => {
    sections.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] overflow-y-scroll snap-y snap-proximity md:snap-mandatory scroll-smooth bg-secondary text-foreground"
    >
      {/* Dot navigation */}
      <nav
        aria-label="Story sections"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3.5"
      >
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to ${labels[i]}`}
            aria-current={active === i}
            className={`group relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              active === i ? "bg-accent scale-125" : "bg-foreground/20 hover:bg-foreground/50"
            }`}
          >
            <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-heading font-semibold text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
              {labels[i]}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Screen 0 · Intro ─────────────────────────────────────── */}
      <section data-index={0} ref={setRef(0)} className={`${screenBase} md:items-center bg-secondary`}>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="relative text-center max-w-3xl m-auto">
          <span className={eyebrow}>Our story</span>
          <h1 className="text-hero md:text-hero-lg font-heading font-extrabold text-foreground mt-5 leading-[1.05]">
            It started with a line <br className="hidden md:block" />
            <span className="text-accent">in a notebook.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-body-lg mt-6 max-w-xl mx-auto">
            How two growth hackers turned their own discomfort into Brand Humanizing, and where it goes next.
          </p>
          <button
            onClick={() => go(1)}
            className="mt-12 inline-flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-colors"
          >
            <span className="text-xs font-heading font-semibold uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Screen 1 · Where it began ────────────────────────────── */}
      <section data-index={1} ref={setRef(1)} className={`${screenBase} bg-white`}>
        <div className={gridBase}>
          <div>
            <span className={eyebrow}>2017 · Rotterdam</span>
            <h2 className={heading}>Where it all began</h2>
            <p className={subhead}>A McDonald&apos;s in Rotterdam.</p>
            <div className={`mt-5 space-y-3 ${bodyText}`}>
              <p>
                Jonathan and Ferry were growth hackers. All day they chased, measured and optimised datapoints that were really people, with moods, worries and lives. They used AI, analytics and everything they knew about psychology to nudge those people into buying more, and more.
              </p>
              <p>
                It felt wrong. They were automating themselves into robots, instead of automating the work. So they wrote one line in a notebook.
              </p>
            </div>
            <blockquote className="mt-6 border-l-2 border-accent pl-4 text-xl md:text-2xl font-heading font-bold text-foreground leading-snug max-w-md">
              &ldquo;Don&apos;t automate for humans. Automate for processes.&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground/80 mt-5 max-w-xl">
              A year later they published it on Medium, coined the term, and set out the framework. Brand Humanizing was born.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Polaroid
              src="/assets/origin/wooden-line.jpg"
              alt="The founding line, handwritten in a notebook: Don't automate for humans, automate for processes."
              caption="The line that started it all · 2017"
              rotate={-2.5}
              widthClass="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* ── Screen 2 · Coining the term ──────────────────────────── */}
      <section data-index={2} ref={setRef(2)} className={`${screenBase} bg-cream`}>
        <div className={gridBase}>
          <div className="order-2 md:order-1 flex justify-center gap-4 md:gap-6">
            <Polaroid
              src="/assets/origin/php-conference.jpg"
              alt="Jonathan presenting Brand Humanizing at the Dutch PHP Conference."
              caption="Jonathan · Dutch PHP Conference"
              rotate={-4}
              widthClass="w-36 sm:w-52 md:w-60"
              className="mt-8"
            />
            <Polaroid
              src="/assets/origin/ferry-eindhoven.jpg"
              alt="Ferry pitching Brand Humanizing to entrepreneurs in Eindhoven."
              caption="Ferry · Eindhoven"
              rotate={3.5}
              widthClass="w-36 sm:w-52 md:w-60"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className={eyebrow}>2018 · First stages</span>
            <h2 className={heading}>Saying it out loud</h2>
            <p className={subhead}>The first time we used the words in public.</p>
            <div className={`mt-5 space-y-3 ${bodyText}`}>
              <p>
                Jonathan took it to the Dutch PHP Conference. Ferry pitched it to a room full of entrepreneurs in Eindhoven.
              </p>
              <p>
                Two rooms, one idea, said out loud for the first time. These were our first real speaking engagements, and people leaned in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 3 · First client ──────────────────────────────── */}
      <section data-index={3} ref={setRef(3)} className={`${screenBase} bg-white`}>
        <div className={gridBase}>
          <div>
            <span className={eyebrow}>The first believer</span>
            <h2 className={heading}>Our first client</h2>
            <p className={subhead}>ABN AMRO turned a talk into a project.</p>
            <div className={`mt-5 space-y-3 ${bodyText}`}>
              <p>
                Jonathan gave a Brand Humanizing keynote to a hundred people at ABN AMRO. One of their leaders sat in the crowd and heard his own problem described back to him, and saw the answer in Brand Humanizing.
              </p>
              <p>
                After a year of research and zero revenue, that was the proof. This was not just a belief we shared over fast food. It was a business.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            {/* A logo rather than a photo, framed like a kept memento. */}
            <figure className="bg-white px-5 pt-8 pb-3 shadow-[0_18px_45px_-12px_rgba(18,21,46,0.28)] ring-1 ring-black/[0.04] w-64 md:w-72 -rotate-1">
              <div className="flex items-center justify-center h-32">
                <img src="/assets/origin/abn-amro.png" alt="ABN AMRO logo" loading="lazy" className="max-w-[80%] max-h-full object-contain" />
              </div>
              <figcaption className="font-handwritten text-foreground/80 text-center text-xl md:text-2xl leading-tight px-1 py-2.5">
                Our first client · ABN AMRO
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Screen 4 · The stages ────────────────────────────────── */}
      <section data-index={4} ref={setRef(4)} className={`${screenBase} bg-cream`}>
        <div className={gridBase}>
          <div className="order-2 md:order-1 flex justify-center items-center">
            <div className="relative">
              <Polaroid
                src="/assets/origin/speaking-2.jpg"
                alt="Ferry on stage delivering a Brand Humanizing keynote."
                caption="On stage"
                rotate={-5}
                widthClass="w-32 sm:w-48 md:w-56"
                className="relative z-20"
              />
              <Polaroid
                src="/assets/origin/speaking-1.jpg"
                alt="A packed room during a Brand Humanizing keynote."
                caption="The room"
                rotate={4}
                widthClass="w-40 sm:w-48 md:w-56"
                className="absolute -top-6 -right-24 md:-right-32 z-10 hidden sm:block"
              />
              <Polaroid
                src="/assets/origin/speaking-3.jpg"
                alt="Ferry speaking to an international audience."
                caption="Across the globe"
                rotate={2}
                widthClass="w-40 sm:w-48 md:w-56"
                className="absolute -bottom-10 -left-16 md:-left-24 z-0 hidden sm:block"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className={eyebrow}>2021 → today</span>
            <h2 className={heading}>From an idea to the world&apos;s stages</h2>
            <p className={subhead}>Forty keynotes a year, and counting.</p>
            <p className={`mt-5 ${bodyText}`}>
              In 2021, Speakers Academy, the leading Dutch speaking agency, heard Ferry&apos;s story and offered him an exclusive collaboration. His speaking took off. Today he averages around forty keynotes a year across the globe, on stages for GlaxoSmithKline, VodafoneZiggo, the Dutch Ministry of Finance, the American Marketing Association, Unilever and many more.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-7">
              {[
                { v: "~40", l: "keynotes / year" },
                { v: "600k+", l: "people reached" },
                { v: "Global", l: "stages, podcasts, shows" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-heading font-extrabold text-2xl md:text-3xl text-primary tabular-nums">{s.v}</div>
                  <div className="text-muted-foreground text-xs md:text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 5 · The book ──────────────────────────────────── */}
      <section data-index={5} ref={setRef(5)} className={`${screenBase} bg-white`}>
        <div className={gridBase}>
          <div>
            <span className={eyebrow}>November 2025</span>
            <h2 className={heading}>We wrote it all down</h2>
            <p className={subhead}>Brand Humanizing, the book.</p>
            <div className={`mt-5 space-y-3 ${bodyText}`}>
              <p>
                Years of finetuning, feedback, speaking and client work, brought together in one book. It tells the origin story, but most of all it hands over the entire framework.
              </p>
              <p>
                It is for anyone who wants to work in a digital age and take an unfair advantage, by understanding how to use technology to grow the human side of a business, and the other way around.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative">
              <Polaroid src="/assets/origin/book-1.jpg" alt="The Brand Humanizing book." caption="Brand Humanizing" rotate={-4} widthClass="w-40 sm:w-48 md:w-56" className="relative z-20" />
              <Polaroid src="/assets/origin/book-2.jpg" alt="The Brand Humanizing book, open." caption="The framework" rotate={5} widthClass="w-40 sm:w-48 md:w-56" className="absolute -top-4 -right-24 md:-right-32 z-10 hidden sm:block" />
              <Polaroid src="/assets/origin/book-3.jpg" alt="The Brand Humanizing book in hand." caption="In your hands" rotate={-1.5} widthClass="w-36 sm:w-44 md:w-52" className="absolute -bottom-12 -left-16 md:-left-24 z-0 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 6 · What's next / CTA ─────────────────────────── */}
      <section
        data-index={6}
        ref={setRef(6)}
        className="relative min-h-[100dvh] md:h-[100dvh] snap-start snap-always flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 md:py-24 text-center bg-secondary"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-accent/[0.06] blur-[130px]" />
        <div className="relative max-w-2xl m-auto">
          <span className={eyebrow}>Where it&apos;s going</span>
          <h2 className="text-display md:text-display-lg font-heading font-extrabold text-foreground mt-4 leading-tight">
            The next chapter is <span className="text-accent">your team.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-body-lg mt-6 max-w-xl mx-auto">
            It started with two people and a line in a notebook. It grew into a framework, a stage and a book. Where it goes next is up to the teams who pick it up. Start where you like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-9">
            <a href={BOOK.purchase.url} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                <BookOpen className="w-4 h-4" /> Start with the book
              </Button>
            </a>
            <Link href="/learning">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                <GraduationCap className="w-4 h-4" /> Train your team
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Rather talk it through first?{" "}
            <a href={TALK_TO_EXPERT.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-primary hover:text-accent transition-colors inline-flex items-center gap-1">
              Talk to us <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 text-xs text-foreground/40">
          <Link href="/" className="hover:text-foreground/70 transition-colors">Brand Humanizing Institute</Link>
          <span>·</span>
          <Link href="/our-beliefs" className="hover:text-foreground/70 transition-colors">Our beliefs</Link>
          <span>·</span>
          <Link href="/the-method" className="hover:text-foreground/70 transition-colors">The method</Link>
        </div>
      </section>
    </div>
  );
}
