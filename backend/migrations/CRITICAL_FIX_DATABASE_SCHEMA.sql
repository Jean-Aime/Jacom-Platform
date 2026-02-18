-- CRITICAL DATABASE FIXES - Production Ready Migration
-- Date: 2026-01-30
-- Description: Fix VARCHAR(191) limitations and add missing fields

-- ============================================
-- PART 1: FIX EXISTING TABLES - EXPAND FIELDS
-- ============================================

-- 1. EXPERT TABLE - Expand text fields
ALTER TABLE `expert` 
  MODIFY COLUMN `bio` TEXT NOT NULL,
  MODIFY COLUMN `expertise` TEXT NOT NULL,
  MODIFY COLUMN `locations` TEXT NOT NULL;

-- 2. INDUSTRY TABLE - Expand text fields
ALTER TABLE `industry` 
  MODIFY COLUMN `description` TEXT NOT NULL,
  MODIFY COLUMN `overview` TEXT NOT NULL,
  MODIFY COLUMN `challenges` TEXT NOT NULL,
  MODIFY COLUMN `trends` TEXT NOT NULL;

-- 3. SERVICE TABLE - Expand text fields
ALTER TABLE `service` 
  MODIFY COLUMN `description` TEXT NOT NULL,
  MODIFY COLUMN `overview` TEXT NOT NULL,
  MODIFY COLUMN `methodologies` TEXT NOT NULL,
  MODIFY COLUMN `tools` TEXT NOT NULL;

-- 4. INSIGHT TABLE - Expand text fields
ALTER TABLE `insight` 
  MODIFY COLUMN `content` LONGTEXT NOT NULL,
  MODIFY COLUMN `excerpt` TEXT NOT NULL,
  MODIFY COLUMN `topics` TEXT NOT NULL,
  MODIFY COLUMN `regions` TEXT NOT NULL;

-- 5. CAREER TABLE - Expand text fields
ALTER TABLE `career` 
  MODIFY COLUMN `description` TEXT NOT NULL,
  MODIFY COLUMN `requirements` TEXT NOT NULL,
  MODIFY COLUMN `benefits` TEXT NOT NULL;

-- 6. APPLICATION TABLE - Expand text fields
ALTER TABLE `application` 
  MODIFY COLUMN `coverLetter` TEXT;

-- 7. MEDIAITEM TABLE - Expand text fields
ALTER TABLE `mediaitem` 
  MODIFY COLUMN `content` LONGTEXT NOT NULL,
  MODIFY COLUMN `excerpt` TEXT NOT NULL,
  MODIFY COLUMN `attachments` TEXT NOT NULL;

-- 8. LEAD TABLE - Add missing fields
ALTER TABLE `lead` 
  ADD COLUMN IF NOT EXISTS `status` varchar(191) NOT NULL DEFAULT 'new' AFTER `metadata`,
  ADD COLUMN IF NOT EXISTS `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3) AFTER `createdAt`;

-- 9. OFFICE TABLE - Add location field (combined city, country)
ALTER TABLE `office` 
  ADD COLUMN IF NOT EXISTS `location` varchar(191) GENERATED ALWAYS AS (CONCAT(city, ', ', country)) STORED AFTER `lng`;

-- ============================================
-- PART 2: CREATE NEW TABLES
-- ============================================

-- 10. ACADEMY_STUDENT TABLE
CREATE TABLE IF NOT EXISTS `academy_student` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL UNIQUE,
  `batch` varchar(191) NOT NULL,
  `progress` int NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `enrolledAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. ACADEMY_BATCH TABLE
CREATE TABLE IF NOT EXISTS `academy_batch` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `capacity` int NOT NULL,
  `enrolled` int NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. PARTNERSHIP TABLE
CREATE TABLE IF NOT EXISTS `partnership` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `description` TEXT,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. CONTENT TABLE
CREATE TABLE IF NOT EXISTS `content` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `key` varchar(191) NOT NULL UNIQUE,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. CASE_STUDY TABLE (dedicated table instead of using insight)
CREATE TABLE IF NOT EXISTS `case_study` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL UNIQUE,
  `client` varchar(191) NOT NULL,
  `industry` varchar(191) NOT NULL,
  `challenge` TEXT NOT NULL,
  `solution` TEXT NOT NULL,
  `results` TEXT NOT NULL,
  `metrics` TEXT,
  `image` varchar(191),
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. SESSION TABLE
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) NOT NULL PRIMARY KEY,
  `userId` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL UNIQUE,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PART 3: SEED SAMPLE DATA
-- ============================================

-- Academy Students
INSERT INTO `academy_student` (`id`, `name`, `email`, `batch`, `progress`, `status`, `enrolledAt`, `createdAt`, `updatedAt`) VALUES
('stu1', 'Satoshi Nakamoto', 'sat@bitcoin.org', 'Feb 2023 - Core', 65, 'active', NOW(), NOW(), NOW()),
('stu2', 'Yuki Kimura', 'yuki.k@example.com', 'June 2023 - Adv', 32, 'active', NOW(), NOW(), NOW()),
('stu3', 'Hina Sato', 'hina.s@example.com', 'Feb 2023 - Core', 92, 'completed', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- Partnerships
INSERT INTO `partnership` (`id`, `name`, `type`, `location`, `status`, `description`, `startDate`, `createdAt`, `updatedAt`) VALUES
('part1', 'JICA', 'Strategic', 'Japan (Global)', 'active', 'Strategic partnership for international development', NOW(), NOW(), NOW()),
('part2', 'Nippon Foundation', 'Strategic', 'Japan (Global)', 'renewing', 'Strategic partnership for social innovation', NOW(), NOW(), NOW()),
('part3', 'Washocook', 'Academic', 'Online/Japan', 'active', 'Academic partnership for culinary training', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- Content
INSERT INTO `content` (`id`, `key`, `title`, `type`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
('cnt1', 'about_hero', 'About Hero Section', 'hero', 'JACOM Consulting empowers businesses globally', 'published', NOW(), NOW()),
('cnt2', 'about_mission', 'Our Mission', 'text', 'To deliver world-class consulting services', 'published', NOW(), NOW())
ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- ============================================
-- PART 4: UPDATE LEAD CONTROLLER COMPATIBILITY
-- ============================================

-- Update existing leads to have status
UPDATE `lead` SET `status` = 'new' WHERE `status` IS NULL OR `status` = '';

COMMIT;

-- ============================================
-- VERIFICATION QUERIES (Run separately to check)
-- ============================================

-- Check expert table structure
-- SHOW COLUMNS FROM expert;

-- Check lead table structure
-- SHOW COLUMNS FROM lead;

-- Check new tables exist
-- SHOW TABLES LIKE 'academy_%';
-- SHOW TABLES LIKE 'partnership';
-- SHOW TABLES LIKE 'content';
-- SHOW TABLES LIKE 'case_study';
-- SHOW TABLES LIKE 'session';
