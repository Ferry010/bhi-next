"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    <section ref={ref} className="bg-[#0F1117] py-20 md:py-28">
      <div className="container max-w-5xl">
        <div
          className={`${transitionBase} ${isVisible ? visible : hidden} flex flex-col gap-y-6 md:gap-y-8`}
        >
          {/* Row 1: 6 logos */}
          <div className="grid grid-cols-6 gap-x-8 md:gap-x-12">
            {logos.slice(0, 6).map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-12 md:h-[60px] w-auto brightness-0 invert opacity-[0.45] object-contain"
                />
              </div>
            ))}
          </div>
          {/* Row 2: 6 logos */}
          <div className="grid grid-cols-6 gap-x-8 md:gap-x-12">
            {logos.slice(6).map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-12 md:h-[60px] w-auto brightness-0 invert opacity-[0.45] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <p
          className={`${transitionBase} ${isVisible ? visible : hidden} text-white text-lg md:text-xl text-center max-w-2xl mx-auto mt-16 md:mt-20 font-body leading-relaxed`}
          style={{ transitionDelay: "200ms" }}
        >
          We help organisations use technology to become more human.
          <br className="hidden md:block" />
          {" "}Through keynotes, training, and strategic guidance.
        </p>

        <div
          className={`${transitionBase} ${isVisible ? visible : hidden} mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4`}
          style={{ transitionDelay: "400ms" }}
        >
          <Link
            href="/contact"
            className="rounded-full bg-[#5AA6B2] text-white px-8 py-3 font-medium text-sm md:text-base transition-colors duration-300 hover:bg-[#C9A96E]"
          >
            Book a keynote
          </Link>
          <Link
            href="/the-method"
            className="rounded-full border border-[#5AA6B2] text-[#5AA6B2] px-8 py-3 font-medium text-sm md:text-base transition-colors duration-300 hover:bg-[#5AA6B2]/10"
          >
            Explore our approach
          </Link>
        </div>
        <p
          className={`${transitionBase} ${isVisible ? visible : hidden} text-[#666] text-xs md:text-sm text-center mt-6 italic`}
          style={{ transitionDelay: "400ms" }}
        >
          Most clients start with a keynote. Some never stop.
        </p>
      </div>
    </section>
  );
}
