-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2026 at 08:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jas_consulting`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` varchar(191) NOT NULL,
  `careerId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `resumeUrl` varchar(191) NOT NULL,
  `coverLetter` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `department` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `experience` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `requirements` varchar(191) NOT NULL,
  `benefits` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expert`
--

CREATE TABLE `expert` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `bio` varchar(191) NOT NULL,
  `expertise` varchar(191) NOT NULL,
  `locations` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `challenges` varchar(191) NOT NULL,
  `trends` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insight`
--

CREATE TABLE `insight` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `trending` tinyint(1) NOT NULL DEFAULT 0,
  `gated` tinyint(1) NOT NULL DEFAULT 0,
  `downloadUrl` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `readTime` int(11) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'draft',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `topics` varchar(191) NOT NULL,
  `regions` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `company` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `message` varchar(191) DEFAULT NULL,
  `source` varchar(191) NOT NULL,
  `metadata` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mediaitem`
--

CREATE TABLE `mediaitem` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `attachments` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'draft',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `methodologies` varchar(191) NOT NULL,
  `tools` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subservice`
--

CREATE TABLE `subservice` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_experttoindustry`
--

CREATE TABLE `_experttoindustry` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_experttoservice`
--

CREATE TABLE `_experttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoinsight`
--

CREATE TABLE `_industrytoinsight` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoservice`
--

CREATE TABLE `_industrytoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_insighttoservice`
--

CREATE TABLE `_insighttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b2b0baaa-6025-4426-b71c-b3726e4c17b1', 'b5e7a060137442d0f2a7d641ae5acd2d560b3afdfe0942d5dee23f22e57f74eb', '2026-01-29 20:39:46.994', '20260129203938_add_workflow_fields', NULL, NULL, '2026-01-29 20:39:38.157', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Application_careerId_fkey` (`careerId`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Career_slug_key` (`slug`);

--
-- Indexes for table `expert`
--
ALTER TABLE `expert`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Expert_slug_key` (`slug`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Industry_slug_key` (`slug`);

--
-- Indexes for table `insight`
--
ALTER TABLE `insight`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Insight_slug_key` (`slug`),
  ADD KEY `Insight_authorId_fkey` (`authorId`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediaitem`
--
ALTER TABLE `mediaitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MediaItem_slug_key` (`slug`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Office_slug_key` (`slug`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_slug_key` (`slug`);

--
-- Indexes for table `subservice`
--
ALTER TABLE `subservice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SubService_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD UNIQUE KEY `_ExpertToIndustry_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToIndustry_B_index` (`B`);

--
-- Indexes for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD UNIQUE KEY `_ExpertToService_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToService_B_index` (`B`);

--
-- Indexes for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD UNIQUE KEY `_IndustryToInsight_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToInsight_B_index` (`B`);

--
-- Indexes for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD UNIQUE KEY `_IndustryToService_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToService_B_index` (`B`);

--
-- Indexes for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD UNIQUE KEY `_InsightToService_AB_unique` (`A`,`B`),
  ADD KEY `_InsightToService_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `Application_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `career` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `insight`
--
ALTER TABLE `insight`
  ADD CONSTRAINT `Insight_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `expert` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `subservice`
--
ALTER TABLE `subservice`
  ADD CONSTRAINT `SubService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD CONSTRAINT `_ExpertToIndustry_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToIndustry_B_fkey` FOREIGN KEY (`B`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD CONSTRAINT `_ExpertToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD CONSTRAINT `_IndustryToInsight_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToInsight_B_fkey` FOREIGN KEY (`B`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD CONSTRAINT `_IndustryToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD CONSTRAINT `_InsightToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_InsightToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
