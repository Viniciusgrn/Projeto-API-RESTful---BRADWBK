#!/usr/bin/env bash
# Roda o teste de carga do feed (CR10) na VPS via Docker, sem instalar JMeter.
# Uso:
#   ./run-loadtest.sh sem-lb        # cenario SEM balanceamento
#   ./run-loadtest.sh com-lb        # cenario COM balanceamento
# Variaveis (opcionais):
#   EMAIL / SENHA -> credenciais de login pra obter o token (default: demo)
set -euo pipefail

LABEL="${1:-com-lb}"                       # nome do cenario (sem-lb | com-lb)
EMAIL="${EMAIL:-demo@bookforum.com}"
SENHA="${SENHA:-Senha@123}"
BASE="https://bookforum.vgrn.cloud"
DIR="$(cd "$(dirname "$0")" && pwd)"        # pasta tests/jmeter

echo ">> Obtendo token (login: $EMAIL)..."
TOKEN=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$SENHA\"}" | jq -r .token)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "!! Falha ao obter token. Confira email/senha." >&2
  exit 1
fi
echo ">> Token OK."

echo ">> Rodando JMeter (cenario: $LABEL)..."
rm -rf "$DIR/$LABEL-html" "$DIR/$LABEL.jtl"
docker run --rm -v "$DIR:/work" justb4/jmeter:5.5 \
  -n -t /work/feed-loadtest.jmx \
  -JTOKEN="$TOKEN" \
  -l "/work/$LABEL.jtl" -e -o "/work/$LABEL-html"

echo ""
echo ">> Pronto. Resultados:"
echo "   - resumo: $DIR/$LABEL.jtl"
echo "   - dashboard HTML: $DIR/$LABEL-html/index.html"
