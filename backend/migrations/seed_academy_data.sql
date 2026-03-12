-- ============================================================================
-- JACOM ACADEMY - PROFESSIONAL SEED DATA
-- ============================================================================
-- This seed data creates a complete academy ecosystem with:
-- - Academy settings and configuration
-- - Multiple courses with phases, pricing, and schedules
-- - Student user accounts with secure authentication
-- - Approved enrollments with payment tracking
-- - Course materials (videos, documents, assignments)
-- - Student progress tracking
-- ============================================================================

-- Clean existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM student_progress;
-- DELETE FROM course_materials;
-- DELETE FROM enrollments;
-- DELETE FROM class_schedules;
-- DELETE FROM course_pricing;
-- DELETE FROM course_phases;
-- DELETE FROM courses;
-- DELETE FROM academy_settings;
-- DELETE FROM session WHERE userId LIKE 'student_%';
-- DELETE FROM user WHERE role = 'student';

-- ============================================================================
-- 1. ACADEMY SETTINGS
-- ============================================================================
INSERT INTO `academy_settings` (`id`, `heroTitle`, `heroSubtitle`, `classStartDate`, `scholarshipAnnouncementDate`, `registrationOpen`, `contactPhone`, `createdAt`, `updatedAt`) VALUES
('academy_001', 'AI-Powered Application Development Class', 'Master modern application development with AI-powered tools and industry-leading practices. Join thousands of successful graduates building the future.', '2026-03-14', '2026-03-15', TRUE, '202-386-2702', NOW(), NOW());

-- ============================================================================
-- 2. COURSES
-- ============================================================================

-- Main Featured Course: AI-Powered Application Development
INSERT INTO `courses` (`id`, `name`, `slug`, `category`, `description`, `icon`, `totalPrice`, `fullPaymentPrice`, `installmentCount`, `installmentAmount`, `startDate`, `duration`, `deliveryMode`, `status`, `featured`, `maxStudents`, `currentEnrolled`, `createdAt`, `updatedAt`) VALUES
('course_001', 'AI-Powered Application Development', 'ai-powered-app-development', 'Application Development', 'Learn to build modern applications using AI-powered development tools, cloud infrastructure, and industry best practices. Our curriculum is designed by experts and updated regularly. Master full-stack development with React, Node.js, and AI integration.', 'Application Development', 2400.00, 1600.00, 4, 400.00, '2026-03-14', '12 weeks', 'hybrid', 'published', TRUE, 100, 15, NOW(), NOW()),

-- Additional Courses
('course_002', 'Cloud Computing & DevOps Mastery', 'cloud-computing-devops', 'Cloud Computing', 'Master AWS, Azure, and Google Cloud platforms. Learn containerization with Docker, orchestration with Kubernetes, and CI/CD pipelines. Build scalable cloud-native applications.', 'Cloud Computing', 1800.00, 1200.00, 3, 400.00, '2026-04-01', '8 weeks', 'online', 'published', FALSE, 80, 8, NOW(), NOW()),

('course_003', 'Data Analytics & Business Intelligence', 'data-analytics-bi', 'Data Analytics', 'Transform data into actionable insights. Master Python, SQL, Tableau, and Power BI. Learn statistical analysis, machine learning basics, and data visualization best practices.', 'Data Analytics', 2000.00, 1400.00, 4, 350.00, '2026-04-15', '10 weeks', 'hybrid', 'published', FALSE, 60, 5, NOW(), NOW()),

('course_004', 'Advanced Database Architecture', 'database-architecture', 'Database', 'Deep dive into PostgreSQL, MongoDB, and Redis. Master database design, optimization, indexing strategies, and high-availability architectures for enterprise applications.', 'Database', 1600.00, 1100.00, 3, 367.00, '2026-05-01', '6 weeks', 'online', 'published', FALSE, 70, 3, NOW(), NOW()),

