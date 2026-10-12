#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PORT="${PORT:-8765}"
echo "Yovenia: http://localhost:${PORT}/"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$PORT"
