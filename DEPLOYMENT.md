# 🚀 Production Deployment Guide

This guide helps you deploy the **Bike Components Compatibility System** application in production.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Sudo/administrator access on the server
- At least 4GB of RAM available
- 10GB of free disk space

## 🔧 Initial Configuration

### 1. Clone the project

```bash
git clone <your-repo-url>
cd comp_bike
git checkout droplet  # Or your production branch
```

### 2. Environment configuration

```bash
# Copy the example file
cp .env.prod.example .env.prod

# Edit with your values
nano .env.prod  # or vim/code depending on your editor
```

### 3. Important variables to configure in .env.prod

```bash
# Database - CHANGE this password!
POSTGRES_PASSWORD=your_strong_password_here

# Django - Generate a strong secret key
DJANGO_SECRET_KEY=your_django_secret_key_minimum_50_characters

# Domain
DOMAIN_NAME=your-domain.com
API_URL=https://your-domain.com/api

# Email (optional)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 🚀 Deployment

### Option 1: Automatic script (Linux/Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: PowerShell script (Windows)

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\deploy.ps1
```

### Option 3: Manual

```bash
# 1. Build images
docker-compose -f docker-compose.prod.yml build

# 2. Start base services
docker-compose -f docker-compose.prod.yml up -d db redis

# 3. Wait for DB to be ready (10-15 seconds)
sleep 15

# 4. Migrations
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

# 5. Create superuser
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py createsuperuser

# 6. Collect static files
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

# 7. Start all services
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 Deployment Verification

### Access URLs

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin
- **Health Check**: http://localhost/health

### Useful commands

```bash
# View service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Logs for a specific service
docker-compose -f docker-compose.prod.yml logs -f backend

# Restart a service
docker-compose -f docker-compose.prod.yml restart backend

# Stop all services
docker-compose -f docker-compose.prod.yml down
```

## 🔒 Security

### SSL/HTTPS (Recommended for production)

1. Obtain an SSL certificate (Let's Encrypt recommended)
2. Place files in `nginx/ssl/`
3. Uncomment SSL configuration in `nginx/conf.d/default.conf`
4. Restart nginx: `docker-compose -f docker-compose.prod.yml restart nginx`

### Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 📊 Monitoring

### Application logs

```bash
# Real-time logs
docker-compose -f docker-compose.prod.yml logs -f

# Last 100 lines logs
docker-compose -f docker-compose.prod.yml logs --tail=100

# Service logs with timestamp
docker-compose -f docker-compose.prod.yml logs -f -t backend
```

### Disk space

```bash
# Clean unused Docker images
docker system prune -a

# View volume usage
docker system df
```

## 🛠️ Maintenance

### Backups

```bash
# Backup database
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres compatibility_system > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup volumes
docker run --rm -v comp_bike_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data
```

### Updates

```bash
# 1. Get latest changes
git pull origin droplet

# 2. Rebuild and redeploy
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# 3. Apply migrations if necessary
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate
```

## ❗ Troubleshooting

### Service won't start

```bash
# View detailed logs
docker-compose -f docker-compose.prod.yml logs service_name

# Check configuration
docker-compose -f docker-compose.prod.yml config

# Restart a service
docker-compose -f docker-compose.prod.yml restart service_name
```

### Permission issues

```bash
# Fix log permissions
sudo chown -R 1000:1000 logs/

# Fix volume permissions
sudo chown -R 1000:1000 /var/lib/docker/volumes/comp_bike_*
```

### Corrupted database

```bash
# Restore from backup
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d compatibility_system < backup_file.sql
```

### Disk space full

```bash
# Clean Docker
docker system prune -a -f

# Clean logs
sudo truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

## 📞 Support

In case of issues, check:

1. Logs with `docker-compose -f docker-compose.prod.yml logs -f`
2. Service status with `docker-compose -f docker-compose.prod.yml ps`
3. Configuration with `docker-compose -f docker-compose.prod.yml config`
4. Environment variables in `.env.prod`

---

## 🏗️ Production Architecture

```
Internet → Nginx (Port 80/443) →
├── Frontend (Next.js, Port 3000)
├── Backend API (Django, Port 8000)
├── Static Files (/static/, /media/)
└── Health Check (/health)

Background Services:
├── PostgreSQL Database (Port 5432)
├── Redis Cache (Port 6379)
├── Celery Worker (Background tasks)
├── Celery Beat (Scheduled tasks)
└── Scraper Service (Cron jobs)
```

This architecture ensures high availability, good performance and easy maintenance.
