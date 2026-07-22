"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TALK_TO_EXPERT } from "@/lib/pricing";

const logos = [
  { src: "/assets/logos/atos.png", alt: "Atos" },
  { src: "/assets/logos/vodafone.png", alt: "Vodafone" },
  { src: "/assets/logos/gsk.png", alt: "GlaxoSmithKline" },
  { src: "/assets/logos/toshiba.png", alt: "Toshiba" },
  { src: "/assets/logos/ama.webp", alt: "American Marketing Association" },
  { src: "/assets/logos/ziggo.png", alt: "Ziggo" },
  { src: "/assets/logos/chubb.png", alt: "Chubb" },
  { src: "/assets/logos/asr.png", alt: "a.s.r." },
  { src: "/assets/logos/uwv.png", alt: "UWV" },
  { src: "/assets/logos/minfin.png", alt: "Ministerie van Financiën" },
  { src: "/assets/logos/eindhoven.png", alt: "Gemeente Eindhoven" },
  { src: "/assets/logos/unilever.png", alt: "Unilever" },
];

export default function SocialProofBar() {
  const { ref, isVisible } = useScrollReveal();

  const transitionBase = "transition-all duration-700";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-y border-border">
      <div className="container max-w-5xl">
        <div
          className={`${transitionBase} ${isVisible ? visible : hidden} grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-x-12 lg:gap-y-8`}
        >
          {logos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-14 md:h-12 lg:h-[60px] w-auto brightness-0 opacity-50 object-contain"
              />
            </div>
          ))}
        </div>

        <p
          className={`${transitionBase} ${isVisible ? visible : hidden} text-foreground text-lg md:text-xl text-center max-w-2xl mx-auto mt-16 md:mt-20 font-body leading-relaxed`}
          style={{ transitionDelay: "200ms" }}
        >
          50+ organisations across Europe turned automation into an edge
          <br className="hidden md:block" />
          {" "}instead of a race to the bottom. Your competitors are on this list, or they will be.
        </p>

        <div
          className={`${transitionBase} ${isVisible ? visible : hidden} mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4`}
          style={{ transitionDelay: "400ms" }}
        >
          <a
            href={TALK_TO_EXPERT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary text-primary-foreground px-8 py-3 font-medium text-sm md:text-base btn-scale transition-all duration-300"
          >
            {TALK_TO_EXPERT.label}
          </a>
          <Link
            href="/the-method"
            className="rounded-full border-2 border-primary text-primary px-8 py-3 font-medium text-sm md:text-base transition-colors duration-300 hover:bg-primary/5"
          >
            See how it works
          </Link>
        </div>
        <p
          className={`${transitionBase} ${isVisible ? visible : hidden} text-muted-foreground text-xs md:text-sm text-center mt-6 italic`}
          style={{ transitionDelay: "400ms" }}
        >
          Most clients start with a keynote. Some never stop.
        </p>
      </div>
    </section>
  );
}
