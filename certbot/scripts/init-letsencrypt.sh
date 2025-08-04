#!/bin/bash

# SSL initialization script with Let's Encrypt
# Usage: ./init-letsencrypt.sh <domain> <email>

if ! [ -x "$(command -v docker-compose)" ]; then
    echo 'Error: docker-compose is not installed.' >&2
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <domain> <email>"
    echo "Example: $0 example.com admin@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2
DATA_PATH="./certbot"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"

echo "### SSL initialization for $DOMAIN with email $EMAIL ###"

# Create required directories
echo "Creating required directories..."
mkdir -p "$DATA_PATH/conf/live/$DOMAIN"
mkdir -p "$DATA_PATH/www"

# Create temporary certificate for nginx
echo "### Creating temporary certificate for $DOMAIN ..."
docker-compose -f $DOCKER_COMPOSE_FILE run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:4096 -days 1\
    -keyout '/etc/letsencrypt/live/$DOMAIN/privkey.pem' \
    -out '/etc/letsencrypt/live/$DOMAIN/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

# Start nginx
echo "### Starting nginx ..."
docker-compose -f $DOCKER_COMPOSE_FILE up --force-recreate -d nginx
echo

# Remove temporary certificate
echo "### Removing temporary certificate for $DOMAIN ..."
docker-compose -f $DOCKER_COMPOSE_FILE run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$DOMAIN && \
    rm -Rf /etc/letsencrypt/archive/$DOMAIN && \
    rm -Rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot
echo

# Request real certificate
echo "### Requesting SSL certificate for $DOMAIN ..."
docker-compose -f $DOCKER_COMPOSE_FILE run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal" certbot
echo

# Reload nginx
echo "### Reloading nginx ..."
docker-compose -f $DOCKER_COMPOSE_FILE exec nginx nginx -s reload

echo "### SSL successfully configured for $DOMAIN ! ###"
echo "The certificate will be automatically renewed."
