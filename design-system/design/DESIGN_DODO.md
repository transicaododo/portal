# DESIGN.md — Criativo DODÔ

Este documento define o Design System e as regras de interface para a plataforma **Criativo DODÔ**. Ele foi estruturado especificamente para orientar o Google Stitch e outros agentes de IA na geração de interfaces consistentes, sofisticadas e fiéis à marca.

> **Atualização (2026-07-25):** revisão da direção de arte — `color-background` passou de `#EFE7DC` para `#F1ECE5` (descrição "Creme" substituída por "Off-White Quente" em todo o documento), a filosofia de superfícies foi reescrita (fim da lógica automática "fundo → card branco → sidebar branca", ver §1.6), a semântica de `color-primary`/`color-secondary` foi precisada (§1.1) e uma nova seção de método (§2.4 Hierarquia Visual) foi adicionada. Esta versão substitui integralmente as definições anteriores de fundo e superfície.

---

## 1. Design Tokens

Os tokens abaixo são imutáveis. Nenhuma cor, fonte ou espaçamento fora desta lista é permitido.

### 1.1 Paleta de Cores

A paleta é distribuída por hierarquia. Cada cor possui um papel definido na interface.

| Token | Cor | HEX | Uso Principal | Restrições |
|---|---|---|---|---|
| `color-background` | Off-White Quente | `#F1ECE5` | Fundo padrão, superfície principal — o ambiente de toda a aplicação (background, sidebar, topbar) | Nunca usar branco puro como fundo. Único valor oficial de background — o valor anterior (`#EFE7DC`) fica obsoleto e não deve mais ser usado. |
| `color-text` | Preto | `#171715` | Tipografia, wordmark, elementos estruturais | Não é `#000`; tem calor |
| `color-primary` | Laranja | `#F14F28` | CTA principal — criar, salvar, publicar, enviar, ação dominante da tela | Usar com contenção. Nunca como cor padrão de navegação. |
| `color-secondary` | Roxo | `#504EA1` | Navegação, links, estado ativo, seleção, elementos institucionais | Cor de confiança. Navigation Active deve usar este token. |
| `color-accent` | Lime | `#DAEA49` | Destaque excepcional, energia, ênfase pontual | Usar apenas sobre preto ou roxo. Nunca sobre branco. Nunca como cor dominante. |

**Combinações Permitidas:**
- Preto + Off-White Quente (base institucional)
- Preto + Laranja (energia, CTA)
- Roxo + Off-White Quente (confiança)
- Roxo + Lime (contraste alto, uso pontual)
- Preto + Lime (destaque máximo)

**Combinações Proibidas:**
- Laranja + Roxo em áreas grandes
- Lime + Laranja lado a lado
- Lime + Branco

### 1.2 Tipografia

Duas famílias tipográficas. Nenhuma outra fonte é permitida. Nunca misturar na mesma linha.

**Elms Sans (Primária)**
- **Função:** Marca — títulos, chamadas, stats.
- **Pesos:** Regular, Bold.
- **Uso:** Wordmark, H1/H2/H3, hero, stats ≥40px, selos, tags.
- **Restrição:** Nunca em blocos longos de texto corrido.

**Work Sans (Secundária)**
- **Função:** Sistema — corpo, UI, formulários.
- **Pesos:** Regular (400), Medium (500), SemiBold (600), Bold (700).
- **Uso:** Corpo de texto, botões, inputs, labels, tabelas, legendas, microcopy.
- **Restrição:** Nunca no wordmark.

**Escala Tipográfica:**
- **Display:** 72/80 Bold (hero/landing)
- **H1:** 48/56 Bold (título de página)
- **H2:** 32/40 Bold (seções)
- **H3:** 24/32 Bold (sub-seções)
- **Lead:** 20/30 Regular (introdução)
- **Body L:** 18/28 Regular (texto longo)
- **Body:** 16/24 Regular (UI padrão)
- **Body S:** 14/20 Regular (descrições, hints)
- **Label:** 13/16 Medium (labels de form, chips)
- **Caption:** 12/16 Regular (metadados, legendas)
- **Micro:** 11/14 Medium (tags, badges pequenos)
- **Button:** 14/16 SemiBold (ações, CAPS opcional)

### 1.3 Espaçamento e Grid

