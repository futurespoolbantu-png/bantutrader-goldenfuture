import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function publishedSitemapPosts(client: SupabaseClient<Database>) {
  const posts: Array<{ slug: string; updated_at: string }> = [];
  const pageSize = 1000;
  for (let offset = 0; ; ) {
    const { data, error } = await client.from("blog_posts").select("slug, updated_at")
      .eq("published", true).order("id").range(offset, offset + pageSize - 1);
    if (error || !data) throw new Error("Unable to read all published sitemap articles");
    if (data.length === 0) return posts;
    posts.push(...data);
    offset += data.length;
  }
}