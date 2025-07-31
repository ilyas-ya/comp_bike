#!/usr/bin/env python3
"""
Debug script to inspect the actual HTML structure of bike-components.de
"""

import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

def debug_page_structure():
    """Debug the actual HTML structure to find correct selectors"""
    
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
    
    url = "https://www.bike-components.de/en/components/drivetrain/cranks/"
    print(f"Debugging: {url}")
    
    try:
        response = session.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Content Length: {len(response.text)} characters")
        
        if response.status_code != 200:
            print(f"❌ Failed to fetch page: HTTP {response.status_code}")
            return
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Print page title
        title = soup.find('title')
        print(f"Page Title: {title.string if title else 'No title found'}")
        
        # Look for all links
        all_links = soup.find_all('a', href=True)
        print(f"\nTotal links found: {len(all_links)}")
        
        # Analyze link patterns
        link_patterns = {}
        for link in all_links:
            href = link.get('href', '')
            if href:
                # Categorize links
                if '/en/' in href and any(keyword in href.lower() for keyword in ['product', 'item', 'component']):
                    pattern = 'product_related'
                elif href.startswith('/en/'):
                    pattern = 'internal_en'
                elif href.startswith('/'):
                    pattern = 'internal_other'
                elif href.startswith('http'):
                    pattern = 'external'
                else:
                    pattern = 'other'
                
                if pattern not in link_patterns:
                    link_patterns[pattern] = []
                link_patterns[pattern].append(href)
        
        # Print link analysis
        print("\n--- Link Pattern Analysis ---")
        for pattern, links in link_patterns.items():
            print(f"{pattern}: {len(links)} links")
            if pattern in ['product_related', 'internal_en'] and links:
                print("  Sample links:")
                for link in links[:5]:  # Show first 5
                    print(f"    {link}")
        
        # Look for specific product-related elements
        print("\n--- Product Element Analysis ---")
        
        # Common product container selectors
        product_selectors = [
            '.product',
            '.item',
            '.tile',
            '.card',
            '.listing-item',
            '.product-item',
            '.product-tile',
            '[data-product]',
            '.bc-product',
            '.component'
        ]
        
        for selector in product_selectors:
            elements = soup.select(selector)
            if elements:
                print(f"Found {len(elements)} elements with selector: {selector}")
                
                # Look for links within these elements
                for i, element in enumerate(elements[:3]):  # First 3 elements
                    links_in_element = element.find_all('a', href=True)
                    if links_in_element:
                        print(f"  Element {i+1} contains {len(links_in_element)} links:")
                        for link in links_in_element[:2]:  # First 2 links
                            href = link.get('href')
                            text = link.get_text(strip=True)[:50]
                            print(f"    {href} - {text}")
        
        # Look for JavaScript-rendered content indicators
        print("\n--- JavaScript Content Analysis ---")
        scripts = soup.find_all('script')
        js_indicators = ['product', 'item', 'listing', 'catalog']
        
        for indicator in js_indicators:
            count = sum(1 for script in scripts if script.string and indicator in script.string.lower())
            if count > 0:
                print(f"'{indicator}' found in {count} script tags")
        
        # Check for common e-commerce platforms
        ecommerce_indicators = [
            'shopware', 'magento', 'woocommerce', 'prestashop', 'opencart'
        ]
        
        html_lower = response.text.lower()
        for indicator in ecommerce_indicators:
            if indicator in html_lower:
                print(f"E-commerce platform detected: {indicator}")
        
        # Print raw HTML sample for manual inspection
        print(f"\n--- Raw HTML Sample (first 2000 chars) ---")
        print(response.text[:2000])
        print("...")
        
        # Look for pagination or "load more" indicators
        pagination_selectors = ['.pagination', '.pager', '.load-more', '.next-page']
        for selector in pagination_selectors:
            elements = soup.select(selector)
            if elements:
                print(f"Pagination found: {selector} ({len(elements)} elements)")
        
    except Exception as e:
        print(f"❌ Error debugging page: {e}")

if __name__ == "__main__":
    debug_page_structure()