#!/bin/bash
set -e

echo "Starting bike-components.de scraper..."

# Create logs directory if it doesn't exist
mkdir -p /app/logs

# Wait for database to be ready
echo "Waiting for database to be ready..."
until pg_isready -h db -p 5432 -U postgres; do
    echo "Database is unavailable - sleeping"
    sleep 2
done
echo "Database is ready!"

# Run the scraper with provided arguments
exec "$@"