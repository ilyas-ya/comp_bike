#!/usr/bin/env python3
"""
Quick test to verify the updated URLs are working
"""

import requests
from config import COMPONENT_CATEGORIES, BASE_URL

def test_category_urls():
    """Test all category URLs to make sure they're accessible"""
    print("=== Testing Category URLs ===\n")
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })
    
    results = []
    
    for category_name, config_data in COMPONENT_CATEGORIES.items():
        url = f"{BASE_URL}{config_data['url_path']}"
        print(f"Testing {category_name}: {url}")
        
        try:
            response = session.get(url, timeout=30)
            status = response.status_code
            content_length = len(response.text)
            
            if status == 200:
                print(f"  ✅ SUCCESS: HTTP {status}, Content: {content_length} chars")
                
                # Check if it looks like a product listing page
                content_lower = response.text.lower()
                product_indicators = ['product', 'price', '€', 'add to cart', 'shimano', 'sram']
                found_indicators = [indicator for indicator in product_indicators if indicator in content_lower]
                
                if found_indicators:
                    print(f"  📦 Product indicators found: {', '.join(found_indicators[:3])}...")
                    results.append((category_name, True, f"HTTP {status}"))
                else:
                    print(f"  ⚠️  No product indicators found")
                    results.append((category_name, False, f"HTTP {status} but no products"))
            else:
                print(f"  ❌ FAILED: HTTP {status}")
                results.append((category_name, False, f"HTTP {status}"))
                
        except Exception as e:
            print(f"  ❌ ERROR: {str(e)}")
            results.append((category_name, False, f"Error: {str(e)[:50]}"))
        
        print()
    
    # Summary
    print("=" * 50)
    print("SUMMARY")
    print("=" * 50)
    
    successful = 0
    for category, success, message in results:
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {category}: {message}")
        if success:
            successful += 1
    
    print(f"\nSuccessful: {successful}/{len(results)} categories")
    
    if successful == len(results):
        print("🎉 All category URLs are working!")
    else:
        print("⚠️  Some URLs need attention.")

if __name__ == "__main__":
    test_category_urls()