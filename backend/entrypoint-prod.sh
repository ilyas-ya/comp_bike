#!/bin/bash

# Production initialization script
echo "Initializing production database..."

# Wait for database to be ready
while ! pg_isready -h db -p 5432 -U postgres; do
  echo "Waiting for database..."
  sleep 2
done

echo "Database ready!"

# Run migrations
echo "Running migrations..."
python manage.py migrate

echo "Migrations completed."

# Start Gunicorn
echo "Starting server..."
exec gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 compatibility_system.wsgi:application
