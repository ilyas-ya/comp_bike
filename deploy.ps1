# Bike Components Compatibility System - Production Deployment Script (PowerShell)
# This script deploys the application to production environment on Windows

param(
    [switch]$SkipBuild,
    [switch]$SkipMigrations
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Production Deployment..." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Function to print colored output
function Write-Status {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if docker and docker-compose are installed
try {
    docker --version | Out-Null
    docker-compose --version | Out-Null
    Write-Status "Docker and Docker Compose are installed"
} catch {
    Write-Error "Docker or Docker Compose is not installed or not in PATH"
    exit 1
}

# Check if .env.prod exists
if (-not (Test-Path ".env.prod")) {
    Write-Warning ".env.prod file not found."
    if (Test-Path ".env.prod.example") {
        Copy-Item ".env.prod.example" ".env.prod"
        Write-Warning "Created .env.prod from example. Please edit it with your production values."
        Read-Host "Press Enter to continue after editing .env.prod"
    } else {
        Write-Error ".env.prod.example file not found. Please create .env.prod manually."
        exit 1
    }
}

Write-Status "Environment file found: .env.prod"

# Create necessary directories
Write-Status "Creating necessary directories..."
$directories = @("logs", "ssl", "nginx\ssl", "init-scripts")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Status "Created directory: $dir"
    }
}

# Build Docker images (unless skipped)
if (-not $SkipBuild) {
    Write-Status "Building Docker images..."
    docker-compose -f docker-compose.prod.yml build --no-cache
}

# Stop existing containers if running
Write-Status "Stopping existing containers..."
try {
    docker-compose -f docker-compose.prod.yml down
} catch {
    Write-Warning "No existing containers to stop"
}

# Start database and redis first
Write-Status "Starting database and redis..."
docker-compose -f docker-compose.prod.yml up -d db redis

# Wait for database to be ready
Write-Status "Waiting for database to be ready..."
Start-Sleep -Seconds 15

# Run database migrations (unless skipped)
if (-not $SkipMigrations) {
    Write-Status "Running database migrations..."
    docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

    # Create superuser (if needed)
    Write-Status "Creating superuser (if needed)..."
    $superuserScript = @"
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"@
    
    try {
        docker-compose -f docker-compose.prod.yml run --rm backend python manage.py shell -c $superuserScript
    } catch {
        Write-Warning "Could not create superuser, it may already exist"
    }

    # Collect static files
    Write-Status "Collecting static files..."
    docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput
}

# Start all services
Write-Status "Starting all services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
Write-Status "Waiting for services to start..."
Start-Sleep -Seconds 20

# Health check
Write-Status "Performing health check..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Status "✅ Health check passed!"
    } else {
        Write-Warning "⚠️  Health check returned status code: $($response.StatusCode)"
    }
} catch {
    Write-Warning "⚠️  Health check failed. Please check the logs."
}

# Show status
Write-Status "Showing service status..."
docker-compose -f docker-compose.prod.yml ps

# Check for failed services
Write-Status "Checking for any failed services..."
$services = docker-compose -f docker-compose.prod.yml ps --services --filter "status=exited"
if ($services) {
    Write-Warning "Some services failed to start:"
    $services | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    Write-Status "Showing logs for failed services..."
    $services | ForEach-Object {
        Write-Host "--- Logs for $_ ---" -ForegroundColor Cyan
        docker-compose -f docker-compose.prod.yml logs --tail=20 $_
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Status "🎉 Deployment Complete!"
Write-Host ""
Write-Status "Application URLs:"
Write-Status "  Frontend: http://localhost:3000"
Write-Status "  Backend API: http://localhost:8000"
Write-Status "  Admin Panel: http://localhost:8000/admin"
Write-Status "  Health Check: http://localhost/health"
Write-Host ""
Write-Status "Useful commands:"
Write-Status "  View logs: docker-compose -f docker-compose.prod.yml logs -f"
Write-Status "  Stop all: docker-compose -f docker-compose.prod.yml down"
Write-Status "  Restart: docker-compose -f docker-compose.prod.yml restart"
Write-Host "====================================" -ForegroundColor Green
