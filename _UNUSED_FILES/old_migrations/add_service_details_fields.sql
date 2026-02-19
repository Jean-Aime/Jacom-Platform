-- Add new fields to Service table for enhanced service details page
ALTER TABLE `Service` 
ADD COLUMN `tagline` VARCHAR(191) NULL AFTER `tools`,
ADD COLUMN `capabilities` TEXT NOT NULL AFTER `tagline`,
ADD COLUMN `processSteps` TEXT NOT NULL AFTER `capabilities`,
ADD COLUMN `impactMetrics` TEXT NOT NULL AFTER `processSteps`,
ADD COLUMN `caseStudy` TEXT NULL AFTER `impactMetrics`;

-- Set default values for existing records
UPDATE `Service` SET 
  `capabilities` = '[]',
  `processSteps` = '[]',
  `impactMetrics` = '[]'
WHERE `capabilities` IS NULL OR `capabilities` = '';
