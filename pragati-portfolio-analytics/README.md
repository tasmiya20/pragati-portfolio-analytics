# PRAGATI — Portfolio Analytics (React + Vite)

Pixel recreation of the PRAGATI National Infrastructure Intelligence "Portfolio Analytics" dashboard
at a 1536 x 1024 desktop viewport.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the analytics dashboard renders immediately.

Production build: `npm run build` (output in `dist/`), preview it with `npm run preview`.

`preview.html` (in the project root) is a zero-dependency, self-contained build of the same page
if you want to view it without installing anything.

## Structure

```
src/
  components/   Header, Logo, Navigation, SearchBar, Hero, HeroImage, ReportingCycle,
                AnalyticsTabs, FilterBar, KPICard, KPISection, RiskTrendChart,
                RiskDistribution, KeyInsights, SectorPerformance, TopProjects,
                PortfolioValueChart, Footer, Toast
  hooks/        useDismiss (click-outside / Esc for menus), useToast
  pages/        Analytics.jsx      (page state: filters, applied filters, chart mode, menus)
  data/         analyticsData.js   (all content/data, separated from presentation)
  styles/       analytics.css      (design tokens + exact geometry)
  assets/       emblem.png
```

Charts are hand-built SVG (no chart library) so line positions, donut arc lengths and bar widths
match the reference exactly. Icons are lucide-react.

## Latest changes

- **Wordmark** – "PRAGATI" in the header (and footer) now uses the reference logo: bold serif letters with
  the orange growth line (A crossbar + rising trend line through A-T-I). It is an SVG built from letter
  outlines (`components/Logo.jsx`, `components/logoPaths.js`), so it looks the same on every machine.
  Colour follows CSS `color` (navy in the header, white in the footer).
- **Filters row** – Time Period / Compare With / Sector / State / Apply share one row with the tabs
  (`.bar` in `analytics.css`); the dropdowns shrink instead of wrapping on narrower desktops.
- **Dropdown text** – selected option text is dark blue in all dropdowns, including dark mode and
  Windows high-contrast (`.sel select`, `.dselect select`).
- **Top 10 Projects** – table columns are percentage-based so the Risk Score column and pills always stay
  inside the card.
- **"Apr 2026" report (Sector-wise Risk Trend)** – sits to the right of the dashed line, inside the plot area,
  and no longer covers the chart lines or the x-axis labels.
- `HeroImage` accepts an `illustration` prop (`<HeroImage illustration />`) to draw the landscape artwork
  over the sky gradient; it is off by default.
