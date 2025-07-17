-- Initial database setup for Component Compatibility System
-- This file is run when the PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance (Django will create the tables)
-- These will be applied after Django migrations run

-- Sample data will be inserted via Django fixtures or admin interface