import { createFileRoute } from "@tanstack/react-router";
import { Zap, Eye, ShieldCheck, Sparkles, TrendingUp, Scale } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bantu Trader Capital Asset Management" },
      {
        name: "description",
        content:
          "Founded 2025. Built by traders, for investors. Discipline, transparency, performance and integrity guide every allocation.",
      },
      { property: "og:title", content: "About — Bantu Trader Capital" },
      { property: "og:description", content: "Where capital is managed with precision." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> About Bantu Trader Capital
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Where Capital Is Managed <span className="text-gradient-gold">With Precision.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Bantu Trader Capital Asset Management operates as a Juristic Representative of Sovereign
            Trust Financial, delivering disciplined portfolio management under institutional
            standards.
          </p>
          <span className="mt-8 inline-flex rounded-full border border-border bg-surface px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gold">
            2025 · Founded
          </span>
        </Reveal>
      </section>

      {/* Mission / Vision */}
      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              Icon: Zap,
              title: "Our Mission",
              body: "To deliver institutional-grade portfolio management to sophisticated investors — combining discipline, transparency and technology so every rand of capital is stewarded with intent.",
            },
            {
              Icon: Eye,
              title: "Our Vision",
              body: "To become the reference asset manager for African investors seeking access to global markets with the safeguards, structure and reporting they deserve.",
            },
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

      {/* Alternative capital */}
      <section className="mx-auto mt-32 max-w-6xl px-4 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Structured Capital
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            Where Alternative Capital Finds Structure
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="surface-card mx-auto mt-12 max-w-3xl overflow-hidden p-14">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-20"
              style={{ background: "radial-gradient(circle at 50% 0%, var(--gold), transparent 60%)" }}
            />
            <div className="font-display text-5xl font-bold leading-tight md:text-6xl">
              Built by Traders,
              <br />
              <span className="text-gradient-gold">For Investors</span>
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Founded 2025
            </div>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      <section className="mx-auto mt-32 max-w-6xl px-4">
        <Reveal className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Leadership
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Meet the team</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { img: team1, name: "Thabo Mokoena", role: "Founder & CEO" },
            { img: team2, name: "Naledi Dlamini", role: "Analyst & Strategist" },
          ].map((m) => (
            <Reveal key={m.name}>
              <div className="surface-card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-gold">{m.role}</div>
                  <div className="mt-2 font-display text-2xl font-bold">{m.name}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Our Core Values
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">What we stand for</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: ShieldCheck, title: "Discipline", body: "Rules-based execution and drawdown limits enforced daily." },
            { Icon: Eye, title: "Transparency", body: "Full reporting. Segregated accounts. No black boxes." },
            { Icon: TrendingUp, title: "Performance", body: "Aligned incentives. We only win when clients win." },
            { Icon: Scale, title: "Integrity", body: "Regulated, audited and accountable to every investor." },
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

      {/* Stats */}
      <section className="mx-auto mt-32 max-w-7xl px-4">
        <div className="surface-card p-8 md:p-10">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { v: 9, s: "", label: "Years Experience" },
              { v: 2, s: "", label: "Investment Strategies" },
              { v: 100, s: "%", label: "Client Owned" },
              { v: 2025, s: "", label: "Founded" },
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
          <Sparkles className="h-3.5 w-3.5 text-gold" /> Est. 2025 · Johannesburg
        </span>
      </div>
    </>
  );
}
