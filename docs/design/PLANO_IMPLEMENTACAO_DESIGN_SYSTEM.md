# Plano de implementação — Manual de Design DODÔ v1.0 no React

> **Status: aguardando aprovação.** Nenhuma linha de código foi alterada
> para produzir este plano — é resultado de uma auditoria somente leitura
> de todo o frontend React contra `docs/design/manual/index.html`.
> Implementação só começa após o responsável do projeto revisar e aprovar
> este documento por completo.

## Como ler este plano

A auditoria (3 frentes paralelas: componentes compartilhados, telas
administrativas, telas públicas/portal) encontrou que **nenhuma tela ou
componente precisa ser reescrito do zero** — a arquitetura de componentes,
CSS Modules e tokens já é sólida e, na maior parte, já usa `var(--...)`
corretamente. As divergências encontradas são pontuais e majoritariamente
de baixo risco. A exceção é o **Portal da Influenciadora**, que tem uma
lacuna estrutural real (não é mobile-first/bottom-nav como o Manual exige).

Este plano organiza a correção em sprints sequenciados por
**risco crescente**, não por capítulo do Manual — sprints iniciais são
ajustes CSS pontuais e reversíveis; sprints finais envolvem decisão de
token numérico ainda não fechada ou mudança estrutural de componente
compartilhado.

## Modelo de execução (quando aprovado)

Cada sprint abaixo é uma unidade de trabalho independente e testável.
Sprints sem dependência entre si podem rodar em paralelo por subagentes
com escopo exclusivo (ex.: um agente em tokens/componentes base, outro em
telas admin, outro em portal, um QA validando visualmente cada entrega) —
sempre com **um único responsável pela integração final e pela
consistência do Design System** entre as frentes, evitando que duas
frentes decidam o mesmo detalhe de forma diferente. Nenhum sprint começa
sem o anterior (quando houver dependência) estar validado visualmente.

---

## Sprint 0 — Decisões de token pendentes (bloqueante para os Sprints 4 e 6)

Não é código — é decisão do responsável do projeto, pré-requisito de
sprints posteriores:

| Decisão pendente | Onde fica registrada hoje | Bloqueia |
|---|---|---|
| Escala numérica de radius para a evolução de curvatura (cards/containers/painéis) | `docs/design/manual/index.html#bordas` — só o princípio está definido | Sprint 4 |
| Token de `text-transform`/caixa baixa formal (ou simplesmente remover a propriedade case a caso) | `docs/design/manual/index.html#tipografia` | Sprint 1 (pode avançar sem token formal, só removendo `uppercase`) |
| Substituto canônico para o símbolo decorativo do `AuthSplitLayout` (hoje uma estrela de 8 pontas fora do vocabulário de marca) | achado da auditoria, não documentado ainda | Sprint 3 |

---

## Sprint 1 — Correções sistêmicas de tipografia (risco mínimo, alcance máximo)

Mudanças pontuais em CSS Modules compartilhados — cada uma se propaga
automaticamente para todas as telas que já consomem o componente, sem
tocar em nenhum `.tsx`.

| Item | Arquivo | Mudança | Impacto |
|---|---|---|---|
| Botão usa fonte errada | `Button.module.css` | `font-family: var(--font-display)` → `var(--font-text)`, peso semibold | Todo botão da aplicação |
| Caixa alta indevida — navegação | `AppShell.module.css` (`.tagline`, `.navItem`, `.logoutLink`) | remover `text-transform: uppercase` | Toda tela autenticada, admin **e** portal (shell compartilhado) |
| Caixa alta indevida — campos | `TextField.module.css` (`.label`) | remover `text-transform: uppercase` | Todo formulário da aplicação |
| Caixa alta indevida — badges | `Badge.module.css`, `StatusBadge.module.css` | remover `text-transform: uppercase` | Toda lista com status |
| Caixa alta indevida — auth | `AuthSplitLayout.module.css` (`.eyebrow`, `.tagline`) | remover `text-transform: uppercase` | Login, esqueci senha, cadastro |
| Caixa alta indevida — títulos de seção | `PublicCadastroPage.module.css`, `PortalPerfilPage.module.css` (`.groupTitle`) | remover `text-transform: uppercase` | Cadastro público, perfil do portal |
| Cor hardcoded | `TextField.module.css` (placeholder) | `rgba(29,27,27,.3)` → token de `--color-text-muted` com opacidade | Todo input da aplicação |

