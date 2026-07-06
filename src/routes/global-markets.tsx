import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUp, ArrowUpDown, Globe, TrendingUp, Wallet, RefreshCw } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { getFundData, type FundRow } from "@/lib/fund-data.functions";

export const Route = createFileRoute("/global-markets")({
  head: () => ({
    meta: [
      { title: "Global Markets — Bantu Trader Capital" },
      {
        name: "description",
        content:
          "Live comparison of major global investment funds and asset managers, refreshed daily. Compare Vanguard, BlackRock, Fidelity, PIMCO and Schroders.",
      },
      { property: "og:title", content: "Global Markets — Bantu Trader Capital" },
      {
        property: "og:description",
        content: "Live 1-year and 3-year returns, expense ratios and AUM for the world's leading funds.",
      },
    ],
  }),
  component: GlobalMarkets,
});

type SortKey = keyof Pick<
  FundRow,
  "fund_name" | "category" | "region" | "return_1y" | "return_3y" | "expense_ratio" | "aum" | "provider"
>;

const CATEGORIES = ["All", "Equities", "Bonds", "Mixed", "Global"] as const;
const REGIONS = ["All", "US", "Europe", "Global", "Emerging Markets"] as const;

function formatPct(n: number | null) {
  if (n == null) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}
function formatAum(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toFixed(0)}`;
}
function formatExp(n: number | null) {
  if (n == null) return "—";
  return `${n.toFixed(2)}%`;
}

function GlobalMarkets() {
  const { lang } = useI18n();
  const fetchFn = useServerFn(getFundData);
  const query = useQuery({
    queryKey: ["fund-performance"],
    queryFn: () => fetchFn(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const funds: FundRow[] = query.data?.funds ?? [];
  const lastUpdated = query.data?.last_updated ?? null;

  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("return_1y");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    return funds.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (region !== "All" && f.region !== region) return false;
      return true;
    });
  }, [funds, category, region]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const stats = useMemo(() => {
    if (funds.length === 0) return null;
    const withReturn = funds.filter((f) => f.return_1y != null);
    const withExpense = funds.filter((f) => f.expense_ratio != null);
    const withAum = funds.filter((f) => f.aum != null);
    const best = withReturn.reduce(
      (b, f) => (b == null || (f.return_1y as number) > (b.return_1y as number) ? f : b),
      null as FundRow | null,
    );
    const cheapest = withExpense.reduce(
      (b, f) => (b == null || (f.expense_ratio as number) < (b.expense_ratio as number) ? f : b),
      null as FundRow | null,
    );
    const largest = withAum.reduce(
      (b, f) => (b == null || (f.aum as number) > (b.aum as number) ? f : b),
      null as FundRow | null,
    );
    return { best, cheapest, largest };
  }, [funds]);

  const chartData = useMemo(
    () =>
      funds.map((f) => ({
        name: f.symbol,
        fullName: f.fund_name,
        return: f.return_1y ?? 0,
      })),
    [funds],
  );

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(typeof funds[0]?.[k] === "number" ? "desc" : "asc");
    }
  };

  const refreshedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString(lang === "pt" ? "pt-BR" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  const disclaimerLine =
    lang === "pt"
      ? `Dados obtidos de feeds de mercado ao vivo. Desempenho passado não indica resultados futuros. Última atualização ${refreshedLabel}.`
      : `Data sourced from live market feeds. Past performance is not indicative of future results. Last refreshed ${refreshedLabel}.`;

  return (
    <>
      {/* HERO */}
      <section className="mx-auto mt-10 max-w-7xl px-4">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Globe className="h-3.5 w-3.5 text-gold" />
            {lang === "pt" ? "Mercados Globais" : "Global Markets"}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {lang === "pt" ? (
              <>
                Desempenho de Fundos <span className="text-gradient-gold">Globais</span>, à Vista.
              </>
            ) : (
              <>
                Global Fund Performance, <span className="text-gradient-gold">at a Glance</span>.
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lang === "pt"
              ? "Comparação ao vivo dos principais fundos de investimento e gestoras de ativos globais, atualizada diariamente."
              : "Live comparison of major global investment funds and asset managers, updated daily."}
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground/70">
            <RefreshCw className="h-3 w-3" />
            {disclaimerLine}
            {query.data?.source === "cache" && (
              <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider">
                {lang === "pt" ? "Cache" : "Cached"}
              </span>
            )}
          </p>
        </Reveal>
      </section>

      {/* STAT CARDS */}
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label={lang === "pt" ? "Melhor Retorno 1 Ano" : "Best 1-Year Return"}
            fund={stats?.best?.fund_name}
            value={formatPct(stats?.best?.return_1y ?? null)}
            valueTone="success"
            loading={query.isLoading}
          />
          <StatCard
            label={lang === "pt" ? "Menor Taxa de Despesa" : "Lowest Expense Ratio"}
            fund={stats?.cheapest?.fund_name}
            value={formatExp(stats?.cheapest?.expense_ratio ?? null)}
            valueTone="gold"
            loading={query.isLoading}
          />
          <StatCard
            label={lang === "pt" ? "Maior AUM" : "Largest AUM"}
            fund={stats?.largest?.fund_name}
            value={formatAum(stats?.largest?.aum ?? null)}
            valueTone="gold"
            loading={query.isLoading}
          />
        </div>
      </section>

      {/* CHART */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <div className="surface-card p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {lang === "pt" ? "Retorno 1 Ano" : "1-Year Return"}
              </span>
              <h2 className="mt-1 font-display text-2xl font-semibold md:text-3xl">
                {lang === "pt" ? "Comparação de Desempenho" : "Performance Comparison"}
              </h2>
            </div>
            <TrendingUp className="hidden h-6 w-6 text-gold md:block" />
          </div>
          <div className="h-72 w-full md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  cursor={{ fill: "color-mix(in oklab, var(--gold) 10%, transparent)" }}
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  formatter={(v: number, _n, item) => [
                    `${v.toFixed(2)}%`,
                    (item?.payload as { fullName?: string })?.fullName ?? "",
                  ]}
                />
                <Bar dataKey="return" fill="var(--gold)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FILTERS + TABLE */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Filter
            label={lang === "pt" ? "Categoria" : "Category"}
            value={category}
            options={CATEGORIES}
            onChange={(v) => setCategory(v as (typeof CATEGORIES)[number])}
          />
          <Filter
            label={lang === "pt" ? "Região" : "Region"}
            value={region}
            options={REGIONS}
            onChange={(v) => setRegion(v as (typeof REGIONS)[number])}
          />
          <span className="ml-auto text-xs text-muted-foreground">
            {sorted.length} {lang === "pt" ? "fundos" : "funds"}
          </span>
        </div>
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <Th sortKey="fund_name" current={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Fundo" : "Fund Name"}
                </Th>
                <Th sortKey="category" current={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Categoria" : "Category"}
                </Th>
                <Th sortKey="region" current={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Região" : "Region"}
                </Th>
                <Th sortKey="return_1y" current={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  {lang === "pt" ? "Ret. 1A" : "1Y Return"}
                </Th>
                <Th sortKey="return_3y" current={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  {lang === "pt" ? "Ret. 3A" : "3Y Return"}
                </Th>
                <Th sortKey="expense_ratio" current={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  {lang === "pt" ? "Taxa" : "Expense Ratio"}
                </Th>
                <Th sortKey="aum" current={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  AUM
                </Th>
                <Th sortKey="provider" current={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Gestora" : "Provider"}
                </Th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((f) => (
                <tr key={f.symbol} className="border-b border-border/60 last:border-b-0 hover:bg-foreground/[0.03]">
                  <td className="px-4 py-3.5 font-medium">
                    <div>{f.fund_name}</div>
                    <div className="text-xs text-muted-foreground">{f.symbol}</div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{f.category}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{f.region}</td>
                  <td
                    className={`px-4 py-3.5 text-right font-mono ${
                      (f.return_1y ?? 0) >= 0 ? "text-[color:var(--success)]" : "text-[color:var(--danger)]"
                    }`}
                  >
                    {formatPct(f.return_1y)}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-right font-mono ${
                      (f.return_3y ?? 0) >= 0 ? "text-[color:var(--success)]" : "text-[color:var(--danger)]"
                    }`}
                  >
                    {formatPct(f.return_3y)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-muted-foreground">{formatExp(f.expense_ratio)}</td>
                  <td className="px-4 py-3.5 text-right font-mono">{formatAum(f.aum)}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{f.provider}</td>
                </tr>
              ))}
              {sorted.length === 0 && !query.isLoading && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {lang === "pt" ? "Nenhum fundo corresponde aos filtros." : "No funds match the filters."}
                  </td>
                </tr>
              )}
              {query.isLoading && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {lang === "pt" ? "Carregando dados de mercado…" : "Loading market data…"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* DISCLAIMER FOOTER */}
      <section className="mx-auto mt-14 mb-20 max-w-7xl px-4">
        <div className="rounded-2xl border border-border bg-foreground/[0.02] p-6 text-xs leading-relaxed text-muted-foreground md:text-sm">
          <Wallet className="mb-2 inline h-4 w-4 text-gold" />{" "}
          {lang === "pt"
            ? "Esta comparação tem finalidade exclusivamente educacional e não constitui recomendação de investimento. A Bantu Trader Capital não é afiliada a nenhum dos fundos listados acima."
            : "This comparison is for educational purposes only and does not constitute investment advice. Bantu Trader Capital is not affiliated with the funds listed above."}
        </div>
      </section>
    </>
  );
}

