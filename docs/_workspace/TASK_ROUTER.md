## 0. Convenções

- `[x]` concluída · `[>]` em andamento · `[ ]` pendente.
- **Deps SPEC** = pré-requisitos entre SPECs (origem: `WORKFLOW.md`).
- **Fonte de requisitos** = sempre `PRD.md` (seções específicas).
- **Restrições** = ADRs e Contrato Soberano que a SPEC deve respeitar.
- 🟠 **Decisão do PO pendente** = a SPEC pode ser redigida, mas o item marcado
  fica como *pendência explícita*; **não inventar a regra**.

---

## 1. Localização física dos documentos

| Documento lógico | Caminho | Estado |
|---|---|---|
| `WORKFLOW.md` | — | **não existe mais** (2026-07-18: sumiu de `~/Downloads`; dependências entre SPECs já absorvidas por este roteador, ver SPEC-003 D-01) |
| `PRD.md` | `docs/PRD.md` | no repo |
| `CONTRATO_SOBERANO.md` | `docs/history/CONTRATO_SOBERANO.md` | no repo |
| `ADR-001` (enums/MesReferencia/promoção) | `docs/adrs/ADR-001-fechamento-de-contrato-e-enums.md` | no repo |
| `ADR — Linguagem Ubíqua` | `docs/adrs/ADR-003-linguagem-ubiqua-do-dominio.md` | no repo (numeração a confirmar) |
| `ADR-002 — Frontend Foundation` | `docs/adrs/ADR-002-frontend-foundation.md` | no repo |
| `ADR-010 — Banco oficial do Portal (planilha V2 "Portal Ela")` | `docs/adrs/ADR-010-banco-oficial-do-portal.md` | no repo |
| `ADR-013 — Autenticação do Portal via OAuth 2.0 Authorization Code Flow` | `docs/adrs/ADR-013-autenticacao-oauth-authorization-code.md` | no repo |
| `ADR-014 — Consolidação de arquivos por módulo de negócio` | `docs/adrs/ADR-014-consolidacao-de-arquivos-por-modulo.md` | no repo (2026-07-19: `src/` reorganizado em 14 `.js` — fatias verticais em `src/modulos/`; caminhos `src/{acl,adapters,controller,domain,repository,service}/...` citados em achados anteriores são históricos; mapa classe→arquivo na ADR) |
| Contratos de camada (ex-`_contract.js`) | `docs/architecture/ARQUITETURA_CAMADAS.md` | no repo (migrados pela ADR-014) |
| `DECISOES_BLOQUEANTES.md` | — | **não existe mais** (2026-07-18: sumiu de `~/Downloads`; o estado de cada pergunta P3–P8/Q-NN está rastreado por SPEC neste roteador — resolvidas: Q-03/04/07/08/10; abertas: Q-05/06/09) |
| `SPEC.md` (formato/Entrega 01) | `docs/specs/SPEC-001-cadastro-e-base-de-influenciadoras.md` | no repo |
| `PLANILHA_TEAR_2.0_MAPA.md` | `PLANILHA_TEAR_2.0_MAPA.md` (raiz) | no repo |
| `03 — Fronteiras do Domínio` | — | **não existe mais** (2026-07-18: sumiu de `~/Downloads`) |
| `04 — Capacidades do Sistema` | — | **não existe mais** (2026-07-18: sumiu de `~/Downloads`) |
| `06 — Modelo Conceitual dos Dados` | — | **não existe mais** (2026-07-18: sumiu de `~/Downloads`) |

> **Dívida ENCERRADA como perda (2026-07-18, sessão Tech Lead):** os cinco
> documentos "fora do repo" **desapareceram de `~/Downloads`** antes de serem
> consolidados (verificado por listagem completa do diretório e busca em todo
> o repo, `CONHECIMENTO/` e `knowledge/`). Nenhuma SPEC ativa depende deles:
> as dependências (WORKFLOW) e as decisões do PO (DECISOES_BLOQUEANTES)
> foram absorvidas por este roteador enquanto os arquivos existiam; §5 já
> previa parar caso alguma SPEC precisasse de seção específica de 03/04/06 —
> o que nunca ocorreu. Não procurar esses arquivos de novo; se algum
> reaparecer (backup do PO), aí sim consolidar em `docs/`.

---

## 2. Dependências globais (valem para toda SPEC)

Toda SPEC deve respeitar, sem reabrir:

| Documento | Seções | Para quê |
|---|---|---|
| `CONTRATO_SOBERANO.md` | §2 (termos banidos), §4 (linguagem ubíqua), §5 (VOs/PII), §6 (agregados), §8 (eventos) | Domínio soberano |
| `ADR — Linguagem Ubíqua` | §4 (tabela canônica), §5 | Vocabulário obrigatório (`Colaboração Mensal`, `Compilador do Mês`, `MesReferencia`, `Snapshot`) |
| `ADR-001` | §2 (enums/coerção), §3 (MesReferencia `AAAA-MM`) | Estados fechados; formato canônico |
| `SPEC.md` (SPEC-001) | inteiro serve de **modelo de formato** | Estrutura de uma SPEC |
| `DECISOES_BLOQUEANTES.md` | "Perguntas ao PO" (P3–P8) | Saber quais regras ficam 🟠 abertas |

---

## 3. Roteador por SPEC (dependências mínimas)

### EPIC 01 — Cadastro e Gestão

#### `[x]` SPEC-001 · Cadastro de Influenciadoras
- **Deps SPEC:** —
- **Requisitos (PRD):** §5.1, §6.1, §7 (RN-01, RN-02, RN-03), §9 (RF-001…RF-004)
- **Restrições:** `ADR-001` §4 (promoção Cadastro→Parceira)

#### `[x]` SPEC-003 · Importação Inicial da Base
- **Deps SPEC:** SPEC-001, SPEC-002
- **Requisitos (PRD):** §8 (entidade Influenciadora) · `PLANILHA_TEAR_2.0_MAPA.md` (mapa de colunas)
- **Ordem:** entregável adjacente (decisão do PO Q-10, opção B) — antes da Fase 2 (compilação do mês)
- ✅ **Implementada (2026-07-17):** slice completo (`ChaveInfluenciadora`
  (D-02c) → `LegadoACL` (leitura SOMENTE, sem nenhum método de escrita —
  RN-01/INV-01 estrutural) + `ParceiraACL.listarChaves`/`importarLote`
  (novas portas de idempotência/escrita em lote na base nova, §6.3) →
  `ImportadorService` → `ImportacaoController` → Portal
  `importarBaseLegada`). Nova Script Property `SPREADSHEET_ID_LEGADO`
  (`src/shared/Nucleo.js`, ex-`Config.js` — ADR-014) — planilha de origem, distinta de
  `SPREADSHEET_ID` (nunca a mesma, `DEPLOY_CHECKLIST.md` §2).
- ✅ **Resolvido (PO, 2026-07-17, D-01/D-02):** numeração confirmada por
  este roteador (`WORKFLOW.md` externo não existe mais); critério de
  registro válido (Q-10 opção A) = possui `INFLU_KEY` e nome da
  influenciadora — no esquema físico real (`PLANILHA_TEAR_2.0_MAPA.md` §3)
  não há coluna de nome separada de `INFLU_KEY` (mesma equivalência de
  SPEC-001, `Parceira.nome`↔`INFLU_KEY`), então as duas condições colapsam
  numa checagem física única: `INFLU_KEY` não vazio. **Hipótese registrada**
  em `ImportadorService` — revisar se surgir uma coluna de nome distinta.
  Demais campos vazios não descartam o registro; `STATUS` ausente/
  desconhecido nasce `Inativa` (mesmo default de RN-01 SPEC-001) em vez de
  descartar. 15 testes novos; suíte completa 464/464 verde; lint limpo.
- ✅ **Resolvida (2026-07-18, auditoria de apoio):** autorização por papel
  (§13, IM-03) — `importarBaseLegada` ganhou o parâmetro `dados` (não
  tinha, mesmo precedente de `arquivarLote`/SPEC-034 §11) e a guarda
  `exigirPapelAdministrador(dados)`, mesmo mecanismo das demais 15 rotas
  administrativas fechadas em §11. Teste novo em
  `test/portal-importacao.test.js` (RBAC negado sem sessão ADMINISTRADOR);
  suíte completa verde; lint limpo.

#### `[x]` SPEC-002 · Gestão de Influenciadoras
- **Deps SPEC:** SPEC-001
- **Requisitos (PRD):** §6.1, §7 (RN-01…RN-03), §9 (RF-002, RF-004, RF-005)
- 🟠 **Aberto:** P4 / Q-05 (inativação com pendências abertas) — afeta a partir da Fase 2
- **Achado da FASE 2 (QA pós-SPECs, 2026-07-16):** `Parceira.ativar()`/`.inativar()` (`src/domain/Parceira.js`) e os códigos de erro `GP-01/02/03` (§17) estão documentados na SPEC mas **sem nenhuma implementação de aplicação** — não há Service, Controller, Entrypoint nem `ParceiraRepository`/`ParceiraACL.atualizar*` que os exponha ou persista uma transição de estado/edição de Condição Comercial. `ParceiraACL` só tem `inserir` (append) — nenhuma escrita em linha existente para SPEC-002 (a única escrita em linha existente é `atualizarPerfil`, SPEC-032, um recorte de campos diferente). Consistente com o padrão legado (V1): a equipe edita `STATUS`/`VALOR_TOTAL`/quantidades diretamente na planilha `BASE DE DADOS`; o V2 só LÊ esses campos (`listarAtivasComCondicoes`, SPEC-005). Se esse fluxo administrativo deve virar código (Service/Controller/UI) é decisão do responsável do projeto — não implementado aqui.

---

### EPIC 02 — Colaboração Mensal

#### `[x]` SPEC-005 · Colaboração Mensal
- **Deps SPEC:** SPEC-002
- **Requisitos (PRD):** §5.2, §6.2, §7 (RN-04, RN-05, RN-06), §8 ("Ciclo Mensal" ≡ Colaboração Mensal)
- **Restrições:** `CONTRATO_SOBERANO` §5, §6, §8 · `ADR-001` §2, §3 (MesReferencia `AAAA-MM`) · `ADR — Linguagem Ubíqua` §4
- **Material já redigido:** `~/Downloads/SPEC-005-REVISAO.md` (Parte 3 = v2.0), já extraído para `docs/specs/SPEC-005-colaboracao-mensal.md`
- 🟠 **Aberto:** P8 / Q-06 (ano ausente em MesReferencia) · P4 / Q-05 (inativação)
- ✅ **Resolvido:** MesReferencia alinhado a `AAAA-MM` (ADR-001 §3) na SPEC-005 v2.0.

---

### EPIC 03 — Briefing

#### `[x]` SPEC-009 · Briefing de Campanha
- **Deps SPEC:** SPEC-005
- **Requisitos (PRD):** §5.3, §6.3, §7 (RN-04, RN-06), §9 (RF-008, RF-009, RF-010)
- **Restrições:** `ADR-001` §2 (cálculo da data de aprovação = RN-04)

---

### EPIC 04 — Conteúdo e Ativações

#### `[x]` SPEC-012 · Gestão de Conteúdo e Ativações
- **Deps SPEC:** SPEC-005, SPEC-009 (achado da FASE 1: `EntregaService` recebe `BriefingRepository` no construtor — `src/entrypoint/Portal.js` `montarEntregaService` —, dependência real não declarada antes)
- **Requisitos (PRD):** §5.4, §6.4, §7 (RN-06, RN-07, RN-08), §9 (RF-011…RF-015)
- **Restrições:** `ADR-001` §2.2 (estados de conteúdo)
- ✅ **Resolvido (PO 2026-07-15, propagado aqui em 2026-07-16):** Q-03 —
  rótulos crus persistidos são `AGUARDANDO_MATERIAL|EM_REVISAO|APROVADO|
  PUBLICADO` (`EntregaACL.js`, cabeçalho). A decisão já existia só em
  comentário de código (achado F7 de `docs/_workspace/auditorias/
  AUDITORIA_SPEC012.md`) — este roteador e a SPEC-012 §21 ainda listavam
  como aberto; corrigido.

