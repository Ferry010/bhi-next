"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  {
    title: "Programming, Automation and AI",
    desc: "Knowing which work a computer can do better, faster and cheaper. And having the guts to actually hand it over. You don't need to learn to code. You just need to know enough about technology to make smart choices.",
  },
  {
    title: "Creativity and Organizational Awareness",
    desc: "When computers take over work, you get time back. That time is only worth something if you fill it with something better. Creativity means knowing your company well enough to imagine what it could become.",
  },
  {
    title: "Human Sciences and Research",
    desc: "Your customers are not numbers. They are people, with lives, worries, families and needs that change. To understand them, numbers alone are not enough. This skill keeps all the others real.",
  },
  {
    title: "Emotional Intelligence and Ethics",
    desc: "The skill that stops this from becoming just another way to cut costs. Doing the right thing doesn't hold good business back. It is what good business is built on. Without it, the rest falls apart.",
  },
];

export default function FourSkillsSpotlight() {
  const [activeSkills, setActiveSkills] = useState<boolean[]>([false, false, false, false]);
  const [showCenter, setShowCenter] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.05);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSkills((prev) => {
              const next = [...prev];
              next[i] = true;
              if (next.every(Boolean)) {
                setTimeout(() => setShowCenter(true), 400);
              }
              return next;
            });
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="bg-cream section-padding" ref={sectionRef}>
      <div className="container max-w-5xl">
        <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-display md:text-display-lg text-foreground mb-4">The four skills technology can&apos;t replace.</h2>
          <p className="text-body-lg text-muted-foreground mb-16 max-w-2xl">Master these four together and your team becomes something no competitor can download. Miss one and the whole thing wobbles. Here&apos;s what to build.</p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {skills.map((skill, i) => {
              const isActive = activeSkills[i];
              return (
                <div
                  key={skill.title}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`relative rounded-2xl p-8 transition-all duration-700 ${
                    isActive
                      ? "bg-white shadow-[0_4px_24px_rgba(18,21,46,0.08)] opacity-100"
                      : "bg-white/50 shadow-sm opacity-30 grayscale"
                  }`}
                >
                  <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-3">{skill.title}</h3>
                  <p className={`text-sm leading-relaxed transition-all duration-500 ${isActive ? "text-muted-foreground max-h-96" : "text-muted-foreground/50 max-h-20 overflow-hidden"}`}>
                    {skill.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${
              showCenter ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="bg-navy/90 backdrop-blur-sm border-2 border-sunny rounded-2xl px-6 py-4 shadow-[0_0_40px_hsl(44_100%_50%/0.3)]">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg text-sunny">Brand Humanizer</span>
              </div>
              <p className="text-xs text-white/60 mt-1">The intersection of all four skills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
