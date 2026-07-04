import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ArrowRight, Lock, FileText, Wallet, LineChart, UserPlus, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Investment Strategies — Bantu Trader Capital" },
      {
        name: "description",
        content:
          "Explore the Aurum and Sterling investment portfolios. Compare risk levels, target returns, and use our exposure calculator.",
      },
      { property: "og:title", content: "Investment Strategies — Bantu Trader Capital" },
      { property: "og:description", content: "Two strategy families designed for different risk profiles." },
    ],
  }),
  component: Products,
});

type Group = "aurum" | "sterling";

const groupData: Record<Group, {
  label: string;
  tiers: {
    key: string;
    name: string;
    tier: string;
    target: string;
    targetTone: "gold" | "success" | "danger";
    risk: string;
    riskTone: "success" | "gold" | "danger";
    period: string;
    focus: string;
  }[];
}> = {
  aurum: {
    label: "Aurum",
    tiers: [
      { key: "core", name: "Aurum Core", tier: "Low", target: "20%", targetTone: "gold", risk: "Low Risk", riskTone: "success", period: "5 years", focus: "Conservative" },
      { key: "mom", name: "Aurum Momentum", tier: "Medium", target: "25%", targetTone: "gold", risk: "Medium Risk", riskTone: "gold", period: "3 years", focus: "Balanced" },
      { key: "asc", name: "Aurum Ascend", tier: "High", target: "35%", targetTone: "success", risk: "Higher Risk", riskTone: "danger", period: "1 year", focus: "Aggressive" },
    ],
  },
  sterling: {
    label: "Sterling",
    tiers: [
      { key: "sc", name: "Sterling Core", tier: "Low", target: "18%", targetTone: "gold", risk: "Low Risk", riskTone: "success", period: "5 years", focus: "Conservative" },
      { key: "sm", name: "Sterling Momentum", tier: "Medium", target: "28%", targetTone: "gold", risk: "Medium Risk", riskTone: "gold", period: "3 years", focus: "Balanced" },
      { key: "sa", name: "Sterling Alpha", tier: "High", target: "38%", targetTone: "success", risk: "Higher Risk", riskTone: "danger", period: "1 year", focus: "Aggressive" },
    ],
  },
};

const toneClass = (t: "gold" | "success" | "danger") =>
  t === "success"
    ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]"
    : t === "danger"
      ? "bg-destructive/15 text-destructive"
      : "bg-gold/15 text-gold";

