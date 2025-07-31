#!/usr/bin/env python3
"""
Test script to scrape real data and save to database
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger

def test_database_schema():
    """Test if the database schema is properly set up"""
    print("=== Testing Database Schema ===")
    
    try:
        db = DatabaseConnection()
        
        # Test if tables exist
        tables_query = """
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('components_component', 'compatibility_link')
        """
        
        tables = db.execute_query(tables_query)
        table_names = [table['table_name'] for table in tables]
        
        print(f"Found tables: {table_names}")
        
        if 'components_component' in table_names:
            print("✅ components_component table exists")
            
            # Check table structure
            columns_query = """
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'components_component'
                ORDER BY ordinal_position
            """
            
            columns = db.execute_query(columns_query)
            print("Table structure:")
            for col in columns:
                print(f"  - {col['column_name']}: {col['data_type']}")
        else:
            print("❌ components_component table missing")
        
        if 'compatibility_link' in table_names:
            print("✅ compatibility_link table exists")
        else:
            print("❌ compatibility_link table missing")
        
        # Test sample data
        count_query = "SELECT COUNT(*) as count FROM components_component"
        result = db.execute_query(count_query)
        count = result[0]['count']
        print(f"Current components in database: {count}")
        
        if count > 0:
            sample_query = "SELECT brand, model, type, speed FROM components_component LIMIT 5"
            samples = db.execute_query(sample_query)
            print("Sample components:")
            for sample in samples:
                print(f"  - {sample['brand']} {sample['model']} ({sample['type']}) - {sample['speed']} speed")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Database schema test failed: {e}")
        return False

def scrape_and_save_real_data(max_products_per_category=5):
    """Scrape real data and save to database"""
    print(f"\n=== Scraping Real Data (max {max_products_per_category} per category) ===")
    
    try:
        db = DatabaseConnection()
        scraper = BikeComponentsDEScraper(db)
        
        # Get categories to scrape
        categories = scraper.get_component_categories()
        
        total_scraped = 0
        
        for category in categories[:2]:  # Limit to first 2 categories for testing
            print(f"\n--- Scraping {category['name']} ---")
            print(f"URL: {category['url']}")
            
            try:
                # Get category page
                html_content = scraper.get_page(category['url'])
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # Extract product links
                product_links = scraper.extract_product_links(soup)
                print(f"Found {len(product_links)} product links")
                
                if not product_links:
                    print("❌ No product links found, skipping category")
                    continue
                
                # Scrape limited number of products
                scraped_count = 0
                for i, product_link in enumerate(product_links[:max_products_per_category]):
                    try:
                        if product_link.startswith('/'):
                            product_url = f"https://www.bike-components.de{product_link}"
                        else:
                            product_url = product_link
                        
                        print(f"\n  Scraping product {i+1}/{max_products_per_category}: {product_url}")
                        
                        # Scrape product data
                        component_data = scraper.scrape_product(product_url, category['category'])
                        
                        if component_data:
                            # Save to database
                            component_id = scraper.save_component(component_data)
                            
                            if component_id:
                                print(f"    ✅ Saved: {component_data['brand']} {component_data['model']}")
                                print(f"       ID: {component_id}")
                                print(f"       Type: {component_data['type']}")
                                print(f"       Speed: {component_data.get('speed', 'N/A')}")
                                
                                # Show key specs
                                specs = component_data.get('specs', {})
                                if isinstance(specs, str):
                                    import json
                                    try:
                                        specs = json.loads(specs)
                                    except:
                                        specs = {}
                                
                                key_specs = []
                                for key in ['driver_body', 'spindle_type', 'range', 'mount_type']:
                                    if key in specs:
                                        key_specs.append(f"{key}: {specs[key]}")
                                
                                if key_specs:
                                    print(f"       Key specs: {', '.join(key_specs)}")
                                
                                scraped_count += 1
                                total_scraped += 1
                            else:
                                print(f"    ❌ Failed to save component")
                        else:
                            print(f"    ❌ Failed to extract component data")
                        
                        # Small delay between products
                        import time
                        time.sleep(2)
                        
                    except Exception as e:
                        print(f"    ❌ Error scraping product {i+1}: {str(e)}")
                        continue
                
                print(f"\n--- {category['name']} Summary ---")
                print(f"Successfully scraped: {scraped_count}/{max_products_per_category} products")
                
            except Exception as e:
                print(f"❌ Error scraping category {category['name']}: {str(e)}")
                continue
        
        print(f"\n=== Scraping Complete ===")
        print(f"Total products scraped: {total_scraped}")
        
        db.close()
        return total_scraped
        
    except Exception as e:
        print(f"❌ Scraping failed: {e}")
        return 0

def verify_scraped_data():
    """Verify the scraped data in the database"""
    print(f"\n=== Verifying Scraped Data ===")
    
    try:
        db = DatabaseConnection()
        
        # Get total count
        count_query = "SELECT COUNT(*) as count FROM components_component"
        result = db.execute_query(count_query)
        total_count = result[0]['count']
        print(f"Total components in database: {total_count}")
        
        # Get count by type
        type_query = """
            SELECT type, COUNT(*) as count 
            FROM components_component 
            GROUP BY type 
            ORDER BY count DESC
        """
        
        type_counts = db.execute_query(type_query)
        print("\nComponents by type:")
        for type_count in type_counts:
            print(f"  {type_count['type']}: {type_count['count']}")
        
        # Get count by brand
        brand_query = """
            SELECT brand, COUNT(*) as count 
            FROM components_component 
            GROUP BY brand 
            ORDER BY count DESC
            LIMIT 10
        """
        
        brand_counts = db.execute_query(brand_query)
        print("\nTop brands:")
        for brand_count in brand_counts:
            print(f"  {brand_count['brand']}: {brand_count['count']}")
        
        # Show recent additions
        recent_query = """
            SELECT brand, model, type, speed, created_at
            FROM components_component 
            ORDER BY created_at DESC 
            LIMIT 10
        """
        
        recent = db.execute_query(recent_query)
        print("\nRecent additions:")
        for item in recent:
            print(f"  {item['brand']} {item['model']} ({item['type']}) - {item['speed']} speed")
        
        # Show components with interesting specs
        specs_query = """
            SELECT brand, model, type, specs
            FROM components_component 
            WHERE specs != '{}'::jsonb
            LIMIT 5
        """
        
        specs_items = db.execute_query(specs_query)
        print("\nComponents with detailed specs:")
        for item in specs_items:
            print(f"  {item['brand']} {item['model']} ({item['type']})")
            specs = item['specs']
            if specs:
                # Show first few spec keys
                spec_keys = list(specs.keys())[:3]
                spec_preview = {k: specs[k] for k in spec_keys}
                print(f"    Specs: {spec_preview}")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Data verification failed: {e}")
        return False

def main():
    """Main test function"""
    print("=== Real Database Scraping Test ===\n")
    
    # Test 1: Check database schema
    if not test_database_schema():
        print("❌ Database schema test failed. Please check your database setup.")
        return
    
    # Test 2: Scrape real data
    scraped_count = scrape_and_save_real_data(max_products_per_category=3)
    
    if scraped_count == 0:
        print("❌ No data was scraped. Please check the scraper configuration.")
        return
    
    # Test 3: Verify scraped data
    if not verify_scraped_data():
        print("❌ Data verification failed.")
        return
    
    print("\n🎉 Real database scraping test completed successfully!")
    print(f"✅ Scraped {scraped_count} components")
    print("✅ Data saved to database")
    print("✅ Data verified")

if __name__ == "__main__":
    main()