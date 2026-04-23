"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6 gap-2"
    >
      <Download className="w-4 h-4" /> Download as PDF
    </Button>
  );
}
