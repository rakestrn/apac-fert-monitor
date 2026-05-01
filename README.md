# HORMUZ — APAC Fertilizer Monitor

Interactive dashboard tracking APAC fertilizer prices during the 2026 Iran/US conflict and Strait of Hormuz disruption.

## Quick Start

```bash
npm install
npm run dev          # local dev at http://localhost:5000
npm run build        # production build → dist/public/
```

## Updating Data

All data is in one file: **`client/src/data/fertilizer-data.ts`**

Sections to update weekly:
- `ureaPrices`, `phosphatePrices`, `potashPrices`, `ammoniaPrices` — monthly price series
- `exchangeRatios` — corn/urea, soy/MAP, corn/potash ratios
- `hormuzTransits` — weekly commercial + dark-fleet vessel counts
- `kpiSnapshot` — top-of-page current values
- `crisisEvents` — geopolitical timeline
- `bottomLine` — investment thesis bullets

After editing, run `npm run build` and redeploy.

## Deployment

### Vercel / Netlify / Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist/public`

### Static hosting (S3, GCS, any web server)
Upload everything in `dist/public/` to your bucket. No server required.

### Custom domain
Point your DNS A/CNAME record to your hosting provider, configure the domain in their dashboard.

## Data Sources

- World Bank Pink Sheet — fertilizer price index
- Argus Media — ME FOB urea, phosphate benchmarks
- S&P Global Commodity Insights — ammonia, Hormuz transit data
- Farmdoc Daily (U. Illinois) — exchange ratios, crisis scenario modeling
- Purdue Center for Commercial Ag — country vulnerability analysis
- IMARC Group, Intratec — potash pricing
- USDA, CBOT — corn/soy futures
- U.S. Treasury OFAC — shadow fleet sanctions data

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Recharts for data viz
- Inter / JetBrains Mono fonts
