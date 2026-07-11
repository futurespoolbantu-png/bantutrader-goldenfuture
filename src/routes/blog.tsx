import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

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

type CatKey = "all" | "market" | "tips" | "news" | "edu";
const catKeys: CatKey[] = ["all", "market", "tips", "news", "edu"];

const catClass = (c: CatKey) => {
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
  const [filter, setFilter] = useState<CatKey>("all");

  const catLabel = (c: CatKey) =>
    c === "all" ? t("blog.catAll")
    : c === "market" ? t("blog.catMarket")
    : c === "tips" ? t("blog.catTips")
    : c === "news" ? t("blog.catNews")
    : t("blog.catEdu");

  const featured = {
    img: heroBg,
    cat: "market" as CatKey,
    title: t("blog.f.title"),
    excerpt: t("blog.f.exc"),
    date: lang === "pt" ? "02 Dez, 2025" : "Dec 02, 2025",
    read: `8 ${t("blog.min")}`,
  };

  const posts: { img: string; cat: CatKey; title: string; excerpt: string; date: string; read: string }[] = [
    { img: blog1, cat: "market", title: t("blog.p1.title"), excerpt: t("blog.p1.exc"), date: lang === "pt" ? "12 Nov, 2025" : "Nov 12, 2025", read: `6 ${t("blog.min")}` },
    { img: blog2, cat: "edu", title: t("blog.p2.title"), excerpt: t("blog.p2.exc"), date: lang === "pt" ? "30 Out, 2025" : "Oct 30, 2025", read: `4 ${t("blog.min")}` },
    { img: blog3, cat: "news", title: t("blog.p3.title"), excerpt: t("blog.p3.exc"), date: lang === "pt" ? "18 Out, 2025" : "Oct 18, 2025", read: `3 ${t("blog.min")}` },
    { img: blog4, cat: "tips", title: t("blog.p4.title"), excerpt: t("blog.p4.exc"), date: lang === "pt" ? "05 Out, 2025" : "Oct 05, 2025", read: `5 ${t("blog.min")}` },
    { img: blog1, cat: "market", title: t("blog.p5.title"), excerpt: t("blog.p5.exc"), date: lang === "pt" ? "28 Set, 2025" : "Sep 28, 2025", read: `5 ${t("blog.min")}` },
    { img: blog4, cat: "edu", title: t("blog.p6.title"), excerpt: t("blog.p6.exc"), date: lang === "pt" ? "14 Set, 2025" : "Sep 14, 2025", read: `4 ${t("blog.min")}` },
  ];

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.cat === filter)),
    [filter, posts],
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
          <article className="surface-card group grid overflow-hidden md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <img src={featured.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
              <a href="#" className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:scale-[1.03] transition-transform">
                {t("blog.read")} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
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
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <article className="surface-card group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${catClass(p.cat)}`}>
                    {catLabel(p.cat)}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-[10px] font-medium backdrop-blur">
                    <Clock className="h-3 w-3" /> {p.read}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    {t("blog.readMore")} <ArrowRight className="h-3.5 w-3.5" />
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
