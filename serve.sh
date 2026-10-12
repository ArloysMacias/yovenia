#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

requested="${PORT:-8765}"
port="$requested"
max_tries=50
tries=0

port_in_use() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
}

while port_in_use "$port"; do
  tries=$((tries + 1))
  if [[ "$tries" -ge "$max_tries" ]]; then
    echo "No free port found (tried ${requested}–$((port - 1)))." >&2
    echo "Stop the process using the port, or set PORT to another value." >&2
    exit 1
  fi
  if [[ "$port" -eq "$requested" ]]; then
    echo "Port ${requested} is already in use."
    if port_in_use "$requested" && lsof -nP -iTCP:"$requested" -sTCP:LISTEN 2>/dev/null | grep -q python; then
      echo "Another Python server may still be running — you can open http://localhost:${requested}/"
      echo "Or this script will try the next free port…"
    fi
  fi
  port=$((port + 1))
done

if [[ "$port" -ne "$requested" ]]; then
  echo "Using port ${port} instead of ${requested}."
fi

echo "Yovenia: http://localhost:${port}/"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$port"
