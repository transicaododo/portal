# arquivo — material histórico do Design System

Esta pasta preserva as gerações anteriores de identidade visual e Design
System da criativo Dodô/Influencia. Nenhum destes materiais é referência
normativa vigente — a fonte oficial única é
[`docs/design/manual/index.html`](../manual/index.html) (Manual de Design
DODÔ v1.0).

Nada aqui deve ser usado para implementar tela nova, copiar token de cor ou
justificar decisão de UI — é histórico de como a identidade chegou ao
estado atual, mantido por rastreabilidade.

## Conteúdo

- **`tear-editorial-legado/`** — sistema visual "TEAR Editorial" (vermelho
  vinho, serifada, radius 0), anterior ao rebranding para a marca DODÔ
  (`ADR-020`). Não tem relação com a identidade atual.
- **`est-dio-el-design-system-v2-roxo/`** — bundle "criativo DODÔ v2.0",
  aprovado em 2026-07-24 com paleta roxo-primária (`#564f94`). Decisão
  revertida no mesmo dia a favor de laranja-primária — nunca chegou a ser
  a paleta em produção de forma estável. Preservado por ter sido, por um
  período, referência normativa formal (`ADR-019`, versão anterior).
- **`dodo-stitch-import-2026-07-25/`** — import do Google Stitch de
  2026-07-25 com a paleta laranja-primária/roxo-secundária que hoje está
  em produção (`design/DESIGN_DODO.md` foi a fonte direta dos valores de
  cor copiados para `frontend/src/theme/tokens.css`). Superado como
  documento vigente pelo Manual de Design DODÔ v1.0, que consolida e
  expande este material com o racional completo de cada decisão.
- **`brand-guide-screenshots-v1/`** — capturas de tela de um microsite de
  guia de marca de página única (identidade, cores, tipografia,
  acessibilidade, login), datadas de 2026-07-24. Documentam a mesma
  geração roxo-primária do `est-dio-el-design-system-v2-roxo/` — superadas
  pelo Manual.

## Por que preservar em vez de apagar

Política do projeto (`CLAUDE.md`, "Restrições — não apagar dados"): dados e
histórico de decisão não são deletados, são arquivados com contexto. Cada
pasta acima documenta uma decisão real que já foi vigente em algum
momento — útil para entender por que a identidade atual é o que é, mesmo
sem ter mais valor normativo.