('course_005', 'Cybersecurity Fundamentals', 'cybersecurity-fundamentals', 'Development', 'Learn ethical hacking, penetration testing, and security best practices. Understand OWASP Top 10, secure coding, and how to protect applications from common vulnerabilities.', 'Development', 2200.00, 1500.00, 4, 375.00, '2026-05-15', '10 weeks', 'online', 'published', FALSE, 50, 2, NOW(), NOW());

-- ============================================================================
-- 3. COURSE PHASES (for Course 001 - AI-Powered App Development)
-- ============================================================================
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`, `createdAt`, `updatedAt`) VALUES
('phase_001', 'course_001', 1, 'Building static websites using HTML, CSS & Bootstrap', 'Learn about the underlying structure of the web. Master semantic HTML5, modern CSS3 with Flexbox and Grid, and responsive design with Bootstrap 5. Build beautiful, mobile-first websites.', 300.00, 118.00, 600.00, '3 weeks', NOW(), NOW()),

('phase_002', 'course_001', 2, 'Learn coding with JavaScript', 'Learn programming fundamentals using JavaScript. Master ES6+ features, DOM manipulation, async programming, and modern JavaScript patterns. Build interactive web applications.', 300.00, 149.00, 600.00, '3 weeks', NOW(), NOW()),

('phase_003', 'course_001', 3, 'React.js, Node.js, MySQL & Express.js', 'Learn the backend side of application development. Build full-stack applications with React hooks, RESTful APIs with Express, database design with MySQL, and authentication systems.', 300.00, 149.00, 600.00, '3 weeks', NOW(), NOW()),

('phase_004', 'course_001', 4, 'Building AI-Powered Products | AI Integration', 'Learn how to convert your application into an intelligent one by connecting it with AI models. Integrate OpenAI, build chatbots, implement recommendation systems, and deploy AI features.', 300.00, 199.00, 600.00, '3 weeks', NOW(), NOW());

-- Phases for Course 002 - Cloud Computing
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`, `createdAt`, `updatedAt`) VALUES
('phase_005', 'course_002', 1, 'Cloud Fundamentals & AWS Basics', 'Introduction to cloud computing concepts, AWS core services (EC2, S3, RDS), and cloud architecture patterns.', 250.00, 150.00, 500.00, '3 weeks', NOW(), NOW()),

('phase_006', 'course_002', 2, 'Containerization & Kubernetes', 'Master Docker containers, Docker Compose, Kubernetes orchestration, and microservices deployment strategies.', 250.00, 150.00, 500.00, '3 weeks', NOW(), NOW()),

('phase_007', 'course_002', 3, 'CI/CD & Infrastructure as Code', 'Learn Jenkins, GitHub Actions, Terraform, and automated deployment pipelines for cloud infrastructure.', 250.00, 150.00, 500.00, '2 weeks', NOW(), NOW());

-- ============================================================================
-- 4. COURSE PRICING
-- ============================================================================
INSERT INTO `course_pricing` (`id`, `courseId`, `location`, `planType`, `originalPrice`, `discountedPrice`, `features`, `createdAt`, `updatedAt`) VALUES
-- Course 001 Pricing
('pricing_001', 'course_001', 'Outside Rwanda', 'in-class', 2400.00, 1600.00, 'Full Program access, All phases included, Instructor-led classes, Instructor-led group sessions, Career support, Certificate of completion', NOW(), NOW()),
('pricing_002', 'course_001', 'Inside Rwanda', 'in-class', 2400.00, 1600.00, 'Full Program access, All phases included, Instructor-led classes, Instructor-led group sessions, Career support, Certificate of completion', NOW(), NOW()),
('pricing_003', 'course_001', 'Outside Rwanda', 'material-only', 1200.00, 450.00, 'All 4 phases bundle, Self paced learning, Lifetime access, Community support', NOW(), NOW()),
('pricing_004', 'course_001', 'Inside Rwanda', 'material-only', 1200.00, 450.00, 'All 4 phases bundle, Self paced learning, Lifetime access, Community support', NOW(), NOW()),

