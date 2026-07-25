# ESTADO DA SESSÃO

> Snapshot enxuto do estado **atual** do projeto — nunca um diário de
> bordo. Este documento é **sempre reescrito por completo** a cada
> `/fim` (nunca acrescentado). Histórico narrativo, riscos detalhados,
> checklists completos e prompts de handoff anteriores vivem em
> `docs/_workspace/logs/` — ver "Links para logs relacionados" no final.
> Dependências entre SPECs continuam em `docs/_workspace/TASK_ROUTER.md`.

**Última atualização:** 2026-07-25

---

## Situação atual

- **Projeto:** DODÔ (nome oficial desde `ADR-020`). Plataforma
  **Influencia**. Produção alvo: `criativododo.com.br` /
  `portal.criativododo.com.br` (Locaweb Hospedagem II). Ambiente legado
  (`estudioela.com`/`elafashionmkt.com.br`) congelado.
- **Branch:** `docs/governance-phase2`, 8 commits à frente de `origin`, 0
  atrás. PR #77 aberta, sem mudança de status.
- **Fase corrente:** rebranding DODÔ concluído em código (paleta
  laranja/roxo aplicada, `design-system/` do Stitch removida) →
  redesign incremental do frontend React ainda não iniciado na prática
  (plano técnico pronto, zero linhas implementadas).
- **Paleta:** decisão tomada e aplicada. `frontend/src/theme/
  tokens.css` (não commitado) usa laranja `#f14f28` como
  `--color-action` (primária) e roxo `#504ea1` como `--color-highlight`
  (secundária). O app React (`localhost:5173`/`127.0.0.1:8000`) é a
  fonte de verdade visual, evoluindo por redesign incremental — não o
  Design System do Stitch, removido do repositório.
- **Reorganização documental (esta sessão):** `ESTADO_SESSAO.md`
  reestruturado para snapshot enxuto (≤300 linhas); todo o histórico
  narrativo anterior foi movido para
  `docs/_workspace/logs/2026-Rebranding-DODO.md`, sem perda de conteúdo.
  Nova política de manutenção descrita em `TASK_ROUTER.md` §73 e nos
  comandos `/comecar`/`/fim`.

## Objetivos

1. Migrar o legado (planilha + Apps Script) para a V3 (Laravel + React +
   PostgreSQL), com domínio soberano em
   `docs/history/CONTRATO_SOBERANO.md`.
2. Concluir o redesign incremental do frontend React a partir do plano
   já produzido, sem regressão visual/funcional.
3. Publicar o DODÔ em produção na Locaweb Hospedagem II, hoje bloqueado
   por SSH (porta 22) e por uma configuração de painel pendente do
   responsável.

## Próxima missão recomendada

1. **Executar a Fase A do plano de redesign**
   (`docs/_workspace/UX/PLANO_REDESIGN_FRONTEND.md`): criar componente
   `Card` (substitui `.card` duplicado em `Dashboard`/
   `PortalDashboardPage`), simplificar `StatusBadge` para wrapper de
   `Badge`, corrigir comentário desatualizado em
   `AuthSplitLayout.module.css`. Validar visualmente a cada passo.
2. **Decisão do responsável, antes da Fase D do plano:** construir
   `Modal` agora sem consumidor real, ou só especificar e adiar até uma
   tela precisar dele.
3. **Formalizar `ADR-019`** — o documento ainda registra roxo como
   primária, o código já reflete laranja. Só formalizar a decisão já
   tomada pelo responsável, não decidir sozinho.

Frentes paralelas herdadas, nenhuma priorizada — perguntar ao
responsável antes de retomar:

4. Retorno do chamado Locaweb sobre a porta 22 SSH.
5. Revisão do briefing de UX (`docs/_workspace/UX/
   BRIEFING_TELAS_E_COMPONENTES_DODO.md`) pelo responsável.
6. Preparação de deploy do DODÔ (SSH bloqueado, PostgreSQL na
   Hospedagem II não confirmado, subdomínio com tipo errado no painel).
7. Aprovação e commit da frente Sprint 01 + rebranding em `frontend/`.

## Pendências/bloqueios

- Fase A do plano de redesign não iniciada.
- Decisão sobre construir `Modal` agora ou adiar (sem consumidor real
  hoje).
- `ADR-019` desatualizado frente ao código (roxo no documento, laranja
  no `tokens.css`).
- `design-system/` removida do disco, mas a deleção segue só staged,
  não commitada.
- `frontend/src/theme/tokens.css` com paleta nova aplicada, não
  commitado.
- SSH porta 22 na Locaweb em timeout, sem ETA — bloqueia
  `migrate`/cache/`admin:create`/crontab mesmo com contingência FTP.
