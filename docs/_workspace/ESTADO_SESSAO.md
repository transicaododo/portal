# ESTADO DA SESSÃO

> Snapshot enxuto do estado **atual** do projeto — nunca um diário de
> bordo. Reescrito por completo a cada `/fim` (nunca acrescentado).
> Formato enxuto (ver
> `docs/_workspace/logs/2026-07-25_ARQUITETURA_GREENFIELD_COMANDOS.md`).
> Histórico narrativo vive em `docs/_workspace/logs/`; dependências
> entre SPECs em `docs/_workspace/TASK_ROUTER.md` ou via
> `scripts/specs-status.sh`.

**Última atualização:** 2026-07-26

## Fase/Sprint atual

Sequência mandatada Design System → Landing → Login → Portal. Landing
concluída e aprovada pelo responsável; próxima etapa é Login.

## Branch ativa

`fix/session-pipeline-test`, com upstream `origin/fix/session-pipeline-test`
já configurado. HEAD em `2dce389`. Working tree ainda com um volume
grande de mudanças não commitadas alheias a esta sessão (migração de
`frontend/src/legacy-src/`, reorganização de `docs/`, pastas novas como
`design-system/` e `.claude/skills/`) — não tocadas aqui, ver
"Bloqueios abertos".

## Últimos concluídos

- Landing reconstruída do zero exclusivamente a partir de
  `design-system/` (paleta, tipografia, hero, narrativa) — commit
  `2dce389`.
- Motion System centralizado (`theme/motion.css` + `motion.ts`, sem
  valor hardcoded em componente).
- Composição refinada contra a referência oficial (`criativododo`/
  estudioela.com) sem importar identidade — 2 bugs reais corrigidos
  (quebra de linha da manchete do manifesto; rodapé permanentemente
  invisível por limitação do `IntersectionObserver` em conteúdo no fim
  da página).
- Regra de tipografia formalizada: identidade DODÔ nunca usa itálico;
  hierarquia só por peso (400–700), escala e espaçamento.
- Passada de redução proporcional de escala (títulos -20%, corpo -15%,
  rodapé compactado) e reestruturação do CTA + rodapé em coluna
  editorial única alinhada à esquerda — aprovado pelo responsável.

## Bloqueios abertos

- Migração de `frontend/src/legacy-src/` (~85 arquivos movidos para
  fora de `frontend/src/`) segue não commitada — não é desta sessão,
  precisa de revisão própria antes de iniciar o Login.
- Achados de segurança de sessões anteriores seguem sem confirmação de
  resolução: `IMPORTANTE Webmail_Codigos_de_backup.txt` commitado no
  histórico (`d6454df`); `backend/.env.backup-20260723-185819` (não
  rastreado) com segredos em texto puro.
- Reconciliação de git de sessões anteriores (renames de
  `design-system/`, branch `docs/governance-phase2` divergente) segue
  não feita.

## Próxima missão recomendada

Iniciar o Login, seguindo o mesmo processo da Landing: extrair
identidade/composição só de `design-system/`, herdar o sistema de
tokens/motion/container já construído, sem reabrir decisões de
identidade já fixadas (paleta, tipografia, Motion System). Antes disso,
considerar revisar e commitar a migração de `legacy-src/` isoladamente
(bloqueio acima), para não acumular mais um ciclo de trabalho em cima de
working tree sujo.

## Tarefa ativa

Nenhuma (`docs/_workspace/TASK.md` vazio — Login ainda não iniciado).

## Log mais recente

`docs/_workspace/logs/2026-07-26_LANDING_DESIGN_SYSTEM_REBUILD.md`
