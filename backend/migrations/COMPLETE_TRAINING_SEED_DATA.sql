-- ============================================================================
-- COMPLETE TRAINING SYSTEM SEED DATA
-- Professional seed data for testing the entire training platform
-- ============================================================================

-- Note: Ensure academy tables are created before running this
-- Run create_academy_tables.sql first if tables don't exist

-- ============================================================================
-- 1. COURSES - Create comprehensive course catalog
-- ============================================================================

INSERT INTO `courses` (`id`, `name`, `slug`, `category`, `description`, `icon`, `totalPrice`, `fullPaymentPrice`, `installmentCount`, `installmentAmount`, `startDate`, `duration`, `deliveryMode`, `status`, `featured`, `maxStudents`, `currentEnrolled`) VALUES
('course_001', 'Full Stack Web Development', 'full-stack-web-development', 'Web Development', 'Master modern web development with React, Next.js, Node.js, and PostgreSQL. Build production-ready applications from scratch.', 'Code', 1200.00, 1080.00, 3, 400.00, '2024-04-01', '12 weeks', 'hybrid', 'published', TRUE, 50, 15),
('course_002', 'React & Next.js Mastery', 'react-nextjs-mastery', 'Frontend Development', 'Deep dive into React 18 and Next.js 14. Learn advanced patterns, server components, and modern frontend architecture.', 'React', 800.00, 720.00, 2, 400.00, '2024-04-15', '8 weeks', 'online', 'published', TRUE, 40, 23),
('course_003', 'Mobile App Development', 'mobile-app-development', 'Mobile Development', 'Build cross-platform mobile apps with React Native. Deploy to iOS and Android from a single codebase.', 'Smartphone', 950.00, 855.00, 3, 317.00, '2024-05-01', '10 weeks', 'online', 'published', FALSE, 35, 8),
('course_004', 'Python for Data Science', 'python-data-science', 'Data Science', 'Learn Python, NumPy, Pandas, and machine learning fundamentals. Analyze data and build predictive models.', 'Database', 1100.00, 990.00, 3, 367.00, '2024-05-15', '12 weeks', 'hybrid', 'published', TRUE, 45, 12),
('course_005', 'DevOps & Cloud Engineering', 'devops-cloud-engineering', 'DevOps', 'Master Docker, Kubernetes, AWS, and CI/CD pipelines. Deploy and manage scalable cloud infrastructure.', 'Cloud', 1300.00, 1170.00, 4, 325.00, '2024-06-01', '14 weeks', 'online', 'published', FALSE, 30, 5),
('course_006', 'UI/UX Design Fundamentals', 'ui-ux-design-fundamentals', 'Design', 'Learn user-centered design, Figma, prototyping, and design systems. Create beautiful, functional interfaces.', 'Palette', 700.00, 630.00, 2, 350.00, '2024-06-15', '6 weeks', 'online', 'published', FALSE, 50, 18),
('course_007', 'Advanced JavaScript', 'advanced-javascript', 'Programming', 'Master ES6+, async programming, design patterns, and performance optimization in JavaScript.', 'Code', 600.00, 540.00, 2, 300.00, '2024-07-01', '6 weeks', 'online', 'draft', FALSE, 40, 0);

-- ============================================================================
-- 2. COURSE PHASES - Detailed curriculum breakdown
-- ============================================================================

-- Full Stack Web Development Phases
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`) VALUES
('phase_001', 'course_001', 1, 'Frontend Fundamentals', 'HTML, CSS, JavaScript, and React basics', 150.00, 135.00, 250.00, '4 weeks'),
('phase_002', 'course_001', 2, 'Backend Development', 'Node.js, Express, PostgreSQL, and API design', 150.00, 135.00, 250.00, '4 weeks'),
('phase_003', 'course_001', 3, 'Full Stack Integration', 'Next.js, deployment, authentication, and production', 150.00, 135.00, 250.00, '4 weeks');

-- React & Next.js Mastery Phases
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`) VALUES
('phase_004', 'course_002', 1, 'React Advanced Patterns', 'Hooks, Context, Performance, Custom Hooks', 120.00, 108.00, 200.00, '4 weeks'),
('phase_005', 'course_002', 2, 'Next.js Deep Dive', 'App Router, Server Components, Streaming, Caching', 120.00, 108.00, 200.00, '4 weeks');

