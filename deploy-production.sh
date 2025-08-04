#!/bin/bash

# Complete deployment script for production with SSL
# Usage: ./deploy-production.sh

set -e

echo "🚀 Starting production deployment with SSL..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo -e "${RED}❌ Error: .env.prod file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.prod.example to .env.prod and configure it${NC}"
    exit 1
fi

# Load environment variables
source .env.prod

# Check required variables
if [ -z "$DOMAIN_NAME" ] || [ "$DOMAIN_NAME" = "your-domain.com" ]; then
    echo -e "${RED}❌ Error: DOMAIN_NAME not configured in .env.prod${NC}"
    echo -e "${YELLOW}Please set your actual domain name in .env.prod${NC}"
    exit 1
fi

if [ -z "$SSL_EMAIL" ] || [ "$SSL_EMAIL" = "admin@your-domain.com" ]; then
    echo -e "${RED}❌ Error: SSL_EMAIL not configured in .env.prod${NC}"
    echo -e "${YELLOW}Please set your email for SSL certificates in .env.prod${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "   Domain: ${GREEN}$DOMAIN_NAME${NC}"
echo -e "   SSL Email: ${GREEN}$SSL_EMAIL${NC}"
echo ""

# Update nginx configuration with actual domain
echo -e "${YELLOW}🔧 Updating nginx configuration...${NC}"
sed -i "s/your-domain\.com/$DOMAIN_NAME/g" nginx/conf.d/ssl.conf
echo -e "${GREEN}✅ Nginx configuration updated${NC}"

# Stop any running containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Build and start services (without SSL first)
echo -e "${YELLOW}🐳 Building and starting services...${NC}"
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d db redis

# Wait for database
echo -e "${YELLOW}⏳ Waiting for database to be ready...${NC}"
sleep 10

# Run database migrations
echo -e "${YELLOW}🗃️ Running database migrations...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

# Collect static files
echo -e "${YELLOW}📦 Collecting static files...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

# Start remaining services
echo -e "${YELLOW}🚀 Starting all services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 15

# Initialize SSL
echo -e "${YELLOW}🔒 Initializing SSL certificates...${NC}"
chmod +x certbot/scripts/init-letsencrypt.sh
./certbot/scripts/init-letsencrypt.sh "$DOMAIN_NAME" "$SSL_EMAIL"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificates configured successfully!${NC}"
    
    # Disable default HTTP configuration
    if [ -f "nginx/conf.d/default.conf" ]; then
        echo -e "${YELLOW}🔧 Switching to SSL configuration...${NC}"
        mv nginx/conf.d/default.conf nginx/conf.d/default.conf.disabled
        docker-compose -f docker-compose.prod.yml restart nginx
        echo -e "${GREEN}✅ SSL configuration activated${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}🔗 Your site is now available at:${NC}"
    echo -e "   • ${GREEN}https://$DOMAIN_NAME${NC}"
    echo -e "   • ${GREEN}https://www.$DOMAIN_NAME${NC}"
    echo ""
    echo -e "${BLUE}🛠️ Admin panel:${NC}"
    echo -e "   • ${GREEN}https://$DOMAIN_NAME/admin${NC}"
    echo ""
    echo -e "${BLUE}📊 Test your SSL:${NC}"
    echo -e "   • ${GREEN}https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN_NAME${NC}"
    echo ""
    echo -e "${YELLOW}📝 Important notes:${NC}"
    echo -e "   • Certificates renew automatically every 12 hours"
    echo -e "   • HTTP traffic is automatically redirected to HTTPS"
    echo -e "   • Logs: docker-compose -f docker-compose.prod.yml logs"
    
else
    echo -e "${RED}❌ SSL initialization failed!${NC}"
    echo -e "${YELLOW}Check the logs and try again:${NC}"
    echo -e "   docker-compose -f docker-compose.prod.yml logs nginx certbot"
    exit 1
fi