---

### EPIC 05 — Logística

#### `[x]` SPEC-016 · Gestão Logística
- **Deps SPEC:** SPEC-005, SPEC-001/002 (achado da FASE 1: `EnvioService` recebe `ParceiraACL` como porta do Cadastro, D-03 — `src/entrypoint/Portal.js` `montarEnvioService` —, dependência real não declarada antes)
- **Requisitos (PRD):** §5.5, §6.5, §7 (RN-13, RN-14), §9 (RF-016…RF-019)
- **Restrições:** `ADR-001` §2.4 (`STATUS REVISÃO` e `STATUS LOGISTICA` — máquinas independentes)

---

### EPIC 06 — Financeiro

#### `[x]` SPEC-020 · Gestão de Pagamentos
- **Deps SPEC:** SPEC-002
- **Requisitos (PRD):** §5.6, §6.6, §7 (RN-09, RN-10, RN-11, RN-12), §9 (RF-020…RF-023)
- **Restrições:** `ADR-001` §2.3 (estados de pagamento)
- ✅ **Implementada (2026-07-17):** slice completo (`ObrigacaoFinanceira`
  EmAberto→Aprovado→Pago → `PagamentoACL`/`PagamentoRepository` (aba física
  nova `PAGAMENTOS`) → `PagamentoService` → `PagamentoController` → Portal
  `lancarPagamentoAvulso`/`liberarPagamento`/`confirmarPagamento`/
  `listarPagamentos`). Lançamento mensal reage a `MesCompilado`
  (materialização idempotente por competência, mesmo padrão F1/F2 de
  Entrega/Envio) — cablado em `montarCompilarMes`/`compilarMes`
  (reconciliação). PIX nunca persistido no Pagamento — lido ao vivo na
  porta do Cadastro só para compor a mensagem de cobrança (RNF-01). 20
  testes novos; suíte completa 447/447 verde; lint limpo.
- ✅ **Resolvido (PO, 2026-07-17, Q-04 opção B):** elegibilidade de
  `PagamentoLiberado` — Obrigação `Mensal` exige todas as Entregas da
  competência em `Aprovado`/`Publicado` (SPEC-012 §9); publicação não é
  requisito. Obrigação `Avulso` não passa pelo gate (liberação manual).
  Detalhe em `SPEC-020-gestao-de-pagamentos.md` §9/§21.
- ✅ **Resolvida (2026-07-17):** autorização por papel (§13, PG-04) — ver §11
  (RBAC aplicado às rotas administrativas).

---

### EPIC 07 — Documentos

#### `[x]` SPEC-023 · Geração de Documentos
- **Deps SPEC:** SPEC-002, SPEC-009
- **Requisitos (PRD):** §5.7, §6.7, §7 (RN-15), §9 (RF-024, RF-025)
- **Restrições:** `CONTRATO_SOBERANO` §6.1 · `ADR — Linguagem Ubíqua` §4 (Snapshot Comercial da Colaboração)
- ✅ **Implementada (2026-07-16):** slice completo (`Documento`/`CamposDeMesclagem` → `ParceiraACL.obterParaDocumentos`/`DocumentoACL` → `DocumentoRepository` → `DocumentoService` → `DocumentoController` → Portal). Aba física nova `DOCUMENTOS` persiste só referência opaca (sem PII). Sinalização = coluna `SIM/NÃO` da `BASE DE DADOS` (PRD §5.7).
- **Dívidas registradas na implementação:** motor documental real por ADR futuro (D-01 — adaptador interino de texto); rótulos crus da aba `DOCUMENTOS` sem ADR (mesma pendência SPEC-016); geração em lote (RF-024 "[job]") não implementada — comando individual por Parceira; sem UI de Portal (SPEC não define; §12 "leitura futura").
- ✅ **Resolvida (2026-07-17):** autorização por papel (§13) — ver §11 (RBAC aplicado às rotas administrativas).

---

### EPIC 08 — Portal da Influenciadora

#### `[x]` SPEC-025 · Acesso ao Portal
- **Deps SPEC:** SPEC-001
- **Requisitos (PRD):** §6.8, §7 (RN-16, RN-17, RN-18), §9 (RF-026, RF-027), §10 (segurança)
- ✅ **Implementada (2026-07-16):** slice completo (`Credencial`/`TokenDeSessao`/`JanelaDeBloqueio`/`Sessao`/`Autenticador` → `ParceiraACL.obterAcessoLegado`/`SessaoACL`/`BloqueioACL` → `SessaoRepository`/`BloqueioRepository` → `AcessoPortalService` → `AcessoController` → Portal `entrarNoPortal`/`renovarSessaoDoPortal`/`sairDoPortal`). Abas físicas novas `SESSOES` e `BLOQUEIOS`. Bloqueio 5 falhas → 15 min (RN-02); sessão 6h deslizante (RN-03); erros AC-01/02/03 (§17); credencial/PII fora de log (RN-04); operações de acesso serializadas por trava global (LockService, só no Entrypoint) — primeira superfície multiusuária do sistema.
- **Dívidas registradas na implementação:** verificação de credencial atrás da porta do Autenticador via **adaptador legado provisório** (`VerificadorDeCredencialLegado`, RN-16: cupom + 5 primeiros dígitos do CNPJ, por decisão do PO em 2026-07-16) — trocar o modelo (Q-07) = trocar só o adaptador; acesso não filtra estado do vínculo (Ativa/Inativa) — regra não consta da SPEC.
- **UI (FASE 3 pós-SPECs, 2026-07-16; reescrita 2026-07-17 Sprint Portal MVP Online):** `src/ui/login.html` — scaffolding temporário e funcional, sem identidade visual (decisão explícita do responsável do projeto: priorizar funcionamento para homologação; substituição futura pelo Design System oficial do Estúdio Elã não deve alterar a lógica de sessão/navegação). Navegação entre páginas via `window.top.location.href` (iframe sandboxed do HtmlService); token em `sessionStorage`. **Reescrita em 2026-07-17:** o formulário cupom/senha (modelo legado desta SPEC) foi substituído por Google Identity Services, cobrindo o fluxo federado de SPEC-035 (login/vinculação/onboarding) — ver nota em SPEC-035 abaixo. `entrarNoPortal` (backend legado, cupom+CNPJ) permanece implementado e testado, só deixou de ter UI própria.
- 🟠 **Aberto:** ~~P5 / Q-07 (modelo de autenticação definitivo)~~ resolvido por SPEC-035 (2026-07-17): federação Google Identity via novo adaptador, reaproveitando `Sessao`/`TokenDeSessao`/`SessaoRepository`/`AcessoController` desta SPEC sem alteração — ver SPEC-035 §9.2-A · ~~P6 / Q-08 (papéis)~~ resolvido por SPEC-035 para `Administrador`/`Influenciadora` (papel `Marca` permanece aberto, é decisão de escopo de produto, não de arquitetura) · Q-09 (LGPD) segue aberta — tratada como débito herdado por SPEC-027/030/032/035, não bloqueante por precedente já estabelecido, ainda sem solução formal antes de o Portal expor dados

#### `[x]` SPEC-027 · Conteúdo no Portal
- **Deps SPEC:** SPEC-009, SPEC-012, SPEC-025
- **Requisitos (PRD):** §5.4, §6.8, §9 (RF-011, RF-012, RF-013)
- ✅ **Implementada (2026-07-16):** fachada sem agregado próprio (§6.2/§6.4) — `ItemDePendencia` (VO de projeção) → `PortalDeConteudoService` (delega a `AcessoPortalService`/`EntregaService`/`BriefingService`, sem ACL/Repository novos — não há aba física nova) → `PortalDeConteudoController` → Portal (`verPendencias`/`lerBriefingDoItem`/`enviarMaterialDoPortal`). `parceiraId` deriva sempre da Sessão (token), nunca do comando externo (RN-01/INV-01). `listarPendencias` exclui Entregas `Publicado` (histórico é escopo de SPEC-030, §2). Bloco de Briefing só é exposto quando preenchido (`estaPreenchido()`, RN-03) — achado da revisão arquitetural, corrigido antes do commit. Erros PC-01 (sessão)/PC-02 (Entrega alheia ou briefing não preenchido) com `codigo`, mesmo padrão do AcessoController. 27 testes novos; suíte completa 378/378 verde; lint limpo.
- **Dívidas registradas na implementação:** nenhuma nova — herda as dívidas já registradas de SPEC-025 (Q-07/Q-08/Q-09) e SPEC-012 (D-02 material como URL).
- **UI (FASE 3 pós-SPECs, 2026-07-16):** `src/ui/pendencias.html` — scaffolding temporário (ver nota de SPEC-025).

#### `[x]` SPEC-030 · Financeiro e Histórico no Portal
- **Deps SPEC:** SPEC-012, SPEC-020, SPEC-025
- **Requisitos (PRD):** §6.6, §6.8, §6.9, §7 (RN-10), §9 (RF-023, RF-028, RF-030)
- ✅ **Implementada (2026-07-17):** fachada sem agregado próprio, mesma
  natureza de SPEC-027/032 (`ResumoFinanceiro`/`ItemDeHistorico`, VOs de
  projeção, §6.1) → `PortalFinanceiroService` (reaproveita
  `AcessoPortalService`, `EntregaService` e `PagamentoService` — nenhuma
  ACL/Repository/aba física nova) → `PortalFinanceiroController` → Portal
  (`listarPeriodosDoPortal`/`verFinanceiroDoPortal`/`verHistoricoDoPortal`).
  RN-02/CB-02: previsto = Obrigações `EmAberto`/`Aprovado`; pago = só
  `Pago`. RN-04/CB-01: período selecionável = competências com QUALQUER
  atividade da Parceira (Entrega ou Obrigação com competência; Avulso sem
  competência nunca aparece), via novo `listarPorParceira(parceiraId)` em
  `EntregaRepository`/`PagamentoRepository` (extensão aditiva, reaproveita
  `acl.listarTodos()`) e wrappers finos equivalentes em
  `EntregaService`/`PagamentoService` (mantém `PortalFinanceiroService`
  dependente só de Services, nunca de Repository de outro módulo). Erros
  PF-01 (sessão)/PF-02 (período sem atividade) com `codigo`, mesmo padrão
  dos pares. 35 testes novos (domínio/repository/service/controller/
  entrypoint, incluindo isolamento RN-05/Q-09 entre duas Parceiras reais);
  suíte completa 496/496 verde; lint limpo.
- **Dívidas registradas na implementação:** nenhuma nova — herda D-01 (§21
  da própria SPEC: isolamento depende do modelo de auth definitivo, 🟠
  Q-07) e as dívidas já registradas de SPEC-025 (Q-07/Q-08/Q-09).
- **UI (2026-07-17, Sprint Portal MVP Online):** `src/ui/financeiro.html`
  — scaffolding no mesmo padrão das demais telas do Portal (sem identidade
  visual). Seletor de competência, resumo previsto×pago e tabela de
  histórico, consumindo `listarPeriodosDoPortal`/`verFinanceiroDoPortal`/
  `verHistoricoDoPortal` sem alteração de contrato.

