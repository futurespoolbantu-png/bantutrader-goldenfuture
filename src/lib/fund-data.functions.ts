import { createServerFn } from "@tanstack/react-start";

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
};

export type FundPayload = {
  funds: FundRow[];
  source: "live" | "cache";
  last_updated: string;
};

// Static metadata for the 5 tracked funds.
const TICKERS = [
  {
    symbol: "VOO",
    fund_name: "Vanguard S&P 500 ETF",
    provider: "Vanguard",
    category: "Equities",
    region: "US",
    expense_ratio: 0.03,
    aum: 1_350_000_000_000,
  },
  {
    symbol: "IVV",
    fund_name: "BlackRock iShares Core S&P 500",
    provider: "BlackRock",
    category: "Equities",
    region: "US",
    expense_ratio: 0.03,
    aum: 590_000_000_000,
  },
  {
    symbol: "FCNTX",
    fund_name: "Fidelity Contrafund",
    provider: "Fidelity",
    category: "Equities",
    region: "US",
    expense_ratio: 0.39,
    aum: 145_000_000_000,
  },
  {
    symbol: "PONAX",
    fund_name: "PIMCO Income Fund",
    provider: "PIMCO",
    category: "Bonds",
    region: "Global",
    expense_ratio: 0.79,
    aum: 165_000_000_000,
  },
  {
    symbol: "SGENX",
    fund_name: "Schroder Global Equity",
    provider: "Schroders",
    category: "Global",
    region: "Global",
    expense_ratio: 0.55,
    aum: 42_000_000_000,
  },
] as const;

// In-memory cache — 10 minute TTL per worker instance.
const CACHE_TTL_MS = 10 * 60 * 1000;
let memCache: { payload: FundPayload; at: number } | null = null;

type FmpHistorical = {
  historical?: Array<{ date: string; close: number }>;
};

async function fetchReturns(symbol: string, apiKey: string, signal: AbortSignal) {
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`FMP ${symbol} status ${res.status}`);
  const data = (await res.json()) as FmpHistorical;
  const hist = data.historical;
  if (!hist || hist.length === 0) throw new Error(`FMP ${symbol} empty history`);
  // hist is newest -> oldest
  const latest = hist[0].close;
  const now = new Date(hist[0].date).getTime();
  const yearMs = 365 * 24 * 60 * 60 * 1000;
  const findClosest = (targetMs: number) => {
    let best = hist[hist.length - 1];
    let bestDiff = Number.POSITIVE_INFINITY;
    for (const p of hist) {
      const diff = Math.abs(new Date(p.date).getTime() - targetMs);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = p;
      }
    }
    return best;
  };
  const p1y = findClosest(now - yearMs);
  const p3y = findClosest(now - 3 * yearMs);
  const return_1y = p1y.close ? ((latest - p1y.close) / p1y.close) * 100 : null;
  const return_3y = p3y.close ? ((latest - p3y.close) / p3y.close) * 100 : null;
  return { return_1y, return_3y };
}

export const getFundData = createServerFn({ method: "GET" }).handler(async (): Promise<FundPayload> => {
  // Serve from memory cache when fresh.
  if (memCache && Date.now() - memCache.at < CACHE_TTL_MS) {
    return memCache.payload;
  }

  const apiKey = process.env.FMP_API_KEY;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        const results = await Promise.all(
          TICKERS.map(async (meta) => {
            try {
              const { return_1y, return_3y } = await fetchReturns(meta.symbol, apiKey, controller.signal);
              return { meta, return_1y, return_3y };
            } catch {
              return { meta, return_1y: null, return_3y: null };
            }
          }),
        );
        clearTimeout(timeout);
        const now = new Date().toISOString();
        const funds: FundRow[] = results.map(({ meta, return_1y, return_3y }) => ({
          symbol: meta.symbol,
          fund_name: meta.fund_name,
          provider: meta.provider,
          category: meta.category,
          region: meta.region,
          expense_ratio: meta.expense_ratio,
          aum: meta.aum,
          return_1y: return_1y != null ? Number(return_1y.toFixed(2)) : null,
          return_3y: return_3y != null ? Number(return_3y.toFixed(2)) : null,
          last_updated: now,
        }));

        // Only overwrite cache table if at least one return came back live.
        const hasLive = funds.some((f) => f.return_1y != null);
        if (hasLive) {
          await supabaseAdmin.from("fund_performance").upsert(
            funds.map((f) => ({
              symbol: f.symbol,
              fund_name: f.fund_name,
              provider: f.provider,
              category: f.category,
              region: f.region,
              return_1y: f.return_1y,
              return_3y: f.return_3y,
              expense_ratio: f.expense_ratio,
              aum: f.aum,
              last_updated: f.last_updated,
            })),
            { onConflict: "symbol" },
          );
          const payload: FundPayload = { funds, source: "live", last_updated: now };
          memCache = { payload, at: Date.now() };
          return payload;
        }
      } finally {
        clearTimeout(timeout);
      }
    } catch (err) {
      console.error("[get-fund-data] live fetch failed", err);
    }
  }

  // Fallback: read cached rows from DB.
  const { data, error } = await supabaseAdmin
    .from("fund_performance")
    .select("symbol, fund_name, provider, category, region, return_1y, return_3y, expense_ratio, aum, last_updated")
    .order("symbol");

  if (error || !data || data.length === 0) {
    throw new Error("Fund data unavailable");
  }

  const funds = data as FundRow[];
  const last_updated = funds.reduce((max, f) => (f.last_updated > max ? f.last_updated : max), funds[0].last_updated);
  const payload: FundPayload = { funds, source: "cache", last_updated };
  memCache = { payload, at: Date.now() };
  return payload;
});