-- Course 002 Pricing
('pricing_005', 'course_002', 'Outside Rwanda', 'in-class', 1800.00, 1200.00, 'Full Program access, Live sessions, Hands-on labs, AWS credits included', NOW(), NOW()),
('pricing_006', 'course_002', 'Inside Rwanda', 'in-class', 1800.00, 1200.00, 'Full Program access, Live sessions, Hands-on labs, AWS credits included', NOW(), NOW()),
('pricing_007', 'course_002', 'Outside Rwanda', 'material-only', 900.00, 400.00, 'Self-paced learning, Video tutorials, Lab exercises', NOW(), NOW()),
('pricing_008', 'course_002', 'Inside Rwanda', 'material-only', 900.00, 400.00, 'Self-paced learning, Video tutorials, Lab exercises', NOW(), NOW());

-- ============================================================================
-- 5. CLASS SCHEDULES
-- ============================================================================
INSERT INTO `class_schedules` (`id`, `courseId`, `sessionType`, `groupNumber`, `daysOfWeek`, `timeEST`, `timePST`, `timeEAT`, `timeETH`, `createdAt`, `updatedAt`) VALUES
-- Course 001 Schedules
('schedule_001', 'course_001', 'live-class', NULL, 'Saturday & Sunday', '10:00 AM - 12:00 PM', '7:00 AM - 9:00 AM', '6:00 PM - 8:00 PM', '12:00 - 2:00', NOW(), NOW()),
('schedule_002', 'course_001', 'group-session', 1, 'Tuesday & Thursday', '10:00 AM - 12:00 PM', '7:00 AM - 9:00 AM', '6:00 PM - 8:00 PM', '12:00 - 2:00', NOW(), NOW()),
('schedule_003', 'course_001', 'group-session', 2, 'Tuesday & Thursday', '1:00 PM - 3:00 PM', '10:00 AM - 12:00 PM', '9:00 PM - 11:00 PM', '3:00 - 5:00', NOW(), NOW()),
('schedule_004', 'course_001', 'group-session', 3, 'Tuesday & Thursday', '7:00 PM - 9:00 PM', '4:00 PM - 6:00 PM', '3:00 AM - 5:00 AM', '9:00 - 11:00', NOW(), NOW()),
('schedule_005', 'course_001', 'group-session', 4, 'Tuesday & Thursday', '9:00 PM - 11:00 PM', '6:00 PM - 8:00 PM', '5:00 AM - 7:00 AM', '11:00 - 1:00', NOW(), NOW()),

-- Course 002 Schedules
('schedule_006', 'course_002', 'live-class', NULL, 'Monday & Wednesday', '6:00 PM - 8:00 PM', '3:00 PM - 5:00 PM', '2:00 AM - 4:00 AM', '8:00 - 10:00', NOW(), NOW()),
('schedule_007', 'course_002', 'group-session', 1, 'Friday', '5:00 PM - 7:00 PM', '2:00 PM - 4:00 PM', '1:00 AM - 3:00 AM', '7:00 - 9:00', NOW(), NOW());

