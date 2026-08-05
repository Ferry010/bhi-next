// CSV writing for the lead export.
//
// Organisation names, roles and leader names are free text typed by strangers,
// and the file is going to be opened in Excel or Numbers. Two things follow
// from that: every field is quoted, and anything a spreadsheet would treat as a
// formula gets a leading apostrophe so it is shown rather than executed.

/** Characters that make a spreadsheet treat a cell as a formula. */
const FORMULA_START = /^[=+\-@\t\r]/;

export function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  const safe = FORMULA_START.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function csvRow(values: unknown[]): string {
  return values.map(csvCell).join(",");
}

/** Windows line endings, because that is what spreadsheet software expects. */
export function csvDocument(header: string[], rows: unknown[][]): string {
  return [csvRow(header), ...rows.map(csvRow)].join("\r\n");
}
