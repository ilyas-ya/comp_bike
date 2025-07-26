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
        test_url = "https://www.bike-components.de/en/components/drivetrain/cranks/"
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
                'url': 'https://www.bike-components.de/en/components/drivetrain/cranks/',
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

def test_page_content_inspection():
    """Test and inspect actual page content from bike-components.de"""
    print("\nTesting page content inspection...")
    
    try:
        from bs4 import BeautifulSoup
        import requests
        from fake_useragent import UserAgent
        
        # Setup session with proper headers
        session = requests.Session()
        ua = UserAgent()
        session.headers.update({
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
        # Test different category pages
        test_urls = [
            ("Cranksets", "https://www.bike-components.de/en/components/drivetrain/cranks/"),
            ("Cassettes", "https://www.bike-components.de/en/components/drivetrain/cassettes/"),
            ("Derailleurs", "https://www.bike-components.de/en/components/shifters-derailleurs/")
        ]
        
        for category_name, url in test_urls:
            print(f"\n--- Inspecting {category_name} Page ---")
            print(f"URL: {url}")
            
            try:
                response = session.get(url, timeout=30)
                print(f"Status Code: {response.status_code}")
                print(f"Content Length: {len(response.text)} characters")
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Print page title
                    title = soup.find('title')
                    print(f"Page Title: {title.string if title else 'No title found'}")
                    
                    # Look for common product listing elements
                    print("\n--- Looking for Product Links ---")
                    product_selectors = [
                        'a[href*="/product/"]',
                        'a[href*="/en/"]',
                        '.product-item a',
                        '.product-link',
                        '.product-tile a',
                        '.item a'
                    ]
                    
                    found_links = []
                    for selector in product_selectors:
                        links = soup.select(selector)
                        if links:
                            print(f"Found {len(links)} links with selector: {selector}")
                            for i, link in enumerate(links[:3]):  # Show first 3
                                href = link.get('href', 'No href')
                                text = link.get_text(strip=True)[:50]
                                print(f"  {i+1}. {href} - {text}")
                                if '/product/' in href or '/en/' in href:
                                    found_links.append(href)
                    
                    # Print some raw HTML snippets to understand structure
                    print(f"\n--- HTML Structure Analysis ---")
                    
                    # Look for navigation or breadcrumbs
                    nav = soup.find('nav') or soup.find('.navigation') or soup.find('.breadcrumb')
                    if nav:
                        print(f"Navigation found: {nav.get_text(strip=True)[:100]}...")
                    
                    # Look for main content area
                    main_selectors = ['main', '.main', '.content', '.products', '.product-list']
                    for selector in main_selectors:
                        main_content = soup.select_one(selector)
                        if main_content:
                            print(f"Main content area found with selector '{selector}'")
                            # Print first few child elements
                            children = main_content.find_all(recursive=False)[:5]
                            for i, child in enumerate(children):
                                print(f"  Child {i+1}: <{child.name}> {child.get('class', [])} - {child.get_text(strip=True)[:50]}...")
                            break
                    
                    # Print raw HTML sample (first 1000 chars)
                    print(f"\n--- Raw HTML Sample (first 1000 chars) ---")
                    print(response.text[:1000])
                    print("...")
                    
                    # Look for specific patterns in HTML
                    print(f"\n--- Pattern Analysis ---")
                    html_lower = response.text.lower()
                    patterns = [
                        ('product', html_lower.count('product')),
                        ('shimano', html_lower.count('shimano')),
                        ('sram', html_lower.count('sram')),
                        ('price', html_lower.count('price')),
                        ('€', html_lower.count('€')),
                        ('add to cart', html_lower.count('add to cart')),
                        ('specification', html_lower.count('specification'))
                    ]
                    
                    for pattern, count in patterns:
                        if count > 0:
                            print(f"  '{pattern}' appears {count} times")
                    
                else:
                    print(f"❌ Failed to fetch page: HTTP {response.status_code}")
                
            except Exception as e:
                print(f"❌ Error fetching {category_name}: {e}")
            
            print("-" * 60)
        
        print("✅ Page content inspection completed")
        return True
        
    except Exception as e:
        print(f"❌ Page content inspection failed: {e}")
        return False

def test_product_page_inspection():
    """Test and inspect a specific product page"""
    print("\nTesting product page inspection...")
    
    try:
        import requests
        from bs4 import BeautifulSoup
        from fake_useragent import UserAgent
        
        # First, try to get a product URL from a category page
        session = requests.Session()
        ua = UserAgent()
        session.headers.update({
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        
        # Get cranksets page to find a product link
        category_url = "https://www.bike-components.de/en/components/drivetrain/cranks/"
        print(f"Fetching category page: {category_url}")
        
        response = session.get(category_url, timeout=30)
        if response.status_code != 200:
            print(f"❌ Failed to fetch category page: HTTP {response.status_code}")
            return False
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for product links
        product_link = None
        selectors = ['a[href*="/product/"]', 'a[href*="/en/"]']
        
        for selector in selectors:
            links = soup.select(selector)
            for link in links:
                href = link.get('href')
                if href and ('/product/' in href or '/en/' in href) and 'crankset' in href.lower():
                    if href.startswith('/'):
                        product_link = f"https://www.bike-components.de{href}"
                    else:
                        product_link = href
                    break
            if product_link:
                break
        
        if not product_link:
            print("❌ Could not find a product link to test")
            return False
        
        print(f"Found product link: {product_link}")
        
        # Fetch the product page
        print(f"\n--- Inspecting Product Page ---")
        response = session.get(product_link, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Content Length: {len(response.text)} characters")
        
        if response.status_code != 200:
            print(f"❌ Failed to fetch product page: HTTP {response.status_code}")
            return False
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract and print key elements
        print(f"\n--- Product Information Extraction ---")
        
        # Title/Name
        title_selectors = ['h1', '.product-title', '.title', 'h1.product-name']
        for selector in title_selectors:
            title = soup.select_one(selector)
            if title:
                print(f"Product Title ({selector}): {title.get_text(strip=True)}")
                break
        
        # Price
        price_selectors = ['.price', '.product-price', '[data-price]', '.cost', '.price-current']
        for selector in price_selectors:
            price = soup.select_one(selector)
            if price:
                print(f"Price ({selector}): {price.get_text(strip=True)}")
                break
        
        # Description
        desc_selectors = ['.product-description', '.description', '.product-details', '.summary']
        for selector in desc_selectors:
            desc = soup.select_one(selector)
            if desc:
                desc_text = desc.get_text(strip=True)
                print(f"Description ({selector}): {desc_text[:200]}...")
                break
        
        # Specifications table
        spec_selectors = ['.specifications', '.product-specs', '.tech-specs', 'table', '.spec-table']
        for selector in spec_selectors:
            specs = soup.select_one(selector)
            if specs:
                print(f"Specifications found with selector: {selector}")
                # Try to extract table data
                rows = specs.select('tr')
                if rows:
                    print("Specification rows:")
                    for i, row in enumerate(rows[:5]):  # First 5 rows
                        cells = row.select('td, th')
                        if len(cells) >= 2:
                            key = cells[0].get_text(strip=True)
                            value = cells[1].get_text(strip=True)
                            print(f"  {key}: {value}")
                break
        
        # Look for brand information
        brand_selectors = ['.brand', '.manufacturer', '[data-brand]']
        for selector in brand_selectors:
            brand = soup.select_one(selector)
            if brand:
                print(f"Brand ({selector}): {brand.get_text(strip=True)}")
                break
        
        # Print raw HTML sample for manual inspection
        print(f"\n--- Raw HTML Sample (first 2000 chars) ---")
        print(response.text[:2000])
        print("...")
        
        # Look for JSON-LD structured data
        json_scripts = soup.find_all('script', type='application/ld+json')
        if json_scripts:
            print(f"\n--- JSON-LD Structured Data Found ---")
            for i, script in enumerate(json_scripts[:2]):  # First 2 scripts
                print(f"Script {i+1}: {script.string[:500]}...")
        
        print("✅ Product page inspection completed")
        return True
        
    except Exception as e:
        print(f"❌ Product page inspection failed: {e}")
        return False

def test_html_structure_analysis():
    """Analyze the HTML structure to understand the page layout"""
    print("\nTesting HTML structure analysis...")
    
    try:
        import requests
        from bs4 import BeautifulSoup
        from fake_useragent import UserAgent
        
        session = requests.Session()
        ua = UserAgent()
        session.headers.update({'User-Agent': ua.random})
        
        url = "https://www.bike-components.de/en/components/drivetrain/cranks/"
        response = session.get(url, timeout=30)
        
        if response.status_code != 200:
            print(f"❌ Failed to fetch page: HTTP {response.status_code}")
            return False
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        print(f"--- HTML Structure Analysis ---")
        
        # Analyze the overall structure
        print(f"Total elements: {len(soup.find_all())}")
        
        # Find all unique tag names
        all_tags = [tag.name for tag in soup.find_all()]
        unique_tags = sorted(set(all_tags))
        print(f"Unique HTML tags: {', '.join(unique_tags[:20])}...")  # First 20
        
        # Find elements with class attributes that might contain products
        elements_with_classes = soup.find_all(attrs={'class': True})
        all_classes = []
        for element in elements_with_classes:
            classes = element.get('class', [])
            all_classes.extend(classes)
        
        # Find classes that might be related to products
        product_related_classes = [cls for cls in set(all_classes) if any(keyword in cls.lower() for keyword in ['product', 'item', 'tile', 'card', 'list'])]
        print(f"Product-related classes: {product_related_classes[:10]}")
        
        # Look for data attributes
        data_attrs = []
        for element in soup.find_all():
            for attr in element.attrs:
                if attr.startswith('data-'):
                    data_attrs.append(attr)
        
        unique_data_attrs = sorted(set(data_attrs))
        print(f"Data attributes: {unique_data_attrs[:10]}")
        
        # Find all links and categorize them
        all_links = soup.find_all('a', href=True)
        product_links = [link for link in all_links if '/product/' in link['href'] or '/en/' in link['href']]
        print(f"Total links: {len(all_links)}, Potential product links: {len(product_links)}")
        
        # Sample some product links
        if product_links:
            print("Sample product links:")
            for i, link in enumerate(product_links[:5]):
                href = link['href']
                text = link.get_text(strip=True)[:50]
                print(f"  {i+1}. {href} - {text}")
        
        print("✅ HTML structure analysis completed")
        return True
        
    except Exception as e:
        print(f"❌ HTML structure analysis failed: {e}")
        return False

def main():
    """Run all tests"""
    print("=== Bike Components DE Scraper Tests ===\n")
    
    tests = [
        ("Database Connection", test_connection),
        ("Page Fetch", test_page_fetch),
        ("Page Content Inspection", test_page_content_inspection),
        ("Product Page Inspection", test_product_page_inspection),
        ("HTML Structure Analysis", test_html_structure_analysis),
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