-- ============================================================================
-- 6. STUDENT USER ACCOUNTS
-- ============================================================================
-- Password for all students: Student123! (hashed with Argon2ID)
-- Note: In production, each student should have unique passwords
INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `failed_attempts`, `locked_until`, `createdAt`, `updatedAt`) VALUES
('student_001', 'sarah.johnson@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Sarah Johnson', 'student', 0, NULL, '2026-02-15 10:30:00', NOW()),
('student_002', 'michael.chen@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Michael Chen', 'student', 0, NULL, '2026-02-16 14:20:00', NOW()),
('student_003', 'amina.hassan@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Amina Hassan', 'student', 0, NULL, '2026-02-17 09:15:00', NOW()),
('student_004', 'david.martinez@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'David Martinez', 'student', 0, NULL, '2026-02-18 16:45:00', NOW()),
('student_005', 'priya.patel@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Priya Patel', 'student', 0, NULL, '2026-02-19 11:30:00', NOW()),
('student_006', 'james.okonkwo@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'James Okonkwo', 'student', 0, NULL, '2026-02-20 13:00:00', NOW()),
('student_007', 'emily.nguyen@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Emily Nguyen', 'student', 0, NULL, '2026-02-21 15:20:00', NOW()),
('student_008', 'omar.ali@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Omar Ali', 'student', 0, NULL, '2026-02-22 10:10:00', NOW()),
('student_009', 'sophia.kim@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Sophia Kim', 'student', 0, NULL, '2026-02-23 12:40:00', NOW()),
('student_010', 'lucas.silva@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Lucas Silva', 'student', 0, NULL, '2026-02-24 14:55:00', NOW()),
('student_011', 'fatima.rahman@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Fatima Rahman', 'student', 0, NULL, '2026-02-25 09:30:00', NOW()),
('student_012', 'alex.thompson@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Alex Thompson', 'student', 0, NULL, '2026-02-26 16:20:00', NOW()),
('student_013', 'yuki.tanaka@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Yuki Tanaka', 'student', 0, NULL, '2026-02-27 11:15:00', NOW()),
('student_014', 'maria.garcia@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Maria Garcia', 'student', 0, NULL, '2026-02-28 13:45:00', NOW()),
('student_015', 'kwame.mensah@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Kwame Mensah', 'student', 0, NULL, '2026-03-01 10:00:00', NOW()),
('student_016', 'isabella.rossi@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Isabella Rossi', 'student', 0, NULL, '2026-03-02 15:30:00', NOW()),
('student_017', 'raj.kumar@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Raj Kumar', 'student', 0, NULL, '2026-03-03 12:20:00', NOW()),
('student_018', 'nina.petrov@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Nina Petrov', 'student', 0, NULL, '2026-03-04 14:10:00', NOW()),
('student_019', 'carlos.rodriguez@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Carlos Rodriguez', 'student', 0, NULL, '2026-03-05 09:50:00', NOW()),
('student_020', 'aisha.mohamed@email.com', '$argon2id$v=19$m=65536,t=4,p=3$c29tZXNhbHQxMjM0NTY3OA$8Z9vZ3xKxJ5YqN2pL4mR6sT8vW1xY3zA5bC7dE9fG0h', 'Aisha Mohamed', 'student', 0, NULL, '2026-03-06 11:40:00', NOW());

-- ============================================================================
-- 7. ENROLLMENTS (APPROVED STUDENTS)
-- ============================================================================
INSERT INTO `enrollments` (`id`, `userId`, `courseId`, `location`, `planType`, `status`, `paymentStatus`, `amountPaid`, `totalAmount`, `enrolledAt`, `updatedAt`) VALUES
-- Course 001 Enrollments (15 students)
('enroll_001', 'student_001', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-15 11:00:00', NOW()),
('enroll_002', 'student_002', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-16 15:00:00', NOW()),
('enroll_003', 'student_003', 'course_001', 'Outside Rwanda', 'material-only', 'approved', 'completed', 450.00, 450.00, '2026-02-17 10:00:00', NOW()),
('enroll_004', 'student_004', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'partial', 800.00, 1600.00, '2026-02-18 17:00:00', NOW()),
('enroll_005', 'student_005', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-19 12:00:00', NOW()),
('enroll_006', 'student_006', 'course_001', 'Inside Rwanda', 'material-only', 'approved', 'completed', 450.00, 450.00, '2026-02-20 14:00:00', NOW()),
('enroll_007', 'student_007', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-21 16:00:00', NOW()),
('enroll_008', 'student_008', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'partial', 400.00, 1600.00, '2026-02-22 11:00:00', NOW()),
('enroll_009', 'student_009', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-23 13:00:00', NOW()),
('enroll_010', 'student_010', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-24 15:30:00', NOW()),
('enroll_011', 'student_011', 'course_001', 'Outside Rwanda', 'material-only', 'approved', 'completed', 450.00, 450.00, '2026-02-25 10:00:00', NOW()),
('enroll_012', 'student_012', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'pending', 0.00, 1600.00, '2026-02-26 17:00:00', NOW()),
('enroll_013', 'student_013', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-27 12:00:00', NOW()),
('enroll_014', 'student_014', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1600.00, 1600.00, '2026-02-28 14:30:00', NOW()),
('enroll_015', 'student_015', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'partial', 1200.00, 1600.00, '2026-03-01 11:00:00', NOW()),

-- Course 002 Enrollments (8 students)
('enroll_016', 'student_016', 'course_002', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1200.00, 1200.00, '2026-03-02 16:00:00', NOW()),
('enroll_017', 'student_017', 'course_002', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1200.00, 1200.00, '2026-03-03 13:00:00', NOW()),
('enroll_018', 'student_018', 'course_002', 'Outside Rwanda', 'material-only', 'approved', 'completed', 400.00, 400.00, '2026-03-04 15:00:00', NOW()),
('enroll_019', 'student_001', 'course_002', 'Inside Rwanda', 'in-class', 'approved', 'partial', 600.00, 1200.00, '2026-03-05 10:30:00', NOW()),
('enroll_020', 'student_002', 'course_002', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1200.00, 1200.00, '2026-03-06 12:00:00', NOW()),
('enroll_021', 'student_003', 'course_002', 'Inside Rwanda', 'material-only', 'approved', 'completed', 400.00, 400.00, '2026-03-07 14:00:00', NOW()),
('enroll_022', 'student_004', 'course_002', 'Outside Rwanda', 'in-class', 'approved', 'pending', 0.00, 1200.00, '2026-03-08 09:00:00', NOW()),
('enroll_023', 'student_005', 'course_002', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1200.00, 1200.00, '2026-03-09 11:30:00', NOW()),

-- Course 003 Enrollments (5 students)
('enroll_024', 'student_006', 'course_003', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1400.00, 1400.00, '2026-03-07 10:00:00', NOW()),
('enroll_025', 'student_007', 'course_003', 'Inside Rwanda', 'in-class', 'approved', 'partial', 700.00, 1400.00, '2026-03-08 12:00:00', NOW()),
('enroll_026', 'student_008', 'course_003', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1400.00, 1400.00, '2026-03-09 14:00:00', NOW()),
('enroll_027', 'student_009', 'course_003', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1400.00, 1400.00, '2026-03-10 09:30:00', NOW()),
('enroll_028', 'student_010', 'course_003', 'Outside Rwanda', 'in-class', 'approved', 'pending', 0.00, 1400.00, '2026-03-11 11:00:00', NOW()),

-- Course 004 Enrollments (3 students)
('enroll_029', 'student_011', 'course_004', 'Inside Rwanda', 'in-class', 'approved', 'completed', 1100.00, 1100.00, '2026-03-08 13:00:00', NOW()),
('enroll_030', 'student_012', 'course_004', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1100.00, 1100.00, '2026-03-09 15:00:00', NOW()),
('enroll_031', 'student_013', 'course_004', 'Inside Rwanda', 'in-class', 'approved', 'partial', 550.00, 1100.00, '2026-03-10 10:00:00', NOW()),

-- Course 005 Enrollments (2 students)
('enroll_032', 'student_014', 'course_005', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1500.00, 1500.00, '2026-03-09 12:00:00', NOW()),
('enroll_033', 'student_015', 'course_005', 'Inside Rwanda', 'in-class', 'approved', 'pending', 0.00, 1500.00, '2026-03-10 14:00:00', NOW());

-- ============================================================================
-- 8. COURSE MATERIALS (for Course 001)
-- ============================================================================
INSERT INTO `course_materials` (`id`, `courseId`, `phaseId`, `title`, `type`, `content`, `fileUrl`, `orderIndex`, `isPublished`, `createdAt`, `updatedAt`) VALUES
-- Phase 1 Materials
('material_001', 'course_001', 'phase_001', 'Introduction to HTML5', 'video', 'Learn the fundamentals of HTML5 and semantic markup', 'https://example.com/videos/html5-intro.mp4', 1, TRUE, NOW(), NOW()),
('material_002', 'course_001', 'phase_001', 'HTML5 Cheat Sheet', 'document', 'Comprehensive HTML5 reference guide', 'https://example.com/docs/html5-cheatsheet.pdf', 2, TRUE, NOW(), NOW()),
('material_003', 'course_001', 'phase_001', 'CSS3 Fundamentals', 'video', 'Master CSS3 selectors, properties, and layouts', 'https://example.com/videos/css3-fundamentals.mp4', 3, TRUE, NOW(), NOW()),
('material_004', 'course_001', 'phase_001', 'Flexbox & Grid Layout', 'video', 'Modern CSS layout techniques', 'https://example.com/videos/flexbox-grid.mp4', 4, TRUE, NOW(), NOW()),
('material_005', 'course_001', 'phase_001', 'Bootstrap 5 Components', 'video', 'Build responsive websites with Bootstrap', 'https://example.com/videos/bootstrap5.mp4', 5, TRUE, NOW(), NOW()),
('material_006', 'course_001', 'phase_001', 'Phase 1 Project: Portfolio Website', 'assignment', 'Build a responsive portfolio website using HTML, CSS, and Bootstrap', NULL, 6, TRUE, NOW(), NOW()),
('material_007', 'course_001', 'phase_001', 'Phase 1 Quiz', 'quiz', 'Test your HTML & CSS knowledge', NULL, 7, TRUE, NOW(), NOW()),

-- Phase 2 Materials
('material_008', 'course_001', 'phase_002', 'JavaScript Basics', 'video', 'Variables, data types, and operators', 'https://example.com/videos/js-basics.mp4', 1, TRUE, NOW(), NOW()),
('material_009', 'course_001', 'phase_002', 'Functions & Scope', 'video', 'Master JavaScript functions and closures', 'https://example.com/videos/js-functions.mp4', 2, TRUE, NOW(), NOW()),
('material_010', 'course_001', 'phase_002', 'DOM Manipulation', 'video', 'Interact with HTML elements using JavaScript', 'https://example.com/videos/dom-manipulation.mp4', 3, TRUE, NOW(), NOW()),
('material_011', 'course_001', 'phase_002', 'Async JavaScript & Promises', 'video', 'Handle asynchronous operations', 'https://example.com/videos/async-js.mp4', 4, TRUE, NOW(), NOW()),
('material_012', 'course_001', 'phase_002', 'ES6+ Features', 'video', 'Modern JavaScript syntax and features', 'https://example.com/videos/es6-features.mp4', 5, TRUE, NOW(), NOW()),
('material_013', 'course_001', 'phase_002', 'Phase 2 Project: Interactive Web App', 'assignment', 'Build an interactive to-do list application', NULL, 6, TRUE, NOW(), NOW()),
('material_014', 'course_001', 'phase_002', 'Phase 2 Quiz', 'quiz', 'JavaScript fundamentals assessment', NULL, 7, TRUE, NOW(), NOW()),

-- Phase 3 Materials
('material_015', 'course_001', 'phase_003', 'React Fundamentals', 'video', 'Components, props, and state', 'https://example.com/videos/react-fundamentals.mp4', 1, TRUE, NOW(), NOW()),
('material_016', 'course_001', 'phase_003', 'React Hooks', 'video', 'useState, useEffect, and custom hooks', 'https://example.com/videos/react-hooks.mp4', 2, TRUE, NOW(), NOW()),
('material_017', 'course_001', 'phase_003', 'Node.js & Express Setup', 'video', 'Build RESTful APIs with Express', 'https://example.com/videos/nodejs-express.mp4', 3, TRUE, NOW(), NOW()),
('material_018', 'course_001', 'phase_003', 'MySQL Database Design', 'video', 'Relational database concepts and SQL', 'https://example.com/videos/mysql-design.mp4', 4, TRUE, NOW(), NOW()),
('material_019', 'course_001', 'phase_003', 'Authentication & Security', 'video', 'JWT tokens and password hashing', 'https://example.com/videos/auth-security.mp4', 5, TRUE, NOW(), NOW()),
('material_020', 'course_001', 'phase_003', 'Phase 3 Project: Full-Stack App', 'assignment', 'Build a complete CRUD application with authentication', NULL, 6, TRUE, NOW(), NOW()),
('material_021', 'course_001', 'phase_003', 'Phase 3 Quiz', 'quiz', 'Full-stack development assessment', NULL, 7, TRUE, NOW(), NOW()),

-- Phase 4 Materials
('material_022', 'course_001', 'phase_004', 'Introduction to AI & Machine Learning', 'video', 'AI concepts and use cases', 'https://example.com/videos/ai-intro.mp4', 1, TRUE, NOW(), NOW()),
('material_023', 'course_001', 'phase_004', 'OpenAI API Integration', 'video', 'Connect your app to GPT models', 'https://example.com/videos/openai-api.mp4', 2, TRUE, NOW(), NOW()),
('material_024', 'course_001', 'phase_004', 'Building AI Chatbots', 'video', 'Create intelligent conversational interfaces', 'https://example.com/videos/ai-chatbots.mp4', 3, TRUE, NOW(), NOW()),
('material_025', 'course_001', 'phase_004', 'Recommendation Systems', 'video', 'Implement AI-powered recommendations', 'https://example.com/videos/recommendation-systems.mp4', 4, TRUE, NOW(), NOW()),
('material_026', 'course_001', 'phase_004', 'Deploying AI Applications', 'video', 'Production deployment strategies', 'https://example.com/videos/deploy-ai-apps.mp4', 5, TRUE, NOW(), NOW()),
('material_027', 'course_001', 'phase_004', 'Final Capstone Project', 'assignment', 'Build a complete AI-powered application', NULL, 6, TRUE, NOW(), NOW()),
('material_028', 'course_001', 'phase_004', 'Final Assessment', 'quiz', 'Comprehensive course evaluation', NULL, 7, TRUE, NOW(), NOW());

-- ============================================================================
-- 9. STUDENT PROGRESS TRACKING
-- ============================================================================
-- Sample progress for student_001 (Sarah Johnson) - Active learner
INSERT INTO `student_progress` (`id`, `enrollmentId`, `materialId`, `status`, `completedAt`, `createdAt`, `updatedAt`) VALUES
-- Phase 1 - Completed
('progress_001', 'enroll_001', 'material_001', 'completed', '2026-02-16 14:30:00', NOW(), NOW()),
('progress_002', 'enroll_001', 'material_002', 'completed', '2026-02-16 15:00:00', NOW(), NOW()),
('progress_003', 'enroll_001', 'material_003', 'completed', '2026-02-17 10:30:00', NOW(), NOW()),
('progress_004', 'enroll_001', 'material_004', 'completed', '2026-02-17 14:00:00', NOW(), NOW()),
('progress_005', 'enroll_001', 'material_005', 'completed', '2026-02-18 11:00:00', NOW(), NOW()),
('progress_006', 'enroll_001', 'material_006', 'completed', '2026-02-20 16:00:00', NOW(), NOW()),
('progress_007', 'enroll_001', 'material_007', 'completed', '2026-02-21 10:00:00', NOW(), NOW()),

-- Phase 2 - In Progress
('progress_008', 'enroll_001', 'material_008', 'completed', '2026-02-22 13:00:00', NOW(), NOW()),
('progress_009', 'enroll_001', 'material_009', 'completed', '2026-02-23 15:00:00', NOW(), NOW()),
('progress_010', 'enroll_001', 'material_010', 'completed', '2026-02-24 11:30:00', NOW(), NOW()),
('progress_011', 'enroll_001', 'material_011', 'in-progress', NULL, NOW(), NOW()),
('progress_012', 'enroll_001', 'material_012', 'not-started', NULL, NOW(), NOW()),

-- Sample progress for student_002 (Michael Chen) - Completed Phase 1
('progress_013', 'enroll_002', 'material_001', 'completed', '2026-02-17 09:00:00', NOW(), NOW()),
('progress_014', 'enroll_002', 'material_002', 'completed', '2026-02-17 10:00:00', NOW(), NOW()),
('progress_015', 'enroll_002', 'material_003', 'completed', '2026-02-18 14:00:00', NOW(), NOW()),
('progress_016', 'enroll_002', 'material_004', 'completed', '2026-02-19 11:00:00', NOW(), NOW()),
('progress_017', 'enroll_002', 'material_005', 'completed', '2026-02-20 15:00:00', NOW(), NOW()),
('progress_018', 'enroll_002', 'material_006', 'completed', '2026-02-23 17:00:00', NOW(), NOW()),
('progress_019', 'enroll_002', 'material_007', 'completed', '2026-02-24 10:00:00', NOW(), NOW()),
('progress_020', 'enroll_002', 'material_008', 'in-progress', NULL, NOW(), NOW()),

-- Sample progress for student_005 (Priya Patel) - Advanced student
('progress_021', 'enroll_005', 'material_001', 'completed', '2026-02-19 14:00:00', NOW(), NOW()),
('progress_022', 'enroll_005', 'material_002', 'completed', '2026-02-19 15:00:00', NOW(), NOW()),
('progress_023', 'enroll_005', 'material_003', 'completed', '2026-02-20 10:00:00', NOW(), NOW()),
('progress_024', 'enroll_005', 'material_004', 'completed', '2026-02-20 14:00:00', NOW(), NOW()),
('progress_025', 'enroll_005', 'material_005', 'completed', '2026-02-21 11:00:00', NOW(), NOW()),
('progress_026', 'enroll_005', 'material_006', 'completed', '2026-02-24 16:00:00', NOW(), NOW()),
('progress_027', 'enroll_005', 'material_007', 'completed', '2026-02-25 09:00:00', NOW(), NOW()),
('progress_028', 'enroll_005', 'material_008', 'completed', '2026-02-26 13:00:00', NOW(), NOW()),
('progress_029', 'enroll_005', 'material_009', 'completed', '2026-02-27 15:00:00', NOW(), NOW()),
('progress_030', 'enroll_005', 'material_010', 'completed', '2026-02-28 11:00:00', NOW(), NOW()),
('progress_031', 'enroll_005', 'material_011', 'completed', '2026-03-01 14:00:00', NOW(), NOW()),
('progress_032', 'enroll_005', 'material_012', 'completed', '2026-03-02 10:00:00', NOW(), NOW()),
('progress_033', 'enroll_005', 'material_013', 'completed', '2026-03-05 16:00:00', NOW(), NOW()),
('progress_034', 'enroll_005', 'material_014', 'completed', '2026-03-06 11:00:00', NOW(), NOW()),
('progress_035', 'enroll_005', 'material_015', 'in-progress', NULL, NOW(), NOW());

-- ============================================================================
-- UPDATE COURSE ENROLLMENT COUNTS
-- ============================================================================
UPDATE `courses` SET `currentEnrolled` = 15 WHERE `id` = 'course_001';
UPDATE `courses` SET `currentEnrolled` = 8 WHERE `id` = 'course_002';
UPDATE `courses` SET `currentEnrolled` = 5 WHERE `id` = 'course_003';
UPDATE `courses` SET `currentEnrolled` = 3 WHERE `id` = 'course_004';
UPDATE `courses` SET `currentEnrolled` = 2 WHERE `id` = 'course_005';

-- ============================================================================
-- VERIFICATION QUERIES (Optional - Run these to verify data)
-- ============================================================================
-- SELECT COUNT(*) as total_courses FROM courses;
-- SELECT COUNT(*) as total_students FROM user WHERE role = 'student';
-- SELECT COUNT(*) as total_enrollments FROM enrollments;
-- SELECT COUNT(*) as approved_enrollments FROM enrollments WHERE status = 'approved';
-- SELECT SUM(amountPaid) as total_revenue FROM enrollments;
-- SELECT c.name, COUNT(e.id) as enrollment_count FROM courses c LEFT JOIN enrollments e ON c.id = e.courseId GROUP BY c.id;
-- SELECT u.name, c.name as course, e.status, e.paymentStatus FROM enrollments e JOIN user u ON e.userId = u.id JOIN courses c ON e.courseId = c.id ORDER BY e.enrolledAt DESC LIMIT 10;