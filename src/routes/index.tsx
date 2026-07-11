import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Layers,
  Activity,
  FileBarChart,
  Award,
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
import { useI18n } from "@/lib/i18n";
import { AfricanPattern } from "@/components/AfricanPattern";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bantu Trade Capital — Gestão de Capital Institucional" },
      {
        name: "description",
        content:
          "4 anos de track record documentado. Portefólios em escalões, supervisão de risco institucional e contas 100% em nome do cliente.",
      },
      { property: "og:title", content: "Bantu Trade Capital — Gestão de Capital" },
      {
        property: "og:description",
        content:
          "Gestão discricionária, execução disciplinada e relatórios transparentes para investidores exigentes.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto mt-16 max-w-7xl overflow-hidden px-4 md:mt-24 md:px-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(60%_60%_at_60%_50%,black,transparent)]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-african-pattern" aria-hidden="true" />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t("hero.badge")}
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              {t("hero.title1")}
              <br />
              <span className="text-gradient-gold">{t("hero.title2")}</span>
              <br />
              {t("hero.title3")}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-colors hover:bg-gold-dark"
              >
                <Lock className="h-4 w-4" /> {t("nav.consult")}
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold"
              >
                {t("hero.learn")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="surface-card relative overflow-hidden p-6 shadow-elegant">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t("snap.perf")}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold">{t("snap.live")}</div>
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
                  label: t("snap.exp"),
                  value: t("snap.expVal"),
                  badge: "FOREX",
                  badgeClass: "bg-foreground/10 text-foreground",
                },
                {
                  Icon: Layers,
                  label: t("snap.strat"),
                  value: t("snap.stratVal"),
                  badge: "20–35%",
                  badgeClass: "bg-gold/15 text-gold",
                },
                {
                  Icon: ShieldCheck,
                  label: t("snap.reg"),
                  value: t("snap.regVal"),
                  badge: t("snap.regBadge"),
                  badgeClass:
                    "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.55_0.18_155)]",
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
      <section className="relative mx-auto mt-32 max-w-7xl overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-0 bg-african-pattern" aria-hidden="true" />
        <Reveal className="relative mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("feat.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("feat.title")}
          </h2>
        </Reveal>
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Award, title: t("feat.1t"), body: t("feat.1b") },
            { Icon: Layers, title: t("feat.2t"), body: t("feat.2b") },
            { Icon: Activity, title: t("feat.3t"), body: t("feat.3b") },
            { Icon: FileBarChart, title: t("feat.4t"), body: t("feat.4b") },
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
      <section className="relative mx-auto mt-32 max-w-7xl overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-0 bg-african-pattern" aria-hidden="true" />
        <div className="relative grid gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {t("abtp.eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              {t("abtp.title1")} <span className="text-gold">{t("abtp.title2")}</span> {t("abtp.title3")}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {t("abtp.body")}
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {t("abtp.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: 4, s: "", label: t("stats.years") },
                { v: 2, s: "", label: t("stats.strategies") },
                { v: 24, s: "/7", label: t("stats.monitoring") },
                { v: 100, s: "%", label: t("stats.owned") },
              ].map((s, i) => (
                <div
                  key={i}
                  className="surface-card p-6"
                >
                  <div className="font-display text-4xl font-bold text-gold">
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
            <div className="pointer-events-none absolute inset-x-0 bottom-0 text-gold" aria-hidden="true">
              <AfricanPattern variant="stripe" opacity={0.35} />
            </div>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <BadgeDollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold md:text-4xl">
                  {t("zf.title")}
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  {t("zf.body")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
                  <div className="font-display text-4xl font-bold text-[oklch(0.55_0.18_155)]">
                    0%
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {t("zf.mgmt")}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
                  <div className="font-display text-4xl font-bold text-gold">30%</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {t("zf.perf")}
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
            {t("part.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            {t("part.title")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
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
              {t("ins.eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              {t("ins.title")}
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold"
          >
            {t("ins.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              img: blog1,
              cat: t("blog.catMarket"),
              catClass: "bg-gold/15 text-gold",
              title: t("blog.p1.title"),
              excerpt: t("blog.p1.exc"),
              date: lang === "pt" ? "12 Nov, 2025" : "Nov 12, 2025",
              read: `6 ${t("blog.min")}`,
            },
            {
              img: blog2,
              cat: t("blog.catEdu"),
              catClass: "bg-foreground/10 text-foreground",
              title: t("blog.p2.title"),
              excerpt: t("blog.p2.exc"),
              date: lang === "pt" ? "30 Out, 2025" : "Oct 30, 2025",
              read: `4 ${t("blog.min")}`,
            },
            {
              img: blog3,
              cat: t("blog.catNews"),
              catClass: "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.55_0.18_155)]",
              title: t("blog.p3.title"),
              excerpt: t("blog.p3.exc"),
              date: lang === "pt" ? "18 Out, 2025" : "Oct 18, 2025",
              read: `3 ${t("blog.min")}`,
            },
            {
              img: blog4,
              cat: t("blog.catTips"),
              catClass: "bg-destructive/15 text-destructive-foreground",
              title: t("blog.p4.title"),
              excerpt: t("blog.p4.exc"),
              date: lang === "pt" ? "05 Out, 2025" : "Oct 05, 2025",
              read: `5 ${t("blog.min")}`,
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
                    {t("ins.readMore")} <ArrowRight className="h-3.5 w-3.5" />
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
  const { t } = useI18n();
  return (
    <section className="mx-auto mt-32 max-w-7xl px-4">
      <Reveal className="mb-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("app.badge")}
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold md:text-5xl">
          {t("app.title1")} <span className="text-gold">{t("app.title2")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {t("app.subtitle")}
        </p>
      </Reveal>

      <div className="relative">
        {/* floating badges */}
        <FloatingBadge className="left-2 top-6 hidden md:block" delay={0.2}>
          {t("app.floating1")}
        </FloatingBadge>
        <FloatingBadge className="right-2 top-24 hidden md:block" delay={0.4}>
          {t("app.floating2")}
        </FloatingBadge>
        <FloatingBadge
          className="bottom-10 left-16 hidden md:block"
          delay={0.6}
          tone="success"
        >
          {t("app.floating3")}
        </FloatingBadge>

        <div className="mx-auto flex max-w-4xl items-end justify-center gap-4 md:gap-8">
          <Phone tilt="-8deg" scale={0.85}>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {t("app.analytics")}
            </div>
            <div className="mt-1 font-display text-lg font-bold">{t("app.strategies")}</div>
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
                        s.tone === "success" ? "bg-[oklch(0.55_0.18_155)]" : "bg-gold"
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
              {t("app.portfolio")}
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-muted-foreground">R •••,•••</div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {t("app.quarter")}
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
                {t("app.deposit")}
              </button>
              <button className="rounded-full border border-border py-2 text-[10px] font-semibold">
                {t("app.withdraw")}
              </button>
            </div>
          </Phone>

          <Phone tilt="8deg" scale={0.85}>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {t("app.available")}
            </div>
            <div className="mt-1 font-display text-lg font-bold">{t("app.strategies")}</div>
            <div className="mt-4 space-y-2">
              {[
                { n: "Aurum Core", status: t("app.active"), risk: t("risk.low"), tone: "success" },
                { n: "Aurum Momentum", status: t("app.active"), risk: t("risk.medium"), tone: "gold" },
                { n: "Sterling Ascend", status: t("app.active"), risk: t("risk.high"), tone: "danger" },
              ].map((r) => (
                <div
                  key={r.n}
                  className="rounded-xl border border-border bg-background/50 p-2.5"
                >
                  <div className="text-[10px] font-semibold">{r.n}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">{r.risk} {t("app.risk")}</span>
                    <span
                      className={`text-[10px] font-bold ${
                        r.tone === "success"
                          ? "text-[oklch(0.55_0.18_155)]"
                          : r.tone === "danger"
                            ? "text-destructive"
                            : "text-gold"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Phone>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          <div className="rounded-full border border-border bg-foreground/5 px-5 py-2 text-xs font-semibold">
            <span className="text-gold">4 {t("stats.years").split(" ")[0]}</span> {t("app.badge1")}
          </div>
          <div className="rounded-full border border-border bg-foreground/5 px-5 py-2 text-xs font-semibold">
            <span className="text-gold">2</span> {t("app.badge2")}
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
          ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.55_0.18_155)]"
          : "bg-background/70 text-foreground"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

function LivePerformance() {
  const { t } = useI18n();

  return (
    <section className="mt-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("live.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("live.title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="surface-card mx-auto max-w-2xl p-10 text-center">
            <div className="font-display text-3xl font-bold text-gradient-gold">
              {t("live.trackRecord")}
            </div>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
              {t("live.pending")}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {t("live.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-3xl px-4 text-center text-xs text-muted-foreground">
          {t("live.disclaimer")}
        </p>
      </div>
    </section>
  );
}
