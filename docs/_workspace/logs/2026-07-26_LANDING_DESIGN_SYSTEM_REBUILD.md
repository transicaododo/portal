# 2026-07-26 — Reconstrução da Landing a partir do Design System

## Contexto e mudança de arquitetura

Nova diretriz do responsável, substituindo a estratégia "Product First"
do `TASK_ROUTER.md` §80: `frontend/src` passa a ser o único local de UI
nova; código antigo do Portal/Login/Admin (`AppShell`, `Button`,
`TextField`, todas as páginas de portal, `lib/*.ts` de API) foi movido
para `frontend/src/legacy-src/` — utilizável só como referência de
lógica de negócio/API/auth, nunca como referência visual. `design-system/`
(pasta de exports Figma/PDF/imagens/fontes) passa a ser tratada como o
próprio produto, não documentação de apoio — nunca inferir identidade a
partir de `legacy-src`.

Sequência de build mandatada: **Design System → Landing → Login →
Portal**, nunca desenhando uma tela seguinte antes da anterior estar
consolidada. Esta sessão cobriu o ciclo completo da Landing, do zero até
aprovação final.

## Fases da sessão

1. **Extração de identidade** — leitura isolada de `design-system/`
   (paleta `paleta de cores.jpg`, mockup `dodo principal.pdf`, export
   Figma `html-dodo.zip`) para reconstruir paleta (Cotton/Cherry
   Red/Maroon/Noir Black), tipografia (Work Sans + Elms Sans — as
   demais fontes do export Figma eram artefatos não usados), princípios
   de composição e narrativa da Landing, sem olhar `frontend/` como
   referência.
2. **Implementação inicial** — tokens novos só quando o Design System
   não cobria algo (registrado como lacuna, nunca inventado
   silenciosamente), componentes (`Reveal` para scroll-reveal),
   estrutura de seções (hero, manifesto/"sobre", arquitetura de
   serviços em accordion, metodologia, CTA final, rodapé).
3. **Refinamento visual pixel-a-pixel** contra `dodo principal.pdf`.
4. **Motion System** — estudo técnico (não visual) de
   estudioela.com (site antigo da agência) para extrair princípios de
   easing/timing/stagger, centralizados em `theme/motion.css` +
   `motion.ts` (nenhum valor de motion hardcoded em componente).
5. **Auditoria de acessibilidade/UX/performance** — bug real
   encontrado e corrigido: link do rodapé ficava invisível no hover
   (herdava cor de hover pensada pra fundo diferente do fundo real do
   rodapé).
6. **Composição vs. referência oficial** — `github.com/estudioela/
   criativododo` (= mesmo código-fonte de `estudioela.com`, confirmado
   via `gh repo view --json homepage`) adotado como referência de
   *composição* (grid, ritmo, proporção), nunca de identidade. Técnica
   usada: puxar o CSS real do repo via `gh api repos/.../contents/
   assets/styles.css --jq .content | base64 -d` em vez de comparar só
   por screenshot — encontrou a causa raiz de um bug de quebra de linha
   (headline do manifesto usando o mesmo token de título de seção
   [64px] em vez de um tamanho de citação editorial próprio [texto
   quebrava em uma palavra por linha]).
7. **Fortalecimento arquitetural** — tokens para valores repetidos,
   nenhuma duplicação de comportamento entre seções, comentários de
   código reescritos para explicar propósito, nunca histórico/origem.
8. **Prioridade Go-Live** — parar de perseguir polimento cosmético de
   baixo impacto; focar em fundação reutilizável (tokens/componentes/
   motion) que Login/Portal vão herdar sem exceção.
