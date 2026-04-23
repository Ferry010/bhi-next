import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ScrollProgress from "./ScrollProgress";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "The State of Brand Humanizing 2026 | Brand Humanizing Institute",
  description:
    "Eight years ago, two people in a Rotterdam McDonald's asked if brands could use technology to become more human. Here is what happened next. The State of Brand Humanizing 2026.",
  openGraph: {
    type: "article",
    images: [{ url: "/og/state-of-brand-humanizing-2026.jpg" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The State of Brand Humanizing 2026",
  author: [
    { "@type": "Person", name: "Ferry Hoes", url: "https://brandhumanizing.com/about" },
    { "@type": "Person", name: "Jonathan Flores", url: "https://brandhumanizing.com/about" },
  ],
  publisher: {
    "@type": "Organization",
    name: "Brand Humanizing Institute",
    url: "https://brandhumanizing.com",
    logo: { "@type": "ImageObject", url: "https://brandhumanizing.com/logo.png" },
  },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  description:
    "Eight years after the original idea. Here is where we are, what changed, and what it means for your organization in 2026.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://brandhumanizing.com/research/state-of-brand-humanizing-2026",
  },
};

function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#source-${n}`}
      className="text-xs text-accent cursor-pointer hover:underline align-super ml-0.5"
      aria-label={`Source ${n}`}
    >
      [{n}]
    </a>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 md:pl-10 my-12 md:my-16">
      <p className="text-xl md:text-2xl lg:text-3xl italic font-heading font-semibold text-primary-foreground/90 leading-snug">
        {children}
      </p>
    </blockquote>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-heading font-bold text-display md:text-display-lg text-primary-foreground mt-16 md:mt-24 mb-6 border-l-4 border-accent pl-5 ${className}`}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading font-bold text-section text-accent mt-10 mb-4">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body-lg text-primary-foreground/80 mb-5 leading-relaxed">{children}</p>;
}

function TimelineDivider() {
  return <div className="w-px h-8 bg-accent/40 ml-2 my-6" />;
}

export default function StateOfBrandHumanizing2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ScrollProgress />
      <div className="bg-near-black">
        <Navbar />

        {/* Hero */}
        <header className="bg-near-black pt-28 md:pt-36 pb-16 md:pb-24 px-4">
          <div className="container max-w-4xl">
            <div className="flex justify-end mb-8 print:hidden">
              <PrintButton />
            </div>
            <p className="text-caption uppercase tracking-[0.25em] font-heading font-semibold text-accent mb-6">
              The Brand Humanizing Institute&ensp;|&ensp;April 2026
            </p>
            <h1 className="text-hero md:text-hero-lg text-primary-foreground max-w-3xl">
              The State of Brand Humanizing&nbsp;2026.
            </h1>
            <p className="text-body-lg md:text-xl text-primary-foreground/70 mt-6 max-w-2xl font-heading">
              Eight years ago, we called it. Here is what happened next.
            </p>
            <p className="text-caption text-primary-foreground/50 mt-6">
              By Ferry Hoes and Jonathan Flores&ensp;·&ensp;Brand Humanizing Institute&ensp;·&ensp;8 min read
            </p>
            <hr className="border-accent mt-8 w-24" />
          </div>
        </header>

        {/* Pull stats */}
        <section className="bg-near-black border-t border-primary-foreground/10 py-16 md:py-24 px-4">
          <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
            {[
              { stat: "63%", desc: "of workers say AI will make the workplace feel less human in 2026.", cite: 3 },
              { stat: "$5.5T", desc: "of economic value at risk due to AI-related skills gaps in 2026. (IDC)", cite: 4 },
              {
                stat: "87.5%",
                desc: "of decision-makers in 2020 said there would always be a place for humans in organizations. They were right. The hard part is what comes next.",
                cite: 1,
              },
            ].map((s) => (
              <div key={s.stat}>
                <span className="block font-heading font-extrabold text-5xl md:text-6xl text-accent leading-none mb-3">
                  {s.stat}
                </span>
                <p className="text-body-lg text-primary-foreground/70">
                  {s.desc}
                  <Cite n={s.cite} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Article body */}
        <main className="bg-near-black px-4 pt-4 md:pt-8 pb-16 md:pb-28">
          <div className="container max-w-3xl">
            <H2 className="!mt-0">Eight years ago, we called it.</H2>
            <P>
              In the summer of 2020, the Brand Humanizing Institute published its first major research piece. We surveyed 104 decision-makers across five regions of the globe<Cite n={2} /> and asked them one central question: is there still a place for humans in an increasingly automated world?
            </P>
            <P>87.5% said yes.<Cite n={1} /></P>
            <P>
              Most were cautiously optimistic. Some were already nervous. A few were convinced AI would replace most jobs within a decade. Almost none of them had heard of ChatGPT, because ChatGPT did not exist yet.
            </P>
            <P>That was 2020.</P>
            <P>This is 2026.</P>
            <PullQuote>&ldquo;What we said in 2017 felt contrarian. In 2026, it is the consensus.&rdquo;</PullQuote>

            <H2>What we said in 2017</H2>
            <P>
              When Jonathan Flores and Ferry Hoes coined the term Brand Humanizing in 2017, the diagnosis was simple. Organizations were using technology to extract value from people instead of using it to serve them. Automation was a cost-cutting tool, not a growth strategy. Customer service was being systematically gutted. Real relationships were being replaced by FAQ pages and chatbots that nobody liked.
            </P>
            <P>
              The prescription was equally simple: the most durable competitive advantage any organization can build is not its technology. It is its humanity.
            </P>
            <P>For the first few years, that felt like a contrarian argument.</P>
            <P>In 2026, it is the consensus.</P>

            <H2>What happened between then and now</H2>
            <TimelineDivider />

            <H3>The Acceleration (2022 to 2024)</H3>
            <P>
              Generative AI arrived in late 2022 and compressed roughly a decade of predicted technological change into eighteen months. Suddenly, every organization was racing to integrate AI into operations, communications, decision-making, and hiring. The conversation shifted almost overnight from &ldquo;should we automate?&rdquo; to &ldquo;how fast can we automate everything?&rdquo;
            </P>
            <P>The results were exactly as mixed as anyone with a long view would have predicted.</P>
            <P>
              Organizations that had invested in their human infrastructure (their culture, their employee capabilities, their real relationships with customers) adapted quickly. They already had people who knew how to think. Giving them better tools accelerated what was already working.
            </P>
            <P>
              Organizations that had spent the previous decade cutting corners on the human side discovered a different reality. Powerful tools. Nobody who knew how to use them wisely. No culture of judgment or creativity to fall back on.
            </P>
            <P>
              The technology amplified what was already there. That turned out to be both the great promise and the great problem of the AI wave.
            </P>
            <TimelineDivider />

            <H3>The Dehumanization Backlash (2024 to now)</H3>
            <P>
              Here is the number every leader should sit with. As of 2026, 63% of workers expect AI to make the workplace feel less human this year.<Cite n={3} /> Not less efficient. Less human.
            </P>
            <P>They are not wrong to feel this way.</P>
            <P>
              Many of them have watched their teams shrink while workloads stayed the same. They have seen their judgment get overridden by algorithmic recommendations that nobody can explain. They have tried to reach a real person at a company and failed. They have been onboarded by an AI, evaluated by an AI, and in some cases, told they are at risk by an AI.
            </P>
            <P>
              The fear in 2020 was job replacement. The fear in 2026 is something subtler and more corrosive: identity erosion. People are not just asking whether they will have a job. They are asking whether what they do still matters. Whether the judgment they bring counts for anything. Whether the relationships they have built mean what they thought they meant.
            </P>
            <P>This is not a technology problem. It is a strategy problem.</P>
            <TimelineDivider />

            <H3>The Skills Crisis (now)</H3>
            <P>
              IDC projects that over 90% of global enterprises will face critical skills shortages by 2026, with AI-related gaps putting $5.5 trillion of economic value at risk through delays, missed revenue, and quality failures.<Cite n={4} />
            </P>
            <P>
              But read that carefully. The shortage is not just in technical skills. It is in the human ones. Empathy. Ethical judgment. Creative problem-solving. The ability to build trust in a room. The capacity to have a difficult conversation well.
            </P>
            <P>These were always the hardest skills to develop. Now they are the most expensive skills to be missing.</P>
            <P>
              57% of workers identify AI reducing human capabilities as the leading workforce issue of 2026.<Cite n={5} /> Not job displacement, which comes second. The leading fear is that over-reliance on AI will erode the human skills that organizations actually need most.
            </P>
            <TimelineDivider />

            <H3>The Regulatory Floor (August 2, 2026)</H3>
            <P>
              The EU AI Act enforcement kicks in this year.<Cite n={6} /> For the first time, organizations operating in the EU will be legally required to consider the human impact of their AI systems. Transparency. Human oversight of automated decisions. Accountability for algorithmic outcomes.
            </P>
            <P>What Brand Humanizing has been arguing since 2017 is now, in significant part, the law.</P>

            <PullQuote>&ldquo;The fear in 2020 was job replacement. The fear in 2026 is identity erosion.&rdquo;</PullQuote>

            <H2>Where organizations stand today</H2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {[
                {
                  label: "THE AUTOMATORS",
                  text: "They moved fast. They deployed AI across operations, customer service, and decision-making. They cut costs. Many of them have also cut trust. Their employees are anxious. Their customer satisfaction is declining. Efficiency without humanity is not a sustainable competitive position. It is slow collapse, made invisible by short-term cost savings.",
                  highlight: false,
                },
                {
                  label: "THE PARALYZED",
                  text: "They moved slow. They watched. They ran pilots that went nowhere. They formed AI committees. They attended conferences. Now they are behind. Not just technologically, but strategically. They did not automate the right things, and they did not build the human skills to differentiate either. The worst of both worlds.",
                  highlight: false,
                },
                {
                  label: "THE BRAND HUMANIZERS",
                  text: 'They asked a different question from the start. Not "what can we automate?" but "what should only humans do?" They automated the work that was never really human work. They invested the freed capacity into creativity, relationships, judgment, and care. Their employees are more engaged. Their customer loyalty is measurably higher. They are building something no competitor can copy.',
                  highlight: true,
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`rounded-2xl p-6 md:p-7 ${
                    c.highlight
                      ? "bg-accent/15 border-2 border-accent"
                      : "bg-primary-foreground/5 border border-primary-foreground/10"
                  }`}
                >
                  <span
                    className={`text-caption font-heading font-bold uppercase tracking-wider ${
                      c.highlight ? "text-accent" : "text-primary-foreground/50"
                    }`}
                  >
                    {c.label}
                  </span>
                  <p className="text-sm text-primary-foreground/75 mt-3 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <H2>What the research tells us</H2>
            <P>
              Our 2020 report found that 87.5% of decision-makers believed there would always be space for human labor in organizations. They were right. What the same research could not fully predict was how much active effort it would take to make that space real.
            </P>
            <P>
              Believing that humans matter is not enough. Building the organizational skills, the culture, and the strategy to act on that belief is the hard part. That is the part most organizations skipped.
            </P>
            <P>
              The good news: it is not too late. The organizations rethinking their approach right now, that are asking honestly where humans belong and where technology belongs, are still early. The mainstream has not caught up.
            </P>
            <P>The window will close. But it has not closed yet.</P>

            <H2>The question for your organization in 2026</H2>
            <div className="my-10 md:my-16 space-y-6">
              <p className="text-xl md:text-2xl text-primary-foreground/60 font-heading">
                Not: <span className="italic">&ldquo;How do we use AI?&rdquo;</span>
              </p>
              <P>That question has been answered. You use AI. That is not a decision anymore.</P>
              <p className="text-body-lg text-primary-foreground/80">The question is:</p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-primary-foreground leading-tight">
                As AI does more, what does your organization get measurably better at doing as&nbsp;humans?
              </p>
              <P>
                If you do not have a clear, specific answer to that, you do not have a strategy. You have a cost-cutting plan with a technology upgrade attached to it.
              </P>
              <P>In 2026, that is not enough.</P>
            </div>

            {/* Wide pull quote */}
            <div className="my-12 md:my-20 py-12 md:py-16 border-y border-accent/30 text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl italic font-heading font-semibold text-primary-foreground/90 leading-snug max-w-3xl mx-auto">
                &ldquo;The organizations that chose humanity alongside technology are not just feeling good about their choices. They are outperforming.&rdquo;
              </p>
            </div>

            <H2>What Brand Humanizing means in 2026</H2>
            <P>The framework has not changed. The world has made it more urgent.</P>
            <P>
              The Brand Humanizing Pyramid still starts at the foundation: a clear map of where technology belongs in your organization and where humans belong. The four skills still matter: knowing what to automate, being creative with the space that creates, understanding human behavior, and caring enough to do right by people.
            </P>
            <P>
              What is different in 2026 is that the cost of ignoring this is now visible. Measurable. Legally enforced in some cases. And the evidence that getting it right is a sustainable competitive advantage is no longer theoretical.
            </P>
            <P>
              87.5% of decision-makers believed in 2020 that humans still had a critical place in organizations.<Cite n={1} />
            </P>
            <P>They were right. What they underestimated was how much work it takes to make that place real.</P>
            <P>That work has a name.</P>

            {/* Closing */}
            <div className="text-center py-16 md:py-28 border-t border-primary-foreground/10 mt-16">
              <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary-foreground">
                Brand Humanizing.
              </p>
              <p className="text-body-lg text-primary-foreground/50 mt-2 font-heading">Since 2017.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 print:hidden">
                <Link href="/contact">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                    Talk to Ferry about what this means for your organization
                  </Button>
                </Link>
                <Link href="/research">
                  <Button
                    variant="ghost"
                    className="rounded-full text-primary-foreground/70 hover:text-primary-foreground font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto"
                  >
                    Read our research archive →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sources */}
            <div className="border-t border-primary-foreground/10 mt-8 pt-12 md:pt-16">
              <h2 className="font-heading font-bold text-xl md:text-2xl text-primary-foreground/70 mb-3">
                Sources and methodology
              </h2>
              <p className="text-sm text-primary-foreground/40 mb-10">
                Every claim in this report is sourced. Here is the full citation trail.
              </p>
              <ol className="space-y-8 list-none">
                {[
                  {
                    id: 1,
                    label: "87.5% of decision-makers said there would always be a place for human labor",
                    body: "Brand Humanizing Institute, The State of Human 2020. Authors: Ferry Hoes, Jonathan Flores, Iman Hilti, Julia Reijnen, Öznur Kaya. Online survey of 104 decision-makers, collected Nov–Dec 2019 via LinkedIn. Respondents across Europe (84.6%), United States (6.7%), United Kingdom (4.8%), Asia (2.9%), Australia (1.0%). 74% held an academic degree.",
                    href: "https://brandhumanizing.com/research/",
                    hrefLabel: "brandhumanizing.com/research ↗",
                  },
                  {
                    id: 2,
                    label: "104 decision-makers across five regions",
                    body: 'Same source as [1]. The original data lists Europe, North America, the United Kingdom, Asia, and Australia as separate regions. "Five continents" is a simplification; "five regions across the globe" is more precise.',
                  },
                  {
                    id: 3,
                    label: "63% of workers expect AI to make the workplace feel less human in 2026",
                    body: "Resume Now, AI and Workplace Humanity Report, March 16, 2026. Survey of 1,003 employed U.S. adults, conducted via Pollfish in October 2025.",
                    href: "https://www.prnewswire.com/news-releases/63-of-workers-say-ai-will-make-the-workplace-feel-less-human-in-2026-302713735.html",
                    hrefLabel: "prnewswire.com ↗",
                  },
                  {
                    id: 4,
                    label: "Over 90% of enterprises face critical skills shortages; $5.5T at risk",
                    body: "IDC, Enterprise Resilience: IT Skilling Strategies (Doc #US52080524, May 2024) and FutureScape: Worldwide Future of Work 2026 Predictions (January 2026). Survey of 811 enterprise IT leaders in the U.S. and Canada. The $5.5T figure covers product delays, impaired competitiveness, and lost business.",
                    href: "https://www.businesswire.com/news/home/20240514939927/en/",
                    hrefLabel: "businesswire.com ↗",
                  },
                  {
                    id: 5,
                    label: "57% identify AI reducing human capabilities as the leading workforce issue",
                    body: "Same source as [3]. Resume Now AI and Workplace Humanity Report (2026). \"57% say AI reducing human skills will be the biggest workforce issue in 2026, ranking above job displacement (49%).\"",
                  },
                  {
                    id: 6,
                    label: "EU AI Act enforcement, August 2, 2026",
                    body: "European Commission, official EU AI Act page. \"The AI Act entered into force on 1 August 2024, and will be fully applicable 2 years later on 2 August 2026.\" The EU's Digital Omnibus proposal (November 2025) may extend certain high-risk system deadlines; the backstop date is December 2027.",
                    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
                    hrefLabel: "digital-strategy.ec.europa.eu ↗",
                  },
                ].map((s) => (
                  <li key={s.id} id={`source-${s.id}`} className="scroll-mt-20">
                    <span className="text-sm font-heading font-bold text-primary-foreground/60">[{s.id}]&ensp;</span>
                    <span className="text-sm font-semibold text-primary-foreground/80">{s.label}</span>
                    <p className="text-sm text-primary-foreground/40 mt-1.5 leading-relaxed">{s.body}</p>
                    {s.href && (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline mt-1 inline-block"
                      >
                        {s.hrefLabel}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-12 pt-8 border-t border-primary-foreground/5">
                <h3 className="font-heading font-semibold text-sm text-primary-foreground/50 uppercase tracking-wider mb-3">
                  Note on methodology
                </h3>
                <p className="text-sm text-primary-foreground/40 leading-relaxed">
                  The Brand Humanizing Institute&apos;s own 2020 research (sources 1 and 2) is self-published, independent research with a described methodology (n=104, invite-only via LinkedIn). Third-party sources include IDC enterprise research and a Resume Now survey of U.S. workers. Where data originates from commercial publishers, we note the scope and methodology. Regulatory citations reference official EU Commission documents.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
