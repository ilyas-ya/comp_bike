#!/usr/bin/env python3
"""
Monitor scraping progress in real-time
"""

import sys
import os
import time
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.connection import DatabaseConnection

def monitor_progress(refresh_interval=30):
    """Monitor scraping progress"""
    print("📊 Scraping Progress Monitor")
    print("=" * 50)
    print("Press Ctrl+C to stop monitoring\n")
    
    db = DatabaseConnection()
    last_count = 0
    start_time = time.time()
    
    try:
        while True:
            # Get current stats
            result = db.execute_query("SELECT COUNT(*) as count FROM components_component")
            current_count = result[0]['count']
            
            # Calculate rate
            elapsed_minutes = (time.time() - start_time) / 60
            rate = (current_count - last_count) / (refresh_interval / 60) if last_count > 0 else 0
            
            # Get recent additions
            recent = db.execute_query("""
                SELECT brand, model, type, created_at
                FROM components_component 
                WHERE created_at > NOW() - INTERVAL '5 minutes'
                ORDER BY created_at DESC 
                LIMIT 5
            """)
            
            # Clear screen and show stats
            os.system('cls' if os.name == 'nt' else 'clear')
            print("📊 Scraping Progress Monitor")
            print("=" * 50)
            print(f"Current Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"Total Components: {current_count}")
            print(f"Rate: {rate:.1f} components/min")
            print(f"Target: 200 components")
            print(f"Progress: {(current_count/200*100):.1f}%")
            
            if current_count >= 200:
                print("🎉 TARGET REACHED!")
            
            print(f"\nRecent Additions (last 5 minutes):")
            if recent:
                for item in recent:
                    print(f"  • {item['brand']} {item['model']} ({item['type']})")
            else:
                print("  No recent additions")
            
            print(f"\nRefreshing in {refresh_interval} seconds... (Ctrl+C to stop)")
            
            last_count = current_count
            time.sleep(refresh_interval)
            
    except KeyboardInterrupt:
        print("\n👋 Monitoring stopped")
    finally:
        db.close()

if __name__ == "__main__":
    monitor_progress()