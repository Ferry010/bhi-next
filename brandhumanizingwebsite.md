# Brand Humanizing website — working handoff

Living context for work on **brandhumanizing.com** (`/Users/ferryhoes/bhi-next`). Written to replace chat memory. Update it as things change. Today's baseline: everything below is committed and pushed to `main` (`Ferry010/bhi-next`) and live on Vercel unless flagged otherwise.

---

## 1. Stack & how work ships

- **Next.js 14 (App Router), TypeScript, Tailwind + shadcn/ui.** Deployed on Vercel from `main`. Push to `main` = deploy (a couple of minutes).
- **Supabase** for data. SQL migrations are plain `.sql` files run by hand in the Supabase SQL editor (there is no migrations runner). Three clients: browser (anon/publishable key), admin (service-role key, server only), SSR.
- **Tests:** Vitest (`npm test`). **Typecheck:** `npx tsc --noEmit`. **Build:** `npm run build`. All three are clean as of this handoff (120+ tests pass).
- Dev server: `.claude/launch.json` name `bhi-dev`, port 3000. Browser preview screenshots have been flaky all along; verify via DOM/computed-styles when a screenshot comes back blank.
- **Working style Ferry prefers:** targeted, page-by-page changes over big speculative sweeps. He reverted a whole-site rebrand once and pulled it back to "just the one thing." Confirm scope on anything broad. Ship and verify, don't over-narrate.

---

## 2. The big migration: Lovable → Ferry's own Supabase

The site was on a Lovable-managed Supabase. It now runs on **Ferry's own Supabase project**: `hwmdmwgkxcmfmcelzeok` (`https://hwmdmwgkxcmfmcelzeok.supabase.co`). Old project ref was `qkflaxgerazjhpctywwn`.

Migration package lives at `/Users/ferryhoes/Downloads/supabase-export/` (schema, data CSVs, edge functions, storage assets). Schema was applied via the concatenated `schema/00_RUN_THIS_complete_setup.sql`. Blog posts imported via generated `schema/03_blog_posts.sql`; other tables via `schema/04_remaining_data.sql`.

### Things that bit us during migration (so they don't again)
- **Grants are mandatory.** Supabase doesn't grant Data API privileges on `public` by default; `schema/02_grants.sql` must run or every query 401s despite correct RLS.
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY` must be the *publishable* key** (`sb_publishable_…` or a JWT `eyJ…`), never a `sb_secret_…` key. A secret key was once put there by mistake, compiled into the public JS bundle, and bypassed RLS site-wide. If a `NEXT_PUBLIC_*` var ever holds `sb_secret_…`, that key is compromised — rotate it in Supabase → Settings → API Keys.
- **Next.js Data Cache caches Supabase reads by URL and survives redeploys.** The blog index showed 0 posts for hours after import because an empty result was cached against that URL. Fixed in `lib/supabase/server.ts` (the SSR client forces `cache: "no-store"`). If a server-rendered list is mysteriously empty after data lands, this is why.
- **Email is dead on the new project.** The old edge functions hand off to Lovable's email service (`@lovable.dev/email-js`, `LOVABLE_API_KEY`) which only works on Lovable Cloud. The nurture cron and form-notification emails don't send. Not yet re-wired (see §8).
- **`user_roles` unique constraint** may be missing on the live table (created before full schema ran). `ON CONFLICT (user_id, role)` needs it. Fix: `alter table public.user_roles add constraint user_roles_user_id_role_key unique (user_id, role);`

### Env vars the site needs (set in Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable), `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `IMPACT_GAP_ADMIN_PASSWORD` — password for `/impact-gap/admin` (separate from the main site auth)
- `SLACK_WEBHOOK_URL` — Impact Gap notifications (optional; without it, notifications are simply off, tool still works)
- No `RESEND_*` / email vars — the Impact Gap tool has no email service by design.

---

## 3. THE IMPACT GAP TOOL (the main build) — live at /impact-gap

A free lead-gen diagnostic, entirely additive, in its own namespace: `app/impact-gap/`, `app/api/impact-gap/`, `components/impact-gap/`, `lib/impactGap/`, `supabase/impact_gap.sql` (+ `supabase/impact_gap_q4_multiple_choice.sql`). Built to leave the rest of the site untouched.

