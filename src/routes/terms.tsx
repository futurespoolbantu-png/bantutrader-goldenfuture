import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Bantu Trade Capital" },
      { name: "description", content: "Terms and conditions for using the Bantu Trade Capital website." },
    ],
  }),
  component: Terms,
});

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-display text-xl font-bold text-foreground">{h}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Terms() {
  const { lang } = useI18n();

  if (lang === "pt") {
    return (
      <LegalLayout title="Termos de Serviço" updated="Última atualização: Julho de 2026">
        <p>
          Ao aceder e usar o site bantutradecapital.com ("o Site"), concordas com os termos abaixo. Se não
          concordares, por favor não uses o Site.
        </p>

        <Section h="1. Sobre a Bantu Trade Capital">
          <p>
            A Bantu Trade Capital Asset Management encontra-se atualmente em processo de licenciamento junto da
            entidade reguladora competente no Dubai, Emirados Árabes Unidos. Nenhum conteúdo deste Site deve ser
            interpretado como prova de autorização regulatória já concedida.
          </p>
        </Section>

        <Section h="2. Sem aconselhamento financeiro">
          <p>
            O conteúdo deste Site — incluindo textos, artigos de blog, descrições de estratégias e o quiz de perfil
            de investidor — é fornecido apenas para fins informativos e não constitui aconselhamento financeiro,
            de investimento, fiscal ou jurídico. Nada aqui deve ser interpretado como uma recomendação para comprar,
            vender, ou manter qualquer ativo.
          </p>
        </Section>

        <Section h="3. Sem garantia de retornos">
          <p>
            Investir em mercados financeiros envolve risco significativo, incluindo a possível perda total do
            capital investido. Desempenho passado não é indicativo de resultados futuros. Não garantimos qualquer
            retorno específico.
          </p>
        </Section>

        <Section h="4. Propriedade intelectual">
          <p>
            Todo o conteúdo deste Site (textos, logotipo, design) é propriedade da Bantu Trade Capital ou dos seus
            licenciadores, e não pode ser reproduzido sem autorização prévia por escrito.
          </p>
        </Section>

        <Section h="5. Limitação de responsabilidade">
          <p>
            Na máxima medida permitida por lei, a Bantu Trade Capital não se responsabiliza por quaisquer danos
            diretos ou indiretos resultantes do uso deste Site ou de decisões tomadas com base no seu conteúdo.
          </p>
        </Section>

        <Section h="6. Alterações">
          <p>
            Podemos atualizar estes termos periodicamente. O uso continuado do Site após alterações constitui
            aceitação dos novos termos.
          </p>
        </Section>

        <Section h="7. Lei aplicável">
          <p>Estes termos são regidos pelas leis aplicáveis nos Emirados Árabes Unidos.</p>
        </Section>

        <Section h="8. Contacto">
          <p>
            Para questões sobre estes termos, contacta-nos em{" "}
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
    <LegalLayout title="Terms of Service" updated="Last updated: July 2026">
      <p>
        By accessing and using bantutradecapital.com ("the Site"), you agree to the terms below. If you do not
        agree, please do not use the Site.
      </p>

      <Section h="1. About Bantu Trade Capital">
        <p>
          Bantu Trade Capital Asset Management is currently completing its licensing process with the relevant
          regulatory authority in Dubai, United Arab Emirates. No content on this Site should be interpreted as
          evidence of regulatory authorization already granted.
        </p>
      </Section>

      <Section h="2. No financial advice">
        <p>
          Content on this Site — including text, blog articles, strategy descriptions and the investor profile
          quiz — is provided for informational purposes only and does not constitute financial, investment, tax or
          legal advice. Nothing here should be interpreted as a recommendation to buy, sell, or hold any asset.
        </p>
      </Section>

      <Section h="3. No guarantee of returns">
        <p>
          Investing in financial markets involves significant risk, including possible total loss of invested
          capital. Past performance is not indicative of future results. We do not guarantee any specific return.
        </p>
      </Section>

      <Section h="4. Intellectual property">
        <p>
          All content on this Site (text, logo, design) is the property of Bantu Trade Capital or its licensors,
          and may not be reproduced without prior written permission.
        </p>
      </Section>

      <Section h="5. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Bantu Trade Capital is not liable for any direct or indirect
          damages resulting from use of this Site or decisions made based on its content.
        </p>
      </Section>

      <Section h="6. Changes">
        <p>
          We may update these terms periodically. Continued use of the Site after changes constitutes acceptance
          of the new terms.
        </p>
      </Section>

      <Section h="7. Governing law">
        <p>These terms are governed by the applicable laws of the United Arab Emirates.</p>
      </Section>

      <Section h="8. Contact">
        <p>
          For questions about these terms, contact us at{" "}
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
