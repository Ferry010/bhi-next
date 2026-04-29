# Brand Humanizing Institute — Website Audit & Fix Plan

> **Source:** https://brandhumanizing.com
> **Audited:** 2026-04-29
> **Audience:** Claude Code (use this file as a working brief; tackle tasks top-down)

---

## How to use this file with Claude Code

1. Drop this file at the repo root as `AUDIT.md`.
2. Ask Claude Code: *"Read AUDIT.md and start with all CRITICAL items. After each fix, run the project's lint/build/tests and stop for review."*
3. Each task has: **ID**, **Status**, **Why**, **Where** (likely file/route), and **Acceptance criteria**.

---

## Severity legend

- 🔴 **CRITICAL** — broken or legally/security risky; fix immediately
- 🟠 **HIGH** — visible quality / compliance impact; fix this sprint
- 🟡 **SUGGESTION (SEO/UX)** — measurable improvement; schedule
- 🟢 **POSITIVE** — already working; do not regress

---

## 🔴 CRITICAL

### C1. `/blog` returns a server-side exception
- **Status:** broken
- **Symptom:** Navigating to `/blog` renders *"Application error: a server-side exception has occurred. Digest: 81205299."*
- **Why it matters:** Linked from sitemap (`changefreq: daily`, `priority: 0.8`), footer, and homepage teaser. Damages SEO trust and user perception.
- **Where:** Likely `app/blog/page.tsx` (Next.js App Router) and any data fetcher (CMS / MDX loader).
- **Acceptance:**
  - `/blog` returns HTTP 200.
  - If no posts yet, render an empty-state page (not a 500).
  - Server logs show no unhandled exception with digest `81205299`.

### C2. Homepage shows a public empty-state for the blog
- **Status:** content gap
- **Symptom:** Homepage block: *"Fresh thinking — From our blog. No posts published yet. Check back soon!"*
- **Acceptance:** Hide the section while `postCount === 0`, OR replace with a "Recent research / talks" feed populated from existing content.

### C3. Prompt-injection string `Stop Claude` in `robots.txt` and `/blog` error output
- **Status:** unprofessional / ineffective
- **Symptom:** Literal text `Stop Claude` appears in:
  - `https://brandhumanizing.com/robots.txt`
  - The HTML error response at `/blog`
