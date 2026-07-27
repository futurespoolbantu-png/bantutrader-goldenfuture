import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({
    meta: [{ title: "Reset Password — Bantu Trade Capital" }],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase automatically parses the recovery token from the URL and
    // establishes a temporary session; we just wait for that to settle.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/admin/blog" }), 1500);
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <div className="surface-card p-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" /> Admin
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold">Set a new password</h1>

        {done ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-foreground/5 p-4 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Password updated. Taking you to the blog panel...
          </div>
        ) : !ready ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Verifying your reset link... If nothing happens after a few seconds, the link may have expired —{" "}
            <Link to="/admin/login" className="text-gold underline">
              request a new one
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <label className="block">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" /> New password
              </div>
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" /> Confirm password
              </div>
              <input
                required
                minLength={6}
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-60"
            >
              {busy ? "..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
