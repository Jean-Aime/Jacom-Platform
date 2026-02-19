-- Use correct database
USE jas_consulting;

-- Drop existing if any
DROP TABLE IF EXISTS `_ExpertToSolution`;
DROP TABLE IF EXISTS `_ServiceToSolution`;
DROP TABLE IF EXISTS `_IndustryToSolution`;
DROP TABLE IF EXISTS `Solution`;

-- Create Solutions table
CREATE TABLE `Solution` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `tagline` TEXT,
  `description` TEXT NOT NULL,
  `challenge` TEXT,
  `approach` TEXT,
  `outcomes` TEXT,
  `image` VARCHAR(500),
  `featured` BOOLEAN DEFAULT FALSE,
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'published',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create relationship tables (no foreign keys for now)
CREATE TABLE `_IndustryToSolution` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_IndustryToSolution_AB_unique` (`A`, `B`),
  KEY `_IndustryToSolution_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `_ServiceToSolution` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_ServiceToSolution_AB_unique` (`A`, `B`),
  KEY `_ServiceToSolution_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `_ExpertToSolution` (
  `A` VARCHAR(191) NOT NULL,
  `B` VARCHAR(191) NOT NULL,
  UNIQUE KEY `_ExpertToSolution_AB_unique` (`A`, `B`),
  KEY `_ExpertToSolution_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample solutions
INSERT INTO `Solution` (`id`, `name`, `slug`, `tagline`, `description`, `challenge`, `approach`, `outcomes`, `featured`, `status`) VALUES
('sol1', 'Manufacturing Digital Transformation', 'manufacturing-digital-transformation', 'Industry 4.0 Excellence', 'Complete digital transformation solution for manufacturing enterprises', 'Legacy systems, manual processes, data silos', 'IoT integration, automation, real-time analytics', 'Increased efficiency by 40%, reduced downtime by 60%', TRUE, 'published'),
('sol2', 'Healthcare System Integration', 'healthcare-system-integration', 'Connected Care Solutions', 'Integrated healthcare management and patient care systems', 'Fragmented systems, compliance challenges, data security', 'HIPAA-compliant integration, secure data exchange, workflow automation', 'Improved patient outcomes, 50% faster processing', TRUE, 'published'),
('sol3', 'Financial Services Modernization', 'financial-services-modernization', 'Next-Gen Banking', 'Modern banking and financial services platform', 'Outdated infrastructure, regulatory compliance, security risks', 'Cloud migration, API-first architecture, advanced security', 'Enhanced customer experience, 99.9% uptime', TRUE, 'published'),
('sol4', 'Smart Factory Implementation', 'smart-factory-implementation', 'Automated Production', 'End-to-end smart factory automation solution', 'Manual operations, quality inconsistency, high costs', 'Robotics, AI-powered QC, predictive maintenance', 'Reduced costs by 35%, improved quality by 45%', FALSE, 'published'),
('sol5', 'Enterprise Risk Management', 'enterprise-risk-management', 'Comprehensive Risk Control', 'Integrated risk assessment and mitigation platform', 'Compliance gaps, financial risks, operational vulnerabilities', 'Real-time monitoring, automated reporting, predictive analytics', 'Reduced risk exposure by 60%, full compliance', FALSE, 'published');
