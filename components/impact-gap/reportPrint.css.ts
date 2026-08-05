// Print styling for the report, scoped to the report page only.
//
// Kept as a string injected by the report rather than added to globals.css,
// because globals.css belongs to the rest of the site and this tool was built
// to leave it alone. The site's own print rules already handle colour and
// hiding chrome; these deal with the things specific to a report: keeping a
// dimension card from splitting across a page break, and making the gap bars
// survive a printer that strips backgrounds.

export const REPORT_PRINT_CSS = `
@media print {
  /* Nothing interactive survives a PDF, so it only takes up room. */
  .print-hide { display: none !important; }

  /* The whole point of the page is the comparison. Do not let a card break
     across two sheets with the leader's answer on one and the team's on the
     next. */
  .print-keep { break-inside: avoid; page-break-inside: avoid; }

  /* Browsers drop background colours when printing unless told otherwise, and
     the gap bars are backgrounds. Without this the report prints as a list of
     numbers with blank strips beside them. */
  .print-ink {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* A report that starts each section on a fresh sheet reads far better than
     one that runs continuously, and it is what people expect from a PDF. */
  .print-break-before { break-before: page; page-break-before: always; }

  /* Full width: the on-screen column is narrow for reading, which wastes half
     of an A4 sheet. */
  main .container { max-width: none !important; padding: 0 !important; }

  section { padding-top: 1rem !important; padding-bottom: 1rem !important; }

  /* Spell out where a link goes, since a printed page cannot be clicked. */
  .print-url::after {
    content: " (" attr(href) ")";
    font-size: 0.75rem;
    word-break: break-all;
  }
}
`;