**What it does:** a leader answers 6 questions about what AI actually changed on their team; the team answers the same 6 anonymously; the report is the gap between belief and reality. Score 0–100, lower is better (it's a gap, not a grade).

### Routes
- `/impact-gap` — landing page (light, book palette, own minimal header/footer via `components/impact-gap/ToolShell.tsx`, not the site nav)
- `/impact-gap/start` — leader survey (6 questions)
- `/impact-gap/share/[code]` — **the leader's dashboard** (contact capture + share link + "Email my team" + live progress + report link). The old `/waiting/[code]` route now just redirects here.
- `/impact-gap/t/[code]` — anonymous team survey
- `/impact-gap/report/[code]` — the report (opens at 5 responses; below that, redirects to the dashboard)
- `/impact-gap/admin` + `/impact-gap/admin/[code]` — password-gated lead management (list, CSV export, aggregate research view, per-record detail with editable draft email)

### The six dimensions (weights)
D1 Adoption 10% · D2 Time freed 15% · D3 Where the time went 25% · D4 New capability 25% · D5 Deliberate reallocation 15% · D6 Human work 10%. Plus a **mechanism pair** nested in D3 that is stored and explained but never scored. Scoring lives in `lib/impactGap/scoring.ts` with unit tests.

### Key design decisions (don't undo these)
- **Anonymity is enforced by Postgres, not client code.** `impact_gap_responses` has NO select policy. Everything the browser sees comes through `security-definer` functions that refuse to return anything below the 5-response threshold. Raw rows never reach any browser, including the admin (admin reads rows server-side via service role, aggregates immediately).
- **Codes** are 10 chars from a no-ambiguous-letters alphabet (`23456789ABCDEFGHJKMNPQRSTVWXYZ` — no I/L/O/U/0/1). Test codes with I/L/O in them fail the shape check.
- **Q1 (adoption) is a slider that starts "Not set"** and does not count as answered until touched (it used to default to 50 and silently submit a number nobody chose). There's an explicit "Drag the handle…" instruction.
- **Q4 is multiple choice** (was free-text). Options: `new` (the only one that counts as a real new capability), `higher_standard`, `faster`, `nothing`. This means there is **no free text anywhere** in the tool — a stronger anonymity story. The report shows a distribution of the four answers, not verbatims.
- **No email service.** Notifications go to **Slack** (incoming webhook) when a report opens. The leader gets no automatic email; they keep their dashboard link which self-updates. The follow-up email is written and sent **by a human** (Ferry/Jonathan) from the admin draft — there is deliberately no send-path in the code. This is the whole "a person replies" proposition made structural.
- **Sharing is friction-light and email-service-free:** copy link, copy message, and **"Email my team"** (a `mailto:` that opens the leader's own email app with subject + message + team link prefilled). Team is never asked for emails, so "we never know who was invited" stays true.
- The **human-step promise**: report says a person reads it and replies within two working days.

### Notification flow
On the 5th (and each later) response, `app/api/impact-gap/respond/route.ts` calls `notifyReportReady` (`lib/impactGap/notify.ts`). It flips status `awaiting → ready` first (unconditionally, so the admin list is correct even if Slack is off), then, if `SLACK_WEBHOOK_URL` is set, claims the notification with a conditional DB update (prevents double-send) and posts to Slack; a failed post releases the claim to retry.

### SQL to run for the tool (if rebuilding the DB)
`supabase/impact_gap.sql` then `supabase/impact_gap_q4_multiple_choice.sql` (adds the `d4_capability` column and updates the report function; the free-text columns are kept but unused, so the change is reversible).

### End-to-end status: verified working on the live new DB
Survey saves, 5 responses open the report, threshold holds, privacy holds against the public key, admin auth holds (401 unauthenticated, rejects forged/expired cookies, httpOnly). `IMPACT_GAP_ADMIN_PASSWORD` and `SLACK_WEBHOOK_URL` are the only things that gate full function.

### Test rows to delete (harmless leftovers from verification; no anon delete policy so must be done in SQL)
```sql
delete from public.impact_gap_sessions
where code in ('MAKETST992','DASHFVN992','DASHMT7734','TESTRVN229','TESTZZ9QRS','RLSCHECK99');
```

---

## 4. Design system — the "book cover" palette

From Jonathan's book cover. Bold, poster-like, **light** (no dark *mode*, though dark *sections* like navy/near-black are on-brand). Tokens in `app/globals.css` `:root` + `tailwind.config.ts`:
- White background, near-black text (`--foreground` 0 0% 11% ≈ `#1c1c1c`)
- Royal blue `--primary` 214 82% 37% (`#1154ac`); brighter accent blue `#2e80ea`; `--navy` 214 82% 34%
- Red `--accent` 2 74% 52% (`#df302a`), `--soft-coral` for hovers
- Yellow `--sunny` 44 100% 50% (`#ffbb00`)
- `--cream` faint warm tint for section separation
- Fonts: Plus Jakarta Sans (heading) + Inter (body). No em-dashes anywhere. No corporate filler.

### The `/learning` page is the canonical "right format"
When converting any page to brand, match `app/learning/page.tsx`. Recipe: `<Navbar variant="light"/>` + `<main>` + `<Footer/>`; hero on `bg-secondary` with a `Breadcrumb`, `text-hero` heading with a `text-accent` (red) highlight span, muted subcopy, pill CTAs (`rounded-full bg-accent` primary + `outline border-foreground/70`); sections alternate white / `bg-cream` / one `bg-navy` moment (white text, `bg-sunny` yellow CTA); cards `bg-white rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] border border-border/50`, white-on-cream; `FAQSection variant="light"` renders `bg-cream`. **Order backgrounds so no two cream sections touch** (white-on-white reads as whitespace, cream-on-cream reads as one flat block).

### Button hover gotcha (fixed site-wide, but know it)
The default `Button` variant carries `hover:bg-primary/90` (blue). If a call site overrides the base to `bg-sunny`/`bg-accent` but sets its hover with a *filter* (`hover:brightness-95`), tailwind-merge does NOT drop the blue hover (different CSS property), so the button turned blue on hover. Fix pattern: every custom-bg button also declares a matching `hover:bg-sunny` / `hover:bg-accent`. Already applied to all ~20 call sites. If adding a new yellow/red button, include the matching `hover:bg-*`, not just brightness.

---

## 5. Pages converted / built (all on the book palette, light `/learning` format)

- **`/the-method` pyramid block** (`components/sections/PyramidScrollReveal.tsx`) — was dark purple/orange; now a light cream section with a monochrome royal-blue pyramid (deep at the foundation, brighter to the apex), red on the current layer, readable labels in both scroll states.
- **`/pricing`** — converted from the dark teal/amber palette to the learning format.
- **`/certification`** (+ `components/certification/CertificationWaitlist.tsx`) — same. Two tiers keep a cool/warm split: AI Literacy card reads blue ("Available now"), Brand Humanizer waitlist reads red (premium tier).
- **`/research/saylience`** — new page, see §6.
- Copy on the Impact Gap landing/team pages updated to reflect "no email service" and Q4-is-multiple-choice (no more "your team's own words").

### Still on the OLD teal/amber or static assets (not yet converted)
- `/no-cookies`, the admin dark theme, the `/404` arcade (intentional neon easter egg), and the Human Touch email signature — deliberately left.
- **Static OG images**: most pages still point `openGraph.images` at old `/og/*.jpg` (old palette). Converted to generated cards so far: home, `/pricing`, `/certification`, `/research/saylience`. Not yet: `/about`, `/blog`, `/contact`, `/podcast`, `/work-with-us`, `/what-is-brand-humanizing`, blog list, and the learning product pages (full-day, multi-day still reference `/og/*.jpg`). See §7.

---

## 6. Saylience — Ferry's product, showcased as "In practice" (not a storefront)

**saylience.app** is Ferry's B2B SaaS: turns interviews into sourced quotes so people who interview for a living stop losing hours to transcription. Born from his own freelance interview work; used by teams in **two countries**. Its footer already says "A Brand Humanizing Institute product."

**Decision (via the `ferry-brand-positioning` skill):** it IS a BHI-endorsed product, NOT standalone like Reslin. Reslin stays separate (zero synergy); Saylience is the opposite — it's the Brand Humanizing thesis embodied (tech takes the predictable part, humans get freed for the human part), and institutional backing helps an enterprise research SaaS look trustworthy.

**How BH shows it: as proof-in-practice, never a storefront.** BHI is an institute, not a software vendor, and Saylience sells itself on its own site. So `/research/saylience` tells the *story* and routes every commercial CTA out to saylience.app. It sits under Research (credibility bucket) with a distinct "The method, in practice" card on the Research index, kept separate from the formal studies. Ties into the Impact Gap ("our own answer to the question we ask you").

**Label it "In practice", never "Proof"** — Ferry rejected the word "proof" as user-facing framing. Strategically it functions as proof; just don't call it that on the page.

---

## 7. OG (share) images

Generated dynamically by `lib/ogImage.tsx` (`renderOgImage`) in the book palette — white ground, blue eyebrow, black headline with blue accent, yellow rule, red URL. Home + pricing + certification + saylience each have an `opengraph-image.tsx` route using it, and their metadata `openGraph.images` override was removed so the generated card is used.

**To convert a page's share card:** create `app/<page>/opengraph-image.tsx` calling `renderOgImage({ headline, accent, sub })`, and delete the `openGraph: { images: [...] }` line from that page's metadata. Remaining pages listed in §5.

**Note on caching:** social platforms (LinkedIn, Slack, WhatsApp) cache OG images hard. After a change, re-scrape via LinkedIn Post Inspector / Facebook Sharing Debugger, or the old card lingers. The live image is correct regardless.

---

## 8. Blog & admin (existing site systems, on the new DB)

- **Blog** renders from `blog_posts` (imported, 11 posts, images repointed to the new project's `blog-images` storage bucket). Live.
- **`/admin`** is the real site admin (blog editor, inbox/forms, members, settings). Auth: Supabase Auth (email+password) + `has_role(uid, 'admin')`. Gated specifically on role **`'admin'`** — `moderator` exists in the enum but grants nothing (no code checks for it).
- To grant admin: the person needs an `auth.users` account (Authentication → Users → Add user, tick **Auto Confirm User**), then:
  ```sql
  insert into public.user_roles (user_id, role)
  select id, 'admin'::public.app_role from auth.users
  where email = 'THEIR_EMAIL' on conflict (user_id, role) do nothing;
  ```
  (needs the unique constraint from §2 first). **Password resets don't work on this site** — the reset email link bounces to the homepage (there's no recovery page). Set passwords directly in the Supabase dashboard instead. Once in, `/admin/members` can invite others through the working invite flow.
- **Jonathan** (`jonathan@brandhumanizing.com`): to be made `admin`. He has an account but never signed in — confirm it and set his password in the dashboard.

---

## 9. Learning product pages — agendas & FOMO

Product pages use `components/learning/ProductPageTemplate.tsx` with data objects in `app/learning/*/page.tsx`.

- **Agendas are now real daytime schedules** (09:00 Walk-in, coffee breaks, Lunch, Close) matching each session's content — not relative `0:00/0:15` offsets.
- **Multi-Day Programme** uses the template's `agendaDays` field: one card per day (Day 1 · Alignment and the framework, etc.), each a detailed hour-by-hour schedule.
- **Online Course** keeps its "Module 1…6" list (self-paced, not a day).
- **Spark Session** (one hour): no agenda. Instead a `fomo` block ("Why not next quarter. Why now.") — the template renders `fomo` in place of an agenda.
- **Every product page** has a subtle `urgencyLine` under the hero CTA — honest cost-of-waiting nudges, **never fake scarcity**. If Ferry ever has real constraints (limited slots, a price rise), the nudges can be made concrete because they'd be true.

Template fields added: `agenda?` (now optional), `agendaDays?`, `fomo?`, `urgencyLine?`.

---

## 10. Brand ecosystem (from the `ferry-brand-positioning` skill — reload it for positioning calls)

Four+ properties, separated by job: **Ferry personal** (ferryhoes.com, credibility hub, no commerce), **BHI** (brandhumanizing.com, the institute — framework, research, advisory, training), **AIGA** (aigeletterdheid.academy, EU AI Act literacy LMS, the lead-gen tip of the spear), **Reslin** (padel apparel, fully standalone), plus AI met Spark. Rule: the brands work because they're separated; resist "integrate everything." Keynote bookings → Speakers Academy. Book sales → external retailers. Ferry's North Star: fund acquiring UD Las Palmas; optimise for compounding credibility, not short-term revenue.

---

## 11. Open loose ends / TODO
1. **Set `SLACK_WEBHOOK_URL`** in Vercel so Impact Gap report-ready notifications actually reach Ferry/Jonathan.
2. **Delete the Impact Gap test rows** (SQL in §3).
3. **Make Jonathan admin** (§8) — confirm his account + set password in dashboard, run the role insert (add the unique constraint first).
4. **Convert remaining OG images** to generated cards (§7) whenever wanted.
5. **Site-wide email is dead** (§2) — if the contact-form/assessment/nurture emails matter, re-wire `process-email-queue` to a real provider (e.g. Resend) instead of `@lovable.dev/email-js`. Separate, larger job.
6. Optional: a proper recovery page so admin password-reset emails work.
7. Optional: `navigator.share` on the Impact Gap dashboard for a native mobile share sheet (progressive enhancement on top of "Email my team").
8. Optional: convert `/no-cookies` and remaining dark surfaces if desired.
9. The **Atos → ABN AMRO logo swap** was requested then dropped ("never mind"). If revived: swap the 3 logo refs (`components/sections/ClientLogos.tsx`, `SocialProofBar.tsx`, `lib/pricing.ts` marquee), but leave the Atos *testimonial* (Laurens, Atos) untouched — it's a real attributed quote. Needs an ABN AMRO logo file first.

---

## 12. Recent commit trail (newest first)
`copy(learning): per-day multi-day schedule, subtle FOMO` · `copy(learning): real daytime agendas, FOMO for the Spark` · `fix(ui): yellow/accent buttons no longer turn blue on hover` · `feat(impact-gap): clearer slider, one-tap Email my team` · `copy(research): call it "In practice", not "Proof"` · `feat(research): Saylience in-practice page` · `feat(og): generated share cards for pricing/certification` · `redesign(pricing, certification): learning format` · `redesign(the-method): light on-brand pyramid` · `fix: stop Next caching stale Supabase reads` · `feat(impact-gap): the tool itself` (+ Q4 multiple choice, Slack notifications, dashboard).
