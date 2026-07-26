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
