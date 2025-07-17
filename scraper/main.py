#!/usr/bin/env python3
"""
AI Scraping Service for Component Compatibility System
Scrapes component data from supplier websites
"""

import os
import sys
import logging
import schedule
import time
from datetime import datetime
from scrapers.shimano_scraper import ShimanoScraper
from scrapers.sram_scraper import SRAMScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger

def main():
    """Main scraping function"""
    logger = setup_logger('scraper_main')
    logger.info("Starting scraping session")
    
    try:
        # Initialize database connection
        db = DatabaseConnection()
        
        # Initialize scrapers
        scrapers = [
            ShimanoScraper(db),
            SRAMScraper(db),
        ]
        
        # Run each scraper
        for scraper in scrapers:
            try:
                logger.info(f"Running {scraper.__class__.__name__}")
                scraper.scrape()
                logger.info(f"Completed {scraper.__class__.__name__}")
            except Exception as e:
                logger.error(f"Error in {scraper.__class__.__name__}: {str(e)}")
        
        logger.info("Scraping session completed")
        
    except Exception as e:
        logger.error(f"Critical error in main scraping function: {str(e)}")
        sys.exit(1)

def run_scheduled():
    """Run scraping on schedule"""
    logger = setup_logger('scheduler')
    
    # Schedule daily scraping at 2 AM
    schedule.every().day.at("02:00").do(main)
    
    logger.info("Scheduler started. Waiting for scheduled runs...")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--run-once":
        # Run once for testing
        main()
    else:
        # Run on schedule
        run_scheduled()