/**
 * Takes 1200×630 screenshots of every live page and saves them as the
 * Open Graph images in public/og/. Run from the project root:
 *
 *   npm install playwright   # one-time, local only — not in package.json
 *   npx playwright install chromium
 *   node scripts/og-screenshots.mjs
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OG_DIR = join(__dirname, '..', 'public', 'og');
const SITE = 'https://brandhumanizing.com';
const W = 1200, H = 630;

/** page path → output filename(s) */
const PAGES = [
  { path: '/',                                                file: 'home.jpg' },
  { path: '/about',                                          file: 'about.jpg' },
  { path: '/assessment',                                     file: 'assessment.jpg' },
  { path: '/blog',                                           file: 'blog.jpg' },
  { path: '/book',                                           file: 'book.jpg' },
  { path: '/book/english-edition',                           file: 'book-english.jpg' },
  { path: '/contact',                                        file: 'contact.jpg' },
  { path: '/glossary',                                       file: 'glossary.jpg' },
  { path: '/humantouch',                                     file: 'human-touch.jpg' },
  { path: '/learning',                                       file: 'learning.jpg' },
  { path: '/learning/full-day-course',                       file: 'full-day-course.jpg' },
  { path: '/learning/half-day-deep-dive',                    file: 'half-day-workshop.jpg' },
  { path: '/learning/inspiration-session',                   file: 'inspiration-session.jpg' },
  { path: '/learning/multi-day-programme',                   file: 'multi-day-programme.jpg' },
  { path: '/media',                                          file: 'media.jpg' },
  { path: '/our-story',                                      file: 'our-story.jpg' },
  { path: '/podcast',                                        file: 'podcast.jpg' },
  { path: '/pricing',                                        file: 'pricing.jpg' },
  { path: '/research',                                       file: 'research.jpg' },
  { path: '/research/state-of-brand-humanizing-2026',        file: 'state-of-brand-humanizing-2026.jpg' },
  { path: '/research/state-of-human-2020',                   file: 'state-of-human-2020.jpg' },
  { path: '/research/towards-a-human-technology-fit',        file: 'towards-human-technology-fit.jpg' },
  { path: '/the-method',                                     file: 'the-method.jpg' },
  { path: '/what-is-brand-humanizing',                       file: 'what-is-brand-humanizing.jpg' },
  { path: '/work-with-us',                                   file: 'work-with-us.jpg' },
  { path: '/work-with-us/audit-and-brainstorm',              file: 'audit-brainstorm.jpg' },
  { path: '/work-with-us/brand-humanizing-roadmap',          file: 'brand-humanizing-roadmap.jpg' },
  { path: '/work-with-us/handover',                          file: 'handover.jpg' },
  { path: '/work-with-us/organisation-wide-implementation',  file: 'organisation-wide.jpg' },
];

if (!existsSync(OG_DIR)) mkdirSync(OG_DIR, { recursive: true });

async function shoot(page, entry) {
  const url = SITE + entry.path;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // Dismiss cookie banner if visible
    const cookieBtn = page.getByRole('button', { name: /accept|agree|ok|got it/i });
    if (await cookieBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await cookieBtn.click();
    }

    // Let paint + any entrance animations settle
    await page.waitForTimeout(800);

    await page.screenshot({
      path: join(OG_DIR, entry.file),
      type: 'jpeg',
      quality: 92,
      clip: { x: 0, y: 0, width: W, height: H },
    });

    console.log(`  ✓  ${entry.path} → ${entry.file}`);
  } catch (err) {
    console.error(`  ✗  ${entry.path}: ${err.message}`);
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

// Hide scrollbar so it doesn't appear in the crop
await page.addInitScript(() => {
  const s = document.createElement('style');
  s.textContent = '::-webkit-scrollbar{display:none}*{scrollbar-width:none}';
  document.head?.appendChild(s);
});

console.log(`Screenshotting ${PAGES.length} pages on ${SITE}...\n`);
for (const entry of PAGES) {
  await shoot(page, entry);
}

await browser.close();
console.log('\nDone. Commit the updated public/og/ folder.');
