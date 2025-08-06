# Script d'initialisation SSL pour comp.bike
# Ce script configure automatiquement Let's Encrypt

param(
    [string]$Email = "votre-email@example.com"  # CHANGEZ CECI PAR VOTRE EMAIL
)

Write-Host "=== Initialisation SSL pour comp.bike ===" -ForegroundColor Green

# Vérification des prérequis
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker n'est pas installé ou pas dans le PATH"
    exit 1
}

if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Error "Docker Compose n'est pas installé ou pas dans le PATH"
    exit 1
}

# Configuration
$Domain = "comp.bike"
$DataPath = ".\certbot"

Write-Host "Domaine: $Domain" -ForegroundColor Yellow
Write-Host "Email: $Email" -ForegroundColor Yellow

# Créer les dossiers nécessaires
Write-Host "1. Création des dossiers nécessaires..." -ForegroundColor Cyan
$folders = @(
    "$DataPath\conf\live\$Domain",
    "$DataPath\www",
    "$DataPath\conf\archive\$Domain",
    "$DataPath\conf\renewal"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  ✓ Créé: $folder" -ForegroundColor Green
    }
}

# Télécharger les paramètres SSL recommandés
Write-Host "2. Téléchargement des paramètres SSL..." -ForegroundColor Cyan
$sslOptions = "$DataPath\conf\options-ssl-nginx.conf"
$sslDhParams = "$DataPath\conf\ssl-dhparams.pem"

if (-not (Test-Path $sslOptions)) {
    try {
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf" -OutFile $sslOptions
        Write-Host "  ✓ options-ssl-nginx.conf téléchargé" -ForegroundColor Green
    } catch {
        Write-Warning "Impossible de télécharger options-ssl-nginx.conf"
    }
}

if (-not (Test-Path $sslDhParams)) {
    try {
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem" -OutFile $sslDhParams
        Write-Host "  ✓ ssl-dhparams.pem téléchargé" -ForegroundColor Green
    } catch {
        Write-Warning "Impossible de télécharger ssl-dhparams.pem"
    }
}

# Arrêter les conteneurs existants
Write-Host "3. Arrêt des conteneurs existants..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml down 2>$null

# Créer un certificat temporaire
Write-Host "4. Création d'un certificat temporaire..." -ForegroundColor Cyan
$tempCertCmd = "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$Domain/privkey.pem' -out '/etc/letsencrypt/live/$Domain/fullchain.pem' -subj '/CN=localhost'"

docker-compose -f docker-compose.prod.yml run --rm --entrypoint "sh -c `"$tempCertCmd`"" certbot
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erreur lors de la création du certificat temporaire"
    exit 1
}
Write-Host "  ✓ Certificat temporaire créé" -ForegroundColor Green

# Démarrer Nginx
Write-Host "5. Démarrage de Nginx..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml up -d nginx
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erreur lors du démarrage de Nginx"
    exit 1
}
Write-Host "  ✓ Nginx démarré" -ForegroundColor Green

# Attendre que Nginx soit prêt
Write-Host "6. Attente que Nginx soit prêt..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Supprimer le certificat temporaire
Write-Host "7. Suppression du certificat temporaire..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "sh -c `"rm -Rf /etc/letsencrypt/live/$Domain && rm -Rf /etc/letsencrypt/archive/$Domain && rm -Rf /etc/letsencrypt/renewal/$Domain.conf`"" certbot
Write-Host "  ✓ Certificat temporaire supprimé" -ForegroundColor Green

# Obtenir le vrai certificat
Write-Host "8. Demande du certificat Let's Encrypt..." -ForegroundColor Cyan
$certbotCmd = "certbot certonly --webroot -w /var/www/certbot --email $Email --agree-tos --no-eff-email -d $Domain -d www.$Domain"

docker-compose -f docker-compose.prod.yml run --rm --entrypoint "sh -c `"$certbotCmd`"" certbot
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erreur lors de l'obtention du certificat Let's Encrypt"
    exit 1
}
Write-Host "  ✓ Certificat Let's Encrypt obtenu" -ForegroundColor Green

Write-Host "=== Configuration SSL terminée avec succès ! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Activez la configuration SSL: Move-Item 'nginx\conf.d\ssl.conf.disabled' 'nginx\conf.d\ssl.conf'"
Write-Host "2. Redémarrez les services: docker-compose -f docker-compose.prod.yml restart nginx"
Write-Host "3. Testez votre site: https://comp.bike"
