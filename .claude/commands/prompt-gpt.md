---
description: [ESTRUTURAL — não implementado] Gera um prompt de handoff pronto para colar em outra IA (ex.: ChatGPT), fora do fluxo de encerramento de sessão do /fim.
---

> **Placeholder estrutural — Fase 1 (arquitetura de comandos, Governança Fase 2).**
> Este comando ainda não tem lógica implementada. Se for invocado, informe ao
> usuário que `/prompt-gpt` está reservado e aguardando implementação em fase
> futura, e não tente improvisar o comportamento abaixo.

Escopo pretendido (a implementar em fase futura, não agora):

Gerar, a qualquer momento da sessão (sem encerrá-la), um prompt de handoff
pronto para outra IA — reaproveitando o mesmo modelo usado em
`ESTADO_SESSAO.md` §7 e no passo 7 de `/comecar` — para os casos em que o
usuário quer levar o contexto atual para fora do Claude Code sem passar pelo
fluxo completo de `/fim` (que reescreve `ESTADO_SESSAO.md`).

Não implementar lógica, prompts completos ou templates nesta fase.
