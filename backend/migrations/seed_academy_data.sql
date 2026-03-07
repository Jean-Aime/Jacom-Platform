-- Academy Seed Data

-- Insert Academy Settings
INSERT INTO `academy_settings` (`id`, `heroTitle`, `heroSubtitle`, `classStartDate`, `scholarshipAnnouncementDate`, `registrationOpen`, `contactPhone`) VALUES
('academy_001', 'AI-Powered Application Development Class', 'Master modern application development with AI-powered tools and industry-leading practices', '2026-03-14', '2026-03-15', TRUE, '202-386-2702');

-- Insert Main Course
INSERT INTO `courses` (`id`, `name`, `slug`, `category`, `description`, `icon`, `totalPrice`, `fullPaymentPrice`, `installmentCount`, `installmentAmount`, `startDate`, `duration`, `deliveryMode`, `status`, `featured`, `maxStudents`, `currentEnrolled`) VALUES
('course_001', 'AI-Powered Application Development', 'ai-powered-app-development', 'Application Development', 'Learn to build modern applications using AI-powered development tools, cloud infrastructure, and industry best practices. Our curriculum is designed by experts and updated regularly.', 'Application Development', 2400.00, 1600.00, 4, 400.00, '2026-03-14', '12 weeks', 'hybrid', 'published', TRUE, 100, 0);

-- Insert Course Phases
INSERT INTO `course_phases` (`id`, `courseId`, `phaseNumber`, `title`, `description`, `materialPrice`, `materialDiscountedPrice`, `classPrice`, `duration`) VALUES
('phase_001', 'course_001', 1, 'Building static websites using HTML, CSS & Bootstrap', 'Learn about the underlying structure of the web.', 300.00, 118.00, 600.00, '3 weeks'),
('phase_002', 'course_001', 2, 'Learn coding with JavaScript', 'Learn programming fundamentals using JavaScript.', 300.00, 149.00, 600.00, '3 weeks'),
('phase_003', 'course_001', 3, 'React.js, Node.js, MySQL & Express.js', 'Learn the backend side of application development.', 300.00, 149.00, 600.00, '3 weeks'),
('phase_004', 'course_001', 4, 'Building AI-Powered Products | AI Integration', 'Learn how to convert your application into an intelligent one by connecting it with AI models.', 300.00, 199.00, 600.00, '3 weeks');

-- Insert Course Pricing
INSERT INTO `course_pricing` (`id`, `courseId`, `location`, `planType`, `originalPrice`, `discountedPrice`, `features`) VALUES
('pricing_001', 'course_001', 'Outside Rwanda', 'in-class', 2400.00, 1600.00, 'Full Program access, All phases included, Instructor-led classes, Instructor-led group sessions'),
('pricing_002', 'course_001', 'Inside Rwanda', 'in-class', 2400.00, 1600.00, 'Full Program access, All phases included, Instructor-led classes, Instructor-led group sessions'),
('pricing_003', 'course_001', 'Outside Rwanda', 'material-only', 1200.00, 450.00, 'All 4 phases bundle, Self paced learning'),
('pricing_004', 'course_001', 'Inside Rwanda', 'material-only', 1200.00, 450.00, 'All 4 phases bundle, Self paced learning');

-- Insert Class Schedules
INSERT INTO `class_schedules` (`id`, `courseId`, `sessionType`, `groupNumber`, `daysOfWeek`, `timeEST`, `timePST`, `timeEAT`, `timeETH`) VALUES
('schedule_001', 'course_001', 'live-class', NULL, 'Saturday & Sunday', '10:00 AM - 12:00 PM', '7:00 AM - 9:00 AM', '6:00 PM - 8:00 PM', '12:00 - 2:00'),
('schedule_002', 'course_001', 'group-session', 1, 'Tuesday & Thursday', '10:00 AM - 12:00 PM', '7:00 AM - 9:00 AM', '6:00 PM - 8:00 PM', '12:00 - 2:00'),
('schedule_003', 'course_001', 'group-session', 2, 'Tuesday & Thursday', '1:00 PM - 3:00 PM', '10:00 AM - 12:00 PM', '9:00 PM - 11:00 PM', '3:00 - 5:00'),
('schedule_004', 'course_001', 'group-session', 3, 'Tuesday & Thursday', '7:00 PM - 9:00 PM', '4:00 PM - 6:00 PM', '3:00 AM - 5:00 AM', '9:00 - 11:00'),
('schedule_005', 'course_001', 'group-session', 4, 'Tuesday & Thursday', '9:00 PM - 11:00 PM', '6:00 PM - 8:00 PM', '5:00 AM - 7:00 AM', '11:00 - 1:00');

-- Insert Additional Courses
INSERT INTO `courses` (`id`, `name`, `slug`, `category`, `description`, `icon`, `totalPrice`, `fullPaymentPrice`, `installmentCount`, `installmentAmount`, `startDate`, `duration`, `deliveryMode`, `status`, `featured`, `maxStudents`, `currentEnrolled`) VALUES
('course_002', 'Cloud Computing Fundamentals', 'cloud-computing-fundamentals', 'Cloud Computing', 'Master cloud infrastructure, deployment strategies, and scalable architecture design.', 'Cloud Computing', 1800.00, 1200.00, 3, 400.00, '2026-04-01', '8 weeks', 'online', 'published', FALSE, 80, 0),
('course_003', 'Data Analytics & Visualization', 'data-analytics-visualization', 'Data Analytics', 'Learn data analysis, visualization techniques, and business intelligence tools.', 'Data Analytics', 2000.00, 1400.00, 4, 350.00, '2026-04-15', '10 weeks', 'hybrid', 'published', FALSE, 60, 0),
('course_004', 'Database Design & Management', 'database-design-management', 'Database', 'Comprehensive database design, optimization, and management strategies.', 'Database', 1600.00, 1100.00, 3, 367.00, '2026-05-01', '6 weeks', 'online', 'published', FALSE, 70, 0);