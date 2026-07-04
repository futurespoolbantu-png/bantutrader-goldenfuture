import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Layers,
  Activity,
  FileBarChart,
  Award,
  Sparkles,
  BadgeDollarSign,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bantu Trader Capital — Precision Trading. Powerful Results." },
      {
        name: "description",
        content:
          "9 years in the forex industry. Tiered investment portfolios, institutional risk oversight, and 100% client-owned accounts.",
      },
      { property: "og:title", content: "Bantu Trader Capital — Asset Management" },
      {
        property: "og:description",
        content:
          "Precision trading, transparent reporting, and institutional oversight for serious investors.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Regulator bar */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="surface-card flex flex-wrap items-center justify-center gap-3 px-5 py-3 text-center text-xs text-muted-foreground md:text-sm">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <span>
            <span className="text-foreground">Bantu Trader Capital</span> operates as a Juristic
            Representative under <span className="text-foreground">Sovereign Trust Financial</span>,
            an authorized Category II FSP{" "}
            <span className="text-gold">(FSP No. 45219)</span>
          </span>
        </div>
      </section>

      {/* HERO */}
      <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden px-4">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(60%_60%_at_60%_50%,black,transparent)]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              9 Years in the Forex Industry · FSP 45219
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Precision Trading
              <br />
              <span className="text-gradient-gold">Powerful</span>
              <br />
              Results.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Segregated client-owned accounts, professional discretionary management, disciplined
              execution and institutional-grade risk supervision. Built for investors who demand
              transparency and results.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
              >
                <Lock className="h-4 w-4" /> Book a Consultation
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="surface-card relative overflow-hidden p-6 shadow-elegant">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Performance Overview
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold">Live Snapshot</div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-pulse-dot rounded-full bg-[oklch(0.78_0.19_155)]" />
                    <span className="relative rounded-full bg-[oklch(0.78_0.19_155)]" />
                  </span>
                  <span className="text-foreground">live</span>
                </div>
              </div>

              {[
                {
                  Icon: Award,
                  label: "Industry Experience",
                  value: "9 Years",
                  badge: "FOREX",
                  badgeClass: "bg-foreground/10 text-foreground",
                },
                {
                  Icon: Layers,
                  label: "Investment Strategies",
                  value: "2 Strategies",
                  badge: "20–35%",
                  badgeClass: "bg-gold/15 text-gold",
                },
                {
                  Icon: ShieldCheck,
                  label: "Regulation Status",
                  value: "FSP 45219",
                  badge: "FSCA",
                  badgeClass:
                    "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="mb-3 flex items-center justify-between rounded-2xl border border-border bg-background/50 p-4 last:mb-0"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                      <r.Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {r.label}
                      </div>
                      <div className="truncate font-display text-xl font-bold">{r.value}</div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${r.badgeClass}`}
                  >
                    {r.badge}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Feature grid */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Why Investors Choose Us
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Institutional discipline. Transparent execution.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Award,
              title: "Verified 9-Year Track Record",
              body: "Live, audited performance across multiple market cycles.",
            },
            {
              Icon: Layers,
              title: "Tiered Investment Portfolios",
              body: "Low, medium and high-risk strategies tailored to your goals and appetite.",
            },
            {
              Icon: Activity,
              title: "Strategy Oversight & Risk",
              body: "Daily reviews with strict drawdown limits and controlled risk exposure.",
            },
            {
              Icon: FileBarChart,
              title: "Investor Reporting",
              body: "Clear monthly reports and real-time dashboards. Full transparency.",
            },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="surface-card group h-full p-6 transition-colors hover:border-gold/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                  <f.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live performance ticker */}
      <LivePerformance />

      {/* About preview */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              About Bantu Trader Capital
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              Where Investors Meet <span className="text-gradient-gold">Results</span> & Capital
              Runs Deep.
            </h2>
            <p className="mt-5 text-muted-foreground">
              We combine nine years of forex market experience with institutional risk frameworks
              to deliver disciplined, transparent portfolio management. Every account is
              client-owned. Every trade is monitored.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: 9, s: "", label: "Years Experience" },
                { v: 2, s: "", label: "Investment Strategies" },
                { v: 24, s: "/7", label: "Risk Monitoring" },
                { v: 100, s: "%", label: "Client-Owned Accounts" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="surface-card p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="font-display text-4xl font-bold text-gradient-gold">
                    <AnimatedCounter value={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Zero Fees */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-8 md:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-gold)" }}
            />
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <BadgeDollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold md:text-4xl">
                  Zero Management Fees
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Performance-based fee structure with no hidden costs. We only win when you win.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
                  <div className="font-display text-4xl font-bold text-[oklch(0.85_0.18_155)]">
                    0%
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    Management Fee
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
                  <div className="font-display text-4xl font-bold text-gold">30%</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    Performance Fee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Partners */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Powered By
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Global Financial Institutions
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            "Sovereign Trust",
            "FSCA",
            "MetaQuotes",
            "Equiti Capital",
            "Interactive Brokers",
            "Bloomberg",
          ].map((p) => (
            <div
              key={p}
              className="surface-card grid h-20 place-items-center px-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Latest Insights
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Market Analysis & News
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              img: blog1,
              cat: "Market Analysis",
              catClass: "bg-gold/15 text-gold",
              title: "Q4 2025 Currency Outlook: Rand Volatility & Global Cycles",
              excerpt:
                "How major central bank divergence is reshaping opportunities across emerging FX pairs.",
              date: "Nov 12, 2025",
              read: "6 min read",
            },
            {
              img: blog2,
              cat: "Education",
              catClass: "bg-foreground/10 text-foreground",
              title: "Why Segregated Accounts Matter More Than Ever",
              excerpt:
                "A plain-language guide to client-owned account structures and what they protect.",
              date: "Oct 30, 2025",
              read: "4 min read",
            },
            {
              img: blog3,
              cat: "Company News",
              catClass: "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]",
              title: "Bantu Trader Capital Onboards Institutional Prime Broker",
              excerpt: "New execution pathways deliver tighter spreads and improved slippage control.",
              date: "Oct 18, 2025",
              read: "3 min read",
            },
            {
              img: blog4,
              cat: "Investment Tips",
              catClass: "bg-destructive/15 text-destructive-foreground",
              title: "Risk Sizing: The Underrated Edge in Long-Term Compounding",
              excerpt:
                "Position sizing frameworks used by disciplined managers to survive drawdowns.",
              date: "Oct 05, 2025",
              read: "5 min read",
            },
          ].map((a, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <article className="surface-card group overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${a.catClass}`}
                    >
                      {a.cat}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {a.date} · {a.read}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug group-hover:text-gold">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <Link
                    to="/blog"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function MobileAppSection() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-4">
      <Reveal className="mb-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
          <Sparkles className="h-3 w-3 text-gold" /> Mobile App Coming Soon
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold md:text-5xl">
          Your portfolio, <span className="text-gradient-gold">in your pocket.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our investor portal is being optimized for mobile. Access your portfolio via our secure
          web dashboard while we prepare a seamless mobile experience.
        </p>
      </Reveal>

      <div className="relative">
        {/* floating badges */}
        <FloatingBadge className="left-2 top-6 hidden md:block" delay={0.2}>
          Aurum Core · 20% Annual Target
        </FloatingBadge>
        <FloatingBadge className="right-2 top-24 hidden md:block" delay={0.4}>
          Sterling Ascend · 35% High-risk 1yr
        </FloatingBadge>
        <FloatingBadge
          className="bottom-10 left-16 hidden md:block"
          delay={0.6}
          tone="success"
        >
          South Africa · Now Available
        </FloatingBadge>

        <div className="mx-auto flex max-w-4xl items-end justify-center gap-4 md:gap-8">
          <Phone tilt="-8deg" scale={0.85}>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Analytics
            </div>
            <div className="mt-1 font-display text-lg font-bold">Strategies</div>
            <div className="mt-4 space-y-3">
              {[
                { n: "Aurum Core", p: 78, tone: "gold" },
                { n: "Aurum Momentum", p: 62, tone: "gold" },
                { n: "Sterling Ascend", p: 91, tone: "success" },
              ].map((s) => (
                <div key={s.n}>
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span>{s.n}</span>
                    <span className="text-muted-foreground">{s.p}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-foreground/10">
                    <div
                      className={`h-full rounded-full ${
                        s.tone === "success" ? "bg-[oklch(0.78_0.19_155)]" : "bg-gold"
                      }`}
                      style={{ width: `${s.p}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Phone>

          <Phone>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Portfolio Overview
            </div>
            <div className="mt-1 font-display text-2xl font-bold">R 1,284,520</div>
            <div className="mt-1 text-[10px] text-[oklch(0.85_0.18_155)]">
              +12.4% · This Quarter
            </div>
            <svg viewBox="0 0 200 70" className="mt-4 h-16 w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.13 82)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.78 0.13 82)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 55 L20 48 L40 52 L60 40 L80 42 L100 30 L120 34 L140 22 L160 26 L180 14 L200 18 L200 70 L0 70 Z"
                fill="url(#g1)"
              />
              <path
                d="M0 55 L20 48 L40 52 L60 40 L80 42 L100 30 L120 34 L140 22 L160 26 L180 14 L200 18"
                fill="none"
                stroke="oklch(0.78 0.13 82)"
                strokeWidth="1.5"
              />
            </svg>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-full bg-gold py-2 text-[10px] font-semibold text-primary-foreground">
                Deposit
              </button>
              <button className="rounded-full border border-border py-2 text-[10px] font-semibold">
                Withdraw
              </button>
            </div>
          </Phone>

          <Phone tilt="8deg" scale={0.85}>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Available
            </div>
            <div className="mt-1 font-display text-lg font-bold">Strategies</div>
            <div className="mt-4 space-y-2">
              {[
                { n: "Aurum Core", pct: "20%", risk: "Low", tone: "success" },
                { n: "Aurum Momentum", pct: "25%", risk: "Medium", tone: "gold" },
                { n: "Sterling Ascend", pct: "35%", risk: "High", tone: "danger" },
              ].map((r) => (
                <div
                  key={r.n}
                  className="rounded-xl border border-border bg-background/50 p-2.5"
                >
                  <div className="text-[10px] font-semibold">{r.n}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">{r.risk} Risk</span>
                    <span
                      className={`text-[10px] font-bold ${
                        r.tone === "success"
                          ? "text-[oklch(0.85_0.18_155)]"
                          : r.tone === "danger"
                            ? "text-destructive"
                            : "text-gold"
                      }`}
                    >
                      {r.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Phone>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          <div className="rounded-full border border-border bg-foreground/5 px-5 py-2 text-xs font-semibold">
            <span className="text-gold">9 Years</span> Track Record
          </div>
          <div className="rounded-full border border-border bg-foreground/5 px-5 py-2 text-xs font-semibold">
            <span className="text-gold">2 Strategy</span> Groups
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone({
  children,
  tilt = "0deg",
  scale = 1,
}: {
  children: React.ReactNode;
  tilt?: string;
  scale?: number;
}) {
  return (
    <div
      className="relative w-[180px] shrink-0 md:w-[220px]"
      style={{ transform: `rotate(${tilt}) scale(${scale})` }}
    >
      <div className="rounded-[2rem] border border-border bg-background p-2 shadow-elegant">
        <div className="rounded-[1.6rem] border border-border bg-surface p-4 aspect-[9/17] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({
  children,
  className = "",
  delay = 0,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tone?: "default" | "success";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute z-10 rounded-full border border-border px-4 py-2 text-xs font-semibold backdrop-blur ${
        tone === "success"
          ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]"
          : "bg-background/70 text-foreground"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

function LivePerformance() {
  const strategies = [
    { n: "Aurum Core", aum: "R 8.2M", risk: "Low", ret: "+21.4%" },
    { n: "Aurum Momentum", aum: "R 12.5M", risk: "Medium", ret: "+26.8%" },
    { n: "Sterling Ascend", aum: "R 5.1M", risk: "High", ret: "+38.2%" },
    { n: "Aurum Balanced", aum: "R 6.4M", risk: "Medium", ret: "+23.9%" },
    { n: "Sterling Alpha", aum: "R 3.7M", risk: "High", ret: "+41.6%" },
    { n: "Aurum Conservative", aum: "R 9.0M", risk: "Low", ret: "+19.7%" },
  ];
  const riskClass = (r: string) =>
    r === "Low"
      ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]"
      : r === "Medium"
        ? "bg-gold/15 text-gold"
        : "bg-destructive/15 text-destructive";

  return (
    <section className="mt-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Live Performance
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Our Investment Strategies
          </h2>
        </Reveal>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {[...strategies, ...strategies].map((s, i) => (
            <div
              key={i}
              className="surface-card w-72 shrink-0 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{s.n}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${riskClass(s.risk)}`}
                >
                  {s.risk}
                </span>
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                AUM
              </div>
              <div className="font-display text-lg font-bold">{s.aum}</div>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                12M Return
              </div>
              <div className="font-display text-3xl font-bold text-[oklch(0.85_0.18_155)]">
                {s.ret}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-3xl px-4 text-center text-xs text-muted-foreground">
        Past performance is not indicative of future results. All returns are annualized.
      </p>
    </section>
  );
}
