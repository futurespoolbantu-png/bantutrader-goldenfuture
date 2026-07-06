
ALTER TABLE public.fund_performance
  ADD COLUMN IF NOT EXISTS product_type text,
  ADD COLUMN IF NOT EXISTS min_investment numeric,
  ADD COLUMN IF NOT EXISTS share_classes text,
  ADD COLUMN IF NOT EXISTS dividend_frequency text,
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS ticker_symbol text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS top_holdings jsonb,
  ADD COLUMN IF NOT EXISTS history_5y jsonb,
  ADD COLUMN IF NOT EXISTS sparkline_7d jsonb,
  ADD COLUMN IF NOT EXISTS prev_return_1y numeric;

CREATE UNIQUE INDEX IF NOT EXISTS fund_performance_symbol_key ON public.fund_performance (symbol);
