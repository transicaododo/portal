# HANDOFF DO PROJETO

## Objetivo

Registrar apenas os grandes marcos do projeto.

Este documento NÃO é utilizado para controle de tarefas, estado da sessão ou documentação técnica.

Cada registro deve conter apenas:

- Data
- Marco alcançado
- Resumo
- Principais decisões
- Próxima fase

---

# Histórico

## 2026-07-23

### Marco

Arquitetura de comandos nativos do Claude Code implementada (Fases 1-2:
`/comecar` e `/fim` operacionais) e primeira base de conhecimento de
referências arquiteturais externas consolidada em `docs/knowledge/`.

### Principais decisões

- Comandos de projeto usam `.claude/commands/` (não Skills) — critério de
  migração documentado para quando um comando precisar de arquivos de
  apoio.
- `/comecar` e `/fim` passam a seguir rotina fixa e auditável (leitura
  condicional de documentos, checagem cruzada entre eles, nunca corrige
  automaticamente inconsistência encontrada).
- Pesquisa de mercado open source do domínio do Influencia consolidada
  como conhecimento permanente (`docs/knowledge/referencias-externas/`),
  sem métricas efêmeras (estrelas, atividade).

### Impacto

O projeto ganha um fluxo de abertura/encerramento de sessão padronizado e
auditável, e uma base de conhecimento arquitetural externa reutilizável
por qualquer sessão futura antes de desenhar módulos novos ou escrever
ADRs.

### Próxima fase

Fase 3 da arquitetura de comandos (`/prompt-gpt`, aguardando aprovação) e
nova pesquisa de mercado sobre arquiteturas modernas baseadas em MySQL.

## 2026-07-24

### Marco

Migração visual completa do frontend React para o Design System "criativo
DODÔ" concluída no código (`ADR-019`) — camada de tokens, 8 componentes
compartilhados, 2 shells e 24 páginas migrados, legado visual (assets e
tokens antigos) removido por completo do projeto.

### Principais decisões

- `est-dio-el-design-system/` (raiz) formalizado como SSOT visual do
  frontend via `ADR-019`, substituindo o sistema "TEAR Editorial".
- **Roxo (não laranja) é a cor-assinatura/primária dominante** (34%),
  laranja é secundária/apoio (14%) — decisão final e definitiva do
  responsável do projeto, registrada no Design System v2.0
  (`est-dio-el-design-system/tokens.json` → `migrationNote`). **Nota de
  correção (2026-07-24):** este bullet afirmava o oposto ("laranja, não
  roxo, é a cor dominante — corrigido durante a execução") após uma
  reversão anterior no mesmo dia; o responsável reverteu essa reversão de
  volta para roxo dominante, desta vez como decisão final. Mantido aqui
  para rastreabilidade do histórico de idas e vindas. **Nota de
  atualização (2026-07-25):** a decisão "final" de roxo dominante acima
  foi revertida de novo no dia seguinte — a paleta que de fato foi para
  produção (`frontend/src/theme/tokens.css`) é laranja-primária/
  roxo-secundária, oriunda de um import do Google Stitch posterior a
  `est-dio-el-design-system/`. O SSOT visual deixou de ser aquela pasta
  (hoje arquivada em `docs/design/archive/est-dio-el-design-system-v2-roxo/`)
  e passou a ser o **Manual de Design DODÔ v1.0**
  (`docs/design/manual/index.html`), que consolida as três gerações e o
  código real numa única referência — ver `ADR-019` (reescrita) para o
  registro completo.
- `Table`/`Pagination`/`Modal` como componentes compartilhados,
  deliberadamente fora de escopo desta sprint (tabelas cruas já herdam
  tokens corretos; extrair componente foi julgado refatoração
  desnecessária para o objetivo de cobertura rápida).
- Camada de compatibilidade (bridge de nomes antigos → tokens novos),
  criada para migração incremental sem quebrar o projeto, removida por
  completo ao final da mesma sessão — zero referência a token legado
  restante.

### Impacto

Frontend inteiro roda sobre os tokens oficiais do Dodô (cor, tipografia,
espaçamento, raio), sem dependência de fontes externas (Google Fonts
removido, fontes self-hosted). Nenhuma rota, controller, model ou regra de
negócio foi tocada — mudança estritamente visual.

### Próxima fase

Validação visual das 21 páginas autenticadas que só foram verificadas por
análise estática nesta sessão (sem backend/credencial de teste
disponível) — sprint dedicada de QA visual, prevista e aceita como próxima
etapa desde o início desta migração.