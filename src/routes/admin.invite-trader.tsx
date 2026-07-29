import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useSession } from "@/lib/useSession";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/invite-trader")({
  head: () => ({ meta: [{ title: "Convidar Trader — Admin" }] }),
  component: InviteTrader,
});

function InviteTrader() {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{ onboardingUrl: string; email: string } | null>(null);

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

  const canSubmit = fullName.trim().length > 2 && /\S+@\S+\.\S+/.test(email) && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg(null);

    const { data, error } = await supabase.functions.invoke("invite-trader", {
      body: { full_name: fullName.trim(), email: email.trim() },
    });

    setSubmitting(false);

    if (error || !data?.success) {
      setErrorMsg(data?.error || "Não foi possível enviar o convite. Tente novamente.");
      return;
    }

    setResult({ onboardingUrl: data.onboarding_url, email: email.trim() });
    setFullName("");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-2xl px-4 pb-32 pt-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Voltar ao admin
      </Link>

      <h1 className="mt-4 font-display text-3xl font-bold">Convidar Trader</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Cria o registo do trader e envia automaticamente o email de boas-vindas com o link único de integração.
      </p>

      <div className="surface-card mt-8 p-8">
        <label className="block">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Nome completo</div>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nome do trader"
            className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
          />
        </label>

        <label className="mt-5 block">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold"
          />
        </label>

        {errorMsg && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {errorMsg}
          </div>
        )}

        {result && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-[oklch(0.78_0.19_155/0.3)] bg-[oklch(0.78_0.19_155/0.1)] p-4 text-sm text-[oklch(0.35_0.15_155)]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Convite enviado para <strong>{result.email}</strong>.<br />
              Link: <a href={result.onboardingUrl} target="_blank" rel="noopener noreferrer" className="underline">{result.onboardingUrl}</a>
            </span>
          </div>
        )}

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send className="h-4 w-4" />
          {submitting ? "A enviar..." : "Enviar convite"}
        </button>
      </div>
    </section>
  );
}
