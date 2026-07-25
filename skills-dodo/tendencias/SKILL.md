---
name: tendencias
description: >
  Skill de pesquisa e síntese de tendências em moda, beleza, decoração, arquitetura e comportamento.
  Usar SEMPRE que a conversa envolver: pesquisa de tendências, radar de mercado, o que está emergindo em moda/beleza/decoração/comportamento, sinais de tendência, briefing de referências, análise de contexto cultural, validação de linguagem visual, direção criativa baseada em tendência, ou qualquer pergunta do tipo "o que está acontecendo em X" ou "quais são as tendências de X". Também acionar quando o usuário pedir repertório, referências de mercado, leitura de zeitgeist, inteligência competitiva ligada a estética, comportamento ou consumo, ou quando enviar uma imagem pedindo leitura de tendência. Se houver dúvida, acionar. O custo de não consultar é maior que o de consultar.
---

# Skill: Pesquisa de Tendências

Pesquisa, síntese e leitura de tendências em moda, beleza, decoração, arquitetura e comportamento. Todas as respostas incluem fontes, independente do modo.

---

## Modos de operação

Identifique o modo pelo tipo de pedido. Se ambíguo, pergunte antes de executar.

---

### Modo 1 — Pontual

**Trigger:** pergunta direta e específica. Ex: "vermelho está em alta?", "babydoll é tendência?"

**Execução:**
1. Buscar no mínimo em 2 fontes da Camada 1
2. Complementar com 1 fonte da Camada 2 se houver ângulo de mercado brasileiro relevante
3. Responder em 3-5 linhas

**Output:**
- Resposta direta (sim/não/parcial) com contexto mínimo
- Fontes listadas com nome da publicação e o que cada uma registra

---

### Modo 2 — Imagem

**Trigger:** usuário envia foto + pede leitura de tendência

**Execução:**
1. Ler a imagem em 360: cor, textura, silhueta, materiais, mood, contexto de uso, atitude, referências culturais
2. Cruzar o que foi identificado com sinais de tendência via busca nas fontes
3. Mapear o que é tendência consolidada, o que é emergente e o que é atemporal

**Output:**
```
LEITURA DE IMAGEM

Elementos identificados:
- [cor, silhueta, textura, mood, referência cultural, etc.]

Tendências presentes:
- [tendência] — [fonte]

Observações:
- [o que é emergente, o que é recorrente, o que pode ser ângulo de conteúdo]
```

---

### Modo 3 — Profundo

**Trigger:** pedido de pesquisa ampla, briefing de coleção, contexto para direção criativa

**Execução:**
1. Buscar nas três camadas de fontes
2. Mapear macro e micro tendências no tema
3. Entregar panorama inicial como tabela
4. Aguardar pedido de aprofundamento antes de expandir

**Output inicial — tabela com 3-4 tendências:**

| Tendência | Descrição curta | Aplicação | Fontes |
|---|---|---|---|
| ... | ... | ... | ... |

A partir daí, aprofundar apenas o que o usuário pedir, na ordem que pedir.

---

### Modo 4 — Coleção

**Trigger:** "contexto para coleção X", "macro e micro tendências para Y", "o que embasa essa direção criativa"

**Execução:**
1. Identificar tema, segmento e público da coleção
2. Buscar macro tendências (comportamento, cultura, economia, estética global)
3. Buscar micro tendências (cor, silhueta, material, produto, comunicação)
4. Validar com camada acadêmica se o sinal tiver lastro conceitual relevante
5. Estruturar em dois blocos separados

**Output:**
```
MACRO TENDÊNCIAS
[tendência] — [descrição] — [fonte]

MICRO TENDÊNCIAS
[tendência] — [aplicação concreta] — [fonte]
```

Expandir por demanda, igual ao Modo 3.

---

## Hierarquia de fontes

### Camada 1 — Sinal e mercado global
Prioridade máxima. Usar para confirmar se algo é tendência real.

WGSN / START by WGSN / Vogue Business / The Business of Fashion / The Business of Beauty / Stylus / Trend Hunter / TrendWatching / Glossy / BeautyMatter / Wallpaper* / Dezeen / Highsnobiety / Vogue Runway / Vogue / Dazed / i-D / WWD / Fashionista / Livingetc

**Como buscar:** `site:businessoffashion.com [tema]`, `"vogue business" [tema] trend`, `site:dezeen.com [tema]`, `site:wgsn.com [tema]` — adaptar operador por publicação e disponibilidade de indexação.

### Camada 2 — Adaptação cultural brasileira
Filtrar relevância local e adicionar contexto de mercado nacional.

FFW / ELLE Brasil / Harper's Bazaar Brasil / L'Officiel Brasil / Casa Vogue Brasil / Casa e Jardim / Glamour Brasil / RIOetc / Steal The Look / Use Fashion

**Como buscar:** `site:ffw.com.br [tema]`, `"elle brasil" [tema]`, `"steal the look" [tema] tendência`, `site:usefashion.com [tema]`

### Camada 3 — Validação acadêmica
Usar quando o sinal precisar de lastro conceitual ou o usuário pedir base teórica.

Google Scholar / CORE / DOAJ / SSRN / PubMed / PubMed Central / Semantic Scholar / ScienceOpen / Europe PMC / DOAB

**Como buscar:** `site:scholar.google.com [tema]`, busca em SSRN para comportamento e consumo, PubMed para pele/corpo/beleza clínica.

---

## Direcionamento por tema

| Tema | Fontes prioritárias |
|---|---|
| Moda geral | WGSN, BoF, Vogue Business, FFW, ELLE Brasil |
| Beleza | BeautyMatter, BoB, Glossy, ELLE Brasil, PubMed |
| Decoração / Interiores | Dezeen, Wallpaper*, Livingetc, Casa Vogue Brasil, Casa e Jardim |
| Arquitetura | Dezeen, Wallpaper*, Archdaily |
| Comportamento / Cultura | TrendWatching, Highsnobiety, i-D, RIOetc, SSRN |
| Street style / Cultura urbana | Highsnobiety, Dazed, i-D, RIOetc, Vogue Runway |
| Luxo | BoF, Vogue Business, L'Officiel Brasil, Harper's Bazaar Brasil |
| Varejo e consumo | Glossy, WWD, Use Fashion, Steal The Look, TrendWatching |

---

## Regras

- Toda resposta inclui fontes com nome da publicação e o que ela registra
- Nunca inferir tendência sem busca confirmada. Se a busca retornar pouco, avisar e sugerir reformulação
- Modos 3 e 4: sempre começar pelo panorama, nunca despejar tudo de uma vez
- Expandir apenas o que o usuário pedir, quando pedir
