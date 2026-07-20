import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Plus, LogOut, Pencil, Trash2, Eye, EyeOff, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/useSession";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Manage Blog — Admin" }] }),
  component: AdminBlogList,
});

type Row = {
  id: string;
  slug: string;
  category: string;
  published: boolean;
  title: { en: string; pt: string };
  updated_at: string;
};

function AdminBlogList() {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Row[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  const load = useCallback(async () => {
    setFetching(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, category, published, title, updated_at")
      .order("updated_at", { ascending: false });
    setPosts((data as unknown as Row[]) ?? []);
    setFetching(false);
  }, []);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  const togglePublish = async (row: Row) => {
    await supabase.from("blog_posts").update({
      published: !row.published,
      published_at: !row.published ? new Date().toISOString() : null,
    }).eq("id", row.id);
    load();
  };

  const remove = async (row: Row) => {
    if (!confirm(`Delete "${row.title.en}"? This can't be undone.`)) return;
    await supabase.from("blog_posts").delete().eq("id", row.id);
    load();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (loading || !session) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 text-sm text-muted-foreground">
        <Lock className="mr-2 h-4 w-4" /> Checking access...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pb-32 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Admin</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Manage Blog</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            <Plus className="h-4 w-4" /> New post
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:border-gold hover:text-gold"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        {fetching ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No posts yet — create your first one.
          </div>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                      p.published ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.55_0.18_155)]" : "bg-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</span>
                </div>
                <div className="mt-1.5 truncate font-display text-base font-bold">{p.title.en || "(untitled)"}</div>
                <div className="text-xs text-muted-foreground">/blog/{p.slug}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePublish(p)}
                  title={p.published ? "Unpublish" : "Publish"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold"
                >
                  {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <Link
                  to="/admin/blog/$id"
                  params={{ id: p.id }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => remove(p)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
