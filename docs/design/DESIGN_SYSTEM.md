# Design System — criativo DODÔ

A referência oficial (SSOT) da identidade visual e dos princípios de
design do projeto é o **Manual de Design DODÔ v1.0**:

**[`docs/design/manual/index.html`](manual/index.html)** — documento vivo,
navegável, autocontido (abrir direto no navegador).

**[`docs/design/manual/MANUAL_DODO_v1.0.pdf`](manual/MANUAL_DODO_v1.0.pdf)**
— versão para apresentação/impressão, gerada a partir do mesmo conteúdo.

O manual cobre marca (essência, logotipo, paleta, tipografia, sistema
gráfico) e sistema de interface (regras de UI, princípios de curvatura),
sempre explicando o porquê de cada decisão, não só o valor. Decisão
formalizada em `ADR-019`.

## Documentação complementar

- `docs/design/UI_RULES.md` — regras comportamentais/UX da plataforma
  (não são valores de marca, não conflitam com o Manual).
- `docs/design/PLANO_IMPLEMENTACAO_DESIGN_SYSTEM.md` — auditoria do
  frontend React atual contra o Manual e plano priorizado de adoção.
- `docs/design/archive/` — gerações anteriores de Design System,
  preservadas por histórico. Nunca usar como referência normativa.

## Localização rápida (humanos e agentes)

| O quê | Onde |
| --- | --- |
| Manual visual (SSOT) | `docs/design/manual/index.html` |
| Manual — PDF | `docs/design/manual/MANUAL_DODO_v1.0.pdf` |
| Regras de UI/UX | `docs/design/UI_RULES.md` |
| Tokens técnicos (implementação) | `frontend/src/theme/tokens.css` |
| Componentes (implementação) | `frontend/src/components/` |
| Assets de produto (logos, ícones, favicon) | `frontend/public/` |
| Plano de adoção do Manual pelo frontend | `docs/design/PLANO_IMPLEMENTACAO_DESIGN_SYSTEM.md` |
| Gerações anteriores (histórico, não normativo) | `docs/design/archive/` |

**Regra (`ADR-019`):** não criar uma nova pasta, documento ou geração de
Design System. Qualquer ajuste de marca ou de UI parte do Manual acima e,
se mudar a decisão registrada nele, exige um novo ADR — nunca um
documento solto paralelo.

## Color Usage Ratio

Registrado em 2026-07-25 — nota de contexto, **não aplicada em nenhuma
tela ainda**. Não substitui nenhum valor do Manual (SSOT); só documenta
uma variação de uso pendente de decisão de token.

- **`#F1ECE5` continua sendo o valor oficial** de `--color-bg` — superfícies
  oficiais, materiais de marca, qualquer componente que exija fidelidade
  literal à identidade. Isso não muda.
- **Variante "white warm background"** (proposta, sem valor definido): para
  áreas de fundo muito grandes (página inteira, não um componente), um
  branco quente ligeiramente mais claro que `#F1ECE5` pode melhorar
  leitura/respiro sem descaracterizar a marca. É uma aplicação
  *contextual* — o token oficial de superfície continua sendo `#F1ECE5`.
- **Roxo com contenção** já é regra do Manual (cap. paleta: "laranja é o
  CTA, roxo é cor de repouso") — nada novo aqui, só reforçando que essa
  hierarquia já existe e não deve ser reaberta informalmente componente a
  componente (ver o precedente do `AuthSplitLayout`, tratado como ajuste
  pontual, não como mudança de token).

**Prioridade, sempre:** Design System oficial (Manual) → tokens →
variações de contexto. Uma variação de contexto nunca substitui o valor
oficial só para resolver um caso específico — se a variante acima for
adotada de fato, o valor exato e onde aplicar exigem decisão do
responsável e, se alterar `--color-bg`, um novo ADR.
