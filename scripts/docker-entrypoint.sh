#!/bin/sh
set -e
echo "[entrypoint] Running migrations..."
node scripts/migrate.mjs
echo "[entrypoint] Starting Next.js on :${PORT:-3000}..."
exec node server.js
