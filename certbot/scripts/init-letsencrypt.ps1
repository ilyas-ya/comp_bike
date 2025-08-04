# PowerShell script for SSL initialization with Let's Encrypt
# Usage: .\init-letsencrypt.ps1 -Domain "example.com" -Email "admin@example.com"

param(
    [Parameter(Mandatory=$true)]
    [string]$Domain,
    
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [string]$DockerComposeFile = "docker-compose.prod.yml"
)

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not in PATH"
    exit 1
}

if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Error "Docker Compose is not installed or not in PATH"
    exit 1
}

Write-Host "### SSL initialization for $Domain with email $Email ###" -ForegroundColor Green

# Create required directories
Write-Host "Creating required directories..." -ForegroundColor Yellow
$dataPath = ".\certbot"
$certPath = "$dataPath\conf\live\$Domain"
$wwwPath = "$dataPath\www"

if (-not (Test-Path $certPath)) {
    New-Item -ItemType Directory -Path $certPath -Force | Out-Null
}
if (-not (Test-Path $wwwPath)) {
    New-Item -ItemType Directory -Path $wwwPath -Force | Out-Null
}

# Create temporary certificate for nginx
Write-Host "### Creating temporary certificate for $Domain ..." -ForegroundColor Yellow
$opensslCmd = "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$Domain/privkey.pem' -out '/etc/letsencrypt/live/$Domain/fullchain.pem' -subj '/CN=localhost'"
docker-compose -f $DockerComposeFile run --rm --entrypoint "$opensslCmd" certbot

if ($LASTEXITCODE -ne 0) {
    Write-Error "Error creating temporary certificate"
    exit 1
}

# Start nginx
Write-Host "### Starting nginx ..." -ForegroundColor Yellow
docker-compose -f $DockerComposeFile up --force-recreate -d nginx

if ($LASTEXITCODE -ne 0) {
    Write-Error "Error starting nginx"
    exit 1
}

# Wait for nginx to be ready
Write-Host "Waiting for nginx to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Remove temporary certificate
Write-Host "### Removing temporary certificate for $Domain ..." -ForegroundColor Yellow
$removeCmd = "rm -Rf /etc/letsencrypt/live/$Domain && rm -Rf /etc/letsencrypt/archive/$Domain && rm -Rf /etc/letsencrypt/renewal/$Domain.conf"
docker-compose -f $DockerComposeFile run --rm --entrypoint "/bin/sh -c '$removeCmd'" certbot

# Request real certificate
Write-Host "### Requesting SSL certificate for $Domain ..." -ForegroundColor Yellow
$certbotCmd = "certbot certonly --webroot -w /var/www/certbot --email $Email -d $Domain -d www.$Domain --rsa-key-size 4096 --agree-tos --force-renewal"
docker-compose -f $DockerComposeFile run --rm --entrypoint "$certbotCmd" certbot

if ($LASTEXITCODE -ne 0) {
    Write-Error "Error requesting SSL certificate"
    exit 1
}

# Reload nginx
Write-Host "### Reloading nginx ..." -ForegroundColor Yellow
docker-compose -f $DockerComposeFile exec nginx nginx -s reload

if ($LASTEXITCODE -eq 0) {
    Write-Host "### SSL successfully configured for $Domain ! ###" -ForegroundColor Green
    Write-Host "The certificate will be automatically renewed." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Test your site: https://$Domain" -ForegroundColor White
    Write-Host "2. Check redirection: http://$Domain (should redirect to HTTPS)" -ForegroundColor White
    Write-Host "3. Test your SSL: https://www.ssllabs.com/ssltest/analyze.html?d=$Domain" -ForegroundColor White
} else {
    Write-Error "Error reloading nginx"
    exit 1
}