9. **Direção de arte final** (múltiplos ciclos, "Regra do Refinamento
   Incremental" explícita do responsável — só mudar com ganho objetivo
   demonstrável, nunca por gosto pessoal ou "é só diferente"):
   - Removido `font-style: italic` de `.teseParagrafo` e capados os
     pesos de fonte no range 400–700 em todo o arquivo (regra nova:
     hierarquia só por peso/escala/espaçamento, nunca itálico).
   - Novo token `--text-quote` (papel de citação editorial, distinto
     de `--text-title`) resolveu o wrap quebrado do manifesto.
   - Bug real de responsivo: `.teseHeadlineWrap` com `flex: 0 1 340px`
     virava altura (não largura) em `flex-direction: column` no
     breakpoint de 1100px, criando ~280px de vão morto — corrigido com
     `flex: none` no breakpoint.
   - Passada de redução proporcional de escala pedida pelo responsável:
     títulos -20% (64px→52px, 48px→38px, 28px→22px), corpo -15%
     (18px→15px), rodapé compactado (padding 24/48px → 16/24px,
     tipografia 14px→12px).
   - CTA + rodapé reestruturados em coluna editorial única alinhada à
     esquerda (era centralizada), rodapé com pouco respiro próprio para
     ler como continuação do CTA, não bloco à parte.
   - Parágrafos da metodologia alinhados à direita (só o título estava,
     inconsistência apontada pelo responsável via screenshot).
   - Rodapé completado com spotify/pinterest/contato (placeholders
     `href="#"` com `TODO`, `contato` aponta pra âncora real
     `#contato`), substituindo "estúdio elã" por "criativo Dodô".
   - **Bug real encontrado nesse processo:** o rodapé usava o
     componente `Reveal` (scroll-reveal via `IntersectionObserver`),
     cujo `rootMargin` de `-15%` exige que o elemento entre nos 85%
     superiores da viewport pra disparar. Conteúdo fixado no fim
     absoluto da página nunca satisfaz essa condição depois que o
     scroll atinge o máximo — o rodapé inteiro (copyright + todos os
     links) ficava permanentemente em `opacity: 0`, invisível pra
     qualquer visitante. Corrigido removendo o `Reveal` só do rodapé
     (sem alterar o sistema de motion compartilhado): conteúdo no fim
     absoluto da página não tem narrativa de "revelar ao se aproximar"
     mesmo, já está na tela quando o usuário chega lá.

## Resultado

Responsável aprovou explicitamente ("APROVADO!!!!!!!!!!!!"). Commit
`2dce389` (`feat(landing): finalize DODÔ landing page composition and
motion system`), pushado para `fix/session-pipeline-test`.

## Commits relevantes

- `2dce389` — Landing completa: `LandingPage.tsx`/`.module.css`,
  `theme/tokens.css`, `theme/motion.css`, `motion.ts`,
  `components/Reveal.tsx`/`.module.css`, assets de marca
  (`hero-compass.png`, `wordmark-preto.svg`), `App.tsx`/`main.tsx`/
  `index.css` ajustados para servir só a Landing.

## Pendência não resolvida nesta sessão

A migração do scaffold antigo (`frontend/src/legacy-src/`, ~85 arquivos
deletados de `frontend/src/pages|components|lib`) já estava no working
tree antes desta sessão (não foi ação desta sessão) e segue **não
commitada** — decisão deliberada de não misturar no commit da Landing.
Precisa de revisão e commit próprio antes de iniciar o Login.

## Próxima fase

Login, herdando o mesmo sistema de tokens/motion/container da Landing.

---

## 2026-07-26 (sessão separada) — Design System DODÔ: projeto no Claude Design, Manual editorial e ADR-021

Sessão distinta da reconstrução da Landing acima — tarefa própria do
responsável do produto, não parte da sequência Design System → Landing
→ Login → Portal em si, mas um deliverable de referência para as
próximas etapas.

### O que foi construído

1. **Projeto "Design System DODÔ" no Claude Design** (via ferramenta
   `DesignSync`, `projectId b5b37e19-3bd4-4ceb-b415-5d6c4b98d604`) — 20
   arquivos: `README.md` (11 seções: Introdução, Brand Foundations,
   Color System, Typography, Layout Foundation, Components, Interaction
   & Motion, Patterns, Product Themes, Roadmap, Pendências) + cartões de
   preview HTML vivos (tokens, componentes, padrões, product themes,
   marca), tudo extraído do código real (`frontend/src/theme/tokens.css`,
   `frontend/legacy-src/theme/tokens.css`), nunca inventado.
