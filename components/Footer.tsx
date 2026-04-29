import Link from "next/link";

const navCols = [
  {
    title: "Learning",
    links: [
      { label: "Inspiration Session", to: "/learning/inspiration-session" },
      { label: "Full-Day Course", to: "/learning/full-day-course" },
      { label: "Multi-Day Programme", to: "/learning/multi-day-programme" },
      { label: "AI Literacy Certificate", to: "/learning/ai-literacy-certificate" },
      { label: "All Learning Options", to: "/learning" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { label: "Human-Technology Fit Audit", to: "/work-with-us/audit-and-brainstorm" },
      { label: "Brand Humanizing Roadmap", to: "/work-with-us/brand-humanizing-roadmap" },
      { label: "Organisation-Wide Implementation", to: "/work-with-us/organisation-wide-implementation" },
      { label: "All Projects", to: "/work-with-us" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "The Method", to: "/the-method" },
      { label: "About", to: "/about" },
      { label: "Book", to: "/book" },
      { label: "Blog", to: "/blog" },
      { label: "Podcast", to: "/podcast" },
      { label: "Research", to: "/research" },
      { label: "Media", to: "/media" },
      { label: "Contact", to: "/contact" },
      { label: "Self-Assessment", to: "/assessment" },
      { label: "Glossary", to: "/glossary" },
      { label: "Human Touch", to: "/humantouch" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-near-black text-primary-foreground/80">
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 space-y-3">
            <h3 className="font-heading font-bold text-base md:text-lg text-primary-foreground">Brand Humanizing Institute</h3>
            <p className="text-xs md:text-sm text-primary-foreground/50 leading-relaxed">
              Making brands unforgettably human since 2017.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://www.linkedin.com/company/brand-humanizing-institute" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://open.spotify.com/show/6eGkXe767cYZ5Rw627Xpgu" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors" aria-label="Spotify">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
              </a>
              <a href="https://podcasts.apple.com/nl/podcast/the-human-era-podcast/id1598552331" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors" aria-label="Apple Podcasts">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.025 2.371.075.074.15.15.221.228a.693.693 0 01-.07.975.687.687 0 01-.987-.043 7.152 7.152 0 00-.205-.212 7.019 7.019 0 00-4.984-2.015 7.019 7.019 0 00-4.983 2.015 7.018 7.018 0 00-.206.212.687.687 0 01-.986.043.693.693 0 01-.07-.975c.07-.078.145-.154.22-.228a8.387 8.387 0 016.025-2.371zm.006 2.795a5.297 5.297 0 013.757 1.547 5.297 5.297 0 011.547 3.757 5.297 5.297 0 01-1.547 3.757 5.297 5.297 0 01-3.757 1.547 5.297 5.297 0 01-3.757-1.547 5.297 5.297 0 01-1.547-3.757 5.297 5.297 0 011.547-3.757 5.297 5.297 0 013.757-1.547zm0 1.37a3.924 3.924 0 00-2.784 1.146 3.924 3.924 0 00-1.146 2.784 3.924 3.924 0 001.146 2.784 3.924 3.924 0 002.784 1.146 3.924 3.924 0 002.784-1.146 3.924 3.924 0 001.146-2.784 3.924 3.924 0 00-1.146-2.784 3.924 3.924 0 00-2.784-1.146zm0 2.058a1.691 1.691 0 110 3.382 1.691 1.691 0 010-3.382zm0 4.775c.659 0 1.304.218 1.828.618.183.14.22.402.08.585a.416.416 0 01-.585.08 2.17 2.17 0 00-1.323-.453 2.17 2.17 0 00-1.323.453.416.416 0 01-.585-.08.416.416 0 01.08-.585 3.01 3.01 0 011.828-.618zm-.007 1.555c.396 0 .737.285.737.737v4.542c0 .398-.282.737-.737.737-.396 0-.737-.282-.737-.737v-4.542c0-.396.285-.737.737-.737z" /></svg>
              </a>
            </div>
          </div>

          {navCols.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-xs md:text-sm uppercase tracking-widest text-primary-foreground/40 mb-3 md:mb-4">{col.title}</h4>
              <ul className="space-y-2 md:space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link href={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm text-primary-foreground/30">
          <p>&copy; {new Date().getFullYear()} Brand Humanizing Institute. Rotterdam, the Netherlands.</p>
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/imprint" className="hover:text-primary-foreground transition-colors">Imprint</Link>
            <span>·</span>
            <Link href="/no-cookies" className="hover:text-primary-foreground transition-colors">No-Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
