#!/bin/bash
# Script to generate real Let's Encrypt SSL certificates
# To be used on a server with a real DNS-configured domain name

echo "=== Generating Let's Encrypt SSL certificates ==="

# 1. Temporarily stop nginx
echo "1. Stopping nginx..."
docker-compose -f docker-compose.prod.yml stop nginx

# 2. Remove self-signed certificates
echo "2. Removing temporary certificates..."
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "/bin/sh -c" certbot "rm -rf /etc/letsencrypt/live/comp.bike"

# 3. Start nginx in HTTP-only mode for validation
echo "3. Temporarily restarting nginx for Let's Encrypt validation..."
mv nginx/conf.d/ssl.conf nginx/conf.d/ssl.conf.temp
mv nginx/conf.d/default.conf.disabled nginx/conf.d/default.conf
docker-compose -f docker-compose.prod.yml start nginx

# Wait for nginx to be ready
sleep 5

# 4. Generate real certificates
echo "4. Generating Let's Encrypt certificates..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  --email contact@comp.bike \
  -d comp.bike \
  -d www.comp.bike \
  --rsa-key-size 4096 \
  --agree-tos \
  --non-interactive

# 5. Restore SSL configuration and restart
echo "5. Restoring SSL configuration..."
docker-compose -f docker-compose.prod.yml stop nginx
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.disabled
mv nginx/conf.d/ssl.conf.temp nginx/conf.d/ssl.conf
docker-compose -f docker-compose.prod.yml start nginx

echo "=== SSL certificates generated and nginx restarted with HTTPS! ==="
echo "Test your site at: https://comp.bike"
