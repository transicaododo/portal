#!/usr/bin/env bash
set -euo pipefail

WS="docs/_workspace"

latest_md() {
    local dir="$1"
    find "$dir" -maxdepth 1 -type f -name "*.md" ! -name "README.md" \
        | sort | tail -1
}

LAST_LOG=$(latest_md "$WS/logs")
LAST_HANDOFF=$(latest_md "$WS/handoff")
LAST_DECISION=$(latest_md "$WS/decisions")
LAST_SNAPSHOT=$(latest_md "$WS/snapshots")

cat > "$WS/WORKSPACE.md" <<EOT
# WORKSPACE — DODÔ

Atualizado em:
$(date)

## Sprint Atual
Sprint 1 — Fundação do Projeto

## Estado
- GitHub: ✅ Migrado
- Portal: ✅ Repositório criado
- Site: ⏳ Sprint futura
- Deploy: ⏳ Aguardando Locaweb

## Últimos documentos

Log: ${LAST_LOG:-Nenhum}

Handoff: ${LAST_HANDOFF:-Nenhum}

Snapshot: ${LAST_SNAPSHOT:-Nenhum}

Decision: ${LAST_DECISION:-Nenhum}

## Próxima ação

Primeiro commit oficial.
EOT

echo "Workspace atualizado com sucesso."