- **Escala de Espaçamento:** Múltiplos de 4px (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Padding Interno Mínimo:** 16px para containers.
- **Gap entre Seções:** ≥ 48px.
- **Grid Web:** 12 colunas, gutter 24, max-width 1240px, margem lateral 32.
- **Grid Mobile:** 4 colunas, gutter 16, margem 20.
- **Baseline Vertical:** 8px.

### 1.4 Cantos e Bordas

- **Radius Padrão:** 12px (cards, inputs, botões).
- **Radius Pequeno:** 8px (chips, tags, badges).
- **Radius Grande:** 20px (modais, sheets).
- **Radius Máximo:** 999px (avatares, botões pill).
- **Bordas:** 1px em cinza sutil. Nunca bordas coloridas em elementos estruturais.

### 1.5 Sombras e Elevação

- **Sombras:** Praticamente inexistentes.
- **Elevação:** Prioritariamente por composição, espaçamento, grid e tipografia — a diferença entre branco e background é um recurso secundário, não o método principal (ver §1.6).
- **Sombra Sutil (se estritamente necessário):** `0 1px 2px rgba(23,23,21,.06)`.
- **Restrição:** Nunca usar sombras longas ou coloridas.

### 1.6 Superfícies e Hierarquia de Fundo

O background oficial da plataforma é um **off-white quente** (`#F1ECE5`). Ele não representa uma cor de destaque — representa silêncio visual. Sua função é reduzir o brilho do branco puro, aumentar o conforto visual e criar uma atmosfera editorial contemporânea, deixando as cores de marca aparecerem apenas onde são realmente necessárias.

Esta seção substitui integralmente qualquer lógica anterior do tipo "fundo → card branco → sidebar branca". Essa lógica automática **não é mais válida**.

- **Background:** `#F1ECE5` é o ambiente principal de toda a aplicação.
- **Sidebar:** usa exatamente o mesmo background da página. A sidebar pertence à arquitetura da interface — ela não é um card e não deve parecer uma caixa branca.
- **Topbar:** mesmo background da aplicação. Não criar uma superfície branca apenas para separar o header.
- **Cards:** branco é exceção, não regra. Usar card branco somente quando houver necessidade real de destacar um conteúdo específico — nunca transformar a interface inteira em uma coleção de cartões.
- **Elevação:** a sensação de profundidade nasce prioritariamente de composição, grid, espaçamento, ritmo e tipografia. Sombras continuam praticamente inexistentes (ver §1.5).

### 1.7 Tokens Estruturais Derivados

Tokens de estrutura Material (bordas, hover, texto de apoio) que o Stitch exige mas que não têm literal próprio na paleta de marca (§1.1). Derivados como tons neutros quentes entre `color-background` e `color-text` — nunca introduzem matiz novo. Aprovados pelo responsável em 2026-07-25 (origem: `TASK_ROUTER.md` §69, aplicados nas 13 telas importadas do Stitch).

| Token | HEX | Uso Principal | Papel |
|---|---|---|---|
| `outline-variant` | `#E4DED2` | Borda padrão / divisor | Tint sutil do background, quase imperceptível |
| `outline` | `#B9AF9E` | Borda forte / ícone mudo | Cinza-taupe quente, intermediário entre background e texto |
| `on-surface-variant` | `#6B655C` | Texto de apoio / legenda (maior volume de uso do projeto) | Cinza escuro quente, mais claro que `color-text` |
| `surface-container-low` | `#E7DED2` | Fundo de hover/estado ativo da navegação | Tint próximo de `outline-variant`, sem usar branco/card |

---

## 2. Filosofia de Design e Direção de Arte

A interface da Criativo DODÔ deve parecer um software premium criado por um estúdio contemporâneo de branding. Não um dashboard genérico, não um SaaS padrão, não um template.

### 2.1 Princípios Visuais

- **Editorial e Minimalista:** A tipografia deve comunicar antes da cor. O grid deve comunicar antes dos componentes.
- **Espaço em Branco:** O espaço vazio faz parte da identidade. Respirar sempre: nenhum bloco sem 24px de margem em relação ao vizinho.
- **Contemporânea e Sofisticada:** A criatividade deve nascer da composição, nunca do excesso de elementos.
- **Silenciosa e Autoral:** A marca aparece como infraestrutura confiável para o trabalho criativo — não como protagonista visual da entrega.

### 2.2 Elementos Gráficos da Marca

Estes elementos não são decorativos; são a identidade visual do produto e devem aparecer de forma consistente:

- **O Ponto:** O ponto do logotipo "DODÔ." replicado como marcador, bullet point ou fim de bloco.
- **O Círculo:** O "O" ampliado como moldura, container de avatar e frame de mídia.
- **O Chapéu / Circunflexo:** O acento do "Ô" isolado como divisor e marca de seção (centralizado, máximo 24px, cor da paleta).

### 2.3 Motion

A marca se move com discrição. Movimento serve à leitura e ao feedback, nunca ao espetáculo.

- **Duração:** 120–240ms para micro-interações; 320–480ms para transições de tela.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out suave).
- **Restrições:** Uma animação por vez. Nada de bounce, elastic ou rotação > 360°. Respeitar `prefers-reduced-motion`.

### 2.4 Hierarquia Visual e Método de Equivalência

A composição é mais importante que a cor.

Toda decisão de design deve preservar, nesta ordem de prioridade:

