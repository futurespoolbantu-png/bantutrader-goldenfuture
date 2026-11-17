import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getPublicPost = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1).max(300) }))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./public-db.server");
    const result = await createPublicClient().from("blog_posts").select("*")
      .eq("published", true).eq("slug", data.slug).maybeSingle();
    if (result.error) throw new Error("Unable to load article");
    return result.data;
  });
export const getPublicPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicClient } = await import("./public-db.server");
  const result = await createPublicClient().from("blog_posts")
    .select("id, slug, category, image_url, read_minutes, published_at, title, excerpt")
    .eq("published", true).order("published_at", { ascending: false });
  if (result.error) throw new Error("Unable to load articles");
  return result.data;
});