"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Lightbulb, Users, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  {
    icon: Cpu,
    title: "Programming, Automation and AI",
    desc: "Knowing which parts of your organization technology can do better, faster, and cheaper. And having the clarity and courage to actually implement it. This does not mean everyone needs to learn to code. It means your organization needs enough technical literacy to make smart decisions about automation.",
  },
  {
    icon: Lightbulb,
    title: "Creativity and Organizational Awareness",
    desc: "The empty space that automation creates is only valuable if you fill it with something better. Creativity is an organizational skill. It means understanding your business deeply enough to imagine what it could become.",
  },
  {
    icon: Users,
    title: "Human Sciences and Research",
    desc: "Your customers are not data points. They are people with lives, fears, relationships, and needs that change. Understanding them requires more than analytics. Human Sciences keeps every other skill grounded in reality.",
  },
  {
    icon: Heart,
    title: "Emotional Intelligence and Ethics",
    desc: "The skill that prevents Brand Humanizing from becoming just another efficiency play. Ethics is not a constraint on good business. It is the foundation of it. Without this skill, everything else falls apart.",
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
          <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">THE FOUR SKILLS</span>
          <h2 className="text-display md:text-display-lg text-foreground mt-4 mb-4">The skills technology cannot replace.</h2>
          <p className="text-body-lg text-muted-foreground mb-16 max-w-2xl">Brand Humanizing is not a single skill. It is a combination of four. The goal is organizational fluency: teams where all four are present.</p>
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
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${isActive ? "scale-110" : "scale-100"}`}
                    style={{ backgroundColor: isActive ? "rgba(255,107,43,0.1)" : "hsl(220, 20%, 93%)" }}
                  >
                    <skill.icon
                      className="w-7 h-7 transition-all duration-500"
                      style={{ color: isActive ? "hsl(21,100%,58%)" : "hsl(220, 20%, 60%)" }}
                    />
                  </div>
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
            <div className="bg-navy/90 backdrop-blur-sm border-2 border-accent rounded-2xl px-6 py-4 shadow-[0_0_40px_hsl(21_100%_58%/0.3)]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <span className="font-heading font-bold text-lg text-accent">Brand Humanizer</span>
              </div>
              <p className="text-xs text-white/60 mt-1">The intersection of all four skills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
