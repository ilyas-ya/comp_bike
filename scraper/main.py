#!/usr/bin/env python3
"""
AI Scraping Service for Component Compatibility System
Scrapes component data from bike-components.de
"""

import os
import sys
import logging
import schedule
import time
import argparse
from datetime import datetime
from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger

def main(test_mode=False):
    """
    Main scraping function
    
    Args:
        test_mode: If True, limits scraping for testing purposes
    """
    logger = setup_logger('scraper_main')
    logger.info("Starting bike-components.de scraping session")
    
    try:
        # Initialize database connection
        db = DatabaseConnection()
        
        # Initialize scraper
        scraper = BikeComponentsDEScraper(db)
        
        # Run scraper
        logger.info("Running BikeComponentsDEScraper")
        scraper.scrape()
        logger.info("Completed BikeComponentsDEScraper")
        
        logger.info("Scraping session completed successfully")
        
    except Exception as e:
        logger.error(f"Critical error in main scraping function: {str(e)}")
        raise
    finally:
        # Close database connection
        if 'db' in locals():
            db.close()

def run_scheduled():
    """Run scraping on schedule"""
    logger = setup_logger('scheduler')
    
    # Schedule daily scraping at 2 AM
    schedule.every().day.at("02:00").do(main)
    
    logger.info("Scheduler started. Waiting for scheduled runs...")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

def run_interactive():
    """Run scraper in interactive mode"""
    logger = setup_logger('interactive')
    
    print("=== Bike Components DE Scraper ===")
    print("This scraper will collect component data from bike-components.de")
    print("\nOptions:")
    print("1. Run full scraping (may take a while)")
    print("2. Run test scraping (limited products)")
    print("3. Exit")
    
    choice = input("\nYour choice (1-3): ").strip()
    
    if choice == '1':
        print("Starting full scraping...")
        main(test_mode=False)
    elif choice == '2':
        print("Starting test scraping...")
        main(test_mode=True)
    elif choice == '3':
        print("Exiting...")
        return
    else:
        print("Invalid choice. Exiting...")
        return

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Bike Components DE Scraper')
    parser.add_argument('--run-once', action='store_true', help='Run scraper once and exit')
    parser.add_argument('--interactive', action='store_true', help='Run in interactive mode')
    parser.add_argument('--test', action='store_true', help='Run in test mode (limited scraping)')
    
    args = parser.parse_args()
    
    if args.interactive:
        run_interactive()
    elif args.run_once:
        main(test_mode=args.test)
    else:
        # Run on schedule
        run_scheduled()