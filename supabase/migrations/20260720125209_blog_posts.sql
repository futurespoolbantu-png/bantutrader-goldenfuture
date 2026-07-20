CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'edu',
  image_url text,
  read_minutes integer NOT NULL DEFAULT 5,
  title jsonb NOT NULL DEFAULT '{"en":"","pt":""}'::jsonb,
  excerpt jsonb NOT NULL DEFAULT '{"en":"","pt":""}'::jsonb,
  body jsonb NOT NULL DEFAULT '{"en":[],"pt":[]}'::jsonb,
  published boolean NOT NULL DEFAULT false,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous website visitors) can read published posts
CREATE POLICY "Published posts are public"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Logged-in users (the site admin) can see all posts, including drafts
CREATE POLICY "Authenticated users can view all posts"
  ON public.blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Only logged-in users can create, edit, or delete posts
CREATE POLICY "Authenticated users can insert posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Keep updated_at current on every edit
CREATE OR REPLACE FUNCTION public.set_blog_post_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_blog_post_updated_at();

-- Seed the existing 7 articles so nothing already written is lost
INSERT INTO public.blog_posts (slug, category, image_url, read_minutes, title, excerpt, body, published, published_at, created_at)
VALUES
(
  'interest-rate-regimes-portfolio-resilience', 'market', '/src/assets/hero-bg.jpg', 8,
  '{"en":"Interest Rate Regimes: A Framework for Portfolio Resilience","pt":"Regimes de Taxas de Juro: Um Framework para Resiliência de Portfólio"}',
  '{"en":"Central bank policy moves in cycles. Here''s the framework we use to think about positioning across different rate environments.","pt":"A política dos bancos centrais move-se em ciclos. Este é o framework que usamos para pensar o posicionamento em diferentes ambientes de juros."}',
  '{"en":["Interest rate cycles shape almost every corner of financial markets — from currency strength to credit spreads to the relative appeal of growth versus defensive assets. Rather than trying to predict the next move from any single central bank, disciplined managers build frameworks that hold up reasonably well across several possible regimes.","The first principle is recognizing that rate regimes are rarely synchronized globally. Different economies move through tightening and easing cycles at different speeds, shaped by local inflation dynamics, currency pressures, and fiscal conditions. This divergence is itself a source of opportunity and risk in currency and fixed-income markets, which is why we pay close attention to the relative — not just absolute — direction of policy.","The second principle is that positioning should be modular. Instead of making one large directional bet on where rates are headed, we prefer to size exposures so that no single regime change can meaningfully impair the portfolio. This means combining strategies with different sensitivities to rate moves, and revisiting those weights as conditions shift.","The third principle is patience around confirmation. Rate regimes tend to shift gradually, with central banks signaling intentions well before acting. We treat early signals as reasons to adjust risk budgets incrementally, not as triggers for wholesale repositioning.","None of this eliminates the uncertainty inherent in macro investing. What it does is replace prediction with structure — a way of engaging with a genuinely unpredictable variable without depending on being right about its next move."],"pt":["Os ciclos de taxas de juro moldam praticamente todos os cantos dos mercados financeiros — desde a força das divisas até aos spreads de crédito e ao apelo relativo de ativos de crescimento face a ativos defensivos. Em vez de tentar prever o próximo movimento de um banco central específico, gestores disciplinados constroem frameworks que se mantêm razoavelmente robustos em vários regimes possíveis.","O primeiro princípio é reconhecer que os regimes de taxas raramente estão sincronizados globalmente. Economias diferentes atravessam ciclos de aperto e flexibilização a velocidades diferentes, moldadas pela dinâmica de inflação local, pressões cambiais e condições fiscais.","O segundo princípio é que o posicionamento deve ser modular, combinando estratégias com sensibilidades diferentes a movimentos de taxas.","O terceiro princípio é a paciência em torno da confirmação — tratamos sinais precoces como razões para ajustar orçamentos de risco de forma incremental.","Nada disto elimina a incerteza inerente ao investimento macro. O que faz é substituir a previsão por estrutura."]}',
  true, now() - interval '48 days', now() - interval '48 days'
),
(
  'understanding-currency-volatility', 'market', '/src/assets/blog-1.jpg', 6,
  '{"en":"Understanding Currency Volatility: What Drives Emerging Market FX","pt":"Entendendo a Volatilidade Cambial: O Que Move o FX de Mercados Emergentes"}',
  '{"en":"A plain-language look at the forces behind emerging market currency swings, and why volatility isn''t the same thing as risk.","pt":"Uma explicação em linguagem simples das forças por trás das oscilações cambiais em mercados emergentes."}',
  '{"en":["Emerging market currencies tend to move more, and more suddenly, than their developed-market counterparts. Understanding why helps put that volatility in context.","Three forces usually dominate: interest rate differentials, commodity exposure, and thinner liquidity than major currency pairs.","It''s worth separating volatility from risk. Volatility describes how much a price moves; risk describes the probability and size of a loss relative to your position and time horizon.","For a trading desk, this distinction shapes process more than any single forecast does."],"pt":["As divisas de mercados emergentes tendem a mover-se mais, e de forma mais súbita, do que as dos mercados desenvolvidos.","Três forças costumam dominar: diferenciais de taxas de juro, exposição a commodities, e liquidez mais fina do que os pares principais.","Vale a pena separar volatilidade de risco — são conceitos diferentes.","Para uma mesa de trading, essa distinção molda o processo mais do que qualquer previsão isolada."]}',
  true, now() - interval '35 days', now() - interval '35 days'
),
(
  'why-segregated-accounts-matter', 'edu', '/src/assets/blog-2.jpg', 4,
  '{"en":"Why Segregated Accounts Matter","pt":"Por Que Contas Segregadas Importam"}',
  '{"en":"A plain-language guide to client-owned account structures and what they actually protect against.","pt":"Um guia em linguagem simples sobre estruturas de conta em nome do cliente."}',
  '{"en":["One of the first questions a careful investor should ask any manager is simple: where exactly does my money sit?","In a segregated, client-owned account structure, capital sits in an account held in the investor''s own name at a regulated broker or custodian — not pooled together with other clients'' money.","This distinction limits commingling risk, gives the investor direct visibility, and protects assets if a manager ceases operating.","It''s a simple question with an outsized impact: always know where your money actually sits."],"pt":["Uma das primeiras perguntas que um investidor cuidadoso deve fazer a qualquer gestor é simples: onde é que o meu dinheiro está exatamente?","Numa estrutura de conta segregada, o capital fica numa conta em nome do próprio investidor, não misturado com o de outros clientes.","Esta distinção limita o risco de mistura de fundos e dá visibilidade direta ao investidor.","É uma pergunta simples com um impacto desproporcional."]}',
  true, now() - interval '23 days', now() - interval '23 days'
),
(
  'dubai-rise-asset-management-hub', 'news', '/src/assets/blog-3.jpg', 5,
  '{"en":"Dubai''s Rise as a Global Asset Management Hub","pt":"A Ascensão do Dubai Como Hub Global de Gestão de Ativos"}',
  '{"en":"Why an increasing number of asset managers are choosing Dubai as a base of operations.","pt":"Porque é que cada vez mais gestoras de ativos escolhem o Dubai como base de operações."}',
  '{"en":["Over the past decade, Dubai has steadily built a reputation as one of the world''s fastest-growing hubs for asset management and financial services.","Geography, dedicated regulatory frameworks, and a growing international talent pool keep coming up as structural factors.","None of this makes licensing automatic or fast — firms still go through a structured, multi-stage process, exactly as we are currently doing.","For a firm built with African roots and global ambitions, that combination is a large part of why we chose to build our institutional base here."],"pt":["Na última década, o Dubai construiu de forma consistente uma reputação como um dos hubs de gestão de ativos que mais rápido cresce no mundo.","Geografia, quadros regulatórios dedicados e um conjunto crescente de talento internacional surgem repetidamente como fatores estruturais.","Nada disto torna o licenciamento automático ou rápido — as empresas continuam a passar por um processo estruturado, exatamente como estamos a fazer.","Essa combinação é grande parte da razão pela qual escolhemos construir aqui a nossa base institucional."]}',
  true, now() - interval '12 days', now() - interval '12 days'
),
(
  'risk-sizing-compounding-edge', 'tips', '/src/assets/blog-4.jpg', 5,
  '{"en":"Risk Sizing: The Underrated Edge in Long-Term Compounding","pt":"Dimensionamento de Risco: A Vantagem Subestimada dos Juros Compostos"}',
  '{"en":"Position sizing frameworks used by disciplined managers to survive drawdowns.","pt":"Frameworks de dimensionamento de posição usados por gestores disciplinados."}',
  '{"en":["Ask experienced managers what separates good performance from great performance, and the conversation usually shifts to sizing.","A 20% loss requires a 25% gain just to recover. A 50% loss requires a 100% gain. This is why risk sizing tends to be the real determinant of long-term outcomes.","Correlation matters just as much as any single position size.","Proper sizing makes sure no single loss can end the compounding process."],"pt":["Pergunta a gestores experientes o que separa um bom desempenho de um ótimo desempenho, e a conversa normalmente muda para dimensionamento.","Uma perda de 20% exige um ganho de 25% só para recuperar. É por isso que o dimensionamento de risco tende a ser o verdadeiro determinante dos resultados a longo prazo.","A correlação importa tanto quanto o tamanho de qualquer posição isolada.","O dimensionamento correto garante que nenhuma perda isolada consegue acabar com o processo de juros compostos."]}',
  true, now() - interval '5 days', now() - interval '5 days'
);
