#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

# Instala dependências do frontend se necessário
if [ ! -d frontend/node_modules ]; then
  echo "Instalando dependências do frontend..."
  (cd frontend && npm install)
fi

echo "Iniciando frontend em modo dev (porta 5173)..."
(cd frontend && npm run dev) &
FRONT_PID=$!

cleanup() {
  echo "Encerrando..."
  kill $FRONT_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

wait