function Products() {
  const [group, setGroup] = useState<Group>("aurum");
  const g = groupData[group];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Investment Strategies
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] md:text-6xl">
            Choose Your Path to <span className="text-gradient-gold">Financial Growth</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Two portfolio families designed for different risk profiles — from steady compounding to
            aggressive alpha capture, all under institutional risk oversight.
          </p>
        </Reveal>
      </section>

      {/* Strategy explained */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Strategy Explained
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Compare tiers side by side
            </h2>
          </div>
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(Object.keys(groupData) as Group[]).map((k) => (
              <button
                key={k}
                onClick={() => setGroup(k)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  group === k
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {groupData[k].label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="surface-card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-xs uppercase tracking-widest text-muted-foreground">
                    Feature
                  </th>
                  {g.tiers.map((t) => (
                    <th key={t.key} className="p-5">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {t.tier}
                      </div>
                      <div className="mt-1 font-display text-base font-bold">{t.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-0">
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">Target Returns</td>
                  {g.tiers.map((t) => (
                    <td key={t.key} className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${toneClass(t.targetTone)}`}
                      >
                        {t.target}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">Risk Level</td>
                  {g.tiers.map((t) => (
                    <td key={t.key} className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClass(t.riskTone)}`}
                      >
                        {t.risk}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">Recommended Period</td>
                  {g.tiers.map((t) => (
                    <td key={t.key} className="p-5 font-semibold">{t.period}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">Strategy Focus</td>
                  {g.tiers.map((t) => (
                    <td key={t.key} className="p-5 font-semibold">{t.focus}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">Asset Classes</td>
                  <td className="p-5 text-center font-semibold text-gold" colSpan={3}>
                    CFDs & Commodities
                  </td>
                </tr>
                {["Monthly Reporting", "Real-time Dashboard", "Dedicated Support"].map((row) => (
                  <tr key={row}>
                    <td className="p-5 font-medium text-muted-foreground">{row}</td>
                    {g.tiers.map((t) => (
                      <td key={t.key} className="p-5">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Calculator */}
      <ExposureCalculator />

      {/* 4 Steps */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Onboarding
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Get started in four simple steps
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: UserPlus, title: "Open Account", body: "Complete KYC and account opening in minutes with digital verification." },
            { Icon: Target, title: "Choose Strategy", body: "Pick the tier that matches your objectives and risk appetite." },
            { Icon: Wallet, title: "Fund Account", body: "Transfer capital to your fully segregated, client-owned account." },
            { Icon: LineChart, title: "Track Performance", body: "Monitor allocations and returns in real time via the investor dashboard." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="surface-card group h-full p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-white/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-32 max-w-5xl px-4">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-10 text-center md:p-16">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-30"
              style={{ background: "radial-gradient(circle at 50% 100%, var(--gold), transparent 60%)" }}
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Ready to Start?
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">
              Start Investing <span className="text-gradient-gold">Today</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Speak with our team about which strategy fits your goals. No management fee — only
              performance-aligned incentives.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold hover:scale-[1.03] transition-transform"
              >
                <Lock className="h-4 w-4" /> Book a Consultation
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold"
              >
                <FileText className="h-4 w-4" /> View Brochure
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ExposureCalculator() {
  const [amount, setAmount] = useState(100000);
  const [strategy, setStrategy] = useState("aurum-prime");

  const rates = useMemo(
    () => ({
      "aurum-prime": { low: 0.26, med: 0.4, high: 0.7 },
      "aurum-core": { low: 0.2, med: 0.32, high: 0.55 },
      "sterling-alpha": { low: 0.28, med: 0.45, high: 0.75 },
    }),
    [],
  );

  const r = rates[strategy as keyof typeof rates];
  const fmt = (n: number) =>
    "R " + Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const rows = [
    {
      label: "Low",
      tone: "success" as const,
      rate: r.low,
    },
    { label: "Medium", tone: "gold" as const, rate: r.med },
    { label: "High", tone: "danger" as const, rate: r.high },
  ];

  return (
    <section className="mx-auto mt-32 max-w-7xl px-4">
      <Reveal className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Interactive Tool
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Strategy Exposure Calculator
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Model potential outcomes across risk tiers. Values update in real time.
        </p>
      </Reveal>

      <Reveal>
        <div className="surface-card p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Investment Amount
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-black/30 px-5 py-3">
                <span className="text-gold">R</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none"
                />
              </div>
            </label>
            <label className="block">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Strategy
              </div>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full rounded-full border border-border bg-black/30 px-5 py-3 text-sm font-semibold outline-none focus:border-gold"
              >
                <option value="aurum-prime">Aurum Prime</option>
                <option value="aurum-core">Aurum Core</option>
                <option value="sterling-alpha">Sterling Alpha</option>
              </select>
            </label>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-xs uppercase tracking-widest text-muted-foreground">
                    Exposure
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-muted-foreground">
                    Return p.a. (compounding)
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-muted-foreground">
                    1-Year Projected Value
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-0">
                {rows.map((row) => {
                  const gain = amount * row.rate;
                  const total = amount + gain;
                  return (
                    <tr key={row.label}>
                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClass(row.tone)}`}
                        >
                          {row.label}
                        </span>
                      </td>
                      <td className="p-4 font-display text-lg font-bold">
                        <span className={toneTextClass(row.tone)}>
                          {(row.rate * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-display text-lg font-bold">{fmt(total)}</div>
                        <div className={`text-xs ${toneTextClass(row.tone)}`}>
                          +{fmt(gain)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            *Projected returns are estimates based on historical CAGR and are not guaranteed. Past
            performance does not guarantee future results.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function toneTextClass(t: "gold" | "success" | "danger") {
  return t === "success"
    ? "text-[oklch(0.85_0.18_155)]"
    : t === "danger"
      ? "text-destructive"
      : "text-gold";
}
