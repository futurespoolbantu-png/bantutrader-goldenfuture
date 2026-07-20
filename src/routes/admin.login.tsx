import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Mail, KeyRound, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/useSession";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Bantu Trade Capital" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/admin/blog" });
    }
  }, [loading, session, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      navigate({ to: "/admin/blog" });
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setSignupDone(true);
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <div className="surface-card p-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" /> Admin
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold">
          {mode === "login" ? "Sign in" : "Create admin account"}
        </h1>

        {signupDone ? (
          <div className="mt-6 rounded-2xl border border-border bg-foreground/5 p-4 text-sm text-muted-foreground">
            Account created. If email confirmation is required, check your inbox — otherwise, just{" "}
            <button className="text-gold underline" onClick={() => { setMode("login"); setSignupDone(false); }}>
              sign in now
            </button>
            .
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <label className="block">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> Email
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" /> Password
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
              {busy ? "..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        )}

        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSignupDone(false); }}
          className="mt-5 text-xs text-muted-foreground hover:text-gold"
        >
          {mode === "login" ? "First time here? Create an admin account" : "Already have an account? Sign in"}
        </button>

        <Link to="/" className="mt-4 block text-xs text-muted-foreground hover:text-gold">
          ← Back to site
        </Link>
      </div>
    </section>
  );
}
