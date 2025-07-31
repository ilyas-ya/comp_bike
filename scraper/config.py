"""
Configuration for bike-components.de scraper
"""

import os
from decouple import config

# Database configuration
DATABASE_URL = config('DATABASE_URL', default='postgresql://postgres:postgres@db:5432/compatibility_system')

# Scraper configuration
BASE_URL = "https://www.bike-components.de"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

# Rate limiting
MIN_DELAY = 1.0  # Minimum delay between requests (seconds)
MAX_DELAY = 3.0  # Maximum delay between requests (seconds)
PAGE_DELAY = 2.0  # Additional delay between pages (seconds)

# Scraping limits (for testing and being respectful)
MAX_PAGES_PER_CATEGORY = 10  # Increased for production scraping
MAX_PRODUCTS_PER_PAGE = 60   # Increased for production scraping
MAX_RETRIES = 3

# Component categories mapping
COMPONENT_CATEGORIES = {
    'cranksets': {
        'url_path': '/en/components/drivetrain/cranks/',
        'db_category': 'crankset'
    },
    'cassettes': {
        'url_path': '/en/components/drivetrain/cassettes/',
        'db_category': 'cassette'
    },
    'derailleurs': {
        'url_path': '/en/components/shifters-derailleurs/',
        'db_category': 'derailleur'
    },
    'brakes': {
        'url_path': '/en/components/brakes/',
        'db_category': 'brakes'
    },
    'frames': {
        'url_path': '/en/components/frames/',
        'db_category': 'frame'
    }
}

# Logging configuration
LOG_LEVEL = config('LOG_LEVEL', default='INFO')
LOG_DIR = 'logs'