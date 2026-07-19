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
    <article className="pb-32">
      {/* Full-width editorial banner */}
      <div className="relative -mt-[1px] h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[58vh]">
        <img src={post.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 p-4 md:p-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40"
          >
            <ArrowLeft className="h-4 w-4" /> {t("blog.back")}
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 pb-8 md:p-10">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                <span className={`rounded-full px-3 py-1 font-semibold uppercase ${catClass(post.cat)}`}>
                  {t(`blog.cat${post.cat[0].toUpperCase()}${post.cat.slice(1)}` as Parameters<typeof t>[0])}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {post.date[lang]}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.read} {t("blog.min")}
                </span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-6xl">
                {post.title[lang]}
              </h1>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-10">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt[lang]}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="prose-legal mt-10 space-y-5 text-[16px] leading-relaxed text-muted-foreground">
            {post.body[lang].map((para: string, i: number) => (
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
      </div>
    </article>
  );
}
