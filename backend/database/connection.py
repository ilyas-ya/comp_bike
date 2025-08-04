import os
import psycopg2
from psycopg2.extras import RealDictCursor
from decouple import config

class DatabaseConnection:
    """Database connection manager for the scraper"""
    
    def __init__(self):
        """Initialize database connection"""
        self.conn = None
        self.connect()
    
    def connect(self):
        """Connect to PostgreSQL database"""
        try:
            # Get connection parameters from environment or config
            db_url = config('DATABASE_URL', default='postgresql://postgres:postgres@db:5432/compatibility_system')
            
            # Connect to database
            self.conn = psycopg2.connect(db_url)
            self.conn.autocommit = False
            
            # Test connection
            cursor = self.conn.cursor()
            cursor.execute('SELECT 1')
            cursor.close()
            
            print("Database connection established successfully")
            
        except Exception as e:
            print(f"Error connecting to database: {str(e)}")
            raise
    
    def execute_query(self, query, params=None, fetch=True):
        """Execute a query and return results"""
        if not self.conn:
            self.connect()
        
        try:
            cursor = self.conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, params or {})
            
            if fetch:
                results = cursor.fetchall()
                cursor.close()
                return results
            else:
                cursor.close()
                return None
                
        except Exception as e:
            self.conn.rollback()
            print(f"Error executing query: {str(e)}")
            raise
    
    def commit(self):
        """Commit current transaction"""
        if self.conn:
            self.conn.commit()
    
    def rollback(self):
        """Rollback current transaction"""
        if self.conn:
            self.conn.rollback()
    
    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()
            self.conn = None
    
    def __del__(self):
        """Ensure connection is closed when object is destroyed"""
        self.close()