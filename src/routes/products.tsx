import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Lock,
  FileText,
  Wallet,
  LineChart,
  UserPlus,
  Target,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Investment Strategies — Bantu Trade Capital" },
      {
        name: "description",
        content:
          "Explore the Aurum and Sterling investment portfolios. Compare risk levels and discover your investor profile.",
      },
      { property: "og:title", content: "Investment Strategies — Bantu Trade Capital" },
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
    risk: string;
    riskTone: "success" | "gold" | "danger";
    period: string;
    focus: string;
  }[];
}> = {
  aurum: {
    label: "Aurum",
    tiers: [
      { key: "core", name: "Aurum Core", tier: "Low", risk: "Low Risk", riskTone: "success", period: "5 years", focus: "Conservative" },
      { key: "mom", name: "Aurum Momentum", tier: "Medium", risk: "Medium Risk", riskTone: "gold", period: "3 years", focus: "Balanced" },
      { key: "asc", name: "Aurum Ascend", tier: "High", risk: "Higher Risk", riskTone: "danger", period: "1 year", focus: "Aggressive" },
    ],
  },
  sterling: {
    label: "Sterling",
    tiers: [
      { key: "sc", name: "Sterling Core", tier: "Low", risk: "Low Risk", riskTone: "success", period: "5 years", focus: "Conservative" },
      { key: "sm", name: "Sterling Momentum", tier: "Medium", risk: "Medium Risk", riskTone: "gold", period: "3 years", focus: "Balanced" },
      { key: "sa", name: "Sterling Alpha", tier: "High", risk: "Higher Risk", riskTone: "danger", period: "1 year", focus: "Aggressive" },
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
  const { t } = useI18n();
  const [group, setGroup] = useState<Group>("aurum");
  const g = groupData[group];

  const tierLabel = (tier: string) =>
    tier === "Low" ? t("prod.tierLow") : tier === "Medium" ? t("prod.tierMed") : t("prod.tierHigh");
  const riskLabel = (r: string) =>
    r === "Low Risk" ? t("prod.riskLow") : r === "Medium Risk" ? t("prod.riskMed") : t("prod.riskHigh");
  const focusLabel = (f: string) =>
    f === "Conservative" ? t("prod.focusCons") : f === "Balanced" ? t("prod.focusBal") : t("prod.focusAgg");
  const periodLabel = (p: string) =>
    p === "5 years" ? t("prod.years5") : p === "3 years" ? t("prod.years3") : t("prod.year1");

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("prod.badge")}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] md:text-6xl">
            {t("prod.title1")} <span className="text-gradient-gold">{t("prod.title2")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t("prod.subtitle")}</p>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {t("prod.explained")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {t("prod.compare")}
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
                    {t("prod.feature")}
                  </th>
                  {g.tiers.map((tier) => (
                    <th key={tier.key} className="p-5">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {tierLabel(tier.tier)}
                      </div>
                      <div className="mt-1 font-display text-base font-bold">{tier.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-0">
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">{t("prod.riskLvl")}</td>
                  {g.tiers.map((tier) => (
                    <td key={tier.key} className="p-5">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClass(tier.riskTone)}`}>
                        {riskLabel(tier.risk)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">{t("prod.period")}</td>
                  {g.tiers.map((tier) => (
                    <td key={tier.key} className="p-5 font-semibold">{periodLabel(tier.period)}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">{t("prod.focus")}</td>
                  {g.tiers.map((tier) => (
                    <td key={tier.key} className="p-5 font-semibold">{focusLabel(tier.focus)}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-muted-foreground">{t("prod.assets")}</td>
                  <td className="p-5 text-center font-semibold text-gold" colSpan={3}>
                    {t("prod.assetsVal")}
                  </td>
                </tr>
                {[t("prod.monthly"), t("prod.dashboard"), t("prod.support")].map((row) => (
                  <tr key={row}>
                    <td className="p-5 font-medium text-muted-foreground">{row}</td>
                    {g.tiers.map((tier) => (
                      <td key={tier.key} className="p-5">
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

      <InvestorProfileQuiz />

      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("onb.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("onb.title")}</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: UserPlus, title: t("onb.1t"), body: t("onb.1b") },
            { Icon: Target, title: t("onb.2t"), body: t("onb.2b") },
            { Icon: Wallet, title: t("onb.3t"), body: t("onb.3b") },
            { Icon: LineChart, title: t("onb.4t"), body: t("onb.4b") },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="surface-card group h-full p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-foreground/10">
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

      <section className="mx-auto mt-32 max-w-5xl px-4">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-10 text-center md:p-16">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-30"
              style={{ background: "radial-gradient(circle at 50% 100%, var(--gold), transparent 60%)" }}
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("cta.badge")}
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">
              {t("cta.title1")} <span className="text-gradient-gold">{t("cta.title2")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("cta.body")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold hover:scale-[1.03] transition-transform"
              >
                <Lock className="h-4 w-4" /> {t("nav.consult")}
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold"
              >
                <FileText className="h-4 w-4" /> {t("cta.brochure")}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function InvestorProfileQuiz() {
  const { t } = useI18n();
  const questions = [
    {
      q: t("quiz.q1"),
      options: [t("quiz.q1.a"), t("quiz.q1.b"), t("quiz.q1.c")],
    },
    {
      q: t("quiz.q2"),
      options: [t("quiz.q2.a"), t("quiz.q2.b"), t("quiz.q2.c")],
    },
    {
      q: t("quiz.q3"),
      options: [t("quiz.q3.a"), t("quiz.q3.b"), t("quiz.q3.c")],
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step >= questions.length;

  const pick = (i: number) => {
    setAnswers((a) => [...a, i]);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="mx-auto mt-32 max-w-4xl px-4">
      <Reveal className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {t("quiz.eyebrow")}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("quiz.title")}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{t("quiz.subtitle")}</p>
      </Reveal>

      <Reveal>
        <div className="surface-card p-6 md:p-10">
          {!done ? (
            <div>
              <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>
                  {t("quiz.progress")} {step + 1} / {questions.length}
                </span>
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        i <= step ? "bg-gold" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                {questions[step].q}
              </h3>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 px-5 py-4 text-left text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
                  >
                    <span>{opt}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold md:text-3xl">
                {t("quiz.resultTitle")}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("quiz.result")}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
                >
                  <Lock className="h-4 w-4" /> {t("quiz.cta")}
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold"
                >
                  <RotateCcw className="h-4 w-4" /> {t("quiz.restart")}
                </button>
              </div>
              <p className="sr-only">answers: {answers.join(",")}</p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
