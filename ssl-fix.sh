#!/bin/bash
# Script SSL corrigé pour comp.bike
echo "=== Configuration SSL pour comp.bike ==="

# 1. Vérifier que nginx est en mode HTTP
echo "1. Configuration en mode HTTP..."
if [ -f "nginx/conf.d/ssl.conf" ]; then
    mv nginx/conf.d/ssl.conf nginx/conf.d/ssl.conf.disabled
fi
if [ -f "nginx/conf.d/default.conf.disabled" ]; then
    mv nginx/conf.d/default.conf.disabled nginx/conf.d/default.conf
fi

# 2. Redémarrer avec la nouvelle configuration
echo "2. Redémarrage avec volumes locaux..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

# 3. Attendre que nginx soit prêt
echo "3. Attente que nginx soit prêt..."
sleep 10

# 4. Tester l'accès HTTP
echo "4. Test HTTP..."
curl -I http://comp.bike || echo "HTTP pas encore accessible"

# 5. Générer les certificats
echo "5. Génération des certificats SSL..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  --email contact@comp.bike \
  -d comp.bike \
  -d www.comp.bike \
  --rsa-key-size 4096 \
  --agree-tos \
  --force-renewal \
  --verbose \
  --non-interactive

# 6. Vérifier les certificats
echo "6. Vérification des certificats..."
ls -la certbot/conf/live/comp.bike/

# 7. Activer SSL
echo "7. Activation de SSL..."
if [ -f "nginx/conf.d/default.conf" ]; then
    mv nginx/conf.d/default.conf nginx/conf.d/default.conf.disabled
fi
if [ -f "nginx/conf.d/ssl.conf.disabled" ]; then
    mv nginx/conf.d/ssl.conf.disabled nginx/conf.d/ssl.conf
fi

# 8. Redémarrer nginx avec SSL
echo "8. Redémarrage avec SSL..."
docker-compose -f docker-compose.prod.yml restart nginx

echo "=== SSL configuré ! Test : https://comp.bike ==="