function StatCard({
  label,
  fund,
  value,
  valueTone,
  loading,
}: {
  label: string;
  fund: string | undefined;
  value: string;
  valueTone: "gold" | "success";
  loading: boolean;
}) {
  return (
    <div className="surface-card p-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div
        className={`mt-3 font-display text-3xl font-bold md:text-4xl ${
          valueTone === "gold" ? "text-gradient-gold" : "text-[color:var(--success)]"
        }`}
      >
        {loading ? "…" : value}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{loading ? "—" : fund ?? "—"}</div>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-2 text-xs">
      <span className="uppercase tracking-widest text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-medium text-foreground outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-background text-foreground">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Th({
  children,
  sortKey,
  current,
  dir,
  onClick,
  align = "left",
}: {
  children: React.ReactNode;
  sortKey: SortKey;
  current: SortKey;
  dir: "asc" | "desc";
  onClick: (k: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = current === sortKey;
  return (
    <th className={`px-4 py-3 ${align === "right" ? "text-right" : ""}`}>
      <button
        type="button"
        onClick={() => onClick(sortKey)}
        className={`inline-flex items-center gap-1.5 transition-colors hover:text-foreground ${
          active ? "text-gold" : ""
        }`}
      >
        {children}
        {active ? (
          dir === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-50" />
        )}
      </button>
    </th>
  );
}
