-- Add training-specific fields to Service table
-- Run this in phpMyAdmin or MySQL client

-- First, check what columns already exist
-- SHOW COLUMNS FROM Service;

-- Add only the missing columns (skip 'type' if it already exists)
ALTER TABLE Service 
ADD COLUMN IF NOT EXISTS category VARCHAR(50) AFTER type,
ADD COLUMN IF NOT EXISTS upcoming BOOLEAN DEFAULT 0 AFTER category,
ADD COLUMN IF NOT EXISTS startDate DATETIME AFTER upcoming,
ADD COLUMN IF NOT EXISTS duration VARCHAR(50) AFTER startDate,
ADD COLUMN IF NOT EXISTS price VARCHAR(50) AFTER duration,
ADD COLUMN IF NOT EXISTS capacity INT AFTER price,
ADD COLUMN IF NOT EXISTS enrollmentStatus ENUM('open', 'closed', 'full') DEFAULT 'open' AFTER capacity;

-- Update existing services with correct types (if type column exists)
UPDATE Service SET type = 'training', category = 'web-development' WHERE slug = 'web-development-training';
UPDATE Service SET type = 'training', category = 'recruitment' WHERE slug = 'recruitment-training';
UPDATE Service SET type = 'consulting', category = 'digital-transformation' WHERE slug = 'digital-transformation';
UPDATE Service SET type = 'technical', category = 'iot' WHERE slug = 'iot-platform';
UPDATE Service SET type = 'technical', category = 'smart-factory' WHERE slug = 'smart-factory';
UPDATE Service SET type = 'technical', category = 'renewable-energy' WHERE slug = 'renewable-energy';
UPDATE Service SET type = 'technical', category = 'smart-building' WHERE slug = 'smart-building';
UPDATE Service SET type = 'financial', category = 'advisory' WHERE slug = 'financial-advisory';
UPDATE Service SET type = 'consulting', category = 'pmo' WHERE slug = 'pmo-services';

-- Set training-specific data for training services
UPDATE Service SET 
  upcoming = 1,
  startDate = '2025-03-01',
  duration = '12 weeks',
  price = '¥1,200',
  capacity = 30,
  enrollmentStatus = 'open'
WHERE slug = 'web-development-training';

UPDATE Service SET 
  upcoming = 1,
  startDate = '2025-02-15',
  duration = '3 months',
  price = 'Contact for pricing',
  capacity = 50,
  enrollmentStatus = 'open'
WHERE slug = 'recruitment-training';

-- Verify changes
SELECT id, name, slug, type, category, upcoming, startDate, duration, price FROM Service;
