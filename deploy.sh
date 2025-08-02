#!/bin/bash

# Bike Components Compatibility System - Production Deployment Script
# This script deploys the application to production environment

set -e  # Exit on any error

echo "🚀 Starting Production Deployment..."
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if docker and docker-compose are installed
command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed. Aborting."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { print_error "Docker Compose is required but not installed. Aborting."; exit 1; }

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    print_warning ".env.prod file not found. Creating from example..."
    if [ -f .env.prod.example ]; then
        cp .env.prod.example .env.prod
        print_warning "Please edit .env.prod with your production values before continuing."
        read -p "Press enter to continue after editing .env.prod..."
    else
        print_error ".env.prod.example file not found. Please create .env.prod manually."
        exit 1
    fi
fi

# Load environment variables
export $(cat .env.prod | grep -v '^#' | xargs)

print_status "Environment loaded from .env.prod"

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p logs ssl nginx/ssl init-scripts

# Set proper permissions for volumes
print_status "Setting up directory permissions..."
sudo chown -R 1000:1000 logs || true
chmod -R 755 nginx || true

# Pull latest images and build
print_status "Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Stop existing containers if running
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Start database and redis first
print_status "Starting database and redis..."
docker-compose -f docker-compose.prod.yml up -d db redis

# Wait for database to be ready
print_status "Waiting for database to be ready..."
sleep 10

# Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

# Create superuser (if needed)
print_status "Creating superuser (if needed)..."
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
" || true

# Collect static files
print_status "Collecting static files..."
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

# Start all services
print_status "Starting all services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 15

# Health check
print_status "Performing health check..."
if curl -f http://localhost/health >/dev/null 2>&1; then
    print_status "✅ Health check passed!"
else
    print_warning "⚠️  Health check failed. Please check the logs."
fi

# Show status
print_status "Showing service status..."
docker-compose -f docker-compose.prod.yml ps

# Show logs for any failed services
print_status "Checking for any failed services..."
failed_services=$(docker-compose -f docker-compose.prod.yml ps --services --filter "status=exited")
if [ ! -z "$failed_services" ]; then
    print_warning "Some services failed to start:"
    echo "$failed_services"
    print_status "Showing logs for failed services..."
    for service in $failed_services; do
        echo "--- Logs for $service ---"
        docker-compose -f docker-compose.prod.yml logs --tail=20 $service
    done
fi

echo ""
echo "===================================="
print_status "🎉 Deployment Complete!"
echo ""
print_status "Application URLs:"
print_status "  Frontend: http://localhost:3000"
print_status "  Backend API: http://localhost:8000"
print_status "  Admin Panel: http://localhost:8000/admin"
print_status "  Health Check: http://localhost/health"
echo ""
print_status "To view logs: docker-compose -f docker-compose.prod.yml logs -f"
print_status "To stop: docker-compose -f docker-compose.prod.yml down"
echo "===================================="
