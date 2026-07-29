import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useSession } from "@/lib/useSession";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/send-credentials")({
  head: () => ({ meta: [{ title: "Enviar Credenciais — Admin" }] }),
  component: SendCredentials,
});

const initialForm = {
  fullName: "",
  email: "",
  platform: "Tradovate",
  accountId: "",
  loginUsername: "",
  password: "",
  accountSize: "",
};

function SendCredentials() {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 text-sm text-muted-foreground">
        <Lock className="mr-2 h-4 w-4" /> A verificar acesso...
      </div>
    );
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const canSubmit =
    form.fullName.trim().length > 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.platform.trim().length > 0 &&
    form.accountId.trim().length > 0 &&
    form.loginUsername.trim().length > 0 &&
    form.password.trim().length > 0 &&
    form.accountSize.trim().length > 0 &&
    !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg(null);

    const { data, error } = await supabase.functions.invoke("send-credentials", {
      body: {
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        platform: form.platform.trim(),
        account_id: form.accountId.trim(),
        login_username: form.loginUsername.trim(),
        password: form.password,
        account_size: form.accountSize.trim(),
      },
    });

    setSubmitting(false);

    if (error || !data?.success) {
      setErrorMsg(data?.error || "Não foi possível enviar o email. Tente novamente.");
      return;
    }

    setSentTo(form.email.trim());
    setForm(initialForm);
  };

  return (
    <section className="mx-auto max-w-2xl px-4 pb-32 pt-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Voltar ao admin
      </Link>

      <h1 className="mt-4 font-display text-3xl font-bold">Enviar Credenciais</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Envia ao trader os dados de acesso à conta de negociação já criada na plataforma.
      </p>

      <div className="surface-card mt-8 p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Nome completo</div>
            <input {...field("fullName")} placeholder="Nome do trader" className={inputClass} />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Email do trader</div>
            <input type="email" {...field("email")} placeholder="email@exemplo.com" className={inputClass} />
          </label>

          <label className="block">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Plataforma</div>
            <input {...field("platform")} placeholder="Tradovate" className={inputClass} />
          </label>

          <label className="block">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Account ID</div>
            <input {...field("accountId")} placeholder="MFFUSFBLDR619983008" className={`${inputClass} font-mono`} />
          </label>

          <label className="block">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Login Username</div>
            <input {...field("loginUsername")} placeholder="MFFUkBnWyfNfHu" className={`${inputClass} font-mono`} />
          </label>

          <label className="block">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Password</div>
            <input {...field("password")} placeholder="••••••••" className={`${inputClass} font-mono`} />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Starting Balance</div>
            <input {...field("accountSize")} placeholder="$50,000 USD" className={inputClass} />
          </label>
        </div>

        {errorMsg && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {errorMsg}
          </div>
        )}

        {sentTo && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-[oklch(0.78_0.19_155/0.3)] bg-[oklch(0.78_0.19_155/0.1)] p-4 text-sm text-[oklch(0.35_0.15_155)]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Credenciais enviadas para <strong>{sentTo}</strong>.</span>
          </div>
        )}

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send className="h-4 w-4" />
          {submitting ? "A enviar..." : "Enviar credenciais"}
        </button>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold";
