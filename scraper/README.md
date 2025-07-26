# Bike Components DE Scraper

An intelligent AI-powered scraper for collecting bicycle component data from [bike-components.de](https://www.bike-components.de). This scraper is designed to be respectful, efficient, and focused on extracting structured component data for the Component Compatibility System.

## 🎯 Features

### **Intelligent Data Extraction**
- **Category-specific parsing** for cranksets, cassettes, derailleurs, brakes, and frames
- **AI-enhanced specification extraction** using regex patterns and text analysis
- **Brand detection** from product names using known bicycle component manufacturers
- **Price normalization** supporting multiple currency formats
- **Duplicate handling** with automatic updates for existing components

### **Respectful Scraping**
- **Rate limiting** with configurable delays between requests (1-3 seconds)
- **User agent rotation** to avoid detection
- **Retry logic** with exponential backoff for failed requests
- **Limited scope** (5 pages per category, 10 products per page by default)
- **Request throttling** to be respectful to the target website

### **Robust Architecture**
- **Database integration** with PostgreSQL and Django ORM compatibility
- **Comprehensive logging** with file and console output
- **Error handling** with transaction rollback on failures
- **Configuration management** through environment variables
- **Docker containerization** for easy deployment

## 📋 Requirements

- Docker and Docker Compose
- PostgreSQL database (provided via Docker)
- Internet connection for scraping

## 🚀 Quick Start

### **1. Basic Setup**

```bash
# Clone the repository and navigate to scraper directory
cd scraper

# Start required services (database and redis)
docker-compose up -d db redis

# Wait for database to be ready (10-15 seconds)
docker-compose logs db
```

### **2. Health Check**

```bash
# Run health check to verify all components
docker-compose run --rm scraper python health_check.py
```

Expected output:
```
=== Scraper Health Check ===

Checking Package Imports...
✅ All required packages imported successfully

Checking Network Connectivity...
✅ Network check successful: 200

Checking Database Connection...
✅ Database check successful

==============================
🎉 All health checks passed! Scraper is ready to run.
```

### **3. Comprehensive Testing**

```bash
# Run full test suite
docker-compose run --rm scraper python test_scraper.py
```

This will test:
- Database connectivity
- Web page fetching
- HTML parsing and data extraction
- Component data processing

### **4. Test Scraping**

```bash
# Run scraper in test mode (limited scraping)
docker-compose run --rm scraper python main.py --run-once --test

# Or run interactively to control what gets scraped
docker-compose run --rm -it scraper python main.py --interactive
```

### **5. Production Scraping**

```bash
# Run full scraping session
docker-compose run --rm scraper python main.py --run-once

# Run on schedule (starts scheduler)
docker-compose up scraper
```

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the scraper directory:

```bash
# Database configuration
DATABASE_URL=postgresql://postgres:postgres@db:5432/compatibility_system

# Logging level
LOG_LEVEL=INFO

# Scraping limits (optional)
MAX_PAGES_PER_CATEGORY=5
MAX_PRODUCTS_PER_PAGE=10
MIN_DELAY=1.0
MAX_DELAY=3.0
```

### **Configuration Options**

Edit `config.py` to customize:

```python
# Rate limiting
MIN_DELAY = 1.0  # Minimum delay between requests (seconds)
MAX_DELAY = 3.0  # Maximum delay between requests (seconds)

# Scraping limits
MAX_PAGES_PER_CATEGORY = 5
MAX_PRODUCTS_PER_PAGE = 10
MAX_RETRIES = 3

# Component categories to scrape
COMPONENT_CATEGORIES = {
    'cranksets': {'url_path': '/en/cranksets/', 'db_category': 'crankset'},
    'cassettes': {'url_path': '/en/cassettes/', 'db_category': 'cassette'},
    # ... more categories
}
```

## 📊 Component Categories

The scraper supports these component categories:

| Category | URL Path | Database Type | Extracted Specifications |
|----------|----------|---------------|-------------------------|
| **Cranksets** | `/en/components/drivetrain/cranks/` | `crankset` | Chainring sizes, crank length, spindle type, BCD |
| **Cassettes** | `/en/components/drivetrain/cassettes/` | `cassette` | Speed count, gear range, freehub type, individual cogs |
| **Derailleurs** | `/en/components/shifters-derailleurs/` | `derailleur` | Speed count, max cog size, cage length, derailleur type |
| **Brakes** | `/en/components/brakes/` | `brakes` | Brake type, mount type, rotor compatibility, fluid type |
| **Frames** | `/en/components/frames/` | `frame` | Frame type, material, geometry, standards |

## 🧪 Testing Commands

### **Quick Start Testing Sequence**

```bash
# 1. Start required services
docker-compose up -d db redis

# 2. Run health check
docker-compose run --rm scraper python health_check.py

# 3. Run comprehensive tests
docker-compose run --rm scraper python test_scraper.py

# 4. If tests pass, run actual scraper in test mode
docker-compose run --rm scraper python main.py --run-once --test

# 5. Check logs
docker-compose run --rm scraper ls -la logs/
docker-compose run --rm scraper tail logs/scraper_main_$(date +%Y%m%d).log
```

### **Individual Component Testing**

```bash
# Test database connection only
docker-compose run --rm scraper python -c "
from database.connection import DatabaseConnection
db = DatabaseConnection()
result = db.execute_query('SELECT 1 as test')
print('Database test:', result)
db.close()
"

# Test web scraping capability
docker-compose run --rm scraper python -c "
import requests
response = requests.get('https://www.bike-components.de/en/components/drivetrain/cranks/')
print(f'Status: {response.status_code}, Length: {len(response.text)}')
"

# Test all category URLs
docker-compose run --rm scraper python test_urls.py

# Test scraper import
docker-compose run --rm scraper python -c "
from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
print('✅ Scraper imported successfully')
"
```

### **Verbose Testing**

```bash
# Run with debug logging
docker-compose run --rm -e LOG_LEVEL=DEBUG scraper python main.py --run-once --test

# Run with custom limits
docker-compose run --rm -e MAX_PAGES_PER_CATEGORY=2 -e MAX_PRODUCTS_PER_PAGE=5 scraper python main.py --run-once --test
```

## 🔍 Troubleshooting

### **Common Issues and Solutions**

#### **1. Database Connection Issues**

```bash
# Check if database is running
docker-compose ps

# Check database logs
docker-compose logs db

# Test database connectivity
docker-compose run --rm scraper pg_isready -h db -p 5432 -U postgres

# Restart database
docker-compose restart db
```

#### **2. Network/Scraping Issues**

```bash
# Test network connectivity
docker-compose run --rm scraper python -c "
import requests
try:
    response = requests.get('https://www.bike-components.de', timeout=10)
    print(f'✅ Network OK: {response.status_code}')
except Exception as e:
    print(f'❌ Network issue: {e}')
"

# Check if website is accessible
curl -I https://www.bike-components.de

# Test with different user agent
docker-compose run --rm scraper python -c "
import requests
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
response = requests.get('https://www.bike-components.de', headers=headers)
print(f'Status: {response.status_code}')
"
```

#### **3. Import/Dependency Issues**

```bash
# Check Python packages
docker-compose run --rm scraper pip list

# Reinstall requirements
docker-compose run --rm scraper pip install -r requirements.txt

# Check Python path
docker-compose run --rm scraper python -c "import sys; print(sys.path)"

# Rebuild container
docker-compose build scraper --no-cache
```

#### **4. Permission/File Issues**

```bash
# Check file permissions
docker-compose run --rm scraper ls -la

# Check logs directory
docker-compose run --rm scraper ls -la logs/

# Create logs directory if missing
docker-compose run --rm scraper mkdir -p logs

# Check entrypoint script
docker-compose run --rm scraper cat entrypoint.sh
```

### **Debugging Commands**

```bash
# Access container shell for debugging
docker-compose run --rm -it scraper bash

# View recent logs
docker-compose logs --tail=50 scraper

# Monitor logs in real-time
docker-compose logs -f scraper

# Check container resource usage
docker stats

# Inspect container configuration
docker-compose config
```

### **Performance Monitoring**

```bash
# Check scraping performance
docker-compose run --rm scraper python -c "
import time
start = time.time()
# Your test code here
print(f'Execution time: {time.time() - start:.2f} seconds')
"

# Monitor database queries
docker-compose exec db psql -U postgres -d compatibility_system -c "
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC LIMIT 10;
"
```

### **Clean Up Commands**

```bash
# Stop all services
docker-compose down

# Remove volumes (⚠️ This will delete all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean up Docker system
docker system prune -f

# Rebuild everything from scratch
docker-compose build --no-cache
docker-compose up -d
```

## 📝 Logs and Monitoring

### **Log Files**

Logs are stored in the `logs/` directory:

```bash
# View today's scraper logs
docker-compose run --rm scraper cat logs/scraper_main_$(date +%Y%m%d).log

# View all log files
docker-compose run --rm scraper ls -la logs/

# Follow logs in real-time
docker-compose run --rm scraper tail -f logs/scraper_main_$(date +%Y%m%d).log
```

### **Log Levels**

- `DEBUG`: Detailed information for debugging
- `INFO`: General information about scraper progress
- `WARNING`: Warning messages for non-critical issues
- `ERROR`: Error messages for failures

## 🔒 Best Practices

### **Respectful Scraping**
- Always test with limited scope first (`--test` flag)
- Monitor your scraping frequency
- Respect robots.txt (though bike-components.de allows scraping)
- Use appropriate delays between requests

### **Data Quality**
- Regularly check scraped data for accuracy
- Monitor for changes in website structure
- Validate extracted specifications
- Handle edge cases gracefully

### **Maintenance**
- Update user agents periodically
- Monitor scraping success rates
- Keep dependencies updated
- Review and update parsing logic as needed

## 📈 Usage Examples

### **Scheduled Scraping**

```bash
# Run daily at 2 AM (default schedule)
docker-compose up -d scraper

# Custom schedule (edit main.py)
schedule.every().day.at("03:00").do(main)
```

### **Targeted Scraping**

```bash
# Scrape only cranksets
docker-compose run --rm scraper python -c "
from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
from database.connection import DatabaseConnection
db = DatabaseConnection()
scraper = BikeComponentsDEScraper(db)
# Custom scraping logic here
"
```

### **Data Validation**

```bash
# Check scraped data
docker-compose exec db psql -U postgres -d compatibility_system -c "
SELECT category, brand, COUNT(*) as count 
FROM components_component 
GROUP BY category, brand 
ORDER BY category, count DESC;
"
```

## 🤝 Contributing

1. Test your changes thoroughly using the testing commands above
2. Ensure respectful scraping practices
3. Update documentation for any configuration changes
4. Add tests for new functionality

## 📄 License

This scraper is part of the Component Compatibility System and follows the same MIT license.

---

**⚠️ Important**: Always be respectful when scraping websites. This scraper includes rate limiting and other measures to be considerate of the target website's resources.