"""
SRAM Official Website Scraper
Scrapes component data from https://www.sram.com
"""

import re
import json
import time
import random
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper

class SRAMScraper(BaseScraper):
    """Scraper for SRAM official website"""
    
    def __init__(self, db_connection):
        super().__init__(db_connection)
        self.base_url = "https://www.sram.com"
        self.session.headers.update({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        })
    
    def scrape(self):
        """Main scraping method for SRAM"""
        self.logger.info("Starting SRAM scraper")
        
        try:
            # Define component categories to scrape
            categories = self.get_component_categories()
            
            for category in categories:
                self.logger.info(f"Scraping SRAM category: {category['name']}")
                self.scrape_category(category)
                
                # Add delay between categories to be respectful
                time.sleep(random.uniform(3.0, 6.0))
            
            self.logger.info("SRAM scraping completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error in SRAM scraper: {str(e)}")
            raise
    
    def get_component_categories(self):
        """Define component categories to scrape from SRAM"""
        categories = [
            {
                'name': 'Road Components',
                'url': f"{self.base_url}/en/categories/road",
                'category': 'road',
                'max_pages': 5
            },
            {
                'name': 'Mountain Bike Components',
                'url': f"{self.base_url}/en/categories/mountain",
                'category': 'mountain',
                'max_pages': 5
            },
            {
                'name': 'Gravel Components',
                'url': f"{self.base_url}/en/categories/gravel",
                'category': 'gravel',
                'max_pages': 3
            }
        ]
        
        return categories
    
    def scrape_category(self, category):
        """Scrape all products from a category"""
        try:
            self.logger.info(f"Scraping {category['name']}")
            
            # Get category page content
            html_content = self.get_page(category['url'])
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Find product links on the page
            product_links = self.extract_sram_product_links(soup)
            
            if not product_links:
                self.logger.info(f"No products found in category {category['name']}")
                return
            
            # Scrape each product
            for product_link in product_links[:20]:  # Limit to 20 products per category
                try:
                    product_url = urljoin(self.base_url, product_link)
                    component_data = self.scrape_sram_product(product_url)
                    
                    if component_data:
                        self.save_basic_component(component_data)
                        
                    # Add delay between products
                    time.sleep(random.uniform(2.0, 4.0))
                    
                except Exception as e:
                    self.logger.error(f"Error scraping SRAM product {product_link}: {str(e)}")
                    continue
                    
        except Exception as e:
            self.logger.error(f"Error scraping SRAM category {category['name']}: {str(e)}")
    
    def extract_sram_product_links(self, soup):
        """Extract product links from SRAM category page"""
        product_links = []
        
        # Look for common product link patterns on SRAM site
        # This may need adjustment based on actual site structure
        product_selectors = [
            'a[href*="/products/"]',
            'a[href*="/product/"]',
            '.product-item a',
            '.product-card a',
            '.component-item a',
            '.product-grid a'
        ]
        
        for selector in product_selectors:
            links = soup.select(selector)
            for link in links:
                href = link.get('href')
                if href and href not in product_links:
                    product_links.append(href)
        
        self.logger.info(f"Found {len(product_links)} SRAM product links")
        return product_links
    
    def scrape_sram_product(self, product_url):
        """Scrape individual SRAM product"""
        try:
            html_content = self.get_page(product_url)
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Extract basic product information
            component_data = {
                'brand': 'SRAM',
                'model': self.extract_sram_model(soup),
                'type': self.extract_sram_type(soup),
                'image_url': self.extract_sram_image(soup),
                'product_url': product_url,
                'specs': {}  # Empty for now as requested
            }
            
            # Validate required fields
            if not component_data['model'] or not component_data['type']:
                self.logger.warning(f"Missing required data for {product_url}")
                return None
            
            self.logger.info(f"Scraped SRAM: {component_data['model']} ({component_data['type']})")
            return component_data
            
        except Exception as e:
            self.logger.error(f"Error scraping SRAM product {product_url}: {str(e)}")
            return None
    
    def extract_sram_model(self, soup):
        """Extract model name from SRAM product page"""
        # Try multiple selectors for product name
        selectors = [
            'h1.product-title',
            'h1.product-name',
            '.product-header h1',
            'h1',
            '.title h1',
            '.product-info h1',
            '.hero-title',
            '.product-detail-title'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                model = element.get_text(strip=True)
                # Clean up the model name
                model = re.sub(r'\s+', ' ', model)
                model = model.replace('SRAM', '').strip()
                if model:
                    return model
        
        return "Unknown Model"
    
    def extract_sram_type(self, soup):
        """Extract component type from SRAM product page"""
        # Map common SRAM terms to our component types
        type_mapping = {
            'crankset': 'crankset',
            'crank': 'crankset',
            'cassette': 'cassette',
            'derailleur': 'derailleur',
            'brake': 'brakes',
            'shifter': 'shifter',
            'chain': 'chain',
            'wheel': 'wheel',
            'chainring': 'crankset',
            'groupset': 'crankset'  # Default groupsets to crankset for now
        }
        
        # Look in various places for type information
        text_content = soup.get_text().lower()
        
        # Check breadcrumbs, categories, or product descriptions
        for keyword, component_type in type_mapping.items():
            if keyword in text_content:
                return component_type
        
        # Try to extract from URL
        url_parts = soup.find('link', {'rel': 'canonical'})
        if url_parts:
            url = url_parts.get('href', '').lower()
            for keyword, component_type in type_mapping.items():
                if keyword in url:
                    return component_type
        
        return 'unknown'
    
    def extract_sram_image(self, soup):
        """Extract main product image URL from SRAM product page"""
        # Try multiple selectors for product images
        selectors = [
            '.product-image img',
            '.hero-image img',
            '.main-image img',
            '.product-gallery img:first-child',
            'img[alt*="product"]',
            '.featured-image img',
            '.product-media img'
        ]
        
        for selector in selectors:
            img = soup.select_one(selector)
            if img:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy')
                if src:
                    # Convert relative URLs to absolute
                    if src.startswith('/'):
                        src = urljoin(self.base_url, src)
                    return src
        
        return None
    
    def save_basic_component(self, component_data):
        """Save basic component data to database"""
        try:
            # Check if component already exists
            check_query = """
                SELECT id FROM components_component 
                WHERE brand = %(brand)s AND model = %(model)s AND type = %(type)s
            """
            
            existing = self.db.execute_query(check_query, {
                'brand': component_data['brand'],
                'model': component_data['model'],
                'type': component_data['type']
            })
            
            if existing:
                # Update existing component
                component_id = existing[0]['id']
                self.logger.info(f"Updating existing component: {component_data['brand']} {component_data['model']}")
                
                update_query = """
                    UPDATE components_component
                    SET image_url = %(image_url)s,
                        product_url = %(product_url)s,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %(id)s
                """
                
                self.db.execute_query(update_query, {
                    'id': component_id,
                    'image_url': component_data.get('image_url'),
                    'product_url': component_data.get('product_url')
                }, fetch=False)
                
            else:
                # Insert new component
                self.logger.info(f"Inserting new component: {component_data['brand']} {component_data['model']}")
                
                insert_query = """
                    INSERT INTO components_component
                    (brand, model, type, specs, image_url, product_url, created_at, updated_at)
                    VALUES (%(brand)s, %(model)s, %(type)s, %(specs)s, %(image_url)s, %(product_url)s, 
                            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """
                
                import json
                self.db.execute_query(insert_query, {
                    'brand': component_data['brand'],
                    'model': component_data['model'],
                    'type': component_data['type'],
                    'specs': json.dumps(component_data.get('specs', {})),
                    'image_url': component_data.get('image_url'),
                    'product_url': component_data.get('product_url')
                }, fetch=False)
            
            # Commit the transaction
            self.db.commit()
            return True
            
        except Exception as e:
            self.logger.error(f"Error saving component to database: {str(e)}")
            self.db.rollback()
            return False
