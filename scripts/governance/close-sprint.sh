#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "DODÔ — SPRINT CLOSING"
echo "========================================"

echo
echo "1. Atualizando Workspace..."
./scripts/governance/update-workspace.sh

echo
echo "2. Verificando arquivos sensíveis..."
find . -name ".env*" -not -path "./node_modules/*"

echo
echo "3. Verificando backups..."
find . -name "*.bak"

echo
echo "4. Branch atual:"
git branch --show-current

echo
echo "5. Remote:"
git remote -v

echo
echo "6. Status:"
git status --short

echo
echo "7. Arquivos preparados:"
git diff --cached --name-only | wc -l

echo
echo "========================================"
echo "SPRINT PRONTA PARA COMMIT"
echo "========================================"
