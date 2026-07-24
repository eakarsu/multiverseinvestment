#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
set -a
# shellcheck disable=SC1091
source "$project_dir/.env"
set +a

mode="${1:-start}"
case "$mode" in
  start) ;;
  migrate) exec node "$project_dir/backend/scripts/migrate-runtime.js" ;;
  check) exec npm --prefix "$project_dir/backend" test ;;
  *) echo 'usage: ./start.sh [start|migrate|check]' >&2; exit 2 ;;
esac

: "${DATABASE_URL:?DATABASE_URL is required}"
: "${BACKEND_PORT:?BACKEND_PORT is required}"
: "${FRONTEND_PORT:?FRONTEND_PORT is required}"
: "${OPENROUTER_API_KEY:?OPENROUTER_API_KEY is required}"
: "${OPENROUTER_MODEL:?OPENROUTER_MODEL is required}"
[[ "${OPENROUTER_BASE_URL:-}" == 'https://openrouter.ai/api/v1' ]] || { echo 'Canonical OPENROUTER_BASE_URL is required' >&2; exit 1; }
[[ "$BACKEND_PORT" != "$FRONTEND_PORT" ]] || { echo 'Assigned ports must differ' >&2; exit 1; }
for port in "$BACKEND_PORT" "$FRONTEND_PORT"; do
  [[ "$port" =~ ^[0-9]+$ ]] || { echo 'Assigned ports must be numeric' >&2; exit 1; }
  ! lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1 || { echo "Port $port is occupied" >&2; exit 1; }
done

node "$project_dir/backend/scripts/migrate-runtime.js"
npm --prefix "$project_dir/backend" run create-admin

api_pid=''; ui_pid=''
cleanup() {
  trap - INT TERM EXIT
  [[ -z "$ui_pid" ]] || kill "$ui_pid" 2>/dev/null || true
  [[ -z "$api_pid" ]] || kill "$api_pid" 2>/dev/null || true
  [[ -z "$ui_pid" ]] || wait "$ui_pid" 2>/dev/null || true
  [[ -z "$api_pid" ]] || wait "$api_pid" 2>/dev/null || true
}
trap cleanup INT TERM EXIT

(cd "$project_dir/backend" && exec npm start) & api_pid=$!
for _ in $(seq 1 240); do
  curl -fsS "http://127.0.0.1:$BACKEND_PORT/api/health" >/dev/null 2>&1 && break
  kill -0 "$api_pid" 2>/dev/null || { wait "$api_pid"; exit $?; }
  sleep 0.25
done
curl -fsS "http://127.0.0.1:$BACKEND_PORT/api/health" >/dev/null
(cd "$project_dir/frontend" && exec npm run dev -- --host 127.0.0.1 --port "$FRONTEND_PORT" --strictPort) & ui_pid=$!
wait "$api_pid" "$ui_pid"
