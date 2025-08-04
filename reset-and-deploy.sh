#!/bin/bash

# Reset and redeploy comp.bike
# This script fixes database password issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Resetting and redeploying comp.bike...${NC}"
echo ""

# Configuration
DOMAIN="comp.bike"
EMAIL="admin@comp.bike"

echo -e "${YELLOW}🛑 Stopping all containers...${NC}"
docker-compose -f docker-compose.prod.yml down --remove-orphans

echo -e "${YELLOW}🗑️ Removing PostgreSQL volume to reset password...${NC}"
docker volume rm comp_bike_postgres_data 2>/dev/null || echo "Volume already removed"
docker volume rm comp_bike_redis_data 2>/dev/null || echo "Redis volume already removed"

echo -e "${YELLOW}🧹 Cleaning up Docker...${NC}"
docker system prune -f

echo -e "${YELLOW}🐳 Creating fresh PostgreSQL volume...${NC}"
docker-compose -f docker-compose.prod.yml up -d db

echo -e "${YELLOW}⏳ Waiting for PostgreSQL to initialize (30 seconds)...${NC}"
sleep 30

echo -e "${YELLOW}🔍 Testing database connection...${NC}"
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -c "SELECT version();" || {
    echo -e "${RED}❌ Database connection failed. Let's check logs:${NC}"
    docker-compose -f docker-compose.prod.yml logs db
    exit 1
}

echo -e "${GREEN}✅ Database connection successful!${NC}"

echo -e "${YELLOW}🚀 Starting Redis...${NC}"
docker-compose -f docker-compose.prod.yml up -d redis

echo -e "${YELLOW}⏳ Waiting for Redis...${NC}"
sleep 5

echo -e "${YELLOW}🗃️ Running database migrations...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

echo -e "${YELLOW}📦 Collecting static files...${NC}"
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

echo -e "${YELLOW}🚀 Starting all services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 20

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
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo -e "   1. Create a Django superuser:"
    echo -e "      ${GREEN}docker-compose -f docker-compose.prod.yml run --rm backend python manage.py createsuperuser${NC}"
    echo -e "   2. Visit your admin panel: ${GREEN}https://comp.bike/admin${NC}"
    echo -e "   3. Test the API: ${GREEN}https://comp.bike/api${NC}"
    
    echo ""
    echo -e "${BLUE}📊 Service status:${NC}"
    docker-compose -f docker-compose.prod.yml ps
    
else
    echo -e "${RED}❌ SSL initialization failed!${NC}"
    echo -e "${YELLOW}But the application should work on HTTP. Check:${NC}"
    echo -e "   • http://comp.bike"
    echo -e "   • ${GREEN}docker-compose -f docker-compose.prod.yml logs${NC}"
fi
