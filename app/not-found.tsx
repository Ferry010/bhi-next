import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center text-center px-6">
      <p className="text-7xl mb-6">🤔</p>
      <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-4">
        Page not found
      </h1>
      <p className="text-body-lg text-muted-foreground max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist, but a human does. Let us help you find what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base">
            Go home
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-heading font-semibold px-8 h-12 text-base">
            Talk to a human
          </Button>
        </Link>
      </div>
    </div>
  );
}
