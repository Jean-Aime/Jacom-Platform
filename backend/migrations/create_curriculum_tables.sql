-- ============================================================================
-- COURSE CURRICULUM TABLES
-- ============================================================================
-- These tables store the detailed curriculum structure for courses:
-- - course_weeks: Weekly breakdown of each phase
-- - course_topics: Topics covered in each week
-- - course_resources: Learning materials for each topic
-- ============================================================================

-- Create course_weeks table
CREATE TABLE IF NOT EXISTS `course_weeks` (
    `id` VARCHAR(50) PRIMARY KEY,
    `phaseId` VARCHAR(50) NOT NULL,
    `weekNumber` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `taskList` VARCHAR(255),
    `practicalExercises` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`phaseId`) REFERENCES `course_phases`(`id`) ON DELETE CASCADE,
    INDEX `idx_phase_week` (`phaseId`, `weekNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create course_topics table
CREATE TABLE IF NOT EXISTS `course_topics` (
    `id` VARCHAR(50) PRIMARY KEY,
    `weekId` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `orderIndex` INT DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`weekId`) REFERENCES `course_weeks`(`id`) ON DELETE CASCADE,
    INDEX `idx_week_order` (`weekId`, `orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create course_resources table
CREATE TABLE IF NOT EXISTS `course_resources` (
    `id` VARCHAR(50) PRIMARY KEY,
    `topicId` VARCHAR(50) NOT NULL,
    `type` ENUM('video_syllabus', 'video_curriculum', 'video_notes', 'webaccess') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `url` VARCHAR(500),
    `content` TEXT,
    `orderIndex` INT DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`topicId`) REFERENCES `course_topics`(`id`) ON DELETE CASCADE,
    INDEX `idx_topic_order` (`topicId`, `orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
