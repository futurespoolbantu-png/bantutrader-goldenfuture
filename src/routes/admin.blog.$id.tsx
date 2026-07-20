import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/useSession";
import { BlogPostEditor, type EditorInitial } from "@/components/BlogPostEditor";

export const Route = createFileRoute("/admin/blog/$id")({
  head: () => ({ meta: [{ title: "Edit Post — Admin" }] }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [post, setPost] = useState<EditorInitial | null>(null);
  const [fetching, setFetching] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setMissing(true);
        } else {
          setPost({
            id: data.id,
            slug: data.slug,
            category: data.category,
            image_url: data.image_url ?? "",
            read_minutes: data.read_minutes,
            published: data.published,
            title: data.title as { en: string; pt: string },
            excerpt: data.excerpt as { en: string; pt: string },
            body: data.body as { en: string[]; pt: string[] },
          });
        }
        setFetching(false);
      });
  }, [session, id]);

  if (loading || !session || fetching) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 text-sm text-muted-foreground">
        <Lock className="mr-2 h-4 w-4" /> Loading...
      </div>
    );
  }

  if (missing) throw notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-32 pt-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to all posts
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Edit Post</h1>

      <div className="mt-8">{post && <BlogPostEditor initial={post} />}</div>
    </section>
  );
}
