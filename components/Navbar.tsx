"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropdownItem {
  label: string;
  to: string;
  badge?: string;
}

interface NavItem {
  label: string;
  to: string;
  children?: DropdownItem[];
  footerLink?: { label: string; to: string };
}

const navLinks: NavItem[] = [
  { label: "The Method", to: "/the-method" },
  {
    label: "Learning",
    to: "/learning",
    children: [
      { label: "Inspiration Session", to: "/learning/inspiration-session" },
      { label: "Full-Day Course", to: "/learning/full-day-course" },
      { label: "Multi-Day Programme", to: "/learning/multi-day-programme" },
      { label: "Online Course", to: "/learning/online-course", badge: "Coming soon" },
      { label: "AI Literacy Certificate", to: "/learning/ai-literacy-certificate", badge: "Via AIGA" },
    ],
    footerLink: { label: "See all learning options →", to: "/learning" },
  },
  {
    label: "Work With Us",
    to: "/work-with-us",
    children: [
      { label: "Inspiration Session", to: "/work-with-us/inspiration-session" },
      { label: "The Audit & Brainstorm", to: "/work-with-us/audit-and-brainstorm" },
      { label: "Brand Humanizing Roadmap", to: "/work-with-us/brand-humanizing-roadmap" },
      { label: "Organisation-Wide Implementation", to: "/work-with-us/organisation-wide-implementation" },
      { label: "The Handover", to: "/work-with-us/handover" },
    ],
    footerLink: { label: "See the full journey →", to: "/work-with-us" },
  },
  { label: "Research", to: "/research" },
  { label: "Media", to: "/media" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Our Story", to: "/our-story" },
      { label: "The Book", to: "/book" },
      { label: "Podcast", to: "/podcast" },
    ],
  },
  { label: "Book", to: "/book" },
];

export default function Navbar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const linkClass = `relative px-3 py-2 text-sm font-medium transition-colors after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    variant === "dark" && !scrolled
      ? "text-primary-foreground/80 hover:text-primary-foreground"
      : "text-foreground/80 hover:text-foreground"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14 md:h-20">
        <Link href="/" className="relative translate-y-4 md:translate-y-5">
          <img
            src="/assets/logo.png"
            alt="Brand Humanizing Institute"
            className="w-14 h-14 md:w-20 md:h-20 rounded-xl -rotate-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:rotate-0 transition-transform duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) =>
            l.children ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(l.label)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="inline-flex items-center">
                  <Link href={l.to} className={`${linkClass} pr-0`} onClick={() => setOpenDropdown(null)}>
                    {l.label}
                  </Link>
                  <button
                    className={`p-1 ${variant === "dark" && !scrolled ? "text-primary-foreground/60 hover:text-primary-foreground" : "text-foreground/60 hover:text-foreground"}`}
                    onClick={() => setOpenDropdown(openDropdown === l.label ? null : l.label)}
                    aria-label={`Toggle ${l.label} menu`}
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === l.label ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {openDropdown === l.label && (
                  <div className="absolute top-full left-0 mt-1 bg-card rounded-xl shadow-[0_8px_30px_rgba(18,21,46,0.12)] border border-border/50 py-2 min-w-[240px] animate-fade-in-up">
                    {l.children.map((child) => (
                      <Link
                        key={child.to}
                        href={child.to}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {child.label}
                        {child.badge && (
                          <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full px-2 py-0.5">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                    {l.footerLink && (
                      <>
                        <div className="border-t border-border/50 my-1" />
                        <Link
                          href={l.footerLink.to}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-heading font-semibold text-accent hover:text-accent/80 transition-colors"
                        >
                          {l.footerLink.label}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.to} href={l.to} className={linkClass}>
                {l.label}
              </Link>
            )
          )}
          <Link href="/contact">
            <Button className="ml-2 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-6">
              Book a session
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 ${variant === "dark" && !scrolled ? "text-primary-foreground" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in-up max-h-[80vh] overflow-y-auto">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((l) =>
              l.children ? (
                <div key={l.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === l.label ? null : l.label)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    {l.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === l.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === l.label && (
                    <div className="pl-6">
                      <Link
                        href={l.to}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                        className="block px-4 py-2 text-sm font-heading font-semibold text-accent"
                      >
                        View all {l.label.toLowerCase()} →
                      </Link>
                      {l.children.map((child) => (
                        <Link
                          key={child.to}
                          href={child.to}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                          className="flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                        >
                          {child.label}
                          {child.badge && <span className="text-[10px] font-heading font-semibold text-accent">{child.badge}</span>}
                        </Link>
                      ))}
                      {l.footerLink && (
                        <Link
                          href={l.footerLink.to}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                          className="block px-4 py-2 text-sm font-heading font-semibold text-accent"
                        >
                          {l.footerLink.label}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <Button className="mt-1 w-full rounded-full bg-accent text-accent-foreground font-heading font-semibold">
                Book a session
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
