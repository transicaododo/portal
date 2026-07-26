# ADR-021 · Documentação de Design não é registro histórico permanente

**Status:** Aceito — decisão tomada pelo responsável do projeto, registrada
em 2026-07-26.

**Resolve:** se documentação de Design (manuais, guias de estilo,
exports, protótipos, inventários, auditorias de frontend, mockups) deve
ser preservada indefinidamente por rastreabilidade histórica — prática
adotada até aqui — ou se pode ser descartada quando substituída,
diferente do tratamento dado a ADRs e a dados de produto/domínio.

## Contexto

`ADR-019` consolidou três gerações de Design System conflitantes,
decidindo arquivá-las (`design-system/archive/`) "preservadas por
rastreabilidade histórica, nunca mais como referência normativa" — ou
seja, presumia preservação permanente como prática padrão. Na prática,
essa prática produziu uma quantidade crescente de material paralelo
(pastas `archive/`, `HISTORICO/`, inventários e auditorias avulsas,
exports de ferramentas externas) que nenhum agente ou pessoa consegue
mais usar com segurança — o risco real observado nesta sessão foi um
agente de IA precisar auditar manualmente qual de várias gerações de
documentação batia com o código antes de poder confiar em qualquer uma
delas.

O responsável do projeto decidiu, em 2026-07-26, que esse modelo de
preservação não serve mais para documentação de Design especificamente
(diferente de ADRs e de dados de produto/negócio, que continuam
protegidos por `CLAUDE.md` §Restrições e §Fonte de decisão, inalterados
por esta ADR).

## Decisão

1. **Documentação de Design deixa de ser tratada como registro
   histórico permanente.** A partir de hoje, a única fonte de verdade da
   identidade visual é: (a) o frontend em produção
   (`frontend/src/`, código real, não documentação sobre o código), e
   (b) os ativos oficiais de marca em `frontend/src/assets/brand/`
   (wordmark, emblema, e demais SVGs oficiais ali presentes).
2. **Documentação de Design pode ser removida quando substituída por
   uma versão mais recente** — sem necessidade de arquivamento, pasta
   `HISTORICO`/`archive`, ou cópia de preservação. Isso inclui: Design
   Systems antigos, HTMLs/mockups antigos, exports de ferramentas
   externas (Figma, NotebookLM, Stitch etc.), inventários e auditorias
   de frontend avulsas, guias de estilo e documentação de tokens/paleta/
   tipografia/logo supersedidos, e qualquer material produzido para as
   marcas legadas ("Estúdio Elã"/"ELÃ", codinome "TEAR").
3. **Isto NÃO se aplica a ADRs.** ADRs continuam sendo o registro causal
   de decisões arquiteturais do projeto — "nunca reabertas sem novo ADR"
   (`CLAUDE.md` §Documentação complementar, §Fonte de decisão) — essa
   convenção não muda. `ADR-019` e `ADR-020` permanecem em
   `docs/adrs/`, sem alteração, porque nenhuma delas foi substituída em
   conteúdo por esta decisão: o que muda é só a cláusula de preservação
   do item 2 de `ADR-019` ("arquivadas... preservadas por rastreabilidade
   histórica"), agora superada por esta ADR — a paleta/identidade que
   `ADR-019` documenta continua sendo o registro válido de como e por
   que a decisão de cor foi tomada.
4. **Isto também NÃO se aplica a dados de produto, domínio ou negócio**
   (usuários, campanhas, contratos, histórico de auditoria do produto
   em si) — a restrição "Não apagar dados" em `CLAUDE.md` §Restrições
   continua valendo integralmente para essa categoria. Esta ADR é
   estritamente sobre documentação/deliverables de Design.
5. **`CLAUDE.md` é atualizado** (§Restrições, §Diretórios congelados,
   §Documentação complementar) para refletir esta decisão — ver diff
   desta mesma sessão.
6. **Primeira aplicação desta política**: limpeza de material de Design
   pré-reconstrução (2026-07-26) — pastas/arquivos avulsos sob
   `docs/design/` e `exports/notebooklm/` que não faziam parte de ADR
   nem de dado de produto. Executada na mesma sessão que esta ADR.

## Consequências

- Nenhuma pasta `HISTORICO`/`archive` de Design precisa mais ser criada
  ou mantida — documentação supersedida é removida, não arquivada.
- Agentes de IA e pessoas consultando o repositório não encontram mais
  gerações antigas de Design System concorrendo com o código real —
  reduz o risco que motivou esta ADR.
- Se uma futura reconstrução de identidade visual precisar de contexto
  histórico anterior a esta ADR, esse contexto só existe no histórico do
  Git (`git log`), não em arquivos vivos no repositório.
- ADRs, dados de produto/domínio e `docs/history/CONTRATO_SOBERANO.md`
  não são afetados — continuam sob as regras vigentes antes desta ADR.