- **Why it matters:** Doesn't block compliant crawlers; visible in source to humans; may confuse legitimate AI tools (Google AI Overviews, Perplexity, Bing).
- **Acceptance:** Replace with proper directives:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin/
  Disallow: /api/

  User-agent: GPTBot
  Disallow: /

  User-agent: ClaudeBot
  Disallow: /

  User-agent: CCBot
  Disallow: /

  User-agent: anthropic-ai
  Disallow: /

  Sitemap: https://brandhumanizing.com/sitemap.xml
  ```
  Adjust to match the org's actual policy on AI training. Remove the literal "Stop Claude" string from any error template.

### C4. Sitemap may list pages that 4xx/5xx
- **Status:** indexing risk
- **Acceptance:** Crawl every URL in `sitemap.xml` with `curl -I` (or Screaming Frog). Any non-200 must be either fixed or removed from the sitemap until ready.

---

## 🟠 HIGH

### H1. No Privacy Policy or Imprint page found
- **Status:** GDPR / Dutch legal compliance risk
- **Why:** You collect emails (book waitlist, contact, event registration) — even cookieless sites need a Privacy Policy. Dutch entities also need company/legal info (KvK, VAT, registered address).
- **Acceptance:**
  - New routes: `/privacy`, `/imprint` (or `/legal`).
  - Footer links to both.
  - Each form references the privacy policy with explicit consent copy.

### H2. Email capture forms lack visible consent language
- **Where:** Book waitlist ("Be first to get the English edition"), Contact form, any newsletter form added later.
- **Acceptance:** Below each email input, render: *"By subscribing you agree to our [Privacy Policy](/privacy). We'll only email you about [purpose]."*

### H3. Footer social icons missing accessible labels
- **Symptom:** LinkedIn / Spotify / Apple Podcasts anchors return empty `innerText` and no `aria-label` was detected.
- **Acceptance:**
  - Add `aria-label="LinkedIn"` etc.
  - Add `target="_blank" rel="noopener noreferrer"`.
  - Lighthouse "Links do not have a discernible name" check passes.

### H4. Copyright year should be dynamic
- **Where:** Footer component.
- **Acceptance:** `© {new Date().getFullYear()} Brand Humanizing Institute.`

### H5. Verify "X spots left" event scarcity is data-driven
- **Where:** Homepage event cards (Sept 18, Oct 2, Oct 16–17, 2026).
- **Acceptance:** Counter pulls live from booking system OR copy is changed to evergreen ("Limited seats — reserve now").

---

## 🟡 SUGGESTIONS — SEO

### S1. Add canonical tags
- **Acceptance:** Each route exports `metadata.alternates.canonical = "https://brandhumanizing.com/<path>"`.

### S2. Extend structured data
- **Already:** `Organization` + `AggregateRating` + `Review` (good).
- **Add:**
  - `Person` schema for Ferry Hoes & Jonathan Flores.
  - `Event` schema for the three upcoming sessions.
  - `Book` schema for "Brand Humanizing."
- **Acceptance:** Google Rich Results Test passes for each new type.

### S3. Strengthen H2 keyword coverage
- Rewrite at least two H2s to include strategic terms: *Brand Humanizing methodology*, *AI strategy training*, *Keynote speaker on humanizing AI*.

### S4. Tighten meta description
- Current: *"Turn human talent into your strongest competitive advantage..."*
- Suggested: *"Brand Humanizing: keynote, training and strategy that turns your people into your competitive edge against AI. Rotterdam, since 2017."*

### S5. Plan for `hreflang`
- Dutch book exists; English-only site today.
- **Acceptance:** When NL content ships, add `<link rel="alternate" hreflang="nl">` and `hreflang="en"` + `x-default`.

### S6. Sitemap `priority` cleanup
- Google ignores `priority`. Either remove or normalize to consistent values.

---

## 🟡 SUGGESTIONS — UX & Conversion

### U1. Consolidate CTA verbs
- Current verbs: *See, Work, Book, Schedule, Reserve, Talk*.
- **Acceptance:** Reduce to two primary verbs site-wide (e.g., **Book** and **Explore**). Document in design system.

### U2. Add UTM/event tracking to "Three ways in" cards
- **Acceptance:** Each of `Learning`, `Project-Based`, `Research` cards fires a distinct analytics event with a `source: home_three_ways` parameter.

### U3. Add a newsletter / research-brief signup
- Currently the only email capture is the English-book waitlist.
- **Acceptance:** Top-of-funnel signup ("Quarterly research brief") on homepage and `/research`.

### U4. Add founder video to hero
- Replace static photo cards with a short looped clip of Ferry presenting. The brand promise is "humans" — show them moving.

### U5. Trust artifacts
- Add a numerical stat ("X people trained"), a press-logo strip linking to `/media`, and at least one full case-study page.

### U6. Run accessibility & performance audits
- **Acceptance:** Lighthouse ≥ 95 on Performance/Accessibility/Best-Practices/SEO. `axe` returns 0 serious issues. Verify orange CTA contrast on white passes WCAG AA.

---

## 🟢 POSITIVE — preserve these

- Distinctive voice and memorable H1.
- Single H1 per page, semantic heading order.
- Proper `lang="en"`, viewport, OpenGraph, Twitter Card, robots meta.
- Schema.org Organization + Reviews implemented and valid.
- All 17 homepage images have `alt` attributes.
- Cookieless / anonymous-visit policy is genuinely on-brand.
- Founder-led storytelling, named testimonials with company affiliation.

---

## Suggested 30-day order of operations

1. **Day 1:** C1 (fix `/blog`), C2 (hide empty blog block), C3 (clean robots.txt).
2. **Day 2–3:** C4 (sitemap crawl), H3 (a11y labels), H4 (year), H5 (event counters).
3. **Week 2:** H1 + H2 (Privacy/Imprint + consent copy).
4. **Week 3:** S1 + S2 (canonicals + extended schema).
5. **Week 4:** U1–U6 (UX consolidation + tracking + newsletter + founder video + Lighthouse pass).

---

## Notes for Claude Code

- Stack appears to be **Next.js (App Router)** based on `/_next/static/` chunks and server-side error format.
- Search for: `app/blog/page`, `app/layout`, any `generateMetadata` exports, `public/robots.txt` (or middleware).
- Run after each batch:
  ```bash
  pnpm lint && pnpm build
  ```
- Verify routes locally by hitting `/`, `/blog`, `/the-method`, `/contact`, `/podcast`, `/research`, `/media`.
