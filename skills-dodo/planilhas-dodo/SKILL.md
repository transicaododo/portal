---
name: planilhas-dodo
description: >
  Padrão visual e estrutural para criação de planilhas do criativo Dodô. Usar SEMPRE que for criar uma planilha nova, independente do contexto (influência, social media, financeiro, branding, operações). Acionar também quando o usuário pedir "cria uma planilha", "monta uma tabela", "preciso de uma sheet", ou qualquer entrega cujo output seja um arquivo .xlsx. Se houver dúvida sobre acionar, acionar. O custo de não consultar é maior que o de consultar.
---

# Padrão de Planilhas — criativo Dodô

## Visual

### Cabeçalho (linha 1)
- Fundo: `#CD0005` (RGB: 205, 0, 5)
- Texto: branco `#FFFFFF`, bold, tamanho 11
- Freeze na linha 1 (sempre)
- Altura da linha 1: 20px

### Dados
- Fonte padrão: Calibri 11, texto escuro
- Sem bordas externas pesadas; bordas internas finas opcionais
- Sem cores de fundo nas linhas de dados (sem zebra striping por padrão)

### Larguras de coluna
- Ajustar ao conteúdo por padrão (`auto_fit`)
- Mínimo 12, máximo 60 (em unidades openpyxl)

---

## Nomenclatura

### Abas
- MAIÚSCULAS sempre
- Abas operacionais: nome direto (BASE DE DADOS, CADASTROS, ATIVAÇÕES)
- Abas de histórico: prefixo "HISTÓRICO DE" (HISTÓRICO DE PAGAMENTOS, HISTÓRICO DE CONTEÚDOS)
- Abas gerenciais/resumo: DASH, VALORES, FIT, RESUMO
- Abas auxiliares de sistema: manter originais sem renomear (ex: NVScriptsProperties)

### Colunas
- Bancos de dados operacionais (alimentados por automação ou integração): SNAKE_CASE_MAIÚSCULO (ex: INFLU_KEY, MES_REFERENCIA, STATUS_CONTEUDO)
- Tabelas de leitura humana e dashboards: minúsculas com espaço (ex: semana, início, fim, mês, valor)

---

## Estrutura de abas (3 camadas)

Toda planilha deve seguir essa lógica quando aplicável:

| Camada | Função | Exemplos |
|---|---|---|
| Operacional | Dados ativos em edição | BASE DE DADOS, CADASTROS, ATIVAÇÕES, BRIEFING |
| Histórico | Arquivo de registros encerrados | HISTÓRICO DE CONTEÚDOS, HISTÓRICO LOGÍSTICO |
| Gerencial | Visão consolidada / métricas | DASH, VALORES, FIT, RESUMO |

Se a planilha for simples (1-2 abas), manter só operacional.

---

## Campos padrão por tipo de aba

### Abas operacionais com rastreabilidade
Incluir ao final:
- `DATA_ARQUIVAMENTO` (quando a aba for espelho de histórico)
- Links externos como `PASTA_DRIVE_LINK`, `DOC_URL` como colunas finais
- Flag de automação: `SIM/NÃO` quando houver integração com Autocrat ou Apps Script

### Status
- Sempre textual, minúsculas: `em aberto`, `pago`, `postado`, `enviado`, `entregue`
- Exceção para chaves de ativação de automação: `ON` / `OFF` (maiúsculas)

### Datas
- Sempre datetime (data + hora), mesmo que a hora seja 00:00:00
- Formato de exibição: dd/mm/aaaa ou dd/mm/aaaa hh:mm conforme contexto

---

## Código Python (openpyxl) — template base

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

HEADER_BG = "CD0005"
HEADER_FG = "FFFFFF"

def aplicar_cabecalho(ws, colunas):
    """Aplica padrão visual Dodô na linha 1 de uma aba."""
    ws.append(colunas)
    for col_idx, _ in enumerate(colunas, start=1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = PatternFill("solid", fgColor=HEADER_BG)
        cell.font = Font(color=HEADER_FG, bold=True, size=11, name="Calibri")
        cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 20
    ws.freeze_panes = "A2"

def ajustar_colunas(ws, min_width=12, max_width=60):
    for col in ws.columns:
        max_len = max((len(str(cell.value or "")) for cell in col), default=0)
        width = min(max(max_len + 2, min_width), max_width)
        ws.column_dimensions[get_column_letter(col[0].column)].width = width
```

### Uso
```python
wb = Workbook()

# Aba operacional
ws_base = wb.active
ws_base.title = "BASE DE DADOS"
aplicar_cabecalho(ws_base, ["STATUS", "INFLU_KEY", "MES_REFERENCIA", "VALOR_TOTAL"])

# Aba gerencial
ws_dash = wb.create_sheet("DASH")
aplicar_cabecalho(ws_dash, ["mês", "total", "aprovados", "pendentes"])

ajustar_colunas(ws_base)
ajustar_colunas(ws_dash)

wb.save("planilha.xlsx")
```

---

## Checklist antes de entregar

- [ ] Linha 1 com fundo `#CD0005`, texto branco, bold
- [ ] Freeze na linha 1 em todas as abas
- [ ] Nomes de abas em MAIÚSCULAS
- [ ] Colunas operacionais em SNAKE_CASE, leitura humana em minúsculas
- [ ] Larguras ajustadas ao conteúdo
- [ ] Zero erros de fórmula (`#REF!`, `#DIV/0!`, etc.)
- [ ] Arquivo salvo em `.xlsx`
