#!/usr/bin/env bash
# Roda o teste de carga do feed (CR10) na VPS via Docker, sem instalar JMeter.
# Uso:
#   ./run-loadtest.sh sem-lb        # backend direto (127.0.0.1:8086), sem NGINX
#   ./run-loadtest.sh com-lb        # via NGINX (round-robin 8086+8087)
# Variaveis (opcionais):
#   EMAIL / SENHA -> credenciais de login pra obter o token (default: demo)
set -euo pipefail

LABEL="${1:-com-lb}"
EMAIL="${EMAIL:-demo@bookforum.com}"
SENHA="${SENHA:-Senha@123}"
BASE="https://bookforum.vgrn.cloud"
DIR="$(cd "$(dirname "$0")" && pwd)"

case "$LABEL" in
  com-lb)
    JMX="jmeterComBalanceamento.jmx"
    NET=""                         # sai pra internet e volta no NGINX
    ;;
  sem-lb)
    JMX="jmeterSemBalanceamento.jmx"
    NET="--network host"           # precisa enxergar 127.0.0.1:8086 do host
    ;;
  *)
    echo "!! Cenario invalido: '$LABEL'. Use 'com-lb' ou 'sem-lb'." >&2
    exit 1
    ;;
esac

echo ">> Obtendo token (login: $EMAIL)..."
TOKEN=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$SENHA\"}" | jq -r .token)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "!! Falha ao obter token. Confira email/senha." >&2
  exit 1
fi
echo ">> Token OK."

echo ">> Rodando JMeter (cenario: $LABEL | plano: $JMX)..."
rm -rf "$DIR/$LABEL-html" "$DIR/$LABEL.jtl"
docker run --rm $NET -v "$DIR:/work" justb4/jmeter:5.5 \
  -n -t "/work/$JMX" \
  -JTOKEN="$TOKEN" \
  -l "/work/$LABEL.jtl" -e -o "/work/$LABEL-html"

echo ""
echo ">> Pronto. Resultados:"
echo "   - resumo: $DIR/$LABEL.jtl"
echo "   - dashboard HTML: $DIR/$LABEL-html/index.html"
