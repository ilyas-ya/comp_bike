import re
import json
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper

class SRAMScraper(BaseScraper):
    """Scraper for SRAM components"""
    
    def __init__(self, db_connection):
        super().__init__(db_connection)
        self.base_url = "https://www.sram.com"
        self.product_url = f"{self.base_url}/en/products"
    
    def scrape(self):
        """Main scraping method for SRAM components"""
        self.logger.info("Starting SRAM scraper")
        
        try:
            # Scrape component categories
            categories = self.scrape_categories()
            
            # Process each category
            for category in categories[:2]:  # Limit to 2 categories for testing
                self.logger.info(f"Scraping category: {category['name']}")
                components = self.scrape_category_components(category['url'])
                
                # Process each component
                for component in components[:5]:  # Limit to 5 components per category for testing
                    self.logger.info(f"Scraping component: {component['name']}")
                    component_data = self.scrape_component_details(component['url'])
                    
                    if component_data:
                        self.save_component(component_data)
            
            self.logger.info("SRAM scraping completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error in SRAM scraper: {str(e)}")
            raise
    
    def scrape_categories(self):
        """Scrape component categories"""
        self.logger.info(f"Scraping categories from {self.product_url}")
        
        # For demo purposes, return mock categories
        # In a real implementation, this would parse the actual SRAM website
        return [
            {
                'name': 'Road Components',
                'url': f"{self.product_url}/road",
                'category': 'cassette_derailleur'
            },
            {
                'name': 'Mountain Bike Components',
                'url': f"{self.product_url}/mtb",
                'category': 'cassette_derailleur'
            },
            {
                'name': 'Bottom Brackets',
                'url': f"{self.product_url}/bottom-brackets",
                'category': 'bottom_bracket'
            }
        ]
    
    def scrape_category_components(self, category_url):
        """Scrape components from a category page"""
        self.logger.info(f"Scraping components from {category_url}")
        
        # For demo purposes, return mock components
        # In a real implementation, this would parse the actual SRAM website
        return [
            {
                'name': 'RED AXS Crankset',
                'url': f"{self.base_url}/product/red-axs-crankset",
                'category': 'bottom_bracket'
            },
            {
                'name': 'Force AXS Crankset',
                'url': f"{self.base_url}/product/force-axs-crankset",
                'category': 'bottom_bracket'
            },
            {
                'name': 'XX1 Eagle Crankset',
                'url': f"{self.base_url}/product/xx1-eagle-crankset",
                'category': 'bottom_bracket'
            }
        ]
    
    def scrape_component_details(self, component_url):
        """Scrape detailed component information"""
        self.logger.info(f"Scraping component details from {component_url}")
        
        # For demo purposes, return mock component data
        # In a real implementation, this would parse the actual SRAM website
        if "red-axs" in component_url:
            return {
                'name': 'RED AXS Crankset',
                'brand': 'SRAM',
                'model': 'RED AXS',
                'category': 'bottom_bracket',
                'specifications': json.dumps({
                    'spindle_type': 'DUB',
                    'shell_width': 68.0,
                    'standard': 'DUB',
                    'thread_pitch': 'English'
                }),
                'price_range': '$600-700',
                'description': 'SRAM RED AXS crankset for professional road racing.'
            }
        elif "force-axs" in component_url:
            return {
                'name': 'Force AXS Crankset',
                'brand': 'SRAM',
                'model': 'Force AXS',
                'category': 'bottom_bracket',
                'specifications': json.dumps({
                    'spindle_type': 'DUB',
                    'shell_width': 68.0,
                    'standard': 'DUB',
                    'thread_pitch': 'English'
                }),
                'price_range': '$400-500',
                'description': 'SRAM Force AXS crankset for high-performance road cycling.'
            }
        else:
            return {
                'name': 'XX1 Eagle Crankset',
                'brand': 'SRAM',
                'model': 'XX1 Eagle',
                'category': 'bottom_bracket',
                'specifications': json.dumps({
                    'spindle_type': 'DUB',
                    'shell_width': 73.0,
                    'standard': 'DUB',
                    'thread_pitch': 'English'
                }),
                'price_range': '$500-600',
                'description': 'SRAM XX1 Eagle crankset for high-performance mountain biking.'
            }