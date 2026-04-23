// Blog content comes from our own Tiptap admin editor and is trusted.
// Strip any tags not in the allowlist as a basic server-safe pass.
const ALLOWED_TAGS = new Set([
  "p","h1","h2","h3","h4","h5","h6","blockquote","strong","em","b","i",
  "u","s","a","ul","ol","li","br","hr","img","figure","figcaption","code","pre",
]);

const FORBIDDEN_TAGS_RE = /<\/?(?!(?:p|h[1-6]|blockquote|strong|em|b|i|u|s|a|ul|ol|li|br|hr|img|figure|figcaption|code|pre)\b)[a-z][^>]*>/gi;
const FORBIDDEN_ATTRS_RE = /\s(?:style|on\w+)="[^"]*"/gi;

export function sanitizeBlogHtml(html: string): string {
  return html
    .replace(FORBIDDEN_TAGS_RE, "")
    .replace(FORBIDDEN_ATTRS_RE, "");
}
