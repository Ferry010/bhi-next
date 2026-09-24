import ScrollRevealSection from "@/components/ui/ScrollRevealSection";

// The "middle" of the book page: why the book exists, how it came to be, and a
// taste of the writing. Sits between the hero and BookSection.
export default function WhyWeWroteIt() {
  return (
    <>
      {/* Why we wrote it + how it came to be */}
      <section className="section-padding bg-cream overflow-hidden">
        <div className="container max-w-6xl">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-start">
              {/* Left: the why + Ferry's story */}
              <div>
                <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">
                  Why we wrote it
                </span>
                <h2 className="text-display md:text-display-lg text-foreground mt-4">
                  We wanted an <span className="text-primary">easy way in</span>.
                </h2>
                <p className="text-body-lg text-muted-foreground mt-6 max-w-xl">
                  Most people meet the method in a keynote or a training room. The book is the version you can
                  start tonight, for the price of lunch. Same thinking, in your hands, before we ever speak.
                </p>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-xl">
                  It&apos;s the lowest step on the ladder. Read it, sit with it, try a little. When you&apos;re
                  ready for more, you already know where you stand.
                </p>

                <figure className="mt-8 bg-white border border-border rounded-2xl p-7 md:p-8 shadow-sm">
                  <div className="font-heading font-extrabold text-5xl leading-none text-sunny h-7" aria-hidden="true">
                    &ldquo;
                  </div>
                  <blockquote className="text-foreground text-lg leading-relaxed mt-2 max-w-xl">
                    I shut the door for three days. No meetings, no notifications. If we were going to ask people
                    to spend their evenings with it, the least I could do was give it my full attention first.
                    That head start is why it earns the time, instead of just filling a shelf.
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2">
                    <span className="font-handwritten text-2xl text-primary">Ferry</span>
                    <span className="text-sm text-muted-foreground">— co-author</span>
                  </figcaption>
                </figure>
              </div>

              {/* Right: how it came to be (a small timeline) */}
              <div className="bg-white border border-border rounded-2xl p-7 md:p-8">
                <span className="text-caption uppercase tracking-widest font-heading font-semibold text-muted-foreground">
                  How it came to be
                </span>
                <ol className="mt-6">
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-sunny ring-4 ring-sunny/20" />
                      <span className="w-0.5 flex-grow bg-border" />
                    </div>
                    <div className="pb-6">
                      <h3 className="font-heading font-bold text-lg text-foreground">Three days, door shut</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                        A tiny house on a recreation park, 150 km from home. Three full days, no distractions, to
                        give it a real head start.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/15" />
                      <span className="w-0.5 flex-grow bg-border" />
                    </div>
                    <div className="pb-6 flex gap-4 items-start">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-foreground">The first copy</h3>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                          Went to Vivianne Bendemacher, hand to hand.
                        </p>
                      </div>
                      <img
                        src="/assets/book-cover.jpg"
                        alt="Brand Humanizing book cover"
                        loading="lazy"
                        className="w-12 h-[74px] object-cover rounded shadow-md rotate-3 flex-shrink-0"
                      />
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-accent/15" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground">The launch</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                        Hosted at NIO, a car brand that competes on human experience rather than horsepower, in
                        their showroom venue.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
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