#### `[x]` SPEC-032 · Perfil no Portal
- **Deps SPEC:** SPEC-001, SPEC-002, SPEC-025
- **Requisitos (PRD):** §6.8, §7 (RN-02), §9 (RF-029)
- ✅ **Implementada (2026-07-16):** fachada sem agregado próprio, mesma natureza da SPEC-027 — VOs `PIX`/`Endereco` (§6.1) → `ParceiraACL.obterPerfil`/`atualizarPerfil` (portas novas: leitura/escrita célula-a-célula de uma linha EXISTENTE em `BASE DE DADOS`, deliberadamente sem reescrever a aba inteira — 961 linhas com colunas não modeladas por este domínio) → `PerfilPortalService` (reaproveita `AcessoPortalService`) → `PerfilPortalController` → Portal (`verPerfilDoPortal`/`editarPerfilDoPortal`). `AdaptadorDeCepBrasilApi` cumpre a porta de CEP (RN-01); falha é degradável (RN-02/CB-01), nunca lançada (PP-03 vira sinal implícito via `endereco.completo`). `enderecoCompleto` é recomputado e também grava `INFLUENCIADORA_ENDERECO` para manter SPEC-016/023 consistentes. 40 testes novos; suíte completa 418/418 verde; lint limpo.
- **Achados da revisão arquitetural (corrigidos antes do commit):** (1) `String(x).trim()` sem guarda de `null` transformava `null` explícito na string literal `"null"`, corrompendo e-mail/PIX/CEP — corrigido com o mesmo padrão `== null ? '' : x` já usado nas VOs. (2) `editarPerfil` renovava a Sessão duas vezes por chamada (uma direta, outra via `verPerfil` no retorno) — corrigido para reaproveitar a Sessão já resolvida. (3) o adaptador de CEP era chamado a cada edição de endereço mesmo quando o CEP não mudava — corrigido para só chamar quando `cepMudou`.
- **Dívida registrada:** `comTravaDeAcesso` (trava global do Portal) agora pode segurar uma chamada HTTP síncrona ao BrasilAPI quando o CEP muda (única operação sob a trava hoje que sai da planilha para a rede; GAS não permite configurar timeout em `UrlFetchApp`) — se o serviço externo degradar, chamadas de login/logout/conteúdo de OUTRAS Parceiras na fila do lock podem falhar por timeout. Mitigado (chamada só quando o CEP muda), não eliminado. Resolver de vez exige mover a resolução de CEP para fora da trava ou trocar o lock global por lock por-Parceira — candidato a ADR futuro, tratado na FASE 4 (dívidas técnicas) do plano pós-SPECs.
- **UI (FASE 3 pós-SPECs, 2026-07-16):** `src/ui/perfil.html` — scaffolding temporário (ver nota de SPEC-025).

#### `[x]` SPEC-035 · Identidade e Acesso (M-ID)
- **Deps SPEC:** SPEC-001, SPEC-002, SPEC-025
- **Requisitos:** `docs/specs/SPEC-035-identidade-e-acesso.md` (documento próprio — origem: revisão arquitetural + resolução de pendências em 2026-07-17; movido de `.gemini/spec-035-identidade/` em 2026-07-18, auditoria de apoio, para eliminar duplicata que já havia divergido do TASK_ROUTER)
- ✅ **Implementada (2026-07-17):** substitui o modelo de credencial legado (RN-16, cupom+CNPJ) por federação Google Identity para os papéis `Administrador` e `Influenciadora`. Resolve Q-07 e Q-08 (parcial) de SPEC-025 — ver nota na entrada de SPEC-025 acima e SPEC-035 §9.2-A. Reaproveita integralmente `Sessao`/`TokenDeSessao`/`SessaoRepository`/`SessaoACL`/`AcessoPortalService`/`AcessoController.renovar()`/`.sair()` (SPEC-025) — nenhuma stack de sessão paralela; verificado ponta a ponta (sessão emitida via Google renovada/encerrada pelo `AcessoController` já existente, mesma aba `SESSOES`). Novo: `Usuario` (domínio — máquina de estados PENDING/ACTIVE/INACTIVE/REJECTED, RN-04/RN-07 bootstrap do primeiro Administrador), `ValidadorDeTokenGoogle` (adaptador — valida `aud`/`iss`/`exp`/`iat` via endpoint `tokeninfo`, sem reaproveitar `Autenticador`/`JanelaDeBloqueio`: bloqueio por tentativas não se aplica a token assinado criptograficamente, §9.2-A), `UsuarioACL`/`AdministradorACL`/`UsuarioRepository` (`SIS_IDENTIDADES`, `BASE_ADMINISTRADORES`), extensão de `ParceiraACL` (`buscarCandidataPorEmail`/`vincularSubProvider`/`obterPorSubProvider`, §5.1-A/§10.2.4 — `INFLU_KEY` preservada como chave soberana, `SUB_PROVIDER` é atributo dependente), `UsuarioService` (login/onboarding/vinculação/moderação/RBAC/suspensão-reativação) → `UsuarioController` → Portal (`entrarComGoogle`/`confirmarVinculacaoDeIdentidade`/`completarCadastroDeUsuario`/`listarUsuariosPendentes`/`aprovarUsuario`/`rejeitarUsuario`/`inativarUsuario`/`reativarUsuario`). 79 testes novos (domínio/adaptador/ACL/repository/service/controller/entrypoint, incluindo jornada completa candidata→vinculação→bloqueio PENDING→aprovação→login ACTIVE); suíte completa 599/599 verde; lint limpo.
- **Escopo desta unidade de trabalho:** papéis `Administrador` e `Influenciadora` apenas. O ator `Marca` (tenant externo, `BASE_MARCAS`) está definido na SPEC mas **não implementado** — não é inferível do PRD vigente (que descreve operação para uma única marca), é decisão de escopo de produto que só o responsável do projeto pode tomar (SPEC-035, nota de revisão 2). `completarCadastroDeUsuario` recusa explicitamente `papel: 'MARCA'` (`ERR_AUTH_PAPEL_NAO_DISPONIVEL`).
- **Dívidas registradas:** Q-09 (LGPD) segue aberta, herdada de SPEC-025/027/030/032 — não bloqueia esta implementação, mesmo precedente já aplicado às SPECs anteriores.
- ✅ **Resolvida (2026-07-17, ver §11):** `exigirPapel`/RBAC agora protege as
  rotas administrativas de SPEC-012/016/020/023/034 (nenhum Controller do
  sistema checava papel antes desta SPEC). Gap remanescente
  `importarBaseLegada` (SPEC-003 §13) fechado em 2026-07-18 (auditoria de
  apoio) pelo mesmo mecanismo — ver entrada de SPEC-003.
- **UI (2026-07-17, Sprint Portal MVP Online):** `src/ui/login.html`
  (SPEC-025) reescrito para o modelo federado — botão Google Identity
  Services, tratamento de `AUTENTICADO`/`CANDIDATA_VINCULACAO`/
  `ONBOARDING_REQUERIDO` e dos erros `ERR_AUTH_*` (§13.1-13.3 desta SPEC).
  Roteamento pós-login por papel (`portal-dashboard` para Influenciadora,
  `admin` para Administrador) exigiu expor `papel` na resposta
  `AUTENTICADO` de `UsuarioService.entrar`/`UsuarioController.
  projetarResultadoDeEntrada` — gap de contrato encontrado nesta unidade de
  trabalho (a resposta só carregava token/parceiraId/expiraEm; o frontend
  não tinha como decidir a rota), corrigido de forma aditiva (campo novo,
  sem quebrar consumidores existentes), testes atualizados. Novo
  `src/ui/admin.html` — painel de moderação (§13.4: lista PENDING, aprova/
  rejeita) mais atalhos para as telas operacionais já existentes
  (compilar-mes/briefing/entrega/envio). Novo `src/ui/dashboard.html` —
  home da Influenciadora, hub para Pendências/Perfil/Financeiro.
- ✅ **Correção de arquitetura (2026-07-18, ADR-013):** o fluxo GIS adotado
  na UI (nota "UI (2026-07-17…)" acima) falhou em homologação — origem
  `*.script.googleusercontent.com` do HtmlService não é registrável como
  Authorized JavaScript origin (causa raiz validada na documentação do
  Google). Login substituído por OAuth 2.0 Authorization Code Flow
  server-side (redirect para /exec): novos adapters `AdaptadorOAuthGoogle`
  (troca de código, Client Secret — 4ª Script Property
  `GOOGLE_CLIENT_SECRET`) e `GuardiaoDeEstadoOAuth` (state anti-CSRF em
  CacheService, consumo único), novos `UsuarioService.iniciarLogin`/
  `entrarComCodigo` + rotas `iniciarLoginComGoogle`/`entrarComCodigoOAuth`;
  `entrarComGoogle`/`obterConfiguracaoDeLogin` removidas;
  `UsuarioService.entrar({idToken})` e toda a stack de sessão/RBAC
  inalteradas. Arquitetura experimental "frontend separado + doPost"
  descartada (condição 6 da revisão). Detalhe: ADR-013 e
  `docs/_workspace/spec035_identidade/PLANO_ADR-013_OAUTH_CODE_FLOW.md`.
- **Deploy e provisionamento de produção (2026-07-18, sessão de
  homologação):** versão 13 ("ADR-013 OAuth code flow") criada via `clasp
  push`/`create-version` e publicada no deployment de produção (rotulado
  "V 5.0"); conferido por `clasp pull --versionNumber 13` + diff que o
  conteúdo remoto é idêntico ao repositório. As 4 Script Properties foram
  provisionadas pelo operador nesta sessão, com DOIS erros de
  provisionamento encontrados e corrigidos por diagnóstico guiado:
  (1) o Client Secret havia sido colado na property `GOOGLE_CLIENT_ID`
  (formato `GOCSPX-…`), causando `401 invalid_client`; (2) em seguida o
  `GOOGLE_CLIENT_ID` foi preenchido com um valor de EXEMPLO
  (`123456789012-abc123…`), não com o ID real — evidência extraída por rota
  de diagnóstico temporária (`?pagina=diag-adr013`, já removida do código e
  do HEAD remoto) que gravou o `client_id` efetivamente enviado na aba
  `DIAG_ADR013` da planilha PROD (aba temporária — **remover
  manualmente**). Valor correto = campo "ID do cliente" da credencial OAuth
  "Portal TEAR" (projeto GCP "projeto tear" do operador; o projeto Apps
  Script permanece em "GCP: Padrão" — a associação GCP do script é
  irrelevante para o fluxo, que só usa as properties). Redirect URIs
  `/exec` (produção) e `/dev` registradas na credencial. Os IDs das
  planilhas PROD/legado não são versionados (governança §3.5/§3.6) —
  localizados via Drive ("[PROD] TEAR - Base Operacional", estrutura
  validada contra o checklist §1; legado "[ELÃ] TEAR" = ID do ADR-010).
  **Estado ao fim da sessão:** último erro observado foi `400
  redirect_uri_mismatch`, ANTES do registro das URIs na credencial;
  reteste do login pós-registro ainda pendente. Próximos passos: (1)
  validar login ponta a ponta no `/exec`; (2) onboarding/bootstrap do
  primeiro Administrador (SPEC-035); (3) carga da base legada
  (`importarBaseLegada`); (4) remover a aba `DIAG_ADR013` da planilha PROD.
