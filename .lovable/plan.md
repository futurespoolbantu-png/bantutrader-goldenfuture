
# Elevar Bantu Trade Capital — padrão institucional + identidade visual africana

Objetivo: remover a "cara de template de IA", uniformizar tipografia/espaçamento/CTAs, e introduzir um padrão geométrico SVG original inspirado em arte têxtil africana, usando **exclusivamente a paleta atual** (preto/surface + dourado + verde/vermelho semânticos). Vou mostrar 3 variações do padrão antes de aplicar em todo o site.

---

## Parte 1 — Limpeza visual e de copy (institucional)

**Copy (`src/lib/i18n.tsx`, PT e EN)**
- Rever hero, feature grid, "About preview", "Zero Fees", app, insights, footer.
- Substituir formulações genéricas ("Empowering…", "Unlock…", "Saiba mais", "Read more", "Click here", "Take control…") por copy específico, sóbrio, com voz lusófona/angolana. Exemplos:
  - CTAs: `Ver planos`, `Falar com um gestor`, `Ler análise completa`, `Ver todas as análises`, `Abrir conta`, `Descarregar relatório` (em vez de `Saiba mais`/`Read More` repetidos).
  - Hero PT: título curto, factual (ex.: "Gestão de capital com histórico auditado desde 2021").
- Voz consistente PT-PT/Angola (não PT-BR): "gestão", "portefólio", "relatório", "ecrã", "levantamento".

**Tipografia**
- Manter apenas as 2 famílias já definidas: `Space Grotesk` (display) + `Inter` (body). Confirmar que nada usa fontes ad-hoc.
- Escala fixa: H1 `text-5xl/7xl`, H2 `text-4xl/5xl`, H3 `text-xl`, eyebrow `text-xs uppercase tracking-[0.25em]`, body `text-base`, small `text-sm`. Remover tamanhos aleatórios.

**Elementos "AI-look" a remover / atenuar**
- Reduzir `text-gradient-gold` em títulos (manter só 1 palavra-chave por página, não em cada H2).
- Remover blur radial dourado do bloco "Zero Fees" (`-right-24 -top-24 blur-3xl`) — substituir por faixa do novo padrão.
- Remover ícone `Sparkles` no eyebrow do MobileAppSection (emoji-like decorativo).
- Auditar `glass` util e substituir por `surface-card` sólido onde não acrescenta função.
- `hover:scale-[1.03]` no CTA principal → `hover:bg-gold-dark` (mais institucional).

**Espaçamento e alinhamento**
- Normalizar espaçamento vertical entre secções para `mt-24 md:mt-32` (hoje há `mt-10`, `mt-32` misturados).
- Container único: `mx-auto max-w-7xl px-4 md:px-6`.
- Grelhas de cards: `gap-6` uniforme.

**CTAs e links**
- Auditar todos `Link`s. Substituir `Read More` / `Saiba mais` repetidos por texto descritivo em contexto (ex.: `Ler análise de mercado`, `Ver perfil da equipa`).
- Botões: primário = `bg-gold`; secundário = `border border-border`. Terciário = link com seta. Sem terceiro estilo alternativo.

**Imagens**
- Manter fotos da equipa (`team-*.jpg`, `paulo-domingos`, `samuelson-gomes`) — são específicas, não stock.
- `hero-bg.jpg`: manter mas reduzir opacidade e sobrepor com o novo padrão SVG (ver Parte 2).
- Imagens de blog (`blog-1..4.jpg`): rever se são stock genérico de "mãos+gráfico"; se sim, substituir por: (a) capturas editoriais de dados/candlestick reais geradas, ou (b) composições tipográficas com o padrão africano como fundo. Confirmar contigo antes de gerar novas.

**Paleta**
- Congelar tokens em `src/styles.css` (`--gold`, `--gold-soft`, `--gold-dark`, `--success`, `--danger`, `--surface`, `--surface-2`, `--background`, `--foreground`).
- Fazer sweep e substituir quaisquer `oklch(...)` inline por tokens (ex.: `text-[oklch(0.55_0.18_155)]` → `text-success`; adicionar utilities `text-success`/`bg-success/15` se necessário).

---

## Parte 2 — Padrão geométrico africano (SVG)

**Design**
- Ficheiro único `src/components/AfricanPattern.tsx` exportando um SVG inline, parametrizável (`variant`, `opacity`, `color`).
- Camadas horizontais onduladas (paths sinusoidais suaves) com motivos geométricos entre elas:
  - triângulos alternados (kente-inspired)
  - quadrados concêntricos (bogolan-inspired)
  - linhas finas paralelas + losangos pequenos
- Traço 1px, `stroke-current`, `fill="none"` na maioria dos elementos → leve e nítido.
- Usa `currentColor` para herdar `text-gold` / `text-foreground` — nenhuma cor nova.
- Pattern definido com `<pattern>` SVG tileável (repetição horizontal infinita, sem custo).

**3 variações a apresentar (via `questions--ask_questions` tipo `visual_choice` com screenshots)**
1. **Faixa separadora fina** (8px de altura, `text-gold`, opacity 60%) entre secções principais.
2. **Marca d'água no hero** (SVG grande, opacity 6%, `text-gold`, atrás do texto) — substitui o glow radial atual.
3. **Rodapé decorativo** (banda de 60px no topo do footer, opacity 12%) + faixas separadoras finas nas secções.

Podes escolher 1, combinar 2, ou pedir ajustes.

**Performance**
- SVG inline, ~1–2 KB, sem requests extra.
- `<pattern>` reutilizado via `<use>` — o browser só faz raster de um tile.
- `aria-hidden="true"` e `pointer-events-none` em todos os usos decorativos.

---

## Ordem de execução

1. Criar `AfricanPattern.tsx` + página de preview interna com as 3 variações.
2. Screenshot das 3 → `questions--ask_questions` para escolheres.
3. Enquanto esperas: limpeza de copy (i18n PT/EN), tipografia, espaçamento, CTAs, remoção de gradientes/glass/sparkles decorativos, sweep de cores para tokens.
4. Aplicar variação escolhida do padrão nos sítios acordados.
5. Rebuild + verificação visual (Playwright) em desktop e mobile.

## O que **não** vou alterar sem confirmação
- Estrutura de rotas e navegação.
- Lógica de negócio, dados de fundos, i18n switcher.
- Fotos da equipa.
- Substituição das imagens de blog (pergunto primeiro se queres regenerar).
