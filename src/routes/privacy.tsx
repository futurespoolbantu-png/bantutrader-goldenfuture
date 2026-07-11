import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Bantu Trade Capital" },
      { name: "description", content: "How Bantu Trade Capital collects, uses and protects your personal data." },
    ],
  }),
  component: Privacy,
});

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-display text-xl font-bold text-foreground">{h}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Privacy() {
  const { lang } = useI18n();

  if (lang === "pt") {
    return (
      <LegalLayout title="Política de Privacidade" updated="Última atualização: Julho de 2026">
        <p>
          A Bantu Trade Capital Asset Management ("Bantu Trade Capital", "nós") respeita a tua privacidade. Esta
          política explica que dados pessoais recolhemos, como os usamos, e que direitos tens sobre eles.
        </p>

        <Section h="1. Que dados recolhemos">
          <ul className="list-disc space-y-2 pl-5">
            <li>Dados que forneces diretamente: nome, email, mensagem, e perfil de investidor, quando preenches o formulário de contacto ou subscreves a nossa newsletter.</li>
            <li>Dados técnicos automáticos: endereço IP, tipo de navegador, páginas visitadas — recolhidos de forma agregada para melhorar o site.</li>
          </ul>
        </Section>

        <Section h="2. Como usamos os teus dados">
          <ul className="list-disc space-y-2 pl-5">
            <li>Para responder aos teus pedidos de contacto ou consultoria.</li>
            <li>Para enviar comunicações que subscreveste (ex: newsletter de mercado), das quais te podes sempre cancelar a subscrição.</li>
            <li>Para cumprir obrigações legais e regulatórias, incluindo à medida que o nosso processo de licenciamento avança.</li>
          </ul>
          <p>Nunca vendemos os teus dados pessoais a terceiros.</p>
        </Section>

        <Section h="3. Onde os teus dados são armazenados">
          <p>
            Utilizamos fornecedores de infraestrutura terceiros e de confiança (como Supabase) para armazenar dados de
            forma segura. Estes fornecedores estão contratualmente obrigados a proteger a tua informação.
          </p>
        </Section>

        <Section h="4. Os teus direitos">
          <p>
            Podes, a qualquer momento, pedir para aceder, corrigir, ou apagar os teus dados pessoais, ou cancelar a
            subscrição de qualquer comunicação, contactando-nos em{" "}
            <a href="mailto:invest@bantutradecapital.com" className="text-gold hover:underline">
              invest@bantutradecapital.com
            </a>.
          </p>
        </Section>

        <Section h="5. Cookies">
          <p>
            O site pode usar cookies essenciais para funcionamento básico (ex: preferência de idioma e tema). Não
            usamos cookies de publicidade de terceiros.
          </p>
        </Section>

        <Section h="6. Alterações a esta política">
          <p>
            Podemos atualizar esta política periodicamente. A versão mais recente estará sempre disponível nesta
            página.
          </p>
        </Section>

        <Section h="7. Contacto">
          <p>
            Para qualquer questão sobre privacidade, contacta-nos em{" "}
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
    <LegalLayout title="Privacy Policy" updated="Last updated: July 2026">
      <p>
        Bantu Trade Capital Asset Management ("Bantu Trade Capital", "we") respects your privacy. This policy
        explains what personal data we collect, how we use it, and what rights you have over it.
      </p>

      <Section h="1. What data we collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>Data you provide directly: name, email, message and investor profile, when you fill in our contact form or subscribe to our newsletter.</li>
          <li>Automatic technical data: IP address, browser type, pages visited — collected in aggregate to improve the site.</li>
        </ul>
      </Section>

      <Section h="2. How we use your data">
        <ul className="list-disc space-y-2 pl-5">
          <li>To respond to your contact or consultation requests.</li>
          <li>To send communications you've subscribed to (e.g. market newsletter), which you can unsubscribe from at any time.</li>
          <li>To meet legal and regulatory obligations, including as our licensing process progresses.</li>
        </ul>
        <p>We never sell your personal data to third parties.</p>
      </Section>

      <Section h="3. Where your data is stored">
        <p>
          We use trusted third-party infrastructure providers (such as Supabase) to store data securely. These
          providers are contractually required to protect your information.
        </p>
      </Section>

      <Section h="4. Your rights">
        <p>
          You may at any time request access to, correction of, or deletion of your personal data, or unsubscribe
          from any communication, by contacting us at{" "}
          <a href="mailto:invest@bantutradecapital.com" className="text-gold hover:underline">
            invest@bantutradecapital.com
          </a>.
        </p>
      </Section>

      <Section h="5. Cookies">
        <p>
          The site may use essential cookies for basic functionality (e.g. language and theme preference). We do
          not use third-party advertising cookies.
        </p>
      </Section>

      <Section h="6. Changes to this policy">
        <p>We may update this policy periodically. The latest version will always be available on this page.</p>
      </Section>

      <Section h="7. Contact">
        <p>
          For any privacy questions, contact us at{" "}
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
