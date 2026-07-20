import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";
export type Lang = "en" | "pt";

type Dict = Record<string, { en: string; pt: string }>;

export const dict = {
  // Nav
  "nav.home": { en: "Home", pt: "Início" },
  "nav.products": { en: "Products", pt: "Produtos" },
  "nav.about": { en: "About", pt: "Sobre" },
  "nav.blog": { en: "Blog", pt: "Blog" },
  "nav.markets": { en: "Global Markets", pt: "Mercados Globais" },
  "nav.consult": { en: "Book a Consultation", pt: "Agendar Reunião" },
  "nav.contact": { en: "Contact", pt: "Contacto" },
  "nav.toggleMenu": { en: "Toggle menu", pt: "Abrir menu" },
  "nav.toggleTheme": { en: "Toggle theme", pt: "Alternar tema" },
  "nav.toggleLang": { en: "Change language", pt: "Alterar idioma" },

  // Regulator bar / hero
  "reg.text": {
    en: "is currently completing its licensing process with",
    pt: "encontra-se atualmente em processo de licenciamento junto de",
  },
  "reg.principal": { en: "the relevant regulatory authority", pt: "a entidade reguladora competente" },
  "reg.authorized": {
    en: "in Dubai, UAE",
    pt: "no Dubai, EAU",
  },
  "hero.badge": {
    en: "4 Years of Documented Track Record",
    pt: "4 Anos de Track Record Documentado",
  },
  "hero.title1": { en: "Capital", pt: "Capital" },
  "hero.title2": { en: "Managed", pt: "Gerido" },
  "hero.title3": { en: "with Discipline.", pt: "com Disciplina." },
  "hero.subtitle": {
    en: "Segregated client-owned accounts, discretionary management and institutional risk oversight for investors who require transparency and a documented record.",
    pt: "Contas segregadas em nome do cliente, gestão discricionária e supervisão de risco institucional para investidores que exigem transparência e histórico documentado.",
  },
  "hero.learn": { en: "See our strategies", pt: "Ver estratégias" },

  // Snapshot
  "snap.perf": { en: "Performance Overview", pt: "Visão de Desempenho" },
  "snap.live": { en: "Live Snapshot", pt: "Painel ao Vivo" },
  "snap.exp": { en: "Track Record", pt: "Track Record" },
  "snap.expVal": { en: "4 Years", pt: "4 Anos" },
  "snap.strat": { en: "Investment Strategies", pt: "Estratégias de Investimento" },
  "snap.stratBadge": { en: "MULTI-ASSET", pt: "MULTI-ATIVOS" },
  "snap.stratVal": { en: "2 Strategies", pt: "2 Estratégias" },
  "snap.reg": { en: "Regulation Status", pt: "Estado Regulatório" },
  "snap.regVal": { en: "In Progress", pt: "Em Curso" },
  "snap.regBadge": { en: "DUBAI", pt: "DUBAI" },

  // Mobile app section
  "app.badge": { en: "Mobile App Coming Soon", pt: "App Móvel em Breve" },
  "app.title1": { en: "Your portfolio,", pt: "O seu portefólio," },
  "app.title2": { en: "in your pocket.", pt: "no seu bolso." },
  "app.subtitle": {
    en: "Our investor portal is being optimised for mobile. Access your portfolio via our secure web dashboard while we prepare the mobile experience.",
    pt: "O portal do investidor está a ser otimizado para dispositivos móveis. Aceda ao seu portefólio pelo painel web seguro enquanto preparamos a versão móvel.",
  },
  "app.analytics": { en: "Analytics", pt: "Análises" },
  "app.strategies": { en: "Strategies", pt: "Estratégias" },
  "app.portfolio": { en: "Portfolio Overview", pt: "Visão do Portefólio" },
  "app.quarter": { en: "Illustrative preview", pt: "Pré-visualização ilustrativa" },
  "app.deposit": { en: "Deposit", pt: "Depositar" },
  "app.withdraw": { en: "Withdraw", pt: "Levantar" },
  "app.available": { en: "Available", pt: "Disponível" },
  "app.risk": { en: "Risk Profile", pt: "Perfil de Risco" },
  "app.active": { en: "Active", pt: "Ativa" },
  "app.badge1": { en: "Track Record", pt: "de Histórico" },
  "app.badge2": { en: "Groups", pt: "Grupos de Estratégia" },
  "app.floating1": { en: "Aurum Core · Institutional Strategy", pt: "Aurum Core · Estratégia Institucional" },
  "app.floating2": {
    en: "Sterling Ascend · High-Risk Strategy",
    pt: "Sterling Ascend · Estratégia de Alto Risco",
  },
  "app.floating3": {
    en: "Coming Soon",
    pt: "Em Breve",
  },

  // Features
  "feat.eyebrow": { en: "Why investors choose us", pt: "Porque nos escolhem" },
  "feat.title": {
    en: "Institutional discipline. Transparent execution.",
    pt: "Disciplina institucional. Execução transparente.",
  },
  "feat.1t": { en: "Documented 4-Year Track Record", pt: "Track Record de 4 Anos Documentado" },
  "feat.1b": {
    en: "Live, audited performance across multiple market cycles.",
    pt: "Desempenho ao vivo e auditado ao longo de vários ciclos de mercado.",
  },
  "feat.2t": { en: "Tiered Portfolios", pt: "Portefólios por Escalões" },
  "feat.2b": {
    en: "Low, medium and high-risk strategies aligned with your objectives.",
    pt: "Estratégias de baixo, médio e alto risco alinhadas com os seus objetivos.",
  },
  "feat.3t": { en: "Risk Oversight", pt: "Supervisão de Risco" },
  "feat.3b": {
    en: "Daily reviews with strict drawdown limits and controlled exposure.",
    pt: "Revisões diárias, limites rígidos de drawdown e exposição controlada.",
  },
  "feat.4t": { en: "Investor Reporting", pt: "Relatórios ao Investidor" },
  "feat.4b": {
    en: "Clear monthly reports and real-time dashboards. Full transparency.",
    pt: "Relatórios mensais claros e painéis em tempo real. Transparência total.",
  },

  // Live performance
  "live.eyebrow": { en: "Track Record", pt: "Track Record" },
  "live.title": { en: "Our Investment Strategies", pt: "As Nossas Estratégias" },
  "live.aum": { en: "AUM", pt: "AUM" },
  "live.return": { en: "12M Return", pt: "Retorno 12M" },
  "live.trackRecord": { en: "4 Years Documented", pt: "4 Anos Documentados" },
  "live.pending": {
    en: "Every operation has been documented since inception. Full audited performance reports are being prepared and will be published here for qualified investors.",
    pt: "Todas as operações foram documentadas desde o início. Os relatórios de performance auditados estão a ser preparados e serão publicados aqui para investidores qualificados.",
  },
  "live.cta": { en: "Read our approach", pt: "Ler a nossa abordagem" },
  "live.disclaimer": {
    en: "Past performance is not indicative of future results. All returns are annualised.",
    pt: "Desempenho passado não indica resultados futuros. Todos os retornos são anualizados.",
  },
  "risk.low": { en: "Low", pt: "Baixo" },
  "risk.medium": { en: "Medium", pt: "Médio" },
  "risk.high": { en: "High", pt: "Alto" },

  // About preview
  "abtp.eyebrow": { en: "About Bantu Trade Capital", pt: "Sobre a Bantu Trade Capital" },
  "abtp.title1": { en: "Institutional structure,", pt: "Estrutura institucional," },
  "abtp.title2": { en: "African", pt: "raízes" },
  "abtp.title3": { en: "roots.", pt: "africanas." },
  "abtp.body": {
    en: "We combine multi-year forex market experience with institutional risk frameworks to deliver disciplined, transparent portfolio management. Every account is client-owned. Every trade is monitored.",
    pt: "Combinamos anos de experiência no mercado forex com processos de risco de nível institucional para entregar gestão de portefólio disciplinada e transparente. Cada conta é do cliente. Cada operação é monitorizada.",
  },
  "abtp.cta": { en: "Meet the team", pt: "Conhecer a equipa" },
  "stats.years": { en: "Years Track Record", pt: "Anos de Track Record" },
  "stats.strategies": { en: "Investment Strategies", pt: "Estratégias" },
  "stats.monitoring": { en: "Risk Monitoring", pt: "Monitorização de Risco" },
  "stats.owned": { en: "Client-Owned Accounts", pt: "Contas do Cliente" },

  // Zero fees
  "zf.title": { en: "Zero Management Fees", pt: "Zero Taxa de Gestão" },
  "zf.body": {
    en: "Performance-based fee structure with no hidden costs. We only earn when you earn.",
    pt: "Estrutura de comissões baseada em desempenho, sem custos ocultos. Só ganhamos quando o cliente ganha.",
  },
  "zf.mgmt": { en: "Management Fee", pt: "Taxa de Gestão" },
  "zf.perf": { en: "Performance Fee", pt: "Taxa de Performance" },

  // Partners
  "part.eyebrow": { en: "Powered by", pt: "Suportado por" },
  "part.title": { en: "Global Financial Institutions", pt: "Instituições Financeiras Globais" },

  // Insights
  "ins.eyebrow": { en: "Latest insights", pt: "Últimas análises" },
  "ins.title": { en: "Market analysis & news", pt: "Análise de mercado e notícias" },
  "ins.viewAll": { en: "View all insights", pt: "Ver todas as análises" },
  "ins.readMore": { en: "Read the full analysis", pt: "Ler a análise completa" },

  // Products
  "prod.badge": { en: "Investment Strategies", pt: "Estratégias de Investimento" },
  "prod.title1": { en: "Choose the portfolio", pt: "Escolha o portefólio" },
  "prod.title2": { en: "for your objectives", pt: "para os seus objetivos" },
  "prod.subtitle": {
    en: "Two portfolio families designed for different risk profiles — from steady compounding to aggressive alpha capture, all under institutional risk oversight.",
    pt: "Duas famílias de portefólios para diferentes perfis de risco — do capital composto consistente à captura agressiva de alfa, todas sob supervisão institucional.",
  },
  "prod.explained": { en: "Strategies explained", pt: "Estratégias explicadas" },
  "prod.compare": { en: "Compare tiers side by side", pt: "Comparar os escalões lado a lado" },
  "prod.feature": { en: "Feature", pt: "Característica" },
  "prod.target": { en: "Target Returns", pt: "Retornos-Alvo" },
  "prod.riskLvl": { en: "Risk Level", pt: "Nível de Risco" },
  "prod.period": { en: "Recommended Period", pt: "Período Recomendado" },
  "prod.focus": { en: "Strategy Focus", pt: "Foco da Estratégia" },
  "prod.assets": { en: "Asset Classes", pt: "Classes de Ativos" },
  "prod.assetsVal": { en: "CFDs & Commodities", pt: "CFDs e Commodities" },
  "prod.monthly": { en: "Monthly Reporting", pt: "Relatório Mensal" },
  "prod.dashboard": { en: "Real-time Dashboard", pt: "Painel em Tempo Real" },
  "prod.support": { en: "Dedicated Support", pt: "Apoio Dedicado" },
  "prod.tierLow": { en: "Low", pt: "Baixo" },
  "prod.tierMed": { en: "Medium", pt: "Médio" },
  "prod.tierHigh": { en: "High", pt: "Alto" },
  "prod.riskLow": { en: "Low Risk", pt: "Risco Baixo" },
  "prod.riskMed": { en: "Medium Risk", pt: "Risco Médio" },
  "prod.riskHigh": { en: "Higher Risk", pt: "Risco Elevado" },
  "prod.focusCons": { en: "Conservative", pt: "Conservador" },
  "prod.focusBal": { en: "Balanced", pt: "Equilibrado" },
  "prod.focusAgg": { en: "Aggressive", pt: "Agressivo" },
  "prod.years5": { en: "5 years", pt: "5 anos" },
  "prod.years3": { en: "3 years", pt: "3 anos" },
  "prod.year1": { en: "1 year", pt: "1 ano" },

  // Calculator
  "calc.eyebrow": { en: "Interactive tool", pt: "Ferramenta interativa" },
  "calc.title": { en: "Strategy Exposure Calculator", pt: "Calculadora de Exposição" },
  "calc.subtitle": {
    en: "Model potential outcomes across risk tiers. Values update in real time.",
    pt: "Simule resultados potenciais entre escalões de risco. Os valores atualizam em tempo real.",
  },
  "calc.amount": { en: "Investment Amount", pt: "Valor a Investir" },
  "calc.strategy": { en: "Strategy", pt: "Estratégia" },
  "calc.exposure": { en: "Exposure", pt: "Exposição" },
  "calc.ret": { en: "Return p.a. (compounding)", pt: "Retorno anual (composto)" },
  "calc.proj": { en: "1-Year Projected Value", pt: "Valor projetado a 1 ano" },
  "calc.disc": {
    en: "*Projected returns are estimates based on historical CAGR and are not guaranteed. Past performance does not guarantee future results.",
    pt: "*Retornos projetados são estimativas baseadas no CAGR histórico e não são garantidos. Desempenho passado não garante resultados futuros.",
  },

  // Investor Profile Quiz
  "quiz.eyebrow": { en: "Interactive tool", pt: "Ferramenta interativa" },
  "quiz.title": { en: "Investor Profile", pt: "Perfil de Investidor" },
  "quiz.subtitle": {
    en: "Answer three quick questions to help us understand your goals. Our team will follow up with a personalised assessment.",
    pt: "Responde a três perguntas rápidas para nos ajudares a entender os teus objetivos. A nossa equipa fará uma avaliação personalizada.",
  },
  "quiz.q1": { en: "What is your time horizon?", pt: "Qual é o teu horizonte temporal?" },
  "quiz.q1.a": { en: "Short term", pt: "Curto prazo" },
  "quiz.q1.b": { en: "Medium term", pt: "Médio prazo" },
  "quiz.q1.c": { en: "Long term", pt: "Longo prazo" },
  "quiz.q2": { en: "What is your risk tolerance?", pt: "Qual é a tua tolerância a risco?" },
  "quiz.q2.a": { en: "Conservative", pt: "Conservador" },
  "quiz.q2.b": { en: "Balanced", pt: "Equilibrado" },
  "quiz.q2.c": { en: "Aggressive", pt: "Agressivo" },
  "quiz.q3": { en: "What is your main objective?", pt: "Qual é o teu objetivo principal?" },
  "quiz.q3.a": { en: "Preserve capital", pt: "Preservar capital" },
  "quiz.q3.b": { en: "Steady growth", pt: "Crescimento constante" },
  "quiz.q3.c": { en: "Maximise returns", pt: "Maximizar retorno" },
  "quiz.resultTitle": { en: "Thank you", pt: "Obrigado" },
  "quiz.result": {
    en: "Based on your answers, one of our strategies may be suitable for you. Speak with our team for a personalised assessment.",
    pt: "Com base nas tuas respostas, uma das nossas estratégias pode ser adequada para ti. Fala com a nossa equipa para uma avaliação personalizada.",
  },
  "quiz.cta": { en: "Book a consultation", pt: "Marcar consultoria" },
  "quiz.restart": { en: "Restart", pt: "Recomeçar" },
  "quiz.progress": { en: "Question", pt: "Pergunta" },

  "onb.eyebrow": { en: "Onboarding", pt: "Início" },
  "onb.title": {
    en: "Get started in four simple steps",
    pt: "Comece em quatro passos simples",
  },
  "onb.1t": { en: "Open account", pt: "Abrir conta" },
  "onb.1b": {
    en: "Complete KYC and account opening in minutes with digital verification.",
    pt: "Complete o KYC e a abertura de conta em minutos com verificação digital.",
  },
  "onb.2t": { en: "Choose strategy", pt: "Escolher estratégia" },
  "onb.2b": {
    en: "Pick the tier that matches your objectives and risk appetite.",
    pt: "Selecione o escalão que corresponde aos seus objetivos e apetite ao risco.",
  },
  "onb.3t": { en: "Fund account", pt: "Financiar conta" },
  "onb.3b": {
    en: "Transfer capital to your fully segregated, client-owned account.",
    pt: "Transfira capital para a sua conta segregada, em seu nome.",
  },
  "onb.4t": { en: "Track performance", pt: "Acompanhar desempenho" },
  "onb.4b": {
    en: "Monitor allocations and returns in real time via the investor dashboard.",
    pt: "Monitorize alocações e retornos em tempo real pelo painel do investidor.",
  },

  // CTA
  "cta.badge": { en: "Ready to start?", pt: "Pronto para começar?" },
  "cta.title1": { en: "Speak with our", pt: "Fale com a nossa" },
  "cta.title2": { en: "team", pt: "equipa" },
  "cta.body": {
    en: "Discuss which strategy fits your objectives. No management fee — only performance-aligned incentives.",
    pt: "Discuta qual a estratégia mais adequada aos seus objetivos. Sem taxa de gestão — apenas incentivos alinhados com o desempenho.",
  },
  "cta.brochure": { en: "Download brochure", pt: "Descarregar brochura" },

  // About page
  "abt.badge": { en: "About Bantu Trade Capital", pt: "Sobre a Bantu Trade Capital" },
  "abt.title1": { en: "Capital managed", pt: "Capital gerido" },
  "abt.title2": { en: "with precision.", pt: "com precisão." },
  "abt.subtitle": {
    en: "Bantu Trade Capital Asset Management is currently completing its licensing process in Dubai, UAE, delivering disciplined portfolio management under institutional standards.",
    pt: "A Bantu Trade Capital Asset Management encontra-se em processo de licenciamento no Dubai (EAU), entregando gestão de portefólios disciplinada segundo padrões institucionais.",
  },
  "abt.founded": { en: "Founded 2022", pt: "Fundada em 2022" },
  "abt.mission": { en: "Mission", pt: "Missão" },
  "abt.missionBody": {
    en: "Deliver institutional-grade portfolio management to sophisticated investors, combining discipline, transparency and technology so that every unit of capital is stewarded with intent.",
    pt: "Entregar gestão de portefólios de nível institucional a investidores sofisticados, combinando disciplina, transparência e tecnologia para que cada unidade de capital seja administrada com propósito.",
  },
  "abt.vision": { en: "Vision", pt: "Visão" },
  "abt.visionBody": {
    en: "Become the reference asset manager for African investors seeking access to global markets with the safeguards, structure and reporting they deserve.",
    pt: "Ser a gestora de referência para investidores africanos que procuram acesso a mercados globais com as salvaguardas, estrutura e relatórios que merecem.",
  },
  "abt.structured": { en: "Structured Capital", pt: "Capital Estruturado" },
  "abt.altTitle": {
    en: "Where alternative capital finds structure",
    pt: "Onde o capital alternativo encontra estrutura",
  },
  "abt.built1": { en: "Built by traders,", pt: "Feito por traders," },
  "abt.built2": { en: "for investors", pt: "para investidores" },
  "abt.founded2": { en: "Founded 2022", pt: "Fundada em 2022" },
  "abt.leadership": { en: "Leadership", pt: "Liderança" },
  "abt.meet": { en: "Meet the team", pt: "Conhecer a equipa" },
  "abt.ceo": { en: "Founder & CEO", pt: "Fundador & CEO" },
  "abt.cio": { en: "Chief Investment Officer", pt: "Chief Investment Officer" },
  "abt.analyst": { en: "Analyst & Strategist", pt: "Analista & Estratega" },
  "abt.teamBio": { en: "Manager and trader with over 5 years of experience in the financial markets.", pt: "Gestor e trader com mais de 5 anos de experiência nos mercados financeiros." },
  "abt.values": { en: "Our values", pt: "Os nossos valores" },
  "abt.stand": { en: "What we stand for", pt: "Aquilo em que acreditamos" },
  "abt.v1t": { en: "Discipline", pt: "Disciplina" },
  "abt.v1b": {
    en: "Rules-based execution and drawdown limits enforced daily.",
    pt: "Execução baseada em regras e limites de drawdown aplicados diariamente.",
  },
  "abt.v2t": { en: "Transparency", pt: "Transparência" },
  "abt.v2b": {
    en: "Full reporting. Segregated accounts. No black boxes.",
    pt: "Relatórios completos. Contas segregadas. Sem caixas-pretas.",
  },
  "abt.v3t": { en: "Performance", pt: "Performance" },
  "abt.v3b": {
    en: "Aligned incentives. We only earn when clients earn.",
    pt: "Incentivos alinhados. Só ganhamos quando o cliente ganha.",
  },
  "abt.v4t": { en: "Integrity", pt: "Integridade" },
  "abt.v4b": {
    en: "Committed to full regulatory compliance and accountable to every investor.",
    pt: "Comprometidos com a conformidade regulatória total e responsáveis perante cada investidor.",
  },
  "abt.owned": { en: "Client-Owned", pt: "Contas do Cliente" },
  "abt.foundedLabel": { en: "Founded", pt: "Fundada" },
  "abt.est": { en: "Est. 2022", pt: "Desde 2022" },

  // Blog
  "blog.badge": { en: "Investment insights", pt: "Análises de investimento" },
  "blog.title1": { en: "News &", pt: "Notícias e" },
  "blog.title2": { en: "insights", pt: "análises" },
  "blog.subtitle": {
    en: "Market commentary, portfolio thinking and educational deep-dives from our management desk.",
    pt: "Comentários de mercado, pensamento de portefólio e artigos aprofundados da nossa mesa de gestão.",
  },
  "blog.featured": { en: "Featured", pt: "Em destaque" },
  "blog.read": { en: "Read article", pt: "Ler artigo" },
  "blog.readMore": { en: "Read the full article", pt: "Ler o artigo completo" },
  "blog.min": { en: "min read", pt: "min de leitura" },
  "blog.catAll": { en: "All", pt: "Todos" },
  "blog.catMarket": { en: "Market Analysis", pt: "Análise de Mercado" },
  "blog.catTips": { en: "Investment Tips", pt: "Dicas de Investimento" },
  "blog.catNews": { en: "Company News", pt: "Notícias" },
  "blog.catEdu": { en: "Education", pt: "Educação" },
  "blog.back": { en: "Back to Insights", pt: "Voltar aos Insights" },
  "blog.related": { en: "Related Articles", pt: "Artigos Relacionados" },
  "blog.disclaimer": {
    en: "This article is for educational and informational purposes only and does not constitute financial, investment, or trading advice. It does not reflect the performance of any specific Bantu Trade Capital strategy. Always seek independent, qualified advice before making investment decisions.",
    pt: "Este artigo é apenas para fins educativos e informativos e não constitui aconselhamento financeiro, de investimento ou de trading. Não reflete o desempenho de nenhuma estratégia específica da Bantu Trade Capital. Procura sempre aconselhamento independente e qualificado antes de tomar decisões de investimento.",
  },
  "blog.f.title": {
    en: "The 2026 Macro Setup: Positioning for Divergent Rate Regimes",
    pt: "O Cenário Macro de 2026: Posicionando-se para Regimes de Juros Divergentes",
  },
  "blog.f.exc": {
    en: "Central bank policy is fragmenting. Here's how we're building resilience into every strategy tier while capturing opportunity across emerging FX.",
    pt: "A política dos bancos centrais está fragmentada. Veja como construímos resiliência em cada nível de estratégia enquanto capturamos oportunidades em FX emergente.",
  },
  "blog.p1.title": {
    en: "Q4 2025 Currency Outlook: Rand Volatility & Global Cycles",
    pt: "Perspectiva Cambial Q4 2025: Volatilidade do Rand e Ciclos Globais",
  },
  "blog.p1.exc": {
    en: "How major central bank divergence is reshaping opportunities across emerging FX pairs.",
    pt: "Como a divergência dos grandes bancos centrais está remodelando oportunidades em pares de FX emergentes.",
  },
  "blog.p2.title": {
    en: "Why Segregated Accounts Matter More Than Ever",
    pt: "Por Que Contas Segregadas São Mais Importantes do Que Nunca",
  },
  "blog.p2.exc": {
    en: "A plain-language guide to client-owned account structures and what they protect.",
    pt: "Um guia em linguagem simples sobre estruturas de conta em nome do cliente e o que protegem.",
  },
  "blog.p3.title": {
    en: "Bantu Trade Capital Onboards Institutional Prime Broker",
    pt: "Bantu Trade Capital Integra Prime Broker Institucional",
  },
  "blog.p3.exc": {
    en: "New execution pathways deliver tighter spreads and improved slippage control.",
    pt: "Novos caminhos de execução entregam spreads mais estreitos e melhor controle de slippage.",
  },
  "blog.p4.title": {
    en: "Risk Sizing: The Underrated Edge in Long-Term Compounding",
    pt: "Dimensionamento de Risco: A Vantagem Subestimada dos Juros Compostos",
  },
  "blog.p4.exc": {
    en: "Position sizing frameworks used by disciplined managers to survive drawdowns.",
    pt: "Frameworks de sizing de posição usados por gestores disciplinados para sobreviver a drawdowns.",
  },
  "blog.p5.title": {
    en: "USD/ZAR Technical Map: Structural Levels Into Year-End",
    pt: "Mapa Técnico USD/ZAR: Níveis Estruturais até o Final do Ano",
  },
  "blog.p5.exc": {
    en: "Key support and resistance zones our desk is tracking heading into December.",
    pt: "Zonas-chave de suporte e resistência que nossa mesa acompanha para dezembro.",
  },
  "blog.p6.title": {
    en: "Understanding CAGR vs. Simple Returns",
    pt: "Entendendo CAGR vs. Retornos Simples",
  },
  "blog.p6.exc": {
    en: "The compounding math that separates good portfolios from great ones.",
    pt: "A matemática dos juros compostos que separa bons portfólios dos ótimos.",
  },

  // Footer
  "ft.regTitle": { en: "Regulatory Disclosure", pt: "Divulgação Regulatória" },
  "ft.regBody": {
    en: "Bantu Trade Capital Asset Management is currently completing its licensing process with the relevant regulatory authority in Dubai, UAE. Full regulatory disclosures will be published here once the process is finalized.",
    pt: "A Bantu Trade Capital Asset Management encontra-se atualmente em processo de licenciamento junto da entidade reguladora competente no Dubai, EAU. As divulgações regulatórias completas serão publicadas aqui assim que o processo for finalizado.",
  },
  "ft.riskTitle": { en: "Risk Disclosure", pt: "Divulgação de Risco" },
  "ft.riskBody": {
    en: "Trading and investing in financial markets involves significant risk of loss. Past performance is not indicative of future results.",
    pt: "Negociar e investir em mercados financeiros envolve risco significativo de perda. Desempenho passado não indica resultados futuros.",
  },
  "ft.stay": { en: "Stay informed", pt: "Mantenha-se informado" },
  "ft.join": { en: "Subscribe to our mailing list", pt: "Subscreva a nossa mailing list" },
  "ft.joinBody": {
    en: "Market analysis and portfolio commentary delivered to your inbox.",
    pt: "Análises de mercado e comentários de portefólio na sua caixa de entrada.",
  },
  "ft.subscribe": { en: "Subscribe", pt: "Subscrever" },
  "ft.tagline": {
    en: "Portfolios managed with precision, institutional oversight and fully client-owned accounts.",
    pt: "Portefólios geridos com precisão, supervisão institucional e contas em nome do cliente.",
  },
  "ft.quick": { en: "Quick links", pt: "Ligações rápidas" },
  "ft.useful": { en: "Useful links", pt: "Ligações úteis" },
  "ft.privacy": { en: "Privacy Policy", pt: "Política de Privacidade" },
  "ft.terms": { en: "Terms of Service", pt: "Termos de Serviço" },
  "ft.disc": { en: "Disclaimer", pt: "Aviso Legal" },
  "ft.paia": { en: "PAIA Manual", pt: "Manual PAIA" },
  "ft.hours": { en: "Working hours", pt: "Horário" },
  "ft.hoursBody": {
    en: "8:00 – 17:00\nMonday – Friday",
    pt: "08:00 – 17:00\nSegunda a sexta",
  },
  "ft.location": { en: "Dubai, United Arab Emirates", pt: "Dubai, Emirados Árabes Unidos" },
  "ft.rights": {
    en: "All rights reserved.",
    pt: "Todos os direitos reservados.",
  },

  // Contact page
  "contact.badge": { en: "Get in touch", pt: "Fala connosco" },
  "contact.title1": { en: "Let's start a", pt: "Vamos começar uma" },
  "contact.title2": { en: "conversation.", pt: "conversa." },
  "contact.subtitle": {
    en: "Whether you're an investor, a partner, or just curious about Bantu Trade Capital\u00a0 we'd like to hear from you.",
    pt: "Seja investidor, parceiro, ou apenas curioso sobre a Bantu Trade Capital\u00a0 gostaríamos de ouvir de ti.",
  },
  "contact.detailsTitle": { en: "Contact details", pt: "Dados de contacto" },
  "contact.emailLabel": { en: "Email", pt: "Email" },
  "contact.locationLabel": { en: "Location", pt: "Localização" },
  "contact.responseNote": {
    en: "We aim to respond to all inquiries within 2 business days.",
    pt: "Procuramos responder a todos os pedidos em até 2 dias úteis.",
  },
  "contact.formName": { en: "Full name", pt: "Nome completo" },
  "contact.formNamePh": { en: "Your name", pt: "O teu nome" },
  "contact.formEmail": { en: "Email", pt: "Email" },
  "contact.formProfile": { en: "I am a...", pt: "Eu sou..." },
  "contact.profileInst": { en: "Institutional investor", pt: "Investidor institucional" },
  "contact.profilePriv": { en: "Private / qualified investor", pt: "Investidor privado / qualificado" },
  "contact.profilePartner": { en: "Partner / introducer", pt: "Parceiro / introdutor" },
  "contact.profileOther": { en: "Other", pt: "Outro" },
  "contact.formMsg": { en: "Message", pt: "Mensagem" },
  "contact.formMsgPh": { en: "Tell us briefly about your interest", pt: "Conta-nos brevemente o teu interesse" },
  "contact.formSubmit": { en: "Send message", pt: "Enviar mensagem" },
  "contact.mailSubject": { en: "New inquiry from bantutradecapital.com", pt: "Novo pedido de bantutradecapital.com" },
  "contact.sentTitle": { en: "Message received", pt: "Mensagem recebida" },
  "contact.sentBody": {
    en: "Thank you for reaching out. Our team will review your message and get back to you shortly.",
    pt: "Obrigado pelo contacto. A nossa equipa vai rever a tua mensagem e responder em breve.",
  },
  "contact.formSending": { en: "Sending...", pt: "A enviar..." },
  "contact.errorMsg": {
    en: "Something went wrong sending your message. Please try again, or email us directly at invest@bantutradecapital.com.",
    pt: "Algo correu mal ao enviar a tua mensagem. Tenta outra vez, ou envia-nos um email diretamente para invest@bantutradecapital.com.",
  },
} satisfies Dict;

type Key = keyof typeof dict;

type Ctx = {
  theme: Theme;
  lang: Lang;
  setTheme: (t: Theme) => void;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (k: Key) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const t = (localStorage.getItem("btc-theme") as Theme) || "dark";
    const l = (localStorage.getItem("btc-lang") as Lang) || "en";
    setThemeState(t);
    setLangState(l);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
    localStorage.setItem("btc-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("btc-lang", lang);
  }, [lang]);

  const value: Ctx = {
    theme,
    lang,
    setTheme: setThemeState,
    setLang: setLangState,
    toggleTheme: () => setThemeState((v) => (v === "dark" ? "light" : "dark")),
    toggleLang: () => setLangState((v) => (v === "en" ? "pt" : "en")),
    t: (k) => dict[k][lang],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
