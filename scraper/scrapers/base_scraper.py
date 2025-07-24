"""
Base scraper class for bike component data collection
"""

import time
import random
import json
from abc import ABC, abstractmethod
import requests
from fake_useragent import UserAgent
from utils.logger import setup_logger
from config import MIN_DELAY, MAX_DELAY, MAX_RETRIES

class BaseScraper(ABC):
    """Base class for all scrapers"""
    
    def __init__(self, db_connection):
        """Initialize base scraper with database connection"""
        self.db = db_connection
        self.logger = setup_logger(self.__class__.__name__)
        self.user_agent = UserAgent()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': self.user_agent.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
    
    @abstractmethod
    def scrape(self):
        """Main scraping method to be implemented by subclasses"""
        pass
    
    def get_page(self, url, params=None, retry_count=MAX_RETRIES):
        """Get page content with retry logic and rate limiting"""
        for attempt in range(retry_count):
            try:
                # Randomize user agent for each request
                self.session.headers.update({'User-Agent': self.user_agent.random})
                
                self.logger.debug(f"Fetching: {url} (attempt {attempt + 1})")
                
                response = self.session.get(url, params=params, timeout=30)
                response.raise_for_status()
                
                # Add random delay to avoid rate limiting
                delay = random.uniform(MIN_DELAY, MAX_DELAY)
                time.sleep(delay)
                
                return response.text
                
            except requests.exceptions.RequestException as e:
                self.logger.warning(f"Error fetching {url} (attempt {attempt + 1}): {str(e)}")
                
                if attempt < retry_count - 1:
                    sleep_time = (attempt + 1) * 2  # Exponential backoff
                    self.logger.info(f"Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
                else:
                    self.logger.error(f"Failed to fetch {url} after {retry_count} attempts")
                    raise
    
    def save_component(self, component_data):
        """Save component data to database"""
        try:
            # Validate required fields
            required_fields = ['name', 'brand', 'category']
            for field in required_fields:
                if not component_data.get(field):
                    self.logger.warning(f"Missing required field '{field}' in component data")
                    return False
            
            # Check if component already exists
            check_query = """
                SELECT id FROM components_component 
                WHERE brand = %(brand)s AND name = %(name)s AND category = %(category)s
            """
            
            existing = self.db.execute_query(check_query, {
                'brand': component_data['brand'],
                'name': component_data['name'],
                'category': component_data['category']
            })
            
            if existing:
                # Update existing component
                component_id = existing[0]['id']
                self.logger.info(f"Updating existing component: {component_data['brand']} {component_data['name']}")
                
                update_query = """
                    UPDATE components_component
                    SET specifications = %(specifications)s,
                        price_range = %(price_range)s,
                        description = %(description)s,
                        updated_at = NOW()
                    WHERE id = %(id)s
                """
                
                update_data = {
                    'id': component_id,
                    'specifications': component_data.get('specifications', '{}'),
                    'price_range': component_data.get('price_range', ''),
                    'description': component_data.get('description', '')
                }
                
                self.db.execute_query(update_query, update_data, fetch=False)
                
            else:
                # Insert new component
                self.logger.info(f"Inserting new component: {component_data['brand']} {component_data['name']}")
                
                insert_query = """
                    INSERT INTO components_component
                    (name, brand, model, category, specifications, price_range, description, 
                     created_at, updated_at, is_active)
                    VALUES
                    (%(name)s, %(brand)s, %(model)s, %(category)s, %(specifications)s, 
                     %(price_range)s, %(description)s, NOW(), NOW(), true)
                    RETURNING id
                """
                
                insert_data = {
                    'name': component_data['name'],
                    'brand': component_data['brand'],
                    'model': component_data.get('model', ''),
                    'category': component_data['category'],
                    'specifications': component_data.get('specifications', '{}'),
                    'price_range': component_data.get('price_range', ''),
                    'description': component_data.get('description', '')
                }
                
                result = self.db.execute_query(insert_query, insert_data)
                component_id = result[0]['id'] if result else None
            
            self.db.commit()
            return component_id
            
        except Exception as e:
            self.db.rollback()
            self.logger.error(f"Error saving component {component_data.get('name', 'Unknown')}: {str(e)}")
            return False
    
    def clean_text(self, text):
        """Clean and normalize text"""
        if not text:
            return ""
        
        # Remove extra whitespace and normalize
        cleaned = ' '.join(text.split())
        return cleaned.strip()
    
    def extract_price(self, price_text):
        """Extract price from text"""
        if not price_text:
            return ""
        
        import re
        # Look for price patterns like €123.45, 123,45 €, etc.
        price_patterns = [
            r'€\s*(\d+(?:[.,]\d{2})?)',
            r'(\d+(?:[.,]\d{2})?)\s*€',
            r'(\d+(?:[.,]\d{2})?)\s*EUR'
        ]
        
        for pattern in price_patterns:
            match = re.search(pattern, price_text)
            if match:
                price = match.group(1).replace(',', '.')
                return f"€{price}"
        
        return ""
    
    def normalize_category(self, category):
        """Normalize category name to match database categories"""
        category_mapping = {
            'crankset': 'crankset',
            'cranksets': 'crankset',
            'cassette': 'cassette',
            'cassettes': 'cassette',
            'derailleur': 'derailleur',
            'derailleurs': 'derailleur',
            'brake': 'brakes',
            'brakes': 'brakes',
            'frame': 'frame',
            'frames': 'frame'
        }
        
        return category_mapping.get(category.lower(), category)