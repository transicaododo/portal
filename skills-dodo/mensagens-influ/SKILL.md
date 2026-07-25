---
name: mensagens-influ
description: >
  Gera mensagens de WhatsApp para influenciadoras, no tom pessoal do Dani (homem,
  concordância masculina), com formatação WhatsApp e regras de minúsculas. Cobre
  confirmação de envio, follow-up de postagem, cobrança de atraso, pepinos operacionais,
  recusa de parceria, negociação de cachê, mensagem que acompanha briefing, personalização
  em massa via CSV, e modo livre para qualquer mensagem sob demanda. Usar SEMPRE que
  o pedido envolver escrever para influenciadora, creator, parceira, embaixadora,
  squad, seeding, briefing de influência, follow-up de postagem, ou cobrança de entrega.
  Acionar também quando o usuário disser "mensagem pra influ", "wpp pra creator",
  "manda pra ela", "escreve essa mensagem", "cobra a postagem", "avisa que enviei",
  "recusa essa parceria", "manda o briefing", "personaliza essas mensagens", "monta
  uma mensagem", ou enviar um CSV pedindo mensagens individualizadas. Se houver dúvida,
  acionar. O custo de não consultar é maior que o de consultar.
---

# Skill: Mensagens para Influenciadoras

Gera mensagens de WhatsApp para influenciadoras no tom pessoal do Dani, prontas para
copiar e colar. Cobre 8 cenários operacionais distintos, todos com regras compartilhadas
de tom, formatação e estrutura.

---

## REGRAS QUE VALEM SEMPRE

### Tom
- Tom pessoal do Dani. Para diagnóstico de tom autoral, consultar `/mnt/skills/user/humanizar/references/modo-dani.md`
- Híbrido entre pessoa e marca: "passando para avisar que o seeding da Jescri já foi feito", "passando para avisar que a marca aprovou o conteúdo". Pessoa quando a ação é minha, marca quando a ação é institucional
- Calma, sem urgência artificial, sem submissão, sem dureza desnecessária
- Direto sem ser frio

### Minúsculas
- Tudo em minúsculas, exceto:
  - Nomes próprios (Dani, Carol Tanaka, Jescri, Lucca)
  - Siglas (BCI, CTA, IA)
  - Início de nome de marca registrado como tal (Jescri, não jescri, mesmo no meio da frase)
- Pontuação normal. Vírgula, ponto, dois pontos. Travessão é proibido em qualquer contexto.

### Frase de início padrão
Toda mensagem (exceto cobrança e pepinos específicos) começa com:

> `oi, [nome]! tudo bem por aí? ☀️`

**Nome = primeiro nome apenas.** "Ju Grazina" vira "Ju", "Carol Tanaka" vira "Carol",
"Lê Penha" vira "Lê". Mesmo quando há duas creators com primeiro nome igual no CSV
(ex: Ju Grazina e Ju Chiká), a mensagem usa só "Ju". O contato no WhatsApp já está
identificado por conta.

Em mensagens de fim de tarde ou noite, o emoji pode ser ajustado para combinar com o
horário (☀️ manhã/início do dia, 🌙 fim de noite). Quando em dúvida, manter ☀️.

Cobrança e pepinos têm aberturas próprias, ver os respectivos arquivos de referência.

### Fechamento padrão
- Agradecimento natural: `obrigadooo 🩵` (com vários "o", proposital)
- Variações leves quando o contexto pede algo mais informativo: `qualquer coisa, me chama por aqui 🩵`, `qualquer dúvida, me fala 🩵`

### Emoji
- Mensagem normal: 1 emoji no início + 1 emoji no final
- Cobrança: 1 emoji só no início, sem emoji no fechamento
- Pepino delicado: avaliar caso a caso, mas tendência é 1 só no início, neutro
- Paleta natural: ☀️ 🩵 🤎 🌙 ✨ 🤍 (evitar emojis ruidosos ou infantis)

### Formatação WhatsApp
- `*negrito*` em campos específicos: nome do produto, código de rastreio, data limite,
  cupom, link curto, qualquer dado que a influenciadora precise encontrar visualmente
  no meio da mensagem
- `_itálico_` para títulos de campanha ou peças com nome próprio quando ajuda a
  distinguir do texto corrido