2. **Artifact HTML único** ("Manual de Design — DODÔ",
   `https://claude.ai/code/artifact/47276095-3be0-4a61-baf3-b044e0e3d072`)
   — mesmo conteúdo, publicado como página autocontida (fontes reais
   embutidas em base64, sem dependência externa).

### Achado técnico relevante (vale para Login/Portal)

O repositório tem **duas gerações de tokens/componentes coexistindo,
sem reconciliação**: a ativa (`frontend/src`, paleta Cherry Red/Cotton/
Noir Black, só `LandingPage`+`Reveal` existem) e a estacionada
(`frontend/legacy-src`, paleta laranja/roxo, biblioteca de componentes
completa — Button, Badge, TextField/SelectField/TextareaField,
Pagination, EmptyState, AppShell, PortalShell, AuthSplitLayout — real,
mas não importada por nada hoje). `ADR-019` documenta essa divergência.

Ativos oficiais de marca ficam só em `frontend/src/assets/brand/`:
exatamente 2 SVGs — `wordmark-preto.svg` (assinatura institucional,
**confirmadamente usado** em `LandingPage.tsx:2`) e `stack-preto.svg`
(emblema "Ô", geometria de monograma compacto, **não usado por nenhum
componente hoje**). Não existem variantes coloridas/claras oficiais
fora do acervo já removido (ver ADR-021 abaixo).

### Iteração de direção de arte (pedidos do responsável, em sequência)

Versão inicial comunicava "documentação de engenharia"; o responsável
redirecionou para tratamento editorial (Cotton dominante, Cherry Red só
como destaque, respiro vertical amplo, capítulos como páginas de livro,
inspiração HIG/Material reinterpretada com o DNA DODÔ) e, depois, para
curadoria editorial mais rígida: paleta legada (laranja/roxo/lime)
rebaixada a nota histórica compacta (sem grade de amostras/gráfico de
proporção), 19 pendências técnicas reduzidas a 5 realmente relevantes
para identidade + 1 apêndice técnico denso, e uma seção nova explicando
a arquitetura de identidade (Wordmark = assinatura institucional; Ô =
emblema autônomo, não uma redução do wordmark) usando só os 2 SVGs
oficiais reais, sem recriar nem simular logotipo.

### ADR-021 e limpeza de documentação de Design

O responsável pediu exclusão completa de toda documentação de Design
anterior a esta sessão. Recusado no primeiro pedido, citando
`CLAUDE.md` (`Não apagar dados`, imutabilidade de ADR, diretórios
congelados). O responsável então optou por mudar a regra primeiro,
como caminho correto — resultado:

- **`ADR-021`** (novo,
  `docs/adrs/ADR-021-documentacao-de-design-nao-e-registro-historico-permanente.md`):
  documentação de Design deixa de ser registro histórico permanente;
  única fonte de verdade da identidade visual passa a ser o frontend em
  produção + `frontend/src/assets/brand/`. Explicitamente **não** altera
  imutabilidade de ADR (nenhuma ADR foi removida) nem a restrição geral
  de dados de produto/domínio.
- **`CLAUDE.md`** atualizado (`Restrições`, `Diretórios congelados`,
  `Documentação complementar`) para refletir a nova política.
- **Limpeza executada**, commit `528dd4f`: removido `docs/design/`
  inteiro (Design Systems antigos, Manual anterior em
  `docs/design/manual/`, imports Stitch/v2-roxo/tear-editorial-legado,
  screenshots, pasta `HISTORICO/` duplicada, inventário/auditoria
  avulsos) e `exports/notebooklm/`. `ADR-019` e `ADR-020` **mantidas
  intactas** — nenhuma delas foi substituída em conteúdo, só a cláusula
  de preservação de `ADR-019` item 2. `frontend/legacy-src/` (código,
  não documentação) não foi tocado.

### Pendência

O Claude Design project e o Artifact HTML não têm sincronização
automatizada com o repositório — releitura manual do código a cada
atualização futura (registrado no próprio Manual, capítulo Roadmap).
