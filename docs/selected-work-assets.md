# Selected Work assets

Website and admin captures live in `public/work/`. The identity carousel uses the individual 1200 × 1200 WebP files in `public/logo/`. `lib/selectedWorkAssets.ts` resolves the four lead marks and the work captures; `WorkLogosSection.tsx` lists the remaining carousel marks in display order.

| Asset | Use |
| --- | --- |
| `public/work/sites/odyssea-home.webp`, `odyssea-stories.webp` | Odyssea public case |
| `public/work/sites/atelier-home.webp`, `atelier-detail.webp` | Motorcycle workshop case |
| `public/work/sites/aube-home.webp`, `aube-detail.webp` | Aube Coffee case |
| `public/work/software/odyssea-admin-dashboard.webp` | Large Systems image |
| `public/work/software/odyssea-admin-stories.webp` | Stories management detail |
| `public/work/software/odyssea-admin-portfolio.webp` | Portfolio management detail |

The carousel order is Terra Sculptura, Aube Coffee, Nomad, Odyssea Vision, Relais, La Maison du Tiramisu, Nereo, Novera, Nolhan Colas, Fugue, Marge, Odyssea Vision 2, and nolhan-dev.com. The second Odyssea mark therefore belongs to the last group of four. Fugue, Marge, and the violet nolhan-dev.com mark retain editable SVG sources in `public/logos/proposals/`.

Two full rows are visible at once: four marks per row on desktop and two per row on mobile. Cyclic indexing fills each row even with 13 marks and prevents a duplicate within the visible two-row window. The carousel advances upward every four seconds while visible and pauses on hover or keyboard focus. Reduced-motion visitors see a stationary two-row selection. Clicking a mark opens its full-size image.
