@echo off
REM Automatic SSL certificate renewal script for Windows

set DOCKER_COMPOSE_FILE=docker-compose.prod.yml

echo ### SSL certificate verification and renewal ###

REM Renew certificates
echo Attempting certificate renewal...
docker-compose -f %DOCKER_COMPOSE_FILE% run --rm certbot certonly --webroot -w /var/www/certbot --force-renewal --quiet

if %errorlevel% equ 0 (
    echo Certificates renewed successfully
    
    REM Reload nginx to use new certificates
    echo Reloading nginx...
    docker-compose -f %DOCKER_COMPOSE_FILE% exec nginx nginx -s reload
    
    if %errorlevel% equ 0 (
        echo Nginx reloaded successfully
        echo ### Renewal completed successfully ###
    ) else (
        echo Error reloading nginx
        exit /b 1
    )
) else (
    echo No certificates to renew or error during renewal
)

echo ### Renewal process completed ###
