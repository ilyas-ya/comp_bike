#!/bin/sh
set -e

# Start cron service
service cron start

# Run scraper once at startup if requested
if [ "$RUN_AT_STARTUP" = "true" ]; then
    echo "Running scraper at startup..."
    python /app/main.py --run-once
fi

# Keep container running
exec "$@"