- Revisão e aprovação do briefing de UX pendente — nenhuma tela/
  componente do briefing deve ser implementada sem essa aprovação.
- Disponibilidade real de PostgreSQL na Hospedagem II não confirmada.
- Subdomínio `portal.criativododo.com.br` com tipo "Apontamento" —
  precisa virar "Conteúdo da pasta" no painel antes do deploy
  funcionar; ação exclusiva do responsável.
- Aprovação e commit da frente Sprint 01 + rebranding em `frontend/`
  seguem pendentes.
- Push dos 8 commits locais para `origin` — nenhum push feito.
- Validação visual de telas autenticadas — só login validado ao vivo.
- **Arquivo sensível não rastreado na raiz:** `IMPORTANTE
  Webmail_Codigos_de_backup.txt` — não deve ir para nenhum commit.
- Arquivos não rastreados herdados de sessões paralelas
  (`backend/.env.backup-*`, screenshots na raiz, `DOCS_INVENTARIO.txt`,
  `ESTADO_SESSAO.backup.md`, `provisorios/`, `skills-dodo/` fora do
  repo) — sinalizados para o responsável decidir, não tocados.
- Riscos detalhados, achados de sessões anteriores e demais dívidas
  herdadas: ver `docs/_workspace/logs/2026-Rebranding-DODO.md` e
  `TASK_ROUTER.md` (§45–§72).

## Últimos commits relevantes

- `3812c37` feat(design-system): importar Design System DODÔ do Stitch
  com equivalência semântica de tokens
- `786a259` docs(governance): aplicar ADR-020 (nome DODÔ) em CLAUDE.md
- `a368857` docs(governance): consolidar CLAUDE.md como documento de
  governança completo (Fase 2)
- `8a0f505` docs(adr): registrar ADR-020 — DODÔ como nome oficial do
  projeto
- `d3dba5a` feat(design-system): atualizar documentação e cobertura dos
  ativos de marca

## Arquivos importantes

- `docs/_workspace/UX/PLANO_REDESIGN_FRONTEND.md` — plano de execução
  do redesign incremental, por tela/componente, checklist de 33 tarefas
  em 5 fases. Ler por completo antes de iniciar qualquer implementação
  visual.
- `docs/_workspace/TASK_ROUTER.md` — fonte única de estado e
  dependências entre SPECs; histórico completo por seção datada (§1–§73).
- `frontend/src/theme/tokens.css` — paleta DODÔ v2 aplicada (laranja
  primária, roxo secundária), não commitado. Fonte de verdade de cor
  para qualquer trabalho de redesign.
- `docs/adrs/ADR-019-design-system-dodo-como-ssot-visual.md` — não
  commitado, texto desatualizado (roxo como primária) frente ao código
  atual — pendência a formalizar, não a corrigir silenciosamente.
- `docs/infrastructure/INFRAESTRUTURA.md` — fonte oficial de dados de
  infraestrutura.
- `docs/_workspace/UX/BRIEFING_TELAS_E_COMPONENTES_DODO.md` —
  especificação de arquitetura de telas/componentes, aguardando revisão
  do responsável.

## Links para logs relacionados

- `docs/_workspace/logs/2026-Rebranding-DODO.md` — log de fase corrente
  (rebranding DODÔ + redesign incremental do frontend). Contém o
  histórico narrativo completo de sessões anteriores, riscos detalhados,
  checklists completos e prompts de handoff anteriores — consultar só
  quando precisar de contexto histórico específico, não como leitura de
  rotina.
- `docs/_workspace/TASK_ROUTER.md` — histórico completo por SPEC/seção
  datada (§1–§73), incluindo a decisão que criou esta reorganização
  (§73).
- `docs/handoff/README.md` — marcos concluídos (fim de fase, migrações,
  releases).

## Observações

Este documento deve permanecer pequeno (~300 linhas no máximo) e ser
sempre substituído por completo, nunca acrescentado — política vigente
desde a reorganização de 2026-07-25 (`TASK_ROUTER.md` §73). Antes de
sobrescrever, mover para o log de fase corrente
(`docs/_workspace/logs/`) qualquer informação histórica que ainda não
esteja lá. Decisões permanentes pertencem ao `CLAUDE.md`; dados estáveis
de infraestrutura pertencem a `docs/infrastructure/INFRAESTRUTURA.md`;
marcos concluídos pertencem a `docs/handoff/README.md`; histórico
completo e dependências entre SPECs pertencem a
`docs/_workspace/TASK_ROUTER.md`; histórico narrativo detalhado pertence
a `docs/_workspace/logs/`.
