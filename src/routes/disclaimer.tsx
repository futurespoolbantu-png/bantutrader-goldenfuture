import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Bantu Trade Capital" },
      { name: "description", content: "Risk disclosure and regulatory disclaimer for Bantu Trade Capital." },
    ],
  }),
  component: Disclaimer,
});

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-display text-xl font-bold text-foreground">{h}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Disclaimer() {
  const { lang } = useI18n();

  if (lang === "pt") {
    return (
      <LegalLayout title="Aviso Legal e de Risco" updated="Última atualização: Julho de 2026">
        <Section h="1. Estatuto regulatório">
          <p>
            A Bantu Trade Capital Asset Management encontra-se atualmente em <strong className="text-foreground">processo de licenciamento</strong> junto
            da entidade reguladora competente no Dubai, Emirados Árabes Unidos. Este processo ainda não está
            concluído. Divulgações regulatórias completas serão publicadas nesta página assim que o processo for
            finalizado.
          </p>
        </Section>

        <Section h="2. Risco de investimento">
          <p>
            Negociar e investir em mercados financeiros — incluindo forex e outros ativos — envolve risco
            significativo de perda, incluindo a possível perda total do capital investido. Estes mercados podem não
            ser adequados para todos os investidores.
          </p>
        </Section>

        <Section h="3. Desempenho passado">
          <p>
            Qualquer referência a desempenho passado, incluindo o nosso track record documentado, não constitui
            garantia nem indicação fiável de resultados futuros.
          </p>
        </Section>

        <Section h="4. Sem aconselhamento">
          <p>
            Nada neste Site — incluindo o quiz de perfil de investidor — constitui aconselhamento financeiro
            personalizado. Recomendamos que procures aconselhamento independente e qualificado antes de tomar
            qualquer decisão de investimento.
          </p>
        </Section>

        <Section h="5. Dados apresentados">
          <p>
            Alguns elementos visuais neste Site (como painéis e gráficos ilustrativos da aplicação móvel) são
            representações conceptuais e não refletem saldos, retornos ou dados de clientes reais.
          </p>
        </Section>

        <Section h="6. Contacto">
          <p>
            Para questões sobre este aviso, contacta-nos em{" "}
            <a href="mailto:invest@bantutradecapital.com" className="text-gold hover:underline">
              invest@bantutradecapital.com
            </a>.
          </p>
        </Section>

        <p className="border-t border-border pt-6 text-xs text-muted-foreground">
          Nota: este documento é um modelo genérico e será revisto por um profissional jurídico à medida que o
          processo de licenciamento da Bantu Trade Capital avança.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Legal & Risk Disclaimer" updated="Last updated: July 2026">
      <Section h="1. Regulatory status">
        <p>
          Bantu Trade Capital Asset Management is currently <strong className="text-foreground">completing its licensing process</strong> with the
          relevant regulatory authority in Dubai, United Arab Emirates. This process is not yet complete. Full
          regulatory disclosures will be published on this page once the process is finalized.
        </p>
      </Section>

      <Section h="2. Investment risk">
        <p>
          Trading and investing in financial markets — including forex and other assets — involves significant
          risk of loss, including possible total loss of invested capital. These markets may not be suitable for
          all investors.
        </p>
      </Section>

      <Section h="3. Past performance">
        <p>
          Any reference to past performance, including our documented track record, does not constitute a
          guarantee or reliable indication of future results.
        </p>
      </Section>

      <Section h="4. No advice">
        <p>
          Nothing on this Site — including the investor profile quiz — constitutes personalized financial advice.
          We recommend seeking independent, qualified advice before making any investment decision.
        </p>
      </Section>

      <Section h="5. Displayed data">
        <p>
          Some visual elements on this Site (such as illustrative mobile app panels and charts) are conceptual
          representations and do not reflect real balances, returns, or client data.
        </p>
      </Section>

      <Section h="6. Contact">
        <p>
          For questions about this disclaimer, contact us at{" "}
          <a href="mailto:invest@bantutradecapital.com" className="text-gold hover:underline">
            invest@bantutradecapital.com
          </a>.
        </p>
      </Section>

      <p className="border-t border-border pt-6 text-xs text-muted-foreground">
        Note: this document is a generic template and will be reviewed by a legal professional as Bantu Trade
        Capital's licensing process progresses.
      </p>
    </LegalLayout>
  );
}
