#!/usr/bin/env python3
"""
Production scraper to collect 200+ components from bike-components.de
"""

import sys
import os
import time
import json
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger
from config import COMPONENT_CATEGORIES

class ProductionScraper:
    """Production scraper for collecting large amounts of component data"""
    
    def __init__(self, target_count=200):
        self.target_count = target_count
        self.logger = setup_logger('production_scraper')
        self.db = DatabaseConnection()
        self.scraper = BikeComponentsDEScraper(self.db)
        self.scraped_count = 0
        self.failed_count = 0
        self.start_time = time.time()
        
    def get_current_count(self):
        """Get current number of components in database"""
        try:
            result = self.db.execute_query("SELECT COUNT(*) as count FROM components_component")
            return result[0]['count']
        except Exception as e:
            self.logger.error(f"Error getting current count: {e}")
            return 0
    
    def scrape_all_categories(self, products_per_category=50):
        """Scrape components from all categories"""
        self.logger.info(f"Starting production scraping - Target: {self.target_count} components")
        
        initial_count = self.get_current_count()
        self.logger.info(f"Initial database count: {initial_count}")
        
        categories = self.scraper.get_component_categories()
        self.logger.info(f"Found {len(categories)} categories to scrape")
        
        for i, category in enumerate(categories):
            if self.scraped_count >= self.target_count:
                self.logger.info(f"Target of {self.target_count} components reached!")
                break
                
            self.logger.info(f"\n{'='*60}")
            self.logger.info(f"CATEGORY {i+1}/{len(categories)}: {category['name']}")
            self.logger.info(f"URL: {category['url']}")
            self.logger.info(f"Progress: {self.scraped_count}/{self.target_count} components scraped")
            self.logger.info(f"{'='*60}")
            
            try:
                category_scraped = self.scrape_category(category, products_per_category)
                self.logger.info(f"Category {category['name']} completed: {category_scraped} components scraped")
                
                # Add delay between categories
                time.sleep(3)
                
            except Exception as e:
                self.logger.error(f"Error scraping category {category['name']}: {e}")
                continue
        
        final_count = self.get_current_count()
        total_scraped = final_count - initial_count
        
        self.logger.info(f"\n{'='*60}")
        self.logger.info(f"SCRAPING COMPLETE!")
        self.logger.info(f"Initial count: {initial_count}")
        self.logger.info(f"Final count: {final_count}")
        self.logger.info(f"Total scraped: {total_scraped}")
        self.logger.info(f"Failed attempts: {self.failed_count}")
        self.logger.info(f"Success rate: {(total_scraped/(total_scraped + self.failed_count)*100):.1f}%" if (total_scraped + self.failed_count) > 0 else "N/A")
        self.logger.info(f"Time taken: {(time.time() - self.start_time)/60:.1f} minutes")
        self.logger.info(f"{'='*60}")
        
        return total_scraped
    
    def scrape_category(self, category, max_products=50):
        """Scrape products from a single category"""
        category_scraped = 0
        
        try:
            # Get category page
            html_content = self.scraper.get_page(category['url'])
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Extract product links
            product_links = self.scraper.extract_product_links(soup)
            self.logger.info(f"Found {len(product_links)} product links in {category['name']}")
            
            if not product_links:
                self.logger.warning(f"No product links found for {category['name']}")
                return 0
            
            # Scrape products
            products_to_scrape = min(len(product_links), max_products)
            self.logger.info(f"Scraping {products_to_scrape} products from {category['name']}")
            
            for i, product_link in enumerate(product_links[:products_to_scrape]):
                if self.scraped_count >= self.target_count:
                    self.logger.info(f"Target reached, stopping category scraping")
                    break
                
                try:
                    # Construct full URL
                    if product_link.startswith('/'):
                        product_url = f"https://www.bike-components.de{product_link}"
                    else:
                        product_url = product_link
                    
                    self.logger.info(f"  [{i+1}/{products_to_scrape}] Scraping: {product_url}")
                    
                    # Scrape product data
                    component_data = self.scraper.scrape_product(product_url, category['category'])
                    
                    if component_data:
                        # Save to database
                        component_id = self.scraper.save_component(component_data)
                        
                        if component_id:
                            category_scraped += 1
                            self.scraped_count += 1
                            
                            self.logger.info(f"    ✅ [{self.scraped_count}] {component_data['brand']} {component_data['model']}")
                            self.logger.info(f"       Type: {component_data['type']}, Speed: {component_data.get('speed', 'N/A')}")
                            
                            # Show progress every 10 components
                            if self.scraped_count % 10 == 0:
                                elapsed = (time.time() - self.start_time) / 60
                                rate = self.scraped_count / elapsed if elapsed > 0 else 0
                                eta = (self.target_count - self.scraped_count) / rate if rate > 0 else 0
                                self.logger.info(f"    📊 Progress: {self.scraped_count}/{self.target_count} ({(self.scraped_count/self.target_count*100):.1f}%)")
                                self.logger.info(f"    ⏱️  Rate: {rate:.1f} components/min, ETA: {eta:.1f} min")
                        else:
                            self.failed_count += 1
                            self.logger.warning(f"    ❌ Failed to save component")
                    else:
                        self.failed_count += 1
                        self.logger.warning(f"    ❌ Failed to extract component data")
                    
                    # Add delay between products (be respectful)
                    time.sleep(2)
                    
                except Exception as e:
                    self.failed_count += 1
                    self.logger.error(f"    ❌ Error scraping product {i+1}: {str(e)}")
                    continue
            
            return category_scraped
            
        except Exception as e:
            self.logger.error(f"Error scraping category {category['name']}: {e}")
            return 0
    
    def get_scraping_stats(self):
        """Get detailed scraping statistics"""
        try:
            # Components by type
            type_stats = self.db.execute_query("""
                SELECT type, COUNT(*) as count 
                FROM components_component 
                GROUP BY type 
                ORDER BY count DESC
            """)
            
            # Components by brand
            brand_stats = self.db.execute_query("""
                SELECT brand, COUNT(*) as count 
                FROM components_component 
                GROUP BY brand 
                ORDER BY count DESC 
                LIMIT 10
            """)
            
            # Recent additions
            recent = self.db.execute_query("""
                SELECT brand, model, type, created_at
                FROM components_component 
                WHERE created_at > NOW() - INTERVAL '1 hour'
                ORDER BY created_at DESC 
                LIMIT 10
            """)
            
            return {
                'by_type': type_stats,
                'by_brand': brand_stats,
                'recent': recent
            }
            
        except Exception as e:
            self.logger.error(f"Error getting stats: {e}")
            return None
    
    def print_final_stats(self):
        """Print final scraping statistics"""
        stats = self.get_scraping_stats()
        if not stats:
            return
        
        print(f"\n{'='*60}")
        print(f"FINAL STATISTICS")
        print(f"{'='*60}")
        
        print(f"\nComponents by Type:")
        for stat in stats['by_type']:
            print(f"  {stat['type']}: {stat['count']}")
        
        print(f"\nTop Brands:")
        for stat in stats['by_brand']:
            print(f"  {stat['brand']}: {stat['count']}")
        
        print(f"\nRecent Additions:")
        for item in stats['recent']:
            print(f"  {item['brand']} {item['model']} ({item['type']})")
        
        print(f"{'='*60}")
    
    def close(self):
        """Close database connection"""
        if self.db:
            self.db.close()

def main():
    """Main production scraping function"""
    print("🚀 Starting Production Scraping for 200+ Components")
    print("=" * 60)
    
    # Create scraper instance
    scraper = ProductionScraper(target_count=200)
    
    try:
        # Start scraping
        total_scraped = scraper.scrape_all_categories(products_per_category=60)
        
        # Print final statistics
        scraper.print_final_stats()
        
        if total_scraped >= 200:
            print(f"🎉 SUCCESS! Scraped {total_scraped} components (target: 200)")
        else:
            print(f"⚠️  Scraped {total_scraped} components (target: 200)")
            print("Consider running the scraper again to reach the target.")
        
    except KeyboardInterrupt:
        print("\n⏹️  Scraping interrupted by user")
        scraper.print_final_stats()
    except Exception as e:
        print(f"❌ Scraping failed: {e}")
    finally:
        scraper.close()

if __name__ == "__main__":
    main()