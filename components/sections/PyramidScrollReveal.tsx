"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const layers = [
  {
    label: "Human-Technology Fit",
    overline: "LAYER 1 · THE FOUNDATION",
    title: "Human-Technology Fit",
    desc: "Before any strategy is possible, your organization needs a clear, honest map. Which parts of your work does technology genuinely do better than humans? Which parts should only ever be human? This is the foundation everything else is built on.",
    why: "Without this clarity, every decision above it is guesswork.",
    color: "hsl(240, 33%, 25%)",
    activeColor: "hsl(240, 33%, 35%)",
  },
  {
    label: "Company / Employee Fit",
    overline: "LAYER 2 · CULTURE",
    title: "Company / Employee Fit",
    desc: "Your employees are your first brand. Before any customer encounters your organization, a human being inside it decided how to show up. Disengaged employees produce disengaged customer experiences.",
    why: "Culture is not a department. It is the compound effect of every human decision inside your organization.",
    color: "hsl(241, 50%, 40%)",
    activeColor: "hsl(241, 50%, 50%)",
  },
  {
    label: "Product / Market Fit",
    overline: "LAYER 3 · VALUE",
    title: "Product / Market Fit",
    desc: "You need something real. Something people genuinely want, in a form that actually works for them. This is not a startup concept. It applies at every stage of organizational growth.",
    why: "No amount of branding saves a product nobody needs.",
    color: "hsl(241, 60%, 50%)",
    activeColor: "hsl(241, 60%, 60%)",
  },
  {
    label: "Branding & Positioning",
    overline: "LAYER 4 · IDENTITY",
    title: "Branding and Positioning",
    desc: "The honest story of why your organization exists and who it genuinely serves. Human brands are built on truth, not on what the marketing department wishes were true.",
    why: "A brand that does not match reality is not a brand. It is a liability.",
    color: "hsl(21, 80%, 45%)",
    activeColor: "hsl(21, 100%, 58%)",
  },
  {
    label: "Company / Client Fit",
    overline: "LAYER 5 · RELATIONSHIPS",
    title: "Company / Client Fit",
    desc: "Not all growth is good growth. The right clients for the right organization. Brand Humanizing organizations are honest about who they serve best. And who they do not.",
    why: "Saying no to the wrong client is as important as saying yes to the right one.",
    color: "hsl(21, 90%, 52%)",
    activeColor: "hsl(21, 100%, 58%)",
  },
  {
    label: "Growth",
    overline: "LAYER 6 · THE APEX",
    title: "Growth",
    desc: "Not just financial growth. Growth in trust, reputation, and the quality of relationships. The compound effect of getting every layer below this right.",
    why: "Sustainable growth is not a goal. It is a symptom of a healthy organization.",
    color: "hsl(21, 100%, 58%)",
    activeColor: "hsl(21, 100%, 65%)",
  },
];

function MobilePyramid() {
  return (
    <div className="space-y-6">
      {layers.map((layer, i) => {
        const widthPercent = 90 - i * 10;
        return (
          <div key={layer.label}>
            <div
              className="rounded-2xl p-1 mb-3"
              style={{ background: layer.activeColor, height: "8px", width: `${widthPercent}%`, marginLeft: "auto", marginRight: "auto" }}
            />
            <div className="bg-primary-foreground/5 border border-accent/20 rounded-2xl p-6">
              <span className="text-accent text-xs font-heading font-semibold uppercase tracking-wider">{layer.overline}</span>
              <h3 className="font-heading font-bold text-lg text-primary-foreground mt-2 mb-3">{layer.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-3">{layer.desc}</p>
              <div className="bg-accent/5 border border-accent/10 rounded-xl p-3">
                <p className="text-xs text-accent/80 italic">{layer.why}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PyramidScrollReveal() {
  const isMobile = useIsMobile();
  const [activeLayer, setActiveLayer] = useState(-1);
  const [allDone, setAllDone] = useState(false);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isMobile) return;
    const observers: IntersectionObserver[] = [];

    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLayer(i);
            if (i === layers.length - 1) {
              setTimeout(() => setAllDone(true), 600);
            }
          }
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="bg-near-black text-primary-foreground section-padding" id="pyramid">
        <div className="container max-w-xl">
          <h2 className="text-display text-primary-foreground mb-3">The Brand Humanizing Pyramid</h2>
          <p className="text-body-lg text-primary-foreground/70 mb-10">Every layer depends on everything beneath it. You cannot skip ahead.</p>
          <MobilePyramid />
        </div>
      </section>
    );
  }

  const totalLayers = layers.length;
  const layerHeight = 50;
  const gap = 4;
  const baseY = 360 - totalLayers * (layerHeight + gap);
  const maxHalf = 180;
  const minHalf = 40;
  const step = (maxHalf - minHalf) / totalLayers;

  return (
    <section className="bg-near-black text-primary-foreground" id="pyramid">
      <div className="container max-w-6xl">
        <div className="py-16">
          <h2 className="text-display md:text-display-lg text-primary-foreground mb-3">The Brand Humanizing Pyramid</h2>
          <p className="text-body-lg text-primary-foreground/70 mb-4 max-w-2xl">Every layer depends on everything beneath it. You cannot skip ahead.</p>
        </div>

        <div className="relative flex gap-12" style={{ minHeight: `${layers.length * 80}vh` }}>
          <div className="w-[45%] sticky top-24 self-start h-[calc(100vh-8rem)] flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
              {layers.map((layer, i) => {
                const y = baseY + (totalLayers - 1 - i) * (layerHeight + gap);
                const halfBot = maxHalf - i * step;
                const halfTop = maxHalf - (i + 1) * step;
                const cx = 200;
                const isActive = activeLayer >= i;
                const isCurrent = activeLayer === i;
                return (
                  <g key={layer.label}>
                    <polygon
                      points={`${cx - halfTop},${y} ${cx + halfTop},${y} ${cx + halfBot},${y + layerHeight} ${cx - halfBot},${y + layerHeight}`}
                      fill={isActive ? layer.activeColor : "hsl(240, 20%, 20%)"}
                      stroke={isCurrent ? "hsl(21, 100%, 58%)" : "transparent"}
                      strokeWidth={isCurrent ? 2 : 0}
                      className="transition-all duration-500"
                      style={{ filter: isCurrent ? "drop-shadow(0 0 12px hsl(21 100% 58% / 0.4))" : "none" }}
                    />
                    <text
                      x={cx}
                      y={y + layerHeight / 2 + 5}
                      textAnchor="middle"
                      fill={isActive ? "white" : "hsl(240, 20%, 50%)"}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      className="transition-all duration-500"
                    >
                      {layer.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-[55%] space-y-[40vh] py-[30vh]">
            {layers.map((layer, i) => (
              <div
                key={layer.label}
                ref={(el) => { panelRefs.current[i] = el; }}
                className={`transition-all duration-700 ${activeLayer >= i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              >
                <span className="text-accent text-xs font-heading font-semibold uppercase tracking-wider">{layer.overline}</span>
                <h3 className="font-heading font-bold text-2xl text-primary-foreground mt-2 mb-4">{layer.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed mb-4">{layer.desc}</p>
                <div className="bg-primary-foreground/5 border border-accent/10 rounded-xl p-4">
                  <p className="text-sm text-accent/80 italic">&ldquo;{layer.why}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
