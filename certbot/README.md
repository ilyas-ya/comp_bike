# SSL Configuration with Let's Encrypt and Certbot

This project includes automated configuration for SSL/HTTPS with Let's Encrypt and automatic certificate renewal.

## 🚀 Features

- ✅ **Automatic HTTP → HTTPS redirection**
- ✅ **Free SSL certificates with Let's Encrypt**
- ✅ **Automatic certificate auto-renewal**
- ✅ **Modern and secure SSL configuration**
- ✅ **Optimized security headers**
- ✅ **HSTS and OCSP Stapling support**

## 📋 Prerequisites

1. **Domain name** pointing to your server
2. **Ports 80 and 443** open on your server
3. **Docker and Docker Compose** installed

## 🔧 Installation and Configuration

### 1. Domain configuration

Edit the `nginx/conf.d/ssl.conf` file and replace `your-domain.com` with your actual domain:

```nginx
server_name your-domain.com www.your-domain.com;
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

### 2. SSL Initialization

#### On Linux/Mac:

```bash
chmod +x certbot/scripts/init-letsencrypt.sh
./certbot/scripts/init-letsencrypt.sh your-domain.com admin@your-domain.com
```

#### On Windows:

```cmd
certbot\scripts\init-letsencrypt.bat your-domain.com admin@your-domain.com
```

### 3. Production startup

Once SSL is configured, use the SSL configuration:

```bash
# Stop current services
docker-compose -f docker-compose.prod.yml down

# Rename default configuration
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.backup

# SSL configuration is now active
docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 Auto-renewal

The Certbot container is configured to automatically renew certificates every 12 hours.

### Manual renewal

#### On Linux/Mac:

```bash
chmod +x certbot/scripts/renew-certificates.sh
./certbot/scripts/renew-certificates.sh
```

#### On Windows:

```cmd
certbot\scripts\renew-certificates.bat
```

### Cron Configuration (Linux)

To add a cron job for renewal:

```bash
# Open crontab
crontab -e

# Add this line to renew daily at 2 AM
0 2 * * * /path/to/your/project/certbot/scripts/renew-certificates.sh >> /var/log/certbot-renew.log 2>&1
```

## 🛡️ Security

The configuration includes:

- **TLS 1.2 and 1.3** only
- **Modern and secure** ciphers
- **HSTS** (HTTP Strict Transport Security)
- **Complete security headers**
- **OCSP Stapling** for performance
- **Protection against** common attacks

## 🔍 Verification

### Test HTTP → HTTPS redirection

```bash
curl -I http://your-domain.com
# Should return 301 and Location: https://...
```

### Test SSL certificate

```bash
curl -I https://your-domain.com
# Should return 200 with valid certificate
```

### Verify SSL configuration

Use [SSL Labs Test](https://www.ssllabs.com/ssltest/) to get an A+ security rating.

## 📁 File Structure

```
certbot/
├── scripts/
│   ├── init-letsencrypt.sh      # Initialization script (Linux/Mac)
│   ├── init-letsencrypt.bat     # Initialization script (Windows)
│   ├── renew-certificates.sh    # Renewal script (Linux/Mac)
│   └── renew-certificates.bat   # Renewal script (Windows)
└── README.md                    # This file

nginx/conf.d/
├── default.conf                 # HTTP configuration (development)
└── ssl.conf                     # HTTPS configuration (production)
```

## 🚨 Troubleshooting

### Problem: "rate limit exceeded"

Let's Encrypt has rate limits. Wait 1 week or use staging mode:

```bash
# Add --staging to certbot command in init-letsencrypt.sh
certbot certonly --webroot --staging ...
```

### Problem: "Challenge failed"

Verify that:

1. Your domain points to your server
2. Port 80 is open and accessible
3. Nginx is working correctly

### Problem: "Certificate not found"

Re-run SSL initialization:

```bash
./certbot/scripts/init-letsencrypt.sh your-domain.com admin@your-domain.com
```

## 📞 Support

If you encounter problems:

1. Check logs: `docker-compose -f docker-compose.prod.yml logs nginx certbot`
2. Test nginx configuration: `docker-compose -f docker-compose.prod.yml exec nginx nginx -t`
3. Verify your domain is accessible from outside

## 🔗 Useful Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [SSL Labs Testing Tool](https://www.ssllabs.com/ssltest/)
