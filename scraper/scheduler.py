#!/usr/bin/env python3
"""
Production Scheduler for Component Scraper
Manages automated scraping with intelligent timing
"""

import time
import schedule
import logging
from datetime import datetime, timedelta
from main import main as run_bike_components_scraper
from scrape_brands import scrape_all_brands
from utils.logger import setup_logger

class ProductionScheduler:
    """Production scheduler for component scraping"""
    
    def __init__(self):
        self.logger = setup_logger('scheduler')
        self.last_full_scrape = None
        self.last_update_scrape = None
    
    def run_daily_update(self):
        """Run daily update scraping (lighter load)"""
        self.logger.info("=== DAILY UPDATE SCRAPING ===")
        try:
            # Run bike-components.de scraper (limited pages for updates)
            self.logger.info("Running daily bike-components update")
            run_bike_components_scraper(test_mode=False)
            
            self.last_update_scrape = datetime.now()
            self.logger.info("Daily update completed successfully")
            
        except Exception as e:
            self.logger.error(f"Daily update failed: {str(e)}")
    
    def run_weekly_full_scrape(self):
        """Run weekly full scraping (all categories, all brands)"""
        self.logger.info("=== WEEKLY FULL SCRAPING ===")
        try:
            # Run bike-components.de full scraper
            self.logger.info("Running weekly full bike-components scrape")
            run_bike_components_scraper(test_mode=False)
            
            # Wait between different scrapers
            time.sleep(300)  # 5 minutes pause
            
            # Run official brands scrapers
            self.logger.info("Running weekly brands scraping")
            scrape_all_brands(test_mode=False)
            
            self.last_full_scrape = datetime.now()
            self.logger.info("Weekly full scrape completed successfully")
            
        except Exception as e:
            self.logger.error(f"Weekly full scrape failed: {str(e)}")
    
    def run_brand_scraping(self):
        """Run brand-specific scraping (Shimano, SRAM)"""
        self.logger.info("=== BRAND SCRAPING SESSION ===")
        try:
            scrape_all_brands(test_mode=False)
            self.logger.info("Brand scraping completed successfully")
        except Exception as e:
            self.logger.error(f"Brand scraping failed: {str(e)}")

def setup_production_schedule():
    """Setup production scraping schedule"""
    scheduler = ProductionScheduler()
    
    # Daily light updates at 2 AM
    schedule.every().day.at("02:00").do(scheduler.run_daily_update)
    
    # Weekly full scrape on Sunday at 1 AM
    schedule.every().sunday.at("01:00").do(scheduler.run_weekly_full_scrape)
    
    # Bi-weekly brand scraping on Wednesday at 3 AM
    schedule.every(2).weeks.do(scheduler.run_brand_scraping)
    
    return scheduler

def run_scheduler():
    """Run the production scheduler"""
    logger = setup_logger('scheduler_main')
    logger.info("Starting production scheduler")
    
    scheduler = setup_production_schedule()
    
    logger.info("Production schedule configured:")
    logger.info("- Daily updates: 2:00 AM")
    logger.info("- Weekly full scrape: Sunday 1:00 AM")
    logger.info("- Brand scraping: Every 2 weeks, Wednesday 3:00 AM")
    
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute
            
    except KeyboardInterrupt:
        logger.info("Scheduler stopped by user")
    except Exception as e:
        logger.error(f"Scheduler error: {str(e)}")
        raise

if __name__ == "__main__":
    run_scheduler()
