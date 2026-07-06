import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Globe,
  Info,
  RefreshCw,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { Sparkline } from "@/components/Sparkline";
import { useI18n } from "@/lib/i18n";
import { getFundData, type FundRow, type Holding, type HistoryPoint } from "@/lib/fund-data.functions";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/global-markets")({
  head: () => ({
    meta: [
      { title: "Global Markets — Bantu Trader Capital" },
      {
        name: "description",
        content:
          "Live comparison of major global investment funds — ETFs, mutual funds and index funds — with returns, expense ratios, AUM and product details.",
      },
      { property: "og:title", content: "Global Markets — Bantu Trader Capital" },
      {
        property: "og:description",
        content: "Compare 18 leading global funds side by side: 1Y & 3Y returns, expense ratios, AUM and product info.",
      },
    ],
  }),
  component: GlobalMarkets,
});

type SortKey =
  | "fund_name"
  | "category"
  | "region"
  | "return_1y"
  | "return_3y"
  | "expense_ratio"
  | "aum"
  | "product_type"
  | "min_investment";

type Goal = "none" | "growth" | "income" | "low_cost";

const CATEGORIES = ["All", "Equities", "Bonds", "Mixed", "Commodities", "Real Estate"] as const;
const REGIONS = ["All", "US", "Europe", "Global", "Emerging Markets"] as const;
const TYPES = ["All", "ETF", "Mutual Fund", "Index Fund"] as const;
const PAGE_SIZE = 10;

function fmtPct(n: number | null) {
  if (n == null) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}
