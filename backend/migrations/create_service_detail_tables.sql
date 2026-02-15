-- Create ServiceCapability table
CREATE TABLE IF NOT EXISTS `ServiceCapability` (
  `id` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ServiceCapability_serviceId_idx` (`serviceId`),
  CONSTRAINT `ServiceCapability_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ServiceProcessStep table
CREATE TABLE IF NOT EXISTS `ServiceProcessStep` (
  `id` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `step` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ServiceProcessStep_serviceId_idx` (`serviceId`),
  CONSTRAINT `ServiceProcessStep_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ServiceMetric table
CREATE TABLE IF NOT EXISTS `ServiceMetric` (
  `id` VARCHAR(191) NOT NULL,
  `serviceId` VARCHAR(191) NOT NULL,
  `label` VARCHAR(191) NOT NULL,
  `value` VARCHAR(191) NOT NULL,
  `change` VARCHAR(191) NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ServiceMetric_serviceId_idx` (`serviceId`),
  CONSTRAINT `ServiceMetric_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add case study fields to Service table
ALTER TABLE `Service` 
ADD COLUMN IF NOT EXISTS `caseStudyLabel` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyTitle` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyDescription` TEXT,
ADD COLUMN IF NOT EXISTS `caseStudyImage` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyMetric1Label` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyMetric1Value` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyMetric2Label` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyMetric2Value` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyCtaText` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `caseStudyCtaLink` VARCHAR(191),
ADD COLUMN IF NOT EXISTS `impactMetricsTitle` VARCHAR(191) DEFAULT 'Performance Metrics';
