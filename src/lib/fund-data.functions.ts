import { createServerFn } from "@tanstack/react-start";

export type Holding = { name: string; weight: number };
export type HistoryPoint = { d: string; v: number };

export type FundRow = {
  symbol: string;
  fund_name: string;
  provider: string;
  category: string;
  region: string;
  return_1y: number | null;
  return_3y: number | null;
  expense_ratio: number | null;
  aum: number | null;
  last_updated: string;
  // Product info
  product_type: string | null;
  ticker_symbol: string | null;
  currency: string | null;
  min_investment: number | null;
  dividend_frequency: string | null;
  share_classes: string | null;
  description: string | null;
  // Extras
  top_holdings: Holding[] | null;
  history_5y: HistoryPoint[] | null;
  sparkline_7d: number[] | null;
  prev_return_1y: number | null;
};

export type FundPayload = {
  funds: FundRow[];
  source: "live" | "cache";
  last_updated: string;
};

const CACHE_TTL_MS = 10 * 60 * 1000;
let memCache: { payload: FundPayload; at: number } | null = null;

type FmpQuote = {
  symbol: string;
  price?: number;
  changesPercentage?: number;
  marketCap?: number;
};

const FUND_SYMBOLS = [
  "SPY", "QQQ", "VTI", "EEM", "VWO", "IEUR", "BND", "LQD",
  "TPINX", "VBIAX", "RPGAX", "IAU", "VNQ",
  "VOO", "IVV", "FCNTX", "PONAX", "SGENX",
];

async function batchFetchQuotes(apiKey: string, signal: AbortSignal): Promise<Map<string, FmpQuote>> {
  const url = `https://financialmodelingprep.com/api/v3/quote/${FUND_SYMBOLS.join(",")}?apikey=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`FMP batch quote status ${res.status}`);
  const data = (await res.json()) as FmpQuote[];
  const map = new Map<string, FmpQuote>();
  for (const q of data) map.set(q.symbol, q);
  return map;
}

async function fetchHistoricalReturns(symbol: string, apiKey: string, signal: AbortSignal) {
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`FMP history ${symbol} ${res.status}`);
  const data = (await res.json()) as { historical?: Array<{ date: string; close: number }> };
  const hist = data.historical;
  if (!hist || hist.length === 0) return { return_1y: null, return_3y: null, sparkline_7d: null };
  const latest = hist[0].close;
  const now = new Date(hist[0].date).getTime();
  const yearMs = 365 * 24 * 60 * 60 * 1000;
  const closest = (targetMs: number) => {
    let best = hist[hist.length - 1];
    let bestDiff = Number.POSITIVE_INFINITY;
    for (const p of hist) {
      const diff = Math.abs(new Date(p.date).getTime() - targetMs);
      if (diff < bestDiff) { bestDiff = diff; best = p; }
    }
    return best;
  };
  const p1y = closest(now - yearMs);
  const p3y = closest(now - 3 * yearMs);
  const return_1y = p1y.close ? ((latest - p1y.close) / p1y.close) * 100 : null;
  const return_3y = p3y.close ? ((latest - p3y.close) / p3y.close) * 100 : null;
  // sparkline: last 7 trading days (hist newest->oldest)
  const sparkline_7d = hist.slice(0, 7).map((p) => p.close).reverse();
  return { return_1y, return_3y, sparkline_7d };
}

export const getFundData = createServerFn({ method: "GET" }).handler(async (): Promise<FundPayload> => {
  if (memCache && Date.now() - memCache.at < CACHE_TTL_MS) return memCache.payload;

  const apiKey = process.env.FMP_API_KEY;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Always load stored rows first — they carry product metadata + fallbacks.
  const { data: stored, error: storedErr } = await supabaseAdmin
    .from("fund_performance")
    .select("*")
    .order("aum", { ascending: false });

  if (storedErr || !stored || stored.length === 0) {
    throw new Error("Fund data unavailable");
  }

  const bySymbol = new Map<string, (typeof stored)[number]>();
  for (const r of stored) bySymbol.set(r.symbol, r);

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12_000);
      try {
        // 1 batched quote call for market cap/price
        const quotes = await batchFetchQuotes(apiKey, controller.signal).catch(() => new Map<string, FmpQuote>());

        // Historical: parallel per-symbol (unavoidable — FMP free tier doesn't batch history).
        // Each fund updates independently; failures fall back to stored values.
        const histResults = await Promise.all(
          FUND_SYMBOLS.map(async (sym) => {
            try {
              const r = await fetchHistoricalReturns(sym, apiKey, controller.signal);
              return { sym, ...r };
            } catch {
              return { sym, return_1y: null as number | null, return_3y: null as number | null, sparkline_7d: null as number[] | null };
            }
          }),
        );

        const now = new Date().toISOString();
        const updates = histResults
          .map(({ sym, return_1y, return_3y, sparkline_7d }) => {
            const cur = bySymbol.get(sym);
            if (!cur) return null;
            const q = quotes.get(sym);
            const newAum = q?.marketCap && q.marketCap > 0 ? q.marketCap : cur.aum;
            const newR1 = return_1y != null ? Number(return_1y.toFixed(2)) : cur.return_1y;
            const newR3 = return_3y != null ? Number(return_3y.toFixed(2)) : cur.return_3y;
            return {
              symbol: sym,
              prev_return_1y: cur.return_1y ?? cur.prev_return_1y ?? null,
              return_1y: newR1,
              return_3y: newR3,
              aum: newAum,
              sparkline_7d: sparkline_7d && sparkline_7d.length > 0 ? sparkline_7d : cur.sparkline_7d,
              last_updated: now,
            };
          })
          .filter(Boolean) as Array<Record<string, unknown>>;

        if (updates.length > 0) {
          // Only patch the changing fields per symbol.
          for (const u of updates) {
            const { symbol, ...patch } = u as { symbol: string } & Record<string, unknown>;
            await supabaseAdmin.from("fund_performance").update(patch).eq("symbol", symbol);
          }
        }
      } finally {
        clearTimeout(timeout);
      }

      // Re-read to build the payload (single query, cheap).
      const { data: fresh } = await supabaseAdmin
        .from("fund_performance")
        .select("*")
        .order("aum", { ascending: false });

      if (fresh && fresh.length > 0) {
        const payload: FundPayload = {
          funds: fresh as FundRow[],
          source: "live",
          last_updated: new Date().toISOString(),
        };
        memCache = { payload, at: Date.now() };
        return payload;
      }
    } catch (err) {
      console.error("[get-fund-data] live fetch failed", err);
    }
  }

  const last_updated = stored.reduce(
    (max: string, f: { last_updated: string }) => (f.last_updated > max ? f.last_updated : max),
    stored[0].last_updated,
  );
  const payload: FundPayload = { funds: stored as FundRow[], source: "cache", last_updated };
  memCache = { payload, at: Date.now() };
  return payload;
});
