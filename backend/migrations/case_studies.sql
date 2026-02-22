-- Use correct database
USE jas_consulting;

-- Drop existing if any
DROP TABLE IF EXISTS `_casestudytosolution`;
DROP TABLE IF EXISTS `_casestudytoindustry`;
DROP TABLE IF EXISTS `_casestudytoservice`;
DROP TABLE IF EXISTS `casestudy`;

-- Create Case Studies table
CREATE TABLE `casestudy` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `company` VARCHAR(255) NOT NULL,
  `industry` VARCHAR(255),
  `challenge` TEXT NOT NULL,
  `solution` TEXT NOT NULL,
  `results` TEXT NOT NULL,
  `quote` TEXT,
  `author` VARCHAR(255),
  `authorRole` VARCHAR(255),
  `image` VARCHAR(500),
  `featured` BOOLEAN DEFAULT FALSE,
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'published',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create relationship tables
CREATE TABLE `_casestudytosolution` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_casestudytosolution_AB_unique` (`A`, `B`),
  KEY `_casestudytosolution_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `_casestudytoindustry` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_casestudytoindustry_AB_unique` (`A`, `B`),
  KEY `_casestudytoindustry_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `_casestudytoservice` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_casestudytoservice_AB_unique` (`A`, `B`),
  KEY `_casestudytoservice_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample case studies
INSERT INTO `casestudy` (`id`, `title`, `slug`, `company`, `industry`, `challenge`, `solution`, `results`, `quote`, `author`, `authorRole`, `featured`, `status`) VALUES
('cs1', 'Digital Transformation Success at Global Manufacturing', 'global-manufacturing-digital-transformation', 'Global Manufacturing Corp', 'Manufacturing', 'Struggling with outdated systems and manual processes causing 30% productivity loss', 'Implemented digital transformation strategy with IoT integration and automation', '40% increase in efficiency, 60% reduction in downtime, ROI achieved in 8 months', 'JACOM''s consulting expertise transformed our operations. The results exceeded our expectations.', 'John Smith', 'CEO', TRUE, 'published'),
('cs2', 'Healthcare System Integration Delivers Results', 'healthcare-system-integration-success', 'Healthcare Systems Inc', 'Healthcare', 'Fragmented patient data across multiple systems leading to compliance risks', 'Deployed integrated healthcare management system with HIPAA-compliant architecture', '50% faster patient processing, 100% compliance achieved, improved patient satisfaction by 35%', 'The implementation was seamless. Our staff adapted quickly and patients noticed the difference immediately.', 'Dr. Sarah Johnson', 'Medical Director', TRUE, 'published');
