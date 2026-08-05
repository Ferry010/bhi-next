import Link from "next/link";

// The Impact Gap runs on its own chrome rather than the site navigation.
//
// One page, one action. A leader who lands here should have exactly two things
// they can do: start the test, or go to the homepage. Every extra link is a way
// out of a flow that only works if it is finished. The site Navbar and Footer
// are left completely untouched and simply are not used here.

export function ToolHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container flex h-14 items-center md:h-20">
        <Link
          href="/"
          aria-label="Brand Humanizing Institute, back to the homepage"
          className="relative translate-y-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:translate-y-5"
        >
          <img
            src="/assets/logo.png"
            alt="Brand Humanizing Institute"
            className="h-14 w-14 -rotate-2 rounded-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:rotate-0 md:h-20 md:w-20"
          />
        </Link>
      </div>
    </header>
  );
}

export function ToolFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>The Impact Gap, from the Brand Humanizing Institute.</p>
        <Link
          href="/privacy"
          className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
        >
          How we handle your data
        </Link>
      </div>
    </footer>
  );
}