1. **Composição** — ritmo, grid, respiro, equilíbrio.
2. **Tipografia** — hierarquia de leitura.
3. **Cor** — vem por último, nunca inverter esta ordem.

Ao adaptar telas ou sistemas de design externos (ex.: exportações do Google Stitch) à identidade Criativo DODÔ:

- **Jamais substituir valores HEX em massa.** Uma tabela de find-and-replace por código de cor ignora o papel funcional de cada elemento e pode igualar visualmente componentes que cumprem funções diferentes (ou vice-versa).
- **Toda equivalência cromática deve acontecer por papel semântico** (Background, Sidebar, Topbar, Card, Primary CTA, Secondary CTA, Navigation, Hover, Active, Border, Success, Error etc.), nunca por correspondência direta entre códigos de cor.
- **A arquitetura, a hierarquia visual e a experiência de uso preexistentes devem permanecer intactas.** O objetivo de qualquer adaptação de identidade é substituir a linguagem visual preservando a composição original — não redesenhar.

---

## 3. Regras de UX e Componentes

### 3.1 Regras Absolutas de UX

1. **Um único CTA primário por tela:** Ações secundárias devem ser de contorno ou texto. Nunca dois botões primários competindo.
2. **Mesma interação, mesmo padrão:** Não criar padrões diferentes para a mesma interação em telas distintas.
3. **Ações destrutivas exigem confirmação inline:** Expandir seção na tela pedindo confirmação/motivo. Nunca usar modal desnecessário.
4. **Estados obrigatórios:** Toda tela possui estados de Carregamento (Skeleton), Vazio (EmptyState), Sem Resultados e Erro.
5. **Cor nunca é o único indicador:** Usar ícone + texto + cor em badges e feedbacks.
6. **Não duplicar componentes:** Se `Badge` resolve, não criar `StatusBadge`. Se `Table` resolve, não reimplementar.
7. **Prioridade de Dispositivo:** Mobile First para Influenciadora (bottom-nav), Desktop First para Admin (sidebar fixa).

### 3.2 Componentes Obrigatórios

- **Tabs:** Para alternar facetas da mesma entidade sem navegação de página.
- **Table:** Tabela padrão (cabeçalho, linha, ação por linha).
- **Pagination:** "Página X de Y" + anterior/próxima.
- **Avatar:** Iniciais + nome a partir de `name`.
- **Upload:** Envio de material com drag & drop e barra de progresso.
- **Toast:** Feedback transitório de sucesso.
- **Skeleton:** Placeholder de carregamento com forma do conteúdo final.
- **Timeline:** Linha do tempo de status.
- **Drawer:** Painel lateral para formulário curto sem rota própria.

### 3.3 Anti-Padrões (O que NÃO fazer)

Para manter a identidade da marca consistente, o Stitch deve **EVITAR** explicitamente:

- Material Design ou Tailwind UI genérico.
- Dashboards SaaS padrão.
- Excesso de cards, badges, bordas ou sombras.
- Gradientes, glassmorphism ou neomorphism.
- Interfaces "fofas" ou com aparência de startup genérica.
- Uso da cor vermelha (usar Laranja para alertas/destaques).
- Reinterpretar a paleta oficial ou alterar hexadecimais.
- Modais/Dialogs genéricos (usar confirmação inline).
- Substituir as fontes oficiais (Elms Sans e Work Sans).

---

## 4. Estrutura de Telas (Inventário)

O sistema possui exatamente 19 rotas. Nenhuma tela fora desta lista deve ser gerada.

### 4.1 Público e Autenticação (5 Telas)
Layout `AuthSplitLayout` (split-screen com marca + conteúdo).
- `/` (Landing)
- `/login` (Login)
- `/esqueci-senha` (Esqueci Senha)
- `/definir-senha` (Definir Senha)
- `/cadastro` (Cadastro Público)

### 4.2 Administração (10 Telas)
Layout `AppShell` (sidebar desktop / top-bar mobile).
- `/` (Painel Admin)
- `/parceiras` (Lista de Parceiras)
- `/parceiras/nova` e `/parceiras/:id/editar` (Formulário de Parceiras)
- `/parceiras/:id` (Perfil da Parceira)
- `/marcas` (Lista de Marcas)
- `/marcas/nova` e `/marcas/:id/editar` (Formulário de Marcas)
- `/campanhas` (Lista de Campanhas)
- `/campanhas/nova` e `/campanhas/:id/editar` (Formulário de Campanhas)
- `/campanhas/:id` (Detalhe da Campanha)
- `/pendencias` (Fila de Trabalho)

### 4.3 Portal da Influenciadora (4 Telas)
Layout `PortalShell` (bottom-nav mobile).
- `/` (Painel Influenciadora)
- `/campanhas` (Campanhas)
- `/participacoes/:id` (Detalhe da Participação)
- `/perfil` (Perfil)
