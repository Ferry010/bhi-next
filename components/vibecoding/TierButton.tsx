"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// A pricing CTA that starts the conversational form with the group size already
// chosen. Clicking a tier is the low-friction first commitment (foot-in-the-door),
// so we skip straight to the name question. groupSize is left undefined for the
// generic "bring your team" CTAs, which start the flow at the group-size step.
export default function TierButton({
  children,
  groupSize,
  variant = "solid",
  popular = false,
}: {
  children: React.ReactNode;
  groupSize?: string;
  variant?: "solid" | "link";
  popular?: boolean;
}) {
  const start = () => {
    window.dispatchEvent(new CustomEvent("vibe:start", { detail: { groupSize } }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={start}
        className="font-heading font-semibold text-accent underline underline-offset-4 hover:text-soft-coral transition-colors"
      >
        {children}
      </button>
    );
  }

  return (
    <Button
      type="button"
      onClick={start}
      className={`w-full rounded-full btn-scale font-heading font-semibold h-12 text-base gap-2 ${
        popular
          ? "bg-accent text-accent-foreground hover:bg-soft-coral"
          : "bg-foreground text-white hover:bg-foreground/90"
      }`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Button>
  );
}