- **Continuidade (2026-07-18, sessão sem acesso a navegador):** revisão de
  código ponta a ponta do fluxo ADR-013 (`AdaptadorOAuthGoogle`,
  `GuardiaoDeEstadoOAuth`, `UsuarioService.iniciarLogin`/`entrarComCodigo`,
  `UsuarioController`, `montarUsuarioService`/`iniciarLoginComGoogle`/
  `entrarComCodigoOAuth` em `Portal.js`, `login.html`) — **nenhum bug
  encontrado**; `npm run check` 624/624 verde. `curl` direto ao `/exec` de
  produção confirma o deployment ativo e respondendo (Google intercepta
  antes do Portal com sua própria tela de login, esperado para
  `access: ANYONE`) — não é possível ir além disso sem uma sessão de
  navegador autenticada com uma conta Google real (indisponível nesta
  sessão). Planilha "[PROD] TEAR - Base Operacional" lida via Drive
  (2026-07-18): `SESSOES`/`SIS_IDENTIDADES`/`BASE_ADMINISTRADORES` ainda
  **sem nenhuma linha de dado** — confirma que o login ainda não foi
  concluído com sucesso nenhuma vez em produção; `DIAG_ADR013` ainda
  presente (não contém o secret, só metadados do diagnóstico — ver
  conteúdo na sessão anterior desta mesma entrada), item (4) acima segue
  pendente, sem ferramenta disponível nesta sessão para apagar uma aba
  específica de uma planilha existente (só arquivos inteiros via Drive).
  `docs/_workspace/DEPLOY_CHECKLIST.md` ganhou uma tabela "Erros
  conhecidos do login OAuth" (redirect_uri_mismatch/invalid_client, já
  observados; hipótese de reautorização de escopo `script.external_request`
  se `UrlFetchApp` algum dia falhar por permissão — não confirmada, só
  registrada preventivamente). `ROTEIRO_HOMOLOGACAO.md` corrigido (§0/§4/
  Resumo estavam desatualizados: `access: MYSELF` → `ANYONE`; SPEC-020/030/
  034 listadas como inexistentes → `[x]` implementadas; contagem de telas
  8 → 13). **Ação real de próxima sessão continua sendo a mesma:** um
  humano (ou uma sessão com navegador conectado) precisa abrir o `/exec`
  logado com uma conta Google e clicar "Entrar com Google" para validar
  o login ponta a ponta — nenhum agente sem navegador consegue completar
  esse passo específico.
- **Continuidade (2026-07-18, sessão sem acesso a navegador — 2ª tentativa,
  foco exclusivo em destravar o login):** achado novo e corrigido:
  `src/ui/login.html` nunca lia `error=` da URL de retorno do Google (só
  `code`) — se o usuário cancelasse o consentimento (`access_denied`) ou o
  Google devolvesse qualquer outro erro no redirect, a tela ficava muda,
  sem mensagem nenhuma. Corrigido (mostra aviso e volta ao botão de login);
  suíte 625/625 verde; lint limpo. **Publicado em produção:** versão 18
  ("V 5.4 — trata error= no callback OAuth"), mesmo deploymentId de sempre
  (`clasp deploy -i <id> -V 18`, não cria URL nova — redirect URIs já
  registradas continuam válidas).
  Tentativa de diagnóstico headless da hipótese `script.external_request`
  via Apps Script Execution API (`clasp run`, manifest `executionApi`
  temporário, removido depois): **bloqueada por um pré-requisito de conta
  diferente** — `clasp run` falha com "Script function not found. Please
  make sure script is deployed as API executable" mesmo com deployment
  válido, o que é o sintoma padrão de a "Google Apps Script API" estar
  desligada em `script.google.com/home/usersettings` para a conta usada
  pelo `clasp login`. Ou seja: mesmo a via alternativa (sem navegador, via
  API) para checar Script Properties/`UrlFetchApp` exige antes um toggle
  manual nessa página, também só acionável logado no navegador. A hipótese
  de reautorização de escopo segue **não confirmada nem descartada**
  (pesquisa de documentação oficial do Google confirma que, SE for o caso,
  não existe caminho por CLI/API — só clique manual). Auditoria de código
  independente (2ª leitura completa do fluxo) não achou nenhum outro bug;
  achado de maior probabilidade prática continua sendo erro humano de
  digitação em `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (já ocorreu 2x
  nesta mesma implantação, tabela de erros conhecidos em
  `DEPLOY_CHECKLIST.md`), não a hipótese de permissão.
  **Ação humana necessária (bloqueio real, ver relatório da sessão):**
  (1) na conta que fez o deploy, abrir
  `https://script.google.com/home/usersettings` e confirmar que "Google
  Apps Script API" está ligada — desbloqueia diagnóstico futuro via
  `clasp run` sem depender de navegador a cada vez; (2) abrir a URL do
  deployment de produção (`clasp deployments`, ID `AKfycbwUhR1P7…`, `/exec`)
  logado como essa mesma conta e clicar "Entrar com Google" — se aparecer
  tela de consentimento pedindo escopos novos, aceitar (resolve a hipótese
  de permissão, se for o caso); se aparecer qualquer outro erro, ele
  finalmente será o primeiro erro real observado nesta versão do código e
  pode ser corrigido dirigido pela mensagem exibida (agora sempre visível,
  com a correção desta sessão).
- **Go-live operacional (2026-07-19, sessão de entrega):** produção estava
  na **versão 23** ("V 5.9 — OAuth encerrado, produção limpa") — sessões de
  2026-07-18 posteriores ao registro anterior validaram o login OAuth em
  produção (rótulo da v21) e removeram a sonda de autorização (v22/v23);
  diff pull-v23 × repo confirmou **produção = HEAD, sem drift**. Nesta
  sessão, executadas as 3 pendências operacionais SEM navegador logado, via
  **deployment temporário separado** (rota de bootstrap protegida por
  segredo, executada como USER_DEPLOYING; produção permaneceu pinada na
  v23): (1) **RN-07 concluído** — primeiro Administrador (sub `1073…2915`)
  `PENDING→ACTIVE` em `SIS_IDENTIDADES`; (2) **aba `DIAG_ADR013` removida**
  da planilha PROD; (3) **Importação Inicial da Base executada**
  (`importarBaseLegada`, SPEC-003): `totalImportado: 7` — as 7 Parceiras da
  base legada agora populam `BASE DE DADOS` (verificado por leitura da
  planilha). Limpeza verificada ao fim: deployment temporário excluído
  (`clasp undeploy`), código temporário revertido, `clasp push` do HEAD
  limpo, restam só os 2 deployments de sempre (@HEAD e produção @23);
  suíte 626/626 verde. A versão 24 ("TEMP — bootstrap RN-07") existe no
  histórico de versões mas não tem deployment que a sirva. **Pendência
  restante:** smoke test visual das jornadas em produção (login admin →
  dashboard → telas operacionais), dependente de sessão de navegador
  logada pelo operador.
- **Incidente de drift de produção (2026-07-18, sessão Tech Lead):** a
  auditoria de sincronia remoto×local (pull da versão publicada + diff
  contra o repo) revelou que produção estava servindo a **versão 15** —
  criada SEM descrição (provavelmente via editor web, fora desta esteira)
  a partir de um snapshot anterior às correções de 2026-07-18: ainda
  continha a rota de diagnóstico `diag-adr013` (que deveria ter sido
  removida), NÃO continha a guarda RBAC de `importarBaseLegada` (IM-03)
  nem a ordenação F6. Corrigido na mesma sessão: `clasp push` do HEAD →
  versão 16 ("V 5.3") → `clasp update-deployment` no MESMO deployment
  (URL `/exec` e redirect URIs preservadas) → `clasp pull
  --versionNumber 16` + diff confirmou conteúdo idêntico ao repo.
  **Regra operacional derivada:** nunca criar versão/implantação pelo
  editor web; toda publicação sai do repositório via `clasp push` +
  `create-version` + `update-deployment`, e toda sessão de deploy termina
  com o diff de verificação (pull da versão publicada × repo).
  **Reconciliação com a sessão paralela:** enquanto esta sessão publicava
  a v16, a sessão de destravamento do login publicou a **versão 18**
  ("V 5.4", `error=` no callback — nota acima) no mesmo deployment; a
  guarda de `enviarMaterial` (ver §11) foi então publicada **sobre a
  v18** como **versão 19** ("V 5.5"), pelo mesmo procedimento
  (`clasp push` + `create-version` + `update-deployment` no mesmo
  deploymentId) e verificada com o mesmo diff (pull da v19 × repo:
  idênticos). **Produção ao fim de 2026-07-18: versão 19 = HEAD do
  repositório.**
- **Login OAuth validado até o callback; causa raiz do último bloqueio
  corrigida (2026-07-18, sessão Tech Lead, continuação):** o operador
  confirmou o fluxo funcionando até o retorno do Google — o erro passou a
  ser "Você não tem permissão para chamar UrlFetchApp.fetch" na troca do
  código (`AdaptadorOAuthGoogle.js:62`), o que PROVA que client_id/
  redirect URIs/state estão corretos. Causa raiz (auditada, sem hipótese):
  o manifesto **nunca declarou `oauthScopes`** e a autorização da conta
  USER_DEPLOYING era anterior ao ADR-013 (era M1, só planilha);
  documentação oficial confirma que Web App como USER_DEPLOYING *"may not
  request authorization"* — falha em vez de re-pedir consentimento.
  Correção: `oauthScopes` explícitos no `appsscript.json`
  (`spreadsheets` + `script.external_request` — conjunto completo
  verificado por grep de todos os serviços GAS usados e pela referência
  oficial de cada um; `ScriptApp.getService().getUrl()` não exige escopo).
  Publicado como **versão 20** no mesmo deployment, diff verificado.
  **Passo humano final:** a conta que publica precisa consentir os
  escopos UMA vez — abrir o projeto em script.google.com, rodar qualquer
  função no editor e aceitar a tela de autorização (caminho garantido; a
  doc diz que o /exec pode não pedir) — e então repetir o login no
  `/exec`.

---

### EPIC 09 — Arquivamento

#### `[x]` SPEC-034 · Arquivamento Geral Manual
- **Deps SPEC:** SPEC-012, SPEC-016, SPEC-020 — todas `[x]`, sem pendência
  bloqueante
- **Requisitos (PRD):** §5.8, §6.9, §7 (RN-08, RN-11, RN-14), §9 (RF-031, RF-032)
- **Restrições:** `CONTRATO_SOBERANO` §6.4 (imutabilidade), §8 (`CompetenciaArquivada`)
- ✅ **Resolvido (2026-07-17, lacuna de documentação, não decisão de PO):**
  D-01 (elegibilidade para selagem) — a SPEC citava "Contrato §9" mas esse
  parágrafo só trata de `PagamentoLiberado` (já resolvido, SPEC-020 Q-04);
  nada sobre selagem. Regra formalizada em `SPEC-034-arquivamento-geral-manual.md` RN-07/§21, no mesmo
  formato do precedente Q-04: competência selável quando todo item
  existente de Entrega/Envio/Obrigação `Mensal` está terminal; ausência de
  itens de um módulo não bloqueia; `Avulso` fora da checagem.
- ✅ **Implementada (2026-07-17):** achado prévio à implementação — RN-01/02/03
  (gatilho automático de arquivamento por estado terminal, com carimbo
  `DATA_ARQUIVAMENTO`) e RN-06/INV-02/INV-03 (`ColaboracaoMensal.arquivar()`,
  `Object.freeze`) já existiam como efeito colateral de SPEC-012/016/020 —
  só faltava o comando de selagem em si. Implementado: `ArquivamentoService`
  (RN-07 sobre `EntregaService.listarEntregas`/`EnvioService.listarEnvios`/
  `PagamentoService.listarPagamentos` reaproveitados, nunca ACL/Repository
  alheios, mesmo princípio de SPEC-027/030/032) → `ColaboracaoMensalRepository.
  arquivarCompetencia`/`listarTodas` (novos) → `ColaboracaoMensalACL.
  arquivarCompetencia` (escrita física pura, reescreve só as linhas da
  competência) → `ArquivamentoController` → Portal `selarCompetencia`
  (UC-034.02, AR-02 se não compilada ou com pendência) / `arquivarLote`
  (UC-034.01, varre competências não seladas e sela as elegíveis, reporta
  as demais sem interromper — CB-03 no-op se nada elegível). Nenhuma
  entidade de domínio nova (resolve também D-02: a própria linha
  arquivada/congelada é a cópia imutável, sem aba de histórico física
  separada). 12 testes novos (ACL/Repository/Service/Controller/Entrypoint);
  suíte completa 520/520 verde; lint limpo.
