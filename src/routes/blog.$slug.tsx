import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.en} — Bantu Trade Capital` },
          { name: "description", content: loaderData.excerpt.en },
          { property: "og:title", content: loaderData.title.en },
          { property: "og:description", content: loaderData.excerpt.en },
        ]
      : [],
  }),
  component: BlogPost,
});

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

function BlogPost() {
  const post = Route.useLoaderData();
  const { t, lang } = useI18n();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.cat === post.cat).slice(0, 2);
  const fallbackRelated = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  return (
    <article className="mx-auto max-w-3xl px-4 pb-32 pt-6">
      <Reveal>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> {t("blog.back")}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className={`rounded-full px-3 py-1 font-semibold uppercase ${catClass(post.cat)}`}>
            {t(`blog.cat${post.cat[0].toUpperCase()}${post.cat.slice(1)}`)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {post.date[lang]}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.read} {t("blog.min")}
          </span>
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
          {post.title[lang]}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt[lang]}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          <img src={post.img} alt="" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="prose-legal mt-10 space-y-5 text-[16px] leading-relaxed text-muted-foreground">
          {post.body[lang].map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-foreground/5 p-5 text-xs leading-relaxed text-muted-foreground">
          {t("blog.disclaimer")}
        </div>
      </Reveal>

      {relatedPosts.length > 0 && (
        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold">{t("blog.related")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="surface-card group overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold leading-snug group-hover:text-gold">
                      {p.title[lang]}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </article>
  );
}