function fmtAum(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toFixed(0)}`;
}
function fmtExp(n: number | null) {
  if (n == null) return "—";
  return `${n.toFixed(2)}%`;
}
function fmtMoney(n: number | null | undefined) {
  if (n == null) return "N/A";
  if (n === 0) return "$0";
  if (n >= 1000) return `$${n.toLocaleString("en-US")}`;
  return `$${n}`;
}
function na(v: string | number | null | undefined) {
  if (v == null || v === "") return "N/A";
  return String(v);
}

function expenseDot(exp: number | null) {
  if (exp == null) return "bg-muted-foreground/40";
  if (exp < 0.3) return "bg-[color:var(--success)]";
  if (exp < 0.7) return "bg-yellow-400";
  return "bg-[color:var(--danger)]";
}

function typeBadgeClass(t: string | null) {
  if (t === "ETF") return "border-gold/40 bg-gold/10 text-gold";
  if (t === "Mutual Fund") return "border-blue-400/40 bg-blue-400/10 text-blue-300";
  if (t === "Index Fund") return "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
  return "border-border bg-foreground/5 text-muted-foreground";
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

  const funds: FundRow[] = (query.data?.funds ?? []) as FundRow[];
  const lastUpdated = query.data?.last_updated ?? null;

  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [ptype, setPtype] = useState<(typeof TYPES)[number]>("All");
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState<Goal>("none");
  const [sortKey, setSortKey] = useState<SortKey>("aum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [drawerSym, setDrawerSym] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [explainerOpen, setExplainerOpen] = useState(false);

  const filtered = useMemo(() => {
    return funds.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (region !== "All" && f.region !== region) return false;
      if (ptype !== "All" && f.product_type !== ptype) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !f.fund_name.toLowerCase().includes(q) &&
          !(f.ticker_symbol ?? f.symbol).toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [funds, category, region, ptype, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (goal !== "none") {
      arr.sort((a, b) => {
        if (goal === "growth") return (b.return_1y ?? -Infinity) - (a.return_1y ?? -Infinity);
        if (goal === "low_cost") return (a.expense_ratio ?? Infinity) - (b.expense_ratio ?? Infinity);
        // income: bonds/mixed first, then by 1y desc
        const rank = (f: FundRow) => (f.category === "Bonds" ? 0 : f.category === "Mixed" ? 1 : 2);
        const r = rank(a) - rank(b);
        if (r !== 0) return r;
        return (b.return_1y ?? -Infinity) - (a.return_1y ?? -Infinity);
      });
      return arr;
    }
    arr.sort((a, b) => {
      const av = a[sortKey as keyof FundRow] as number | string | null;
      const bv = b[sortKey as keyof FundRow] as number | string | null;
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
  }, [filtered, sortKey, sortDir, goal]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = useMemo(() => {
    if (funds.length === 0) return null;
    const wR = funds.filter((f) => f.return_1y != null);
    const wE = funds.filter((f) => f.expense_ratio != null);
    const wA = funds.filter((f) => f.aum != null);
    const best = wR.reduce<FundRow | null>((b, f) => (b == null || (f.return_1y as number) > (b.return_1y as number) ? f : b), null);
    const cheap = wE.reduce<FundRow | null>((b, f) => (b == null || (f.expense_ratio as number) < (b.expense_ratio as number) ? f : b), null);
    const large = wA.reduce<FundRow | null>((b, f) => (b == null || (f.aum as number) > (b.aum as number) ? f : b), null);
    return { best, cheap, large };
  }, [funds]);

  const chartData = useMemo(
    () => funds.map((f) => ({ name: f.symbol, fullName: f.fund_name, return: f.return_1y ?? 0 })),
    [funds],
  );

  const toggleSort = (k: SortKey) => {
    setGoal("none");
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(typeof funds[0]?.[k as keyof FundRow] === "number" ? "desc" : "asc");
    }
  };

  const toggleSelect = (sym: string) => {
    setSelected((prev) => {
      if (prev.includes(sym)) return prev.filter((s) => s !== sym);
      if (prev.length >= 3) return prev;
      return [...prev, sym];
    });
  };

  const refreshedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString(lang === "pt" ? "pt-BR" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  const drawerFund = drawerSym ? funds.find((f) => f.symbol === drawerSym) ?? null : null;
  const compareFunds = funds.filter((f) => selected.includes(f.symbol));

  const disclaimerLine =
    lang === "pt"
      ? `Dados de mercado ao vivo. Desempenho passado não indica resultados futuros. Última atualização ${refreshedLabel}.`
      : `Data from live market feeds. Past performance is not indicative of future results. Last refreshed ${refreshedLabel}.`;

  return (
    <TooltipProvider delayDuration={150}>
      {/* HERO */}
      <section className="mx-auto mt-10 max-w-7xl px-4">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Globe className="h-3.5 w-3.5 text-gold" />
            {lang === "pt" ? "Mercados Globais" : "Global Markets"}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {lang === "pt" ? (
              <>Desempenho de Fundos <span className="text-gradient-gold">Globais</span>, à Vista.</>
            ) : (
              <>Global Fund Performance, <span className="text-gradient-gold">at a Glance</span>.</>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lang === "pt"
              ? "Comparação ao vivo dos principais fundos de investimento e gestoras de ativos globais, atualizada diariamente."
              : "Live comparison of major global investment funds and asset managers, updated daily."}
          </p>

          {/* Explainer */}
          <div className="mt-5 max-w-2xl rounded-2xl border border-border bg-foreground/[0.03] p-4 text-sm">
            <button
              onClick={() => setExplainerOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-medium">
                {lang === "pt" ? "O que é um fundo?" : "What is a fund?"}
              </span>
              <span className="text-xs text-gold">
                {explainerOpen ? (lang === "pt" ? "Fechar" : "Close") : (lang === "pt" ? "Saber mais" : "Learn more")}
              </span>
            </button>
            {explainerOpen && (
              <p className="mt-3 text-muted-foreground">
                {lang === "pt"
                  ? "Um fundo reúne dinheiro de vários investidores para comprar uma cesta de ativos — ações, obrigações, imóveis ou commodities — gerida por profissionais."
                  : "A fund pools money from many investors to buy a basket of assets — stocks, bonds, real estate or commodities — managed by professionals."}{" "}
                <Link to="/blog" className="text-gold underline-offset-4 hover:underline">
                  {lang === "pt" ? "Ler no blog" : "Read on the blog"}
                </Link>
              </p>
            )}
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground/70">
            <RefreshCw className="h-3 w-3" />
            {disclaimerLine}
            {query.data?.source === "cache" && (
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider">
                {lang === "pt" ? "Cache" : "Cached"}
              </span>
            )}
          </p>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label={lang === "pt" ? "Melhor Retorno 1 Ano" : "Best 1-Year Return"}
            fund={stats?.best?.fund_name}
            value={fmtPct(stats?.best?.return_1y ?? null)}
            tone="success"
            loading={query.isLoading}
          />
          <StatCard
            label={lang === "pt" ? "Menor Taxa" : "Lowest Expense Ratio"}
            fund={stats?.cheap?.fund_name}
            value={fmtExp(stats?.cheap?.expense_ratio ?? null)}
            tone="gold"
            loading={query.isLoading}
          />
          <StatCard
            label={lang === "pt" ? "Maior AUM" : "Largest AUM"}
            fund={stats?.large?.fund_name}
            value={fmtAum(stats?.large?.aum ?? null)}
            tone="gold"
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
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                <RTooltip
                  cursor={{ fill: "color-mix(in oklab, var(--gold) 10%, transparent)" }}
                  contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  formatter={(v: number, _n, item) => [`${v.toFixed(2)}%`, (item?.payload as { fullName?: string })?.fullName ?? ""]}
                />
                <Bar dataKey="return" fill="var(--gold)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* GOAL FILTERS */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {lang === "pt" ? "Objetivo" : "Goal"}
          </span>
          {(
            [
              { k: "growth", en: "Growth", pt: "Crescimento" },
              { k: "income", en: "Stable income", pt: "Renda estável" },
              { k: "low_cost", en: "Low cost", pt: "Baixo custo" },
            ] as const
          ).map((g) => (
            <button
              key={g.k}
              onClick={() => { setGoal(goal === g.k ? "none" : g.k); setPage(1); }}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                goal === g.k
                  ? "border-gold bg-gold text-black"
                  : "border-border bg-foreground/5 text-foreground hover:border-gold/40"
              }`}
            >
              {lang === "pt" ? g.pt : g.en}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder={lang === "pt" ? "Pesquisar por nome ou ticker" : "Search by name or ticker"}
            className="min-w-[220px] flex-1 rounded-full border border-border bg-foreground/5 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-gold/50"
          />
          <Filter label={lang === "pt" ? "Categoria" : "Category"} value={category} options={CATEGORIES} onChange={(v) => { setCategory(v as (typeof CATEGORIES)[number]); setPage(1); }} />
          <Filter label={lang === "pt" ? "Região" : "Region"} value={region} options={REGIONS} onChange={(v) => { setRegion(v as (typeof REGIONS)[number]); setPage(1); }} />
          <Filter label={lang === "pt" ? "Tipo" : "Type"} value={ptype} options={TYPES} onChange={(v) => { setPtype(v as (typeof TYPES)[number]); setPage(1); }} />
          <span className="ml-auto text-xs text-muted-foreground">
            {sorted.length} {lang === "pt" ? "fundos" : "funds"}
          </span>
        </div>

        {/* TABLE */}
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="w-10 px-4 py-3"></th>
                <Th k="product_type" cur={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Tipo" : "Type"}
                </Th>
                <Th k="fund_name" cur={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Fundo" : "Fund"}
                </Th>
                <Th k="category" cur={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Categoria" : "Category"}
                </Th>
                <Th k="region" cur={sortKey} dir={sortDir} onClick={toggleSort}>
                  {lang === "pt" ? "Região" : "Region"}
                </Th>
                <Th k="return_1y" cur={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  1Y
                </Th>
                <Th k="return_3y" cur={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  3Y
                </Th>
                <th className="px-4 py-3 text-right">{lang === "pt" ? "Tendência" : "Trend"}</th>
                <Th k="expense_ratio" cur={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  <span className="inline-flex items-center gap-1">
                    {lang === "pt" ? "Taxa" : "Expense"}
                    <InfoHint text={lang === "pt" ? "Percentual anual cobrado pelo fundo sobre o valor investido." : "Annual fee the fund charges on your invested amount."} />
                  </span>
                </Th>
                <Th k="aum" cur={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  <span className="inline-flex items-center gap-1">
                    AUM
                    <InfoHint text={lang === "pt" ? "Ativos sob gestão — total investido no fundo." : "Assets Under Management — total money invested in the fund."} />
                  </span>
                </Th>
                <Th k="min_investment" cur={sortKey} dir={sortDir} onClick={toggleSort} align="right">
                  <span className="inline-flex items-center gap-1">
                    {lang === "pt" ? "Mín." : "Min."}
                    <InfoHint text={lang === "pt" ? "Valor mínimo exigido para investir." : "Minimum amount required to invest."} />
                  </span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((f) => {
                const isSel = selected.includes(f.symbol);
                const prev = f.prev_return_1y;
                const arrow =
                  f.return_1y != null && prev != null && f.return_1y !== prev
                    ? f.return_1y > prev
                      ? "up"
                      : "down"
                    : null;
                return (
                  <tr
                    key={f.symbol}
                    className="border-b border-border/60 last:border-b-0 hover:bg-foreground/[0.03] cursor-pointer"
                    onClick={() => setDrawerSym(f.symbol)}
                  >
                    <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSel}
                        onCheckedChange={() => toggleSelect(f.symbol)}
                        aria-label={`Compare ${f.fund_name}`}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${typeBadgeClass(f.product_type)}`}>
                        {na(f.product_type)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 font-medium">
                      <div>{f.fund_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {f.ticker_symbol ?? f.symbol} · {f.provider}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{f.category}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{f.region}</td>
                    <td
                      className={`px-4 py-3.5 text-right font-mono ${
                        (f.return_1y ?? 0) >= 0 ? "text-[color:var(--success)]" : "text-[color:var(--danger)]"
                      }`}
                    >
                      <span className="inline-flex items-center justify-end gap-1">
                        {fmtPct(f.return_1y)}
                        {arrow === "up" && <ArrowUp className="h-3 w-3 text-[color:var(--success)]" />}
                        {arrow === "down" && <ArrowDown className="h-3 w-3 text-[color:var(--danger)]" />}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3.5 text-right font-mono ${
                        (f.return_3y ?? 0) >= 0 ? "text-[color:var(--success)]" : "text-[color:var(--danger)]"
                      }`}
                    >
                      {fmtPct(f.return_3y)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-end">
                        <Sparkline data={f.sparkline_7d} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${expenseDot(f.expense_ratio)}`} />
                        {fmtExp(f.expense_ratio)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono">{fmtAum(f.aum)}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-muted-foreground">
                      {f.min_investment != null ? fmtMoney(f.min_investment) : "N/A"}
                    </td>
                  </tr>
                );
              })}
              {paged.length === 0 && !query.isLoading && (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {lang === "pt" ? "Nenhum fundo corresponde aos filtros." : "No funds match the filters."}
                  </td>
                </tr>
              )}
              {query.isLoading && (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {lang === "pt" ? "Carregando dados de mercado…" : "Loading market data…"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Legend + pagination */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span>{lang === "pt" ? "Taxa de despesa:" : "Expense ratio:"}</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--success)]" /> &lt; 0.30%</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-400" /> 0.30–0.70%</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--danger)]" /> &gt; 0.70%</span>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-border px-3 py-1 disabled:opacity-40"
              >
                {lang === "pt" ? "Anterior" : "Prev"}
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-border px-3 py-1 disabled:opacity-40"
              >
                {lang === "pt" ? "Próximo" : "Next"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto mt-14 mb-24 max-w-7xl px-4">
        <div className="rounded-2xl border border-border bg-foreground/[0.02] p-6 text-xs leading-relaxed text-muted-foreground md:text-sm">
          <Wallet className="mb-2 inline h-4 w-4 text-gold" />{" "}
          {lang === "pt"
            ? "Esta comparação tem finalidade exclusivamente educacional e não constitui recomendação de investimento. A Bantu Trader Capital não é afiliada a nenhum dos fundos listados acima."
            : "This comparison is for educational purposes only and does not constitute investment advice. Bantu Trader Capital is not affiliated with the funds listed above."}
        </div>
      </section>

      {/* FLOATING COMPARE */}
      {selected.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <button
            onClick={() => setCompareOpen(true)}
            className="flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black shadow-2xl shadow-gold/30 transition-transform hover:scale-[1.02]"
          >
            {lang === "pt" ? "Comparar selecionados" : "Compare selected"} ({selected.length})
            <button
              onClick={(e) => { e.stopPropagation(); setSelected([]); }}
              className="rounded-full bg-black/20 p-1 hover:bg-black/30"
              aria-label="Clear"
            >
              <X className="h-3 w-3" />
            </button>
          </button>
        </div>
      )}

      {/* DRAWER */}
      <Sheet open={!!drawerFund} onOpenChange={(o) => { if (!o) setDrawerSym(null); }}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg md:max-w-xl">
          {drawerFund && <FundDetail fund={drawerFund} lang={lang} />}
        </SheetContent>
      </Sheet>

      {/* COMPARE MODAL */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lang === "pt" ? "Comparar fundos" : "Compare funds"}</DialogTitle>
          </DialogHeader>
          <CompareGrid funds={compareFunds} lang={lang} />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

function StatCard({
  label, fund, value, tone, loading,
}: { label: string; fund: string | undefined; value: string; tone: "gold" | "success"; loading: boolean }) {
  return (
    <div className="surface-card p-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-3 font-display text-3xl font-bold md:text-4xl ${tone === "gold" ? "text-gradient-gold" : "text-[color:var(--success)]"}`}>
        {loading ? "…" : value}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{loading ? "—" : fund ?? "—"}</div>
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
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
  children, k, cur, dir, onClick, align = "left",
}: { children: React.ReactNode; k: SortKey; cur: SortKey; dir: "asc" | "desc"; onClick: (k: SortKey) => void; align?: "left" | "right" }) {
  const active = cur === k;
  return (
    <th className={`px-4 py-3 ${align === "right" ? "text-right" : ""}`}>
      <button
        onClick={() => onClick(k)}
        className={`inline-flex items-center gap-1 uppercase tracking-wider ${active ? "text-foreground" : ""}`}
      >
        {children}
        {active ? (
          dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

function InfoHint({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground/70 hover:text-gold" onClick={(e) => e.stopPropagation()}>
          <Info className="h-3 w-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[220px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

function FundDetail({ fund, lang }: { fund: FundRow; lang: "en" | "pt" }) {
  const history = (fund.history_5y as unknown as HistoryPoint[] | null) ?? [];
  const holdings = (fund.top_holdings as unknown as Holding[] | null) ?? [];
  const chartData = history.map((p) => ({ date: p.d, value: p.v }));
  const maxWeight = holdings.reduce((m, h) => Math.max(m, h.weight), 0) || 1;

  return (
    <>
      <SheetHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${typeBadgeClass(fund.product_type)}`}>
                {na(fund.product_type)}
              </Badge>
              <span className="text-xs text-muted-foreground">{fund.ticker_symbol ?? fund.symbol}</span>
            </div>
            <SheetTitle className="mt-2 font-display text-2xl">{fund.fund_name}</SheetTitle>
            <div className="mt-1 text-xs text-muted-foreground">
              {fund.provider} · {fund.category} · {fund.region}
            </div>
          </div>
        </div>
      </SheetHeader>

      {/* 5Y chart */}
      <div className="mt-6 rounded-2xl border border-border bg-foreground/[0.02] p-4">
        <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          {lang === "pt" ? "Histórico 5 anos" : "5-Year Performance"}
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" hide />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" domain={["auto", "auto"]} />
              <RTooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [v.toFixed(2), lang === "pt" ? "Valor" : "Value"]}
              />
              <Line type="monotone" dataKey="value" stroke="var(--gold)" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings */}
      <div className="mt-6">
        <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          {lang === "pt" ? "Principais posições" : "Top holdings"}
        </div>
        {holdings.length === 0 ? (
          <div className="text-sm text-muted-foreground">N/A</div>
        ) : (
          <ul className="space-y-2">
            {holdings.slice(0, 5).map((h) => (
              <li key={h.name} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div>
                  <div className="text-sm">{h.name}</div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, (h.weight / maxWeight) * 100)}%` }} />
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{h.weight.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Product details */}
      <div className="mt-6 rounded-2xl border border-border bg-foreground/[0.02] p-4">
        <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
          {lang === "pt" ? "Detalhes do produto" : "Product details"}
        </div>
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <Row label={lang === "pt" ? "Tipo" : "Type"} value={na(fund.product_type)} />
          <Row label={lang === "pt" ? "Ticker" : "Ticker"} value={na(fund.ticker_symbol ?? fund.symbol)} />
          <Row label={lang === "pt" ? "Moeda" : "Currency"} value={na(fund.currency)} />
          <Row label={lang === "pt" ? "Freq. dividendos" : "Dividend freq."} value={na(fund.dividend_frequency)} />
          <Row label={lang === "pt" ? "Investimento mín." : "Min. investment"} value={fund.min_investment != null ? fmtMoney(fund.min_investment) : "N/A"} />
          <Row label={lang === "pt" ? "Classes de ações" : "Share classes"} value={na(fund.share_classes)} />
        </dl>
      </div>

      {/* Description */}
      {fund.description && (
        <div className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {fund.description}
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </>
  );
}

function CompareGrid({ funds, lang }: { funds: FundRow[]; lang: "en" | "pt" }) {
  if (funds.length === 0) return null;
  const rows: Array<{ label: string; get: (f: FundRow) => string }> = [
    { label: lang === "pt" ? "Tipo" : "Type", get: (f) => na(f.product_type) },
    { label: lang === "pt" ? "Ticker" : "Ticker", get: (f) => na(f.ticker_symbol ?? f.symbol) },
    { label: lang === "pt" ? "Categoria" : "Category", get: (f) => f.category },
    { label: lang === "pt" ? "Região" : "Region", get: (f) => f.region },
    { label: "1Y", get: (f) => fmtPct(f.return_1y) },
    { label: "3Y", get: (f) => fmtPct(f.return_3y) },
    { label: lang === "pt" ? "Taxa" : "Expense", get: (f) => fmtExp(f.expense_ratio) },
    { label: "AUM", get: (f) => fmtAum(f.aum) },
    { label: lang === "pt" ? "Investimento mín." : "Min. investment", get: (f) => (f.min_investment != null ? fmtMoney(f.min_investment) : "N/A") },
    { label: lang === "pt" ? "Freq. dividendos" : "Dividend freq.", get: (f) => na(f.dividend_frequency) },
  ];
  return (
    <div className="mt-2 grid gap-4" style={{ gridTemplateColumns: `repeat(${funds.length}, minmax(0, 1fr))` }}>
      {funds.map((f) => (
        <div key={f.symbol} className="rounded-2xl border border-border bg-foreground/[0.02] p-4">
          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${typeBadgeClass(f.product_type)}`}>
            {na(f.product_type)}
          </Badge>
          <div className="mt-2 font-display text-lg font-semibold leading-tight">{f.fund_name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{f.provider}</div>
          <dl className="mt-4 space-y-2 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-2 border-b border-border/50 pb-2 last:border-0">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{r.label}</dt>
                <dd className="text-right font-medium">{r.get(f)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
