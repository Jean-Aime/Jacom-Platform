-- ============================================================================
-- SIMPLE CURRICULUM TABLES - NO FOREIGN KEYS
-- ============================================================================
-- Creates tables without foreign key constraints to avoid errors
-- ============================================================================

DROP TABLE IF EXISTS `course_resources`;
DROP TABLE IF EXISTS `course_topics`;
DROP TABLE IF EXISTS `course_weeks`;

CREATE TABLE `course_weeks` (
    `id` VARCHAR(50) PRIMARY KEY,
    `phaseId` VARCHAR(50) NOT NULL,
    `weekNumber` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `taskList` VARCHAR(255),
    `practicalExercises` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_phase_week` (`phaseId`, `weekNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `course_topics` (
    `id` VARCHAR(50) PRIMARY KEY,
    `weekId` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `orderIndex` INT DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_week_order` (`weekId`, `orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `course_resources` (
    `id` VARCHAR(50) PRIMARY KEY,
    `topicId` VARCHAR(50) NOT NULL,
    `type` ENUM('video_syllabus', 'video_curriculum', 'video_notes', 'webaccess') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `url` VARCHAR(500),
    `content` TEXT,
    `orderIndex` INT DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_topic_order` (`topicId`, `orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
