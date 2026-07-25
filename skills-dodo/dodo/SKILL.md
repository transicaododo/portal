---
name: dodo
description: >
  Contexto completo do criativo Dodô: posicionamento, serviços, metodologia, copy aprovado,
  operação de Meta Ads, automações e memória acumulada do Dani. Usar quando a conversa
  envolver a agência em si (branding, proposta, copy institucional), contexto de projetos
  ativos, Meta Ads e dashboards, automações com Apps Script, ou qualquer referência ao
  histórico de trabalho e preferências operacionais do estúdio.
---

# Skill: criativo Dodô

Contexto operacional, estratégico e de memória do criativo Dodô. Cobre: identidade da agência,
serviços, metodologia, copy aprovado, Meta Ads, automações e contexto acumulado do Dani.


## Identidade e posicionamento

criativo Dodô: agência de direção de marca fundada em 2025, focada em moda e lifestyle.

**Posicionamento central:** marcas não precisam de mais posts, precisam de direção.

**Tagline:** estratégia de marca, conteúdo e influência com intenção.

A Dodô entende a marca como ecossistema integrado. Não entrega um documento e sai. Acompanha, revisita planejamento e ajusta o foco conforme necessário.

**Equipe:**
- Dani: fundador, marketing 360, foco em branding, posicionamento, conteúdo, automações
- Gabi: sócia, PR, marketing de influência, ativações de marca


## Tom de voz da agência

- Direto, conversacional e intencional
- Primeira pessoa do plural (somos, entendemos) para incluir cliente no processo
- Letras minúsculas em digital para transmitir estilo e informalidade
- Sem travessão em nenhum contexto
- Sem adjetivos vazios
- Profissionalismo com proximidade


## Arquitetura de serviços

Três pilares, oito módulos. Podem ser contratados independentemente ou como sistema.

**Fundação (organização interna)**
1. Planejamento estratégico de comunicação: leitura profunda da marca, produto, discurso e números para definir pilares, mensagens e prioridades
2. Calendário de campanhas e lançamentos: organização macro dos períodos para garantir coerência no tempo

**Desejo (construção de imagem)**
3. Direção criativa e produção executiva: tradução do norte em conceito (linguagem visual, referências, casting, styling, set)
4. Social media e editorial de conteúdo: linha editorial, formatos, ritmo e consistência estética
5. Marketing sensorial: experiência nos pontos de contato físicos e online (embalagem, texto, materiais de envio)

**Relacionamento (circulação da marca)**
6. Marketing de influência: mapeamento e gestão de influenciadores com posicionamento claro
7. Gestão de collabs entre marcas: estruturação de colaborações com marcas complementares
8. Ativações de marca e eventos: planejamento e produção de ativações, lançamentos e encontros


## Metodologia

Começa com leitura cuidadosa do que a marca sustenta hoje. Essa compreensão se transforma em escolhas práticas sobre o que dizer, como dizer e onde aparecer.

O acompanhamento funciona como bússola: a equipe retorna ao plano, ajusta foco e garante continuidade. Constância e adaptação estratégica são operacionais, não pontuais.


## Copy aprovado para o estúdio

**Hero do site:** marcas não precisam de mais posts. precisam de direção.

**Apresentação:** estratégia de marca, conteúdo e influência com intenção.

**Bloco de amarração:** "cada marca pede um caminho diferente. por isso, nem todos os módulos entram em todos os trabalhos. a escolha acontece depois da leitura estratégica."

**Descrição operacional:** "a elã é direção antes de volume. a gente lê o que a marca já sustenta, nomeia o essencial e transforma isso em escolhas práticas de linguagem, estética e presença. critério e consistência são a diferença."


## Identidade visual

- Fundo: bege rosado (#f4e9e6)
- Rosa claro: #ffcccc
- Tinta/grafite: #3a3838
- Destaque/bordô: #791815
- Display: Ivy Journal (serifado, elegante, itálico para ênfase)
- Texto: Inter (sans-serif, pesos 300/400/600/700)


## Decisões tomadas

- Proibição absoluta de travessão em qualquer contexto
- Site minimalista e editorial, sem templates genéricos
- Dois pilares principais no site: marketing de influência e direção criativa de produção
- Onboarding estruturado com registro de dados, contexto de conteúdo, referências e valores
- Social Media sempre em contrato de 6 meses


## Fluxo de vendas

1. Pré-form de cliente (filtro elegante antes da reunião)
2. Reunião clara com proposta nascida com menos ruído
3. Onboarding estruturado (dados, contexto, referências, valores)
4. Entrada com direção e alinhamento de linguagem
5. Acompanhamento contínuo com revisitas de planejamento


## Meta Ads: estrutura de dashboard

Pipeline padrão em Google Sheets:

1. **BASE**: CSV bruto exportado do Meta Ads Manager
2. **BASE_LIMPA**: normalização com ARRAYFORMULA + REGEXMATCH, calcula CTR/Frequência/ROAS, classifica tipo de anúncio
3. **VALIDACAO_TIPO**: triage manual quando tipo não é identificado automaticamente
4. **BASE_LIMPA_FINAL**: versão aplicada com classificações manuais
5. **DASHBOARD**: visualizações executivas com filtros por tipo

Nomenclatura de campanhas: `[CLIENTE]_[TIPO]_[DESCRIÇÃO]_[VERSÃO]`
Exemplo: `JESCRI_VIDEO_COLECAO_VERAO_V1`


## Meta Ads: KPIs e benchmarks

```
CTR = Cliques / Impressões
Frequência = Impressões / Alcance
ROAS = Receita / Investido
CPM = (Investido / Impressões) × 1000
CPC = Investido / Cliques
CPA = Investido / Conversões
```

Benchmarks: ROAS >= 3.0 (saudável), CTR entre 0.5% e 2.5%, Frequência < 5.


## Automações: padrões

**Apps Script padrão:**
- `syncAllCore_()`: sincroniza base de influenciadoras com briefing mensal
- Autocrat: gera contratos via Google Sheets + template DOCX
- `parseDataBR()`: corrige shift de fuso ao criar objetos Date

```javascript
function parseDataBR(dataBR) {
  var partes = dataBR.split("/");
  return new Date(partes[2], partes[1]-1, partes[0]);
}
```

**Problema recorrente:** datas com shift de -5h ao sincronizar. Solução: usar `new Date(ano, mês-1, dia)`.

**Estrutura de abas padrão:** BASE, BASE_LIMPA, VALIDACAO_TIPO, BASE_LIMPA_FINAL, DASHBOARD, FERIADOS E RECESSOS.

**Nomenclatura de planilhas:** `[CLIENTE] BRIEFING`, `[CLIENTE] BASE`, `[CLIENTE] CONTRATOS`.


## Memória operacional

**Regras de comportamento:**
- 1 passo executável por vez, sem tutoriais longos
- Código sempre completo e consolidado, pronto para copiar
- Em planilhas: Google Sheets pt-BR com separador `;`
- Ao solicitar horários de postagem: só a parte estratégica (melhores horários + justificativa), sem copy ou criativos
- Quando Dani escolher uma opção: criar imediatamente versões alternativas
- Em alterações de site/repositório: entregar apenas o arquivo modificado

**Projetos ativos:**
- Automação de contratos de influenciadoras Jescri (Sheets + Autocrat + DOCX)
- SAC Jescri com fluxo por canal (Instagram e TikTok)
- Sistema de agenda ICS em 3 categorias: [APROVAÇÃO], [ATIVAÇÃO], [FOLLOW UP]
- Sistema de contagem de criativos: stories + news, ignorar textos coloridos
