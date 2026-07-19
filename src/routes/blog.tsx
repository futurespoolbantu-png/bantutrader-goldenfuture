import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { blogPosts, type CatKey } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Bantu Trade Capital" },
      {
        name: "description",
        content:
          "Market analysis, investment education, and company updates from Bantu Trade Capital Asset Management.",
      },
      { property: "og:title", content: "Insights — Bantu Trade Capital" },
      { property: "og:description", content: "News & insights from our team of managers and analysts." },
    ],
  }),
  component: Blog,
});

type FilterKey = "all" | CatKey;
const catKeys: FilterKey[] = ["all", "market", "tips", "news", "edu"];

const catClass = (c: string) => {
  switch (c) {
    case "market":
      return "bg-gold/15 text-gold";
    case "edu":
      return "bg-foreground/10 text-foreground";
    case "news":
      return "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.55_0.18_155)]";
    case "tips":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-foreground/10 text-foreground";
  }
};

function Blog() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<FilterKey>("all");

  const catLabel = (c: FilterKey) =>
    c === "all" ? t("blog.catAll")
    : c === "market" ? t("blog.catMarket")
    : c === "tips" ? t("blog.catTips")
    : c === "news" ? t("blog.catNews")
    : t("blog.catEdu");

  const [featured, ...rest] = blogPosts;

  const filtered = useMemo(
    () => (filter === "all" ? rest : rest.filter((p) => p.cat === filter)),
    [filter, rest],
  );

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("blog.badge")}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            {t("blog.title1")} <span className="text-gradient-gold">{t("blog.title2")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t("blog.subtitle")}</p>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <Reveal>
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="block">
            <article className="surface-card group grid overflow-hidden md:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <img
                  src={featured.img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {t("blog.featured")}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className={`rounded-full px-3 py-1 font-semibold uppercase ${catClass(featured.cat)}`}>
                    {catLabel(featured.cat)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {featured.date[lang]}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.read} {t("blog.min")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl">
                  {featured.title[lang]}
                </h2>
                <p className="mt-4 text-muted-foreground">{featured.excerpt[lang]}</p>
                <span className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-transform group-hover:scale-[1.03]">
                  {t("blog.read")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="flex flex-wrap gap-2">
          {catKeys.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block h-full">
                <article className="surface-card group h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${catClass(p.cat)}`}>
                      {catLabel(p.cat)}
                    </span>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-[10px] font-medium backdrop-blur">
                      <Clock className="h-3 w-3" /> {p.read} {t("blog.min")}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-muted-foreground">{p.date[lang]}</div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-gold">
                      {p.title[lang]}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt[lang]}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      {t("blog.readMore")} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