- `~tachado~` raramente, só quando há correção visível
- ` ``` ` (monoespaçado) para cupom ou código quando o cliente vai copiar exato
- Não usar negrito mecânico em frases inteiras. Marcar só o dado de interesse

### Tratamento "você", nunca "vc"
- Sempre escrever por extenso: "você", "para", "também", "obrigado". Sem abreviação
  estilo SMS

### Gênero do remetente: masculino
O Dani é homem. Toda concordância referente ao remetente em primeira pessoa vai no
masculino:
- "obrigado" (nunca "obrigada")
- "fico tranquilo" (nunca "tranquila")
- "estou organizando" (sem flexão de gênero, ok)
- Quando há nós/a gente, manter neutro: "a gente se fala", "nos falamos depois". Evitar
  flexões coletivas femininas ("juntas", "alinhadas") mesmo conversando com creator
  mulher
- Concordância com a creator segue feminino normalmente: "você foi avisada", "está
  combinado com você"

### Estrutura visual
- Quebras de linha entre blocos curtos
- Listas em bullet quando há mais de 2 datas, peças, ou itens enumerados
- Bullet do Dani: `•⁠  ⁠` (com espaço invisível antes e depois). Manter exatamente
  esse padrão

### Anti-padrões (proibidos)
- Travessão em qualquer hipótese
- Adjetivos vazios: "incrível", "maravilhoso", "perfeito"
- "Não é só X, é Y" e variações
- Perguntas retóricas como gancho
- Frases de filler: "Em conclusão", "Sem mais delongas", "Espero que esteja bem"
- Fechamentos servis: "Fico à disposição", "Aguardo seu retorno"
- Excesso de submissão: "se possível", "quando puder", "se não for incômodo"

---

## Modos de operação

| Modo | Quando usar | Arquivo de referência |
|---|---|---|
| Confirmação de envio | Avisar que produto saiu, com rastreio | `references/envio.md` |
| Briefing acompanhante | Mensagem que segue junto com o briefing em PDF/Drive | `references/briefing.md` |
| Briefing atrasado | Avisar datas agora, briefing vai depois | `references/briefing-atraso.md` |
| Follow-up de postagem | Lembrete amigável de data próxima | `references/followup.md` |
| Cobrança | Postagem atrasou, conteúdo não veio, deadline passou | `references/cobranca.md` |
| Pepinos | Atraso de envio, troca, postagem errada, conflito | `references/pepinos.md` |
| Recusa de parceria | Negativa diplomática, encerramento de ciclo | `references/recusa.md` |
| Negociação | Resposta a proposta de cachê, contraproposta | `references/negociacao.md` |
| CSV em massa | Personalização individual via planilha | `references/csv-massa.md` |
| Livre | Qualquer mensagem que não cai nos modos acima | `references/livre.md` |

---

## Fluxo padrão

1. Identificar o modo (perguntar se não estiver claro)
2. Consultar o arquivo de referência do modo
3. Aplicar as regras universais (tom, minúsculas, abertura, formatação)
4. Para CSV: pedir o arquivo, perguntar quais campos puxar, gerar 1 preview, esperar
   aprovação, gerar o resto
5. Entregar em bloco copiável (sem comentários no meio da mensagem)
6. Auditoria final: travessão? maiúscula errada? emoji no lugar certo? negrito só nos
   campos específicos? Corrigir antes de entregar

---

## Integração com outras skills

- `humanizar/references/modo-dani.md`: referência primária de tom autoral
- `humanizar/references/modo-pepinos.md`: técnica de cobrança e pepinos delicados
- `jescri/SKILL.md`: consultar quando a mensagem mencionar produto, coleção, ou
  posicionamento Jescri, para garantir nomes corretos de peças e respeitar o tom da
  marca dentro da mensagem operacional
- `influencia/SKILL.md`: consultar quando a decisão envolver estratégia (não execução),
  como avaliar se vale recusar, se a contraproposta faz sentido, se a creator é fit

---

## Auditoria antes de entregar

Antes de devolver a mensagem, verificar:
- Abertura é a frase padrão? (exceto cobrança/pepino)
- Tudo em minúsculas, exceto nomes e siglas?
- Travessão? Remover
- Emoji: 1+1 em mensagem normal, só 1 no início em cobrança?
- Negrito só em campos específicos, não em frases inteiras?
- Fechamento natural, sem servilidade?
- Híbrido pessoa/marca usado corretamente?
- Algum adjetivo vazio? Substituir por substantivo concreto ou remover