**Validação:** golden path de login + um formulário admin + um formulário
do portal, visual apenas (nenhuma mudança de comportamento).

---

## Sprint 2 — Disciplina de CTA único (bugs reais de hierarquia)

A auditoria encontrou violações concretas da regra "um CTA primário por
tela" do Manual — não é preferência estética, é a regra de UX central do
capítulo de essência da marca.

| Tela | Problema | Correção |
|---|---|---|
| `BriefingFormPage` | botões "salvar" e "voltar" caem ambos no `variant` padrão (`primary`) | adicionar `variant="secondary"` em "voltar" — fix de uma prop |
| `PagamentoPage` | "avançar status" e "enviar comprovante" renderizam juntos, mesmo peso | definir qual é a ação primária da tela; a outra vira `secondary` |
| `MarcasListPage`, `ParceirasListPage`, `CampanhasListPage` | CTA do header ("nova X") duplica o CTA do `EmptyState` quando a lista está vazia — dois botões laranja fazendo a mesma coisa | decidir: ocultar o CTA do header quando o `EmptyState` já oferece a ação, ou remover a `action` do `EmptyState` nesses três casos |
| `PortalPerfilPage` | "salvar dados pessoais" e "salvar medidas" são dois formulários distintos, mas dois `primary` visíveis ao mesmo tempo | avaliar se um dos dois deve virar `secondary`, ou se a tela deve deixar mais explícito que são dois submits independentes (ex.: separar visualmente as duas seções) |
| `MateriaisPage` | fila de aprovação renderiza um botão "aprovar" (`primary`) por item pendente — pode haver N simultâneos | **decisão de design, não fix de token**: avaliar `variant="secondary"` para o "aprovar" de linha, reservando laranja sólido só para a ação mais importante da tela (ex.: "enviar material") |

**Validação:** revisão visual de cada tela alterada com dados reais (lista
vazia, lista com múltiplos pendentes) antes de prosseguir.

---

## Sprint 3 — Consolidação de padrões (débito estrutural pequeno)

| Item | Descrição | Esforço |
|---|---|---|
| `StatusBadge` → `Badge` | `StatusBadge.module.css` é cópia byte-a-byte de `Badge.module.css`; consolidar numa prop de tone em `Badge`, remover `StatusBadge` | baixo, mas toca múltiplos call-sites |
| `MarcasListPage` — status em texto puro | é a única lista que não usa `Badge`/`StatusBadge` para status; unificar com o padrão das demais | baixo |
| `CampanhaDetailPage` — tag "congelada" | hoje é um `&lt;span&gt;` estilizado à parte, terceiro sistema de rótulo paralelo ao Badge; absorver no sistema existente | baixo |
| `CampanhasListPage` — mensagem de vazio genérica | não varia por filtro (`?status=ATIVA` mostra o mesmo texto que a lista geral); copiar o padrão já implementado em `ParceirasListPage` (vazio diferenciado por filtro) | baixo |
| `Dashboard` — loading/erro indistinguíveis de vazio | `pendentes`/`totalCampanhas` começam `null` e caem no mesmo ramo visual de "vazio"; catch de erro é silencioso | médio — precisa de lógica de estado nova, não só JSX |
| `AuthSplitLayout` — símbolo não-canônico | SVG decorativo de estrela (8 pontas, animado) viola a regra "nenhum símbolo novo" do capítulo de sistema gráfico; substituir por ponto, círculo ou chapéu/circunflexo (depende da decisão do Sprint 0) | baixo, gated em Sprint 0 |

---

## Sprint 4 — Portal mobile-first (maior escopo estrutural do plano)

