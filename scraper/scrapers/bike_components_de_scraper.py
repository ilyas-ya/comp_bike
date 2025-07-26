"""
Bike Components DE Scraper
Specialized scraper for https://www.bike-components.de
"""

import re
import json
import time
import random
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper

class BikeComponentsDEScraper(BaseScraper):
    """Scraper for bike-components.de"""
    
    def __init__(self, db_connection):
        super().__init__(db_connection)
        self.base_url = "https://www.bike-components.de"
        self.session.headers.update({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        })
    
    def scrape(self):
        """Main scraping method for bike-components.de"""
        self.logger.info("Starting bike-components.de scraper")
        
        try:
            # Define component categories to scrape
            categories = self.get_component_categories()
            
            for category in categories:
                self.logger.info(f"Scraping category: {category['name']}")
                self.scrape_category(category)
                
                # Add delay between categories to be respectful
                time.sleep(random.uniform(2.0, 5.0))
            
            self.logger.info("bike-components.de scraping completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error in bike-components.de scraper: {str(e)}")
            raise
    
    def get_component_categories(self):
        """Define component categories to scrape from bike-components.de"""
        from config import COMPONENT_CATEGORIES, MAX_PAGES_PER_CATEGORY
        
        categories = []
        for key, config_data in COMPONENT_CATEGORIES.items():
            categories.append({
                'name': key.title(),
                'url': f"{self.base_url}{config_data['url_path']}",
                'category': config_data['db_category'],
                'max_pages': MAX_PAGES_PER_CATEGORY
            })
        
        return categories
    
    def scrape_category(self, category):
        """Scrape all products from a category"""
        try:
            page = 1
            max_pages = category.get('max_pages', 3)
            
            while page <= max_pages:
                self.logger.info(f"Scraping {category['name']} - Page {page}")
                
                # Construct page URL
                page_url = f"{category['url']}?page={page}"
                
                # Get page content
                html_content = self.get_page(page_url)
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # Find product links on the page
                product_links = self.extract_product_links(soup)
                
                if not product_links:
                    self.logger.info(f"No more products found on page {page}")
                    break
                
                # Scrape each product
                for product_link in product_links[:10]:  # Limit to 10 products per page for testing
                    try:
                        product_url = urljoin(self.base_url, product_link)
                        component_data = self.scrape_product(product_url, category['category'])
                        
                        if component_data:
                            self.save_component(component_data)
                            
                        # Add delay between products
                        time.sleep(random.uniform(1.0, 3.0))
                        
                    except Exception as e:
                        self.logger.error(f"Error scraping product {product_link}: {str(e)}")
                        continue
                
                page += 1
                
        except Exception as e:
            self.logger.error(f"Error scraping category {category['name']}: {str(e)}")
    
    def extract_product_links(self, soup):
        """Extract product links from category page"""
        product_links = []
        
        # Look for product links - these are common selectors for bike-components.de
        # You may need to adjust these selectors based on the actual HTML structure
        link_selectors = [
            'a[href*="/product/"]',
            '.product-item a',
            '.product-link',
            'a[href*="/en/"]'
        ]
        
        for selector in link_selectors:
            links = soup.select(selector)
            if links:
                for link in links:
                    href = link.get('href')
                    if href and '/product/' in href:
                        product_links.append(href)
                break
        
        # Remove duplicates
        product_links = list(set(product_links))
        
        self.logger.info(f"Found {len(product_links)} product links")
        return product_links
    
    def scrape_product(self, product_url, category):
        """Scrape individual product details"""
        try:
            self.logger.info(f"Scraping product: {product_url}")
            
            html_content = self.get_page(product_url)
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Extract basic product information
            product_data = self.extract_basic_info(soup, category)
            
            if not product_data:
                return None
            
            # Extract specifications based on category
            specifications = self.extract_specifications(soup, category)
            product_data['specifications'] = json.dumps(specifications)
            
            # Extract additional details
            product_data.update(self.extract_additional_details(soup))
            
            return product_data
            
        except Exception as e:
            self.logger.error(f"Error scraping product {product_url}: {str(e)}")
            return None
    
    def extract_basic_info(self, soup, category):
        """Extract basic product information"""
        try:
            # Extract product name - try multiple selectors
            name_selectors = [
                'h1.product-title',
                'h1',
                '.product-name',
                '.title'
            ]
            
            name = None
            for selector in name_selectors:
                element = soup.select_one(selector)
                if element:
                    name = element.get_text(strip=True)
                    break
            
            if not name:
                self.logger.warning("Could not extract product name")
                return None
            
            # Extract brand from name or separate element
            brand = self.extract_brand(name, soup)
            
            # Clean up the model name
            model = self.clean_model_name(name, brand)
            
            return {
                'name': name,
                'brand': brand,
                'model': model,
                'category': category,
            }
            
        except Exception as e:
            self.logger.error(f"Error extracting basic info: {str(e)}")
            return None
    
    def extract_brand(self, product_name, soup):
        """Extract brand from product name or page"""
        # Common bike component brands
        brands = [
            'Shimano', 'SRAM', 'Campagnolo', 'FSA', 'Race Face', 'Rotor',
            'Easton', 'Zipp', 'DT Swiss', 'Hope', 'Magura', 'Avid',
            'Formula', 'Hayes', 'TRP', 'Tektro', 'Clarks', 'Jagwire',
            'Canyon', 'Trek', 'Specialized', 'Giant', 'Scott', 'Cannondale',
            'Bianchi', 'Pinarello', 'Cervelo', 'BMC', 'Orbea', 'Merida'
        ]
        
        # Try to find brand in product name
        for brand in brands:
            if brand.lower() in product_name.lower():
                return brand
        
        # Try to find brand in separate element
        brand_selectors = [
            '.brand',
            '.manufacturer',
            '[data-brand]'
        ]
        
        for selector in brand_selectors:
            element = soup.select_one(selector)
            if element:
                brand_text = element.get_text(strip=True)
                for brand in brands:
                    if brand.lower() in brand_text.lower():
                        return brand
        
        # Default to extracting first word if no known brand found
        return product_name.split()[0] if product_name else 'Unknown'
    
    def clean_model_name(self, full_name, brand):
        """Clean model name by removing brand"""
        if brand and brand.lower() in full_name.lower():
            # Remove brand from the beginning of the name
            model = re.sub(rf'^{re.escape(brand)}\s*', '', full_name, flags=re.IGNORECASE)
            return model.strip()
        return full_name
    
    def extract_specifications(self, soup, category):
        """Extract specifications based on component category"""
        specs = {}
        
        # Look for specification tables or lists
        spec_selectors = [
            '.specifications',
            '.product-specs',
            '.tech-specs',
            '.details',
            'table',
            '.spec-table'
        ]
        
        for selector in spec_selectors:
            spec_element = soup.select_one(selector)
            if spec_element:
                specs.update(self.parse_spec_table(spec_element))
                break
        
        # Category-specific specification extraction
        if category == 'crankset':
            specs.update(self.extract_crankset_specs(soup))
        elif category == 'cassette':
            specs.update(self.extract_cassette_specs(soup))
        elif category == 'derailleur':
            specs.update(self.extract_derailleur_specs(soup))
        elif category == 'brakes':
            specs.update(self.extract_brakes_specs(soup))
        elif category == 'frame':
            specs.update(self.extract_frame_specs(soup))
        
        return specs
    
    def parse_spec_table(self, spec_element):
        """Parse specification table or list"""
        specs = {}
        
        # Try to parse as table
        rows = spec_element.select('tr')
        if rows:
            for row in rows:
                cells = row.select('td, th')
                if len(cells) >= 2:
                    key = cells[0].get_text(strip=True)
                    value = cells[1].get_text(strip=True)
                    if key and value:
                        specs[self.normalize_spec_key(key)] = value
        
        # Try to parse as definition list
        dt_elements = spec_element.select('dt')
        dd_elements = spec_element.select('dd')
        if len(dt_elements) == len(dd_elements):
            for dt, dd in zip(dt_elements, dd_elements):
                key = dt.get_text(strip=True)
                value = dd.get_text(strip=True)
                if key and value:
                    specs[self.normalize_spec_key(key)] = value
        
        return specs
    
    def normalize_spec_key(self, key):
        """Normalize specification key"""
        # Convert to lowercase and replace spaces with underscores
        normalized = re.sub(r'[^\w\s]', '', key.lower())
        normalized = re.sub(r'\s+', '_', normalized)
        return normalized
    
    def extract_crankset_specs(self, soup):
        """Extract crankset-specific specifications"""
        specs = {}
        
        # Look for common crankset specifications in the text
        text_content = soup.get_text().lower()
        
        # Extract chainring sizes
        chainring_pattern = r'(\d+)t?\s*[/x]\s*(\d+)t?'
        chainring_match = re.search(chainring_pattern, text_content)
        if chainring_match:
            specs['chainring_sizes'] = [int(chainring_match.group(1)), int(chainring_match.group(2))]
        
        # Extract crank length
        length_pattern = r'(\d+(?:\.\d+)?)\s*mm.*crank'
        length_match = re.search(length_pattern, text_content)
        if length_match:
            specs['crank_length'] = float(length_match.group(1))
        
        # Extract spindle type
        if 'hollowtech' in text_content:
            specs['spindle_type'] = 'Hollowtech II'
        elif 'dub' in text_content:
            specs['spindle_type'] = 'DUB'
        elif 'bb30' in text_content:
            specs['spindle_type'] = 'BB30'
        
        return specs
    
    def extract_cassette_specs(self, soup):
        """Extract cassette-specific specifications"""
        specs = {}
        
        text_content = soup.get_text().lower()
        
        # Extract speed count
        speed_pattern = r'(\d+)\s*speed'
        speed_match = re.search(speed_pattern, text_content)
        if speed_match:
            specs['speeds'] = int(speed_match.group(1))
        
        # Extract cassette range
        range_pattern = r'(\d+)\s*-\s*(\d+)t?'
        range_match = re.search(range_pattern, text_content)
        if range_match:
            specs['range'] = f"{range_match.group(1)}-{range_match.group(2)}T"
        
        # Extract freehub type
        if 'shimano' in text_content and 'hg' in text_content:
            specs['freehub_type'] = 'Shimano HG'
        elif 'sram' in text_content and 'xd' in text_content:
            specs['freehub_type'] = 'SRAM XD'
        
        return specs
    
    def extract_derailleur_specs(self, soup):
        """Extract derailleur-specific specifications"""
        specs = {}
        
        text_content = soup.get_text().lower()
        
        # Extract speed count
        speed_pattern = r'(\d+)\s*speed'
        speed_match = re.search(speed_pattern, text_content)
        if speed_match:
            specs['speeds'] = int(speed_match.group(1))
        
        # Extract max cog size
        cog_pattern = r'max.*?(\d+)t'
        cog_match = re.search(cog_pattern, text_content)
        if cog_match:
            specs['max_cog_size'] = int(cog_match.group(1))
        
        # Determine type
        if 'rear' in text_content:
            specs['derailleur_type'] = 'rear'
        elif 'front' in text_content:
            specs['derailleur_type'] = 'front'
        
        return specs
    
    def extract_brakes_specs(self, soup):
        """Extract brakes-specific specifications"""
        specs = {}
        
        text_content = soup.get_text().lower()
        
        # Extract brake type
        if 'hydraulic' in text_content:
            specs['brake_type'] = 'hydraulic_disc'
        elif 'mechanical' in text_content:
            specs['brake_type'] = 'mechanical_disc'
        elif 'rim' in text_content:
            specs['brake_type'] = 'rim'
        
        # Extract mount type
        if 'flat mount' in text_content:
            specs['mount_type'] = 'flat_mount'
        elif 'post mount' in text_content:
            specs['mount_type'] = 'post_mount'
        
        # Extract rotor sizes
        rotor_pattern = r'(\d+)mm.*rotor'
        rotor_matches = re.findall(rotor_pattern, text_content)
        if rotor_matches:
            specs['rotor_size_compatibility'] = [int(size) for size in rotor_matches]
        
        return specs
    
    def extract_frame_specs(self, soup):
        """Extract frame-specific specifications"""
        specs = {}
        
        text_content = soup.get_text().lower()
        
        # Extract frame type
        if 'road' in text_content:
            specs['frame_type'] = 'road'
        elif 'mountain' in text_content or 'mtb' in text_content:
            specs['frame_type'] = 'mountain'
        elif 'gravel' in text_content:
            specs['frame_type'] = 'gravel'
        
        # Extract material
        if 'carbon' in text_content:
            specs['material'] = 'carbon'
        elif 'aluminum' in text_content or 'aluminium' in text_content:
            specs['material'] = 'aluminum'
        elif 'steel' in text_content:
            specs['material'] = 'steel'
        
        return specs
    
    def extract_additional_details(self, soup):
        """Extract additional product details"""
        details = {}
        
        # Extract price
        price_selectors = [
            '.price',
            '.product-price',
            '[data-price]',
            '.cost'
        ]
        
        for selector in price_selectors:
            price_element = soup.select_one(selector)
            if price_element:
                price_text = price_element.get_text(strip=True)
                # Extract numeric price
                price_match = re.search(r'[\d,]+\.?\d*', price_text)
                if price_match:
                    details['price_range'] = f"€{price_match.group()}"
                break
        
        # Extract description
        desc_selectors = [
            '.product-description',
            '.description',
            '.product-details p',
            '.summary'
        ]
        
        for selector in desc_selectors:
            desc_element = soup.select_one(selector)
            if desc_element:
                description = desc_element.get_text(strip=True)
                if len(description) > 50:  # Only use substantial descriptions
                    details['description'] = description[:500]  # Limit length
                break
        
        return details