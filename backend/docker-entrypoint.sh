#!/bin/sh
set -e
# Ждём готовности БД (PostgreSQL)
if [ "$DB_ENGINE" = "postgres" ]; then
  echo "Waiting for database..."
  while ! python -c "
import os
import sys
import socket
host = os.environ.get('POSTGRES_HOST', 'db')
port = int(os.environ.get('POSTGRES_PORT', 5432))
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
try:
  s.settimeout(2)
  s.connect((host, port))
  s.close()
  sys.exit(0)
except Exception:
  sys.exit(1)
" 2>/dev/null; do
    sleep 1
  done
  echo "Database is ready."
fi
python manage.py migrate --noinput
python manage.py collectstatic --noinput --clear
exec "$@"
