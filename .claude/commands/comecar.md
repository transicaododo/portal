---
description: Inicia a sessão — lê o protocolo do projeto e reporta estado, próxima tarefa, pendências, riscos e IA recomendada.
---

Leia `docs/_workspace/ESTADO_SESSAO.md` (fonte única deste briefing — é sempre um snapshot enxuto, nunca um diário de bordo). Quando existirem e forem relevantes para a missão atual, complemente — sem reler o que já é redundante com `ESTADO_SESSAO.md` — com `CLAUDE.md` §Documentos oficiais, `docs/governanca/GOVERNANCA_DO_PROJETO.md`, `docs/handoff/README.md`, `docs/_workspace/TASK_ROUTER.md` e a(s) SPEC(s) ligada(s) à missão atual.

Só abra os arquivos em `docs/_workspace/logs/` (linkados na seção "Links para logs relacionados" do `ESTADO_SESSAO.md`) se a missão atual exigir contexto histórico específico que o snapshot não cobre — nunca como leitura de rotina do `/comecar`. Eles guardam a narrativa detalhada de sessões passadas (achados, riscos extensos, checklists granulares, prompts de handoff anteriores) que deixou de viver no snapshot.

Rode rapidamente `git status --short`, `git log --oneline -5` e `gh pr list --head "$(git branch --show-current)"` para confirmar que o estado descrito em `ESTADO_SESSAO.md` ainda bate com a realidade do repositório. Cruze o que os documentos dizem entre si (não apenas repita `ESTADO_SESSAO.md` — se um documento contradisser outro, por exemplo fase/missão vs. dependências em `TASK_ROUTER.md`), e se houver divergência, mudanças não commitadas, ou PR aberta para a branch atual: **avise no relatório, nunca corrija automaticamente**.

Responda usando exatamente esta estrutura (alvo: 2 a 5 minutos de leitura, sem detalhes redundantes com os documentos já lidos):

```
# Resumo Executivo

# Estado Atual
(fase, sprint, missão, branch, status do Git, bloqueios, última atualização)

# Próxima Missão Recomendada

# Documentos Importantes
(citar a lista de `CLAUDE.md` §Documentos oficiais relevante à missão, sem duplicá-la)

# Riscos

# Próximos Passos
(inclua, quando aplicável: IA recomendada — regra de `ESTADO_SESSAO.md` §6 — e o prompt de handoff pronto de `ESTADO_SESSAO.md` §7, preenchido com a missão real recomendada)
```

Não releia o projeto inteiro nem reabra auditorias já concluídas — este comando é um briefing rápido, não uma nova investigação.
