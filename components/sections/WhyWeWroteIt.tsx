import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Check } from "lucide-react";

// The "middle" of the book page. First it sells the book to the reader (what's
// inside, why it's worth it), then it tells the making-of story as an elaborate
// dated timeline, then a taste of the writing. Sits between the hero and BookSection.

const timeline = [
  {
    date: "January 2024",
    dot: "bg-sunny ring-sunny/20",
    title: "Three days in the woods",
    body: "Ferry booked a tiny house deep in the woods, 150 km from home, and stayed three days until the first framework existed. Those three focused days are the backbone of the book that's in stores today.",
  },
  {
    date: "2024",
    dot: "bg-primary ring-primary/15",
    title: "The manuscript",
    body: "On that framework, Ferry and Jonathan wrote the book, chapter by chapter.",
  },
  {
    date: "2024",
    dot: "bg-accent ring-accent/15",
    title: "A publisher who got it",
    body: "They brought the story to Compas Uitgeverij in Houten. The publisher got excited about it and offered a book deal.",
  },
  {
    date: "Until June 2025",
    dot: "bg-sunny ring-sunny/20",
    title: "Writing and interviews",
    body: "The two kept writing and interviewing along the way, including Yvo Jurgens of a.s.r., one of our top clients, right up until the final manuscript went in in June 2025.",
  },
  {
    date: "November 2025",
    dot: "bg-primary ring-primary/15",
    title: "The launch",
    body: "The book was printed, and we launched it at NIO's showroom and event space. NIO is a car brand that competes on human experience instead of horsepower, which happens to be the whole point of the book.",
  },
  {
    date: "November 2025",
    dot: "bg-accent ring-accent/15",
    title: "The first copy",
    body: "The very first copy went to Vivianne Bendemacher, a fellow speaker of Ferry's and one of the more innovative, human-focused people we know.",
  },
];

export default function WhyWeWroteIt() {
  return (
    <>
      {/* What's inside — sell the book to the reader */}
      <section className="section-padding bg-cream overflow-hidden">
        <div className="container max-w-6xl">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
                  What&apos;s inside
                </span>
                <h2 className="text-display md:text-display-lg text-foreground mt-4">
                  The whole method, in <span className="text-primary">one book</span>.
                </h2>
                <p className="text-body-lg text-muted-foreground mt-6 max-w-xl">
                  This isn&apos;t a recap of the keynote. It&apos;s the whole thing: the frameworks, the thinking
                  behind them, and the company cases we usually keep for the stage. Written to be read in a
                  weekend, not studied for a term.
                </p>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-xl">
                  It&apos;s the cheapest way to get the full picture, and the lowest-pressure one. No meeting, no
                  pitch. Read a chapter and you&apos;ll know if it&apos;s for your team.
                </p>
              </div>

              <div className="bg-white border border-border rounded-2xl p-7 md:p-8">
                <span className="text-caption uppercase tracking-widest font-heading font-semibold text-muted-foreground">
                  What you get
                </span>
                <ul className="mt-5 space-y-5">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">The full framework</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        Everything we teach, in order, with the reasoning behind it.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">Real company cases</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        How real teams put it to work, names and all.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">A weekend read</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        Short chapters, plain language, no jargon.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* How the book was made — the elaborate, dated story */}
      <section className="section-padding bg-secondary">
        <div className="container max-w-2xl">
          <ScrollRevealSection>
            <div className="mb-10">
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
                How the book was made
              </span>
              <h2 className="text-display text-foreground mt-4">Two years in the making.</h2>
              <p className="text-body-lg text-muted-foreground mt-3">
                One tiny house in the woods, a publisher who got it, and a lot of interviews.
              </p>
            </div>

            <ol>
              {timeline.map((item, i) => (
                <li key={item.title} className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                    <span className={`w-3.5 h-3.5 rounded-full ring-4 ${item.dot}`} />
                    {i < timeline.length - 1 && <span className="w-0.5 flex-grow bg-border mt-1" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary">
                      {item.date}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-foreground mt-1">{item.title}</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollRevealSection>
        </div>
      </section>

      {/* A taste of the book */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-16 right-8 font-heading font-extrabold text-[16rem] leading-none text-sunny/10 select-none"
          aria-hidden="true"
        >
          &rdquo;
        </div>
        <div className="container max-w-4xl relative">
          <ScrollRevealSection>
            <span className="text-sunny text-caption uppercase tracking-widest font-heading font-semibold">
              A taste · Dutch edition
            </span>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mt-5 max-w-3xl" lang="nl">
              In een tijdperk waarin de grenzen tussen mens en technologie steeds meer vervagen, introduceert dit
              boek een concept dat van vitaal belang is voor elke professional die een dieper begrip zoekt van de
              moderne zakelijke dynamiek: Brand Humanizing.
            </p>
            <p
              className="font-heading font-bold text-2xl md:text-[2rem] leading-snug text-white mt-6 max-w-3xl"
              lang="nl"
            >
              Dit boek is niet zomaar een leidraad. Het is een reis door het hart van wat het betekent om een merk
              te bouwen dat technologisch geavanceerd is{" "}
              <span className="text-soft-coral">— en, misschien nog wel meer, diep menselijk.</span>
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-sunny" />
              <span className="text-white/70 text-sm font-medium">
                uit Brand Humanizing · Ferry Hoes &amp; Jonathan Flores
              </span>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </>
  );
}
