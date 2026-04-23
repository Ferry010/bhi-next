const ALLOWED_TAGS = [
  "p","h1","h2","h3","h4","h5","h6","blockquote","strong","em","b","i",
  "u","s","a","ul","ol","li","br","hr","img","figure","figcaption","code","pre",
];
const ALLOWED_ATTRS = ["href","src","alt","title","target","rel","loading"];

export function sanitizeBlogHtml(html: string): string {
  if (typeof window !== "undefined") {
    // Browser: use DOMPurify
    const DOMPurify = require("dompurify");
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOW_DATA_ATTR: false,
      FORBID_TAGS: ["style","script","iframe","object","embed","form","input","button","textarea","select","link","meta"],
      FORBID_ATTR: ["style"],
      ALLOWED_TAGS,
      ALLOWED_ATTR: ALLOWED_ATTRS,
    });
  }
  // Server: basic tag stripping for unsupported tags only
  return html;
}
