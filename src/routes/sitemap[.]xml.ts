import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: { handlers: { GET: async () => {
    try {
      const router = await getRouterInstance();
      const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
      const routeId = "/blog/$slug";
      if (isSitemapRouteIncluded(router.routesById[routeId])) {
        const { createPublicClient } = await import("@/lib/public-db.server");
        const { publishedSitemapPosts } = await import("@/lib/sitemap-posts.server");
        const posts = await publishedSitemapPosts(createPublicClient());
        for (const post of posts) {
          const location = router.buildLocation({ to: "/blog/$slug", params: { slug: post.slug }, search: () => ({}), hash: "" });
          const path = sitemapPathForLocation(router, location, routeId);
          if (path) entries.push({ path, lastmod: post.updated_at });
        }
      }
      return new Response(sitemapXML("https://bantutradecapital.com", entries), {
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
      });
    } catch {
      return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
    }
  } } },
});