Achado mais importante da auditoria de portal: `PortalShell` **reaproveita
o CSS do shell administrativo** (`AppShell.module.css`) — sidebar
desktop/topbar mobile, sem bottom-nav. O Manual define mobile-first com
bottom-nav como prioridade de dispositivo para o portal (Desktop-first é
regra do Admin, não do Portal). Nenhuma tela do portal pode ser
considerada "resolvida" no dispositivo prioritário enquanto essa casca
não mudar — por isso este sprint precede qualquer polimento fino de
`PortalParticipacaoPage`/`PortalPerfilPage`.

| Item | Descrição |
|---|---|
| `PortalShell` | criar shell próprio com bottom-nav mobile-first, em vez de reaproveitar o shell do admin |
| `PortalDashboardPage` | migrar de `Dashboard.module.css` (do admin) para um módulo próprio; adicionar estado de loading explícito (hoje ausente — a tela só aparenta "vazio" enquanto os dados chegam) |

**Depende de:** nada tecnicamente, mas é o maior risco de regressão do
plano (toca navegação de três telas ao mesmo tempo) — recomendo isolar
num branch/PR próprio com validação em dispositivo real, não só devtools.

---

## Sprint 5 — Curvatura (gated no Sprint 0)

Só inicia depois de uma escala numérica de radius ser aprovada. Quando
chegar, a auditoria já mapeou o tier de cada superfície pelo critério do
Manual (proximidade humana como critério primário, papel funcional como
secundário):

- **Tier alto** (mais acolhedor): `AuthSplitLayout`, `PortalParticipacaoPage`
  (a tela mais "humana" do sistema — briefing, upload, pagamento),
  `PortalPerfilPage`, `ParceiraProfilePage`/`ParceiraFormPage`.
- **Tier médio**: cards do `Dashboard`, zona de cabeçalho/período de
  `CampanhaDetailPage`, itens de `MateriaisPage`.
- **Tier baixo** (evolução discreta, nunca zero): tabelas/listas densas —
  `MarcasListPage`, `ParceirasListPage`, `CampanhasListPage`,
  `LogisticaPage`, tabela de participações dentro de `CampanhaDetailPage`.

`EmptyState` já usa `--radius-card` hoje — é o único componente que já
"vive" na curvatura evoluída; serve de referência de valor quando a
escala for definida.

---

## Sprint 6 — Biblioteca de ícones (independente, pode rodar em paralelo a qualquer sprint acima)

A aplicação hoje usa `frontend/public/icons.svg`, um sprite genérico de
boilerplate sem relação com a marca. O Manual já especifica e entrega 15
ícones prontos (`docs/design/manual/assets/icons/`, grid 24×24, stroke
2px, `currentColor`) cobrindo navegação e ações principais. Este sprint
troca o sprite genérico pela biblioteca oficial — sem dependência dos
demais, bom candidato a rodar em paralelo desde o início.

---

## Achados fora de escopo de design (registrados, não endereçados aqui)

- `LandingPage` ainda cita "campanhas do TEAR" (nome técnico legado) —
  achado textual/nomenclatura, não visual; fica para quem tratar
  referências ao nome legado no conteúdo.
- `CampanhaDetailPage` tem uma tabela de participações com ~12 colunas,
  6 delas `aria-hidden` condicionais — cheiro de densidade estrutural que
  merece revisão própria de UX, não só troca de skin visual; sinalizado
  aqui para não ser esquecido, fora do escopo deste plano de identidade
  visual.

---

## Resumo de dependências

```
Sprint 0 (decisões) ──┬──> Sprint 3 (símbolo do AuthSplitLayout)
                       └──> Sprint 5 (curvatura)

Sprint 1 (tipografia) ──> Sprint 2 (CTA único) ──> Sprint 3 (consolidação)

Sprint 4 (portal mobile-first) — independente, maior risco, isolar em PR próprio
Sprint 6 (ícones) — independente, pode rodar a qualquer momento
```

Sprints 1, 4 e 6 não têm dependência entre si e são os melhores
candidatos a paralelização quando a implementação for aprovada.
