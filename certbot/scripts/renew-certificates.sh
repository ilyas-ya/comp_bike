#!/bin/bash

# Automatic SSL certificate renewal script
# This script can be used for manual renewal or via cron

DOCKER_COMPOSE_FILE="docker-compose.prod.yml"

echo "### SSL certificate verification and renewal ###"

# Renew certificates
echo "Attempting certificate renewal..."
docker-compose -f $DOCKER_COMPOSE_FILE run --rm certbot certonly --webroot -w /var/www/certbot --force-renewal --quiet

# Check if renewal occurred
if [ $? -eq 0 ]; then
    echo "Certificates renewed successfully"
    
    # Reload nginx to use new certificates
    echo "Reloading nginx..."
    docker-compose -f $DOCKER_COMPOSE_FILE exec nginx nginx -s reload
    
    if [ $? -eq 0 ]; then
        echo "Nginx reloaded successfully"
        echo "### Renewal completed successfully ###"
    else
        echo "Error reloading nginx"
        exit 1
    fi
else
    echo "No certificates to renew or error during renewal"
fi

echo "### Renewal process completed ###"