-- Mobile App Development Phases
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`) VALUES
('phase_006', 'course_003', 1, 'React Native Basics', 'Components, Navigation, State Management', 130.00, 117.00, 220.00, '3 weeks'),
('phase_007', 'course_003', 2, 'Native Features', 'Camera, GPS, Push Notifications, Storage', 130.00, 117.00, 220.00, '3 weeks'),
('phase_008', 'course_003', 3, 'Deployment & Publishing', 'App Store, Play Store, CI/CD for mobile', 130.00, 117.00, 220.00, '4 weeks');

-- ============================================================================
-- 3. COURSE PRICING - Location and plan-based pricing
-- ============================================================================

-- Full Stack Web Development Pricing
INSERT INTO `course_pricing` (`id`, `courseId`, `location`, `planType`, `originalPrice`, `discountedPrice`, `features`) VALUES
('pricing_001', 'course_001', 'Outside Rwanda', 'in-class', 1200.00, 1080.00, 'Live classes,Materials,Mentorship,Certificate'),
('pricing_002', 'course_001', 'Outside Rwanda', 'material-only', 450.00, 405.00, 'Video materials,PDFs,Quizzes,Certificate'),
('pricing_003', 'course_001', 'Inside Rwanda', 'in-class', 1000.00, 900.00, 'Live classes,Materials,Mentorship,Certificate'),
('pricing_004', 'course_001', 'Inside Rwanda', 'material-only', 350.00, 315.00, 'Video materials,PDFs,Quizzes,Certificate');

-- React & Next.js Mastery Pricing
INSERT INTO `course_pricing` (`id`, `courseId`, `location`, `planType`, `originalPrice`, `discountedPrice`, `features`) VALUES
('pricing_005', 'course_002', 'Outside Rwanda', 'in-class', 800.00, 720.00, 'Live classes,Materials,Projects,Certificate'),
('pricing_006', 'course_002', 'Outside Rwanda', 'material-only', 300.00, 270.00, 'Video materials,PDFs,Certificate'),
('pricing_007', 'course_002', 'Inside Rwanda', 'in-class', 650.00, 585.00, 'Live classes,Materials,Projects,Certificate'),
('pricing_008', 'course_002', 'Inside Rwanda', 'material-only', 250.00, 225.00, 'Video materials,PDFs,Certificate');

-- Mobile App Development Pricing
INSERT INTO `course_pricing` (`id`, `courseId`, `location`, `planType`, `originalPrice`, `discountedPrice`, `features`) VALUES
('pricing_009', 'course_003', 'Outside Rwanda', 'in-class', 950.00, 855.00, 'Live classes,Materials,App deployment,Certificate'),
('pricing_010', 'course_003', 'Outside Rwanda', 'material-only', 350.00, 315.00, 'Video materials,PDFs,Certificate'),
('pricing_011', 'course_003', 'Inside Rwanda', 'in-class', 800.00, 720.00, 'Live classes,Materials,App deployment,Certificate'),
('pricing_012', 'course_003', 'Inside Rwanda', 'material-only', 280.00, 252.00, 'Video materials,PDFs,Certificate');

-- ============================================================================
-- 4. CLASS SCHEDULES - Multi-timezone scheduling
-- ============================================================================

-- Full Stack Web Development Schedule
INSERT INTO `class_schedules` (`id`, `courseId`, `sessionType`, `groupNumber`, `daysOfWeek`, `timeEST`, `timePST`, `timeEAT`, `timeETH`) VALUES
('schedule_001', 'course_001', 'live-class', NULL, 'Mon, Wed, Fri', '6:00 PM', '3:00 PM', '1:00 AM', '12:00 AM'),
('schedule_002', 'course_001', 'group-session', 1, 'Tue, Thu', '7:00 PM', '4:00 PM', '2:00 AM', '1:00 AM'),
('schedule_003', 'course_001', 'group-session', 2, 'Sat', '10:00 AM', '7:00 AM', '5:00 PM', '4:00 PM');

-- React & Next.js Mastery Schedule
INSERT INTO `class_schedules` (`id`, `courseId`, `sessionType`, `groupNumber`, `daysOfWeek`, `timeEST`, `timePST`, `timeEAT`, `timeETH`) VALUES
('schedule_004', 'course_002', 'live-class', NULL, 'Tue, Thu', '7:00 PM', '4:00 PM', '2:00 AM', '1:00 AM'),
('schedule_005', 'course_002', 'group-session', 1, 'Sat', '2:00 PM', '11:00 AM', '9:00 PM', '8:00 PM');

-- ============================================================================
-- 5. STUDENT ENROLLMENTS - Sample enrollments with various statuses
-- ============================================================================

-- Get existing user IDs (assuming users exist from previous migrations)
-- We'll use placeholder IDs that should be replaced with actual user IDs

INSERT INTO `enrollments` (`id`, `userId`, `courseId`, `location`, `planType`, `status`, `paymentStatus`, `amountPaid`, `totalAmount`, `enrolledAt`) VALUES
-- Full Stack Web Development enrollments
('enroll_001', 'user_student', 'course_001', 'Outside Rwanda', 'in-class', 'approved', 'completed', 1080.00, 1080.00, '2024-03-01 10:00:00'),
('enroll_002', 'user_002', 'course_001', 'Inside Rwanda', 'in-class', 'approved', 'partial', 450.00, 900.00, '2024-03-05 14:30:00'),
('enroll_003', 'user_003', 'course_001', 'Outside Rwanda', 'material-only', 'approved', 'completed', 405.00, 405.00, '2024-03-10 09:15:00'),

-- React & Next.js Mastery enrollments
('enroll_004', 'user_004', 'course_002', 'Outside Rwanda', 'in-class', 'approved', 'completed', 720.00, 720.00, '2024-03-12 11:00:00'),
('enroll_005', 'user_005', 'course_002', 'Inside Rwanda', 'material-only', 'approved', 'pending', 0.00, 225.00, '2024-03-15 16:45:00'),

-- Mobile App Development enrollments
('enroll_006', 'user_006', 'course_003', 'Outside Rwanda', 'in-class', 'pending', 'pending', 0.00, 855.00, '2024-03-18 13:20:00'),

-- Python for Data Science enrollments
('enroll_007', 'user_007', 'course_004', 'Inside Rwanda', 'in-class', 'approved', 'partial', 330.00, 990.00, '2024-03-20 10:30:00'),

-- UI/UX Design enrollments
('enroll_008', 'user_008', 'course_006', 'Outside Rwanda', 'in-class', 'approved', 'completed', 630.00, 630.00, '2024-03-22 15:00:00');

-- ============================================================================
-- 6. COURSE MATERIALS - Lessons, videos, assignments
-- ============================================================================

-- Full Stack Web Development - Phase 1 Materials
INSERT INTO `course_materials` (`id`, `courseId`, `phaseId`, `title`, `type`, `content`, `fileUrl`, `orderIndex`, `isPublished`) VALUES
('material_001', 'course_001', 'phase_001', 'Introduction to Web Development', 'video', 'Overview of web technologies and course structure', 'https://example.com/videos/intro.mp4', 1, TRUE),
('material_002', 'course_001', 'phase_001', 'HTML Fundamentals', 'video', 'Learn HTML5 structure, semantic elements, and forms', 'https://example.com/videos/html.mp4', 2, TRUE),
('material_003', 'course_001', 'phase_001', 'CSS Styling & Layouts', 'video', 'Master CSS Grid, Flexbox, and responsive design', 'https://example.com/videos/css.mp4', 3, TRUE),
('material_004', 'course_001', 'phase_001', 'JavaScript Basics', 'video', 'Variables, functions, DOM manipulation, and events', 'https://example.com/videos/js-basics.mp4', 4, TRUE),
('material_005', 'course_001', 'phase_001', 'HTML/CSS Quiz', 'quiz', 'Test your knowledge of HTML and CSS fundamentals', NULL, 5, TRUE),
('material_006', 'course_001', 'phase_001', 'Build a Landing Page', 'assignment', 'Create a responsive landing page using HTML, CSS, and JavaScript', NULL, 6, TRUE),

-- Full Stack Web Development - Phase 2 Materials
('material_007', 'course_001', 'phase_002', 'Node.js Introduction', 'video', 'Server-side JavaScript with Node.js', 'https://example.com/videos/nodejs.mp4', 1, TRUE),
('material_008', 'course_001', 'phase_002', 'Express Framework', 'video', 'Building REST APIs with Express.js', 'https://example.com/videos/express.mp4', 2, TRUE),
('material_009', 'course_001', 'phase_002', 'PostgreSQL Database', 'video', 'Database design, SQL queries, and relationships', 'https://example.com/videos/postgresql.mp4', 3, TRUE),
('material_010', 'course_001', 'phase_002', 'API Development', 'video', 'RESTful API design patterns and best practices', 'https://example.com/videos/api.mp4', 4, TRUE),
('material_011', 'course_001', 'phase_002', 'Backend Quiz', 'quiz', 'Test your backend development knowledge', NULL, 5, TRUE),
('material_012', 'course_001', 'phase_002', 'Build a REST API', 'assignment', 'Create a full CRUD API with authentication', NULL, 6, TRUE),

-- React & Next.js Mastery - Phase 1 Materials
('material_013', 'course_002', 'phase_004', 'React Hooks Deep Dive', 'video', 'useState, useEffect, useContext, and custom hooks', 'https://example.com/videos/hooks.mp4', 1, TRUE),
('material_014', 'course_002', 'phase_004', 'State Management', 'video', 'Context API, Zustand, and Redux patterns', 'https://example.com/videos/state.mp4', 2, TRUE),
('material_015', 'course_002', 'phase_004', 'Performance Optimization', 'video', 'React.memo, useMemo, useCallback, and code splitting', 'https://example.com/videos/performance.mp4', 3, TRUE),
('material_016', 'course_002', 'phase_004', 'React Patterns Quiz', 'quiz', 'Advanced React patterns assessment', NULL, 4, TRUE),

-- Mobile App Development - Phase 1 Materials
('material_017', 'course_003', 'phase_006', 'React Native Setup', 'video', 'Environment setup and first app', 'https://example.com/videos/rn-setup.mp4', 1, TRUE),
('material_018', 'course_003', 'phase_006', 'Core Components', 'video', 'View, Text, Image, ScrollView, FlatList', 'https://example.com/videos/rn-components.mp4', 2, TRUE),
('material_019', 'course_003', 'phase_006', 'Navigation', 'video', 'React Navigation - Stack, Tab, Drawer', 'https://example.com/videos/rn-nav.mp4', 3, TRUE);

-- ============================================================================
-- 7. STUDENT PROGRESS - Track material completion
-- ============================================================================

-- Student 1 progress (user_student) - Full Stack course
INSERT INTO `student_progress` (`id`, `enrollmentId`, `materialId`, `status`, `completedAt`) VALUES
('progress_001', 'enroll_001', 'material_001', 'completed', '2024-03-02 14:30:00'),
('progress_002', 'enroll_001', 'material_002', 'completed', '2024-03-04 16:45:00'),
('progress_003', 'enroll_001', 'material_003', 'completed', '2024-03-06 15:20:00'),
('progress_004', 'enroll_001', 'material_004', 'in-progress', NULL),
('progress_005', 'enroll_001', 'material_005', 'not-started', NULL);

-- Student 2 progress
('progress_006', 'enroll_002', 'material_001', 'completed', '2024-03-06 10:00:00'),
('progress_007', 'enroll_002', 'material_002', 'completed', '2024-03-08 11:30:00'),
('progress_008', 'enroll_002', 'material_003', 'not-started', NULL);

-- Student 4 progress (React course)
('progress_009', 'enroll_004', 'material_013', 'completed', '2024-03-13 09:00:00'),
('progress_010', 'enroll_004', 'material_014', 'completed', '2024-03-15 14:00:00'),
('progress_011', 'enroll_004', 'material_015', 'in-progress', NULL);

-- ============================================================================
-- 8. ACADEMY SETTINGS
-- ============================================================================

INSERT INTO `academy_settings` (`id`, `heroTitle`, `heroSubtitle`, `classStartDate`, `scholarshipAnnouncementDate`, `registrationOpen`, `contactPhone`) VALUES
('academy_001', 'AI-Powered Application Development Class', 'Master modern application development with AI-powered tools and industry-leading practices', '2024-04-01', '2024-03-25', TRUE, '202-386-2702');

-- ============================================================================
-- 9. UPDATE COURSE ENROLLMENT COUNTS
-- ============================================================================

UPDATE `courses` SET `currentEnrolled` = (
    SELECT COUNT(*) FROM `enrollments` 
    WHERE `enrollments`.`courseId` = `courses`.`id` 
    AND `enrollments`.`status` = 'approved'
);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check courses
SELECT COUNT(*) as total_courses FROM courses;

-- Check enrollments
SELECT COUNT(*) as total_enrollments FROM enrollments;

-- Check materials
SELECT COUNT(*) as total_materials FROM course_materials;

-- Check student progress
SELECT COUNT(*) as total_progress_records FROM student_progress;

-- Show enrollment summary
SELECT 
    c.name as course_name,
    COUNT(e.id) as enrollment_count,
    SUM(e.amountPaid) as total_revenue
FROM courses c
LEFT JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.name
ORDER BY enrollment_count DESC;

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
