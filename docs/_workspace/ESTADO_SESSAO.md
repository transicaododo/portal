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
concluída e aprovada; próxima etapa é Login. Esta sessão foi paralela
à sequência: produziu documentação de referência do Design System, não
avançou Login.

## Branch ativa

`fix/session-pipeline-test`, upstream configurado. HEAD em `528dd4f`.
Working tree ainda com um volume grande de mudanças não commitadas
alheias a esta sessão (migração de `frontend/src/legacy-src/`,
specs/deployment/planning modificados) — ver "Bloqueios abertos".

## Últimos concluídos

- Projeto "Design System DODÔ" criado no Claude Design (`DesignSync`,
  `projectId b5b37e19-3bd4-4ceb-b415-5d6c4b98d604`) e Manual editorial
  publicado como Artifact
  (`https://claude.ai/code/artifact/47276095-3be0-4a61-baf3-b044e0e3d072`)
  — extraídos do código real, sem sync automatizado ainda.
- `ADR-021` criada: documentação de Design deixa de ser registro
  histórico permanente; código + `frontend/src/assets/brand/` são a
  única fonte de verdade visual. `ADR-019`/`ADR-020` mantidas intactas.
- `CLAUDE.md` atualizado (Restrições, Diretórios congelados,
  Documentação complementar) para refletir `ADR-021`.
- Limpeza de `docs/design/` e `exports/notebooklm/` executada e
  commitada (`528dd4f`) — Design Systems antigos, Manual anterior,
  imports Stitch/v2-roxo/tear-editorial-legado, screenshots.

## Bloqueios abertos

- Migração de `frontend/src/legacy-src/` (~85 arquivos) segue não
  commitada — precisa de revisão própria antes do Login.
- Achados de segurança de sessões anteriores seguem sem confirmação de
  resolução: `IMPORTANTE Webmail_Codigos_de_backup.txt` no histórico
  (`d6454df`); `backend/.env.backup-20260723-185819` com segredos em
  texto puro.
- Reconciliação de git de sessões anteriores (branch
  `docs/governance-phase2` divergente) segue não feita.
- Duas gerações de tokens/paleta coexistem sem reconciliação (Cherry
  Red ativa vs. laranja/roxo estacionada) — documentado no Manual, não
  resolvido.

## Próxima missão recomendada

Iniciar o Login, seguindo o mesmo processo da Landing — herdar tokens/
motion/container já construídos, sem reabrir paleta/tipografia já
fixadas. Antes disso, revisar e commitar a migração de `legacy-src/`
isoladamente (bloqueio acima).

## Tarefa ativa

Nenhuma (`docs/_workspace/TASK.md` vazio — Login ainda não iniciado).

## Log mais recente

`docs/_workspace/logs/2026-07-26_LANDING_DESIGN_SYSTEM_REBUILD.md`
(seção "Design System DODÔ: projeto no Claude Design, Manual editorial
e ADR-021" ao final do arquivo).
