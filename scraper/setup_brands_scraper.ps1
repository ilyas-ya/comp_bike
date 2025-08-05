# Setup script for the official brands scraper (PowerShell)

Write-Host "=== Official Brands Scraper Configuration ===" -ForegroundColor Green

# Check if Docker is running
Write-Host "Checking Docker services..." -ForegroundColor Yellow
docker-compose ps

# Test database connection via Docker
Write-Host "Testing database connection..." -ForegroundColor Yellow
$testScript = @"
from database.connection import DatabaseConnection
try:
    db = DatabaseConnection()
    result = db.execute_query('SELECT COUNT(*) as count FROM components_component')
    print(f'✅ Connection successful. {result[0]["count"]} components in database.')
    
    # Check for new columns
    check_query = '''
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'components_component' 
        AND column_name IN ('image_url', 'product_url')
    '''
    columns = db.execute_query(check_query)
    if len(columns) == 2:
        print('✅ image_url and product_url columns are present.')
    else:
        print('❌ Missing columns in database.')
    
    db.close()
except Exception as e:
    print(f'❌ Connection error: {e}')
"@

# Execute test in scraper container
Write-Host "Running database test..." -ForegroundColor Yellow
docker-compose run --rm scraper python -c $testScript

Write-Host ""
Write-Host "=== Configuration completed ===" -ForegroundColor Green
Write-Host ""
Write-Host "Usage:" -ForegroundColor Cyan
Write-Host "  docker-compose run --rm scraper python scrape_brands.py --interactive    # Interactive mode" -ForegroundColor White
Write-Host "  docker-compose run --rm scraper python scrape_brands.py --shimano        # Shimano scraper only" -ForegroundColor White
Write-Host "  docker-compose run --rm scraper python scrape_brands.py --sram           # SRAM scraper only" -ForegroundColor White
Write-Host "  docker-compose run --rm scraper python scrape_brands.py --all            # All brands scraper" -ForegroundColor White
Write-Host ""
Write-Host "Quick test:" -ForegroundColor Cyan
Write-Host "  docker-compose run --rm scraper python scrape_brands.py --check-db       # Check DB compatibility" -ForegroundColor White
Write-Host ""
