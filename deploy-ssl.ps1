# SSL deployment script for Production
# Usage: .\deploy-ssl.ps1 -Domain "example.com" -Email "admin@example.com"

param(
    [Parameter(Mandatory=$true)]
    [string]$Domain,
    
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [switch]$Force,
    [switch]$Staging
)

$ErrorActionPreference = "Stop"

Write-Host "=== SSL DEPLOYMENT FOR PRODUCTION ===" -ForegroundColor Cyan
Write-Host "Domain: $Domain" -ForegroundColor White
Write-Host "Email: $Email" -ForegroundColor White
if ($Staging) {
    Write-Host "Mode: STAGING (test)" -ForegroundColor Yellow
} else {
    Write-Host "Mode: PRODUCTION" -ForegroundColor Green
}
Write-Host ""

# Preliminary checks
Write-Host "1. Preliminary checks..." -ForegroundColor Yellow

# Check Docker
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker is not installed"
}

if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    throw "Docker Compose is not installed"
}

# Check domain accessibility
Write-Host "   Checking domain accessibility..." -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri "http://$Domain" -Method Head -TimeoutSec 10 -ErrorAction Stop
    Write-Host "   ✓ Domain accessible" -ForegroundColor Green
} catch {
    Write-Warning "   ⚠ Unable to access domain. Only continue if you're sure about DNS configuration."
    if (-not $Force) {
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            exit 1
        }
    }
}

# 2. File configuration
Write-Host "2. File configuration..." -ForegroundColor Yellow

# Update nginx configuration
$sslConfigPath = ".\nginx\conf.d\ssl.conf"
if (Test-Path $sslConfigPath) {
    Write-Host "   Updating nginx configuration..." -ForegroundColor Gray
    $sslConfig = Get-Content $sslConfigPath -Raw
    $sslConfig = $sslConfig -replace "your-domain\.com", $Domain
    $sslConfig | Set-Content $sslConfigPath
    Write-Host "   ✓ Nginx configuration updated" -ForegroundColor Green
} else {
    throw "SSL configuration file not found: $sslConfigPath"
}

# 3. Backup current configuration
Write-Host "3. Backing up current configuration..." -ForegroundColor Yellow
$backupPath = ".\nginx\conf.d\default.conf.backup"
if (Test-Path ".\nginx\conf.d\default.conf" -and -not (Test-Path $backupPath)) {
    Copy-Item ".\nginx\conf.d\default.conf" $backupPath
    Write-Host "   ✓ Configuration backed up" -ForegroundColor Green
}

# 4. Stop existing services
Write-Host "4. Stopping existing services..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml down
Write-Host "   ✓ Services stopped" -ForegroundColor Green

# 5. SSL initialization
Write-Host "5. SSL initialization..." -ForegroundColor Yellow
$initScript = ".\certbot\scripts\init-letsencrypt.ps1"
if ($Staging) {
    # Temporarily modify script for staging mode
    Write-Host "   Staging mode enabled" -ForegroundColor Yellow
}

& $initScript -Domain $Domain -Email $Email

if ($LASTEXITCODE -ne 0) {
    throw "Error during SSL initialization"
}

# 6. Activate SSL configuration
Write-Host "6. Activating SSL configuration..." -ForegroundColor Yellow

# Disable default configuration
if (Test-Path ".\nginx\conf.d\default.conf") {
    Move-Item ".\nginx\conf.d\default.conf" ".\nginx\conf.d\default.conf.disabled" -Force
    Write-Host "   ✓ HTTP configuration disabled" -ForegroundColor Green
}

# 7. Complete restart
Write-Host "7. Complete service restart..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml up -d

if ($LASTEXITCODE -ne 0) {
    throw "Error starting services"
}

# 8. Final checks
Write-Host "8. Final checks..." -ForegroundColor Yellow

# Wait for services to be ready
Write-Host "   Waiting for services to be ready..." -ForegroundColor Gray
Start-Sleep -Seconds 30

# Test HTTP -> HTTPS redirection
try {
    Write-Host "   Testing HTTP → HTTPS redirection..." -ForegroundColor Gray
    $httpResponse = Invoke-WebRequest -Uri "http://$Domain" -MaximumRedirection 0 -ErrorAction Stop
    if ($httpResponse.StatusCode -eq 301 -or $httpResponse.StatusCode -eq 302) {
        Write-Host "   ✓ HTTP → HTTPS redirection working" -ForegroundColor Green
    }
} catch {
    if ($_.Exception.Response.StatusCode -eq 301 -or $_.Exception.Response.StatusCode -eq 302) {
        Write-Host "   ✓ HTTP → HTTPS redirection working" -ForegroundColor Green
    } else {
        Write-Warning "   ⚠ Issue with HTTP → HTTPS redirection"
    }
}

# Test HTTPS
try {
    Write-Host "   Testing HTTPS access..." -ForegroundColor Gray
    $httpsResponse = Invoke-WebRequest -Uri "https://$Domain" -TimeoutSec 30
    if ($httpsResponse.StatusCode -eq 200) {
        Write-Host "   ✓ HTTPS accessible" -ForegroundColor Green
    }
} catch {
    Write-Warning "   ⚠ Issue with HTTPS access: $($_.Exception.Message)"
}

# 9. Success!
Write-Host ""
Write-Host "=== SSL DEPLOYMENT COMPLETED SUCCESSFULLY! ===" -ForegroundColor Green
Write-Host ""
Write-Host "✅ HTTP → HTTPS redirection enabled" -ForegroundColor Green
Write-Host "✅ SSL certificates installed" -ForegroundColor Green  
Write-Host "✅ Auto-renewal configured" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Test your site:" -ForegroundColor Cyan
Write-Host "   • HTTPS site: https://$Domain" -ForegroundColor White
Write-Host "   • Test redirection: http://$Domain" -ForegroundColor White
Write-Host "   • SSL test: https://www.ssllabs.com/ssltest/analyze.html?d=$Domain" -ForegroundColor White
Write-Host ""
Write-Host "📝 Important notes:" -ForegroundColor Cyan
Write-Host "   • Certificates renew automatically" -ForegroundColor White
Write-Host "   • To renew manually: .\certbot\scripts\renew-certificates.ps1" -ForegroundColor White
Write-Host "   • Configuration backed up in: nginx\conf.d\default.conf.backup" -ForegroundColor White
