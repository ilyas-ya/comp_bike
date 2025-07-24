#!/usr/bin/env python3
"""
Quick health check for scraper components
"""

def check_imports():
    """Check if all required modules can be imported"""
    try:
        import requests
        import beautifulsoup4
        import psycopg2
        import fake_useragent
        import schedule
        print("✅ All required packages imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def check_network():
    """Check network connectivity to target site"""
    try:
        import requests
        response = requests.get("https://www.bike-components.de", timeout=10)
        print(f"✅ Network check successful: {response.status_code}")
        return True
    except Exception as e:
        print(f"❌ Network check failed: {e}")
        return False

def check_database():
    """Check database connectivity"""
    try:
        from database.connection import DatabaseConnection
        db = DatabaseConnection()
        db.execute_query("SELECT 1")
        db.close()
        print("✅ Database check successful")
        return True
    except Exception as e:
        print(f"❌ Database check failed: {e}")
        return False

if __name__ == "__main__":
    print("=== Scraper Health Check ===")
    
    checks = [
        ("Package Imports", check_imports),
        ("Network Connectivity", check_network),
        ("Database Connection", check_database)
    ]
    
    all_passed = True
    for name, check_func in checks:
        print(f"\nChecking {name}...")
        if not check_func():
            all_passed = False
    
    print(f"\n{'='*30}")
    if all_passed:
        print("🎉 All health checks passed! Scraper is ready to run.")
    else:
        print("⚠️  Some health checks failed. Fix the issues above before running the scraper.")