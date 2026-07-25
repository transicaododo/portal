#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
AUDIT="$ROOT/.audit"

echo "========================================"
echo "rollback-brand.sh"
echo "========================================"
echo "Projeto : $ROOT"
echo "Audit   : $AUDIT"
echo

