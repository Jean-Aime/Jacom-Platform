-- Academy Management Database Schema

-- Academy Settings Table
CREATE TABLE IF NOT EXISTS `academy_settings` (
  `id` VARCHAR(50) PRIMARY KEY,
  `heroTitle` VARCHAR(255) NOT NULL,
  `heroSubtitle` TEXT,
  `classStartDate` DATE,
  `scholarshipAnnouncementDate` DATE,
  `registrationOpen` BOOLEAN DEFAULT TRUE,
  `contactPhone` VARCHAR(20),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS `courses` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `icon` VARCHAR(100),
  `totalPrice` DECIMAL(10,2) NOT NULL,
  `fullPaymentPrice` DECIMAL(10,2) NOT NULL,
  `installmentCount` INT DEFAULT 1,
  `installmentAmount` DECIMAL(10,2),
  `startDate` DATE,
  `duration` VARCHAR(50),
  `deliveryMode` ENUM('online', 'hybrid', 'in-person') DEFAULT 'online',
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  `featured` BOOLEAN DEFAULT FALSE,
  `maxStudents` INT DEFAULT 100,
  `currentEnrolled` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Course Phases Table
CREATE TABLE IF NOT EXISTS `course_phases` (
  `id` VARCHAR(50) PRIMARY KEY,
  `courseId` VARCHAR(50) NOT NULL,
  `phaseNumber` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `materialPrice` DECIMAL(10,2) DEFAULT 0,
  `materialDiscountedPrice` DECIMAL(10,2) DEFAULT 0,
  `classPrice` DECIMAL(10,2) DEFAULT 0,
  `duration` VARCHAR(50),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `course_phase_unique` (`courseId`, `phaseNumber`)
);

-- Course Pricing Table
CREATE TABLE IF NOT EXISTS `course_pricing` (
  `id` VARCHAR(50) PRIMARY KEY,
  `courseId` VARCHAR(50) NOT NULL,
  `location` ENUM('Outside Rwanda', 'Inside Rwanda') NOT NULL,
  `planType` ENUM('in-class', 'material-only') NOT NULL,
  `originalPrice` DECIMAL(10,2) NOT NULL,
  `discountedPrice` DECIMAL(10,2) NOT NULL,
  `features` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `course_pricing_unique` (`courseId`, `location`, `planType`)
);

-- Class Schedule Table
CREATE TABLE IF NOT EXISTS `class_schedules` (
  `id` VARCHAR(50) PRIMARY KEY,
  `courseId` VARCHAR(50) NOT NULL,
  `sessionType` ENUM('live-class', 'group-session') NOT NULL,
  `groupNumber` INT NULL,
  `daysOfWeek` VARCHAR(50) NOT NULL,
  `timeEST` VARCHAR(20) NOT NULL,
  `timePST` VARCHAR(20) NOT NULL,
  `timeEAT` VARCHAR(20) NOT NULL,
  `timeETH` VARCHAR(20) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE
);

-- Student Enrollments Table
CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `userId` VARCHAR(50) NOT NULL,
  `courseId` VARCHAR(50) NOT NULL,
  `location` ENUM('Outside Rwanda', 'Inside Rwanda') NOT NULL,
  `planType` ENUM('in-class', 'material-only') NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  `paymentStatus` ENUM('pending', 'partial', 'completed') DEFAULT 'pending',
  `amountPaid` DECIMAL(10,2) DEFAULT 0,
  `totalAmount` DECIMAL(10,2) NOT NULL,
  `enrolledAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`userId`),
  INDEX `idx_course_id` (`courseId`),
  UNIQUE KEY `user_course_unique` (`userId`, `courseId`)
);

-- Course Materials Table
CREATE TABLE IF NOT EXISTS `course_materials` (
  `id` VARCHAR(50) PRIMARY KEY,
  `courseId` VARCHAR(50) NOT NULL,
  `phaseId` VARCHAR(50) NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` ENUM('video', 'document', 'assignment', 'quiz') NOT NULL,
  `content` TEXT,
  `fileUrl` VARCHAR(500),
  `orderIndex` INT DEFAULT 0,
  `isPublished` BOOLEAN DEFAULT FALSE,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`phaseId`) REFERENCES `course_phases`(`id`) ON DELETE SET NULL
);

-- Student Progress Table
CREATE TABLE IF NOT EXISTS `student_progress` (
  `id` VARCHAR(50) PRIMARY KEY,
  `enrollmentId` VARCHAR(50) NOT NULL,
  `materialId` VARCHAR(50) NOT NULL,
  `status` ENUM('not-started', 'in-progress', 'completed') DEFAULT 'not-started',
  `completedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_enrollment_id` (`enrollmentId`),
  INDEX `idx_material_id` (`materialId`),
  UNIQUE KEY `enrollment_material_unique` (`enrollmentId`, `materialId`)
);