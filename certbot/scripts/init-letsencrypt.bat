@echo off
REM SSL initialization script with Let's Encrypt for Windows
REM Usage: init-letsencrypt.bat <domain> <email>

if "%~2"=="" (
    echo Usage: %0 ^<domain^> ^<email^>
    echo Example: %0 example.com admin@example.com
    exit /b 1
)

set DOMAIN=%1
set EMAIL=%2
set DATA_PATH=./certbot
set DOCKER_COMPOSE_FILE=docker-compose.prod.yml

echo ### SSL initialization for %DOMAIN% with email %EMAIL% ###

REM Create required directories
echo Creating required directories...
if not exist "%DATA_PATH%\conf\live\%DOMAIN%" mkdir "%DATA_PATH%\conf\live\%DOMAIN%"
if not exist "%DATA_PATH%\www" mkdir "%DATA_PATH%\www"

REM Create temporary certificate for nginx
echo ### Creating temporary certificate for %DOMAIN% ...
docker-compose -f %DOCKER_COMPOSE_FILE% run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/%DOMAIN%/privkey.pem' -out '/etc/letsencrypt/live/%DOMAIN%/fullchain.pem' -subj '/CN=localhost'" certbot
echo.

REM Start nginx
echo ### Starting nginx ...
docker-compose -f %DOCKER_COMPOSE_FILE% up --force-recreate -d nginx
echo.

REM Remove temporary certificate
echo ### Removing temporary certificate for %DOMAIN% ...
docker-compose -f %DOCKER_COMPOSE_FILE% run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/%DOMAIN% && rm -Rf /etc/letsencrypt/archive/%DOMAIN% && rm -Rf /etc/letsencrypt/renewal/%DOMAIN%.conf" certbot
echo.

REM Request real certificate
echo ### Requesting SSL certificate for %DOMAIN% ...
docker-compose -f %DOCKER_COMPOSE_FILE% run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot --email %EMAIL% -d %DOMAIN% -d www.%DOMAIN% --rsa-key-size 4096 --agree-tos --force-renewal" certbot
echo.

REM Reload nginx
echo ### Reloading nginx ...
docker-compose -f %DOCKER_COMPOSE_FILE% exec nginx nginx -s reload

echo ### SSL successfully configured for %DOMAIN% ! ###
echo The certificate will be automatically renewed.
