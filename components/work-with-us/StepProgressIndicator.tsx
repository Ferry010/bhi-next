import Link from "next/link";

const steps = [
  { num: 1, label: "Inspiration", to: "/work-with-us/inspiration-session" },
  { num: 2, label: "Audit & Brainstorm", to: "/work-with-us/audit-and-brainstorm" },
  { num: 3, label: "Roadmap", to: "/work-with-us/brand-humanizing-roadmap" },
  { num: 4, label: "Implementation", to: "/work-with-us/organisation-wide-implementation" },
  { num: 5, label: "Handover", to: "/work-with-us/handover" },
];

export default function StepProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex items-start justify-between min-w-[500px] max-w-3xl mx-auto px-4">
        {steps.map((step, i) => {
          const isActive = step.num === currentStep;
          const isPast = step.num < currentStep;
          return (
            <div key={step.num} className="flex items-start flex-1 last:flex-none">
              <Link href={step.to} className="flex flex-col items-center group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-[0_0_12px_rgba(255,107,43,0.3)]"
                      : isPast
                        ? "bg-accent/20 text-accent"
                        : "border-2 border-muted-foreground/30 text-muted-foreground group-hover:border-accent/50 group-hover:text-accent"
                  }`}
                >
                  {step.num}
                </div>
                <span
                  className={`mt-2 text-[10px] md:text-xs font-heading text-center leading-tight transition-colors ${
                    isActive
                      ? "font-bold text-foreground"
                      : isPast
                        ? "font-medium text-foreground/70"
                        : "text-muted-foreground group-hover:text-foreground/70"
                  }`}
                >
                  {step.label}
                </span>
              </Link>
              {i < steps.length - 1 && (
                <div className="flex-1 flex items-center pt-4 px-1">
                  <div
                    className={`h-px w-full ${
                      step.num < currentStep ? "bg-accent/40" : "bg-muted-foreground/20"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
