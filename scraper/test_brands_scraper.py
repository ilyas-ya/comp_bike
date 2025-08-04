#!/usr/bin/env python3
"""
Test script for official brands scrapers
"""

import sys
import os
sys.path.append('/app')

from database.connection import DatabaseConnection
from utils.logger import setup_logger

def test_database_connection():
    """Test database connection and schema"""
    logger = setup_logger('test_db')
    
    try:
        db = DatabaseConnection()
        
        # Test basic connection
        result = db.execute_query("SELECT COUNT(*) as count FROM components_component")
        count = result[0]['count']
        logger.info(f"✅ Database connection successful. {count} components in database.")
        
        # Test new columns
        schema_query = """
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'components_component' 
            AND column_name IN ('image_url', 'product_url')
            ORDER BY column_name
        """
        
        columns = db.execute_query(schema_query)
        if len(columns) == 2:
            logger.info("✅ New columns (image_url, product_url) are present.")
            for col in columns:
                logger.info(f"   - {col['column_name']}: {col['data_type']}")
        else:
            logger.error("❌ Missing columns in database schema.")
            return False
        
        db.close()
        return True
        
    except Exception as e:
        logger.error(f"❌ Database test failed: {str(e)}")
        return False

def test_scrapers_import():
    """Test that scrapers can be imported"""
    logger = setup_logger('test_import')
    
    try:
        from scrapers.shimano_scraper import ShimanoScraper
        from scrapers.sram_scraper import SRAMScraper
        logger.info("✅ Scrapers imported successfully.")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to import scrapers: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("=== Testing Official Brands Scraper ===")
    
    # Test database
    print("\n1. Testing database connection...")
    db_ok = test_database_connection()
    
    # Test imports
    print("\n2. Testing scraper imports...")
    import_ok = test_scrapers_import()
    
    # Summary
    print("\n=== Test Results ===")
    if db_ok and import_ok:
        print("✅ All tests passed! Ready to scrape official brands.")
        return 0
    else:
        print("❌ Some tests failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
