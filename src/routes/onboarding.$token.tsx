import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/onboarding/$token")({
  head: () => ({
    meta: [
      { title: "Termos do Programa de Trader — Bantu Trade Capital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Onboarding,
});

const TERMS_VERSION = "1.0";

function Onboarding() {
  const { token } = Route.useParams();

  const contractBoxRef = useRef<HTMLDivElement>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [fullName, setFullName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{ discordInviteUrl: string } | null>(null);

  const handleScroll = () => {
    const el = contractBoxRef.current;
    if (!el || hasReachedEnd) return;
    const scrollable = el.scrollHeight - el.clientHeight;
    const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 100;
    if (pct >= 96) setHasReachedEnd(true);
  };

  const canSubmit = hasReachedEnd && agreed && fullName.trim().length > 2 && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg(null);

    const { data, error } = await supabase.functions.invoke("accept-terms", {
      body: { token, signature_name: fullName.trim() },
    });

    setSubmitting(false);

    if (error || !data?.success) {
      setErrorMsg(
        data?.error === "Invalid or unknown token"
          ? "Este link não é válido. Confirme que copiou o link completo do email."
          : data?.error === "This link has expired"
            ? "Este link expirou. Contacte a equipa da Bantu Trade Capital para receber um novo."
            : "Não foi possível confirmar a aceitação. Tente novamente dentro de alguns instantes."
      );
      return;
    }

    setResult({ discordInviteUrl: data.discord_invite_url });
  };

  return (
    <section className="mx-auto max-w-3xl px-4 pb-32 pt-10">
      <Reveal className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Processo de Integração
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] md:text-5xl">
          Bem-vindo(a) à <span className="text-gradient-gold">equipa</span>.
          <br />
          Leia e aceite os termos.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Foi selecionado(a) para integrar a equipa interna de traders da Bantu Trade Capital. Reveja o documento
          abaixo com atenção antes de aceitar.
        </p>
      </Reveal>

      {!result ? (
        <>
          <Reveal delay={0.05}>
            <div className="surface-card mt-12 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Termos e Condições do Programa
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    hasReachedEnd ? "bg-[oklch(0.78_0.19_155/0.15)] text-[oklch(0.45_0.18_155)]" : "bg-gold/15 text-gold"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" /> {hasReachedEnd ? "Lido" : "Por ler"}
                </span>
              </div>

              <div
                ref={contractBoxRef}
                onScroll={handleScroll}
                className="h-80 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-muted-foreground"
              >
                <TermsBody />
              </div>

              <div
                className={`border-t border-border px-6 py-3 text-center text-xs ${
                  hasReachedEnd ? "font-semibold text-[oklch(0.45_0.18_155)]" : "text-muted-foreground"
                }`}
              >
                {hasReachedEnd
                  ? "Documento lido — pode agora preencher e confirmar"
                  : "Continue a ler até ao final para desbloquear a confirmação"}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-card mt-6 p-8">
              <label className="block">
                <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Nome completo</div>
                <input
                  disabled={!hasReachedEnd}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Escreva o seu nome como assinatura"
                  className="w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>

              <label className="mt-5 flex items-start gap-3">
                <input
                  type="checkbox"
                  disabled={!hasReachedEnd}
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--gold)] disabled:cursor-not-allowed"
                />
                <span className={`text-sm ${hasReachedEnd ? "" : "text-muted-foreground/60"}`}>
                  Li e aceito os Termos e Condições do Programa de Trader Institucional da Bantu Trade Capital.
                </span>
              </label>

              {errorMsg && (
                <div className="mt-5 flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {errorMsg}
                </div>
              )}

              <button
                onClick={submit}
                disabled={!canSubmit}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                {submitting ? "A confirmar..." : "Aceitar os termos"}
              </button>
              {!hasReachedEnd && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Aguarde a leitura completa do documento acima
                </p>
              )}
            </div>
          </Reveal>
        </>
      ) : (
        <Reveal delay={0.05}>
          <div className="surface-card mt-12 flex flex-col items-center p-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold">Termos aceites com sucesso</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              A sua integração no Programa de Trader Institucional da Bantu Trade Capital está formalizada.
            </p>
            <a
              href={result.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]"
            >
              Aceder ao canal da equipa
            </a>
          </div>
        </Reveal>
      )}
    </section>
  );
}

