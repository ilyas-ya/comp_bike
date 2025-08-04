#!/bin/bash

# Quick deployment script for comp.bike
# This script deploys everything with your domain pre-configured

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying comp.bike with SSL...${NC}"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose not found. Please install Docker Compose first.${NC}"
    exit 1
fi

# Configuration
DOMAIN="comp.bike"
EMAIL="admin@comp.bike"

echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "   Domain: ${GREEN}$DOMAIN${NC}"
echo -e "   SSL Email: ${GREEN}$EMAIL${NC}"
echo ""

# Stop any running containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Build and start database first
echo -e "${YELLOW}🐳 Starting database and Redis...${NC}"
docker-compose -f docker-compose.prod.yml up -d db redis

# Wait for database
echo -e "${YELLOW}⏳ Waiting for database to be ready...${NC}"
sleep 15

# Run database migrations
echo -e "${YELLOW}🗃️ Running database migrations...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

# Collect static files
echo -e "${YELLOW}📦 Collecting static files...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

# Start all services
echo -e "${YELLOW}🚀 Starting all services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 20

# Initialize SSL
echo -e "${YELLOW}🔒 Initializing SSL certificates for $DOMAIN...${NC}"
chmod +x certbot/scripts/init-letsencrypt.sh
./certbot/scripts/init-letsencrypt.sh "$DOMAIN" "$EMAIL"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificates configured successfully!${NC}"
    
    # Switch to SSL configuration
    if [ -f "nginx/conf.d/default.conf" ]; then
        echo -e "${YELLOW}🔧 Switching to SSL configuration...${NC}"
        mv nginx/conf.d/default.conf nginx/conf.d/default.conf.disabled
        docker-compose -f docker-compose.prod.yml restart nginx
        echo -e "${GREEN}✅ SSL configuration activated${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}🎉 comp.bike deployed successfully!${NC}"
    echo ""
    echo -e "${BLUE}🔗 Your site is now available at:${NC}"
    echo -e "   • ${GREEN}https://comp.bike${NC}"
    echo -e "   • ${GREEN}https://www.comp.bike${NC}"
    echo ""
    echo -e "${BLUE}🛠️ Admin panel:${NC}"
    echo -e "   • ${GREEN}https://comp.bike/admin${NC}"
    echo ""
    echo -e "${BLUE}📊 Test your SSL:${NC}"
    echo -e "   • ${GREEN}https://www.ssllabs.com/ssltest/analyze.html?d=comp.bike${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo -e "   1. Create a Django superuser:"
    echo -e "      ${GREEN}docker-compose -f docker-compose.prod.yml run --rm backend python manage.py createsuperuser${NC}"
    echo -e "   2. Visit your admin panel: ${GREEN}https://comp.bike/admin${NC}"
    echo -e "   3. Test the API: ${GREEN}https://comp.bike/api${NC}"
    
else
    echo -e "${RED}❌ SSL initialization failed!${NC}"
    echo -e "${YELLOW}Check the logs:${NC}"
    echo -e "   docker-compose -f docker-compose.prod.yml logs nginx certbot"
    exit 1
fi
