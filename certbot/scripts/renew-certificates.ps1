# PowerShell script for SSL certificate renewal
# Usage: .\renew-certificates.ps1

param(
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

Write-Host "### SSL certificate verification and renewal ###" -ForegroundColor Green

# Renew certificates
Write-Host "Attempting certificate renewal..." -ForegroundColor Yellow
docker-compose -f $DockerComposeFile run --rm certbot renew --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "Certificates verified/renewed successfully" -ForegroundColor Green
    
    # Reload nginx to use new certificates
    Write-Host "Reloading nginx..." -ForegroundColor Yellow
    docker-compose -f $DockerComposeFile exec nginx nginx -s reload
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Nginx reloaded successfully" -ForegroundColor Green
        Write-Host "### Renewal completed successfully ###" -ForegroundColor Green
    } else {
        Write-Error "Error reloading nginx"
        exit 1
    }
} else {
    Write-Warning "Error during renewal or no certificates to renew"
}

Write-Host "### Renewal process completed ###" -ForegroundColor Green

# Show certificate status
Write-Host ""
Write-Host "Certificate status:" -ForegroundColor Cyan
docker-compose -f $DockerComposeFile run --rm certbot certificates
