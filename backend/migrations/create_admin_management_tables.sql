-- ============================================================================
-- ADMIN MANAGEMENT TABLES
-- Additional tables for payment tracking, notifications, and assignments
-- ============================================================================

-- Payments Table
CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `enrollmentId` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `method` ENUM('card', 'bank_transfer', 'cash', 'mobile_money') DEFAULT 'cash',
  `reference` VARCHAR(255),
  `status` ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id`) ON DELETE CASCADE,
  INDEX `idx_enrollment_id` (`enrollmentId`),
  INDEX `idx_created_at` (`createdAt`)
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` VARCHAR(50) PRIMARY KEY,
  `enrollmentId` VARCHAR(50) NOT NULL,
  `invoiceNumber` VARCHAR(100) UNIQUE NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'paid', 'overdue', 'cancelled') DEFAULT 'pending',
  `dueDate` DATE,
  `paidAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id`) ON DELETE CASCADE,
  INDEX `idx_enrollment_id` (`enrollmentId`),
  INDEX `idx_status` (`status`)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(50) PRIMARY KEY,
  `type` ENUM('announcement', 'reminder', 'payment', 'enrollment', 'completion', 'assignment') DEFAULT 'announcement',
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `recipients` ENUM('all', 'students', 'instructors', 'course') DEFAULT 'all',
  `courseId` VARCHAR(50) NULL,
  `status` ENUM('draft', 'scheduled', 'sent') DEFAULT 'draft',
  `scheduledFor` TIMESTAMP NULL,
  `sentAt` TIMESTAMP NULL,
  `readCount` INT DEFAULT 0,
  `totalRecipients` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE SET NULL,
  INDEX `idx_status` (`status`),
  INDEX `idx_scheduled_for` (`scheduledFor`)
);

-- Notification Recipients Table
CREATE TABLE IF NOT EXISTS `notification_recipients` (
  `id` VARCHAR(50) PRIMARY KEY,
  `notificationId` VARCHAR(50) NOT NULL,
  `userId` VARCHAR(50) NOT NULL,
  `readAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`notificationId`) REFERENCES `notifications`(`id`) ON DELETE CASCADE,
  INDEX `idx_notification_id` (`notificationId`),
  INDEX `idx_user_id` (`userId`),
  UNIQUE KEY `notification_user_unique` (`notificationId`, `userId`)
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `courseId` VARCHAR(50) NOT NULL,
  `lessonId` VARCHAR(50) NULL,
  `dueDate` TIMESTAMP NULL,
  `maxGrade` INT DEFAULT 100,
  `instructions` TEXT,
  `attachments` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`lessonId`) REFERENCES `course_materials`(`id`) ON DELETE SET NULL,
  INDEX `idx_course_id` (`courseId`),
  INDEX `idx_due_date` (`dueDate`)
);

-- Assignment Submissions Table
CREATE TABLE IF NOT EXISTS `assignment_submissions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `assignmentId` VARCHAR(50) NOT NULL,
  `userId` VARCHAR(50) NOT NULL,
  `submissionText` TEXT,
  `attachments` TEXT,
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `grade` INT NULL,
  `feedback` TEXT,
  `gradedAt` TIMESTAMP NULL,
  `gradedBy` VARCHAR(50) NULL,
  `status` ENUM('submitted', 'graded', 'late') DEFAULT 'submitted',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`assignmentId`) REFERENCES `assignments`(`id`) ON DELETE CASCADE,
  INDEX `idx_assignment_id` (`assignmentId`),
  INDEX `idx_user_id` (`userId`),
  UNIQUE KEY `assignment_user_unique` (`assignmentId`, `userId`)
);

-- Instructors Table
CREATE TABLE IF NOT EXISTS `instructors` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `bio` TEXT,
  `expertise` TEXT,
  `avatar` VARCHAR(500),
  `rating` DECIMAL(3,2) DEFAULT 0.00,
  `totalCourses` INT DEFAULT 0,
  `totalStudents` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`)
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` VARCHAR(50) PRIMARY KEY,
  `userId` VARCHAR(50) NOT NULL,
  `courseId` VARCHAR(50) NOT NULL,
  `enrollmentId` VARCHAR(50) NOT NULL,
  `certificateNumber` VARCHAR(100) UNIQUE NOT NULL,
  `issuedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `completionDate` DATE,
  `grade` DECIMAL(5,2),
  `status` ENUM('active', 'revoked') DEFAULT 'active',
  `pdfUrl` VARCHAR(500),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`userId`),
  INDEX `idx_course_id` (`courseId`),
  UNIQUE KEY `user_course_unique` (`userId`, `courseId`)
);

-- Quiz Questions Table
CREATE TABLE IF NOT EXISTS `quiz_questions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `materialId` VARCHAR(50) NOT NULL,
  `question` TEXT NOT NULL,
  `options` TEXT NOT NULL,
  `correctAnswer` INT NOT NULL,
  `explanation` TEXT,
  `orderIndex` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`materialId`) REFERENCES `course_materials`(`id`) ON DELETE CASCADE,
  INDEX `idx_material_id` (`materialId`)
);

-- Quiz Submissions Table
CREATE TABLE IF NOT EXISTS `quiz_submissions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `userId` VARCHAR(50) NOT NULL,
  `materialId` VARCHAR(50) NOT NULL,
  `answers` TEXT NOT NULL,
  `score` INT NOT NULL,
  `totalQuestions` INT NOT NULL,
  `passed` BOOLEAN DEFAULT FALSE,
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`userId`),
  INDEX `idx_material_id` (`materialId`)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Add indexes to existing tables if they don't exist
CREATE INDEX IF NOT EXISTS `idx_course_status` ON `courses`(`status`);
CREATE INDEX IF NOT EXISTS `idx_course_featured` ON `courses`(`featured`);
CREATE INDEX IF NOT EXISTS `idx_enrollment_status` ON `enrollments`(`status`);
CREATE INDEX IF NOT EXISTS `idx_enrollment_payment_status` ON `enrollments`(`paymentStatus`);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if tables were created
SELECT 'Payments table created' as status FROM payments LIMIT 1;
SELECT 'Notifications table created' as status FROM notifications LIMIT 1;
SELECT 'Assignments table created' as status FROM assignments LIMIT 1;
SELECT 'Instructors table created' as status FROM instructors LIMIT 1;
SELECT 'Certificates table created' as status FROM certificates LIMIT 1;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
