-- Add missing Service detail tables
USE jas_consulting;

-- ServiceCapability table
CREATE TABLE IF NOT EXISTS `servicecapability` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(191) NOT NULL DEFAULT 'integration',
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ServiceCapability_serviceId_fkey` (`serviceId`),
  CONSTRAINT `ServiceCapability_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ServiceProcessStep table
CREATE TABLE IF NOT EXISTS `serviceprocessstep` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `step` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ServiceProcessStep_serviceId_fkey` (`serviceId`),
  CONSTRAINT `ServiceProcessStep_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ServiceMetric table
CREATE TABLE IF NOT EXISTS `servicemetric` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `label` varchar(500) NOT NULL,
  `value` varchar(191) NOT NULL,
  `change` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ServiceMetric_serviceId_fkey` (`serviceId`),
  CONSTRAINT `ServiceMetric_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add sample data for IoT Solutions service (srv2)
INSERT INTO `servicecapability` (`id`, `serviceId`, `title`, `description`, `icon`, `order`) VALUES
('cap1', 'srv2', 'System Integration', 'Seamlessly connect IoT devices with existing enterprise systems', 'integration', 1),
('cap2', 'srv2', 'Predictive Analytics', 'Leverage AI/ML for predictive maintenance and optimization', 'predictive', 2),
('cap3', 'srv2', 'Robotics & Automation', 'Deploy intelligent robotics for manufacturing excellence', 'robotics', 3),
('cap4', 'srv2', 'Digital Twins', 'Create virtual replicas for simulation and optimization', 'twins', 4);

INSERT INTO `serviceprocessstep` (`id`, `serviceId`, `step`, `title`, `description`, `order`) VALUES
('step1', 'srv2', 1, 'Assessment', 'Evaluate current infrastructure and identify opportunities', 1),
('step2', 'srv2', 2, 'Design', 'Architect scalable IoT solutions tailored to your needs', 2),
('step3', 'srv2', 3, 'Implementation', 'Deploy and integrate IoT systems with minimal disruption', 3);

INSERT INTO `servicemetric` (`id`, `serviceId`, `label`, `value`, `change`, `order`) VALUES
('metric1', 'srv2', 'Efficiency Gain', '45%', '+12%', 1),
('metric2', 'srv2', 'Cost Reduction', '30%', '+8%', 2),
('metric3', 'srv2', 'Uptime', '99.5%', '+2.5%', 3);

SELECT 'Service detail tables created and seeded successfully!' as status;
