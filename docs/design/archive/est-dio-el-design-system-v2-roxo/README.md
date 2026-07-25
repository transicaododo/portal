# Design System — criativo DODÔ. [ARQUIVADO]

> **Arquivado em 2026-07-25.** Este documento não é mais normativo. A
> paleta roxo-primária descrita aqui foi revertida no mesmo dia em que
> este bundle foi aprovado, a favor de laranja-primária/roxo-secundária
> (a paleta hoje em produção). A fonte oficial vigente é o
> [Manual de Design DODÔ v1.0](../../manual/index.html). Preservado só
> por rastreabilidade histórica — ver `docs/design/archive/README.md`.

**Fonte única de verdade (SSOT) da identidade visual do projeto Influencia
(`ADR-019`).** Este bundle substitui integralmente a identidade antiga
"Estúdio Elã" / "TEAR Editorial". Tudo que um coding agent precisa para
adaptar um layout está aqui.

**v2.0 (2026-07-24) — migração de identidade primária, decisão final.**
Roxo assumiu todas as funções de cor primária (identidade, CTA, foco,
links); laranja passou a cor secundária/apoio. Não é uma troca de hex: cada
cor manteve seu próprio pareamento de texto acessível (roxo com texto
branco, laranja com texto preto) — o que mudou foi o papel e a proporção de
cada uma. Esta decisão reverte uma correção anterior no mesmo dia que havia
restaurado laranja como dominante (ver `docs/handoff/README.md` — nota de
correção); esta é a versão final. Ver `tokens.json` → `migrationNote` e
`semantic` para o mapeamento completo.

## Arquivo canônico

**`DESIGN_SYSTEM.html`** é o único documento-fonte — abra no navegador.
Identidade, conceito, personalidade, tom, direção de arte, cores com
proporção oficial, tipografia, iconografia, grid, espaçamentos,
componentes, acessibilidade e exemplos certo/errado.

`DESIGN_SYSTEM.standalone.html` **não é uma segunda fonte** — é um export
portátil gerado a partir do mesmo conteúdo, com fontes e logos embutidos em
base64 (sem dependência de `brand/`), para compartilhar fora do repositório
ou importar em outra ferramenta. Se os dois divergirem, `DESIGN_SYSTEM.html`
é quem manda.

Tokens para consumo em código:

- **`design-tokens.css`** — variáveis CSS (`:root`) + `@font-face`. Importe
  direto no layout. (O frontend React em `frontend/src/theme/tokens.css`
  reproduz estes valores como fonte de consumo da aplicação — não é cópia
  literal, ver comentário no topo daquele arquivo.)
- **`tokens.json`** — os mesmos tokens em JSON, para gerar temas/variáveis
  em qualquer stack.

## Assets

- `brand/logos/` — 9 SVGs: `horizontal-*` (preto, branco, laranja, roxo,
  amarelo) e `stack-*` (preto, laranja, roxo, amarelo — ainda sem versão
  branca empilhada). `horizontal-branco.svg` é a combinação recomendada
  sobre fundo roxo (7.1:1 AAA), já em uso em produção.
- `brand/fonts/` — Elms Sans (display) e Work Sans (texto), variáveis, licença OFL.
- `marca dodo/` — arquivos brutos de origem do design (`.ai`, exports
  numerados, fontes variáveis não processadas). Não é para consumo direto;
  `brand/` já contém os assets finais processados. Mantido só como
  histórico/fonte para futura edição pelo designer.

## Paleta e proporção oficial

| Cor | Hex | Proporção | Papel |
|---|---|---|---|
| Roxo | `#564f94` | 34% | Cor-assinatura/primária — identidade, CTA principal, foco, links |
| Off-white | `#f1ece5` | 21% | Base neutra de leitura |
| Amarelo-lima | `#eff857` | 17% | Realce e apoio |
| Preto | `#1d1c1a` | 14% | Texto e estrutura |
| Laranja | `#f85919` | 14% | Secundária/apoio — ação secundária e alerta; nunca dominante |

Regra: roxo é sempre a maior mancha de cor; laranja nunca compete com ele em
área. Laranja e amarelo nunca viram texto sobre fundo claro (ver contrastes
em `tokens.json`).
