-- Initial database setup for Component Compatibility System (Node-Based Model)
-- This file is run when the PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the components table for node-based model
CREATE TABLE IF NOT EXISTS components_component (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'crankset', 'cassette', 'derailleur', 'brakes', 'frame'
    speed INTEGER NULL,  -- e.g., 11, 12 for speed count
    specs JSONB DEFAULT '{}',  -- JSON specifications for compatibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(brand, model, type)
);

-- Create the compatibility links table for edges
CREATE TABLE IF NOT EXISTS compatibility_link (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES components_component(id) ON DELETE CASCADE,
    target_id UUID REFERENCES components_component(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,  -- e.g., 'cassette_driver', 'shifter_derailleur'
    status VARCHAR(30) NOT NULL CHECK (status IN ('compatible', 'compatible_with_adapter', 'not_compatible')),
    adapter_required BOOLEAN DEFAULT FALSE,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(source_id, target_id, type)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_components_brand ON components_component(brand);
CREATE INDEX IF NOT EXISTS idx_components_type ON components_component(type);
CREATE INDEX IF NOT EXISTS idx_components_speed ON components_component(speed);
CREATE INDEX IF NOT EXISTS idx_components_specs ON components_component USING GIN(specs);

CREATE INDEX IF NOT EXISTS idx_compatibility_source ON compatibility_link(source_id);
CREATE INDEX IF NOT EXISTS idx_compatibility_target ON compatibility_link(target_id);
CREATE INDEX IF NOT EXISTS idx_compatibility_status ON compatibility_link(status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_components_updated_at 
    BEFORE UPDATE ON components_component 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO components_component (brand, model, type, speed, specs) VALUES
('Shimano', 'Dura-Ace FC-R9200', 'crankset', 12, '{"spindle_type": "Hollowtech II", "chainring_sizes": [50, 34]}'),
('SRAM', 'Red AXS', 'crankset', 12, '{"spindle_type": "DUB", "chainring_sizes": [50, 37]}'),
('Shimano', 'CS-R8000', 'cassette', 11, '{"driver_body": "HG", "range": "11-32T", "min_cog": 11, "max_cog": 32}'),
('SRAM', 'XG-1275', 'cassette', 12, '{"driver_body": "XD", "range": "10-52T", "min_cog": 10, "max_cog": 52}')
ON CONFLICT (brand, model, type) DO NOTHING;