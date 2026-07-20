import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Save, AlertCircle, Globe, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export type EditorInitial = {
  id?: string;
  slug: string;
  category: string;
  image_url: string;
  read_minutes: number;
  published: boolean;
  title: { en: string; pt: string };
  excerpt: { en: string; pt: string };
  body: { en: string[]; pt: string[] };
};

const CATEGORIES = ["market", "edu", "news", "tips"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function BlogPostEditor({ initial }: { initial: EditorInitial }) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "pt">("en");
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!!initial.id);
  const [category, setCategory] = useState(initial.category);
  const [imageUrl, setImageUrl] = useState(initial.image_url);
  const [readMinutes, setReadMinutes] = useState(initial.read_minutes);
  const [published, setPublished] = useState(initial.published);
  const [titleEn, setTitleEn] = useState(initial.title.en);
  const [titlePt, setTitlePt] = useState(initial.title.pt);
  const [excerptEn, setExcerptEn] = useState(initial.excerpt.en);
  const [excerptPt, setExcerptPt] = useState(initial.excerpt.pt);
  const [bodyEn, setBodyEn] = useState(initial.body.en.join("\n\n"));
  const [bodyPt, setBodyPt] = useState(initial.body.pt.join("\n\n"));
  const bodyEnRef = useRef<HTMLTextAreaElement>(null);
  const bodyPtRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onTitleEnChange = (v: string) => {
    setTitleEn(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const insertAtCursor = (ref: React.RefObject<HTMLTextAreaElement>, setter: (v: string) => void, current: string, snippet: string) => {
    const el = ref.current;
    if (!el) {
      setter(current + (current ? "\n\n" : "") + snippet);
      return;
    }
    const start = el.selectionStart ?? current.length;
    const end = el.selectionEnd ?? current.length;
    const before = current.slice(0, start);
    const after = current.slice(end);
    const needsBreakBefore = before && !before.endsWith("\n\n") ? "\n\n" : "";
    const needsBreakAfter = after && !after.startsWith("\n\n") ? "\n\n" : "";
    const next = before + needsBreakBefore + snippet + needsBreakAfter + after;
    setter(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = (before + needsBreakBefore + snippet).length;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("blog-images").upload(path, file);
    if (uploadErr) {
      setUploading(false);
      setUploadError(uploadErr.message);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    const snippet = `![](${data.publicUrl})`;
    if (lang === "en") {
      insertAtCursor(bodyEnRef, setBodyEn, bodyEn, snippet);
    } else {
      insertAtCursor(bodyPtRef, setBodyPt, bodyPt, snippet);
    }
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    setError("");

    const payload = {
      slug: slug || slugify(titleEn) || `post-${Date.now()}`,
      category,
      image_url: imageUrl || null,
      read_minutes: readMinutes,
      published,
      title: { en: titleEn, pt: titlePt || titleEn },
      excerpt: { en: excerptEn, pt: excerptPt || excerptEn },
      body: {
        en: bodyEn.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        pt: (bodyPt || bodyEn).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      },
      ...(published && !initial.published ? { published_at: new Date().toISOString() } : {}),
    };

    const result = initial.id
      ? await supabase.from("blog_posts").update(payload).eq("id", initial.id)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    navigate({ to: "/admin/blog" });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-border p-1">
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-gold text-primary-foreground" : "text-muted-foreground"}`}
          >
            English
          </button>
          <button
            onClick={() => setLang("pt")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${lang === "pt" ? "bg-gold text-primary-foreground" : "text-muted-foreground"}`}
          >
            Português
          </button>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published (visible on the live site)
        </label>
      </div>

      {lang === "en" ? (
        <>
          <Field label="Title (English)">
            <input value={titleEn} onChange={(e) => onTitleEnChange(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Excerpt (English)">
            <textarea rows={2} value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} className={inputCls} />
          </Field>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Body (English) — separate paragraphs with a blank line
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-gold hover:text-gold disabled:opacity-60"
              >
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
                {uploading ? "Uploading..." : "Insert image"}
              </button>
            </div>
            <textarea
              ref={bodyEnRef}
              rows={14}
              value={bodyEn}
              onChange={(e) => setBodyEn(e.target.value)}
              className={`${inputCls} font-mono text-sm`}
            />
          </div>
        </>
      ) : (
        <>
          <Field label="Título (Português)">
            <input value={titlePt} onChange={(e) => setTitlePt(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Resumo (Português)">
            <textarea rows={2} value={excerptPt} onChange={(e) => setExcerptPt(e.target.value)} className={inputCls} />
          </Field>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Texto (Português) — separa parágrafos com uma linha em branco
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-gold hover:text-gold disabled:opacity-60"
              >
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
                {uploading ? "A carregar..." : "Inserir imagem"}
              </button>
            </div>
            <textarea
              ref={bodyPtRef}
              rows={14}
              value={bodyPt}
              onChange={(e) => setBodyPt(e.target.value)}
              className={`${inputCls} font-mono text-sm`}
            />
          </div>
        </>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      {uploadError && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {uploadError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (URL)">
          <input
            value={slug}
            onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
            className={inputCls}
          />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Cover image URL">
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/src/assets/blog-1.jpg or https://..." className={inputCls} />
        </Field>
        <Field label="Read time (minutes)">
          <input type="number" min={1} value={readMinutes} onChange={(e) => setReadMinutes(Number(e.target.value))} className={inputCls} />
        </Field>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving || !titleEn}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
        </button>
        {slug && (
          <a
            href={`/blog/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold"
          >
            <Globe className="h-3.5 w-3.5" /> Preview URL: /blog/{slug}
          </a>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
