Layout Sweep Report

What I changed

- Harmonized layout tokens:
  - `--layout-max-width` and `--bp-wide` set to 1200px in `styles/_tokens.css`.
  - `--cases-row-width` left at 1140px; `--case-hero-width` left at 570px.

- Converted component fixed widths to responsive patterns (max-width + width:100%) for safer, semantic layout responsibility. Files edited:
  - styles/style.css
  - styles/_tokens.css
  - styles/components/case.css
  - styles/components/case-yampi.css
  - styles/components/case-component.css
  - styles/components/work.css
  - styles/components/footer.css
  - styles/components/contact-button.css

- Specific conversions / highlights:
  - `.case-row` converted to grid with `grid-template-columns: 1fr minmax(0, var(--case-hero-width))` in `case.css`.
  - Contact buttons now fluid: `.contact-buttons .contact-button { width:100%; max-width:360px; --cb-bar-width:100%; }`
  - Banner/hero and case hero images use `max-width` + `width:100%` + `height:auto`.
  - Utility widths (`.w-80`, `.w-96`) changed to `max-width` + `width:100%`.

Exceptions (manual review required)

- Iframes and embedded players:
  - `styles/components/case-yampi.css`: `.prototype-container iframe` retains `width:800px; height:450px;` (mobile fallback) and `max-width:1100px` for desktop; left as-is.

- Icon/badge sizes kept fixed intentionally:
  - `styles/components/work.css`: badge images remain `80px`.
  - Multiple icons (40px, 64px) kept as fixed sizes.

- Artistic/visual blocks that use aspect-ratio or absolute positioning were adjusted conservatively (converted to max-width where safe). These may need design QA:
  - `case-yampi` solution/insights/results blocks with full-bleed behavior and large rounded corners.

QA checklist (manual)

- Open these pages in a browser and check breakpoints: desktop (>=1440), wide (1200), tablet (1000/900), mobile (700/375):
  - `index.html`
  - `case-yampi.html`
  - `case-atlas.html`
  - `case-mercadopago.html`
  - `experiencia.html`
  - Footer on multiple pages

- Verify these areas specifically:
  - Hero/banner image composition (no cropping or overflow)
  - Case hero alignment and text column width
  - Contact buttons sizing and spacing in forms/sidebars
  - Work cards on case pages (cards should stack on small screens)
  - Any full-bleed sections that use `width:100vw` measurements

How to run locally

- Start local dev server (works with existing package.json):

```bash
# from project root
npm install
npm run dev
```

- Open pages above in browser and test breakpoints.

Notes and recommendations

- Tokens: if you want a narrower site grid, set `--layout-max-width` to 1200px (done) or another canonical value.
- Visual exceptions should be reviewed by designer — especially the Yampi case where decorative shapes and full-bleed sections are sensitive to small shifts.
- If you want I can prepare a patch/PR with these edits and a single commit message.

Status

- Sweep: completed for safely-automatable rules.
- Exceptions report: included above.
- Next: open pages in a browser for QA (I can prepare a PR if you want).

Generated on: 2025-12-17
