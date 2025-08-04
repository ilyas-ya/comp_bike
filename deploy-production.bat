@echo off
REM Complete deployment script for production with SSL (Windows)
REM Usage: deploy-production.bat

setlocal enabledelayedexpansion

echo 🚀 Starting production deployment with SSL...

REM Check if .env.prod exists
if not exist ".env.prod" (
    echo ❌ Error: .env.prod file not found!
    echo Please copy .env.prod.example to .env.prod and configure it
    exit /b 1
)

REM Load DOMAIN_NAME from .env.prod (simple parsing)
for /f "tokens=2 delims==" %%a in ('findstr "^DOMAIN_NAME=" .env.prod') do set DOMAIN_NAME=%%a
for /f "tokens=2 delims==" %%a in ('findstr "^SSL_EMAIL=" .env.prod') do set SSL_EMAIL=%%a

REM Check required variables
if "%DOMAIN_NAME%"=="your-domain.com" (
    echo ❌ Error: DOMAIN_NAME not configured in .env.prod
    echo Please set your actual domain name in .env.prod
    exit /b 1
)

if "%SSL_EMAIL%"=="admin@your-domain.com" (
    echo ❌ Error: SSL_EMAIL not configured in .env.prod
    echo Please set your email for SSL certificates in .env.prod
    exit /b 1
)

echo 📋 Configuration:
echo    Domain: %DOMAIN_NAME%
echo    SSL Email: %SSL_EMAIL%
echo.

REM Update nginx configuration with actual domain
echo 🔧 Updating nginx configuration...
powershell -Command "(Get-Content nginx\conf.d\ssl.conf) -replace 'your-domain\.com', '%DOMAIN_NAME%' | Set-Content nginx\conf.d\ssl.conf"
echo ✅ Nginx configuration updated

REM Stop any running containers
echo 🛑 Stopping existing containers...
docker-compose -f docker-compose.prod.yml down --remove-orphans

REM Build and start services
echo 🐳 Building and starting services...
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d db redis

REM Wait for database
echo ⏳ Waiting for database to be ready...
timeout /t 10 >nul

REM Run database migrations
echo 🗃️ Running database migrations...
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

REM Collect static files
echo 📦 Collecting static files...
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

REM Start remaining services
echo 🚀 Starting all services...
docker-compose -f docker-compose.prod.yml up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 15 >nul

REM Initialize SSL
echo 🔒 Initializing SSL certificates...
certbot\scripts\init-letsencrypt.bat %DOMAIN_NAME% %SSL_EMAIL%

if %errorlevel% equ 0 (
    echo ✅ SSL certificates configured successfully!
    
    REM Disable default HTTP configuration
    if exist "nginx\conf.d\default.conf" (
        echo 🔧 Switching to SSL configuration...
        move "nginx\conf.d\default.conf" "nginx\conf.d\default.conf.disabled" >nul
        docker-compose -f docker-compose.prod.yml restart nginx
        echo ✅ SSL configuration activated
    )
    
    echo.
    echo 🎉 Deployment completed successfully!
    echo.
    echo 🔗 Your site is now available at:
    echo    • https://%DOMAIN_NAME%
    echo    • https://www.%DOMAIN_NAME%
    echo.
    echo 🛠️ Admin panel:
    echo    • https://%DOMAIN_NAME%/admin
    echo.
    echo 📊 Test your SSL:
    echo    • https://www.ssllabs.com/ssltest/analyze.html?d=%DOMAIN_NAME%
    echo.
    echo 📝 Important notes:
    echo    • Certificates renew automatically every 12 hours
    echo    • HTTP traffic is automatically redirected to HTTPS
    echo    • Logs: docker-compose -f docker-compose.prod.yml logs
    
) else (
    echo ❌ SSL initialization failed!
    echo Check the logs and try again:
    echo    docker-compose -f docker-compose.prod.yml logs nginx certbot
    exit /b 1
)
