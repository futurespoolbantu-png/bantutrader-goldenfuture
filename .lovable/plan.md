# Global Markets — Full Build

## 1. Database schema (migration)

Extend `fund_performance` with:
- `product_type text` (ETF | Mutual Fund | Index Fund)
- `min_investment numeric`
- `share_classes text`
- `dividend_frequency text`
- `currency text default 'USD'`
- `ticker_symbol text`
- `description text`
- `top_holdings jsonb` (array of `{ name, weight }`)
- `history_5y jsonb` (array of `{ date, value }`)
- `sparkline_7d jsonb` (array of numbers)
- `prev_return_1y numeric` (to compute up/down arrow vs last refresh)

Keep existing RLS + grants unchanged.

## 2. Seed data

Insert the 13 new funds plus keep the existing 5 (upsert by `symbol`):

```text
SPY, QQQ, VTI, EEM, VWO, IEUR, BND, LQD, TPINX, VBIAX,
RPGAX, IAU, VNQ + VOO, IVV, FCNTX, PONAX, SGENX
```

Each row gets category, region, product_type, ticker_symbol, currency, min_investment, dividend_frequency, share_classes (null for ETFs), description, and reasonable historical/holdings snapshot. Live returns/prices still refresh via the server function.

## 3. Server function (`src/lib/fund-data.functions.ts`)

- Batch FMP call: single `/quote/{comma-list}` for all tickers (1 request).
- Single `/historical-price-full/{comma-list}?serietype=line` batched where supported; fall back to per-ticker with 10-min cache.
- Compute 1y / 3y returns + 7-day sparkline from historical series.
- Upsert into Supabase; preserve static metadata (product_type, min_investment, share_classes, dividend_frequency, currency, description, top_holdings).
- Store previous `return_1y` into `prev_return_1y` before writing new value.
- On failure, return cached table rows with `source: "cache"`.

## 4. Page (`src/routes/global-markets.tsx`)

Sections:
1. Hero (unchanged) + collapsible explainer line "What is a fund?" with "Learn more" → `/blog`.
2. Stats cards (unchanged).
3. Goal quick filters: `Growth`, `Stable income`, `Low cost` (segmented buttons above dropdowns).
4. Search + Category + Region + Product Type dropdowns.
5. Table columns: `☐ | Type | Fund | Ticker | Category | Region | 1Y ▲ | 3Y | Trend (sparkline) | Expense ● | AUM | Min.`
   - Sortable headers, 10 rows/page, click row → drawer.
   - Info tooltips on Expense/AUM/Min headers.
   - Color-dot legend below table.
6. Bar chart (1Y returns, existing) — keep.
7. Disclaimer footer (existing).

Interactions:
- Compare checkboxes (max 3) → floating pill "Compare selected (n)" → modal.
- Row click → right drawer (Sheet) with 5Y line chart, top holdings bars, product details, description, close button. Full-screen on mobile.
- Compare modal: side-by-side columns on desktop, stacked on mobile.

## 5. UI details

- Reuse shadcn `Sheet`, `Dialog`, `Tooltip`, `Badge`, `Checkbox`, `Select`, `Input`, `Table`.
- Sparkline: inline SVG polyline (no library), gold stroke.
- Expense dot: `<span>` colored by threshold.
- 1Y arrow: compare `return_1y` vs `prev_return_1y`.
- Type badge colors: ETF=gold, Mutual Fund=blue-ish muted, Index Fund=green muted (all using existing tokens/opacity).
- All tooltips also open on tap (Radix Tooltip already supports focus/tap on touch).

## 6. i18n

Add EN/PT keys for new labels (Type, Growth, Stable income, Low cost, Compare selected, Product details, Ticker, Min. investment, Dividend frequency, Currency, Share classes, "What is a fund?", "Learn more", tooltip strings).

## 7. Files

- Migration: alter table + columns.
- Insert: seed 13 new + update 5 existing with product metadata + sample holdings/history.
- Edit `src/lib/fund-data.functions.ts` — batch fetch, sparkline, prev_return.
- Rewrite `src/routes/global-markets.tsx`.
- New `src/components/FundDrawer.tsx`, `src/components/CompareModal.tsx`, `src/components/Sparkline.tsx`.
- Extend `src/lib/i18n.tsx`.

## Notes / trade-offs

- 5Y history and top holdings are seeded (static curated data) — FMP paid tier required for true 5Y + holdings, so we render from the seeded jsonb columns and only refresh returns/prices live. This keeps the UI complete and never shows projected data.
- Sparkline uses last 7 daily closes from the same historical fetch when available, else from seeded fallback.
