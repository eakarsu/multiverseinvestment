#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
backend_port=${BACKEND_PORT:-3031}
frontend_port=${FRONTEND_PORT:-3023}

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

command -v node >/dev/null 2>&1 || fail 'Node.js is required'
command -v npm >/dev/null 2>&1 || fail 'npm is required'
[ -d "$project_dir/backend/node_modules" ] || fail 'Backend dependencies are missing; run npm ci in backend/'
[ -d "$project_dir/frontend/node_modules" ] || fail 'Frontend dependencies are missing; run npm ci in frontend/'
[ -n "${DATABASE_URL:-}" ] || fail 'DATABASE_URL is required'
[ -n "${SESSION_SECRET:-${JWT_SECRET:-}}" ] || fail 'SESSION_SECRET (32+ bytes) is required'

case ${SESSION_SECRET:-${JWT_SECRET:-}} in
  ????????????????????????????????*) ;;
  *) fail 'SESSION_SECRET must contain at least 32 characters' ;;
esac

for port in "$backend_port" "$frontend_port"; do
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    fail "Port $port is already in use; no process was terminated"
  fi
done

if [ "${INITIALIZE_DATABASE:-0}" = '1' ]; then
  [ "${CONFIRM_DATABASE_RESET:-}" = 'YES' ] || fail 'Database reset requires CONFIRM_DATABASE_RESET=YES'
  (cd "$project_dir/backend" && npm run seed)
fi

backend_pid=''
frontend_pid=''
cleanup() {
  trap - EXIT INT TERM
  [ -z "$frontend_pid" ] || kill "$frontend_pid" 2>/dev/null || true
  [ -z "$backend_pid" ] || kill "$backend_pid" 2>/dev/null || true
  wait "$frontend_pid" "$backend_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

(cd "$project_dir/backend" && BACKEND_PORT="$backend_port" npm start) &
backend_pid=$!

attempt=0
until curl -fsS "http://127.0.0.1:$backend_port/api/health" >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  kill -0 "$backend_pid" 2>/dev/null || fail 'Backend stopped before becoming healthy'
  [ "$attempt" -lt 30 ] || fail 'Backend health check timed out'
  sleep 1
done

(cd "$project_dir/frontend" && BACKEND_PORT="$backend_port" FRONTEND_PORT="$frontend_port" npm run dev -- --host 127.0.0.1 --port "$frontend_port" --strictPort) &
frontend_pid=$!

attempt=0
until curl -fsS "http://127.0.0.1:$frontend_port/login" >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  kill -0 "$frontend_pid" 2>/dev/null || fail 'Frontend stopped before becoming ready'
  [ "$attempt" -lt 30 ] || fail 'Frontend readiness check timed out'
  sleep 1
done

printf 'Backend: http://127.0.0.1:%s/api/health\n' "$backend_port"
printf 'Login:   http://127.0.0.1:%s/login\n' "$frontend_port"
wait "$backend_pid" "$frontend_pid"
