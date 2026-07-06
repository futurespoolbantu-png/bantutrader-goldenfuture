## Global Markets page + live FMP proxy

### New route
- `src/routes/global-markets.tsx` — inserted between Products and About in `Nav.tsx` links.
- Head metadata: title "Global Markets — Bantu Trader Capital", matching og/twitter tags.

### Page structure (dark theme, gold accents, existing tokens/fonts/spacing)
1. **Hero** — headline "Global Fund Performance, at a Glance", subheading, small muted disclaimer with dynamic "Last refreshed" timestamp from API response.
2. **3 stat cards** (reusing homepage stat-card styling + `AnimatedCounter` where numeric): Best 1-Year Return, Lowest Expense Ratio, Largest AUM — each shows fund name + value, computed from live data.
3. **Bar chart** — Recharts `BarChart`, 1-year return for the 5 funds, single flat gold (`hsl(var(--gold))`) bars, no gradient/shadow, responsive container.
4. **Filters + sortable table** — two `<Select>` dropdowns (Category, Region) with "All" option; table columns Fund Name, Category, Region, 1Y, 3Y, Expense Ratio, AUM, Provider. Click header to sort asc/desc (client-side `useState`). Fully responsive: horizontal scroll on mobile, condensed padding.
5. **Footer disclaimer block** above global `<Footer />`.

### i18n
- Add EN/PT keys for nav label ("Global Markets" / "Mercados Globais") and page copy in `src/lib/i18n.tsx`.

### Data flow (Lovable Cloud)
- Enable Lovable Cloud (Supabase).
- Secret: `FMP_API_KEY` (requested via add_secret — user obtains from financialmodelingprep.com).
- Table `public.fund_performance` (fund_name, provider, category, region, return_1y, return_3y, expense_ratio, aum, last_updated). RLS enabled; `GRANT SELECT ... TO anon, authenticated`; policy allowing public SELECT (public read-only reference data). `GRANT ALL ... TO service_role` for the edge function upsert.
- **Edge Function `get-fund-data`** (Supabase Edge Function per user's explicit request):
  - Tickers: `VOO, IVV, FCNTX, PONAX, SGENX` (Schroder Global Equity proxy).
  - Static metadata map (category, region, provider, friendly name) per ticker.
  - In-memory cache with 10-minute TTL keyed per function instance.
  - Fetch FMP `/api/v3/quote/{tickers}` for price + `/api/v3/etf-info/{symbol}` (or `/api/v3/mutual-fund-holder` fallback) for expense ratio/AUM; compute 1Y and 3Y return from historical price endpoint. Aggregate into DTO array.
  - On success: upsert rows into `fund_performance` via service-role client; return `{ funds, source: "live", last_updated }`.
  - On failure (network/rate limit/missing key): SELECT latest cached rows from `fund_performance`, return `{ funds, source: "cache", last_updated }`. If cache also empty, return 503.
- Frontend fetches ONLY the edge function URL (never FMP directly). Loader-less: use `useQuery` with 5-min staleTime to keep it simple and avoid SSR-time secret access.

### Constraints honored
- No projected/forward-looking data — only historical 1Y/3Y and current AUM/expense.
- API key stays server-side (never in `VITE_*`, never in client bundle).
- Fully responsive; mobile uses stacked stat cards + scrollable table + resized chart.

### Files touched
- New: `src/routes/global-markets.tsx`, `supabase/functions/get-fund-data/index.ts`, migration for `fund_performance`.
- Edited: `src/components/Nav.tsx` (nav order + i18n key), `src/lib/i18n.tsx` (new keys), `src/routeTree.gen.ts` (auto).

### What I'll need from you afterwards
- Paste your FMP API key when the secret prompt opens.
