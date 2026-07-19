import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export type CatKey = "market" | "tips" | "news" | "edu";

export type BlogPost = {
  slug: string;
  img: string;
  cat: CatKey;
  date: { en: string; pt: string };
  read: number;
  title: { en: string; pt: string };
  excerpt: { en: string; pt: string };
  body: { en: string[]; pt: string[] };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "interest-rate-regimes-portfolio-resilience",
    img: heroBg,
    cat: "market",
    date: { en: "Dec 02, 2025", pt: "02 Dez, 2025" },
    read: 8,
    title: {
      en: "Interest Rate Regimes: A Framework for Portfolio Resilience",
      pt: "Regimes de Taxas de Juro: Um Framework para Resiliência de Portfólio",
    },
    excerpt: {
      en: "Central bank policy moves in cycles. Here's the framework we use to think about positioning across different rate environments.",
      pt: "A política dos bancos centrais move-se em ciclos. Este é o framework que usamos para pensar o posicionamento em diferentes ambientes de juros.",
    },
    body: {
      en: [
        "Interest rate cycles shape almost every corner of financial markets — from currency strength to credit spreads to the relative appeal of growth versus defensive assets. Rather than trying to predict the next move from any single central bank, disciplined managers build frameworks that hold up reasonably well across several possible regimes.",
        "The first principle is recognizing that rate regimes are rarely synchronized globally. Different economies move through tightening and easing cycles at different speeds, shaped by local inflation dynamics, currency pressures, and fiscal conditions. This divergence is itself a source of opportunity and risk in currency and fixed-income markets, which is why we pay close attention to the relative — not just absolute — direction of policy.",
        "The second principle is that positioning should be modular. Instead of making one large directional bet on where rates are headed, we prefer to size exposures so that no single regime change can meaningfully impair the portfolio. This means combining strategies with different sensitivities to rate moves, and revisiting those weights as conditions shift.",
        "The third principle is patience around confirmation. Rate regimes tend to shift gradually, with central banks signaling intentions well before acting. We treat early signals as reasons to adjust risk budgets incrementally, not as triggers for wholesale repositioning.",
        "None of this eliminates the uncertainty inherent in macro investing. What it does is replace prediction with structure — a way of engaging with a genuinely unpredictable variable without depending on being right about its next move.",
      ],
      pt: [
        "Os ciclos de taxas de juro moldam praticamente todos os cantos dos mercados financeiros — desde a força das divisas até aos spreads de crédito e ao apelo relativo de ativos de crescimento face a ativos defensivos. Em vez de tentar prever o próximo movimento de um banco central específico, gestores disciplinados constroem frameworks que se mantêm razoavelmente robustos em vários regimes possíveis.",
        "O primeiro princípio é reconhecer que os regimes de taxas raramente estão sincronizados globalmente. Economias diferentes atravessam ciclos de aperto e flexibilização a velocidades diferentes, moldadas pela dinâmica de inflação local, pressões cambiais e condições fiscais. Essa divergência é, por si só, uma fonte de oportunidade e risco nos mercados cambiais e de rendimento fixo, e é por isso que prestamos muita atenção à direção relativa — não só absoluta — da política monetária.",
        "O segundo princípio é que o posicionamento deve ser modular. Em vez de fazer uma grande aposta direcional sobre para onde vão as taxas, preferimos dimensionar exposições de forma que nenhuma mudança de regime, isolada, consiga prejudicar significativamente o portfólio. Isto significa combinar estratégias com sensibilidades diferentes a movimentos de taxas, e rever esses pesos à medida que as condições mudam.",
        "O terceiro princípio é a paciência em torno da confirmação. Os regimes de taxas tendem a mudar gradualmente, com os bancos centrais a sinalizar intenções bem antes de agir. Tratamos sinais precoces como razões para ajustar orçamentos de risco de forma incremental, não como gatilhos para reposicionamento total.",
        "Nada disto elimina a incerteza inerente ao investimento macro. O que faz é substituir a previsão por estrutura — uma forma de lidar com uma variável genuinamente imprevisível sem depender de acertar o seu próximo movimento.",
      ],
    },
  },
  {
    slug: "understanding-currency-volatility",
    img: blog1,
    cat: "market",
    date: { en: "Nov 12, 2025", pt: "12 Nov, 2025" },
    read: 6,
    title: {
      en: "Understanding Currency Volatility: What Drives Emerging Market FX",
      pt: "Entendendo a Volatilidade Cambial: O Que Move o FX de Mercados Emergentes",
    },
    excerpt: {
      en: "A plain-language look at the forces behind emerging market currency swings, and why volatility isn't the same thing as risk.",
      pt: "Uma explicação em linguagem simples das forças por trás das oscilações cambiais em mercados emergentes, e porque volatilidade não é o mesmo que risco.",
    },
    body: {
      en: [
        "Emerging market currencies tend to move more, and more suddenly, than their developed-market counterparts. Understanding why helps put that volatility in context — and helps separate genuine risk from simple noise.",
        "Three forces usually dominate. The first is interest rate differentials: capital tends to flow toward currencies offering higher real yields, and flows reverse quickly when that gap narrows or global risk appetite drops. The second is commodity exposure — many emerging economies are net exporters of raw materials, so their currencies often track global commodity cycles. The third is liquidity: emerging market currency markets are simply thinner than those for major pairs, so the same size of trade moves the price more.",
        "It's worth separating volatility from risk. Volatility describes how much a price moves; risk describes the probability and size of a loss relative to your position and time horizon. A currency can be volatile and still be a reasonable holding if the position is sized appropriately and the investor's horizon is long enough to look through short-term swings.",
        "For a trading desk, this distinction shapes process more than any single forecast does. Position sizing, stop discipline, and diversification across uncorrelated pairs matter more than being right about the next directional move — because no one is right about that consistently.",
        "Currency markets will keep reacting to central bank meetings, commodity swings, and shifts in global risk appetite. The goal isn't to eliminate that reaction — it's to build a process that doesn't depend on predicting it perfectly.",
      ],
      pt: [
        "As divisas de mercados emergentes tendem a mover-se mais, e de forma mais súbita, do que as dos mercados desenvolvidos. Perceber porquê ajuda a colocar essa volatilidade em contexto — e ajuda a separar risco genuíno de simples ruído.",
        "Três forças costumam dominar. A primeira são os diferenciais de taxas de juro: o capital tende a fluir para divisas que oferecem yields reais mais altos, e os fluxos revertem rapidamente quando esse diferencial diminui ou o apetite global por risco cai. A segunda é a exposição a commodities — muitas economias emergentes são exportadoras líquidas de matérias-primas, pelo que as suas divisas costumam acompanhar os ciclos globais de commodities. A terceira é a liquidez: os mercados cambiais de economias emergentes são simplesmente menos profundos do que os dos pares principais, pelo que a mesma dimensão de transação move mais o preço.",
        "Vale a pena separar volatilidade de risco. Volatilidade descreve o quanto um preço se move; risco descreve a probabilidade e a dimensão de uma perda relativa à posição e ao horizonte temporal. Uma divisa pode ser volátil e ainda assim ser uma posição razoável, se o tamanho da posição for adequado e o horizonte do investidor for suficientemente longo para atravessar oscilações de curto prazo.",
        "Para uma mesa de trading, essa distinção molda o processo mais do que qualquer previsão isolada. O dimensionamento de posições, a disciplina de stops, e a diversificação entre pares não correlacionados importam mais do que acertar o próximo movimento direcional — porque ninguém acerta isso de forma consistente.",
        "Os mercados cambiais vão continuar a reagir a reuniões de bancos centrais, oscilações de commodities, e mudanças no apetite global por risco. O objetivo não é eliminar essa reação — é construir um processo que não dependa de a prever na perfeição.",
      ],
    },
  },
  {
    slug: "why-segregated-accounts-matter",
    img: blog2,
    cat: "edu",
    date: { en: "Oct 30, 2025", pt: "30 Out, 2025" },
    read: 4,
    title: {
      en: "Why Segregated Accounts Matter",
      pt: "Por Que Contas Segregadas Importam",
    },
    excerpt: {
      en: "A plain-language guide to client-owned account structures and what they actually protect against.",
      pt: "Um guia em linguagem simples sobre estruturas de conta em nome do cliente e o que realmente protegem.",
    },
    body: {
      en: [
        "One of the first questions a careful investor should ask any manager is simple: where exactly does my money sit? The answer matters more than almost anything else in the relationship.",
        "In a segregated, client-owned account structure, capital sits in an account held in the investor's own name at a regulated broker or custodian — not pooled together with other clients' money inside the manager's own corporate account. The manager is granted trading authority over the account, but never custody of the funds themselves.",
        "This distinction matters for a few concrete reasons. First, it limits commingling risk — your capital isn't mixed with other clients' funds or the firm's own operating capital, which reduces the chance that problems elsewhere in the business affect your holdings. Second, it gives the investor direct visibility: statements come from the broker or custodian, not just the manager, so performance and balances can be independently verified. Third, in the event a manager ceases operating, assets held in a segregated account remain the investor's property and are not part of any insolvency proceedings the manager might face.",
        "None of this replaces the need for basic due diligence — checking who the custodian actually is, confirming trading authority is limited (not full withdrawal access), and understanding the fee structure. But the account structure itself is one of the most important, and most overlooked, questions in evaluating any manager.",
        "It's a simple question with an outsized impact: always know where your money actually sits.",
      ],
      pt: [
        "Uma das primeiras perguntas que um investidor cuidadoso deve fazer a qualquer gestor é simples: onde é que o meu dinheiro está exatamente? A resposta importa mais do que quase tudo o resto na relação.",
        "Numa estrutura de conta segregada, em nome do cliente, o capital fica numa conta detida em nome do próprio investidor, junto de um corretor ou custodiante regulado — não misturado com o dinheiro de outros clientes dentro da conta corporativa do gestor. O gestor recebe autoridade de negociação sobre a conta, mas nunca a custódia dos fundos em si.",
        "Esta distinção importa por algumas razões concretas. Primeiro, limita o risco de mistura de fundos — o teu capital não se mistura com o de outros clientes nem com o capital operacional da própria empresa, o que reduz a hipótese de problemas noutra parte do negócio afetarem as tuas posições. Segundo, dá ao investidor visibilidade direta: os extratos vêm do corretor ou custodiante, não só do gestor, pelo que o desempenho e os saldos podem ser verificados de forma independente. Terceiro, caso um gestor deixe de operar, os ativos numa conta segregada continuam a ser propriedade do investidor e não fazem parte de nenhum processo de insolvência que o gestor possa enfrentar.",
        "Nada disto substitui a necessidade de due diligence básica — verificar quem é realmente o custodiante, confirmar que a autoridade de negociação é limitada (não acesso total a levantamentos), e perceber a estrutura de comissões. Mas a estrutura da conta em si é uma das perguntas mais importantes, e mais esquecidas, ao avaliar qualquer gestor.",
        "É uma pergunta simples com um impacto desproporcional: sabe sempre onde o teu dinheiro está de facto.",
      ],
    },
  },
  {
    slug: "dubai-rise-asset-management-hub",
    img: blog3,
    cat: "news",
    date: { en: "Oct 18, 2025", pt: "18 Out, 2025" },
    read: 5,
    title: {
      en: "Dubai's Rise as a Global Asset Management Hub",
      pt: "A Ascensão do Dubai Como Hub Global de Gestão de Ativos",
    },
    excerpt: {
      en: "Why an increasing number of asset managers are choosing Dubai as a base of operations — and what it means for the industry.",
      pt: "Porque é que cada vez mais gestoras de ativos escolhem o Dubai como base de operações — e o que isso significa para a indústria.",
    },
    body: {
      en: [
        "Over the past decade, Dubai has steadily built a reputation as one of the world's fastest-growing hubs for asset management and financial services. For firms weighing where to base institutional operations, a few structural factors keep coming up.",
        "Geography is an obvious starting point: Dubai sits within a workable time zone overlap with London, much of Africa, and Asian markets in the same business day, which matters for firms managing multi-region strategies. Beyond geography, the UAE has invested heavily in financial free zones with dedicated regulatory frameworks built specifically around financial services, aiming to offer clarity and a predictable path for firms going through licensing.",
        "The talent pool has grown alongside the infrastructure. A large, internationally diverse professional community has developed in the region, drawing experienced managers, analysts, and compliance professionals from established financial centers.",
        "None of this makes licensing automatic or fast — firms still go through a structured, multi-stage process with the relevant regulatory authority, exactly as we are currently doing. But the direction of travel is clear: Dubai has moved from being a regional financial center to being a genuine contender among global hubs for institutional asset management.",
        "For a firm built with African roots and global ambitions, that combination of accessibility, infrastructure, and regulatory seriousness is a large part of why we chose to build our institutional base here.",
      ],
      pt: [
        "Na última década, o Dubai construiu de forma consistente uma reputação como um dos hubs de gestão de ativos e serviços financeiros que mais rápido cresce no mundo. Para empresas a decidir onde basear operações institucionais, alguns fatores estruturais surgem repetidamente.",
        "A geografia é um ponto de partida óbvio: o Dubai situa-se numa sobreposição de fuso horário viável com Londres, grande parte de África, e mercados asiáticos no mesmo dia útil, o que importa para empresas que gerem estratégias multi-regionais. Para além da geografia, os EAU investiram fortemente em zonas francas financeiras com quadros regulatórios dedicados, construídos especificamente para serviços financeiros, com o objetivo de oferecer clareza e um caminho previsível para empresas em processo de licenciamento.",
        "O conjunto de talento cresceu junto com a infraestrutura. Desenvolveu-se na região uma comunidade profissional grande e internacionalmente diversa, atraindo gestores experientes, analistas e profissionais de compliance de centros financeiros já estabelecidos.",
        "Nada disto torna o licenciamento automático ou rápido — as empresas continuam a passar por um processo estruturado, em várias fases, junto da entidade reguladora competente, exatamente como estamos atualmente a fazer. Mas a direção é clara: o Dubai passou de centro financeiro regional a verdadeiro concorrente entre os hubs globais de gestão de ativos institucional.",
        "Para uma empresa construída com raízes africanas e ambições globais, essa combinação de acessibilidade, infraestrutura e seriedade regulatória é grande parte da razão pela qual escolhemos construir aqui a nossa base institucional.",
      ],
    },
  },
  {
    slug: "risk-sizing-compounding-edge",
    img: blog4,
    cat: "tips",
    date: { en: "Oct 05, 2025", pt: "05 Out, 2025" },
    read: 5,
    title: {
      en: "Risk Sizing: The Underrated Edge in Long-Term Compounding",
      pt: "Dimensionamento de Risco: A Vantagem Subestimada dos Juros Compostos",
    },
    excerpt: {
      en: "Position sizing frameworks used by disciplined managers to survive drawdowns — and why surviving is the real edge.",
      pt: "Frameworks de dimensionamento de posição usados por gestores disciplinados para sobreviver a drawdowns — e porque sobreviver é a verdadeira vantagem.",
    },
    body: {
      en: [
        "Ask most new traders what separates good performance from great performance, and they'll talk about entries — finding the right trade at the right time. Ask experienced managers the same question, and the conversation usually shifts to sizing.",
        "The math behind this is unforgiving. A 20% loss requires a 25% gain just to recover. A 50% loss requires a 100% gain. The deeper a drawdown goes, the more disproportionately hard it becomes to compound back to where you started — let alone ahead. This is why risk sizing, not entry timing, tends to be the real determinant of long-term outcomes.",
        "A useful starting discipline is capping the risk on any single position to a small, fixed percentage of total capital — commonly in the low single digits — so that no individual trade, however confident the thesis, can meaningfully damage the portfolio if it's wrong. From there, sizing can flex modestly with conviction and volatility, but always within pre-defined boundaries set before the trade, not adjusted emotionally during it.",
        "Correlation matters just as much as any single position size. Five trades that all move together during stress are, in practical risk terms, closer to one large trade than five diversified ones. Disciplined sizing accounts for how positions behave together, not just individually.",
        "None of this makes losses disappear — they're a normal part of any strategy. What proper sizing does is make sure no single loss, or cluster of correlated losses, can end the compounding process. Staying in the game, on this timeline, tends to matter more than any single winning trade.",
      ],
      pt: [
        "Pergunta à maioria dos traders novatos o que separa um bom desempenho de um ótimo desempenho, e eles vão falar de entradas — encontrar a operação certa no momento certo. Pergunta o mesmo a gestores experientes, e a conversa normalmente muda para dimensionamento.",
        "A matemática por trás disto é implacável. Uma perda de 20% exige um ganho de 25% só para recuperar. Uma perda de 50% exige um ganho de 100%. Quanto mais fundo vai um drawdown, mais desproporcionalmente difícil se torna recompor até ao ponto de partida — quanto mais ultrapassá-lo. É por isso que o dimensionamento de risco, e não o timing de entrada, tende a ser o verdadeiro determinante dos resultados a longo prazo.",
        "Uma disciplina inicial útil é limitar o risco de qualquer posição individual a uma percentagem pequena e fixa do capital total — normalmente na casa de poucos pontos percentuais — para que nenhuma operação isolada, por mais convicção que exista na tese, consiga prejudicar significativamente o portfólio se estiver errada. A partir daí, o dimensionamento pode variar moderadamente com a convicção e a volatilidade, mas sempre dentro de limites pré-definidos antes da operação, nunca ajustados emocionalmente durante ela.",
        "A correlação importa tanto quanto o tamanho de qualquer posição isolada. Cinco operações que se movem todas juntas em momentos de stress são, em termos práticos de risco, mais parecidas com uma única operação grande do que com cinco operações diversificadas. O dimensionamento disciplinado tem em conta como as posições se comportam em conjunto, não só individualmente.",
        "Nada disto faz as perdas desaparecer — são uma parte normal de qualquer estratégia. O que o dimensionamento correto faz é garantir que nenhuma perda isolada, ou conjunto de perdas correlacionadas, consegue acabar com o processo de juros compostos. Continuar em jogo, nesta escala temporal, tende a importar mais do que qualquer operação vencedora isolada.",
      ],
    },
  },
  {
    slug: "role-of-technical-analysis",
    img: blog1,
    cat: "market",
    date: { en: "Sep 28, 2025", pt: "28 Set, 2025" },
    read: 5,
    title: {
      en: "How Technical Analysis Fits Into a Disciplined Trading Process",
      pt: "Como a Análise Técnica se Encaixa num Processo de Trading Disciplinado",
    },
    excerpt: {
      en: "Technical analysis is a tool for structuring decisions under uncertainty — not a crystal ball. Here's how we think about its role.",
      pt: "A análise técnica é uma ferramenta para estruturar decisões sob incerteza — não uma bola de cristal. Eis como pensamos o seu papel.",
    },
    body: {
      en: [
        "Technical analysis gets criticized, fairly often, for treating chart patterns as if they can predict the future. Used that way, the criticism is deserved. Used differently — as a framework for structuring decisions under uncertainty — it plays a genuinely useful role in a disciplined process.",
        "At its core, technical analysis is the study of price and volume behavior to identify areas where supply and demand have historically shifted. Support and resistance zones, trend structure, and volatility patterns don't predict what will happen next; they describe where market participants have reacted before, which is useful context for framing risk.",
        "The practical value shows up less in forecasting and more in execution. Technical levels help define where a trade thesis is proven wrong (a stop), where a position might reasonably be reduced or added to, and how much room a trade needs to work before it should be reassessed. In that sense, technical analysis is less about predicting direction and more about pricing risk around a decision that's already been made for other reasons — macro, fundamental, or otherwise.",
        "It's also worth being honest about its limits. Technical signals can fail, especially around major news events or thin liquidity, and no pattern works with reliable consistency across all market conditions. Treating any single signal as a guarantee is where the discipline breaks down.",
        "Used as one input among several — combined with risk sizing, macro context, and a clear invalidation point — technical analysis becomes a tool for structuring good decisions, not a substitute for making them.",
      ],
      pt: [
        "A análise técnica é criticada, com alguma frequência, por tratar padrões gráficos como se pudessem prever o futuro. Usada dessa forma, a crítica é justa. Usada de forma diferente — como um framework para estruturar decisões sob incerteza — desempenha um papel genuinamente útil num processo disciplinado.",
        "No seu núcleo, a análise técnica é o estudo do comportamento de preço e volume para identificar zonas onde a oferta e a procura mudaram historicamente. Zonas de suporte e resistência, estrutura de tendência, e padrões de volatilidade não preveem o que vai acontecer a seguir; descrevem onde os participantes de mercado já reagiram antes, o que é um contexto útil para enquadrar o risco.",
        "O valor prático aparece menos na previsão e mais na execução. Os níveis técnicos ajudam a definir onde uma tese de trade é considerada errada (um stop), onde uma posição pode razoavelmente ser reduzida ou aumentada, e quanto espaço uma operação precisa para funcionar antes de ser reavaliada. Nesse sentido, a análise técnica tem menos a ver com prever direção e mais com precificar risco à volta de uma decisão já tomada por outras razões — macro, fundamental, ou outras.",
        "Vale também a pena ser honesto quanto aos seus limites. Sinais técnicos podem falhar, especialmente à volta de grandes notícias ou liquidez reduzida, e nenhum padrão funciona com consistência fiável em todas as condições de mercado. Tratar qualquer sinal isolado como uma garantia é onde a disciplina se quebra.",
        "Usada como mais um input entre vários — combinada com dimensionamento de risco, contexto macro, e um ponto claro de invalidação — a análise técnica torna-se uma ferramenta para estruturar boas decisões, não um substituto para as tomar.",
      ],
    },
  },
  {
    slug: "cagr-vs-simple-returns",
    img: blog4,
    cat: "edu",
    date: { en: "Sep 14, 2025", pt: "14 Set, 2025" },
    read: 4,
    title: {
      en: "Understanding CAGR vs. Simple Returns",
      pt: "Entendendo CAGR vs. Retornos Simples",
    },
    excerpt: {
      en: "The compounding math that separates how returns are marketed from how they actually accumulate over time.",
      pt: "A matemática dos juros compostos que separa a forma como os retornos são anunciados de como realmente se acumulam ao longo do tempo.",
    },
    body: {
      en: [
        "Two portfolios can report the same total return over several years and have delivered very different experiences to the investor holding them. Understanding the difference between simple and compound (CAGR) returns explains why.",
        "A simple return just adds up gains and losses over a period: if a portfolio is up 10% one year and 10% the next, the simple total looks like 20%. But returns compound, not add — a 10% gain followed by a 10% gain actually produces a 21% total return (1.10 × 1.10 = 1.21), because the second year's gain is calculated on a larger base.",
        "CAGR — compound annual growth rate — smooths a multi-year return into an equivalent constant annual rate, accounting for that compounding effect. It's a more honest way to compare performance across different time periods or between different investments, because it reflects how money actually grows, not just how the numbers add up on paper.",
        "This distinction matters most when returns are uneven. A portfolio that gains 50% one year and loses 30% the next has a simple average return of 10% per year — which sounds attractive — but the actual compound outcome is roughly 5% annualized, because the loss year erased a large share of the prior gain from a now-larger base. Volatility, not just average return, quietly taxes compounding.",
        "For any investor comparing track records, the practical takeaway is simple: ask for CAGR, not just cumulative or averaged returns, and pay close attention to how much volatility was involved in producing it.",
      ],
      pt: [
        "Dois portfólios podem reportar o mesmo retorno total ao longo de vários anos e, ainda assim, ter proporcionado experiências muito diferentes ao investidor que os detém. Perceber a diferença entre retornos simples e compostos (CAGR) explica porquê.",
        "Um retorno simples apenas soma ganhos e perdas ao longo de um período: se um portfólio sobe 10% num ano e 10% no seguinte, o total simples parece ser 20%. Mas os retornos compõem-se, não se somam — um ganho de 10% seguido de outro ganho de 10% produz na realidade um retorno total de 21% (1,10 × 1,10 = 1,21), porque o ganho do segundo ano é calculado sobre uma base maior.",
        "O CAGR — taxa de crescimento anual composta — suaviza um retorno de vários anos numa taxa anual constante equivalente, tendo em conta esse efeito de composição. É uma forma mais honesta de comparar desempenho entre diferentes períodos de tempo ou entre diferentes investimentos, porque reflete como o dinheiro realmente cresce, não apenas como os números se somam no papel.",
        "Esta distinção importa mais quando os retornos são irregulares. Um portfólio que ganha 50% num ano e perde 30% no seguinte tem uma média simples de retorno de 10% ao ano — o que parece atrativo — mas o resultado composto real é aproximadamente 5% anualizado, porque o ano de perda apagou uma grande parte do ganho anterior a partir de uma base agora maior. A volatilidade, e não só o retorno médio, tributa silenciosamente a composição.",
        "Para qualquer investidor a comparar track records, a conclusão prática é simples: pede sempre o CAGR, não apenas retornos cumulativos ou médios, e presta muita atenção a quanta volatilidade esteve envolvida em produzi-lo.",
      ],
    },
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
