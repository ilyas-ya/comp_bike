import time
import random
from abc import ABC, abstractmethod
import requests
from fake_useragent import UserAgent
from utils.logger import setup_logger

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
            'Accept': 'text/html,application/xhtml+xml,application/xml',
            'Accept-Language': 'en-US,en;q=0.9',
        })
    
    @abstractmethod
    def scrape(self):
        """Main scraping method to be implemented by subclasses"""
        pass
    
    def get_page(self, url, params=None, retry_count=3, retry_delay=2):
        """Get page content with retry logic"""
        for attempt in range(retry_count):
            try:
                # Randomize user agent for each request
                self.session.headers.update({'User-Agent': self.user_agent.random})
                
                response = self.session.get(url, params=params, timeout=30)
                response.raise_for_status()
                
                # Add random delay to avoid rate limiting
                time.sleep(random.uniform(1.0, 3.0))
                
                return response.text
                
            except requests.exceptions.RequestException as e:
                self.logger.error(f"Error fetching {url}: {str(e)}")
                
                if attempt < retry_count - 1:
                    sleep_time = retry_delay * (attempt + 1)
                    self.logger.info(f"Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
                else:
                    self.logger.error(f"Failed to fetch {url} after {retry_count} attempts")
                    raise
    
    def save_component(self, component_data):
        """Save component data to database"""
        try:
            # Check if component already exists
            query = """
                SELECT id FROM components_component 
                WHERE brand = %(brand)s AND name = %(name)s
            """
            result = self.db.execute_query(query, component_data)
            
            if result:
                # Update existing component
                component_id = result[0]['id']
                self.logger.info(f"Updating existing component ID {component_id}")
                
                update_query = """
                    UPDATE components_component
                    SET specifications = %(specifications)s,
                        price_range = %(price_range)s,
                        description = %(description)s,
                        updated_at = NOW()
                    WHERE id = %(id)s
                """
                component_data['id'] = component_id
                self.db.execute_query(update_query, component_data, fetch=False)
                
            else:
                # Insert new component
                self.logger.info(f"Inserting new component: {component_data['brand']} {component_data['name']}")
                
                insert_query = """
                    INSERT INTO components_component
                    (name, brand, model, category, specifications, price_range, description, created_at, updated_at, is_active)
                    VALUES
                    (%(name)s, %(brand)s, %(model)s, %(category)s, %(specifications)s, %(price_range)s, %(description)s, NOW(), NOW(), true)
                    RETURNING id
                """
                result = self.db.execute_query(insert_query, component_data)
                component_id = result[0]['id']
            
            self.db.commit()
            return component_id
            
        except Exception as e:
            self.db.rollback()
            self.logger.error(f"Error saving component: {str(e)}")
            raise