function TermsBody() {
  return (
    <div className="space-y-4">
      <p>
        Estes Termos e Condições ("Termos") regulam a participação no Programa de Trader Institucional da Bantu
        Trade Capital Asset Management ("Bantu Trade Capital", "a Empresa", "nós"), disponibilizado a traders
        selecionados após conclusão de uma fase de avaliação de desempenho ("Programa"). Ao assinalar a opção "Li e
        aceito os termos" e indicar o seu nome completo nesta página, o participante ("Trader", "você") declara ter
        lido, compreendido e aceite integralmente estes Termos.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">1. Definições</h3>
      <p>
        <strong>"Capital Alocado"</strong> — o montante de capital disponibilizado pela Empresa ao Trader para
        negociação no âmbito do Programa, permanecendo em todas as circunstâncias propriedade exclusiva da Empresa.
      </p>
      <p>
        <strong>"Bónus"</strong> — o Bónus de Compensação por Performance devido ao Trader nos termos da Secção 6.
      </p>
      <p>
        <strong>"Canal Interno"</strong> — o espaço de comunicação reservado à equipa interna de traders
        (atualmente operado em Discord).
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">2. Elegibilidade e Início</h3>
      <p>
        O acesso ao Programa é limitado a traders convidados pela Empresa na sequência de avaliação de desempenho em
        fase própria. O Programa tem início na data de aceitação destes Termos.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">3. Capital Alocado</h3>
      <p>
        A Empresa disponibiliza ao Trader o Capital Alocado exclusivamente para efeitos de negociação no âmbito do
        Programa. O Capital Alocado não constitui depósito, empréstimo ou investimento do Trader, não assistindo a
        este qualquer direito de propriedade sobre o mesmo.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">4. Regras de Negociação e Risco</h3>
      <p>
        O Trader compromete-se a operar em conformidade com as Regras de Risco comunicadas pela Empresa, incluindo
        limites de perda diária, limites de perda máxima acumulada e exposição máxima por posição.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">5. Práticas Proibidas</h3>
      <p>
        É vedado ao Trader partilhar acesso, explorar falhas técnicas, adotar risco excessivo incompatível com as
        Regras de Risco, prestar declarações falsas, ou utilizar o Capital Alocado em benefício de terceiros.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">6. Bónus de Compensação</h3>
      <p>
        O Trader não é remunerado através de salário, sendo antes elegível para um Bónus de Compensação por
        Performance. O valor base do Bónus é fixado em 50.000 AOA (cinquenta mil kwanzas), podendo progredir de
        acordo com os critérios de desempenho comunicados pela Empresa.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">7. Pagamento do Bónus</h3>
      <p>
        O Bónus é pago através dos meios indicados pelo Trader. Eventuais custos de câmbio ou transferência são da
        responsabilidade do Trader, salvo indicação em contrário.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">8. Responsabilidade Fiscal</h3>
      <p>
        O Trader é o único responsável pela declaração e pagamento de impostos aplicáveis ao Bónus recebido, nos
        termos da legislação do seu país de residência fiscal.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">9. Propriedade Intelectual</h3>
      <p>
        Todas as estratégias, metodologias e ferramentas disponibilizadas pela Empresa permanecem sua propriedade
        exclusiva.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">10. Confidencialidade</h3>
      <p>
        O Trader obriga-se a manter estrita confidencialidade sobre toda a Informação Confidencial a que tenha
        acesso, durante e após a cessação da sua participação, por prazo indeterminado. A violação deste dever é
        suscetível de causar danos graves à Empresa, que se reserva o direito a recorrer a procedimentos cautelares
        e a indemnização pelos danos sofridos.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">11. Comunicações</h3>
      <p>
        As comunicações entre as Partes podem ser efetuadas por email ou através do Canal Interno, com validade para
        todos os efeitos.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">12. Suspensão e Terminação</h3>
      <p>
        A Empresa pode suspender ou terminar de imediato a participação do Trader em caso de violação das Regras de
        Risco, das Práticas Proibidas, ou conduta fraudulenta. O Trader pode solicitar a sua saída a qualquer
        momento.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">13. Natureza da Relação</h3>
      <p>
        A participação no Programa não constitui, sob nenhuma circunstância, contrato de trabalho ou vínculo
        laboral entre o Trader e a Empresa.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">14. Proteção de Dados</h3>
      <p>
        Os dados pessoais do Trader são tratados exclusivamente para efeitos de gestão do Programa e verificação de
        identidade, com medidas adequadas de segurança.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">15. Força Maior</h3>
      <p>
        Nenhuma das Partes é responsável por incumprimento decorrente de circunstâncias alheias à sua vontade,
        incluindo falhas técnicas ou eventos de mercado extremos.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">16. Limitação de Responsabilidade</h3>
      <p>
        A negociação em mercados financeiros envolve risco significativo. O Trader não é pessoalmente responsável
        por perdas resultantes de operações dentro das Regras de Risco definidas, salvo dolo ou negligência grave.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">17. Alterações aos Termos</h3>
      <p>A Empresa pode atualizar estes Termos periodicamente, com a versão e data indicadas no topo do documento.</p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">18. Lei Aplicável</h3>
      <p>
        Estes Termos regem-se pelas leis do Dubai International Financial Centre ("DIFC"), Emirados Árabes Unidos.
        Quaisquer litígios serão submetidos à jurisdição exclusiva dos Tribunais do DIFC.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">19. Disposições Gerais</h3>
      <p>
        Estes Termos constituem a totalidade do acordo entre as Partes. A eventual invalidade de qualquer disposição
        não afeta a validade das restantes.
      </p>

      <h3 className="pt-2 text-xs font-bold uppercase tracking-widest text-gold">20. Aceitação</h3>
      <p>
        A aceitação destes Termos (versão {TERMS_VERSION}) é efetuada exclusivamente através desta página, mediante
        confirmação da leitura integral, marcação da opção "Li e aceito os termos" e indicação do nome completo do
        Trader. O registo da aceitação (nome, data e versão) é conservado pela Empresa como prova.
      </p>
    </div>
  );
}
