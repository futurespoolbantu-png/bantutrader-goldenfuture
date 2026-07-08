import { createFileRoute } from "@tanstack/react-router";
import { AfricanPattern } from "@/components/AfricanPattern";

export const Route = createFileRoute("/pattern-preview")({
  head: () => ({ meta: [{ title: "Pattern preview" }] }),
  component: PatternPreview,
});

function PatternPreview() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      <header>
        <h1 className="font-display text-3xl font-bold">
          Padrão geométrico africano — variações
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cor herdada de <code>text-gold</code>. Sem novas cores.
        </p>
      </header>

      {/* Variação 1: faixas separadoras finas */}
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">
          Variação 1 — Faixa separadora fina (stripe, 8px)
        </h2>
        <div className="surface-card p-8">
          <p className="text-muted-foreground">Secção A — conteúdo qualquer.</p>
        </div>
        <div className="my-8 text-gold">
          <AfricanPattern variant="stripe" />
        </div>
        <div className="surface-card p-8">
          <p className="text-muted-foreground">Secção B — conteúdo qualquer.</p>
        </div>
      </section>

      {/* Variação 2: marca d'água no hero */}
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">
          Variação 2 — Marca d'água no hero (opacity 6%)
        </h2>
        <div className="surface-card relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-0 text-gold">
            <AfricanPattern variant="hero" />
          </div>
          <div className="relative z-10 p-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Bantu Trade Capital
            </span>
            <h3 className="mt-3 font-display text-5xl font-bold">
              Gestão de capital com histórico auditado.
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              O padrão aparece atrás do texto como marca d'água discreta.
            </p>
          </div>
        </div>
      </section>

      {/* Variação 3: banda decorativa no footer + faixas finas */}
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">
          Variação 3 — Banda decorativa (64px) + faixas finas
        </h2>
        <div className="surface-card p-8">
          <p className="text-muted-foreground">Conteúdo do rodapé.</p>
        </div>
        <div className="mt-0 text-gold">
          <AfricanPattern variant="band" />
        </div>
        <div className="surface-card mt-8 p-8">
          <p className="text-muted-foreground">Ou como cabeçalho de secção.</p>
        </div>
      </section>
    </div>
  );
}
