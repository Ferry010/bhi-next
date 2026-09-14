/**
 * Serialise data for a <script type="application/ld+json"> tag safely.
 *
 * JSON.stringify does not escape "<", so any string value that happens to
 * contain "</script>" (e.g. from a blog title or description stored in the DB)
 * would break out of the script tag and could inject markup. Escaping "<" to
 * its < form closes that hole while staying valid JSON-LD.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