- ✅ **Resolvida (2026-07-17):** autorização por papel (§13 — Administrador
  vs. Operador) — ver §11 (RBAC aplicado às rotas administrativas). A
  distinção Operador não existe como papel implementado (precedente "MVP
  operador único", SPEC-025 §13); ambas as colunas mapeiam para o papel
  `ADMINISTRADOR` único, o que preserva o resultado da tabela (nenhum papel
  de equipe além do Administrador pode selar competência).

---

> Nota (2026-07-17): a "Importação Inicial da Base" listada aqui como
> entregável adjacente foi formalizada e implementada como **SPEC-003**
> (ver EPIC 01 acima) — esta seção foi consolidada lá, não duplicar.

---

## 4. Gates (fora da numeração de SPEC)

| Gate | Depende de | Fontes |
|---|---|---|
| **Architecture Freeze** (após SPEC-005) | SPEC-001, 002, 005 | `ADR-001`, `ADR — Linguagem Ubíqua`, `DECISOES_BLOQUEANTES.md` (decisões ✅) |
| **Architecture Freeze Final** | todas as SPECs previstas | Todos os itens acima + status 🟠 pendentes por fase |

---

## 5. Lacunas deste roteador (a preencher pelo PO, se necessário)

- Âncoras de subseção de `03 — Fronteiras`, `04 — Capacidades` e `06 — Modelo
  Conceitual` não foram detalhadas (documentos ainda em `~/Downloads`, não lidos
  por inteiro). Se alguma SPEC precisar de seção específica desses, **parar e
  solicitar a atualização deste roteador**.
- Numeração oficial da ADR de Linguagem Ubíqua (colisão `ADR-002`) a confirmar.

## 6. Dívida de documentação (achado da FASE 1 pós-SPECs, 2026-07-16)

- **`NEXT_AGENT.md`** (raiz do repo, inclusive em `origin/main`) descreve uma
  arquitetura V1 (`mae/`, produção via GitHub Pages/`pages-portal`) e uma V2
  anterior (`tear/`, domínio "Ativação") — nenhuma das duas existe na árvore
  atual (`CONHECIMENTO/docs/src/test`, confirmado em `origin/main`). É
  resíduo de uma reorganização estrutural anterior (commits de 2026-07-04:
  "vendorização"/"limpeza estrutural"; branch `chore/encerramento-fase-1`
  já tentou remover legado mas não cobriu este arquivo). **Não bloqueia** a
  V2 atual: o `.clasp.json` desta branch aponta para um Apps Script próprio
  e separado (2 deployments já rotulados "M1 — Portal Cadastro de
  Parceira" — claramente desta V2), sem relação com a suposta produção V1.
  **Ação tomada (2026-07-16, mandato de resolução autônoma):** marcado
  como obsoleto com nota no topo do próprio arquivo (não apagado — preserva
  histórico, reversível). **Ainda em aberto, decisão do responsável:**
  confirmar se `mae/`/V1 ainda está mesmo viva em produção em outro lugar
  (branch/repo separado) e se há necessidade real de migração de dados de
  lá (relevante para ADR-010: "migração da planilha antiga") — isso não é
  verificável a partir deste repositório.

> **Atualização (2026-07-19, sessão de limpeza de ambiente):** `NEXT_AGENT.md`
> e `CONHECIMENTO/` foram **removidos** do repositório (antes só o primeiro
> estava marcado como obsoleto, sem ser apagado) — preservados no histórico
> Git (commits `aa5546d` e anteriores). A pergunta em aberto acima **segue
> sem resposta**: uma auditoria completa do ambiente de desenvolvimento
> local encontrou evidências de pelo menos dois scriptIds de Apps Script
> distintos ligados a um possível "V1 em produção" — um reverse-engineered
> em `docs/04.5-engenharia-reversa/snapshot-v1/` do repositório
> `estudioela/ela-tear-v1` (scriptId `1jSMRq5wu...`), e outro da própria
> fase `mae/` deste repositório antes do refactor DDD (scriptId
> `1fE8w10O3...`, presente no histórico Git daqui, commits de 2026-07-03 a
> 2026-07-11). Nenhum dos dois foi verificado contra o Google Apps Script
> real (exigiria `clasp deployments -i <scriptId>` autenticado) — a
> verificação foi iniciada e interrompida a pedido do responsável do
> projeto nesta sessão, sem conclusão. **Ainda não verificável a partir
> daqui; pendência para sessão futura, se relevante.**

## 7. Dívidas técnicas (achado da FASE 4 pós-SPECs, 2026-07-16)

Auditoria por camada (Domain/ACL+Repository/Service+Controller+Entrypoint).
Corrigidas (baixo risco, comportamento preservado, suíte 100% verde antes/depois):
- `MesReferencia.igualA`/`comparadoCom` sem guarda `instanceof` (bug real:
  `igualA(null)` lançava `TypeError` cru; comparava incorretamente com
  objetos parecidos) — alinhado ao padrão das VOs irmãs.
- `SessaoACL.regravar`/`BloqueioACL.regravar` unificados com
  `reescreverAba` (`src/shared/ColunaFisica.js`) — corpo idêntico, só
  extração.
- `montarPerfilPortal()` abria `BASE DE DADOS` duas vezes por requisição
  (uma em `montarAcessoService()`, outra explícita) — `montarAcessoService`
  agora aceita a aba já aberta como parâmetro opcional.
- `AdaptadorDeCepBrasilApi` ganhou teste de unidade próprio
  (`test/cep-adapter.test.js`) — antes só era exercitado indiretamente.

Corrigidas (FASE 4.1, decisão explícita do responsável, 2026-07-16, suíte 100% verde antes/depois):
- **Convenção de validação de string obrigatória unificada**: as VOs que
  ainda usavam `if (!x || !String(x).trim())` migraram para
  `String(x == null ? '' : x).trim() === ''` (trata `0`/`false` corretamente
  como "não vazio"). Afetados: `BlocoDeFormato`, `CamposDeMesclagem`,
  `Briefing`, `Documento`, `Parceira`, `ColaboracaoMensal`,
  `IdentificadorDeEntrega`. Mensagens/códigos de erro preservados.
- **`Object.freeze` nos estados terminais de `Entrega`/`Envio`**:
  `Entrega.publicar()` e `Envio.marcarEntregue()` agora chamam
  `Object.freeze(this)` ao entrar no estado terminal (`Publicado`/
  `Entregue`), no mesmo padrão de `ColaboracaoMensal.arquivar()`.
- **`BriefingRepository.listarPor` removido** (`src/repository/BriefingRepository.js`):
  confirmado por grep que nenhum Service/Controller o chama — código morto.
  Teste correspondente ajustado em `test/briefing-repository.test.js`
  (duas asserções incidentais substituídas por `obterPor`; nenhum cenário
  de teste foi removido).
- **`CONTRATO_SOBERANO.md` §4 atualizado**: `Ativacao`/`EnvioLogistico`
  substituídos por `Entrega`/`Envio`, formalizado em
  `docs/adrs/ADR-012-renome-ativacao-fluxo-logistico.md` (o sentido de
  "ativação" referente ao vínculo Ativa/Inativa da Parceira foi preservado
  — é um conceito diferente, não tocado).

**Dívida registrada (saneamento de infraestrutura, 2026-07-19):**
`design-system/DESIGN_SYSTEM.md` traz tokens desatualizados (paleta `#BC0004`,
cards com radius 16px, sombras discretas) que conflitam com a paleta e as
regras visuais já adotadas em `ADR-002-frontend-foundation.md` (`#CD0005`,
radius 0, "Absolute Flatness", zero box-shadow) e com o export elã/Stitch
em `design-system/stitch-export/`. Atualizar `DESIGN_SYSTEM.md` para alinhar os
tokens ao ADR-002 antes da implementação frontend.

## 8. Preparação para deploy (FASE 6 pós-SPECs, 2026-07-16)

Ver `docs/_workspace/DEPLOY_CHECKLIST.md` (checklist completo de pré-deploy
e rollback). Achados principais:
- Única Script Property necessária: `SPREADSHEET_ID` (confirmado, sem
  outras chaves em uso).
- 8 abas físicas exigidas pelo código (`BASE DE DADOS`, `COLABORACOES`,
  `BRIEFING`, `ENTREGAS`, `ENVIOS`, `DOCUMENTOS`, `SESSOES`, `BLOQUEIOS`) —
  bate com `ADR-010`; resolução de coluna é exata (case/acento/espaço
  sensíveis, sem trim) — cabeçalho físico precisa bater exatamente.
- ⚠️ **`clasp push` substitui o manifesto remoto por completo** (não é
  incremental) — qualquer arquivo só no projeto remoto (ex. editado manual
  no editor web) fora da allowlist local seria apagado no próximo push.
  Confirmar isso com o operador antes do primeiro push real.
- **Resolvido (2026-07-16):** `ACL.js`/`Repositories.js` (legado da raiz,
  sem nenhuma referência ativa em `src/`, confirmado por grep) removidos do
  repositório e das linhas correspondentes do `.claspignore`.
- ✅ **Resolvido (2026-07-17, Sprint Portal MVP Online):** `access` trocado
  de `MYSELF` para `ANYONE` em `appsscript.json` — o pré-requisito (gate de
  autorização por papel) foi fechado em §11 abaixo. `ANYONE` (não
  `ANYONE_ANONYMOUS`) porque o login é federado via Google (SPEC-035):
  exige conta Google só para abrir a URL. Detalhe em
  `DEPLOY_CHECKLIST.md` §3.

## 9. Homologação (FASE 7 pós-SPECs, 2026-07-16)

Ver `docs/_workspace/ROTEIRO_HOMOLOGACAO.md` (roteiro manual completo: 3
jornadas, 15 passos, casos de borda e códigos de erro esperados). Nenhum
achado novo além dos já registrados nas §6/§7/§8 — a auditoria confirmou por
leitura direta do código que:
- O cadastro (`cadastro-parceira.html`) só tem o campo Nome — CEP/PIX/e-mail
  só existem hoje via Perfil do Portal (SPEC-032) ou edição direta na
  planilha.
- `appsscript.json access` trocado para `ANYONE` (§8, 2026-07-17) —
  homologação por outra pessoa deixa de estar bloqueada pelo acesso; segue
  exigindo login Google (SPEC-035) para passar do ecrã inicial. Achado
  original (bloqueio por `MYSELF`) mantido aqui do ponto de vista do
  homologador, agora resolvido.
- Rastreio automático (SPEC-016 D-02) nunca confirma entrega nesta versão —
  comportamento documentado, não bug.

## 10. Auditoria SPEC-012 (achados F1–F7, 2026-07-16)
Migrado para `docs/_workspace/logs/2026-07-16_AUDITORIAS_RBAC_CONSOLIDACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 11. RBAC aplicado às rotas administrativas (fechamento Q-08, 2026-07-17)
Migrado para `docs/_workspace/logs/2026-07-16_AUDITORIAS_RBAC_CONSOLIDACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 12. Consolidação ADR-014 integrada + auditoria de ecossistema externo (2026-07-19)
Migrado para `docs/_workspace/logs/2026-07-19_ADR014_E_REDESIGN_TEARV2APP.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 13. ADR-014 publicada de fato no Apps Script oficial (2026-07-19)
Migrado para `docs/_workspace/logs/2026-07-19_ADR014_E_REDESIGN_TEARV2APP.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 14. Redesign visual — Design System Estúdio Elã (iniciado 2026-07-19)
Migrado para `docs/_workspace/logs/2026-07-19_ADR014_E_REDESIGN_TEARV2APP.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 15. Implementação paralela `tear-v2-app` (Laravel + React) — achado de governança (2026-07-20)
Migrado para `docs/_workspace/logs/2026-07-19_ADR014_E_REDESIGN_TEARV2APP.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 16. Due diligence do plano estratégico + consolidação de auditorias externas (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 17. Consolidação documental pós-merge — 4 documentos do `worktree-spec-mvp-completa` (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 18. Macrofase A (Go Live interno) — início da execução, ajustes de código sem credenciais reais (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 19. Resolução do bloqueio arquitetural (§18) — ADR-015, Etapas 5/6 executadas (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 20. Correção de referências desatualizadas + reavaliação do `PLANO_IMPLEMENTACAO.md` (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 21. Auditoria funcional do MVP + correção de 1 bug real + revisão de menu (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 22. Consolidação do plano de implantação (Go-Live) (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 23. Etapa 1 do Go-Live concluída — domínio definitivo (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 24. Auditoria do painel Locaweb — Etapa 2 parcialmente validada (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 25. Consolidação documental pós-auditoria — 4 frentes em paralelo (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 26. Encerramento da sessão — HANDOFF_GO_LIVE.md (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 27. PostgreSQL confirmado indisponível no plano Hospedagem I da Locaweb (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 28. Missão de simplificação documental — auditoria completa + Fase 1 executada (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 29. Mudança de prioridade: auditoria funcional do MVP antes do Go-Live (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 30. Execução do backlog funcional — RBAC verificado, comprovante de pagamento implementado, residuais de Cadastro fechados (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 31. Reconciliação da especificação funcional — backlog do §29 encerrado (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 32. Mudança oficial de prioridade — fase de Certificação do MVP (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 33. Google Drive sem Service Account Key — OAuth de conta dedicada (`ADR-017`, 2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 34. Google Drive sem Workspace nem Shared Drive — pasta comum + IDs reais confirmados (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 35. Google Drive — refresh_token real obtido, fluxo validado ponta a ponta, Prioridade 1 do Go-Live encerrada (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 36. SMTP de produção — relay Locaweb configurado e validado localmente (2026-07-22)
Migrado para `docs/_workspace/logs/2026-07-22_GO_LIVE_PREPARACAO.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 37. Homologação funcional iniciada — 8 fluxos prioritários auditados, 2 bugs de integridade de dados corrigidos (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 38. Auditoria de regras de negócio (papel QA, em paralelo ao §37) — 1 bug Categoria A corrigido, fluxos reclassificados para a fase de migração (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 39. Curadoria documental — decisão P0-2 extraída para ADR-018, plano de congelamento arquivado (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 40. PR #66 mergeado, missão de QA/Certificação do Agente B encerrada (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 41. Documentos de Go-Live efetivamente commitados (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 42. Missão extra de limpeza da raiz — execução da Fase 1 (restante) e Fase 2 do plano de simplificação documental (§28) (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 43. Segunda rodada da missão de limpeza — ADR-002 marcado Superseded, ADRs legado com nota histórica, mais 4 pastas de docs consolidadas (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 44. Reversão da estratégia de arquivamento — remoção definitiva de `docs/archive/`, `docs/reports/` e 8 ADRs de legado (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 45. Arquitetura de comandos do Claude Code (Fases 1-2) + base de conhecimento de referências arquiteturais OSS (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 46. Missão de documentação arquitetural — CLAUDE.md revisado, Etapa 2 bloqueada (2026-07-23)
Migrado para `docs/_workspace/logs/2026-07-23_HOMOLOGACAO_QA_LIMPEZA.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §47 Correção do ambiente de desenvolvimento local (composer dev)
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §48 Ativação do Design System oficial como SSOT de UI/UX
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §49 Hardening de produção Laravel + decisão de migrar de hospedagem (rebranding "Criativo Dodô")
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §50 Decisão de hospedagem (Locaweb Hospedagem II), rebranding "Criativo Dodô" e virada para fase de implantação
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §51 Migração de domínio na documentação de deploy (reconciliação pós-rebranding)
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-23 — §52 Fechamento da migração de domínio (`elafashionmkt`/`DEPLOY.md`) e resolução MySQL/PostgreSQL
Migrado para `docs/_workspace/logs/2026-07-23_HOSPEDAGEM_REBRANDING.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §53 Migração visual completa para o Design System "criativo DODÔ" (`ADR-019`) + tentativa de retomada da implantação (bloqueada)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §54 Diagnóstico read-only do sintoma "resposta incorreta do Host" em `portal.criativododo.com.br`
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §55 Aprofundamento do diagnóstico SSH porta 22 (Locaweb) — descarte da hipótese de expiração de 3h, escalonamento para suporte
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §56 Conclusão do diagnóstico "resposta incorreta do Host" (§54) + confirmação de que o Laravel nunca foi implantado em `criativododo2`
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §57 Auditoria visual/UX completa do frontend (sem implementação)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §58 Sprint 01 (quick wins de frontend) executado + decisão de rebranding "roxo assume o papel do laranja" (ADR-019 substituída)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §59 Design System "criativo DODÔ" v2.0 (roxo primário) formalizado como versão final + commit + publicação no Claude Design
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §60 Diagnóstico SSH Locaweb (bloqueado) + auditoria/atualização de cobertura de ativos no Design System (commit `d3dba5a`)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §61 "DODÔ" como nome oficial do projeto — aposentadoria do codinome técnico "TEAR" (`ADR-020`)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §62 Novo teste de SSH (pedido da Locaweb) + classificação FTP×Painel×SSH do pipeline de deploy + plano de contingência FTP (sessão paralela ao §60/§61)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §63 Commit de `ADR-020` + consolidação de `CLAUDE.md` como documento de governança completo (Fase 2), em 3 commits separados por natureza
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §64 Formalização do plano de contingência FTP (`§62` Frente 3) em `docs/deployment/`
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §65 Criação de `docs/infrastructure/INFRAESTRUTURA.md` — fonte oficial de dados de infraestrutura
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24 — §66 Briefing de arquitetura de telas e componentes (`docs/_workspace/UX/BRIEFING_TELAS_E_COMPONENTES_DODO.md`)
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24/25 — §67 Reteste de SSH Locaweb (retomada exata de `§62`) — bloqueio confirmado, achado novo no document root
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-24/25 — §68 Instalação e configuração do Google Stitch MCP — conectado, ferramentas ainda não confirmadas na sessão viva
Migrado para `docs/_workspace/logs/2026-07-24_DESIGN_SYSTEM_V2_E_SSH.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §69 Importação fiel do Stitch + equivalência semântica do Design System DODÔ (`design-system/`, fora de `src/` de produção)
Migrado para `docs/_workspace/logs/2026-07-25_STITCH_MANUAL_REDESIGN.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §70 Protótipo navegável do Design System + achado de conflito ADR-019 x DESIGN_DODO.md v2
Migrado para `docs/_workspace/logs/2026-07-25_STITCH_MANUAL_REDESIGN.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §71 Resolução do conflito de paleta roxo/laranja (`§70` item 2) + exclusão completa de `design-system/` + início de redesign incremental do frontend React
Migrado para `docs/_workspace/logs/2026-07-25_STITCH_MANUAL_REDESIGN.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §72 Plano técnico de redesign do frontend (preparação de execução do `§71`) + correção de defasagem do `ESTADO_SESSAO.md`
Migrado para `docs/_workspace/logs/2026-07-25_STITCH_MANUAL_REDESIGN.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §73 Reorganização documental de `ESTADO_SESSAO.md` — snapshot enxuto + `docs/_workspace/logs/` + nova política de manutenção (decisão explícita do responsável)

A pedido explícito do responsável ("modo manutenção"), mudança na forma
de manter `ESTADO_SESSAO.md`, para reduzir consumo de contexto e
acelerar novas sessões. Escopo puramente documental — **nenhum código de
aplicação alterado, nenhuma refatoração, nenhuma funcionalidade nova**.

**Problema:** `ESTADO_SESSAO.md` vinha crescendo a cada `/fim` (chegou a
384 linhas) porque acumulava narrativa completa de sessão, checklists
detalhados, riscos e um bloco de "prompt de handoff" inteiro — em vez de
ser só um snapshot do estado atual. Isso inflava o contexto lido em todo
`/comecar`.

**Mudança estrutural:**

- Criada a pasta `docs/_workspace/logs/`, com o primeiro arquivo de fase
  `docs/_workspace/logs/2026-Rebranding-DODO.md` — recebeu, **sem
  nenhuma perda de conteúdo**, tudo que foi retirado do
  `ESTADO_SESSAO.md` anterior: a seção "Última sessão concluída" (§72),
  "Riscos ativos", "IA recomendada", "Prompt de handoff" e o "Checklist"
  completo com todas as sub-checklists (plano de redesign, paleta/
  `design-system/`, SSH, briefing de UX, deploy, Sprint 01, arquitetura
  de comandos).
- `ESTADO_SESSAO.md` reescrito do zero com só 7 seções fixas: Situação
  atual, Objetivos, Próxima missão, Pendências, Últimos commits
  relevantes, Arquivos importantes, Links para logs relacionados. Caiu
  de 384 para ~165 linhas.

**Nova política de manutenção (permanente, vale a partir de agora):**

1. `ESTADO_SESSAO.md` deixa de ser um arquivo com qualquer traço
   histórico — é sempre **reescrito por completo**, nunca acrescentado.
   Isso já era a regra formal do `/fim` antigo, mas na prática o arquivo
   vinha sendo tratado como diário de bordo (seções "Última sessão
   concluída"/checklist acumulando detalhe). Fica proibido a partir de
   agora.
2. Antes de sobrescrever `ESTADO_SESSAO.md`, qualquer informação
   histórica ainda relevante deve ser movida para o arquivo de log da
   fase corrente em `docs/_workspace/logs/` (não descartada).
3. Ao concluir uma fase importante (Sprint, Rebranding, Go-Live,
   Refactor etc.), o arquivo de log correspondente deve ser encerrado
   com: Resumo da fase, Resultado, Decisões tomadas, Commits relevantes,
   Próxima fase — antes de abrir o arquivo de log da fase seguinte.
4. Cada arquivo de log, ao ultrapassar ~1500 linhas, é encerrado e um
   novo arquivo é aberto para a fase corrente/seguinte — o anterior é
   preservado como histórico imutável, nunca reescrito.
5. Ordem de leitura no início de sessão: `ESTADO_SESSAO.md` primeiro;
   `docs/_workspace/logs/` só quando a missão exigir contexto histórico
   específico que o snapshot não cobre. `TASK_ROUTER.md` continua sendo
   a fonte única de estado e dependências entre SPECs — não é
   substituído por `logs/`, que cobre a narrativa de sessão que antes
   inflava o `ESTADO_SESSAO.md`.

Comandos `.claude/commands/fim.md` e `.claude/commands/comecar.md`
atualizados na mesma sessão para refletir essa política (ver diff dos
próprios arquivos). `CLAUDE.md` §"Documentação complementar" também
atualizado para citar `docs/_workspace/logs/` no mapa de pastas de
`docs/`.

**Nenhum código de aplicação, SPEC, ADR ou domínio foi alterado.** Escopo
estritamente de organização documental operacional, autorizado
diretamente pelo responsável nesta sessão.

### Estado ao final — `[x]` concluído e commitado

- [x] `docs/_workspace/logs/` criada, com `2026-Rebranding-DODO.md`
      recebendo 100% do histórico retirado do `ESTADO_SESSAO.md`
- [x] `ESTADO_SESSAO.md` reescrito como snapshot de 7 seções, ≤300 linhas
- [x] Política de manutenção implementada em `/comecar` e `/fim`
- [x] `CLAUDE.md` atualizado com a nova responsabilidade de `logs/`
- [x] Commit `36ab33d3cf37799d1a15d7f72a0c14f57a3f1593` — só os 6
      arquivos da reorganização (correção de um commit anterior,
      `6f69538`, que incluiu por engano 44 deleções de `design-system/`
      já staged de outra sessão — corrigido com `git reset --soft
      HEAD~1` sem perda de dados, nada pushado)
- [x] Verificação de referências à arquitetura antiga — nenhuma
      referência ativa desatualizada encontrada (ver
      `docs/_workspace/logs/2026-Rebranding-DODO.md`, entrada de
      encerramento)
- [ ] Push para `origin` — não feito (fora do escopo desta frente,
      segue como pendência geral de todos os commits locais)

**Frente encerrada.** Próxima missão do projeto: redesign incremental do
frontend (Fase A do plano, `docs/_workspace/UX/PLANO_REDESIGN_FRONTEND.md`),
sem relação com esta reorganização documental.

## 2026-07-25 — §74 Manual de Design DODÔ v1.0 — nova SSOT visual, arquivamento das 3 gerações anteriores, `ADR-019` formalizada, plano de implementação React (decisão explícita do responsável)
Migrado para `docs/_workspace/logs/2026-07-25_STITCH_MANUAL_REDESIGN.md` (Etapa E, 2026-07-25 — reengenharia de contexto de `/comecar`/`/fim`).

## 2026-07-25 — §75 Causa raiz do bug de sessão Sanctum SPA sob concorrência resolvida — `web-api` duplicado removido

Sessão em `fix/session-pipeline-test` (MK Produção DODÔ). Registrado aqui
porque resolve um bloqueio de pipeline de autenticação (Sanctum SPA)
rastreado entre sessões desde `AUTH_SANCTUM_HANDOFF.md`, relevante para
homologação de `SPEC-035` (identidade e acesso) — não é só estado de
sessão. Detalhe completo em
`docs/_workspace/logs/2026-07-25_AUTH_SESSION_PIPELINE.md`.

**Causa raiz:** um grupo de middleware `web-api` (`EncryptCookies`,
`AddQueuedCookiesToResponse`, `StartSession`, `SubstituteBindings`),
criado numa sessão anterior para contornar "Session store not set on
request" em teste sem header `Origin`, duplicava — em cima de todas as
rotas `api/*` — o que `$middleware->statefulApi()` já provê nativamente
via `Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful`.
`StartSession` rodava duas vezes por request; sob chamadas concorrentes
(padrão real do Dashboard: `/parceiras` + `/campanhas` disparadas juntas
no mount) as duas inicializações de sessão se corrompiam mutuamente,
derrubando a autenticação e devolvendo o usuário ao Login sem aviso.

**Achado relevante:** o `backend/routes/api.php` já commitado (`HEAD`)
nunca teve esse grupo — a duplicação existia só numa cópia não commitada
da árvore de trabalho, de origem não confirmada (mesma pendência "volume
de mudanças não relacionadas" já sinalizada em sessões anteriores). O bug
nunca esteve em produção via commit; era estado local desatualizado.

**Decisão:** remover o grupo `web-api` (reverte para o baseline já
commitado) em vez de manter o contorno. `AuthenticationFlowTest.php`
ajustado para simular o header `Origin` que todo browser real envia —
sem isso, o teste não exercitava o caminho "stateful" de verdade e por
isso não pegava esse bug antes.

**Validação:** 212/212 testes; reprodução do bug refeita depois do fix
(mesmo padrão de chamadas concorrentes, via `curl` e via `fetch` real no
browser) — sem 401 espúrio; fluxo completo (login → sessão sob
concorrência → logout → proteção de rota) confirmado na UI real via
Chrome. Commit `0d7bd4e`.

**Não muda:** arquitetura de autenticação continua Sanctum SPA + cookie
de sessão (sem token, sem auth paralela) — o fix é remoção de duplicação,
não mudança de estratégia.

**Pendências abertas por esta frente:**
- Dado de seed do Portal da Influenciadora (`Parceira` ausente para
  `influenciadora@tear.test`) — identificado durante a validação, não
  corrigido (decisão do responsável).
- Deploy de produção segue bloqueado por infraestrutura Locaweb (SSH
  desabilitado por padrão, banco Postgres de produção não criado,
  subdomínio sem DNS, secrets do GitHub Actions não configurados) — fora
  do controle do agente, requer ação do responsável no painel Locaweb.
- `docs/_workspace/AUTH_SANCTUM_HANDOFF.md` ainda não atualizado para
  refletir esta resolução.

## 2026-07-25 — §76 Sprint 4 do Design System DODÔ (Portal mobile-first) — reconciliação do plano + execução parcial, não commitada

Sessão em `fix/session-pipeline-test`, continuação da frente de Design
System iniciada em `§74`. Detalhe completo em
`docs/_workspace/logs/2026-07-25_SPRINT4_PORTAL_MOBILE_FIRST.md`.

**Achado antes de executar:** `design-system/PLANO_IMPLEMENTACAO_DESIGN_SYSTEM.md`
(aprovado pelo responsável, `§74`) estava desatualizado em relação ao
código real. Sprint 3 (consolidação) já estava quase todo implementado —
`StatusBadge` consolidado em `Badge`, `Pagination` extraído, `Badge` em
uso em `MarcasListPage`/`CampanhaDetailPage`, empty state por filtro em
`CampanhasListPage`, `loading`/`error`/`ready` explícitos no `Dashboard`
— sem que o plano tivesse sido marcado com ✅. Único item real do Sprint
3 ainda pendente: biblioteca de ícones do Manual (fora de escopo desta
sessão). Sprint 4 (Portal mobile-first) confirmado **não iniciado**:
`PortalShell.tsx` reaproveitava `AppShell.module.css` do Admin, sem
bottom-nav mobile-first.

**Decisão do responsável:** seguir com Sprint 4, sem tocar Sprint 3
(ícones) nem Login/AuthSplitLayout.

**Executado, validado (`tsc`/`oxlint` limpos, app real via Chrome +
preview estático para o desenho de cartão), não commitado:**
- `PortalShell` próprio (bottom nav mobile / rail desktop), cor de
  navegação ativa corrigida para roxo (`--color-highlight`) — o
  `AppShell` do Admin usa laranja para o mesmo estado, inconsistente com
  a regra do Design System, não corrigido (fora de escopo, é do Admin).
- `PortalDashboardPage` com módulo CSS próprio + estado de loading
  explícito.
- `PortalCampanhasListPage`/`PortalHistoricoPage` com módulo CSS próprio
  compartilhado (`PortalListPage.module.css`): cartões clicáveis no
  mobile, tabela no desktop. Uma primeira versão (tabela responsiva via
  `data-label`) foi rejeitada pelo responsável por ainda parecer painel
  administrativo encolhido; substituída pela versão de cartão atual.

**Pendências abertas por esta frente:**
- Sprint 4 incompleto — faltam `PortalParticipacaoPage` (checar 2 usos
  de laranja que podem precisar virar roxo) e `PortalPerfilPage`
  (auditoria rápida).
- Nada commitado — decisão do responsável sobre fechar o Sprint 4
  inteiro antes de commitar, ou commitar o que já está pronto.
- Gap de seed do Portal (`§75`) impediu validar com dado real o desenho
  de cartão das duas listas — validado só via preview estático isolado,
  fora do repo.
- Achados de inconsistência no Admin não corrigidos (fora de escopo):
  `AppShell.module.css` usa laranja para nav ativo;
  `Dashboard.module.css` ainda tem `text-transform: uppercase` em
  `.cardTitle`/`.cardLink` (resquício não coberto pelo Sprint 1).

## 2026-07-25 — §77 Sprint 4 fechado (Portal completo) + consolidação visual Admin/Portal/Login + White Warm Variant oficializado (mesma sessão de `§76`, decisão explícita do responsável)

Continuação direta de `§76`, mesma sessão. Detalhe completo em
`docs/_workspace/logs/2026-07-25_SPRINT4_PORTAL_MOBILE_FIRST.md`
(seção "Continuação").

- **Sprint 4 fechado:** `PortalParticipacaoPage` e `PortalPerfilPage`
  auditados/corrigidos (2 links de conteúdo trocados de laranja para
  roxo). Portal mobile-first completo, validado no Chrome real.
- **White Warm Variant oficializado:** novo token `--color-bg-page`
  (`#F6F4F1`), exceção contextual para grandes superfícies — `--color-bg`
  (`#F1ECE5`) continua institucional/intocado. Documentado em
  `design-system/DESIGN_SYSTEM.md` (à época `docs/design/DESIGN_SYSTEM.md`)
  com as duas frases exigidas pelo responsável.
- **Menu lateral do Admin (`AppShell`) reconstruído** para bater com o
  Manual de Design DODÔ v1.0 (então SSOT) — nav ativo roxo (era laranja,
  inconsistência corrigida também no próprio HTML do manual), hover com
  fundo sutil, itens "(em breve)" com opacidade reduzida.
- **Cor alinhada em todo o Admin:** todos os links de navegação
  ("ver"/"voltar"/`cardLink`/`comprovanteLink`) trocados de laranja para
  roxo, incluindo split por seletor de tag (`a.actionLink` vs.
  `button.actionLink`) em `CampanhaDetailPage` para não recolorir os
  botões reais de ação (congelar/cancelar).
- **`docs/design/` → `design-system/`** movido (147 renames, todas as
  referências atualizadas, incluindo `CLAUDE.md`, `ADR-019` — só path
  fix). Executado via 2 subagentes em paralelo (visual: Portal+Login;
  organização: repo + pasta + docs).
- **Achados de segurança não resolvidos, urgentes:** `IMPORTANTE
  Webmail_Codigos_de_backup.txt` (raiz) está commitado no git desde o
  commit inicial (`d6454df`) com códigos de recuperação de webmail —
  precisa rotacionar + avaliar limpeza de histórico. `backend/
  .env.backup-20260723-185819` (não rastreado) tem chaves AWS/OAuth
  Google Drive/`APP_KEY` em texto puro. Nenhuma ação tomada, só
  reportado ao responsável.
- **Gerado `docs/_workspace/MAPA_FONTES_DE_VERDADE_FRONTEND.md`** —
  inventário read-only de fontes de verdade do frontend, a pedido do
  responsável, para apoiar a reconstrução visual da próxima fase.
- **Nada commitado.**

## 2026-07-25 — §78 Kickoff da reconstrução do Design System V2 (nova fase, decisão explícita do responsável) — plano rascunhado, não aprovado

Detalhe completo em
`docs/_workspace/logs/2026-07-25_DESIGN_SYSTEM_V2_RECONSTRUCAO.md`.

**Decisão de domínio (não é mudança de arquitetura de dados, é
esclarecimento):** o projeto passa a ter **dois produtos compartilhando
um Design System**: o **Portal DODÔ** (existente, domínio soberano
intocado — Marcas/Parceiras/Campanhas/Briefings/Materiais/Logística/
Pagamentos/Histórico, `CONTRATO_SOBERANO` continua valendo
integralmente) e um **site institucional** ainda não iniciado (agência,
prospecção comercial — vocabulário próprio: Clientes, Projetos,
Branding, Conteúdo, Social Media, Influência, Contato, Café). Os dois
usam a mesma paleta/tipografia/componentes, domínios de dados distintos.
`Marcas ≠ Clientes`, `Campanhas ≠ Projetos`.

**Decisão de identidade visual (superará `ADR-019` — ADR formal ainda
não escrita, próximo número livre é `ADR-021`):**
- Paleta: Cotton `#EDEBDD` (superfície clara principal), Cherry Red
  `#810100` (cor dominante/token `Primary`, preferida na dúvida), Maroon
  `#630000` (só profundidade/contraste, nunca protagonista), Noir Black
  `#1B1717` (texto/ícones/estrutura). 5ª cor de apoio (accent) a estudar
  depois — arquitetura de tokens deve reservar espaço sem exigir
  refatoração.
- Tipografia: só Elms Sans (títulos/destaque) e Work Sans
  (texto/interface) — Acumin Pro e IvyPresto Display (fontes Adobe sem
  licença/arquivo disponível) ficam fora, decisão arquitetural
  documentada, não limitação técnica.
- Tokens devem ser semânticos (`Primary`, `Surface`, `Text`, `Border`,
  `Accent`), não nomes concretos de cor — permite evoluir paleta sem
  refatorar componentes.

**Material de referência:** `design-system/base v1.1/` (PDF, `.fig`,
export HTML, paleta, fontes/ícones/logos já existentes no projeto) —
pesquisado nesta sessão, confirmado que as 3 peças principais (PDF/fig/
zip) são a mesma landing page institucional, sem nenhuma tela de
Dashboard incluída.

**Estado:** plano de migração escrito (fora do repo, artefato de sessão
do Claude Code) mas **não aprovado nem executado** — nenhum ADR criado,
nenhum arquivo de `design-system/` criado/editado para isso, nenhuma
linha de `tokens.css` tocada. Escopo desta fase era só estudo + plano.

**Achado paralelo, não desta frente:** o responsável reorganizou
manualmente `design-system/` fora do Claude Code entre o fechamento do
`§77` e o início desta fase (`archive/` → `HISTORICO/`, criação de
`base v1.1/`), confirmado como intencional e não commitado — deixou o
`git status` com renames pendentes de reconciliar. Ver
`ESTADO_SESSAO.md`.

**Próxima fase:** retomar o plano (`ADR-021` + `COLORS.md` +
`TYPOGRAPHY.md` + preencher `DESIGN_SYSTEM.md`), confirmar 2 propostas em
aberto (branco auxiliar de card, cor de borda derivada), só depois
migrar código (`tokens.css` e componentes).

## 2026-07-25 — §79 Reengenharia de contexto de `/comecar`/`/fim` — `TASK_ROUTER.md` reduzido de 5.771 para 1.112 linhas, Skills por domínio, `TASK.md` introduzido (Etapas A–H, decisão explícita do responsável)

Decisão arquitetural de longo prazo sobre como o projeto mantém estado
e histórico entre sessões, aprovada e executada nesta sessão. Detalhe
completo em
`docs/_workspace/logs/2026-07-25_ARQUITETURA_GREENFIELD_COMANDOS.md`
(diagnóstico, arquitetura desenhada, execução das 8 etapas).

**Mudança estrutural nesta própria seção do roteador:** a partir desta
entrada, `TASK_ROUTER.md` §10–§78 deixaram de conter a narrativa
completa de sessão — cada uma virou um cabeçalho + 1 linha apontando
para o log de fase correspondente em `docs/_workspace/logs/` (índice
completo em `docs/_workspace/TASK_ROUTER_MAPA_SECOES.md`). §0–§9 e §73
permanecem estruturais, sem mudança. Nenhum conteúdo foi perdido, só
redistribuído.

**Decisões de longo prazo que valem a partir de agora:**
- Este arquivo nunca mais deve receber narrativa completa de sessão —
  só decisões estruturais/arquiteturais datadas, curtas, com pointer
  para o log de fase. Narrativa vai direto para `docs/_workspace/logs/`.
- Dependências entre SPECs agora também são consultáveis via frontmatter
  (`spec`/`status`/`epic`/`depends_on` em cada `docs/specs/SPEC-NNN.md`)
  e `scripts/specs-status.sh` — a seção "3. Roteador por SPEC" acima
  continua válida, mas deixou de ser a única fonte.
- `ESTADO_SESSAO.md` passou a um formato de 7 campos enxutos
  (~40–80 linhas); `docs/_workspace/TASK.md` existe como artefato
  opcional para tarefas de mais de uma sessão.

**Não commitado nesta sessão** — pendências de segurança já registradas
bloqueiam o commit (ver `ESTADO_SESSAO.md`).

## 2026-07-25 — §80 Product First (Site Institucional MVP + Perfil Admin) e regra de soberania visual: `design-system/` é a única fonte autorizada de decisão de UI (decisão explícita do responsável)

Detalhe completo em
`docs/_workspace/logs/2026-07-25_PRODUCT_FIRST_INSTITUCIONAL_PERFIL_PORTAL.md`.

**Mudança de estratégia (domínio/processo, não só desta sessão):** o
responsável decretou "Product First" — construir os dois produtos
(Site Institucional, Portal SaaS) primeiro, extrair Design System
consolidado só depois de estabilizados. Superam-se, para esta fase,
tanto o kickoff do `§78` (Design System V2 como ponto de partida) quanto
qualquer leitura de `ADR-019` como bloqueio a mudança de paleta sem ADR
formal novo — decisão de paleta registrada aqui e no log, não em ADR
(dívida técnica registrada, não bloqueia entrega).

**Decisão de soberania visual, vale para qualquer trabalho de UI
daqui em diante:** a única fonte autorizada para decisão visual
(layout, cor, tipografia, espaçamento, hierarquia, componentes) é
`design-system/` (a pasta, incluindo `base v1.1/`) — nunca o frontend
existente (`frontend/src/`), mesmo já implementado nesta mesma sessão
(a página `InstitucionalPage.tsx`, por exemplo, não pode mais ser usada
como referência visual, só como implementação técnica de rota/estado).
Confirmado por estudo direto (não por memória de sessão anterior) que
`design-system/base v1.1/` contém duas gerações de material — a
`atualizar - MANUAL_DODO_v1.0.pdf`/`atualizar - index.html` (mais
antigos, ainda descrevem laranja/roxo, capítulos 3–5 do manual nunca
escritos) e `paleta de cores.jpg`/`dodo principal.pdf`/`dodo.fig`
(mais recentes, paleta real: Cotton `#EDEBDD`, Cherry Red `#810100`
dominante, Maroon `#630000` só profundidade, Noir Black `#1B1717`).

**Gap real encontrado, aguardando decisão do responsável (`TASK.md`):**
`design-system/` não define escala de espaçamento, escala tipográfica,
valor de border-radius, nem cor de borda — e não contém nenhuma tela de
Portal/dashboard, só a landing institucional (`dodo principal.pdf`/
`html-dodo.zip`). `dodo.fig` não pôde ser inspecionado (binário do
Figma). Nenhum CSS visual novo deve ser escrito no Portal até isso ser
resolvido.

**Entregue e commitado nesta sessão:**
- Site Institucional MVP (landing única, `/institucional`), paleta
  Cherry Red escopada localmente — commit `2a2c775`.
- Perfil do Admin/Gestor (nome + troca de senha), `PATCH /api/me`,
  3 testes novos, suíte 215/215 verde — commit `7813f16`.

**Achado de produto, não commitado:** `PortalParticipacaoPage` contava
materiais `REPROVADO` na cota de entregáveis contratados, travando a
parceira sem conseguir reenviar um material rejeitado pela marca/gestor
— corrigido (cota agora ignora reprovados), mas o commit está misturado
no mesmo arquivo com redesign visual ainda incompleto/bloqueado.

**Próxima fase:** responsável resolve as 4 lacunas de `design-system/`
(`TASK.md`); só depois retomar redesign de `PortalParticipacaoPage` e
das demais telas do Portal.

## 2026-07-26 — §81 Landing consolidada; sequência Design System → Landing → Login → Portal substitui "Product First" (§80)

Detalhe completo em
`docs/_workspace/logs/2026-07-26_LANDING_DESIGN_SYSTEM_REBUILD.md`.

**Mudança de estratégia (domínio/processo, supera §80):** o responsável
substituiu "Product First" pela sequência mandatada **Design System →
Landing → Login → Portal**, nunca desenhando uma tela seguinte antes da
anterior estar consolidada. `frontend/src` é agora o único local de UI
nova; código antigo de Portal/Login/Admin foi movido para
`frontend/src/legacy-src/` (referência só de lógica de negócio/API/auth,
nunca visual — ainda não commitado, ver "Pendência" abaixo). Isso torna
o gap de `design-system/` para telas de Portal (registrado no §80) sem
efeito prático por ora: Portal só volta a ser trabalhado depois do
Login.

**Entregue e commitado nesta sessão:** Landing completa (hero,
manifesto, arquitetura de serviços em accordion, metodologia, CTA +
rodapé em coluna editorial única), Motion System centralizado
(`theme/motion.css` + `motion.ts`, sem valor de motion hardcoded em
componente), aprovada explicitamente pelo responsável — commit `2dce389`.

**Dois bugs reais encontrados e corrigidos** (não só polimento): (1)
manchete do manifesto quebrava uma palavra por linha por reusar o token
de título de seção (64px) — resolvido com `--text-quote`, tamanho
próprio pra papel de citação editorial; (2) rodapé usava o componente
de scroll-reveal `Reveal`, cujo threshold de `IntersectionObserver`
nunca é satisfeito por conteúdo fixado no fim absoluto da página depois
que o scroll atinge o máximo — copyright e todos os links do rodapé
ficavam permanentemente invisíveis pra qualquer visitante. Corrigido
removendo `Reveal` só do rodapé.

**Regra de tipografia nova, vale daqui em diante para qualquer tela:**
identidade DODÔ nunca usa itálico/oblique/faux italic — hierarquia só
por peso (400/500/600/700), escala, espaçamento e composição.

**Pendência não resolvida:** migração de `frontend/src/legacy-src/`
(~85 arquivos) já estava no working tree antes desta sessão, segue não
commitada — decisão deliberada de não misturar no commit da Landing;
precisa de revisão e commit próprio antes do Login.

**Próxima fase:** Login, herdando o mesmo sistema de tokens/motion/
container da Landing.

## 2026-07-26 — §82 ADR-021: documentação de Design deixa de ser registro histórico permanente

Detalhe completo em
`docs/_workspace/logs/2026-07-26_LANDING_DESIGN_SYSTEM_REBUILD.md`
(seção separada ao final do arquivo).

**Contexto:** sessão paralela à sequência Design System → Landing →
Login → Portal, não parte dela — produziu documentação de referência
do Design System (projeto "Design System DODÔ" no Claude Design,
`projectId b5b37e19-3bd4-4ceb-b415-5d6c4b98d604`, e Manual editorial
publicado como Artifact), extraída do código real
(`frontend/src/theme/tokens.css` ativo vs. `frontend/legacy-src/theme/
tokens.css` estacionado — duas gerações de paleta/componentes
coexistindo sem reconciliação, já conhecido por `ADR-019`).

**Decisão de arquitetura documental (`ADR-021`):** documentação de
Design (manuais, guias de estilo, exports, protótipos, inventários/
auditorias avulsas) deixa de ser tratada como registro histórico
permanente — única fonte de verdade da identidade visual passa a ser o
frontend em produção + ativos oficiais em
`frontend/src/assets/brand/` (hoje: `wordmark-preto.svg`, assinatura
institucional, confirmadamente usado em `LandingPage.tsx`;
`stack-preto.svg`, emblema "Ô", não usado por nenhum componente ainda).
`ADR-019`/`ADR-020` mantidas intactas — nenhuma teve conteúdo
substituído, só a cláusula de preservação de `ADR-019` item 2. `CLAUDE.md`
atualizado (Restrições, Diretórios congelados, Documentação
complementar).

**Executado no mesmo commit (`528dd4f`):** remoção de `docs/design/`
inteiro (Design Systems antigos, Manual anterior em
`docs/design/manual/`, imports Stitch/v2-roxo/tear-editorial-legado,
screenshots, `HISTORICO/` duplicada, inventário/auditoria avulsos) e
`exports/notebooklm/`. `frontend/legacy-src/` (código, não
documentação) não foi tocado.

**Pendência:** projeto no Claude Design e Artifact não têm
sincronização automatizada com o repositório — releitura manual do
código a cada atualização futura.

**Próxima fase:** Login, sem alteração pela decisão desta sessão.
