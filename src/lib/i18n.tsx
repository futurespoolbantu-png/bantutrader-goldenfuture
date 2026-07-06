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
  "nav.consult": { en: "Book a Consultation", pt: "Agendar Consulta" },
  "nav.contact": { en: "Contact", pt: "Contato" },
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
  "hero.title1": { en: "Precision Trading", pt: "Trading de Precisão" },
  "hero.title2": { en: "Powerful", pt: "Resultados" },
  "hero.title3": { en: "Results.", pt: "Poderosos." },
  "hero.subtitle": {
    en: "Segregated client-owned accounts, professional discretionary management, disciplined execution and institutional-grade risk supervision. Built for investors who demand transparency and results.",
    pt: "Contas segregadas de propriedade do cliente, gestão discricionária profissional, execução disciplinada e supervisão de risco de nível institucional. Feito para investidores que exigem transparência e resultados.",
  },
  "hero.learn": { en: "Learn More", pt: "Saber Mais" },

  // Snapshot
  "snap.perf": { en: "Performance Overview", pt: "Visão de Desempenho" },
  "snap.live": { en: "Live Snapshot", pt: "Painel ao Vivo" },
  "snap.exp": { en: "Track Record", pt: "Track Record" },
  "snap.expVal": { en: "4 Years", pt: "4 Anos" },
  "snap.strat": { en: "Investment Strategies", pt: "Estratégias de Investimento" },
  "snap.stratVal": { en: "2 Strategies", pt: "2 Estratégias" },
  "snap.reg": { en: "Regulation Status", pt: "Status Regulatório" },
  "snap.regVal": { en: "In Progress", pt: "Em Curso" },
  "snap.regBadge": { en: "DUBAI", pt: "DUBAI" },

  // Mobile app section
  "app.badge": { en: "Mobile App Coming Soon", pt: "App Mobile em Breve" },
  "app.title1": { en: "Your portfolio,", pt: "Seu portfólio," },
  "app.title2": { en: "in your pocket.", pt: "no seu bolso." },
  "app.subtitle": {
    en: "Our investor portal is being optimized for mobile. Access your portfolio via our secure web dashboard while we prepare a seamless mobile experience.",
    pt: "Nosso portal do investidor está sendo otimizado para mobile. Acesse seu portfólio pelo nosso painel web seguro enquanto preparamos uma experiência mobile impecável.",
  },
  "app.analytics": { en: "Analytics", pt: "Análises" },
  "app.strategies": { en: "Strategies", pt: "Estratégias" },
  "app.portfolio": { en: "Portfolio Overview", pt: "Visão do Portfólio" },
  "app.quarter": { en: "Illustrative preview", pt: "Pré-visualização ilustrativa" },
  "app.deposit": { en: "Deposit", pt: "Depositar" },
  "app.withdraw": { en: "Withdraw", pt: "Sacar" },
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
    pt: "Brevemente Disponível",
  },

  // Features
  "feat.eyebrow": { en: "Why Investors Choose Us", pt: "Por Que Nos Escolhem" },
  "feat.title": {
    en: "Institutional discipline. Transparent execution.",
    pt: "Disciplina institucional. Execução transparente.",
  },
  "feat.1t": { en: "Verified 9-Year Track Record", pt: "Histórico Verificado de 9 Anos" },
  "feat.1b": {
    en: "Live, audited performance across multiple market cycles.",
    pt: "Desempenho ao vivo e auditado em múltiplos ciclos de mercado.",
  },
  "feat.2t": { en: "Tiered Investment Portfolios", pt: "Portfólios em Camadas" },
  "feat.2b": {
    en: "Low, medium and high-risk strategies tailored to your goals and appetite.",
    pt: "Estratégias de baixo, médio e alto risco alinhadas aos seus objetivos.",
  },
  "feat.3t": { en: "Strategy Oversight & Risk", pt: "Supervisão e Risco" },
  "feat.3b": {
    en: "Daily reviews with strict drawdown limits and controlled risk exposure.",
    pt: "Revisões diárias com limites rígidos de drawdown e exposição controlada.",
  },
  "feat.4t": { en: "Investor Reporting", pt: "Relatórios ao Investidor" },
  "feat.4b": {
    en: "Clear monthly reports and real-time dashboards. Full transparency.",
    pt: "Relatórios mensais claros e painéis em tempo real. Transparência total.",
  },

  // Live performance
  "live.eyebrow": { en: "Track Record", pt: "Track Record" },
  "live.title": { en: "Our Investment Strategies", pt: "Nossas Estratégias de Investimento" },
  "live.aum": { en: "AUM", pt: "AUM" },
  "live.return": { en: "12M Return", pt: "Retorno 12M" },
  "live.trackRecord": { en: "4 Years Documented", pt: "4 Anos Documentados" },
  "live.pending": {
    en: "We have been documenting every operation since inception. Full audited performance reports are being prepared and will be published here for qualified investors.",
    pt: "Documentamos todas as operações desde o início. Relatórios de performance auditados estão a ser preparados e serão publicados aqui para investidores qualificados.",
  },
  "live.cta": { en: "Learn About Our Approach", pt: "Conheça a Nossa Abordagem" },
  "live.disclaimer": {
    en: "Past performance is not indicative of future results. All returns are annualized.",
    pt: "Desempenho passado não indica resultados futuros. Todos os retornos são anualizados.",
  },
  "risk.low": { en: "Low", pt: "Baixo" },
  "risk.medium": { en: "Medium", pt: "Médio" },
  "risk.high": { en: "High", pt: "Alto" },

  // About preview
  "abtp.eyebrow": { en: "About Bantu Trader Capital", pt: "Sobre a Bantu Trader Capital" },
  "abtp.title1": { en: "Where Investors Meet", pt: "Onde Investidores Encontram" },
  "abtp.title2": { en: "Results", pt: "Resultados" },
  "abtp.title3": { en: "& Capital Runs Deep.", pt: "e o Capital Corre Fundo." },
  "abtp.body": {
    en: "We combine nine years of forex market experience with institutional risk frameworks to deliver disciplined, transparent portfolio management. Every account is client-owned. Every trade is monitored.",
    pt: "Combinamos nove anos de experiência no mercado forex com frameworks institucionais de risco para entregar gestão disciplinada e transparente. Cada conta é do cliente. Cada operação é monitorada.",
  },
  "abtp.cta": { en: "About Us", pt: "Sobre Nós" },
  "stats.years": { en: "Years Track Record", pt: "Anos de Track Record" },
  "stats.strategies": { en: "Investment Strategies", pt: "Estratégias de Investimento" },
  "stats.monitoring": { en: "Risk Monitoring", pt: "Monitoramento de Risco" },
  "stats.owned": { en: "Client-Owned Accounts", pt: "Contas do Cliente" },

  // Zero fees
  "zf.title": { en: "Zero Management Fees", pt: "Zero Taxa de Gestão" },
  "zf.body": {
    en: "Performance-based fee structure with no hidden costs. We only win when you win.",
    pt: "Estrutura de taxas baseada em desempenho, sem custos ocultos. Só ganhamos quando você ganha.",
  },
  "zf.mgmt": { en: "Management Fee", pt: "Taxa de Gestão" },
  "zf.perf": { en: "Performance Fee", pt: "Taxa de Performance" },

  // Partners
  "part.eyebrow": { en: "Powered By", pt: "Suportado Por" },
  "part.title": { en: "Global Financial Institutions", pt: "Instituições Financeiras Globais" },

  // Insights
  "ins.eyebrow": { en: "Latest Insights", pt: "Últimas Análises" },
  "ins.title": { en: "Market Analysis & News", pt: "Análise de Mercado e Notícias" },
  "ins.viewAll": { en: "View all", pt: "Ver tudo" },
  "ins.readMore": { en: "Read More", pt: "Leia Mais" },

  // Products
  "prod.badge": { en: "Investment Strategies", pt: "Estratégias de Investimento" },
  "prod.title1": { en: "Choose Your Path to", pt: "Escolha Seu Caminho para o" },
  "prod.title2": { en: "Financial Growth", pt: "Crescimento Financeiro" },
  "prod.subtitle": {
    en: "Two portfolio families designed for different risk profiles — from steady compounding to aggressive alpha capture, all under institutional risk oversight.",
    pt: "Duas famílias de portfólio para diferentes perfis de risco — do juros compostos consistente à captura agressiva de alfa, sob supervisão institucional.",
  },
  "prod.explained": { en: "Strategy Explained", pt: "Estratégias Explicadas" },
  "prod.compare": { en: "Compare tiers side by side", pt: "Compare os níveis lado a lado" },
  "prod.feature": { en: "Feature", pt: "Recurso" },
  "prod.target": { en: "Target Returns", pt: "Retornos-Alvo" },
  "prod.riskLvl": { en: "Risk Level", pt: "Nível de Risco" },
  "prod.period": { en: "Recommended Period", pt: "Período Recomendado" },
  "prod.focus": { en: "Strategy Focus", pt: "Foco da Estratégia" },
  "prod.assets": { en: "Asset Classes", pt: "Classes de Ativo" },
  "prod.assetsVal": { en: "CFDs & Commodities", pt: "CFDs e Commodities" },
  "prod.monthly": { en: "Monthly Reporting", pt: "Relatório Mensal" },
  "prod.dashboard": { en: "Real-time Dashboard", pt: "Painel em Tempo Real" },
  "prod.support": { en: "Dedicated Support", pt: "Suporte Dedicado" },
  "prod.tierLow": { en: "Low", pt: "Baixo" },
  "prod.tierMed": { en: "Medium", pt: "Médio" },
  "prod.tierHigh": { en: "High", pt: "Alto" },
  "prod.riskLow": { en: "Low Risk", pt: "Baixo Risco" },
  "prod.riskMed": { en: "Medium Risk", pt: "Médio Risco" },
  "prod.riskHigh": { en: "Higher Risk", pt: "Alto Risco" },
  "prod.focusCons": { en: "Conservative", pt: "Conservador" },
  "prod.focusBal": { en: "Balanced", pt: "Balanceado" },
  "prod.focusAgg": { en: "Aggressive", pt: "Agressivo" },
  "prod.years5": { en: "5 years", pt: "5 anos" },
  "prod.years3": { en: "3 years", pt: "3 anos" },
  "prod.year1": { en: "1 year", pt: "1 ano" },

  // Calculator
  "calc.eyebrow": { en: "Interactive Tool", pt: "Ferramenta Interativa" },
  "calc.title": { en: "Strategy Exposure Calculator", pt: "Calculadora de Exposição" },
  "calc.subtitle": {
    en: "Model potential outcomes across risk tiers. Values update in real time.",
    pt: "Simule resultados potenciais entre níveis de risco. Valores atualizam em tempo real.",
  },
  "calc.amount": { en: "Investment Amount", pt: "Valor do Investimento" },
  "calc.strategy": { en: "Strategy", pt: "Estratégia" },
  "calc.exposure": { en: "Exposure", pt: "Exposição" },
  "calc.ret": { en: "Return p.a. (compounding)", pt: "Retorno a.a. (composto)" },
  "calc.proj": { en: "1-Year Projected Value", pt: "Valor Projetado em 1 Ano" },
  "calc.disc": {
    en: "*Projected returns are estimates based on historical CAGR and are not guaranteed. Past performance does not guarantee future results.",
    pt: "*Retornos projetados são estimativas baseadas em CAGR histórico e não são garantidos. Desempenho passado não garante resultados futuros.",
  },

  // Onboarding
  "onb.eyebrow": { en: "Onboarding", pt: "Início" },
  "onb.title": {
    en: "Get started in four simple steps",
    pt: "Comece em quatro passos simples",
  },
  "onb.1t": { en: "Open Account", pt: "Abrir Conta" },
  "onb.1b": {
    en: "Complete KYC and account opening in minutes with digital verification.",
    pt: "Complete o KYC e a abertura de conta em minutos com verificação digital.",
  },
  "onb.2t": { en: "Choose Strategy", pt: "Escolher Estratégia" },
  "onb.2b": {
    en: "Pick the tier that matches your objectives and risk appetite.",
    pt: "Selecione o nível que combina com seus objetivos e apetite de risco.",
  },
  "onb.3t": { en: "Fund Account", pt: "Aportar Recursos" },
  "onb.3b": {
    en: "Transfer capital to your fully segregated, client-owned account.",
    pt: "Transfira capital para sua conta totalmente segregada e de sua propriedade.",
  },
  "onb.4t": { en: "Track Performance", pt: "Acompanhar Desempenho" },
  "onb.4b": {
    en: "Monitor allocations and returns in real time via the investor dashboard.",
    pt: "Monitore alocações e retornos em tempo real pelo painel do investidor.",
  },

  // CTA
  "cta.badge": { en: "Ready to Start?", pt: "Pronto para Começar?" },
  "cta.title1": { en: "Start Investing", pt: "Comece a Investir" },
  "cta.title2": { en: "Today", pt: "Hoje" },
  "cta.body": {
    en: "Speak with our team about which strategy fits your goals. No management fee — only performance-aligned incentives.",
    pt: "Fale com nossa equipe sobre qual estratégia se alinha aos seus objetivos. Sem taxa de gestão — apenas incentivos alinhados ao desempenho.",
  },
  "cta.brochure": { en: "View Brochure", pt: "Ver Brochura" },

  // About page
  "abt.badge": { en: "About Bantu Trader Capital", pt: "Sobre a Bantu Trader Capital" },
  "abt.title1": { en: "Where Capital Is Managed", pt: "Onde o Capital é Gerido" },
  "abt.title2": { en: "With Precision.", pt: "Com Precisão." },
  "abt.subtitle": {
    en: "Bantu Trader Capital Asset Management is currently completing its licensing process in Dubai, UAE, delivering disciplined portfolio management under institutional standards.",
    pt: "A Bantu Trader Capital Asset Management encontra-se atualmente em processo de licenciamento no Dubai, EAU, entregando gestão de portfólio disciplinada sob padrões institucionais.",
  },
  "abt.founded": { en: "2022 · Founded", pt: "2022 · Fundada" },
  "abt.mission": { en: "Our Mission", pt: "Nossa Missão" },
  "abt.missionBody": {
    en: "To deliver institutional-grade portfolio management to sophisticated investors — combining discipline, transparency and technology so every rand of capital is stewarded with intent.",
    pt: "Entregar gestão de portfólio de nível institucional a investidores sofisticados — combinando disciplina, transparência e tecnologia para que cada rand de capital seja administrado com propósito.",
  },
  "abt.vision": { en: "Our Vision", pt: "Nossa Visão" },
  "abt.visionBody": {
    en: "To become the reference asset manager for African investors seeking access to global markets with the safeguards, structure and reporting they deserve.",
    pt: "Tornar-se a gestora de referência para investidores africanos que buscam acesso a mercados globais com as salvaguardas, estrutura e relatórios que merecem.",
  },
  "abt.structured": { en: "Structured Capital", pt: "Capital Estruturado" },
  "abt.altTitle": {
    en: "Where Alternative Capital Finds Structure",
    pt: "Onde o Capital Alternativo Encontra Estrutura",
  },
  "abt.built1": { en: "Built by Traders,", pt: "Feito por Traders," },
  "abt.built2": { en: "For Investors", pt: "para Investidores" },
  "abt.founded2": { en: "Founded 2025", pt: "Fundada em 2025" },
  "abt.leadership": { en: "Leadership", pt: "Liderança" },
  "abt.meet": { en: "Meet the team", pt: "Conheça a equipe" },
  "abt.ceo": { en: "Founder & CEO", pt: "Fundador & CEO" },
  "abt.analyst": { en: "Analyst & Strategist", pt: "Analista & Estrategista" },
  "abt.teamBio": { en: "Manager and trader with over 5 years of experience in the financial markets.", pt: "Gestor e trader com mais de 5 anos de experiência no mercado financeiro." },
  "abt.values": { en: "Our Core Values", pt: "Nossos Valores" },
  "abt.stand": { en: "What we stand for", pt: "No que acreditamos" },
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
    en: "Aligned incentives. We only win when clients win.",
    pt: "Incentivos alinhados. Só ganhamos quando o cliente ganha.",
  },
  "abt.v4t": { en: "Integrity", pt: "Integridade" },
  "abt.v4b": {
    en: "Regulated, audited and accountable to every investor.",
    pt: "Regulados, auditados e responsáveis perante cada investidor.",
  },
  "abt.owned": { en: "Client Owned", pt: "Contas do Cliente" },
  "abt.foundedLabel": { en: "Founded", pt: "Fundada" },
  "abt.est": { en: "Est. 2025 · Johannesburg", pt: "Est. 2025 · Joanesburgo" },

  // Blog
  "blog.badge": { en: "Investment Insights", pt: "Análises de Investimento" },
  "blog.title1": { en: "News &", pt: "Notícias e" },
  "blog.title2": { en: "Insights", pt: "Análises" },
  "blog.subtitle": {
    en: "Market commentary, portfolio thinking and educational deep-dives from our management desk.",
    pt: "Comentários de mercado, pensamento de portfólio e aprofundamentos educacionais da nossa mesa de gestão.",
  },
  "blog.featured": { en: "Featured", pt: "Destaque" },
  "blog.read": { en: "Read Article", pt: "Ler Artigo" },
  "blog.readMore": { en: "Read More", pt: "Leia Mais" },
  "blog.min": { en: "min read", pt: "min de leitura" },
  "blog.catAll": { en: "All", pt: "Todos" },
  "blog.catMarket": { en: "Market Analysis", pt: "Análise de Mercado" },
  "blog.catTips": { en: "Investment Tips", pt: "Dicas de Investimento" },
  "blog.catNews": { en: "Company News", pt: "Notícias da Empresa" },
  "blog.catEdu": { en: "Education", pt: "Educação" },
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
    en: "Bantu Trader Capital Onboards Institutional Prime Broker",
    pt: "Bantu Trader Capital Integra Prime Broker Institucional",
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
    en: "Bantu Trader Capital Asset Management is currently completing its licensing process with the relevant regulatory authority in Dubai, UAE. Full regulatory disclosures will be published here once the process is finalized.",
    pt: "A Bantu Trader Capital Asset Management encontra-se atualmente em processo de licenciamento junto da entidade reguladora competente no Dubai, EAU. As divulgações regulatórias completas serão publicadas aqui assim que o processo for finalizado.",
  },
  "ft.riskTitle": { en: "Risk Disclosure", pt: "Divulgação de Risco" },
  "ft.riskBody": {
    en: "Trading and investing in financial markets involves significant risk of loss. Past performance is not indicative of future results.",
    pt: "Negociar e investir em mercados financeiros envolve risco significativo de perda. Desempenho passado não indica resultados futuros.",
  },
  "ft.stay": { en: "Stay Informed", pt: "Fique Informado" },
  "ft.join": { en: "Join Our Mailing List", pt: "Junte-se à Nossa Lista" },
  "ft.joinBody": {
    en: "Market insights and portfolio commentary — straight to your inbox.",
    pt: "Análises de mercado e comentários de portfólio — direto na sua caixa de entrada.",
  },
  "ft.subscribe": { en: "Subscribe", pt: "Inscrever" },
  "ft.tagline": {
    en: "Precision-managed portfolios with institutional oversight and full client-owned accounts.",
    pt: "Portfólios geridos com precisão, supervisão institucional e contas totalmente do cliente.",
  },
  "ft.quick": { en: "Quick Links", pt: "Links Rápidos" },
  "ft.useful": { en: "Useful Links", pt: "Links Úteis" },
  "ft.privacy": { en: "Privacy Policy", pt: "Política de Privacidade" },
  "ft.terms": { en: "Terms of Service", pt: "Termos de Serviço" },
  "ft.disc": { en: "Disclaimer", pt: "Aviso Legal" },
  "ft.paia": { en: "PAIA Manual", pt: "Manual PAIA" },
  "ft.hours": { en: "Work Hours", pt: "Horário" },
  "ft.hoursBody": {
    en: "8:00 AM – 5:00 PM\nMonday – Friday",
    pt: "08:00 – 17:00\nSegunda – Sexta",
  },
  "ft.rights": {
    en: "All rights reserved.",
    pt: "Todos os direitos reservados.",
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
