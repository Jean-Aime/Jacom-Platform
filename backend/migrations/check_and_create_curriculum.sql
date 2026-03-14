-- ============================================================================
-- CHECK AND CREATE CURRICULUM TABLES
-- ============================================================================
-- This script checks the course_phases structure and creates compatible tables
-- ============================================================================

-- First, let's see what we're working with
SELECT 'Checking course_phases table structure...' AS status;
SHOW CREATE TABLE course_phases;

-- Show existing phase IDs
SELECT id, courseId, phaseNumber, title FROM course_phases LIMIT 5;

-- Now create the curriculum tables WITHOUT foreign keys first
DROP TABLE IF EXISTS `course_resources`;
DROP TABLE IF EXISTS `course_topics`;
DROP TABLE IF EXISTS `course_weeks`;

-- Create course_weeks table (NO FOREIGN KEY YET)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create course_topics table (NO FOREIGN KEY YET)
CREATE TABLE `course_topics` (
    `id` VARCHAR(50) PRIMARY KEY,
    `weekId` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `orderIndex` INT DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_week_order` (`weekId`, `orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create course_resources table (NO FOREIGN KEY YET)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT 'Tables created successfully without foreign keys!' AS status;
SELECT 'You can now import the seed data.' AS next_step;
