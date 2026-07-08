import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pattern-preview")({
  head: () => ({ meta: [{ title: "Pattern preview" }] }),
  component: PatternPreview,
});

function Sample({ label }: { label: string }) {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>

      {/* Hero-like */}
      <section className="surface-card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-african-pattern" aria-hidden="true" />
        <div className="relative z-10 p-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Bantu Trade Capital
          </span>
          <h2 className="mt-3 font-display text-5xl font-bold">
            Gestão de capital <br />
            com <span className="text-gold">disciplina</span>.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Padrão de losangos concêntricos como fundo, atrás do texto. Contraste
            preservado para leitura confortável.
          </p>
          <button className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground">
            Ver estratégias
          </button>
        </div>
      </section>

      {/* About-like */}
      <section className="surface-card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-african-pattern" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 p-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Porquê a Bantu Trade Capital
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold">
              Estrutura institucional, raízes africanas.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Combinamos anos de experiência no mercado forex com processos de risco
              institucionais.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["4 Anos", "2 Estratégias", "24/7", "100%"].map((v) => (
              <div key={v} className="rounded-2xl border border-border bg-background/70 p-4 text-center backdrop-blur-sm">
                <div className="font-display text-2xl font-bold text-gold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer-like */}
      <section className="surface-card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-african-pattern" aria-hidden="true" />
        <div className="relative z-10 p-8 text-xs text-muted-foreground">
          © 2026 Bantu Trade Capital Asset Management. Todos os direitos reservados.
        </div>
      </section>
    </div>
  );
}

function PatternPreview() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      <header>
        <h1 className="font-display text-3xl font-bold">
          Padrão geométrico — pré-visualização
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Losangos concêntricos + triângulos, traço fino. Herda a cor do tema
          via <code>mask-image</code>.
        </p>
      </header>

      {/* Dark mode block */}
      <div className="dark rounded-3xl border border-white/10 bg-[oklch(0.14_0_0)] p-8 text-white">
        <Sample label="Modo escuro — dourado 12%" />
      </div>

      {/* Light mode block */}
      <div className="light rounded-3xl border border-black/10 bg-[oklch(0.98_0_0)] p-8 text-black">
        <Sample label="Modo claro — foreground 6%" />
      </div>
    </div>
  );
}
