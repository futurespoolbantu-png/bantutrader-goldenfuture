import { createFileRoute } from "@tanstack/react-router";
import { Zap, Eye, ShieldCheck, Sparkles, TrendingUp, Scale } from "lucide-react";
import samuelson from "@/assets/samuelson-gomes.jpg.asset.json";
import paulo from "@/assets/paulo-domingos.jpg.asset.json";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bantu Trader Capital Asset Management" },
      {
        name: "description",
        content:
          "Founded 2022. Built by traders, for investors. Discipline, transparency, performance and integrity guide every allocation.",
      },
      { property: "og:title", content: "About — Bantu Trader Capital" },
      { property: "og:description", content: "Where capital is managed with precision." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("abt.badge")}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            {t("abt.title1")} <span className="text-gradient-gold">{t("abt.title2")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t("abt.subtitle")}</p>
          <span className="mt-8 inline-flex rounded-full border border-border bg-surface px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gold">
            {t("abt.founded")}
          </span>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { Icon: Zap, title: t("abt.mission"), body: t("abt.missionBody") },
            { Icon: Eye, title: t("abt.vision"), body: t("abt.visionBody") },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="surface-card h-full p-8">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <b.Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{b.title}</h3>
                <p className="mt-3 text-muted-foreground">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-4 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("abt.structured")}
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            {t("abt.altTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="surface-card mx-auto mt-12 max-w-3xl overflow-hidden p-14 relative">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-20"
              style={{ background: "radial-gradient(circle at 50% 0%, var(--gold), transparent 60%)" }}
            />
            <div className="font-display text-5xl font-bold leading-tight md:text-6xl">
              {t("abt.built1")}
              <br />
              <span className="text-gradient-gold">{t("abt.built2")}</span>
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("abt.founded2")}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-4">
        <Reveal className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("abt.leadership")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("abt.meet")}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { img: samuelson.url, name: "Samuelson Gomes", role: "CEO", bio: t("abt.teamBio") },
            { img: paulo.url, name: "Paulo Domingos", role: "CIO", bio: t("abt.teamBio") },
          ].map((m) => (
            <Reveal key={m.name}>
              <div className="surface-card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-surface-2">
                  <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-gold">{m.role}</div>
                  <div className="mt-2 font-display text-2xl font-bold">{m.name}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("abt.values")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("abt.stand")}</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: ShieldCheck, title: t("abt.v1t"), body: t("abt.v1b") },
            { Icon: Eye, title: t("abt.v2t"), body: t("abt.v2b") },
            { Icon: TrendingUp, title: t("abt.v3t"), body: t("abt.v3b") },
            { Icon: Scale, title: t("abt.v4t"), body: t("abt.v4b") },
          ].map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="surface-card group h-full p-6 transition-colors hover:border-gold/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                  <v.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4">
        <div className="surface-card p-8 md:p-10">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { v: 4, s: "", label: t("stats.years") },
              { v: 2, s: "", label: t("stats.strategies") },
              { v: 100, s: "%", label: t("abt.owned") },
              { v: 2022, s: "", label: t("abt.foundedLabel") },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl font-bold text-gradient-gold">
                  <AnimatedCounter value={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-24 flex justify-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-gold" /> {t("abt.est")}
        </span>
      </div>
    </>
  );
}
