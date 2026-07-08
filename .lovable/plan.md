## Plan: Adicionar favicon Bantu Trade Capital

**Contexto**
- Logo existente: `src/assets/bantu-logo.png` (via asset pointer `bantu-logo.png.asset.json`, hospedado em CDN)
- Este projeto usa TanStack Start — não há `index.html`. As tags `<head>` são definidas em `src/routes/__root.tsx` via `head()`
- Já existe `public/favicon.ico` (default Lovable) que precisa ser substituído

**Passos**

1. **Descarregar o logo do CDN** para `public/favicon.png` (versão PNG, servida em `/favicon.png`)

2. **Remover o favicon default**: apagar `public/favicon.ico` (evita servir o ícone Lovable a clientes que ignoram o `<link>`)

3. **Atualizar `src/routes/__root.tsx`**:
   - Substituir o `link` `{ rel: "icon", href: "/favicon.ico" }` por:
     - `{ rel: "icon", type: "image/png", href: "/favicon.png" }`
     - `{ rel: "apple-touch-icon", href: "/favicon.png" }`
   - Alterar o `title` de `"Bantu Trader Capital — Precision Trading. Powerful Results."` para `"Bantu Trade Capital"` (também no `og:title` e `twitter:title` para manter consistência)

4. **Verificar**: fazer request a `/favicon.png` no preview e confirmar que serve o logo; inspecionar o `<head>` renderizado para garantir as tags corretas.

**Notas**
- Não vou gerar `favicon.ico` separado — um único `favicon.png` referenciado com `type="image/png"` é suficiente e é a abordagem recomendada para este stack. Confirma se preferes que gere também um `.ico` multi-resolução (requer conversão adicional).
- O título do browser passa a ser exatamente `"Bantu Trade Capital"` como pediste — isto substitui o tagline "Precision Trading. Powerful Results." que estava antes. Confirma se queres manter o tagline.
