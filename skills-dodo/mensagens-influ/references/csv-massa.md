# CSV em massa

Personalização individual de mensagem para várias influenciadoras a partir de uma
planilha. O caso de uso clássico é gerar uma mensagem de briefing por creator a
partir do CSV mensal de ativações.

## Workflow obrigatório

```
1. Dani manda o CSV (ou pede pra usar um já anexado)
2. Skill lê o cabeçalho e mostra os campos disponíveis numerados
3. Skill pergunta:
   - quais campos puxar pra mensagem?
   - qual modo? (briefing, briefing atrasado, follow-up, cobrança, envio, outro)
   - filtra alguma linha? (ex: só SIM na última coluna, só MAIO, etc)
4. Skill gera UMA mensagem de preview com a primeira linha que passa no filtro
5. Skill PARA e pergunta: "manda assim ou ajusto?"
6. Dani aprova ou pede ajuste
7. Se ajustar: skill aplica e mostra novo preview
8. Se aprovar: skill pergunta o formato de saída (ver abaixo)
9. Skill gera todas as mensagens no formato escolhido
```

**Não pular etapas.** Preview de 1 antes de gerar tudo é regra fixa.

## Formatos de saída possíveis

Perguntar ao Dani na hora baseado no volume e contexto. Opções padrão:

- **Bloco corrido na conversa**: cada mensagem separada por `---`, com nome da
  influenciadora como cabeçalho `### CAROL TANAKA`. Bom até 5-6 mensagens
- **Arquivo .txt**: uma mensagem por bloco, separadas por `\n\n========\n\n` e
  nome da influenciadora como header. Bom para 5-15 mensagens
- **Planilha .xlsx**: coluna `INFLU_KEY` + coluna `MENSAGEM_PRONTA`, mantendo
  a ordem do CSV original. Bom para 10+ mensagens ou quando o Dani vai disparar
  com automação

Se o Dani não souber, sugerir baseado no volume detectado: até 5 = bloco, 5-15 = txt,
15+ = xlsx.

## Padrão do CSV de briefing Jescri

O CSV padrão tem essas colunas (referência):

```
INFLU_KEY, CUPOM, MES, RESUMO_MES,
LOOK_REEL, LOOK_CARROSSEL, LOOK_STORIES_1, LOOK_STORIES_2,
DATA_REEL, DATA_CARROSSEL, DATA_STORIES_1, DATA_STORIES_2,
SOBRE_REEL, SOBRE_CARROSSEL, SOBRE_STORIES_1, SOBRE_STORIES_2,
APROVACAO_REEL, APROVACAO_CARROSSEL, APROVACAO_STORIES_1, APROVACAO_STORIES_2,
PASTA_DRIVE_LINK, SIM/NÃO
```

Para o modo briefing, os campos puxados por padrão são:
- `INFLU_KEY` → primeiro nome da saudação
- `MES` → mês de referência
- `DATA_REEL`, `DATA_CARROSSEL`, `DATA_STORIES_1`, `DATA_STORIES_2` → datas de postagem
- `APROVACAO_REEL`, `APROVACAO_CARROSSEL`, `APROVACAO_STORIES_1`, `APROVACAO_STORIES_2`
  → datas de aprovação
- `SIM/NÃO` → filtro: gerar só para linhas com SIM

Quando uma data está vazia, omitir a linha correspondente da lista de ativações
(não escrever "ativação reel: não tem"). Ignorar silenciosamente.

## Tratamento do nome (INFLU_KEY)

`INFLU_KEY` vem em CAPS. Converter para primeiro nome com capitalização correta:
- `CAROL TANAKA` → `Carol`
- `JU GRAZINA` → `Ju`
- `LÊ ARAÚJO` → `Lê`
- `LÊ PENHA` → `Lê`
- `DUDA PIASSI` → `Duda`
- `JU CHIKÁ` → `Ju`

Regra: primeiro nome, primeira letra maiúscula, resto minúsculo, preservar acentos.
Mesmo quando há duas creators com o primeiro nome igual (Ju Grazina e Ju Chiká, Lê
Araújo e Lê Penha), usar só o primeiro nome. O contato no WhatsApp já identifica
quem é.

## Tratamento de datas

CSV traz: `10/05/2026 10:00:00`
Mensagem traz: `10/05 (dom) 10h`

Conversões obrigatórias:
- Formato: `DD/MM (dia da semana abreviado) HHh`
- Dia da semana: seg, ter, qua, qui, sex, sáb, dom (sempre minúsculo)
- Hora: só horas cheias com `h`. Se houver minutos, manter: `10h30`
- Ano: omitir (a ativação é sempre no mês corrente)

## Filtragem padrão

Por padrão, gerar mensagem só para linhas onde:
- Coluna `SIM/NÃO` (ou equivalente) = SIM
- Pelo menos uma `DATA_*` preenchida

Confirmar com o Dani se há outros filtros antes de gerar.

## Exemplo de preview gerado

Para a linha `JU GRAZINA` do CSV de exemplo, no modo briefing (versão curta padrão):

```
oi, Ju! tudo bem por aí? ☀️

segue em anexo o briefing de maio, qualquer dúvida é só me falar!
```

Se o Dani pedir explicitamente "monta com as datas", aí o preview vira:

```
oi, Ju! tudo bem por aí? ☀️

segue em anexo o briefing de maio, qualquer dúvida é só me falar!

datas:

•⁠  ⁠*reel*: 10/05 (dom) 10h, aprovação no dia 04/05
•⁠  ⁠*carrossel*: 02/06 (ter) 20h, aprovação no dia 26/05
•⁠  ⁠*stories*: 24/05 (dom) 10h, aprovação no dia 18/05
```

## Quando perguntar antes de gerar

Sempre confirmar antes de gerar em massa:
- Modo escolhido (briefing curto, briefing com datas, follow-up, cobrança, etc)
- Filtro de linhas (default: SIM/NÃO = SIM)
- Formato de saída

Não inferir o modo sozinho. Mesmo se o CSV tiver claramente cara de briefing, perguntar.

## O que não fazer
- Não gerar todas as mensagens de uma vez sem preview
- Não inventar dados não presentes no CSV
- Não colocar look/peça/direção na mensagem (isso vai no briefing PDF, não no WhatsApp)
- Não traduzir nome próprio (Lê fica Lê, não vira Leticia)
- Não somar ano à data quando o ano já é óbvio pelo contexto
- Não usar travessão
