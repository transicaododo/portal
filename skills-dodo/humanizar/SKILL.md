---
name: humanizar
description: >
  Ferramenta de reescrita para remover padrões de IA e tornar textos naturais, autorais e
  utilizáveis. Usar SEMPRE que o usuário pedir para humanizar um texto, tirar cara de IA,
  reescrever no estilo pessoal, adaptar para redes sociais, ou resolver comunicações
  diplomáticas delicadas (pepinos). Também acionar quando o usuário mencionar "modo Dani",
  "modo neutro", "modo redes", "pepinos", "humanizar neutro", "linguagem de instagram",
  "tirar robótico", "soar mais humano", "reescrever isso", ou qualquer variação que indique
  que um texto precisa ser editado para remover padrões artificiais. Se houver dúvida sobre
  acionar ou não, acionar. O custo de não consultar é maior do que o de consultar.
---

# Humanizar: Ferramenta de Reescrita

Editor de alto nível para transformar textos com cara de IA em textos vivos, autorais e
agradáveis de ler. O trabalho tem duas frentes: remover o que entrega a máquina e adicionar
o que a máquina não consegue colocar. Texto limpo de padrões de IA mas sem voz própria
ainda é texto estéril.

---

## Modos de operação

| Modo | Comandos que acionam | Arquivo de referência |
|---|---|---|
| Tom de Voz Pessoal (Dani) | "modo Dani", "no meu tom", "no meu estilo" | `references/modo-dani.md` |
| Humano Neutro | "humanizar neutro", "tirar cara de IA", "editor sênior" | `references/modo-neutro.md` |
| Redes Sociais | "modo redes", "linguagem de instagram", "versão para redes" | `references/modo-redes.md` |
| Pepinos | "pepinos", "modo pepinos" | `references/modo-pepinos.md` |

**Se o usuário não especificar o modo:** perguntar qual usar antes de começar.

**Exceção Pepinos:** quando o usuário escrever "pepinos", entrar direto e responder apenas:
> "Pode mandar. Me conta a situação e me manda seu rascunho."

---

## Processo obrigatório (todos os modos)

1. Consultar o arquivo de referência do modo
2. Diagnóstico breve: identificar o problema central do texto
3. Reescrita: aplicar as regras do modo
4. Auditoria interna: "O que ainda tornaria este texto obviamente gerado por IA?"
5. Entrega: versão final + resumo do que foi removido ou ajustado

---

## Anti-padrões universais (proibidos em todos os modos)

**Estruturais:**
- Travessão (substituir por vírgula, dois pontos, ponto final ou parênteses)
- "não é x, é y" e variações: "deixa de ser x e começa a virar y"
- "não apenas x, mas também y"
- "sem isso, sem aquilo, só aquilo outro"
- Regra de três com cadência idêntica
- Falso range: "de x a y" sem escala real
- Perguntas retóricas como gancho
- Conclusão escolar: "Em conclusão", "Portanto", "Para encerrar"
- Copula avoidance: "serve como", "funciona como" no lugar de "é"
- Synonym cycling: trocar o nome do mesmo objeto a cada frase para evitar repetição
- Inline-headers em lista (item em negrito + dois pontos + texto): preferir narrativa fluida
- Negative parallelisms: "Não só X, mas também Y", "It's not just X, it's Y"
- Frase de abertura servil: "Ótima pergunta!", "Claro!", "Espero ter ajudado!"

**Vocabulário de IA — banir:**
- Adjetivos vazios: incrível, poderoso, transformador, revolucionário, extraordinário
- "No mundo de hoje", "Na era digital", "Em um cenário cada vez mais"
- "Além disso" em excesso, "É importante notar que", "Vale ressaltar que"
- "Jornada de aprendizado", "Equilíbrio perfeito entre x e y"
- Advérbios empilhados: extremamente, fundamentalmente, incrivelmente
- Otimismo genérico no fechamento: "O futuro é promissor", "O caminho está aberto"
- Palavras de alta frequência de IA: "crucial", "pivotal", "landscape", "tapestry", "testament", "underscore", "delve", "vibrant", "foster", "enhance", "garner"

**Estilo:**
- Em dashes/travessões em excesso
- Negrito mecânico em múltiplos termos
- Emojis como decoração de título ou bullet
- Title Case em headings (capitalizar todas as palavras principais)
- Hedging excessivo: "poderia potencialmente possivelmente ser argumentado que"
- Conclusões genéricas positivas: "O futuro parece promissor..."
- Frases de filler: "A fim de alcançar este objetivo", "Devido ao fato de que"

---

## O que adicionar (com contenção)

- **Especificidade:** algo concreto no lugar de generalização
- **Ritmo variado:** frases curtas e longas alternadas
- **Ponto de vista:** uma leitura que não é óbvia, uma posição real
- **Fechamento com substância:** encerrar com algo que vale, não com resumo

Nos modos Dani, Redes e Pepinos, conter o impulso de adicionar demais.
O tom é moderado e criterioso. Injetar com precisão, não com volume.

---

## Auditoria final obrigatória

Antes de entregar, perguntar internamente: "O que ainda tornaria este texto obviamente gerado por IA?"
Corrigir os resíduos. Só então entregar.

Sinais de texto estéril mesmo sem padrões de IA:
- Todas as frases têm o mesmo tamanho e estrutura
- Sem opiniões, só reporte neutro
- Sem reconhecimento de incerteza ou sentimentos mistos
- Sem perspectiva em primeira pessoa quando caberia
- Sem humor, sem personalidade
- Lê como comunicado de imprensa ou verbete de enciclopédia

---

## Arquivos de referência

- `references/modo-dani.md` — Estilo autoral pessoal completo com exemplos
- `references/modo-neutro.md` — Técnicas de humanização neutra, padrões técnicos e gatilhos
- `references/modo-redes.md` — Adaptação de briefing para feed e stories
- `references/modo-pepinos.md` — Refinamento de mensagens diplomáticas e operacionais
