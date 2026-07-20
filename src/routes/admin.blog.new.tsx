import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { useSession } from "@/lib/useSession";
import { BlogPostEditor } from "@/components/BlogPostEditor";

export const Route = createFileRoute("/admin/blog/new")({
  head: () => ({ meta: [{ title: "New Post — Admin" }] }),
  component: NewPost,
});

function NewPost() {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 text-sm text-muted-foreground">
        <Lock className="mr-2 h-4 w-4" /> Checking access...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pb-32 pt-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to all posts
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">New Post</h1>

      <div className="mt-8">
        <BlogPostEditor
          initial={{
            slug: "",
            category: "edu",
            image_url: "",
            read_minutes: 5,
            published: false,
            title: { en: "", pt: "" },
            excerpt: { en: "", pt: "" },
            body: { en: [], pt: [] },
          }}
        />
      </div>
    </section>
  );
}
