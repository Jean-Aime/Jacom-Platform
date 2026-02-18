-- Add service type and training-specific fields
-- Run this in phpMyAdmin or MySQL client

-- Add new columns to Service table
ALTER TABLE Service 
ADD COLUMN type ENUM('consulting', 'technical', 'training', 'financial') DEFAULT 'consulting' AFTER status,
ADD COLUMN category VARCHAR(50) AFTER type,
ADD COLUMN upcoming BOOLEAN DEFAULT 0 AFTER category,
ADD COLUMN startDate DATETIME AFTER upcoming,
ADD COLUMN duration VARCHAR(50) AFTER startDate,
ADD COLUMN price VARCHAR(50) AFTER duration,
ADD COLUMN capacity INT AFTER price,
ADD COLUMN enrollmentStatus ENUM('open', 'closed', 'full') DEFAULT 'open' AFTER capacity;

-- Update existing services with correct types
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
