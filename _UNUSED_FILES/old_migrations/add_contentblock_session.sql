-- Add ContentBlock table
CREATE TABLE IF NOT EXISTS `contentblock` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `page` varchar(191) NOT NULL,
  `section` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'text',
  `content` text NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ContentBlock_key_key` (`key`),
  KEY `ContentBlock_page_section_idx` (`page`, `section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add Session table
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_token_key` (`token`),
  KEY `Session_token_idx` (`token`),
  KEY `Session_userId_idx` (`userId`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed ContentBlock data for homepage
INSERT INTO `contentblock` (`id`, `key`, `page`, `section`, `type`, `content`, `image`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cb1', 'hero.title', 'home', 'hero', 'text', 'Transform Your Business with Expert Consulting', NULL, 1, 1, NOW(), NOW()),
('cb2', 'hero.subtitle', 'home', 'hero', 'text', 'Strategic solutions that drive growth and innovation', NULL, 2, 1, NOW(), NOW()),
('cb3', 'industry.title', 'home', 'industry', 'text', 'Industries We Serve', NULL, 1, 1, NOW(), NOW()),
('cb4', 'stories.title', 'home', 'stories', 'text', 'Success Stories', NULL, 1, 1, NOW(), NOW()),
('cb5', 'video.title', 'home', 'video', 'text', 'See How We Work', NULL, 1, 1, NOW(), NOW()),
('cb6', 'cta.title', 'home', 'cta', 'text', 'Ready to Transform Your Business?', NULL, 1, 1, NOW(), NOW()),
('cb7', 'cta.description', 'home', 'cta', 'text', 'Let us help you achieve your goals', NULL, 2, 1, NOW(), NOW());
