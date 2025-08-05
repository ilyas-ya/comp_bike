#!/bin/bash
# Setup script for the official brands scraper

echo "=== Official Brands Scraper Configuration ==="

# Check if Docker is running
echo "Checking Docker services..."
docker-compose ps

# Install Python dependencies if necessary
echo "Installing dependencies..."
pip install -r requirements.txt

# Create logs directory if it doesn't exist
echo "Creating logs directory..."
mkdir -p logs

# Test database connection
echo "Testing database connection..."
python -c "
from database.connection import DatabaseConnection
try:
    db = DatabaseConnection()
    result = db.execute_query('SELECT COUNT(*) as count FROM components_component')
    print(f'✅ Connection successful. {result[0][\"count\"]} components in database.')
    db.close()
except Exception as e:
    print(f'❌ Connection error: {e}')
"

# Check database compatibility
echo "Checking database compatibility..."
python scrape_brands.py --check-db

echo ""
echo "=== Configuration completed ==="
echo ""
echo "Usage:"
echo "  python scrape_brands.py --interactive    # Interactive mode"
echo "  python scrape_brands.py --shimano        # Shimano scraper only"
echo "  python scrape_brands.py --sram           # SRAM scraper only"  
echo "  python scrape_brands.py --all            # All brands scraper"
echo ""
