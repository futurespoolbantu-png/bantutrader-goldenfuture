import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Bantu Trader Capital" },
      {
        name: "description",
        content:
          "Market analysis, investment education, and company updates from Bantu Trader Capital Asset Management.",
      },
      { property: "og:title", content: "Insights — Bantu Trader Capital" },
      { property: "og:description", content: "News & insights from our team of managers and analysts." },
    ],
  }),
  component: Blog,
});

const categories = ["All", "Market Analysis", "Investment Tips", "Company News", "Education"] as const;
type Cat = (typeof categories)[number];

const featured = {
  img: heroBg,
  cat: "Market Analysis" as Cat,
  title: "The 2026 Macro Setup: Positioning for Divergent Rate Regimes",
  excerpt:
    "Central bank policy is fragmenting. Here's how we're building resilience into every strategy tier while capturing opportunity across emerging FX.",
  date: "Dec 02, 2025",
  read: "8 min read",
};

const posts: {
  img: string;
  cat: Cat;
  title: string;
  excerpt: string;
  date: string;
  read: string;
}[] = [
  {
    img: blog1,
    cat: "Market Analysis",
    title: "Q4 2025 Currency Outlook: Rand Volatility & Global Cycles",
    excerpt:
      "How major central bank divergence is reshaping opportunities across emerging FX pairs.",
    date: "Nov 12, 2025",
    read: "6 min read",
  },
  {
    img: blog2,
    cat: "Education",
    title: "Why Segregated Accounts Matter More Than Ever",
    excerpt: "A plain-language guide to client-owned account structures and what they protect.",
    date: "Oct 30, 2025",
    read: "4 min read",
  },
  {
    img: blog3,
    cat: "Company News",
    title: "Bantu Trader Capital Onboards Institutional Prime Broker",
    excerpt: "New execution pathways deliver tighter spreads and improved slippage control.",
    date: "Oct 18, 2025",
    read: "3 min read",
  },
  {
    img: blog4,
    cat: "Investment Tips",
    title: "Risk Sizing: The Underrated Edge in Long-Term Compounding",
    excerpt: "Position sizing frameworks used by disciplined managers to survive drawdowns.",
    date: "Oct 05, 2025",
    read: "5 min read",
  },
  {
    img: blog1,
    cat: "Market Analysis",
    title: "USD/ZAR Technical Map: Structural Levels Into Year-End",
    excerpt: "Key support and resistance zones our desk is tracking heading into December.",
    date: "Sep 28, 2025",
    read: "5 min read",
  },
  {
    img: blog4,
    cat: "Education",
    title: "Understanding CAGR vs. Simple Returns",
    excerpt: "The compounding math that separates good portfolios from great ones.",
    date: "Sep 14, 2025",
    read: "4 min read",
  },
];

const catClass = (c: Cat) => {
  switch (c) {
    case "Market Analysis":
      return "bg-gold/15 text-gold";
    case "Education":
      return "bg-white/10 text-foreground";
    case "Company News":
      return "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.85_0.18_155)]";
    case "Investment Tips":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-white/10 text-foreground";
  }
};

function Blog() {
  const [filter, setFilter] = useState<Cat>("All");
  const filtered = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.cat === filter)),
    [filter],
  );

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Investment Insights
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            News & <span className="text-gradient-gold">Insights</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Market commentary, portfolio thinking and educational deep-dives from our management
            desk.
          </p>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <Reveal>
          <article className="surface-card group grid overflow-hidden md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <img
                src={featured.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className={`rounded-full px-3 py-1 font-semibold uppercase ${catClass(featured.cat)}`}>
                  {featured.cat}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {featured.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {featured.read}
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <a
                href="#"
                className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:scale-[1.03] transition-transform"
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Filters */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <article className="surface-card group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${catClass(p.cat)}`}
                  >
                    {p.cat}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium backdrop-blur">
                    <Clock className="h-3 w-3" /> {p.read}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
