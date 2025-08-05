#!/usr/bin/env python3
"""
Official Brands Scraper for Component Compatibility System
Scrapes component data from official Shimano and SRAM websites
"""

import os
import sys
import logging
import argparse
from datetime import datetime
from scrapers.shimano_scraper import ShimanoScraper
from scrapers.sram_scraper import SRAMScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger

def scrape_shimano(test_mode=False):
    """
    Scrape Shimano components
    
    Args:
        test_mode: If True, limits scraping for testing purposes
    """
    logger = setup_logger('shimano_scraper')
    logger.info("Starting Shimano scraping session")
    
    try:
        # Initialize database connection
        db = DatabaseConnection()
        
        # Initialize scraper
        scraper = ShimanoScraper(db)
        
        # Run scraper
        logger.info("Running ShimanoScraper")
        scraper.scrape()
        logger.info("Completed ShimanoScraper")
        
        logger.info("Shimano scraping session completed successfully")
        
    except Exception as e:
        logger.error(f"Critical error in Shimano scraping function: {str(e)}")
        raise
    finally:
        # Close database connection
        if 'db' in locals():
            db.close()

def scrape_sram(test_mode=False):
    """
    Scrape SRAM components
    
    Args:
        test_mode: If True, limits scraping for testing purposes
    """
    logger = setup_logger('sram_scraper')
    logger.info("Starting SRAM scraping session")
    
    try:
        # Initialize database connection
        db = DatabaseConnection()
        
        # Initialize scraper
        scraper = SRAMScraper(db)
        
        # Run scraper
        logger.info("Running SRAMScraper")
        scraper.scrape()
        logger.info("Completed SRAMScraper")
        
        logger.info("SRAM scraping session completed successfully")
        
    except Exception as e:
        logger.error(f"Critical error in SRAM scraping function: {str(e)}")
        raise
    finally:
        # Close database connection
        if 'db' in locals():
            db.close()

def scrape_all_brands(test_mode=False):
    """
    Scrape all official brand websites
    
    Args:
        test_mode: If True, limits scraping for testing purposes
    """
    logger = setup_logger('brands_scraper')
    logger.info("Starting official brands scraping session")
    
    try:
        # Scrape Shimano
        logger.info("=== Starting Shimano scraping ===")
        scrape_shimano(test_mode)
        
        # Wait between brands to be respectful
        import time
        time.sleep(10)
        
        # Scrape SRAM
        logger.info("=== Starting SRAM scraping ===")
        scrape_sram(test_mode)
        
        logger.info("All brands scraping completed successfully")
        
    except Exception as e:
        logger.error(f"Critical error in brands scraping: {str(e)}")
        raise

def run_interactive():
    """Run scraper in interactive mode"""
    logger = setup_logger('interactive')
    
    print("=== Official Brands Scraper ===")
    print("This scraper will collect component data from official brand websites")
    print("\nOptions:")
    print("1. Scrape Shimano only")
    print("2. Scrape SRAM only")
    print("3. Scrape all brands (Shimano + SRAM)")
    print("4. Exit")
    
    choice = input("\nYour choice (1-4): ").strip()
    
    if choice == '1':
        print("Starting Shimano scraping...")
        scrape_shimano(test_mode=False)
    elif choice == '2':
        print("Starting SRAM scraping...")
        scrape_sram(test_mode=False)
    elif choice == '3':
        print("Starting all brands scraping...")
        scrape_all_brands(test_mode=False)
    elif choice == '4':
        print("Exiting...")
        return
    else:
        print("Invalid choice. Exiting...")
        return

def check_database_compatibility():
    """Check if database has the required columns for image_url and product_url"""
    logger = setup_logger('db_check')
    
    try:
        db = DatabaseConnection()
        
        # Check if the new columns exist
        check_query = """
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'components_component' 
            AND column_name IN ('image_url', 'product_url')
        """
        
        columns = db.execute_query(check_query)
        existing_columns = [col['column_name'] for col in columns]
        
        missing_columns = []
        for required_col in ['image_url', 'product_url']:
            if required_col not in existing_columns:
                missing_columns.append(required_col)
        
        if missing_columns:
            logger.warning(f"Missing columns in database: {missing_columns}")
            print(f"⚠️  Database needs to be updated. Missing columns: {missing_columns}")
            print("Please run the Django migration to add these columns:")
            print("cd backend && python manage.py makemigrations && python manage.py migrate")
            return False
        else:
            logger.info("Database schema is compatible")
            print("✅ Database schema is compatible")
            return True
            
    except Exception as e:
        logger.error(f"Error checking database compatibility: {str(e)}")
        print(f"❌ Error checking database: {str(e)}")
        return False
    finally:
        if 'db' in locals():
            db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Official Brands Scraper (Shimano & SRAM)')
    parser.add_argument('--shimano', action='store_true', help='Scrape Shimano only')
    parser.add_argument('--sram', action='store_true', help='Scrape SRAM only')
    parser.add_argument('--all', action='store_true', help='Scrape all brands')
    parser.add_argument('--interactive', action='store_true', help='Run in interactive mode')
    parser.add_argument('--test', action='store_true', help='Run in test mode (limited scraping)')
    parser.add_argument('--check-db', action='store_true', help='Check database compatibility')
    
    args = parser.parse_args()
    
    if args.check_db:
        check_database_compatibility()
    elif args.interactive:
        # Check database first
        if check_database_compatibility():
            run_interactive()
    elif args.shimano:
        if check_database_compatibility():
            scrape_shimano(test_mode=args.test)
    elif args.sram:
        if check_database_compatibility():
            scrape_sram(test_mode=args.test)
    elif args.all:
        if check_database_compatibility():
            scrape_all_brands(test_mode=args.test)
    else:
        print("Please specify an option. Use --help for available options.")
        print("Quick start: python scrape_brands.py --interactive")
