-- Migration: Update database schema for Admin Panel and Public Pages
-- Date: 2026-01-30
-- Description: Add missing tables for Academy, Partnerships, Content, Case Studies, and Sessions

-- 1. Add status field to lead table
ALTER TABLE `lead` ADD COLUMN IF NOT EXISTS `status` varchar(191) NOT NULL DEFAULT 'new' AFTER `metadata`;

-- 2. Create academy_student table
CREATE TABLE IF NOT EXISTS `academy_student` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL UNIQUE,
  `batch` varchar(191) NOT NULL,
  `progress` int NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `enrolledAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Create academy_batch table
CREATE TABLE IF NOT EXISTS `academy_batch` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `capacity` int NOT NULL,
  `enrolled` int NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create partnership table
CREATE TABLE IF NOT EXISTS `partnership` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `description` text,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Create content table
CREATE TABLE IF NOT EXISTS `content` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `key` varchar(191) NOT NULL UNIQUE,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Create case_study table
CREATE TABLE IF NOT EXISTS `case_study` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL UNIQUE,
  `client` varchar(191) NOT NULL,
  `industry` varchar(191) NOT NULL,
  `challenge` text NOT NULL,
  `solution` text NOT NULL,
  `results` text NOT NULL,
  `image` varchar(191),
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Create session table for authentication
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `userId` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL UNIQUE,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Insert sample data for academy
INSERT INTO `academy_student` (`id`, `name`, `email`, `batch`, `progress`, `status`, `enrolledAt`, `createdAt`, `updatedAt`) VALUES
('stu1', 'Satoshi Nakamoto', 'sat@bitcoin.org', 'Feb 2023 - Core', 65, 'active', NOW(), NOW(), NOW()),
('stu2', 'Yuki Kimura', 'yuki.k@example.com', 'June 2023 - Adv', 32, 'active', NOW(), NOW(), NOW()),
('stu3', 'Hina Sato', 'hina.s@example.com', 'Feb 2023 - Core', 92, 'completed', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- 9. Insert sample data for partnerships
INSERT INTO `partnership` (`id`, `name`, `type`, `location`, `status`, `description`, `startDate`, `createdAt`, `updatedAt`) VALUES
('part1', 'JICA', 'Strategic', 'Japan (Global)', 'active', 'Strategic partnership for international development', NOW(), NOW(), NOW()),
('part2', 'Nippon Foundation', 'Strategic', 'Japan (Global)', 'renewing', 'Strategic partnership for social innovation', NOW(), NOW(), NOW()),
('part3', 'Washocook', 'Academic', 'Online/Japan', 'active', 'Academic partnership for culinary training', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- 10. Insert sample content data
INSERT INTO `content` (`id`, `key`, `title`, `type`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
('cnt1', 'about_hero', 'About Hero Section', 'hero', 'JACOM Consulting empowers businesses globally', 'published', NOW(), NOW()),
('cnt2', 'about_mission', 'Our Mission', 'text', 'To deliver world-class consulting services', 'published', NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

COMMIT;
