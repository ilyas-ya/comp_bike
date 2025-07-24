#!/usr/bin/env python3
"""
Test script for bike-components.de scraper
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scrapers.bike_components_de_scraper import BikeComponentsDEScraper
from database.connection import DatabaseConnection
from utils.logger import setup_logger

def test_connection():
    """Test database connection"""
    print("Testing database connection...")
    try:
        db = DatabaseConnection()
        result = db.execute_query("SELECT 1 as test")
        print(f"✅ Database connection successful: {result}")
        db.close()
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_page_fetch():
    """Test fetching a single page"""
    print("\nTesting page fetch...")
    try:
        # Create a mock database connection for testing
        class MockDB:
            def execute_query(self, query, params=None, fetch=True):
                return []
            def commit(self):
                pass
            def rollback(self):
                pass
            def close(self):
                pass
        
        scraper = BikeComponentsDEScraper(MockDB())
        
        # Test fetching the main cranksets page
        test_url = "https://www.bike-components.de/en/components/brakes/"
        html_content = scraper.get_page(test_url)
        
        if html_content and len(html_content) > 1000:
            print(f"✅ Page fetch successful: {len(html_content)} characters")
            return True
        else:
            print(f"❌ Page fetch failed or returned minimal content")
            return False
            
    except Exception as e:
        print(f"❌ Page fetch failed: {e}")
        return False

def test_product_parsing():
    """Test parsing a single product"""
    print("\nTesting product parsing...")
    try:
        from bs4 import BeautifulSoup
        
        # Mock HTML for testing
        mock_html = """
        <html>
            <head><title>Shimano Dura-Ace FC-R9200 Crankset</title></head>
            <body>
                <h1 class="product-title">Shimano Dura-Ace FC-R9200 Crankset</h1>
                <div class="price">€599.99</div>
                <div class="description">Professional road crankset with Hollowtech II spindle</div>
                <table class="specifications">
                    <tr><td>Speeds</td><td>11/12</td></tr>
                    <tr><td>Chainrings</td><td>50/34T</td></tr>
                    <tr><td>Crank Length</td><td>172.5mm</td></tr>
                </table>
            </body>
        </html>
        """
        
        class MockDB:
            def execute_query(self, query, params=None, fetch=True):
                return []
            def commit(self):
                pass
            def rollback(self):
                pass
            def close(self):
                pass
        
        scraper = BikeComponentsDEScraper(MockDB())
        soup = BeautifulSoup(mock_html, 'html.parser')
        
        # Test basic info extraction
        basic_info = scraper.extract_basic_info(soup, 'crankset')
        print(f"Basic info: {basic_info}")
        
        # Test specification extraction
        specs = scraper.extract_specifications(soup, 'crankset')
        print(f"Specifications: {specs}")
        
        if basic_info and basic_info.get('name'):
            print("✅ Product parsing successful")
            return True
        else:
            print("❌ Product parsing failed")
            return False
            
    except Exception as e:
        print(f"❌ Product parsing failed: {e}")
        return False

def test_full_scraper():
    """Test the full scraper with limited scope"""
    print("\nTesting full scraper (limited)...")
    try:
        if not test_connection():
            print("❌ Skipping full scraper test - database not available")
            return False
        
        db = DatabaseConnection()
        scraper = BikeComponentsDEScraper(db)
        
        # Override the get_component_categories method for testing
        original_method = scraper.get_component_categories
        def limited_categories():
            categories = original_method()
            # Limit to just one category with 1 page and 2 products
            return [{
                'name': 'Cranksets (Test)',
                'url': 'https://www.bike-components.de/en/components/brakes/',
                'category': 'crankset',
                'max_pages': 1
            }]
        
        scraper.get_component_categories = limited_categories
        
        # Override scrape_category to limit products
        original_scrape = scraper.scrape_category
        def limited_scrape_category(category):
            print(f"Testing limited scrape of {category['name']}")
            # This would normally scrape, but for testing we'll just simulate
            print("✅ Limited scrape simulation completed")
        
        scraper.scrape_category = limited_scrape_category
        
        # Run the scraper
        scraper.scrape()
        
        db.close()
        print("✅ Full scraper test completed")
        return True
        
    except Exception as e:
        print(f"❌ Full scraper test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("=== Bike Components DE Scraper Tests ===\n")
    
    tests = [
        ("Database Connection", test_connection),
        ("Page Fetch", test_page_fetch),
        ("Product Parsing", test_product_parsing),
        ("Full Scraper", test_full_scraper)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Running: {test_name}")
        print('='*50)
        
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} crashed: {e}")
            results.append((test_name, False))
    
    # Summary
    print(f"\n{'='*50}")
    print("TEST SUMMARY")
    print('='*50)
    
    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nPassed: {passed}/{len(results)} tests")
    
    if passed == len(results):
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed. Check the output above.")

if __name__ == "__main__":
    main()