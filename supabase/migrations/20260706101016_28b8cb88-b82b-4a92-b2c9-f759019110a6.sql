CREATE TABLE public.fund_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL UNIQUE,
  fund_name text NOT NULL,
  provider text NOT NULL,
  category text NOT NULL,
  region text NOT NULL,
  return_1y numeric,
  return_3y numeric,
  expense_ratio numeric,
  aum numeric,
  last_updated timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.fund_performance TO anon, authenticated;
GRANT ALL ON public.fund_performance TO service_role;

ALTER TABLE public.fund_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fund performance is public read"
  ON public.fund_performance
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX idx_fund_performance_last_updated ON public.fund_performance(last_updated DESC);